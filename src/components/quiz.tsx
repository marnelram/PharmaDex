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

  // Add loading state
  if (isLoading || isQuizAttemptPending) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-100 to-green-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // Add error state
  if (isError || isQuizAttemptError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-100 to-green-100 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Error</h2>
            <p className="text-gray-600 mb-4">
              {error?.message || quizAttemptError?.message}
            </p>
            <Button
              onClick={() => window.location.reload()}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-100 to-green-100 flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6 font-['Poppins']">
            Drug or Pokémon?
          </h1>

          <Progress value={progress} className="mb-6" />

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {quizData[currentQuestion]?.name}
            </h2>
            {showFeedback && (
              <p className="text-gray-600 mb-4">
                {quizData[currentQuestion]?.description}
              </p>
            )}
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
              <span className="text-4xl">?</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleAnswer("Drug")}
              className="py-8 text-xl font-semibold bg-blue-500 hover:bg-blue-600"
              disabled={showFeedback}
            >
              Drug
            </Button>
            <Button
              onClick={() => handleAnswer("Pokemon")}
              className="py-8 text-xl font-semibold bg-red-500 hover:bg-red-600"
              disabled={showFeedback}
            >
              Pokémon
            </Button>
          </div>

          {showFeedback && (
            <div className="mt-6 text-center">
              <Card className="mt-4">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold">
                    Additional Information
                  </h3>
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
