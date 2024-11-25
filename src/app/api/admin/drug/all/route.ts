import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const drugs = await prisma.drug.findMany({
      include: {
        facts: true, // This includes all related facts
      },
      orderBy: {
        name: "asc", // Optional: sort by name
      },
    });

    return NextResponse.json(drugs);
  } catch (error) {
    console.error("Failed to fetch drugs:", error);
    return NextResponse.json(
      { error: "Failed to fetch drugs" },
      { status: 500 }
    );
  }
}
