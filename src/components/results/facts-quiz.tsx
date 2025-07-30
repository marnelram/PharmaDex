"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  XCircle,
  Trophy,
  Target,
  Clock,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { FactsQuizAttemptWithAnswers } from "@/lib/validation/types/facts-quiz";

interface FactsQuizResultsProps {
  quizAttempt: FactsQuizAttemptWithAnswers;
}

export default function FactsQuizResults({
  quizAttempt,
}: FactsQuizResultsProps) {
  const router = useRouter();

  const { totalScore, correctCount, totalQuestions, answers } = quizAttempt;
  const accuracy = Math.round((correctCount / totalQuestions) * 100);

  // Calculate performance metrics
  const getPerformanceLevel = (accuracy: number) => {
    if (accuracy >= 90)
      return { level: "Excellent", color: "bg-green-500", emoji: "🏆" };
    if (accuracy >= 75)
      return { level: "Great", color: "bg-blue-500", emoji: "🎯" };
    if (accuracy >= 60)
      return { level: "Good", color: "bg-yellow-500", emoji: "👍" };
    if (accuracy >= 40)
      return { level: "Fair", color: "bg-orange-500", emoji: "📚" };
    return { level: "Keep Learning", color: "bg-red-500", emoji: "💪" };
  };

  const performance = getPerformanceLevel(accuracy);

  // Group answers by correctness for better display
  const correctAnswers = answers.filter((answer) => answer.isCorrect);
  const incorrectAnswers = answers.filter((answer) => !answer.isCorrect);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">Facts Quiz Results</h1>
        <p className="text-lg opacity-75">Here's how you performed!</p>
      </div>

      {/* Summary Card */}
      <Card className="retro-card animate-retro-slide">
        <CardContent className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            {/* Total Score */}
            <div className="space-y-2">
              <Trophy className="h-8 w-8 mx-auto text-[var(--accent-red)]" />
              <h3 className="text-2xl font-bold text-[var(--accent-red)]">
                {totalScore}
              </h3>
              <p className="text-sm opacity-75">Total Points</p>
            </div>

            {/* Accuracy */}
            <div className="space-y-2">
              <Target className="h-8 w-8 mx-auto text-[var(--accent-red)]" />
              <h3 className="text-2xl font-bold">{accuracy}%</h3>
              <p className="text-sm opacity-75">Accuracy</p>
            </div>

            {/* Correct Count */}
            <div className="space-y-2">
              <CheckCircle className="h-8 w-8 mx-auto text-green-500" />
              <h3 className="text-2xl font-bold">
                {correctCount}/{totalQuestions}
              </h3>
              <p className="text-sm opacity-75">Correct Answers</p>
            </div>
          </div>

          {/* Performance Badge */}
          <div className="text-center mt-8">
            <div
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-white ${performance.color}`}
            >
              <span className="text-xl">{performance.emoji}</span>
              <span className="font-bold">{performance.level}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Results */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Correct Answers */}
        {correctAnswers.length > 0 && (
          <Card className="retro-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <h3 className="text-lg font-bold text-green-600">
                  Correct Answers ({correctAnswers.length})
                </h3>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {correctAnswers.map((answer, index) => (
                  <div
                    key={answer.id}
                    className="p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {answer.question.category} •{" "}
                        {answer.question.difficulty}
                      </Badge>
                      <span className="text-sm font-bold text-green-600">
                        +{answer.score} pts
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-1">
                      {answer.question.question}
                    </p>
                    <p className="text-sm text-green-700">
                      ✓ {answer.userAnswer}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Incorrect Answers */}
        {incorrectAnswers.length > 0 && (
          <Card className="retro-card">
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-4">
                <XCircle className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-bold text-red-600">
                  Incorrect Answers ({incorrectAnswers.length})
                </h3>
              </div>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {incorrectAnswers.map((answer, index) => (
                  <div
                    key={answer.id}
                    className="p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="text-xs">
                        {answer.question.category} •{" "}
                        {answer.question.difficulty}
                      </Badge>
                      <span className="text-sm font-bold text-red-600">
                        0 pts
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-1">
                      {answer.question.question}
                    </p>
                    <p className="text-sm text-red-700 mb-1">
                      ✗ Your answer: {answer.userAnswer}
                    </p>
                    <p className="text-sm text-green-700">
                      ✓ Correct: {answer.question.correctAnswer}
                    </p>
                    {answer.question.explanation && (
                      <p className="text-xs text-gray-600 mt-2 italic">
                        {answer.question.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Category Breakdown */}
      <Card className="retro-card">
        <CardContent className="p-6">
          <h3 className="text-lg font-bold mb-4">Performance by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(
              answers.reduce((acc, answer) => {
                const category = answer.question.category;
                if (!acc[category]) {
                  acc[category] = { correct: 0, total: 0 };
                }
                acc[category].total++;
                if (answer.isCorrect) acc[category].correct++;
                return acc;
              }, {} as Record<string, { correct: number; total: number }>)
            ).map(([category, stats]) => (
              <div
                key={category}
                className="p-4 bg-[var(--primary-light)] rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <h4 className="font-bold capitalize">{category}</h4>
                  <span className="text-sm">
                    {stats.correct}/{stats.total} (
                    {Math.round((stats.correct / stats.total) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div
                    className="bg-[var(--accent-red)] h-2 rounded-full"
                    style={{ width: `${(stats.correct / stats.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          size="lg"
          onClick={() => router.push("/facts-quiz")}
          className="animate-retro-pulse"
        >
          🔄 Take Another Quiz
        </Button>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => router.push("/")}
          className="flex items-center space-x-2"
        >
          <Home className="h-4 w-4" />
          <span>Back to Home</span>
        </Button>
      </div>

      {/* Spacer for mobile navigation */}
      <div className="h-8"></div>
    </div>
  );
}
