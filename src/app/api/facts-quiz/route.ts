import { NextResponse } from "next/server";
import { FactsQuizQuestions } from "@/lib/validation/types/facts-quiz";
import prisma from "@/lib/db/prisma";

export async function POST(request: Request) {
  const { userId } = await request.json();

  try {
    // Get all facts questions
    const questions = await prisma.factsQuestion.findMany({
      include: {
        relatedFact: true,
      },
    });

    if (questions.length === 0) {
      return NextResponse.json(
        { error: "No facts questions available" },
        { status: 404 }
      );
    }

    // Shuffle and select 10 questions for the quiz
    const shuffleArray = <T>(array: T[]): T[] => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const selectedQuestions = shuffleArray(questions).slice(0, 10);

    // Shuffle the answers for each question
    const questionsWithShuffledAnswers: FactsQuizQuestions =
      selectedQuestions.map((question) => {
        const allAnswers = [question.correctAnswer, ...question.wrongAnswers];
        const shuffledAnswers = shuffleArray(allAnswers);

        return {
          ...question,
          shuffledAnswers,
        };
      });

    // Create new facts quiz attempt
    const factsQuizAttempt = await prisma.factsQuizAttempt.create({
      data: {
        correctCount: 0,
        totalScore: 0,
        totalQuestions: selectedQuestions.length,
        userId: userId ?? undefined,
        answers: {
          create: [],
        },
      },
    });

    return NextResponse.json({
      quizId: factsQuizAttempt.id,
      questions: questionsWithShuffledAnswers,
    });
  } catch (error) {
    console.error("Facts quiz creation error:", error);
    return NextResponse.json(
      { error: `Failed to create facts quiz: ${error}` },
      { status: 500 }
    );
  }
}

// Get all facts questions for admin/preview purposes
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
