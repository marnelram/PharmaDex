const { PrismaClient } = require("@prisma/client");
// We need to require the achievement definitions file differently since it's an ES module
// For now, we'll define the achievements directly in this file for simplicity
// Later we can update this to import from achievement-defs.ts properly

const prisma = new PrismaClient();

// Achievement categories
const categories = [
  "quiz-count",
  "practice-score",
  "timed-score",
  "streak",
  "pokemon-experts",
  "drug-experts",
  "perfect-score",
  "speed-demon",
];

// Simple version of achievements for seeding
const allAchievements = [
  // Quiz Count Achievements
  {
    name: "Quiz Novice",
    description: "Complete 5 quizzes",
    icon: "FlaskConical",
    category: "quiz-count",
  },
  {
    name: "Quiz Enthusiast",
    description: "Complete 25 quizzes",
    icon: "FlaskConical",
    category: "quiz-count",
  },
  {
    name: "Quiz Expert",
    description: "Complete a total of 100 quizzes",
    icon: "FlaskConical",
    category: "quiz-count",
  },

  // Practice Score Achievements
  {
    name: "Practice Beginner",
    description: "Score 100 points in practice mode",
    icon: "GraduationCap",
    category: "practice-score",
  },
  {
    name: "Practice Adept",
    description: "Score 500 points in practice mode",
    icon: "GraduationCap",
    category: "practice-score",
  },
  {
    name: "Practice Master",
    description: "Score 2000 points in practice mode",
    icon: "GraduationCap",
    category: "practice-score",
  },

  // Timed Score Achievements
  {
    name: "Time Conscious",
    description: "Score 100 points in timed mode",
    icon: "Clock",
    category: "timed-score",
  },
  {
    name: "Time Keeper",
    description: "Score 500 points in timed mode",
    icon: "Clock",
    category: "timed-score",
  },
  {
    name: "Time Lord",
    description: "Score 2000 points in timed mode",
    icon: "Clock",
    category: "timed-score",
  },

  // Streak Achievements
  {
    name: "Streak Starter",
    description: "Achieve a streak of 5 correct answers",
    icon: "Flame",
    category: "streak",
  },
  {
    name: "Streak Keeper",
    description: "Achieve a streak of 15 correct answers",
    icon: "Flame",
    category: "streak",
  },
  {
    name: "Streak Master",
    description: "Achieve a streak of 30 correct answers",
    icon: "Flame",
    category: "streak",
  },

  // Pokémon Expert Achievements
  {
    name: "Pokémon Trainer",
    description: "Correctly identify 20 Pokémon",
    icon: "Dna",
    category: "pokemon-experts",
  },
  {
    name: "Pokémon Collector",
    description: "Correctly identify 50 Pokémon",
    icon: "Dna",
    category: "pokemon-experts",
  },
  {
    name: "Pokémon Professor",
    description: "Correctly identify 100 Pokémon",
    icon: "Dna",
    category: "pokemon-experts",
  },

  // Drug Expert Achievements
  {
    name: "Pharmacy Student",
    description: "Correctly identify 20 drugs",
    icon: "Pill",
    category: "drug-experts",
  },
  {
    name: "Pharmacist in Training",
    description: "Correctly identify 50 drugs",
    icon: "Pill",
    category: "drug-experts",
  },
  {
    name: "Master Pharmacist",
    description: "Correctly identify 100 drugs",
    icon: "Pill",
    category: "drug-experts",
  },

  // Perfect Score Achievements
  {
    name: "Perfect Start",
    description: "Complete a quiz with 100% accuracy",
    icon: "Star",
    category: "perfect-score",
  },
  {
    name: "Perfect Consistency",
    description: "Complete 5 quizzes with 100% accuracy",
    icon: "Star",
    category: "perfect-score",
  },
  {
    name: "Perfect Expert",
    description: "Complete 20 quizzes with 100% accuracy",
    icon: "Star",
    category: "perfect-score",
  },

  // Speed Demon Achievements
  {
    name: "Speed Learner",
    description: "Complete a quiz in under 60 seconds",
    icon: "Zap",
    category: "speed-demon",
  },
  {
    name: "Speed Expert",
    description: "Complete a quiz in under 40 seconds",
    icon: "Zap",
    category: "speed-demon",
  },
  {
    name: "Speed Demon",
    description: "Complete a quiz in under 20 seconds",
    icon: "Zap",
    category: "speed-demon",
  },
];

async function main() {
  console.log("Starting database seeding...");

  // Create achievements
  console.log("Creating achievements...");

  for (const achievement of allAchievements) {
    await prisma.achievement.upsert({
      where: { name: achievement.name },
      update: {
        description: achievement.description,
        icon: achievement.icon,
        category: achievement.category,
      },
      create: {
        name: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
        category: achievement.category,
      },
    });
  }

  console.log("Database seeding completed!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
