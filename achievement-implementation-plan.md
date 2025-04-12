# Implementation Plan for PharmaDex Achievement System

## Step 1: Define Achievement Types in Code

Instead of storing thresholds in the database, define them in code for better flexibility:

1. Create a new file: `src/lib/achievements/achievement-defs.ts`

```typescript
// Achievement definitions organized by category
export const ACHIEVEMENTS = {
  QUIZ_COUNT: [
    {
      id: "potion-practitioner",
      name: "Potion Practitioner",
      description: "Complete 3 timed quizzes",
      threshold: 3,
      icon: "potion",
    },
    {
      id: "super-potion-specialist",
      name: "Super Potion Specialist",
      description: "Complete 10 timed quizzes",
      threshold: 10,
      icon: "super_potion",
    },
    {
      id: "hyper-potion-handler",
      name: "Hyper Potion Handler",
      description: "Complete 25 timed quizzes",
      threshold: 25,
      icon: "hyper_potion",
    },
    {
      id: "max-potion-master",
      name: "Max Potion Master",
      description: "Complete 50 timed quizzes",
      threshold: 50,
      icon: "max_potion",
    },
    {
      id: "full-restore-formulator",
      name: "Full Restore Formulator",
      description: "Complete 100 timed quizzes",
      threshold: 100,
      icon: "full_restore",
    },
  ],
  PRACTICE_SCORE: [
    {
      id: "starter-pokemon",
      name: "Starter Pokemon",
      description: "Score 65% on a practice quiz",
      threshold: 65,
      icon: "starter_pokemon",
    },
    {
      id: "pseudo-legendary",
      name: "Pseudo Legendary",
      description: "Score 85% on a practice quiz",
      threshold: 85,
      icon: "pseudo_legendary",
    },
    {
      id: "mythical-pokemon",
      name: "Mythical Pokemon",
      description: "Score a perfect 100% on a practice quiz",
      threshold: 100,
      icon: "mythical_pokemon",
    },
  ],
  TIMED_SCORE: [
    {
      id: "time-attack",
      name: "Time Attack",
      description: "Score over 20,000 points on a timed quiz",
      threshold: 20000,
      icon: "time_attack",
    },
    {
      id: "time-assault",
      name: "Time Assault",
      description: "Score over 30,000 points on a timed quiz",
      threshold: 30000,
      icon: "time_assault",
    },
    {
      id: "time-rampage",
      name: "Time Rampage",
      description: "Score over 40,000 points on a timed quiz",
      threshold: 40000,
      icon: "time_rampage",
    },
  ],
  LEADERBOARD_RANK: [
    {
      id: "rising-star",
      name: "Rising Star",
      description: "Rank in the top 50 on the leaderboard",
      threshold: 50,
      icon: "rising_star",
    },
    {
      id: "elite-3",
      name: "Elite 3",
      description: "Rank in the top 3 on the leaderboard",
      threshold: 3,
      icon: "elite_3",
    },
    {
      id: "leaderboard-champion",
      name: "Leaderboard Champion",
      description: "Reach the #1 spot on the leaderboard",
      threshold: 1,
      icon: "champion",
    },
  ],
  POKEMON_CORRECT: [
    {
      id: "poke-assistant",
      name: "Poké Assistant",
      description: "Correctly identify 50 Pokémon",
      threshold: 50,
      icon: "poke_assistant",
    },
    {
      id: "poke-technician",
      name: "Poké Technician",
      description: "Correctly identify 100 Pokémon",
      threshold: 100,
      icon: "poke_technician",
    },
    {
      id: "poke-pharmacist",
      name: "Poké Pharmacist",
      description: "Correctly identify 500 Pokémon",
      threshold: 500,
      icon: "poke_pharmacist",
    },
  ],
  DRUG_CORRECT: [
    {
      id: "pharmacist-trainer",
      name: "Pharmacist Trainer",
      description: "Correctly identify 50 drugs",
      threshold: 50,
      icon: "pharmacist_trainer",
    },
    {
      id: "ace-pharmacist",
      name: "Ace Pharmacist",
      description: "Correctly identify 100 drugs",
      threshold: 100,
      icon: "ace_pharmacist",
    },
    {
      id: "med-leader",
      name: "Med Leader",
      description: "Correctly identify 500 drugs",
      threshold: 500,
      icon: "med_leader",
    },
  ],
};

// Flattened list for iteration
export const ALL_ACHIEVEMENTS = Object.values(ACHIEVEMENTS).flat();

// Helper to get achievements by category
export function getAchievementsByCategory(category: keyof typeof ACHIEVEMENTS) {
  return ACHIEVEMENTS[category];
}

// Get achievement by ID
export function getAchievementById(id: string) {
  return ALL_ACHIEVEMENTS.find((achievement) => achievement.id === id);
}
```

## Step 2: Update Database Schema

Simplify the database schema:

1. Update the `Achievement` model in the schema to only store achievement metadata:

```prisma
model Achievement {
  id          String            @id @default(cuid())
  name        String            @unique
  description String
  icon        String
  category    String
  users       UserAchievement[]
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
}
```

2. The `UserAchievement` model remains the same, tracking which achievements users have completed:

```prisma
model UserAchievement {
  id            String      @id @default(cuid())
  user          User        @relation(fields: [userId], references: [id])
  userId        String
  achievement   Achievement @relation(fields: [achievementId], references: [id])
  achievementId String
  createdAt     DateTime    @default(now())

  @@unique([userId, achievementId])
}
```

3. Add a new migration and seed achievements from the achievements definition file.

## Step 3: Create Stats Update Utilities

Create specialized utility functions for updating different types of stats:

1. Create a new file: `src/lib/stats/update-stats.ts`

```typescript
import prisma from "@/lib/db/prisma";

// Initialize stats for a new user
export async function initializeUserStats(userId: string) {
  return prisma.stats.create({
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

// Update stats after each answer
export async function updateAnswerStats(
  userId: string,
  isCorrect: boolean,
  category: "pokemon" | "drug"
) {
  if (!userId || !isCorrect) return null;

  // Get current stats or create new ones
  let stats = await prisma.stats.findUnique({
    where: { userId },
  });

  if (!stats) {
    stats = await initializeUserStats(userId);
  }

  // Update the appropriate counter
  if (category === "pokemon") {
    return prisma.stats.update({
      where: { userId },
      data: { correctPokemonAnswers: stats.correctPokemonAnswers + 1 },
    });
  } else {
    return prisma.stats.update({
      where: { userId },
      data: { correctDrugAnswers: stats.correctDrugAnswers + 1 },
    });
  }
}

// Update stats after completing a quiz
export async function updateQuizStats(
  userId: string,
  data: {
    isCompleted: boolean;
    isPerfect: boolean;
    quizTime?: number;
    score?: number;
  }
) {
  if (!userId) return null;

  // Get current stats or create new ones
  let stats = await prisma.stats.findUnique({
    where: { userId },
  });

  if (!stats) {
    stats = await initializeUserStats(userId);
  }

  // Prepare update data
  const updateData: any = {};

  if (data.isCompleted) {
    updateData.totalQuizzes = stats.totalQuizzes + 1;
  }

  if (data.isPerfect) {
    updateData.perfectQuizzes = stats.perfectQuizzes + 1;
  }

  if (
    data.quizTime &&
    (stats.fastestQuiz === 0 || data.quizTime < stats.fastestQuiz)
  ) {
    updateData.fastestQuiz = data.quizTime;
  }

  if (data.score && data.score > stats.topScore) {
    // Update user's top score as well
    await prisma.user.update({
      where: { id: userId },
      data: { topScore: data.score },
    });
  }

  // Only update if there are fields to update
  if (Object.keys(updateData).length > 0) {
    return prisma.stats.update({
      where: { userId },
      data: updateData,
    });
  }

  return stats;
}
```

## Step 4: Create Achievement Service with Modular Checking Functions

Create a modular achievement checking service with separate functions for each category:

1. Create a new file: `src/lib/achievements/achievement-service.ts`

```typescript
import prisma from "@/lib/db/prisma";
import {
  ALL_ACHIEVEMENTS,
  getAchievementsByCategory,
} from "./achievement-defs";

// Category-specific checking functions
const achievementCheckers = {
  QUIZ_COUNT: async (userId: string) => {
    const stats = await prisma.stats.findUnique({ where: { userId } });
    if (!stats) return [];

    const eligibleAchievements = getAchievementsByCategory("QUIZ_COUNT").filter(
      (achievement) => stats.totalQuizzes >= achievement.threshold
    );

    return eligibleAchievements;
  },

  PRACTICE_SCORE: async (userId: string) => {
    const quizAttempts = await prisma.quizAttempt.findMany({
      where: { userId, completed: true },
    });

    const eligibleAchievements = [];
    const practiceScoreAchievements =
      getAchievementsByCategory("PRACTICE_SCORE");

    // Check each achievement against quiz attempts
    for (const achievement of practiceScoreAchievements) {
      const thresholdMet = quizAttempts.some((attempt) => {
        const percentage =
          (attempt.correctCount / attempt.totalQuestions) * 100;
        return percentage >= achievement.threshold;
      });

      if (thresholdMet) {
        eligibleAchievements.push(achievement);
      }
    }

    return eligibleAchievements;
  },

  TIMED_SCORE: async (userId: string) => {
    const quizAttempts = await prisma.quizAttempt.findMany({
      where: { userId, completed: true },
    });

    const eligibleAchievements = [];
    const timedScoreAchievements = getAchievementsByCategory("TIMED_SCORE");

    // Check each achievement against quiz attempts
    for (const achievement of timedScoreAchievements) {
      const thresholdMet = quizAttempts.some(
        (attempt) => attempt.totalScore >= achievement.threshold
      );

      if (thresholdMet) {
        eligibleAchievements.push(achievement);
      }
    }

    return eligibleAchievements;
  },

  LEADERBOARD_RANK: async (userId: string) => {
    // Get user's stats
    const userStats = await prisma.stats.findUnique({ where: { userId } });
    if (!userStats) return [];

    // Get all users ordered by top score
    const users = await prisma.user.findMany({
      orderBy: { topScore: "desc" },
      select: { id: true, topScore: true },
    });

    // Find user's rank (1-indexed)
    const userRank = users.findIndex((user) => user.id === userId) + 1;

    // Find achievements where threshold >= userRank (lower rank = better)
    const eligibleAchievements = getAchievementsByCategory(
      "LEADERBOARD_RANK"
    ).filter((achievement) => userRank <= achievement.threshold);

    return eligibleAchievements;
  },

  POKEMON_CORRECT: async (userId: string) => {
    const stats = await prisma.stats.findUnique({ where: { userId } });
    if (!stats) return [];

    const eligibleAchievements = getAchievementsByCategory(
      "POKEMON_CORRECT"
    ).filter(
      (achievement) => stats.correctPokemonAnswers >= achievement.threshold
    );

    return eligibleAchievements;
  },

  DRUG_CORRECT: async (userId: string) => {
    const stats = await prisma.stats.findUnique({ where: { userId } });
    if (!stats) return [];

    const eligibleAchievements = getAchievementsByCategory(
      "DRUG_CORRECT"
    ).filter(
      (achievement) => stats.correctDrugAnswers >= achievement.threshold
    );

    return eligibleAchievements;
  },
};

// Check all achievement categories and award new ones
export async function checkAndAwardAchievements(userId: string) {
  if (!userId) return [];

  // Get existing user achievements to avoid duplicates
  const existingAchievements = await prisma.userAchievement.findMany({
    where: { userId },
    select: { achievementId: true },
  });
  const existingAchievementIds = existingAchievements.map(
    (a) => a.achievementId
  );

  // Run all achievement checkers
  const newAchievementsPromises = Object.values(achievementCheckers).map(
    (checker) => checker(userId)
  );

  // Flatten results and filter out already awarded achievements
  const allEligibleAchievements = (
    await Promise.all(newAchievementsPromises)
  ).flat();

  // Find achievements in the database that match the eligible ones
  const dbAchievements = await prisma.achievement.findMany({
    where: {
      name: {
        in: allEligibleAchievements.map((a) => a.name),
      },
    },
  });

  // Map achievement definitions to db records
  const achievementMap = new Map();
  dbAchievements.forEach((dbAch) => {
    allEligibleAchievements.forEach((defAch) => {
      if (defAch.name === dbAch.name) {
        achievementMap.set(defAch.id, dbAch.id);
      }
    });
  });

  // Filter out already awarded achievements
  const newAchievements = allEligibleAchievements.filter(
    (achievement) =>
      !existingAchievementIds.includes(achievementMap.get(achievement.id))
  );

  // Award new achievements
  for (const achievement of newAchievements) {
    const dbAchievementId = achievementMap.get(achievement.id);
    if (dbAchievementId) {
      await prisma.userAchievement.create({
        data: {
          userId,
          achievementId: dbAchievementId,
        },
      });
    }
  }

  return newAchievements;
}

// Check for achievements at quiz completion
export async function checkAchievementsAfterQuiz(userId: string) {
  return checkAndAwardAchievements(userId);
}
```

## Step 5: Create Achievement API Endpoints

1. Update the existing API endpoint: `src/app/api/achievements/route.ts`

```typescript
import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { checkAchievementsAfterQuiz } from "@/lib/achievements/achievement-service";
import { ALL_ACHIEVEMENTS } from "@/lib/achievements/achievement-defs";

// GET endpoint to fetch user achievements
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  try {
    // Get user achievements from database
    const userAchievements = await prisma.userAchievement.findMany({
      where: { userId },
      include: { achievement: true },
    });

    // Get achievement definitions with progress information
    const achievementsWithProgress = ALL_ACHIEVEMENTS.map((achievementDef) => {
      const userAchievement = userAchievements.find(
        (ua) => ua.achievement.name === achievementDef.name
      );

      return {
        ...achievementDef,
        completed: !!userAchievement,
        dateCompleted: userAchievement?.createdAt || null,
      };
    });

    // Group by category for easier frontend display
    const groupedAchievements = {};
    achievementsWithProgress.forEach((achievement) => {
      const category = achievement.id.split("-")[0]; // Extract category from ID
      if (!groupedAchievements[category]) {
        groupedAchievements[category] = [];
      }
      groupedAchievements[category].push(achievement);
    });

    return NextResponse.json({
      achievements: achievementsWithProgress,
      groupedAchievements,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch achievements: ${error}` },
      { status: 500 }
    );
  }
}

// POST endpoint to check and award achievements after quiz completion
export async function POST(request: Request) {
  const { userId } = await request.json();

  if (!userId) {
    return NextResponse.json({ error: "User ID required" }, { status: 400 });
  }

  try {
    const newAchievements = await checkAchievementsAfterQuiz(userId);

    return NextResponse.json({
      success: true,
      newAchievements,
    });
  } catch (error) {
    console.error("Achievement error:", error);
    return NextResponse.json(
      { error: `Failed to check achievements: ${error}` },
      { status: 500 }
    );
  }
}
```

## Step 6: Update Quiz Components to Track Stats and Check Achievements

1. Update the quiz completion logic to track stats after each answer and check achievements after completion:

```typescript
// In quiz answer handling function (for tracking after each answer):
async function handleAnswer(
  answer: string,
  isCorrect: boolean,
  category: "pokemon" | "drug"
) {
  if (session?.user?.id) {
    // Update the answer stats immediately (but don't check achievements yet)
    await updateAnswerStats(session.user.id, isCorrect, category);
  }

  // Other answer handling logic...
}

// In quiz completion function:
async function completeQuiz() {
  if (session?.user?.id) {
    // Update quiz stats
    await updateQuizStats(session.user.id, {
      isCompleted: true,
      isPerfect: correctCount === totalQuestions,
      quizTime: quizDuration,
      score: totalScore,
    });

    // Check for achievements only after quiz completion
    const response = await fetch("/api/achievements", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: session.user.id }),
    });

    if (response.ok) {
      const { newAchievements } = await response.json();

      // Show achievement toasts if any were earned
      if (newAchievements && newAchievements.length > 0) {
        // Queue each achievement for display
        newAchievements.forEach((achievement, index) => {
          setTimeout(() => {
            toast({
              title: "Achievement Unlocked!",
              description: achievement.name,
              action: (
                <ToastAction altText="View">
                  <Badge variant="outline">{achievement.description}</Badge>
                </ToastAction>
              ),
            });
          }, index * 1500); // Stagger notifications
        });
      }
    }
  }

  // Navigate to results page
  router.push(`/results?id=${quizAttemptId}`);
}
```

## Step 7: Create Toast Notification System

1. Use shadcn's toast component in the UI:

```typescript
// src/components/ui/toast/achievement-toast.tsx
import { useState, useEffect } from "react";
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
} from "@/components/ui/toast";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import confetti from "canvas-confetti";

export function useAchievementToast() {
  const { toast } = useToast();

  // Show achievement toast with confetti effect
  const showAchievementToast = (achievement) => {
    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    // Display toast
    toast({
      title: "Achievement Unlocked!",
      description: achievement.name,
      action: (
        <ToastAction altText="View">
          <Badge variant="outline">{achievement.description}</Badge>
        </ToastAction>
      ),
    });
  };

  // Queue multiple achievements with a delay between each
  const queueAchievementToasts = (achievements) => {
    achievements.forEach((achievement, index) => {
      setTimeout(() => {
        showAchievementToast(achievement);
      }, index * 1500); // Show each achievement 1.5 seconds apart
    });
  };

  return { showAchievementToast, queueAchievementToasts };
}
```

2. Import and use the toast in the quiz completion:

```typescript
import { useAchievementToast } from "@/components/ui/toast/achievement-toast";

// Inside the component:
const { queueAchievementToasts } = useAchievementToast();

// When achievements are earned:
if (newAchievements && newAchievements.length > 0) {
  queueAchievementToasts(newAchievements);
}
```

## Step 8: Update the Achievements Page

1. Update `src/app/(pages)/achievements/page.tsx` to use the new API endpoint and display achievements with "Recently Unlocked" section:

```typescript
"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Badge,
  Progress,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Pill, Dna, Trophy /* other icons */ } from "lucide-react";
import Link from "next/link";

export default function AchievementsPage() {
  const { data: session } = useSession();
  const [achievementsData, setAchievementsData] = useState({
    achievements: [],
    groupedAchievements: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      if (session?.user?.id) {
        try {
          const response = await fetch(
            `/api/achievements?userId=${session.user.id}`
          );
          const data = await response.json();

          if (response.ok) {
            setAchievementsData(data);
          }
        } catch (error) {
          console.error("Failed to fetch achievements:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchAchievements();
  }, [session?.user?.id]);

  // Get recently unlocked achievements (last 30 days)
  const recentlyUnlocked = achievementsData.achievements
    .filter((a) => a.completed && a.dateCompleted)
    .filter((a) => {
      const unlockDate = new Date(a.dateCompleted);
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      return unlockDate >= thirtyDaysAgo;
    })
    .sort(
      (a, b) =>
        new Date(b.dateCompleted).getTime() -
        new Date(a.dateCompleted).getTime()
    );

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8">
      <Card className="w-full max-w-4xl bg-[#e6e6e6]">
        <CardHeader className="relative p-4 border-b w-full">
          <Link href="/">
            <ChevronLeft className="hover:translate-x-[-5px] transition-transform absolute size-8 left-4 sm:left-12 top-1/2 translate-y-[-50%] cursor-pointer" />
          </Link>
          <CardTitle className="text-[44px] font-bold text-center font-['Poppins']">
            Achievements & Badges
          </CardTitle>
          <CardDescription className="text-[16px] font-['Raleway'] text-center">
            Track your progress and unlock rewards
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="all">All Achievements</TabsTrigger>
              <TabsTrigger value="recent">Recently Unlocked</TabsTrigger>
              <TabsTrigger value="locked">In Progress</TabsTrigger>
            </TabsList>

            {/* All Achievements Tab */}
            <TabsContent value="all">
              <ScrollArea className="h-[70vh] rounded-[15px]">
                {Object.entries(achievementsData.groupedAchievements).map(
                  ([category, achievements]) => (
                    <div key={category} className="mb-8">
                      <h2 className="text-[22px] font-medium font-['Poppins'] mb-4">
                        {getCategoryTitle(category)}
                      </h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {achievements.map((achievement) => (
                          <AchievementCard
                            key={achievement.id}
                            achievement={achievement}
                          />
                        ))}
                      </div>
                    </div>
                  )
                )}
              </ScrollArea>
            </TabsContent>

            {/* Recently Unlocked Tab */}
            <TabsContent value="recent">
              <ScrollArea className="h-[70vh] rounded-[15px]">
                {recentlyUnlocked.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {recentlyUnlocked.map((achievement) => (
                      <AchievementCard
                        key={achievement.id}
                        achievement={achievement}
                        showDate
                      />
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-8">
                    <Trophy className="w-16 h-16 mb-4 text-gray-400" />
                    <p className="text-[16px] font-['Raleway'] text-center text-gray-500">
                      No achievements unlocked recently.
                      <br />
                      Keep playing to earn more!
                    </p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>

            {/* In Progress Tab */}
            <TabsContent value="locked">
              <ScrollArea className="h-[70vh] rounded-[15px]">
                {achievementsData.achievements.filter((a) => !a.completed)
                  .length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {achievementsData.achievements
                      .filter((a) => !a.completed)
                      .map((achievement) => (
                        <AchievementCard
                          key={achievement.id}
                          achievement={achievement}
                        />
                      ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full py-8">
                    <Trophy className="w-16 h-16 mb-4 text-gray-400" />
                    <p className="text-[16px] font-['Raleway'] text-center text-gray-500">
                      You've unlocked all available achievements!
                      <br />
                      Check back later for more.
                    </p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

// Achievement Card Component
function AchievementCard({ achievement, showDate = false }) {
  const icon = getIconForAchievement(achievement.icon);
  const color = getColorForCategory(achievement.id.split("-")[0]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Card
            className={`${color} text-[#F5F5F5] hover:scale-105 transition-transform duration-200 rounded-[15px] ${
              achievement.completed ? "animate-bounce" : "opacity-75"
            }`}
          >
            <CardContent className="p-6 flex flex-col items-center">
              {icon &&
                React.createElement(icon, { className: "w-16 h-16 mb-4" })}
              <h3 className="text-[22px] font-medium font-['Poppins'] text-center mb-2">
                {achievement.name}
              </h3>
              <Badge
                variant="outline"
                className="bg-F5F5F5/20 text-[#F5F5F5] mb-4 text-[14px] font-medium font-['Raleway']"
              >
                {achievement.completed ? "Completed" : "In Progress"}
              </Badge>
              {showDate && achievement.dateCompleted && (
                <p className="text-[12px] mb-2 font-['Raleway']">
                  Unlocked:{" "}
                  {new Date(achievement.dateCompleted).toLocaleDateString()}
                </p>
              )}
              {!achievement.completed && (
                <>
                  {/* For future: we could show progress if available */}
                  <Progress
                    value={0} // Replace with actual progress when implemented
                    className="w-full bg-F5F5F5/30"
                  />
                  <p className="text-[14px] mt-2 font-['Raleway']">
                    0 / {achievement.threshold}
                  </p>
                </>
              )}
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent className="font-['Raleway'] text-[14px]">
          <p>{achievement.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

// Helper functions
function getIconForAchievement(iconName) {
  const iconMap = {
    potion: Pill,
    super_potion: Pill,
    // Add mappings for all icons
  };

  return iconMap[iconName] || Trophy;
}

function getColorForCategory(category) {
  const colorMap = {
    potion: "bg-[#E63946]",
    starter: "bg-green-500",
    time: "bg-purple-500",
    rising: "bg-yellow-500",
    poke: "bg-pink-500",
    pharmacist: "bg-blue-500",
  };

  return colorMap[category] || "bg-gray-500";
}

function getCategoryTitle(category) {
  const titleMap = {
    potion: "Quiz Completion",
    starter: "Practice Quiz Scores",
    time: "Timed Quiz Scores",
    rising: "Leaderboard Rankings",
    poke: "Pokémon Knowledge",
    pharmacist: "Drug Knowledge",
  };

  return titleMap[category] || category;
}
```

## Step 9: Test and Debug

1. Test each achievement type with specific test cases:

   - Complete multiple timed quizzes
   - Get different scores on practice quizzes
   - Get high scores on timed quizzes
   - Check leaderboard positions
   - Correctly identify Pokémon
   - Correctly identify drugs

2. Debug any issues with:
   - Achievement detection
   - Stat tracking
   - Toast notification queuing
   - Achievement page display

## Step 10: Add Admin Tools for Achievements

1. Create a simple admin interface in the admin panel for:
   - Viewing all achievements
   - Seeing which users have which achievements
   - Manually granting achievements for testing

This approach provides a cleaner, more maintainable implementation with:

- Achievement definitions in code
- Simplified database schema
- Separate functions for different types of stat updates
- Centralized achievement checking logic
- Achievement notifications using shadcn's toast
- A more comprehensive achievements page with filtering options
