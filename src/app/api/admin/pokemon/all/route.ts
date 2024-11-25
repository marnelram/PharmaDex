import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const pokemons = await prisma.pokemon.findMany({
      include: {
        facts: true, // This includes all related facts
      },
      orderBy: {
        name: "asc", // Optional: sort by name
      },
    });

    return NextResponse.json(pokemons);
  } catch (error) {
    console.error("Failed to fetch pokemons:", error);
    return NextResponse.json(
      { error: "Failed to fetch pokemons" },
      { status: 500 }
    );
  }
}
