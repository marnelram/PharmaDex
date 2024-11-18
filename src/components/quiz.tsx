"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Loader2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Session } from "next-auth";
import { useRouter } from "next/navigation";

export default function Quiz({ session }: { session: Session | null }) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [currentFact, setCurrentFact] = React.useState<{
    title: string;
    content: string;
  }>({ title: "", content: "" });
  const { toast } = useToast();
  const [isQuizComplete, setIsQuizComplete] = React.useState(false);

  const {
    data: quizData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["quiz-questions"],
    queryFn: async () => {
      const response = await fetch("/api/quiz/question");
      if (!response.ok) {
        throw new Error("Failed to fetch quiz questions");
      }
      return response.json();
    },
  });

  // Add mutations for answer and completion
  const answerMutation = useMutation({
    mutationFn: async (data: {
      userId: string;
      questionName: string;
      userGuess: string;
      isCorrect: boolean;
      score: number;
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
    mutationFn: async (data: {
      userId?: string;
      finalScore: number;
      isAnonymous?: boolean;
    }) => {
      const response = await fetch("/api/quiz/complete", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to complete quiz");
      }
      return response.json();
    },
  });

  const handleAnswer = async (answer: string) => {
    const correct = answer === quizData[currentQuestion].type;
    setShowFeedback(true);

    // Set a random fact for feedback
    const facts = quizData[currentQuestion].facts;
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
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    // Updated save answer logic
    if (session?.user) {
      answerMutation.mutate({
        userId: session.user.id,
        questionName: quizData[currentQuestion].name,
        userGuess: answer,
        isCorrect: correct,
        score: score + (correct ? 1 : 0),
      });
    }

    // Show additional information card
    setCurrentFact(randomFact || { title: "", content: "" });
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setCurrentFact({ title: "", content: "" });
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleQuizComplete = async () => {
    if (session?.user) {
      // Existing logged-in user flow
      saveQuizAttempt(
        {
          userId: session.user.id,
          finalScore: score,
        },
        {
          onSuccess: (data) => {
            router.push(`/results/${data.id}`);
          },
        }
      );
    } else {
      // Anonymous user flow
      saveQuizAttempt(
        {
          isAnonymous: true,
          finalScore: score,
        },
        {
          onSuccess: (data) => {
            router.push(`/results/${data.id}?temp=true`);
          },
        }
      );
    }
  };

  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  // Loading state
  if (isLoading || isQuizAttemptPending) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center font-['Raleway'] flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[#E63946]" />
          <p className="text-[16px] font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError || isQuizAttemptError) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <Card className="w-full max-w-md rounded-[15px]">
          <CardContent className="p-6 text-center font-['Raleway'] flex flex-col items-center gap-4">
            <AlertCircle className="h-12 w-12 text-[#E63946]" />
            <h2 className="text-[22px] font-medium">Error</h2>
            <p className="text-[#9E9E9E]">
              {error?.message || quizAttemptError?.message}
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

  return (
    <div className="min-h-screen h-[80dvh] bg-[#F5F5F5] flex flex-col items-center justify-center sm:p-8">
      <Card className="w-full max-w-2xl rounded-[15px] bg-[#F5F5F5] sm:bg-white shadow-none border-none sm:border sm:shadow-lg">
        <CardContent className="p-8 flex flex-col gap-4 sm:gap-8">
          <h1 className="text-[44px] font-bold text-center font-['Poppins']">
            Drug or Pokémon?
          </h1>

          <Progress
            value={progress}
            className="h-3 rounded-full bg-[#9E9E9E]/20"
            indicatorClassName="bg-[#E63946]"
          />

          {isQuizComplete ? (
            <div className="text-center flex flex-col gap-6">
              <h2 className="text-[32px] font-bold font-['Poppins']">
                Quiz Complete!
              </h2>
              <p className="text-[22px] font-medium font-['Raleway']">
                Final Score: {score} / {quizData.length}
              </p>
              <Button
                onClick={handleQuizComplete}
                className="bg-[#E63946] hover:bg-[#d32d3a] py-8 text-[22px] font-bold font-['Poppins'] rounded-[25px] transition-transform duration-300 hover:scale-105"
              >
                See Results
              </Button>
            </div>
          ) : (
            <>
              <div className="text-center flex flex-col gap-4">
                <h2 className="text-[32px] font-bold font-['Poppins']">
                  {quizData[currentQuestion]?.name}
                </h2>
                {showFeedback && (
                  <p className="text-[16px] text-[#9E9E9E] font-['Raleway']">
                    {quizData[currentQuestion]?.description}
                  </p>
                )}
                <div className="w-40 h-40 mx-auto bg-[#9E9E9E]/10 rounded-full flex items-center justify-center">
                  <span className="text-[44px] text-[#9E9E9E]">?</span>
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
                      <h3 className="text-lg font-semibold">
                        {currentFact.title}
                      </h3>
                      <p className="text-gray-600">{currentFact.content}</p>
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

          <div className="mt-6 text-center">
            <p className="text-lg font-semibold">
              Score: {score} / {quizData.length}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
