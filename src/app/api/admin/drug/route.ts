import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/db/prisma";
import { drugFormSchema } from "@/lib/validation/drug";

export async function POST(req: Request) {
  // const session = await getServerSession(authOptions);

  // if (!session?.user.isAdmin) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  // }

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
      class: drugClass,
      generation,
      facts,
    } = parsedResult.data;

    const drug = await prisma.drug.create({
      data: {
        name,
        generic,
        dosageForm,
        description,
        class: drugClass,
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
