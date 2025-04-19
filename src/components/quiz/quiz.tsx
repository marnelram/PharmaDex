"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Quiz } from "@/lib/validation/types/quiz";
import TimedQuiz from "./timed";
import Instructions from "./instructions";
import PracticeQuiz from "./practice";
import { AchievementToastManager } from "@/components/achievements/achievement-toast";
import { useQuizStore } from "@/store/quiz-store";

export default function QuizComponent({
  quiz,
  userId,
}: {
  quiz: Quiz;
  userId: string | undefined;
}) {
  const router = useRouter();
  const { toast } = useToast();
  // Create a ref to pass to TimedQuiz
  const startTimeRefObj = React.useRef<number>(
    useQuizStore.getState().startTimeRef
  );

  // Extract quiz state and actions from Zustand store
  const {
    currentQuestion,
    totalScore,
    showFeedback,
    isQuizComplete,
    streak,
    isGameStarted,
    isPracticeMode,
    startTimeRef,
    correctAnswers,
    newAchievements,
    showAchievements,

    // Actions
    startGame,
    answerQuestion,
    nextQuestion,
    completeQuiz,
    hideAchievements,
    setNewAchievements,
  } = useQuizStore();

  // Keep the ref in sync with the store
  React.useEffect(() => {
    startTimeRefObj.current = startTimeRef;
  }, [startTimeRef]);

  const { questions, quizId } = quiz;

  const handleTimeComplete = () => {
    if (!showFeedback) {
      handleAnswer(
        questions[currentQuestion].type === "Pokemon" ? "Drug" : "Pokemon"
      );
    }
  };

  // Add mutations for answer and completion
  const {
    mutate: submitAnswer,
    error: answerError,
    isError: isAnswerError,
  } = useMutation({
    mutationFn: async (data: {
      quizId: string;
      questionName: string;
      userGuess: string;
      totalScore: number;
      score: number;
      isCorrect: boolean;
    }) => {
      const response = await fetch("/api/quiz/answer", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to save answer");
      }
      return response.json();
    },
  });

  const {
    mutate: saveQuizAttempt,
    isPending: isQuizAttemptPending,
    error: quizAttemptError,
    isError: isQuizAttemptError,
  } = useMutation({
    mutationFn: async (data: { quizId: string; totalScore: number }) => {
      const response = await fetch("/api/quiz/complete", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to complete quiz: " + response.statusText);
      }
      return response.json();
    },
  });

  const handleGameStart = (mode: "practice" | "timed") => {
    startGame(mode); // Default to regular mode
  };

  const handleAnswer = async (answer: string) => {
    const { correct, currentScore } = await answerQuestion(
      answer,
      questions[currentQuestion].type,
      userId
    );

    if (isPracticeMode) {
      toast({
        title: correct ? "Correct! 🎉" : "Incorrect! 😅",
        variant: correct ? "success" : "destructive",
        duration: 1000,
      });
    } else {
      toast({
        title: correct ? "Correct! 🎉" : "Incorrect! 😅",
        points: correct ? currentScore : 0,
        variant: correct ? "success" : "destructive",
        duration: 1000,
      });
    }

    submitAnswer({
      quizId,
      questionName: questions[currentQuestion].name,
      userGuess: answer,
      totalScore,
      score: correct ? currentScore : 0,
      isCorrect: correct,
    });

    // Handle loading and error states
    if (isAnswerError) {
      toast({
        title: "Error saving answer",
        description: answerError?.message,
        variant: "destructive",
      });
    }

    // Move to next question automatically if not in practice mode
    if (!isPracticeMode) {
      handleNextQuestion();
    }
  };

  const handleNextQuestion = () => {
    nextQuestion(questions.length);
  };

  const handleQuizComplete = async () => {
    if (!quizId) {
      toast({
        title: "Error",
        description: "Quiz ID not found. Please try again.",
        variant: "destructive",
      });
      return;
    }

    completeQuiz();

    saveQuizAttempt(
      {
        quizId,
        totalScore,
      },
      {
        onSuccess: async () => {
          // Check for achievements if user is logged in
          if (userId) {
            try {
              const achievementsResult = await fetch("/api/achievements", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userId,
                  quizData: {
                    totalQuestions: questions.length,
                    correctAnswers,
                    duration: useQuizStore.getState().quizDuration,
                    isPerfect: correctAnswers === questions.length,
                  },
                }),
              });

              if (achievementsResult.ok) {
                const data = await achievementsResult.json();
                if (data.newlyUnlocked && data.newlyUnlocked.length > 0) {
                  setNewAchievements(data.newlyUnlocked);
                  return; // Don't navigate yet, wait for achievements to be shown
                }
              }
            } catch (error) {
              console.error("Error checking achievements:", error);
            }
          }

          // If no achievements or error, navigate directly
          if (isPracticeMode) {
            router.push(`/practice/${quizId}`);
          } else {
            router.push(`/results/${quizId}`);
          }
        },
      }
    );
  };

  // Handle completion of achievements display
  const handleAchievementsComplete = () => {
    hideAchievements();
    if (isPracticeMode) {
      router.push(`/practice/${quizId}`);
    } else {
      router.push(`/results/${quizId}`);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  console.log("isPracticeMode", isPracticeMode);

  if (isQuizAttemptPending) {
    return (
      <div className="h-[80dvh] backdrop-blur-sm flex items-center justify-center">
        <div className="text-center font-['Raleway'] flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#E63946]" />
          <p className="text-[16px] font-medium">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (isQuizAttemptError) {
    return (
      <div className="min-h-screen bg-[#F5F5F5]/80 backdrop-blur-sm flex items-center justify-center">
        <Card className="w-full max-w-md rounded-[15px]">
          <CardContent className="p-6 text-center font-['Raleway'] flex flex-col items-center gap-4">
            <AlertCircle className="h-12 w-12 text-[#E63946]" />
            <h2 className="text-[22px] font-medium">Error</h2>
            <p className="text-[#9E9E9E]">
              {quizAttemptError?.message || "Failed to load quiz"}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-[#E63946] hover:bg-[#d32d3a] rounded-[25px] transition-all duration-300"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Guard clause for undefined quiz items
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen bg-[#F5F5F5]/80 backdrop-blur-sm flex items-center justify-center">
        <Card className="w-full max-w-md rounded-[15px]">
          <CardContent className="p-6 text-center font-['Raleway'] flex flex-col items-center gap-4">
            <AlertCircle className="h-12 w-12 text-[#E63946]" />
            <h2 className="text-[22px] font-medium">No Questions Available</h2>
            <p className="text-[#9E9E9E]">Please try again later</p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-[#E63946] hover:bg-[#d32d3a] rounded-[25px] transition-all duration-300"
            >
              Refresh
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <>
      {!isGameStarted ? (
        <Instructions handleGameStart={handleGameStart} />
      ) : !isQuizComplete ? (
        isPracticeMode ? (
          <PracticeQuiz
            progress={progress}
            showFeedback={showFeedback}
            isQuizComplete={isQuizComplete}
            questions={questions}
            currentQuestion={currentQuestion}
            handleQuizComplete={handleQuizComplete}
            handleAnswer={handleAnswer}
            handleNextQuestion={handleNextQuestion}
          />
        ) : (
          <TimedQuiz
            progress={progress}
            isQuizComplete={isQuizComplete}
            handleTimeComplete={handleTimeComplete}
            streak={streak}
            questions={questions}
            currentQuestion={currentQuestion}
            startTimeRef={startTimeRefObj}
            handleQuizComplete={handleQuizComplete}
            handleAnswer={handleAnswer}
          />
        )
      ) : (
        <div className="size-full h-[90dvh] flex items-center justify-center">
          <Card className="w-full max-w-md bg-[#F5F5F5]/75 p-6 shadow-xl rounded-xl">
            <CardContent className="flex flex-col items-center justify-center gap-4">
              <div className="text-center">
                <h2 className="text-2xl font-bold">Quiz Completed!</h2>
                <p className="text-gray-600">
                  Your score: <span className="font-bold">{totalScore}</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  You answered {correctAnswers} out of {questions.length}{" "}
                  questions correctly.
                </p>
              </div>
              <Button
                onClick={handleQuizComplete}
                disabled={isQuizAttemptPending}
                className="w-full mt-2 bg-[#E63946] hover:bg-[#E63946] hover:scale-105 transition-transform duration-300"
              >
                {isQuizAttemptPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Saving...
                  </>
                ) : (
                  "See Results"
                )}
              </Button>
              {isQuizAttemptError && (
                <div className="flex items-center text-red-500 mt-2">
                  <AlertCircle className="mr-2 h-4 w-4" />
                  <p className="text-sm">{quizAttemptError}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Achievement toast manager */}
      {showAchievements && newAchievements.length > 0 && (
        <AchievementToastManager
          achievements={newAchievements}
          onComplete={handleAchievementsComplete}
        />
      )}
    </>
  );
}
