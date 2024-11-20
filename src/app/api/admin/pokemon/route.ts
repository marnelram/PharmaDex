import { NextResponse } from "next/server";
import prisma from "@/app/lib/db/prisma";
import { pokemonFormSchema } from "@/lib/validation/pokemon";
import { PokemonClient } from "pokenode-ts";

export async function POST(req: Request) {
  const api = new PokemonClient();

  try {
    const body = await req.json();
    const parsedResult = pokemonFormSchema.safeParse(body);
    if (!parsedResult.success) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    const { name, description, generation, facts } = parsedResult.data;

    const pokemonData = await api.getPokemonByName(name.toLowerCase());
    const imageUrl = pokemonData.sprites.front_default;
    const type1 = pokemonData.types[0].type.name;
    const type2 = pokemonData.types[1]?.type.name;

    const pokemon = await prisma.pokemon.create({
      data: {
        name,
        image: imageUrl,
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

    return NextResponse.json(pokemon);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating pokemon: " + error },
      { status: 500 }
    );
  }
}
