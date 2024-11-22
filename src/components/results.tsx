"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function Results({
  totalScore,
  correctCount,
  totalQuestions,
}: {
  totalScore: number;
  correctCount: number;
  totalQuestions: number;
}) {
  const router = useRouter();
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  if (percentage >= 95) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center sm:p-8">
      <Card className="w-full max-w-2xl rounded-[15px] shadow-lg">
        <CardContent className="p-8 flex flex-col items-center justify-center gap-4 sm:gap-8">
          <h1 className="text-[44px] font-bold text-center font-['Poppins']">
            Quiz Results
          </h1>

          <div className="flex flex-col items-center gap-1">
            <p className="text-[32px] font-['Poppins'] font-bold">
              {correctCount}/{totalQuestions}
            </p>
            <div className="relative w-48 h-48">
              <div
                className="absolute inset-0 rounded-full bg-[#E63946]"
                style={{
                  clipPath: `circle(${percentage}% at 50% 50%)`,
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <p className="text-[28px] font-['Poppins'] text-white">
                  {percentage}%
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <h2 className="text-[32px] font-['Poppins'] font-bold">Score: </h2>
            <div className="bg-[#F3E260] px-8 py-3 rounded-full">
              <p className="text-[28px] font-['Poppins'] font-bold">
                {totalScore.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[22px] font-['Raleway']">
            <span role="img" aria-label="achievement icon">
              {percentage > 90
                ? "💊"
                : percentage >= 80
                ? "🏆"
                : percentage >= 50
                ? "❓"
                : "📚"}
            </span>
            <p className="text-center">
              {percentage > 90
                ? "Drug and Pokemon Master!"
                : percentage >= 80
                ? "Pokémon Professor in the making!"
                : percentage >= 50
                ? "Were you just guessing?"
                : "Time to study up!"}
            </p>
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
    </div>
  );
}
