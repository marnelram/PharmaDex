import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { quizId, questionName, totalScore, score, userGuess, isCorrect } =
    body;

  try {
    // Update existing quiz attempt with new answer
    const quizAttempt = await prisma.quizAttempt.update({
      where: { id: quizId },
      data: {
        totalScore,
        correctCount: {
          increment: isCorrect ? 1 : 0,
        },
        answers: {
          create: {
            questionName,
            userGuess,
            score,
            isCorrect,
          },
        },
      },
    });

    return NextResponse.json(quizAttempt);
  } catch (e) {
    // Cast error to Error type
    const error = e as Error;
    console.error("Quiz answer API error:", error.message);

    return NextResponse.json(
      { error: `Failed to save answer: ${error.message}` },
      { status: 500 }
    );
  }
}
