import { NextResponse } from "next/server";
import prisma from "@/app/lib/db/prisma";

export async function GET() {
  const drugs = await prisma.drug.findMany({
    include: { facts: true },
  });

  const pokemon = await prisma.pokemon.findMany({
    include: { facts: true },
  });

  const quizItems = [
    ...drugs.map((drug) => ({
      ...drug,
      type: "Drug" as const,
    })),
    ...pokemon.map((p) => ({
      ...p,
      type: "Pokemon" as const,
    })),
  ].sort(() => Math.random() - 0.5);

  return NextResponse.json(quizItems);
}
