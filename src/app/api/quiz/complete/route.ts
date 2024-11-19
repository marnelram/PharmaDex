import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  const { quizId, finalScore } = await req.json();

  if (!quizId || typeof finalScore !== "number") {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }

  try {
    await prisma.quizAttempt.update({
      where: { id: quizId },
      data: {
        completed: true,
        score: finalScore,
      },
    });

    return NextResponse.json(
      { message: "Quiz completed successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error completing quiz:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
