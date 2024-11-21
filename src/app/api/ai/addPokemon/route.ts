import { NextResponse } from "next/server";
import prisma from "@/app/lib/db/prisma";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { z } from "zod";
import { PokemonClient } from "pokenode-ts";

// Define the schema for Pokemon generation
const pokemonSchema = z.object({
  pokemon: z.object({
    name: z.string().describe("The name of a real Pokémon from any generation"),
    description: z
      .string()
      .describe("Brief, 1 sentence, Pokédex-style description of the Pokémon"),
    generation: z
      .number()
      .describe("The generation this Pokémon was introduced in (1-9)"),
    facts: z
      .array(
        z.object({
          title: z
            .string()
            .describe("a short and catchy title for a Pokémon fact."),
          content: z
            .string()
            .describe("a 1-2 sentence fact about the Pokémon."),
        })
      )
      .max(2)
      .describe(`Interesting facts about the Pokémon in friendly engaging language. Example:
      Title: "Time Traveler"
      content: "Celebi can move freely across time and appears during times of peace."
    `),
  }),
});

export async function GET() {
  const api = new PokemonClient();

  const pokemon = await prisma.pokemon.findMany({
    select: {
      name: true,
    },
  });

  try {
    const numberOfPokemon = 5;
    const createdPokemon = [];

    for (let i = 0; i < numberOfPokemon; i++) {
      const prompt: string = `Generate information for a real Pokémon. Include accurate Pokédex details and interesting facts. Do not include any names that are already in the database: ${[
        ...pokemon.map((p) => p.name),
        ...createdPokemon.map((p) => p.name),
      ].join(", ")}.`;

      // Generate a Pokemon using AI
      const result = await generateObject({
        model: openai("gpt-4o-2024-08-06"),
        schema: pokemonSchema,
        system:
          "You are an enthusiastic Pokémon Professor adding fun and interactive Pokémon information to the Pokédex. Generate realistic and accurate Pokémon information designed to be fun and engaging. Choose names that sound as close to a drug name as you can, and avoid easily recognizable pokemon names.",
        prompt: prompt,
      });

      // Extract the generated Pokemon data
      const { name, description, generation, facts } = result.object.pokemon;

      const pokemonData = await api.getPokemonByName(name.toLowerCase());
      const image = pokemonData.sprites.front_default;
      const type1 = pokemonData.types[0].type.name;
      const type2 = pokemonData.types[1]?.type.name;

      // Create the Pokemon in the database
      const newPokemon = await prisma.pokemon.create({
        data: {
          name,
          image,
          description,
          type1,
          type2,
          generation,
          facts: {
            create: facts.map((fact) => ({
              title: fact.title,
              content: fact.content,
              category: "pokemon",
            })),
          },
        },
        include: {
          facts: true,
        },
      });

      createdPokemon.push(newPokemon);
    }

    return NextResponse.json({ pokemon: createdPokemon });
  } catch (error) {
    console.error("Error generating Pokemon:", error);
    return NextResponse.json(
      { error: "Error generating Pokemon entries: " + error },
      { status: 500 }
    );
  }
}
