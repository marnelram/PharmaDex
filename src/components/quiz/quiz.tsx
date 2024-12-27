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

export default function QuizComponent({ quiz }: { quiz: Quiz }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [totalScore, setTotalScore] = React.useState(0);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [isQuizComplete, setIsQuizComplete] = React.useState(false);
  const { toast } = useToast();
  const startTimeRef = React.useRef<number>(0);
  const [streak, setStreak] = React.useState(0);
  const [multiplier, setMultiplier] = React.useState(1);
  const [isGameStarted, setIsGameStarted] = React.useState(false);
  const [isPracticeMode, setIsPracticeMode] = React.useState(false);

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

  const calculateScore = (elapsedTime: number) => {
    let baseScore;
    // If remaining time is between 4.95 and 5 seconds (answered within first 0.05s)
    if (elapsedTime <= 0.1) {
      baseScore = 1000;
    } else if (elapsedTime >= 4.9) {
      baseScore = 100;
    } else {
      const x = elapsedTime;
      baseScore = Math.round(25 + 1000 * Math.exp(-0.5 * (x - 0.05)));
    }

    // Apply streak multiplier
    return Math.round(baseScore * multiplier);
  };

  const handleAnswer = async (answer: string) => {
    const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
    const correct = answer === questions[currentQuestion].type;
    let currentScore = 0;

    if (correct) {
      // Increment streak and update multiplier
      const newStreak = streak + 1;
      setStreak(newStreak);

      // Update multiplier based on streak
      const newMultiplier = calculateMultiplier(newStreak);
      setMultiplier(newMultiplier);

      currentScore = calculateScore(elapsedTime);
      setTotalScore((prev) => prev + currentScore);
    } else {
      // Reset streak and multiplier on wrong answer
      setStreak(0);
      setMultiplier(1);
    }

    if (isPracticeMode) {
      setShowFeedback(true);
    } else {
      handleNextQuestion();
    }

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
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    startTimeRef.current = Date.now(); // Reset start time for next question
    console.log("start time: ", startTimeRef.current);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizComplete(true);
    }
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

    saveQuizAttempt(
      {
        quizId,
        totalScore,
      },
      {
        onSuccess: () => {
          if (isPracticeMode) {
            router.push(`/practice/${quizId}`);
          } else {
            router.push(`/results/${quizId}`);
          }
        },
      }
    );
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // needed to calculate the streak multiplier
  const calculateMultiplier = (currentStreak: number) => {
    if (currentStreak >= 10) return 3; // 3x for 10+ streak
    if (currentStreak >= 5) return 2; // 2x for 5-9 streak
    if (currentStreak >= 3) return 1.5; // 1.5x for 3-4 streak
    return 1; // Base multiplier
  };

  if (isQuizAttemptPending) {
    return (
      <div className="h-[80dvh] bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center font-['Raleway'] flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#E63946]" />
          <p className="text-[16px] font-medium">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (isQuizAttemptError) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
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
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
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

  if (!isGameStarted) {
    return (
      <Instructions
        setIsGameStarted={setIsGameStarted}
        setIsPracticeMode={setIsPracticeMode}
        startTimeRef={startTimeRef}
      />
    );
  }

  if (!isPracticeMode) {
    return (
      <TimedQuiz
        progress={progress}
        isQuizComplete={isQuizComplete}
        handleTimeComplete={handleTimeComplete}
        streak={streak}
        questions={questions}
        currentQuestion={currentQuestion}
        startTimeRef={startTimeRef}
        handleQuizComplete={handleQuizComplete}
        handleAnswer={handleAnswer}
      />
    );
  } else {
    return (
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
    );
  }
}
