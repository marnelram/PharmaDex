import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { FactsQuizCompleteRequest } from "@/lib/validation/types/facts-quiz";

export async function POST(request: Request) {
  try {
    const { quizId, totalScore }: FactsQuizCompleteRequest =
      await request.json();

    // Update the quiz attempt as completed
    const completedQuiz = await prisma.factsQuizAttempt.update({
      where: { id: quizId },
      data: {
        completed: true,
        totalScore,
      },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
        user: true,
      },
    });

    return NextResponse.json({ success: true, quiz: completedQuiz });
  } catch (error) {
    console.error("Facts quiz completion error:", error);
    return NextResponse.json(
      { error: `Failed to complete quiz: ${error}` },
      { status: 500 }
    );
  }
}
