import { NextResponse } from "next/server";
import prisma from "@/lib/db/prisma";
import { auth } from "@/auth";

// Sample facts questions to seed the database
const sampleQuestions = [
  {
    question: "What is the primary type of Pikachu?",
    correctAnswer: "Electric",
    wrongAnswers: ["Fire", "Water", "Grass"],
    category: "pokemon",
    difficulty: "easy",
    explanation:
      "Pikachu is the iconic Electric-type Pokémon and mascot of the franchise.",
  },
  {
    question: "Which drug is commonly used to treat bacterial infections?",
    correctAnswer: "Antibiotics",
    wrongAnswers: ["Antivirals", "Antifungals", "Antihistamines"],
    category: "drug",
    difficulty: "easy",
    explanation:
      "Antibiotics are medications that fight bacterial infections by killing bacteria or stopping their growth.",
  },
  {
    question: "What evolution does Charmander become after reaching level 16?",
    correctAnswer: "Charmeleon",
    wrongAnswers: ["Charizard", "Chamander", "Charcoal"],
    category: "pokemon",
    difficulty: "medium",
    explanation:
      "Charmander evolves into Charmeleon at level 16, and then into Charizard at level 36.",
  },
  {
    question: "What is the active ingredient in aspirin?",
    correctAnswer: "Acetylsalicylic acid",
    wrongAnswers: ["Ibuprofen", "Acetaminophen", "Naproxen"],
    category: "drug",
    difficulty: "medium",
    explanation:
      "Aspirin contains acetylsalicylic acid, which provides pain relief and anti-inflammatory effects.",
  },
  {
    question: "Which Pokémon is known as the Genetic Pokémon?",
    correctAnswer: "Mew",
    wrongAnswers: ["Mewtwo", "Ditto", "Porygon"],
    category: "pokemon",
    difficulty: "medium",
    explanation:
      "Mew is classified as the Genetic Pokémon and is said to possess the genetic composition of all Pokémon species.",
  },
  {
    question: "What class of drugs includes morphine and codeine?",
    correctAnswer: "Opioids",
    wrongAnswers: ["Stimulants", "Depressants", "Hallucinogens"],
    category: "drug",
    difficulty: "medium",
    explanation:
      "Morphine and codeine are opioids, which are powerful pain-relieving medications.",
  },
  {
    question: "In which generation was the Steel type introduced?",
    correctAnswer: "Generation II",
    wrongAnswers: ["Generation I", "Generation III", "Generation IV"],
    category: "pokemon",
    difficulty: "hard",
    explanation:
      "The Steel type was introduced in Generation II along with the Dark type.",
  },
  {
    question:
      "What is the brand name for the drug sildenafil when used for erectile dysfunction?",
    correctAnswer: "Viagra",
    wrongAnswers: ["Cialis", "Levitra", "Stendra"],
    category: "drug",
    difficulty: "hard",
    explanation:
      "Sildenafil is marketed as Viagra for erectile dysfunction and as Revatio for pulmonary arterial hypertension.",
  },
  {
    question: "Which Pokémon has the highest base stat total?",
    correctAnswer: "Eternamax Eternatus",
    wrongAnswers: ["Arceus", "Mewtwo", "Rayquaza"],
    category: "pokemon",
    difficulty: "hard",
    explanation:
      "Eternamax Eternatus has a base stat total of 1125, making it the Pokémon with the highest stats.",
  },
  {
    question: "What mechanism of action does insulin have in the body?",
    correctAnswer: "Lowers blood glucose levels",
    wrongAnswers: [
      "Raises blood pressure",
      "Increases heart rate",
      "Reduces inflammation",
    ],
    category: "drug",
    difficulty: "medium",
    explanation:
      "Insulin is a hormone that regulates blood sugar by facilitating glucose uptake into cells.",
  },
];

export async function POST(request: Request) {
  try {
    // Check if user is admin
    const session = await auth();
    if (
      !session?.user ||
      !("isAdmin" in session.user) ||
      !session.user.isAdmin
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Clear existing questions (optional - remove if you want to preserve existing data)
    await prisma.factsQuestion.deleteMany();

    // Create sample questions
    const createdQuestions = await Promise.all(
      sampleQuestions.map((question) =>
        prisma.factsQuestion.create({
          data: question,
        })
      )
    );

    return NextResponse.json({
      success: true,
      message: `Created ${createdQuestions.length} sample questions`,
      questions: createdQuestions,
    });
  } catch (error) {
    console.error("Error creating sample questions:", error);
    return NextResponse.json(
      { error: `Failed to create sample questions: ${error}` },
      { status: 500 }
    );
  }
}

// Get all facts questions
export async function GET() {
  try {
    const questions = await prisma.factsQuestion.findMany({
      include: {
        relatedFact: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(questions);
  } catch (error) {
    console.error("Error fetching facts questions:", error);
    return NextResponse.json(
      { error: `Failed to fetch facts questions: ${error}` },
      { status: 500 }
    );
  }
}
