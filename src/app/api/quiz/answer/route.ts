import prisma from "@/app/lib/db/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const {
    userId,
    quizId,
    questionName,
    userGuess,
    isCorrect,
    score,
    totalQuestions,
  } = body;

  try {
    // Find existing active quiz attempt for this user
    let quizAttempt = await prisma.quizAttempt.findFirst({
      where: {
        id: quizId,
        ...(userId && { userId }),
        completed: false,
      },
    });

    if (!quizAttempt) {
      // Create new quiz attempt if none exists
      quizAttempt = await prisma.quizAttempt.create({
        data: {
          ...(userId && { userId }),
          score,
          totalQuestions,
          answers: {
            create: {
              questionName,
              userGuess,
              isCorrect,
            },
          },
        },
      });
    } else {
      // Add answer to existing quiz attempt
      quizAttempt = await prisma.quizAttempt.update({
        where: { id: quizAttempt.id },
        data: {
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
    }

    return NextResponse.json(quizAttempt);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to save answer: ${error}` },
      { status: 500 }
    );
  }
}
