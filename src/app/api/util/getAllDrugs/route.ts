import { NextResponse } from "next/server";
import prisma from "@/app/lib/db/prisma";

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
