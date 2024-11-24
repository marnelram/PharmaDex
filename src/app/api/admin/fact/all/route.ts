import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const facts = await prisma.fact.findMany({
      orderBy: {
        title: "asc", // Optional: sort by name
      },
    });

    return NextResponse.json(facts);
  } catch (error) {
    console.error("Failed to fetch facts:", error);
    return NextResponse.json(
      { error: "Failed to fetch facts" },
      { status: 500 }
    );
  }
}
