import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  try {
    const achievements = await prisma.userAchievement.findMany({
      where: {
        userId,
      },
      include: {
        achievement: true,
      },
    });

    return NextResponse.json(achievements);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch achievements: ${error}` },
      { status: 500 }
    );
  }
}
