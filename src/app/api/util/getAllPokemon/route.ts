import { NextResponse } from "next/server";
import prisma from "@/app/lib/db/prisma";

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
