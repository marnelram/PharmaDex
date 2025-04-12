import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";
import { getAllAchievementCategories } from "@/lib/achievements/achievement-defs";
import { checkAchievementsAfterQuiz } from "@/lib/achievements/achievement-service";

/**
 * GET - Retrieve user achievements, grouped by category
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  try {
    // Get all user achievements with their achievement definition
    const userAchievements = await prisma.userAchievement.findMany({
      where: {
        userId,
      },
      include: {
        achievement: true,
      },
    });

    // Get all achievement categories
    const categories = getAllAchievementCategories();

    // Create a map of category -> achievements
    const achievementsByCategory: Record<string, typeof userAchievements> = {};

    // Initialize each category with an empty array
    categories.forEach((category) => {
      achievementsByCategory[category] = [];
    });

    // Group achievements by category
    userAchievements.forEach((userAchievement) => {
      const category = userAchievement.achievement.category;
      if (achievementsByCategory[category]) {
        achievementsByCategory[category].push(userAchievement);
      }
    });

    // Get recently unlocked achievements (last 5)
    const recentlyUnlocked = [...userAchievements]
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 5);

    return NextResponse.json({
      achievements: achievementsByCategory,
      recentlyUnlocked,
      totalCount: userAchievements.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch achievements: ${error}` },
      { status: 500 }
    );
  }
}

/**
 * POST - Check for new achievements after quiz completion
 * Body: { userId, quizData: { totalQuestions, correctAnswers, duration, isPerfect } }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, quizData } = body;

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 });
    }

    if (!quizData) {
      return NextResponse.json(
        { error: "Quiz data required" },
        { status: 400 }
      );
    }

    // Check for newly unlocked achievements
    const achievementResult = await checkAchievementsAfterQuiz(
      userId,
      quizData
    );

    // Return newly unlocked achievements
    return NextResponse.json({
      newlyUnlocked: achievementResult.newlyUnlockedAchievements,
      totalAchievements: achievementResult.allUserAchievements.length,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to check achievements: ${error}` },
      { status: 500 }
    );
  }
}
