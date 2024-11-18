import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const facts = await prisma.fact.findMany({
      include: {
        drug: true,
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
