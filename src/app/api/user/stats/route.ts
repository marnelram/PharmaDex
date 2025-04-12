import { NextResponse } from "next/server";
import { getUserStats } from "@/lib/stats/update-stats";

/**
 * GET - Retrieve user stats
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  try {
    // Get user stats
    const userStats = await getUserStats(userId);

    return NextResponse.json(userStats);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch user stats: ${error}` },
      { status: 500 }
    );
  }
}
