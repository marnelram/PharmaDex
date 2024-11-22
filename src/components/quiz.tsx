"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DosageFormIcon } from "@/lib/utils/dosage-form";
import { Quiz } from "@/lib/validation/types/quiz";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { cn } from "@/lib/utils";

export default function QuizComponent({ quiz }: { quiz: Quiz }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [score, setScore] = React.useState(-1);
  const [totalScore, setTotalScore] = React.useState(0);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [isQuizComplete, setIsQuizComplete] = React.useState(false);
  const { toast } = useToast();
  const startTimeRef = React.useRef<number>(0);
  const [streak, setStreak] = React.useState(0);
  const [multiplier, setMultiplier] = React.useState(1);
  const [isGameStarted, setIsGameStarted] = React.useState(false);

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

    if (correct) {
      // Increment streak and update multiplier
      const newStreak = streak + 1;
      setStreak(newStreak);

      // Update multiplier based on streak
      const newMultiplier = calculateMultiplier(newStreak);
      setMultiplier(newMultiplier);

      const currentScore = calculateScore(elapsedTime);
      setScore(currentScore);
      setTotalScore((prev) => prev + currentScore);
    } else {
      // Reset streak and multiplier on wrong answer
      setStreak(0);
      setMultiplier(1);
      setScore(0);
    }

    setIsCorrect(correct);
    setShowFeedback(true);

    // Show toast with feedback
    toast({
      title: correct ? "Correct! 🎉" : "Incorrect! 😅",
      variant: correct ? "success" : "destructive",
      duration: 1000,
    });

    submitAnswer({
      quizId,
      questionName: questions[currentQuestion].name,
      userGuess: answer,
      totalScore,
      score: correct ? score : 0,
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
    setIsCorrect(false);
    setShowFeedback(false);
    startTimeRef.current = Date.now(); // Reset start time for next question
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
          router.push(`/results/${quizId}`);
        },
      }
    );
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  // Add loading state for quiz items
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

  // Add error state for quiz items
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

  // Helper function to calculate multiplier based on streak
  const calculateMultiplier = (currentStreak: number) => {
    if (currentStreak >= 10) return 3; // 3x for 10+ streak
    if (currentStreak >= 5) return 2; // 2x for 5-9 streak
    if (currentStreak >= 3) return 1.5; // 1.5x for 3-4 streak
    return 1; // Base multiplier
  };

  // Early return for start card if game hasn't started
  if (!isGameStarted) {
    return (
      <div className="size-full bg-[#F5F5F5] flex flex-col items-center sm:p-4 gap-4">
        <h1 className="hidden sm:block text-[44px] font-bold text-center font-['Poppins']">
          Drug or Pokémon?
        </h1>
        <Card className="w-full max-w-2xl rounded-[15px] bg-[#F5F5F5] sm:bg-white shadow-none border-none sm:border sm:shadow-lg">
          <CardContent className="p-6 flex flex-col items-center gap-6 sm:gap-8">
            <h2 className="sm:text-[32px] text-[22px] font-bold font-['Poppins']">
              How to Play:
            </h2>

            <div className="space-y-4 sm:space-y-6 text-[16px] font-['Raleway']">
              <p className="text-center">
                You&apos;ll be shown a name and have 5 seconds to decide if
                it&apos;s a Drug or a Pokémon!
              </p>

              <div className="space-y-6 sm:space-y-8">
                <ul className="list-disc list-inside space-y-1 sm:space-y-2">
                  <li>
                    Quick answers earn more points (up to 1000 per question)
                  </li>
                  <li>Build streaks to multiply your score:</li>
                  <li>
                    Balance speed with accuracy - wrong answers reset your
                    streak!
                  </li>
                </ul>
                <div className="w-full flex justify-center">
                  <table className="w-full max-w-sm table-fixed border-none">
                    <thead className="border-b">
                      <tr className="text-left">
                        <th># Correct</th>
                        <th>Multiplier</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="h-12">3</td>
                        <td className="text-[#eeda44] font-bold flex items-center h-12">
                          1.5x multiplier{" "}
                          <span className="text-[16px]">🔥</span>
                        </td>
                      </tr>
                      <tr>
                        <td className="h-12">5</td>
                        <td className="text-[#e69b39] flex items-center font-bold h-12">
                          2x multiplier <span className="text-[22px]">🔥</span>
                        </td>
                      </tr>
                      <tr className="h-12">
                        <td className="h-12">10</td>
                        <td className="text-[#E63946] font-bold flex items-center h-12">
                          3x multiplier <span className="text-[32px]">🔥</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <Button
              onClick={() => {
                setIsGameStarted(true);
                startTimeRef.current = Date.now();
              }}
              className="bg-[#E63946] mt-2 hover:bg-[#d32d3a] py-8 px-12 text-[22px] font-bold font-['Poppins'] rounded-[25px] transition-transform duration-300 hover:scale-105"
            >
              Start Quiz
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="size-full bg-[#F5F5F5] flex flex-col items-center sm:p-4 gap-4">
      {/* Title */}
      <h1 className="hidden sm:block text-[44px] font-bold text-center font-['Poppins']">
        Drug or Pokémon?
      </h1>
      <Card className="w-full max-w-2xl rounded-[15px] bg-[#F5F5F5] sm:bg-white shadow-none border-none sm:border sm:shadow-lg">
        <CardContent className="p-8 flex h-[80dvh] sm:h-auto flex-col items-center justify-between gap-4 sm:gap-8">
          {/* Progress Bar */}
          <Progress
            value={progress}
            className="h-3 rounded-full bg-[#9E9E9E]/20"
            indicatorClassName="bg-[#E63946]"
          />
          {!showFeedback && !isQuizComplete ? (
            <CountdownCircleTimer
              key={showFeedback ? 0 : 1}
              isPlaying={!showFeedback}
              duration={5}
              colors={["#54d548", "#F3E260", "#E63946"]}
              colorsTime={[5, 2.5, 0]}
              size={60}
              strokeWidth={6}
              trailColor="#9E9E9E20"
              onComplete={handleTimeComplete}
              updateInterval={0.05}
            />
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <p
                  className={cn(
                    "text-[22px] font-bold font-['Poppins']",
                    isCorrect && "text-[#54d548]",
                    !isCorrect && "text-gray-300",
                    streak >= 3 && "text-[#eeda44]",
                    streak >= 5 && "text-[#e69b39]",
                    streak >= 10 && "text-[#E63946]"
                  )}
                >
                  + {isCorrect ? score : 0} points
                </p>
              </div>
              <div className="flex items-center">
                {streak >= 3 && streak < 5 && (
                  <p className="text-[16px] font-bold">🔥</p>
                )}
                {streak >= 5 && streak < 10 && (
                  <p className="text-[22px] font-bold">🔥</p>
                )}
                {streak >= 10 && <p className="text-[32px] font-bold">🔥</p>}
              </div>
            </div>
          )}
          {isQuizComplete ? (
            <div className="text-center flex flex-col gap-6">
              <h2 className="text-[32px] font-bold font-['Poppins']">
                Quiz Complete!
              </h2>
              <Button
                onClick={handleQuizComplete}
                className="bg-[#E63946] hover:bg-[#d32d3a] py-8 text-[22px] font-bold font-['Poppins'] rounded-[25px] transition-transform duration-300 hover:scale-105"
              >
                See Results
              </Button>
            </div>
          ) : (
            <>
              {/* Question */}
              <div className="text-center flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-[32px] font-bold font-['Poppins']">
                    {questions[currentQuestion]?.name}
                  </h2>
                  {showFeedback && (
                    <p className="text-[16px] text-[#9E9E9E] font-['Raleway']">
                      {questions[currentQuestion]?.description}
                    </p>
                  )}
                </div>
                <div className="w-40 h-40 mx-auto bg-[#9E9E9E]/10 rounded-full flex items-center justify-center">
                  {showFeedback ? (
                    <>
                      {questions[currentQuestion]?.type === "Pokemon" && (
                        <Image
                          src={questions[currentQuestion]?.image as string}
                          alt={questions[currentQuestion]?.name}
                          className="w-full h-full object-contain"
                          width={100}
                          height={100}
                        />
                      )}
                      {questions[currentQuestion]?.type === "Drug" && (
                        <DosageFormIcon
                          className="w-full h-full object-contain p-8"
                          form={questions[currentQuestion]?.dosageForm}
                        />
                      )}
                    </>
                  ) : (
                    <span className="text-[44px] text-[#9E9E9E]">?</span>
                  )}
                </div>
              </div>

              {!showFeedback && (
                <div className="grid grid-cols-2 gap-6">
                  <Button
                    onClick={() => handleAnswer("Drug")}
                    className="py-8 text-[22px] font-bold font-['Poppins'] bg-[#E63946] hover:bg-[#d32d3a] rounded-[25px] transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    disabled={showFeedback}
                  >
                    Drug
                  </Button>
                  <Button
                    onClick={() => handleAnswer("Pokemon")}
                    className="py-8 text-[22px] font-bold font-['Poppins'] bg-[#E63946] hover:bg-[#d32d3a] rounded-[25px] transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    disabled={showFeedback}
                  >
                    Pokémon
                  </Button>
                </div>
              )}

              {showFeedback && (
                <Button
                  onClick={handleNextQuestion}
                  className="bg-[#E63946] hover:bg-[#d32d3a] mx-4 rounded-[25px] transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  Next Question
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
