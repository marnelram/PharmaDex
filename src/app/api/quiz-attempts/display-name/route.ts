import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { quizAttemptId, displayName } = body;

    const updatedAttempt = await prisma.quizAttempt.update({
      where: { id: quizAttemptId },
      data: { displayName },
    });

    return NextResponse.json(updatedAttempt);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to update display name: ${error}` },
      { status: 500 }
    );
  }
}
