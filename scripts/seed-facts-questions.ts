const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const pokemonQuestions = [
  {
    question: "Which Pokémon is known as the Mouse Pokémon?",
    correctAnswer: "Pikachu",
    wrongAnswers: ["Raichu", "Pichu", "Pachirisu"],
    category: "pokemon",
    difficulty: "easy",
    explanation:
      "Pikachu is classified as the Mouse Pokémon and is the most recognizable Pokémon worldwide, serving as the franchise mascot.",
  },
  {
    question: "What type combination does Charizard have?",
    correctAnswer: "Fire/Flying",
    wrongAnswers: ["Fire/Dragon", "Fire/Ground", "Fire/Rock"],
    category: "pokemon",
    difficulty: "medium",
    explanation:
      "Despite its dragon-like appearance, Charizard is actually a Fire/Flying type. It didn't become Fire/Dragon until its Mega Evolution X form.",
  },
  {
    question:
      "Which legendary Pokémon is said to have created the Pokémon universe?",
    correctAnswer: "Arceus",
    wrongAnswers: ["Dialga", "Palkia", "Giratina"],
    category: "pokemon",
    difficulty: "hard",
    explanation:
      "Arceus is known as the Alpha Pokémon and is said to have emerged from an egg in a place where there was nothing, then shaped the world.",
  },
  {
    question: "What does the move 'Surf' primarily affect?",
    correctAnswer: "Hits all Pokémon in Double Battles",
    wrongAnswers: [
      "Only hits Water-type Pokémon",
      "Heals the user",
      "Never misses",
    ],
    category: "pokemon",
    difficulty: "medium",
    explanation:
      "Surf is a powerful Water-type move that hits all adjacent Pokémon in Double and Triple Battles, making it both offensive and strategic.",
  },
  {
    question: "Which Pokémon evolves into Gyarados?",
    correctAnswer: "Magikarp",
    wrongAnswers: ["Goldeen", "Feebas", "Remoraid"],
    category: "pokemon",
    difficulty: "easy",
    explanation:
      "Magikarp, despite being considered weak, evolves into the mighty Gyarados at level 20, representing one of the most dramatic transformations in Pokémon.",
  },
];

const drugQuestions = [
  {
    question: "What is the generic name for Tylenol?",
    correctAnswer: "Acetaminophen",
    wrongAnswers: ["Ibuprofen", "Aspirin", "Naproxen"],
    category: "drug",
    difficulty: "easy",
    explanation:
      "Acetaminophen (also known as paracetamol) is the active ingredient in Tylenol and is commonly used for pain relief and fever reduction.",
  },
  {
    question: "Which class of drugs is used to treat high blood pressure?",
    correctAnswer: "Antihypertensives",
    wrongAnswers: ["Antihistamines", "Antibiotics", "Antacids"],
    category: "drug",
    difficulty: "medium",
    explanation:
      "Antihypertensives are a class of medications specifically designed to lower blood pressure and include ACE inhibitors, beta-blockers, and diuretics.",
  },
  {
    question: "What is the mechanism of action of warfarin?",
    correctAnswer: "Vitamin K antagonist",
    wrongAnswers: [
      "Calcium channel blocker",
      "Beta-2 agonist",
      "Proton pump inhibitor",
    ],
    category: "drug",
    difficulty: "hard",
    explanation:
      "Warfarin works by inhibiting vitamin K-dependent clotting factors, making it an effective anticoagulant for preventing blood clots.",
  },
  {
    question: "Which hormone does insulin help regulate?",
    correctAnswer: "Blood glucose",
    wrongAnswers: ["Thyroid hormone", "Cortisol", "Growth hormone"],
    category: "drug",
    difficulty: "medium",
    explanation:
      "Insulin is a hormone that helps cells absorb glucose from the bloodstream, effectively lowering blood sugar levels.",
  },
  {
    question: "What does NSAIDs stand for?",
    correctAnswer: "Non-Steroidal Anti-Inflammatory Drugs",
    wrongAnswers: [
      "Non-Selective Anti-Infection Drugs",
      "Nerve-Specific Anti-Irritant Drugs",
      "Natural Steroid Anti-Inflammatory Drugs",
    ],
    category: "drug",
    difficulty: "easy",
    explanation:
      "NSAIDs are Non-Steroidal Anti-Inflammatory Drugs that reduce inflammation, pain, and fever. Common examples include ibuprofen and naproxen.",
  },
];

async function seedFactsQuestions() {
  try {
    console.log("🌱 Starting to seed facts questions...");

    // Combine all questions
    const allQuestions = [...pokemonQuestions, ...drugQuestions];

    // Create all questions
    const createdQuestions = await Promise.all(
      allQuestions.map((question) =>
        prisma.factsQuestion.create({
          data: question,
        })
      )
    );

    console.log(
      `✅ Successfully created ${createdQuestions.length} questions:`
    );
    console.log(`   • ${pokemonQuestions.length} Pokémon questions`);
    console.log(`   • ${drugQuestions.length} Drug questions`);

    // Display breakdown by difficulty
    const byDifficulty = createdQuestions.reduce((acc, q) => {
      acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log("\n📊 Questions by difficulty:");
    Object.entries(byDifficulty).forEach(([difficulty, count]) => {
      console.log(`   • ${difficulty}: ${count} questions`);
    });

    console.log(
      "\n🎯 All questions have been successfully added to the database!"
    );
  } catch (error) {
    console.error("❌ Error seeding facts questions:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

// Run the script
if (require.main === module) {
  seedFactsQuestions()
    .then(() => {
      console.log("🎉 Seeding completed successfully!");
      process.exit(0);
    })
    .catch((error) => {
      console.error("💥 Seeding failed:", error);
      process.exit(1);
    });
}

module.exports = seedFactsQuestions;
