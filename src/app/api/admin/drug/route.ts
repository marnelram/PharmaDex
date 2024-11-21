import { NextResponse } from "next/server";
import { drugFormSchema } from "@/lib/validation/zod/drug";
import prisma from "@/lib/db/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsedResult = drugFormSchema.safeParse(body);
    if (!parsedResult.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const {
      name,
      generic,
      dosageForm,
      description,
      drugClass,
      generation,
      facts,
    } = parsedResult.data;

    const drug = await prisma.drug.create({
      data: {
        name,
        generic,
        dosageForm,
        description,
        drugClass,
        generation,
        facts: {
          create: facts.map((fact: { title: string; content: string }) => ({
            title: fact.title,
            content: fact.content,
            category: "drug",
          })),
        },
      },
    });

    return NextResponse.json(drug);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating drug: " + error },
      { status: 500 }
    );
  }
}
