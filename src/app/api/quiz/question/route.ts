import prisma from "@/app/lib/db/prisma";
import { DosageForm } from "@prisma/client";
import { NextResponse } from "next/server";

type QuizItems = Array<
  | {
      id: string;
      name: string;
      dosageForm: DosageForm;
      description: string;
      drugClass: string;
      generation: number | null;
      facts: Array<{
        title: string;
        content: string;
      }>;
      type: "Drug";
    }
  | {
      id: string;
      name: string;
      image: string | null;
      description: string;
      type1: string;
      type2: string | null;
      generation: number;
      facts: Array<{
        title: string;
        content: string;
      }>;
      type: "Pokemon";
    }
>;

export async function GET() {
  try {
    // Get random mix of drugs and pokemon
    const drugs = await prisma.drug.findMany({
      select: {
        id: true,
        name: true,
        dosageForm: true,
        description: true,
        drugClass: true,
        generation: true,
        facts: {
          select: {
            title: true,
            content: true,
          },
        },
      },
      take: 5,
    });

    const pokemon = await prisma.pokemon.findMany({
      select: {
        id: true,
        name: true,
        image: true,
        description: true,
        type1: true,
        type2: true,
        generation: true,
        facts: {
          select: {
            title: true,
            content: true,
          },
        },
      },
      take: 5,
    });

    // Combine and transform the data
    const quizItems: QuizItems = [
      ...drugs.map((drug) => ({
        ...drug,
        type: "Drug" as const,
      })),
      ...pokemon.map((p) => ({
        ...p,
        type: "Pokemon" as const,
      })),
    ];

    // Shuffle the array
    const shuffled = quizItems.sort(() => Math.random() - 0.5);

    return NextResponse.json(shuffled.slice(0, 10)); // Return 10 random items
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch quiz questions: ${error}` },
      { status: 500 }
    );
  }
}
