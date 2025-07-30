"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Loader2, CheckCircle, XCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import {
  FactsQuiz,
  FactsQuizQuestion,
} from "@/lib/validation/types/facts-quiz";

interface FactsQuizComponentProps {
  quiz: FactsQuiz;
}

export default function FactsQuizComponent({ quiz }: FactsQuizComponentProps) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [totalScore, setTotalScore] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string | null>(
    null
  );
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [isQuizComplete, setIsQuizComplete] = React.useState(false);
  const [correctCount, setCorrectCount] = React.useState(0);
  const { toast } = useToast();

  const { questions, quizId } = quiz;
  const currentQ = questions[currentQuestion];

  // Mutation for submitting answers
  const submitAnswer = useMutation({
    mutationFn: async (answerData: {
      quizId: string;
      questionId: string;
      userAnswer: string;
      score: number;
      isCorrect: boolean;
    }) => {
      const response = await fetch("/api/facts-quiz/answer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answerData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit answer");
      }

      return response.json();
    },
  });

  // Mutation for completing quiz
  const completeQuiz = useMutation({
    mutationFn: async (completeData: {
      quizId: string;
      totalScore: number;
    }) => {
      const response = await fetch("/api/facts-quiz/complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(completeData),
      });

      if (!response.ok) {
        throw new Error("Failed to complete quiz");
      }

      return response.json();
    },
  });

  const calculateScore = (isCorrect: boolean): number => {
    if (!isCorrect) return 0;

    // Base score by difficulty
    const difficultyScores = {
      easy: 100,
      medium: 200,
      hard: 300,
    };

    return (
      difficultyScores[currentQ.difficulty as keyof typeof difficultyScores] ||
      100
    );
  };

  const handleAnswerSelect = async (answer: string) => {
    if (showFeedback) return; // Prevent multiple selections

    setSelectedAnswer(answer);
    const isCorrect = answer === currentQ.correctAnswer;
    const score = calculateScore(isCorrect);

    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
      setTotalScore((prev) => prev + score);
    }

    // Submit answer to API
    await submitAnswer.mutateAsync({
      quizId,
      questionId: currentQ.id,
      userAnswer: answer,
      score,
      isCorrect,
    });

    // Show feedback
    setShowFeedback(true);

    // Show toast notification
    toast({
      title: isCorrect ? "Correct! 🎉" : "Incorrect! 😅",
      description: isCorrect
        ? `+${score} points!`
        : `The correct answer was: ${currentQ.correctAnswer}`,
      variant: isCorrect ? "success" : "destructive",
      duration: 2000,
    });

    // Auto-advance after 3 seconds
    setTimeout(() => {
      handleNextQuestion();
    }, 3000);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleQuizComplete = async () => {
    await completeQuiz.mutateAsync({ quizId, totalScore });
    router.push(`/facts-quiz/results/${quizId}`);
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  if (isQuizComplete) {
    return (
      <div className="w-full max-w-2xl mx-auto p-4">
        <Card className="retro-card">
          <CardContent className="p-8 text-center space-y-6">
            <h2>🎊 Quiz Complete! 🎊</h2>
            <div className="space-y-4">
              <p className="text-xl">
                You scored{" "}
                <strong className="text-[var(--accent-red)]">
                  {totalScore}
                </strong>{" "}
                points!
              </p>
              <p className="text-lg">
                Correct answers: <strong>{correctCount}</strong> out of{" "}
                <strong>{questions.length}</strong>
              </p>
              <p className="text-lg">
                Accuracy:{" "}
                <strong>
                  {Math.round((correctCount / questions.length) * 100)}%
                </strong>
              </p>
            </div>
            <Button
              size="lg"
              onClick={handleQuizComplete}
              disabled={completeQuiz.isPending}
              className="animate-retro-pulse"
            >
              {completeQuiz.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving Results...
                </>
              ) : (
                "View Results"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span>{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-3" />
      </div>

      {/* Score Display */}
      <div className="text-center">
        <p className="text-lg">
          Score:{" "}
          <strong className="text-[var(--accent-red)]">{totalScore}</strong>{" "}
          points
        </p>
      </div>

      {/* Question Card */}
      <Card className="retro-card">
        <CardContent className="p-8 space-y-6">
          {/* Question Header */}
          <div className="text-center space-y-2">
            <div className="inline-block px-4 py-2 bg-[var(--secondary)] rounded-lg pixel-border">
              <span className="text-sm font-bold uppercase">
                {currentQ.category} • {currentQ.difficulty}
              </span>
            </div>
            <h3 className="text-xl leading-relaxed">{currentQ.question}</h3>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 gap-4">
            {currentQ.shuffledAnswers?.map((answer, index) => {
              const isSelected = selectedAnswer === answer;
              const isCorrect = answer === currentQ.correctAnswer;
              const showCorrect = showFeedback && isCorrect;
              const showIncorrect = showFeedback && isSelected && !isCorrect;

              let buttonVariant:
                | "default"
                | "success"
                | "destructive"
                | "secondary" = "secondary";
              let icon = null;

              if (showCorrect) {
                buttonVariant = "success";
                icon = <CheckCircle className="h-5 w-5" />;
              } else if (showIncorrect) {
                buttonVariant = "destructive";
                icon = <XCircle className="h-5 w-5" />;
              } else if (isSelected) {
                buttonVariant = "default";
              }

              return (
                <Button
                  key={index}
                  variant={buttonVariant}
                  size="lg"
                  className={`h-auto p-4 text-left justify-start space-x-3 ${
                    showFeedback ? "cursor-default" : "hover:scale-[1.02]"
                  } transition-all duration-200`}
                  onClick={() => handleAnswerSelect(answer)}
                  disabled={showFeedback}
                >
                  <div className="flex items-center justify-center min-w-[24px] h-6 rounded-full bg-white/20 text-sm font-bold">
                    {String.fromCharCode(65 + index)} {/* A, B, C, D */}
                  </div>
                  <span className="flex-1">{answer}</span>
                  {icon}
                </Button>
              );
            })}
          </div>

          {/* Explanation (shown after answer) */}
          {showFeedback && currentQ.explanation && (
            <div className="mt-6 p-4 bg-[var(--primary-light)] rounded-lg pixel-border">
              <div className="flex items-start space-x-3">
                <AlertCircle className="h-5 w-5 mt-0.5 text-[var(--accent-red)]" />
                <div>
                  <h5 className="font-bold mb-2">Explanation</h5>
                  <p className="text-sm leading-relaxed">
                    {currentQ.explanation}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Next Button (manual advance option) */}
          {showFeedback && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={handleNextQuestion}
                className="animate-retro-bounce"
              >
                {currentQuestion < questions.length - 1
                  ? "Next Question"
                  : "Finish Quiz"}{" "}
                →
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
