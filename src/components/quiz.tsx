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
  const [currentFact, setCurrentFact] = React.useState<string>("");
  const { toast } = useToast();

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
    data: quizAttempt,
    isPending: isQuizAttemptPending,
    error: quizAttemptError,
    isError: isQuizAttemptError,
  } = useMutation({
    mutationFn: async (data: { userId: string; finalScore: number }) => {
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
      facts.length > 0
        ? facts[Math.floor(Math.random() * facts.length)].content
        : null;

    // Show toast with feedback
    toast({
      title: correct ? "Correct! 🎉" : "Incorrect! 😅",
      variant: correct ? "success" : "destructive",
      duration: 2000,
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
    setCurrentFact(randomFact || "No additional information available.");
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setCurrentFact("");
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = async () => {
    if (session?.user) {
      saveQuizAttempt({
        userId: session.user.id,
        finalScore: score,
      });
    }
    if (!isQuizAttemptError) {
      router.push(`/results/${quizAttempt?.id}`);
    }
  };

  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  // Loading state
  if (isLoading || isQuizAttemptPending) {
    return (
      <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
        <div className="text-center font-['Raleway']">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-[#E63946]" />
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
          <CardContent className="p-6 text-center font-['Raleway']">
            <AlertCircle className="h-12 w-12 text-[#E63946] mx-auto mb-4" />
            <h2 className="text-[22px] font-medium mb-2">Error</h2>
            <p className="text-[#9E9E9E] mb-4">
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
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-2xl rounded-[15px] shadow-lg">
        <CardContent className="p-8">
          <h1 className="text-[44px] font-bold text-center mb-8 font-['Poppins']">
            Drug or Pokémon?
          </h1>

          <Progress
            value={progress}
            className="mb-8 h-3 rounded-full bg-[#9E9E9E]/20"
            indicatorClassName="bg-[#E63946]"
          />

          <div className="text-center mb-12">
            <h2 className="text-[32px] font-bold mb-4 font-['Poppins']">
              {quizData[currentQuestion]?.name}
            </h2>
            {showFeedback && (
              <p className="text-[16px] text-[#9E9E9E] mb-4 font-['Raleway']">
                {quizData[currentQuestion]?.description}
              </p>
            )}
            <div className="w-40 h-40 mx-auto bg-[#9E9E9E]/10 rounded-full mb-6 flex items-center justify-center">
              <span className="text-[44px] text-[#9E9E9E]">?</span>
            </div>
          </div>

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

          {showFeedback && (
            <div className="mt-6 text-center">
              <Card className="mt-4">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">{currentFact}</h3>
                  <p className="text-gray-600">{currentFact}</p>
                  <Button
                    onClick={handleNextQuestion}
                    className="mt-4 bg-green-500 hover:bg-green-600"
                  >
                    Next Question
                  </Button>
                </CardContent>
              </Card>
            </div>
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
