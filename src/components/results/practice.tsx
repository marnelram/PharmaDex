"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { Answer, QuizAttempt } from "@/generated/prisma/browser";
import { useState } from "react";
import { MistakeDialog } from "./mistakes-dialog";
import { PokeballPercentage } from "./pokeball";

interface PracticeResultsProps {
  quizAttempt: QuizAttempt;
  totalScore: number;
  correctCount: number;
  totalQuestions: number;
  wrongAnswers: Answer[];
}

export default function PracticeResults({
  correctCount,
  totalQuestions,
  wrongAnswers,
}: PracticeResultsProps) {
  const router = useRouter();
  const percentage = Math.round((correctCount / totalQuestions) * 100);
  const [showModal, setShowModal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

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
      <Card className="retro-card w-full max-w-2xl animate-retro-slide">
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
    </div>
  );
}
