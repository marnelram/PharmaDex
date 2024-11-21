"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Loader2 } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { DosageFormIcon } from "@/lib/utils/dosage-form";
import { Drug, Fact, Pokemon } from "@prisma/client";

type QuizItems = Array<
  | (Drug & { type: "Drug"; facts: Fact[] })
  | (Pokemon & { type: "Pokemon"; facts: Fact[] })
>;

export default function Quiz({ session }: { session: Session | null }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [currentFact, setCurrentFact] = React.useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });
  const [quizId, setQuizId] = React.useState<string | null>(null);
  const [isQuizComplete, setIsQuizComplete] = React.useState(false);
  const { toast } = useToast();

  // Add mutations for answer and completion
  const {
    mutate: submitAnswer,
    error: answerError,
    isError: isAnswerError,
  } = useMutation({
    mutationFn: async (data: {
      userId?: string;
      quizId?: string;
      questionName: string;
      userGuess: string;
      isCorrect: boolean;
      score: number;
      totalQuestions: number;
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

  // Add mutations for answer and completion
  const {
    data: quizItems = [],
    isLoading: isQuizItemsLoading,
    error: quizItemsError,
    isError: isQuizItemsError,
  } = useQuery<QuizItems>({
    queryKey: ["quizItems"],
    queryFn: async () => {
      const response = await fetch("/api/quiz", {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch quiz items");
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
    mutationFn: async (data: { quizId: string; finalScore: number }) => {
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

  const handleAnswer = async (answer: string) => {
    const correct = answer === quizItems[currentQuestion].type;
    setShowFeedback(true);

    // Set a random fact for feedback
    const facts = quizItems[currentQuestion].facts;
    const randomFact =
      facts.length > 0 ? facts[Math.floor(Math.random() * facts.length)] : null;

    // Show toast with feedback
    toast({
      title: correct ? "Correct! 🎉" : "Incorrect! 😅",
      variant: correct ? "success" : "destructive",
      duration: 1000,
    });

    if (correct) {
      setScore(score + 1);
    }

    submitAnswer(
      {
        userId: session?.user.id,
        quizId: quizId ?? undefined,
        questionName: quizItems[currentQuestion].name,
        userGuess: answer,
        isCorrect: correct,
        score: score + (correct ? 1 : 0),
        totalQuestions: quizItems.length,
      },
      {
        onSuccess: (data) => {
          if (!quizId) setQuizId(data.id);
        },
      }
    );

    // Handle loading and error states
    if (isAnswerError) {
      toast({
        title: "Error saving answer",
        description: answerError?.message,
        variant: "destructive",
      });
    }

    // Show additional information card
    setCurrentFact(randomFact || { title: "", content: "" });
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setCurrentFact({ title: "", content: "" });
    if (currentQuestion < quizItems.length - 1) {
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
        finalScore: score,
      },
      {
        onSuccess: () => {
          setQuizId(null);
          router.push(`/results/${quizId}`);
        },
      }
    );
  };

  const progress = ((currentQuestion + 1) / quizItems.length) * 100;

  // Add loading state for quiz items
  if (isQuizItemsLoading || isQuizAttemptPending) {
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
  if (isQuizItemsError || isQuizAttemptError) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <Card className="w-full max-w-md rounded-[15px]">
          <CardContent className="p-6 text-center font-['Raleway'] flex flex-col items-center gap-4">
            <AlertCircle className="h-12 w-12 text-[#E63946]" />
            <h2 className="text-[22px] font-medium">Error</h2>
            <p className="text-[#9E9E9E]">
              {quizItemsError?.message ||
                quizAttemptError?.message ||
                "Failed to load quiz"}
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
  if (!quizItems || quizItems.length === 0) {
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

  return (
    <div className="size-full bg-[#F5F5F5] flex flex-col items-center sm:p-4 gap-4">
      {/* Title */}
      <h1 className="hidden sm:block text-[44px] font-bold text-center font-['Poppins']">
        Drug or Pokémon?
      </h1>
      <Card className="w-full max-w-2xl rounded-[15px] bg-[#F5F5F5] sm:bg-white shadow-none border-none sm:border sm:shadow-lg">
        <CardContent className="p-8 flex h-[80dvh] sm:h-auto flex-col justify-between gap-4 sm:gap-8">
          {/* Progress Bar */}
          <Progress
            value={progress}
            className="h-3 rounded-full bg-[#9E9E9E]/20"
            indicatorClassName="bg-[#E63946]"
          />

          {/* Quiz Complete */}
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
                    {quizItems[currentQuestion]?.name}
                  </h2>
                  {showFeedback && (
                    <p className="text-[16px] text-[#9E9E9E] font-['Raleway']">
                      {quizItems[currentQuestion]?.description}
                    </p>
                  )}
                </div>
                <div className="w-40 h-40 mx-auto bg-[#9E9E9E]/10 rounded-full flex items-center justify-center">
                  {showFeedback ? (
                    <>
                      {quizItems[currentQuestion]?.type === "Pokemon" && (
                        <Image
                          src={quizItems[currentQuestion]?.image as string}
                          alt={quizItems[currentQuestion]?.name}
                          className="w-full h-full object-contain"
                          width={100}
                          height={100}
                        />
                      )}
                      {quizItems[currentQuestion]?.type === "Drug" && (
                        <DosageFormIcon
                          className="w-full h-full object-contain p-8"
                          form={quizItems[currentQuestion]?.dosageForm}
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
                <div className="text-center">
                  <Card>
                    <CardContent className="p-4 flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <h3 className="text-lg font-semibold">
                          {currentFact.title}
                        </h3>
                        <p className="text-gray-600">{currentFact.content}</p>
                      </div>
                      <Button
                        onClick={handleNextQuestion}
                        className="bg-[#E63946] hover:bg-[#d32d3a] mx-4 rounded-[25px] transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                      >
                        Next Question
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
