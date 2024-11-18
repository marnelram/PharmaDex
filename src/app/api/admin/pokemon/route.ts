import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/app/lib/db/prisma";
import { pokemonFormSchema } from "@/lib/validation/pokemon";

export async function POST(req: Request) {
  // const session = await getServerSession(authOptions);

  // if (!session?.user.isAdmin) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  // }

  try {
    const body = await req.json();
    const parsedResult = pokemonFormSchema.safeParse(body);
    if (!parsedResult.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    console.log(parsedResult.data);
    const { name, description, type1, type2, generation, facts } =
      parsedResult.data;

    console.log(facts);

    const pokemon = await prisma.pokemon.create({
      data: {
        name,
        description,
        type1,
        type2,
        generation,
        facts: {
          create: facts.map((fact: { title: string; content: string }) => ({
            title: fact.title,
            content: fact.content,
            category: "pokemon",
          })),
        },
      },
    });

    console.log(pokemon);

    return NextResponse.json(pokemon);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating pokemon: " + error },
      { status: 500 }
    );
  }
}
