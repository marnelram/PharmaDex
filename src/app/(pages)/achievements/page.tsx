import { auth } from "@/auth";
import { allAchievements } from "@/lib/achievements/achievement-defs";
import prisma from "@/lib/db/prisma";
import AchievementsClient from "@/components/achievements/AchievementsClient";
import { AchievementWithProgress } from "@/components/achievements/AchievementCard";

export default async function AchievementsPage() {
  const session = await auth();

  let achievements: AchievementWithProgress[] = [];

  if (session?.user?.id) {
    const userId = session.user.id;

    // Fetch user achievements
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: {
        achievement: true,
      },
    });

    // Fetch user stats
    const userStats = await prisma.stats.findUnique({
      where: { userId },
    });

    // Process achievements with progress information
    achievements = allAchievements.map((achievementDef) => {
      // Find if the achievement is unlocked
      const userAchievement = userAchievements.find(
        (ua) => ua.achievement.name === achievementDef.name
      );

      const isUnlocked = !!userAchievement;
      let progress = 0;

      // Calculate progress based on user stats
      if (userStats) {
        switch (achievementDef.category) {
          case "quiz-count":
            progress = Math.min(
              100,
              (userStats.totalQuizzes / achievementDef.threshold) * 100
            );
            break;
          case "practice-score":
            const practiceScore =
              userStats.correctPokemonAnswers + userStats.correctDrugAnswers;
            progress = Math.min(
              100,
              (practiceScore / achievementDef.threshold) * 100
            );
            break;
          case "streak":
            progress = Math.min(
              100,
              (userStats.longestStreak / achievementDef.threshold) * 100
            );
            break;
          case "pokemon-experts":
            progress = Math.min(
              100,
              (userStats.correctPokemonAnswers / achievementDef.threshold) * 100
            );
            break;
          case "drug-experts":
            progress = Math.min(
              100,
              (userStats.correctDrugAnswers / achievementDef.threshold) * 100
            );
            break;
          case "perfect-score":
            progress = Math.min(
              100,
              (userStats.perfectQuizzes / achievementDef.threshold) * 100
            );
            break;
          case "speed-demon":
            // For speed achievements
            if (
              userStats.fastestQuiz > 0 &&
              userStats.fastestQuiz <= achievementDef.threshold
            ) {
              progress = 100;
            } else {
              progress = 0;
            }
            break;
          default:
            progress = 0;
        }
      }

      return {
        definition: achievementDef,
        progress: Math.round(progress),
        isUnlocked,
        unlockedAt: userAchievement?.createdAt?.toISOString(),
      };
    });
  } else {
    // For non-logged in users, just show all achievements as locked
    achievements = allAchievements.map((achievement) => ({
      definition: achievement,
      progress: 0,
      isUnlocked: false,
    }));
  }

  return <AchievementsClient achievements={achievements} />;
}
