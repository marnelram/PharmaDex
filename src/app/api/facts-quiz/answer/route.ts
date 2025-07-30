import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { FactsQuizAnswerRequest } from "@/lib/validation/types/facts-quiz";

export async function POST(request: Request) {
  try {
    const {
      quizId,
      questionId,
      userAnswer,
      score,
      isCorrect,
    }: FactsQuizAnswerRequest = await request.json();

    // Validate that the quiz attempt exists
    const quizAttempt = await prisma.factsQuizAttempt.findUnique({
      where: { id: quizId },
    });

    if (!quizAttempt) {
      return NextResponse.json(
        { error: "Quiz attempt not found" },
        { status: 404 }
      );
    }

    // Save the answer
    const answer = await prisma.factsQuizAnswer.create({
      data: {
        questionId,
        userAnswer,
        score,
        isCorrect,
        factsQuizAttemptId: quizId,
      },
    });

    // Update quiz attempt stats
    await prisma.factsQuizAttempt.update({
      where: { id: quizId },
      data: {
        totalScore: {
          increment: score,
        },
        correctCount: isCorrect
          ? {
              increment: 1,
            }
          : undefined,
      },
    });

    return NextResponse.json({ success: true, answer });
  } catch (error) {
    console.error("Facts quiz answer error:", error);
    return NextResponse.json(
      { error: `Failed to save answer: ${error}` },
      { status: 500 }
    );
  }
}
