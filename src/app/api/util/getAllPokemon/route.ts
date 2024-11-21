import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all Pokemon names
    const pokemon = await prisma.pokemon.findMany({
      select: {
        name: true,
      },
    });

    return NextResponse.json({
      pokemon: pokemon.map((p) => p.name),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching entries: " + error },
      { status: 500 }
    );
  }
}
