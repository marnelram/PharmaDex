"use server";

import prisma from "@/lib/db/prisma";

/**
 * Initialize stats for a new user
 * @param userId The user's ID
 */
export async function initializeUserStats(userId: string) {
  // Check if stats already exist
  const existingStats = await prisma.stats.findUnique({
    where: { userId },
  });

  if (!existingStats) {
    // Create new stats record with zero values
    await prisma.stats.create({
      data: {
        userId,
        correctPokemonAnswers: 0,
        correctDrugAnswers: 0,
        totalQuizzes: 0,
        perfectQuizzes: 0,
        longestStreak: 0,
        fastestQuiz: 0,
      },
    });
  }

  return await prisma.stats.findUnique({
    where: { userId },
  });
}

/**
 * Update stats after answering a question
 * @param userId The user's ID
 * @param isCorrect Whether the answer was correct
 * @param category The category of the answer ("pokemon" or "drug")
 * @param currentStreak The current streak of correct answers
 */
export async function updateStatsAfterAnswer(
  userId: string,
  isCorrect: boolean,
  category: "pokemon" | "drug",
  currentStreak: number
) {
  // Initialize stats if they don't exist
  await initializeUserStats(userId);

  if (!isCorrect) {
    // If answer is incorrect, we just return the current stats
    return await prisma.stats.findUnique({
      where: { userId },
    });
  }

  // Get current stats
  const currentStats = await prisma.stats.findUnique({
    where: { userId },
  });

  // Update the appropriate category counter and longest streak if applicable
  if (category === "pokemon") {
    await prisma.stats.update({
      where: { userId },
      data: {
        correctPokemonAnswers: { increment: 1 },
        longestStreak:
          currentStreak > 0 &&
          currentStreak > (currentStats?.longestStreak || 0)
            ? currentStreak
            : undefined,
      },
    });
  } else {
    await prisma.stats.update({
      where: { userId },
      data: {
        correctDrugAnswers: { increment: 1 },
        longestStreak:
          currentStreak > 0 &&
          currentStreak > (currentStats?.longestStreak || 0)
            ? currentStreak
            : undefined,
      },
    });
  }

  return await prisma.stats.findUnique({
    where: { userId },
  });
}

/**
 * Update stats after completing a quiz
 * @param userId The user's ID
 * @param totalQuestions The total number of questions in the quiz
 * @param correctAnswers The number of correct answers
 * @param quizDuration The duration of the quiz in milliseconds
 */
export async function updateStatsAfterQuiz(
  userId: string,
  totalQuestions: number,
  correctAnswers: number,
  quizDuration: number
) {
  // Initialize stats if they don't exist
  await initializeUserStats(userId);

  // Get current stats
  const currentStats = await prisma.stats.findUnique({
    where: { userId },
  });

  // Calculate if this is a perfect quiz (all answers correct)
  const isPerfectQuiz = correctAnswers === totalQuestions && totalQuestions > 0;

  // Check if this is the fastest quiz
  const isFastestQuiz =
    quizDuration > 0 &&
    (currentStats!.fastestQuiz === 0 ||
      quizDuration < currentStats!.fastestQuiz);

  // Update stats
  await prisma.stats.update({
    where: { userId },
    data: {
      totalQuizzes: { increment: 1 },
      perfectQuizzes: isPerfectQuiz ? { increment: 1 } : undefined,
      fastestQuiz: isFastestQuiz ? quizDuration : undefined,
    },
  });

  return await prisma.stats.findUnique({
    where: { userId },
  });
}

/**
 * Get a user's current stats
 * @param userId The user's ID
 */
export async function getUserStats(userId: string) {
  // Initialize stats if they don't exist
  await initializeUserStats(userId);

  return await prisma.stats.findUnique({
    where: { userId },
  });
}
