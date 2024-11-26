import { NextResponse } from "next/server";
import { Questions } from "@/lib/validation/types/quiz";
import prisma from "@/lib/db/prisma";

export async function POST(request: Request) {
  const { userId } = await request.json();

  try {
    // Get all quiz items
    const drugs = await prisma.drug.findMany();

    const pokemon = await prisma.pokemon.findMany();

    // Create shuffled quiz items
    const shuffleArray = <T>(array: T[]): T[] => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    let questions: Questions = shuffleArray([
      ...drugs.map((drug) => ({
        ...drug,
        type: "Drug" as const,
      })),
      ...pokemon.map((p) => ({
        ...p,
        type: "Pokemon" as const,
      })),
    ]);

    questions = questions.slice(0, 25);

    console.log("questions", questions);

    // Create new quiz attempt
    const quizAttempt = await prisma.quizAttempt.create({
      data: {
        correctCount: 0,
        totalScore: 0,
        totalQuestions: questions.length,
        userId: userId ?? undefined,
        answers: [],
      },
    });

    return NextResponse.json({
      quizId: quizAttempt.id,
      questions,
    });
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to create quiz: ${error}` },
      { status: 500 }
    );
  }
}

// Keep the GET method to fetch questions for the quiz
export async function GET() {
  const drugs = await prisma.drug.findMany({
    include: { facts: true },
  });

  const pokemon = await prisma.pokemon.findMany({
    include: { facts: true },
  });

  const questions: Questions = [
    ...drugs.map((drug) => ({
      ...drug,
      type: "Drug" as const,
    })),
    ...pokemon.map((p) => ({
      ...p,
      type: "Pokemon" as const,
    })),
  ].sort(() => Math.random() - 0.5);

  return NextResponse.json(questions);
}
