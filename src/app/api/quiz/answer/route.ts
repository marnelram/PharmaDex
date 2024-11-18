import prisma from "@/app/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, questionName, userGuess, isCorrect, score } = body;

    // Create a new quiz attempt if this is the first answer
    const quizAttempt = await prisma.quizAttempt.create({
      data: {
        userId,
        score,
        answers: {
          create: {
            questionName,
            userGuess,
            isCorrect,
          },
        },
      },
    });

    return NextResponse.json(quizAttempt);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to save answer: ${error}` },
      { status: 500 }
    );
  }
}
