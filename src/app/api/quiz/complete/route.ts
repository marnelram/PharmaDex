import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/db/prisma";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { userId, finalScore } = await req.json();

  if (!userId || typeof finalScore !== "number") {
    return NextResponse.json({ message: "Invalid data" }, { status: 400 });
  }

  try {
    // Save the final score to the database
    await prisma.quizAttempt.create({
      data: {
        userId,
        score: finalScore,
        totalQuestions: 10,
        user: { connect: { id: userId } },
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
