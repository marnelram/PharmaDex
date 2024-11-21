"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

export default function Results({
  score,
  totalQuestions,
}: {
  score: number;
  totalQuestions: number;
}) {
  const router = useRouter();
  const percentage = Math.round((score / totalQuestions) * 100);

  if (percentage >= 90) {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-2xl rounded-[15px] shadow-lg">
        <CardContent className="p-8">
          <h1 className="text-[44px] font-bold text-center mb-8 font-['Poppins']">
            Quiz Results
          </h1>

          <div className="relative w-48 h-48 mx-auto mb-8">
            <div className="absolute inset-0 rounded-full border-8 border-[#E63946] overflow-hidden">
              <div
                className="absolute bottom-0 w-full bg-[#E63946] transition-all duration-1000"
                style={{ height: `${percentage}%` }}
              />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-[32px] font-['Poppins'] font-bold">
                {score}/{totalQuestions}
              </p>
            </div>
          </div>

          <p className="text-[22px] font-['Raleway'] text-center mb-8">
            {percentage >= 80
              ? "🏆 Pokémon Professor in the making!"
              : percentage >= 50
              ? "🎯 Getting there! Keep training!"
              : "📚 Time to study up!"}
          </p>

          <div className="flex flex-row items-center justify-center gap-6">
            <Button
              onClick={() => router.push("/")}
              className="h-12 w-32 rounded-[25px] bg-[#9E9E9E] hover:bg-[#757575] transition-all duration-300 font-['Raleway'] text-[14px] font-medium"
            >
              Back to Home
            </Button>
            <Button
              onClick={() => router.push("/quiz")}
              className="h-12 w-32 rounded-[25px] hover:scale-105 bg-[#E63946] hover:bg-[#E63946] transition-all duration-300 font-['Raleway'] text-[14px] font-medium"
            >
              Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
