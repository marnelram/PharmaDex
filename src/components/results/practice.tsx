"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";
import { ClipboardList } from "lucide-react"; // Import the icon
import { Answer, QuizAttempt } from "@prisma/client";
import { useState } from "react";
import { MistakeDialog } from "./mistakes-dialog";

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
    <div className="bg-[#F5F5F5] flex flex-col items-center justify-center p-2 sm:p-8">
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
            <div className="relative size-44 sm:size-56">
              {/* Grade percentage */}
              <div className="absolute z-20 top-0 right-0 bg-[#F5F5F5] rounded-full size-14 border-2 border-[#E63946] flex items-center justify-center shadow-md">
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

      <MistakeDialog
        showModal={showModal}
        setShowModal={setShowModal}
        wrongAnswers={wrongAnswers}
      />
    </div>
  );
}
