"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { ChevronDown } from "lucide-react";
import { Answer, QuizAttempt } from "@prisma/client";
import { cn } from "@/lib/utils"; // Add this import if not already present
import { DisplayNameDialog } from "@/components/results/display-name-dialog";
import { MistakeDialog } from "./mistakes-dialog";
import { PokeballPercentage } from "./pokeball";

interface TimedResultsProps {
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

export default function TimedResults({
  quizAttempt,
  username,
  totalScore,
  correctCount,
  totalQuestions,
  rank,
  topAttempts,
  wrongAnswers,
}: TimedResultsProps) {
  const router = useRouter();
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showDisplayNameDialog, setShowDisplayNameDialog] = useState(false);

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
    <div className="flex flex-col items-center justify-center p-2 sm:p-8">
      <Card className="retro-card w-full mb-20 sm:mb-0 max-w-2xl animate-retro-slide">
        <CardContent className="p-4 sm:p-8 flex flex-col items-center justify-center gap-4 sm:gap-8">
          <div className="flex flex-col items-center justify-center gap-2 sm:gap-4">
            <div className="flex items-center gap-2 mx-2">
              <div className="animate-retro-glow text-2xl sm:text-4xl">🎯</div>
              <h1 className="text-center">Quiz Results</h1>
              <div className="animate-retro-glow text-2xl sm:text-4xl">🎯</div>
            </div>
            {/* Achievement Message */}
            <div className="flex items-center gap-2">
              <span
                role="img"
                aria-label="achievement icon"
                className="animate-retro-bounce"
              >
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
            <PokeballPercentage
              correctCount={correctCount}
              totalQuestions={totalQuestions}
              percentage={percentage}
              onMistakesClick={() => setShowModal(true)}
            />
          </div>

          {/* Score and Rank Display */}
          <div className="flex w-full flex-col items-baseline gap-2">
            {/* Score display */}
            <div className="flex w-full items-center justify-center gap-4">
              <h2 className="text-xl font-bold">⭐ Score: </h2>
              <p className="text-2xl font-bold text-accent-red">
                {totalScore.toLocaleString()}
              </p>
            </div>

            {/* Rank display with accordion */}
            <div className="flex w-full flex-col">
              <div
                className={cn(
                  "relative flex w-full justify-center items-center gap-2 border-2 p-2 bg-secondary/60 border-secondary pixel-border",
                  showLeaderboard ? "rounded-t-lg" : "rounded-lg"
                )}
              >
                <span className="font-medium">🏆 Rank:</span>
                <div className="bg-accent-red-light px-4 py-1 rounded-full flex items-center gap-2 pixel-border">
                  <div className="relative">
                    <span className="font-bold">#{rank}</span>
                    {rank <= 3 && (
                      <span className="absolute -top-5 left-7 text-2xl animate-retro-bounce">
                        {rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉"}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setShowLeaderboard(!showLeaderboard)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 hover:bg-secondary/20 transition-colors duration-300 rounded-lg p-1"
                >
                  <ChevronDown
                    className={cn(
                      "size-8 text-foreground transition-transform duration-200 animate-retro-pulse",
                      showLeaderboard && "transform rotate-180"
                    )}
                  />
                </button>
              </div>

              {/* Leaderboard accordion content */}
              <div
                className={cn(
                  "grid gap-2 overflow-hidden transition-all duration-200 ",
                  showLeaderboard
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div
                    className={cn(
                      "bg-secondary/60 p-4 shadow-sm pixel-border",
                      showLeaderboard ? "rounded-b-lg" : "rounded-lg"
                    )}
                  >
                    <h3 className="font-semibold text-lg mb-3">
                      🏆 Top Scores:
                    </h3>
                    <div className="space-y-2">
                      {topAttempts.map((attempt, index) => {
                        // Show only first 10 and last 3 entries
                        if (index < 10 || index >= topAttempts.length - 3) {
                          return (
                            <div
                              key={attempt.id}
                              className={cn(
                                "flex items-center justify-between p-2 rounded-lg hover:bg-secondary/20 px-4 sm:px-6 transition-colors duration-200",
                                attempt.id === quizAttempt.id &&
                                  "bg-accent-red-light hover:bg-accent-red-light/80"
                              )}
                            >
                              <div className="flex items-center gap-3">
                                <span className="font-medium w-8">
                                  #{index + 1}
                                </span>
                                <span>
                                  {attempt.displayName ||
                                    attempt.user?.name ||
                                    "Anonymous"}
                                </span>
                              </div>
                              <span className="font-bold">
                                {attempt.totalScore.toLocaleString()}
                              </span>
                            </div>
                          );
                        } else if (index === 10) {
                          // Add ellipsis between top 10 and bottom 3
                          return (
                            <div
                              key="ellipsis"
                              className="text-center py-2 text-foreground/60"
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
              variant="secondary"
              size="lg"
              onClick={() => router.push("/")}
              className="animate-retro-pulse"
            >
              🏠 Back to Home
            </Button>
            <Button
              variant="default"
              size="lg"
              onClick={() => router.push("/quiz")}
              className="animate-retro-pulse"
            >
              🎮 Play Again
            </Button>
          </div>
        </CardContent>
      </Card>

      <MistakeDialog
        showModal={showModal}
        setShowModal={setShowModal}
        wrongAnswers={wrongAnswers}
      />

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
