import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const sortDirection = Math.random() < 0.5 ? "asc" : "desc";
    const randomStart = Math.floor(
      (Math.random() / 5) * (await prisma.fact.count())
    );
    console.log(randomStart);
    const facts = await prisma.fact.findMany({
      take: 5,
      skip: randomStart,
      orderBy: {
        id: sortDirection as "asc" | "desc",
      },
    });
    return NextResponse.json(facts);
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch facts: ${error}` },
      { status: 500 }
    );
  }
}
