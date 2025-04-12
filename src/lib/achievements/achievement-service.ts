import prisma from "@/lib/db/prisma";
import {
  getAchievementsByCategory,
  AchievementDefinition,
} from "./achievement-defs";

/**
 * Interface for achievement checking results
 */
export interface AchievementCheckResult {
  userId: string;
  newlyUnlockedAchievements: AchievementDefinition[];
  allUserAchievements: Array<{
    id: string;
    userId: string;
    achievementId: string;
    createdAt: Date;
    achievement: {
      id: string;
      name: string;
      description: string;
      icon: string;
      category: string;
      createdAt: Date;
      updatedAt: Date;
    };
  }>;
}

/**
 * Check if a user has already unlocked an achievement
 * @param userId The user's ID
 * @param achievementId The achievement's ID
 */
async function hasUnlockedAchievement(
  userId: string,
  achievementName: string
): Promise<boolean> {
  const achievement = await prisma.achievement.findUnique({
    where: { name: achievementName },
  });

  if (!achievement) return false;

  const userAchievement = await prisma.userAchievement.findFirst({
    where: {
      userId,
      achievementId: achievement.id,
    },
  });

  return !!userAchievement;
}

/**
 * Award an achievement to a user
 * @param userId The user's ID
 * @param achievementName The achievement's name
 */
async function awardAchievement(
  userId: string,
  achievementName: string
): Promise<void> {
  const achievement = await prisma.achievement.findUnique({
    where: { name: achievementName },
  });

  if (!achievement) {
    console.error(`Achievement not found: ${achievementName}`);
    return;
  }

  // Check if the user already has this achievement
  const existingAchievement = await prisma.userAchievement.findFirst({
    where: {
      userId,
      achievementId: achievement.id,
    },
  });

  if (existingAchievement) {
    // User already has this achievement
    return;
  }

  // Award the achievement
  await prisma.userAchievement.create({
    data: {
      userId,
      achievementId: achievement.id,
    },
  });
}

/**
 * Check quiz count achievements
 * @param userId The user's ID
 */
async function checkQuizCountAchievements(
  userId: string
): Promise<AchievementDefinition[]> {
  const stats = await prisma.stats.findUnique({
    where: { userId },
  });

  if (!stats) return [];

  const quizCountAchievements = getAchievementsByCategory("quiz-count");
  const newlyUnlocked: AchievementDefinition[] = [];

  for (const achievement of quizCountAchievements) {
    if (stats.totalQuizzes >= achievement.threshold) {
      const alreadyUnlocked = await hasUnlockedAchievement(
        userId,
        achievement.name
      );
      if (!alreadyUnlocked) {
        await awardAchievement(userId, achievement.name);
        newlyUnlocked.push(achievement);
      }
    }
  }

  return newlyUnlocked;
}

/**
 * Check practice score achievements
 * @param userId The user's ID
 */
async function checkPracticeScoreAchievements(
  userId: string
): Promise<AchievementDefinition[]> {
  // For now, we'll assume the total score is the sum of correct answers
  // In a real implementation, you'd track practice mode score separately
  const stats = await prisma.stats.findUnique({
    where: { userId },
  });

  if (!stats) return [];

  const totalScore = stats.correctPokemonAnswers + stats.correctDrugAnswers;
  const practiceScoreAchievements = getAchievementsByCategory("practice-score");
  const newlyUnlocked: AchievementDefinition[] = [];

  for (const achievement of practiceScoreAchievements) {
    if (totalScore >= achievement.threshold) {
      const alreadyUnlocked = await hasUnlockedAchievement(
        userId,
        achievement.name
      );
      if (!alreadyUnlocked) {
        await awardAchievement(userId, achievement.name);
        newlyUnlocked.push(achievement);
      }
    }
  }

  return newlyUnlocked;
}

/**
 * Check streak achievements
 * @param userId The user's ID
 */
async function checkStreakAchievements(
  userId: string
): Promise<AchievementDefinition[]> {
  const stats = await prisma.stats.findUnique({
    where: { userId },
  });

  if (!stats) return [];

  const streakAchievements = getAchievementsByCategory("streak");
  const newlyUnlocked: AchievementDefinition[] = [];

  for (const achievement of streakAchievements) {
    if (stats.longestStreak >= achievement.threshold) {
      const alreadyUnlocked = await hasUnlockedAchievement(
        userId,
        achievement.name
      );
      if (!alreadyUnlocked) {
        await awardAchievement(userId, achievement.name);
        newlyUnlocked.push(achievement);
      }
    }
  }

  return newlyUnlocked;
}

/**
 * Check Pokémon expert achievements
 * @param userId The user's ID
 */
async function checkPokemonExpertAchievements(
  userId: string
): Promise<AchievementDefinition[]> {
  const stats = await prisma.stats.findUnique({
    where: { userId },
  });

  if (!stats) return [];

  const pokemonExpertAchievements =
    getAchievementsByCategory("pokemon-experts");
  const newlyUnlocked: AchievementDefinition[] = [];

  for (const achievement of pokemonExpertAchievements) {
    if (stats.correctPokemonAnswers >= achievement.threshold) {
      const alreadyUnlocked = await hasUnlockedAchievement(
        userId,
        achievement.name
      );
      if (!alreadyUnlocked) {
        await awardAchievement(userId, achievement.name);
        newlyUnlocked.push(achievement);
      }
    }
  }

  return newlyUnlocked;
}

/**
 * Check drug expert achievements
 * @param userId The user's ID
 */
async function checkDrugExpertAchievements(
  userId: string
): Promise<AchievementDefinition[]> {
  const stats = await prisma.stats.findUnique({
    where: { userId },
  });

  if (!stats) return [];

  const drugExpertAchievements = getAchievementsByCategory("drug-experts");
  const newlyUnlocked: AchievementDefinition[] = [];

  for (const achievement of drugExpertAchievements) {
    if (stats.correctDrugAnswers >= achievement.threshold) {
      const alreadyUnlocked = await hasUnlockedAchievement(
        userId,
        achievement.name
      );
      if (!alreadyUnlocked) {
        await awardAchievement(userId, achievement.name);
        newlyUnlocked.push(achievement);
      }
    }
  }

  return newlyUnlocked;
}

/**
 * Check perfect score achievements
 * @param userId The user's ID
 */
async function checkPerfectScoreAchievements(
  userId: string
): Promise<AchievementDefinition[]> {
  const stats = await prisma.stats.findUnique({
    where: { userId },
  });

  if (!stats) return [];

  const perfectScoreAchievements = getAchievementsByCategory("perfect-score");
  const newlyUnlocked: AchievementDefinition[] = [];

  for (const achievement of perfectScoreAchievements) {
    if (stats.perfectQuizzes >= achievement.threshold) {
      const alreadyUnlocked = await hasUnlockedAchievement(
        userId,
        achievement.name
      );
      if (!alreadyUnlocked) {
        await awardAchievement(userId, achievement.name);
        newlyUnlocked.push(achievement);
      }
    }
  }

  return newlyUnlocked;
}

/**
 * Check speed demon achievements
 * @param userId The user's ID
 * @param quizDuration The duration of the most recent quiz in milliseconds
 */
async function checkSpeedDemonAchievements(
  userId: string,
  quizDuration?: number
): Promise<AchievementDefinition[]> {
  const stats = await prisma.stats.findUnique({
    where: { userId },
  });

  if (!stats) return [];

  const speedDemonAchievements = getAchievementsByCategory("speed-demon");
  const newlyUnlocked: AchievementDefinition[] = [];

  // If a specific quiz duration was provided, check if it qualifies for any achievements
  if (quizDuration) {
    for (const achievement of speedDemonAchievements) {
      // For speed demon achievements, threshold is the maximum time allowed (in milliseconds)
      if (quizDuration <= achievement.threshold) {
        const alreadyUnlocked = await hasUnlockedAchievement(
          userId,
          achievement.name
        );
        if (!alreadyUnlocked) {
          await awardAchievement(userId, achievement.name);
          newlyUnlocked.push(achievement);
        }
      }
    }
  }
  // Otherwise, check based on the fastest quiz time recorded in stats
  else if (stats.fastestQuiz > 0) {
    for (const achievement of speedDemonAchievements) {
      if (stats.fastestQuiz <= achievement.threshold) {
        const alreadyUnlocked = await hasUnlockedAchievement(
          userId,
          achievement.name
        );
        if (!alreadyUnlocked) {
          await awardAchievement(userId, achievement.name);
          newlyUnlocked.push(achievement);
        }
      }
    }
  }

  return newlyUnlocked;
}

/**
 * Check all achievements for a user
 * @param userId The user's ID
 * @param quizDuration Optional quiz duration for speed achievements
 */
export async function checkAllAchievements(
  userId: string,
  quizDuration?: number
): Promise<AchievementCheckResult> {
  // Run all achievement checkers
  const [
    quizCountAchievements,
    practiceScoreAchievements,
    streakAchievements,
    pokemonExpertAchievements,
    drugExpertAchievements,
    perfectScoreAchievements,
    speedDemonAchievements,
  ] = await Promise.all([
    checkQuizCountAchievements(userId),
    checkPracticeScoreAchievements(userId),
    checkStreakAchievements(userId),
    checkPokemonExpertAchievements(userId),
    checkDrugExpertAchievements(userId),
    checkPerfectScoreAchievements(userId),
    checkSpeedDemonAchievements(userId, quizDuration),
  ]);

  // Combine all newly unlocked achievements
  const newlyUnlockedAchievements = [
    ...quizCountAchievements,
    ...practiceScoreAchievements,
    ...streakAchievements,
    ...pokemonExpertAchievements,
    ...drugExpertAchievements,
    ...perfectScoreAchievements,
    ...speedDemonAchievements,
  ];

  // Get all user achievements
  const userAchievements = await prisma.userAchievement.findMany({
    where: { userId },
    include: { achievement: true },
  });

  return {
    userId,
    newlyUnlockedAchievements,
    allUserAchievements: userAchievements,
  };
}

/**
 * Check achievements after quiz completion
 * @param userId The user's ID
 * @param quizData Quiz completion data
 */
export async function checkAchievementsAfterQuiz(
  userId: string,
  quizData: {
    totalQuestions: number;
    correctAnswers: number;
    duration: number;
    isPerfect: boolean;
  }
): Promise<AchievementCheckResult> {
  // Check all achievements with the quiz duration
  return checkAllAchievements(userId, quizData.duration);
}
