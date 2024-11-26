import { NextResponse } from "next/server";
import { generateObject, generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import prisma from "@/lib/db/prisma";

// Define the schema for drug generation
const drugSchema = z.object({
  drug: z.object({
    name: z
      .string()
      .describe(
        "The Brand name of a real drug that is available in the American market"
      ),
    generic: z.string().describe("Generic name of the drug"),
    dosageForm: z
      .enum([
        "PILL",
        "POWDER",
        "INJECTION",
        "LIQUID",
        "DROP",
        "CREAM",
        "INHALER",
        "INSERT",
        "PATCH",
        "SPRAY",
      ])
      .describe("The dosage form of the drug"),
    description: z.string().describe(
      `A single sentence brief description of the generic name, and what the drug is used for.
        Example: A brand of celecoxib, used for pain and inflammation relief.`
    ),
    drugClass: z.string().describe("Drug classification/category"),
    generation: z
      .number()
      .nullable()
      .describe("Generation of the drug, if applicable"),
    facts: z.array(
      z.object({
        title: z.string().describe("a short and catchy title for a drug fact."),
        content: z.string().describe("a 1-2 sentence fact about the drug."),
      })
    )
      .describe(`Interesting facts about the drug in friendly engaging language. Don't include facts about dosing unless it's an odd frequency (e.g. once every 3 months or once every 4 hours). Example:
        Title: "Long-Lasting Control"
        content: "Lantus provides up to 24 hours of stable blood sugar control with just one injection per day."
        `),
  }),
});

export async function GET() {
  const drugs = await prisma.drug.findMany({
    select: {
      name: true,
    },
  });

  try {
    const numberOfDrugs = 5;
    const createdDrugs = [];

    for (let i = 0; i < numberOfDrugs; i++) {
      const prompt: string = `You are a trained pharmacist that knows all of the drug brand names currently available in the American drug market. Output a drug name that is not already in the database: ${[
        ...drugs.map((drug) => drug.name),
        ...createdDrugs.map((drug) => drug.name),
      ].join(", ")}. You MUST output a real drug name.`;

      // Generate a drug name
      const drugName = await generateText({
        model: openai("gpt-4o-2024-08-06"),
        prompt: prompt,
      });

      // Generate a drug using AI
      const result = await generateObject({
        model: openai("gpt-4o-2024-08-06"),
        schema: drugSchema,
        system: `You are an enthusiastic Pharmacist that is adding fun and interactive drug information. Fill in the drug information based on the name provided.`,
        prompt: `Name: ${drugName.text}`,
      });

      // Extract the generated drug data
      const {
        name,
        generic,
        dosageForm,
        description,
        drugClass,
        generation,
        facts,
      } = result.object.drug;

      // Create the drug in the database
      const drug = await prisma.drug.create({
        data: {
          name,
          generic,
          dosageForm,
          description,
          drugClass,
          generation,
          facts: {
            create: facts.map((fact) => ({
              title: fact.title,
              content: fact.content,
              category: "drug",
            })),
          },
        },
        include: {
          facts: true,
        },
      });

      createdDrugs.push(drug);
    }

    return NextResponse.json({ drugs: createdDrugs });
  } catch (error) {
    console.error("Error generating drugs:", error);
    return NextResponse.json(
      { error: "Error generating drug entries: " + error },
      { status: 500 }
    );
  }
}
