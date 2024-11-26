"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronDown, ClipboardList } from "lucide-react"; // Import the icon
import { Answer, QuizAttempt } from "@prisma/client";
import { cn } from "@/lib/utils"; // Add this import if not already present
import { DisplayNameDialog } from "@/components/display-name-dialog";

interface ResultsProps {
  quizAttempt: QuizAttempt;
  username: string | null;
  totalScore: number;
  correctCount: number;
  totalQuestions: number;
  rank: number;
  topAttempts: Array<{
    id: string;
    totalScore: number;
    displayName?: string | null;
    user?: { name: string | null } | null;
  }>;
  wrongAnswers: Answer[];
}

export default function Results({
  quizAttempt,
  username,
  totalScore,
  correctCount,
  totalQuestions,
  rank,
  topAttempts,
  wrongAnswers,
}: ResultsProps) {
  const router = useRouter();
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const [showModal, setShowModal] = React.useState(false);
  const [showConfetti, setShowConfetti] = React.useState(false);
  const [showLeaderboard, setShowLeaderboard] = React.useState(false);
  const [showDisplayNameDialog, setShowDisplayNameDialog] =
    React.useState(false);

  useEffect(() => {
    if (!username && !quizAttempt.displayName) {
      setShowDisplayNameDialog(true);
    }
  }, [username, quizAttempt.displayName]);

  if (percentage >= 95 && !showConfetti) {
    setShowConfetti(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-2 sm:p-8">
      <Card className="w-full max-w-2xl rounded-[15px] shadow-lg">
        <CardContent className="p-4 sm:p-8 flex flex-col items-center justify-center gap-4 sm:gap-8">
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-4">
            <h1 className="text-[32px] sm:text-[44px] font-bold text-center font-['Poppins']">
              Quiz Results
            </h1>
            {/* Achievement Message */}
            <div className="flex items-center gap-2 text-[16px] sm:text-[22px] font-['Raleway']">
              <span role="img" aria-label="achievement icon">
                {percentage >= 95
                  ? "💊"
                  : percentage >= 80
                  ? "🏆"
                  : percentage <= 60
                  ? "❓"
                  : "📚"}
              </span>
              <p className="text-center">
                {percentage >= 95
                  ? "Drug and Pokemon Master!"
                  : percentage >= 80
                  ? "Pokémon Professor in the making!"
                  : percentage <= 60
                  ? "Were you just guessing?"
                  : "Time to study up!"}
              </p>
            </div>
          </div>

          {/* Score Section */}
          <div className="flex items-center gap-8 sm:gap-16">
            {/* Circle percentage */}
            <div className="relative w-48 h-48">
              {/* Grade percentage */}
              <div className="absolute z-20 top-0 right-0 bg-white rounded-full size-14 border-2 border-[#E63946] flex items-center justify-center shadow-md">
                <span className="text-[18px] font-['Poppins'] font-bold text-[#E63946]">
                  {percentage}%
                </span>
              </div>

              <div className="absolute inset-0 rounded-full border-8 border-[#E63946] overflow-hidden">
                <div
                  className="absolute bottom-0 w-full bg-[#E63946] transition-all duration-1000"
                  style={{ height: `${percentage}%` }}
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[32px] font-['Poppins'] font-bold">
                  {/* Diagonal fraction */}
                  <div className="flex flex-col items-start">
                    <span className="text-[32px] w-full text-center font-['Poppins'] font-bold">
                      {correctCount}
                    </span>
                    <span className="h-[3px] w-16 text-black bg-black" />
                    <span className="text-[32px] w-full text-center font-['Poppins'] font-bold ">
                      {totalQuestions}
                    </span>
                  </div>
                </p>
              </div>

              <Button
                variant="ghost"
                className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full"
                onClick={() => setShowModal(true)}
              >
                <ClipboardList className="size-16 text-gray-600" />
              </Button>
            </div>
          </div>

          {/* Score and Rank Display */}
          <div className="flex w-full flex-col items-baseline gap-2">
            {/* Score display */}
            <div className="flex w-full text-[28px] font-['Poppins'] font-medium items-center justify-center gap-4">
              <h2 className="">Score: </h2>
              <p className="text-[28px] font-bold">
                {totalScore.toLocaleString()}
              </p>
            </div>

            {/* Rank display with accordion */}
            <div className="flex w-full flex-col">
              <div
                className={cn(
                  "relative flex w-full justify-center items-center gap-2 border-2 p-2 text-[22px] font-['Poppins'] bg-[#e6e6e6]",
                  showLeaderboard ? "rounded-t-lg" : "rounded-lg"
                )}
              >
                <span className="font-medium">Rank:</span>
                <div className="bg-[#F3E260] px-4 py-1 rounded-full flex items-center gap-2">
                  <div className="relative">
                    <span className="text-[22px] font-bold">#{rank}</span>
                    {rank <= 3 && (
                      <span className="absolute -top-5 left-7 text-[24px]">
                        {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowLeaderboard(!showLeaderboard)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-gray-100 rounded-lg p-1"
                >
                  <ChevronDown
                    className={cn(
                      "size-8 text-gray-600 transition-transform duration-200",
                      showLeaderboard && "transform rotate-180"
                    )}
                  />
                </button>
              </div>

              {/* Leaderboard accordion content */}
              <div
                className={cn(
                  "grid gap-2 overflow-hidden transition-all duration-200",
                  showLeaderboard
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      "bg-[#e6e6e6] p-4 shadow-sm",
                      showLeaderboard ? "rounded-b-lg" : "rounded-lg"
                    )}
                  >
                    <h3 className="font-['Poppins'] font-semibold text-lg mb-3">
                      Top Scores:
                    </h3>
                    <div className="space-y-2">
                      {topAttempts.map((attempt, index) => {
                        // Show only first 10 and last 3 entries
                        if (index < 10 || index >= topAttempts.length - 3) {
                          return (
                            <div
                              key={attempt.id}
                              className={cn(
                                "flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 px-4 sm:px-6",
                                attempt.id === quizAttempt.id &&
                                  "bg-[#F3E260] hover:bg-[#fcf7c9]"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <span className="font-['Poppins'] font-medium w-8">
                                  #{index + 1}
                                </span>
                                <span className="font-['Raleway']">
                                  {attempt.displayName ||
                                    attempt.user?.name ||
                                    "Anonymous"}
                                </span>
                              </div>
                              <span className="font-['Poppins'] font-bold">
                                {attempt.totalScore.toLocaleString()}
                              </span>
                            </div>
                          );
                        } else if (index === 10) {
                          // Add ellipsis between top 10 and bottom 3
                          return (
                            <div
                              key="ellipsis"
                              className="text-center py-2 text-gray-500 font-['Poppins']"
                            >
                              • • •
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-4">
            <Button
              onClick={() => router.push("/")}
              className="h-12 px-6 rounded-[25px] bg-[#9E9E9E] hover:bg-[#757575] transition-all duration-300 font-['Raleway'] text-[14px] font-medium"
            >
              Back to Home
            </Button>
            <Button
              onClick={() => router.push("/quiz")}
              className="h-12 px-6 rounded-[25px] bg-[#E63946] hover:bg-[#d62f3c] hover:scale-105 transition-all duration-300 font-['Raleway'] text-[14px] font-medium"
            >
              Play Again
            </Button>
          </div>
        </CardContent>
      </Card>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md max-h-[60vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[22px] font-['Poppins'] font-bold">
              Review Mistakes
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            {wrongAnswers.map((answer, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex flex-col">
                  <span className="font-['Poppins'] font-medium">
                    {answer.questionName}
                  </span>
                  <span className="text-sm text-gray-500 font-['Raleway']">
                    Actually a{" "}
                    {answer.userGuess === "Drug" ? "Pokémon" : "Drug"}
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-['Raleway'] ${
                    answer.userGuess === "Drug"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  Guessed {answer.userGuess}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-md max-h-[60vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-[22px] font-['Poppins'] font-bold">
              Review Mistakes
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 mt-4">
            {wrongAnswers.map((answer, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex flex-col">
                  <span className="font-['Poppins'] font-medium">
                    {answer.questionName}
                  </span>
                  <span className="text-sm text-gray-500 font-['Raleway']">
                    Actually a{" "}
                    {answer.userGuess === "Drug" ? "Pokémon" : "Drug"}
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-['Raleway'] ${
                    answer.userGuess === "Drug"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  Guessed {answer.userGuess}
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      <DisplayNameDialog
        quizAttemptId={quizAttempt.id}
        open={showDisplayNameDialog}
        onOpenChange={setShowDisplayNameDialog}
        onSuccess={() => {
          router.refresh();
        }}
      />
    </div>
  );
}
