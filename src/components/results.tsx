"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Results({
  score,
  totalQuestions,
}: {
  score: number;
  totalQuestions: number;
}) {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-100 to-green-100 flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6 font-['Poppins']">
            Quiz Results
          </h1>

          <p className="text-xl font-semibold mb-4">
            You scored {score} out of {totalQuestions}!
          </p>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">Thanks for playing!</h2>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={() => router.push("/")}
              className="bg-blue-500 hover:bg-blue-600"
            >
              Back to Home
            </Button>
            <Button
              onClick={() => router.push("/quiz")}
              className="bg-green-500 hover:bg-green-600"
            >
              Play Again
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
