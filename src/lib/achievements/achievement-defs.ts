/**
 * PharmaDex Achievement Definitions
 *
 * This file contains all achievement definitions and helper functions
 * for retrieving and working with achievements in the application.
 */

export type AchievementCategory =
  | "quiz-count"
  | "practice-score"
  | "timed-score"
  | "streak"
  | "pokemon-experts"
  | "drug-experts"
  | "perfect-score"
  | "speed-demon";

export interface AchievementDefinition {
  id: string;
  name: string;
  description: string;
  threshold: number;
  icon: string;
  category: AchievementCategory;
}

// Quiz Count Achievements
const quizCountAchievements: AchievementDefinition[] = [
  {
    id: "quiz-count-1",
    name: "Quiz Novice",
    description: "Complete 5 quizzes",
    threshold: 5,
    icon: "FlaskConical",
    category: "quiz-count",
  },
  {
    id: "quiz-count-2",
    name: "Quiz Enthusiast",
    description: "Complete 25 quizzes",
    threshold: 25,
    icon: "FlaskConical",
    category: "quiz-count",
  },
  {
    id: "quiz-count-3",
    name: "Quiz Expert",
    description: "Complete a total of 100 quizzes",
    threshold: 100,
    icon: "FlaskConical",
    category: "quiz-count",
  },
];

// Practice Score Achievements
const practiceScoreAchievements: AchievementDefinition[] = [
  {
    id: "practice-score-1",
    name: "Practice Beginner",
    description: "Score 100 points in practice mode",
    threshold: 100,
    icon: "GraduationCap",
    category: "practice-score",
  },
  {
    id: "practice-score-2",
    name: "Practice Adept",
    description: "Score 500 points in practice mode",
    threshold: 500,
    icon: "GraduationCap",
    category: "practice-score",
  },
  {
    id: "practice-score-3",
    name: "Practice Master",
    description: "Score 2000 points in practice mode",
    threshold: 2000,
    icon: "GraduationCap",
    category: "practice-score",
  },
];

// Timed Score Achievements
const timedScoreAchievements: AchievementDefinition[] = [
  {
    id: "timed-score-1",
    name: "Time Conscious",
    description: "Score 100 points in timed mode",
    threshold: 100,
    icon: "Clock",
    category: "timed-score",
  },
  {
    id: "timed-score-2",
    name: "Time Keeper",
    description: "Score 500 points in timed mode",
    threshold: 500,
    icon: "Clock",
    category: "timed-score",
  },
  {
    id: "timed-score-3",
    name: "Time Lord",
    description: "Score 2000 points in timed mode",
    threshold: 2000,
    icon: "Clock",
    category: "timed-score",
  },
];

// Streak Achievements
const streakAchievements: AchievementDefinition[] = [
  {
    id: "streak-1",
    name: "Streak Starter",
    description: "Achieve a streak of 5 correct answers",
    threshold: 5,
    icon: "Flame",
    category: "streak",
  },
  {
    id: "streak-2",
    name: "Streak Keeper",
    description: "Achieve a streak of 15 correct answers",
    threshold: 15,
    icon: "Flame",
    category: "streak",
  },
  {
    id: "streak-3",
    name: "Streak Master",
    description: "Achieve a streak of 30 correct answers",
    threshold: 30,
    icon: "Flame",
    category: "streak",
  },
];

// Pokémon Expert Achievements
const pokemonExpertAchievements: AchievementDefinition[] = [
  {
    id: "pokemon-expert-1",
    name: "Pokémon Trainer",
    description: "Correctly identify 20 Pokémon",
    threshold: 20,
    icon: "Dna",
    category: "pokemon-experts",
  },
  {
    id: "pokemon-expert-2",
    name: "Pokémon Collector",
    description: "Correctly identify 50 Pokémon",
    threshold: 50,
    icon: "Dna",
    category: "pokemon-experts",
  },
  {
    id: "pokemon-expert-3",
    name: "Pokémon Professor",
    description: "Correctly identify 100 Pokémon",
    threshold: 100,
    icon: "Dna",
    category: "pokemon-experts",
  },
];

// Drug Expert Achievements
const drugExpertAchievements: AchievementDefinition[] = [
  {
    id: "drug-expert-1",
    name: "Pharmacy Student",
    description: "Correctly identify 20 drugs",
    threshold: 20,
    icon: "Pill",
    category: "drug-experts",
  },
  {
    id: "drug-expert-2",
    name: "Pharmacist in Training",
    description: "Correctly identify 50 drugs",
    threshold: 50,
    icon: "Pill",
    category: "drug-experts",
  },
  {
    id: "drug-expert-3",
    name: "Master Pharmacist",
    description: "Correctly identify 100 drugs",
    threshold: 100,
    icon: "Pill",
    category: "drug-experts",
  },
];

// Perfect Score Achievements
const perfectScoreAchievements: AchievementDefinition[] = [
  {
    id: "perfect-score-1",
    name: "Perfect Start",
    description: "Complete a quiz with 100% accuracy",
    threshold: 1,
    icon: "Star",
    category: "perfect-score",
  },
  {
    id: "perfect-score-2",
    name: "Perfect Consistency",
    description: "Complete 5 quizzes with 100% accuracy",
    threshold: 5,
    icon: "Star",
    category: "perfect-score",
  },
  {
    id: "perfect-score-3",
    name: "Perfect Expert",
    description: "Complete 20 quizzes with 100% accuracy",
    threshold: 20,
    icon: "Star",
    category: "perfect-score",
  },
];

// Speed Demon Achievements
const speedDemonAchievements: AchievementDefinition[] = [
  {
    id: "speed-demon-1",
    name: "Speed Learner",
    description: "Complete a quiz in under 60 seconds",
    threshold: 60000, // 60 seconds in milliseconds
    icon: "Zap",
    category: "speed-demon",
  },
  {
    id: "speed-demon-2",
    name: "Speed Expert",
    description: "Complete a quiz in under 40 seconds",
    threshold: 40000, // 40 seconds in milliseconds
    icon: "Zap",
    category: "speed-demon",
  },
  {
    id: "speed-demon-3",
    name: "Speed Demon",
    description: "Complete a quiz in under 20 seconds",
    threshold: 20000, // 20 seconds in milliseconds
    icon: "Zap",
    category: "speed-demon",
  },
];

// Combine all achievements into a single array
export const allAchievements: AchievementDefinition[] = [
  ...quizCountAchievements,
  ...practiceScoreAchievements,
  ...timedScoreAchievements,
  ...streakAchievements,
  ...pokemonExpertAchievements,
  ...drugExpertAchievements,
  ...perfectScoreAchievements,
  ...speedDemonAchievements,
];

/**
 * Helper Functions
 */

// Get achievements by category
export function getAchievementsByCategory(
  category: AchievementCategory
): AchievementDefinition[] {
  return allAchievements.filter(
    (achievement) => achievement.category === category
  );
}

// Get achievement by ID
export function getAchievementById(
  id: string
): AchievementDefinition | undefined {
  return allAchievements.find((achievement) => achievement.id === id);
}

// Get all achievement categories
export function getAllAchievementCategories(): AchievementCategory[] {
  return Array.from(new Set(allAchievements.map((a) => a.category)));
}

// Get next achievement in a category based on threshold
export function getNextAchievement(
  category: AchievementCategory,
  currentThreshold: number
): AchievementDefinition | undefined {
  const categoryAchievements = getAchievementsByCategory(category);
  return categoryAchievements.find(
    (achievement) => achievement.threshold > currentThreshold
  );
}
