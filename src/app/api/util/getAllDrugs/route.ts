import prisma from "@/lib/db/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Fetch all Drug names
    const drugs = await prisma.drug.findMany({
      select: {
        name: true,
      },
    });

    return NextResponse.json({
      drugs: drugs.map((d) => d.name),
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching entries: " + error },
      { status: 500 }
    );
  }
}
