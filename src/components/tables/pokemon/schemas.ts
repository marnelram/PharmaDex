import { z } from "zod";
import { Fact, Pokemon } from "@/generated/prisma/browser";

export type PokemonWithFacts = Pokemon & {
  facts: Fact[];
};

export const pokemonSchema = z.object({
  id: z.string(),
  name: z.string(),
  type1: z.string(),
  type2: z.string(),
  generation: z.number(),
  description: z.string(),
  image: z.string().nullable(),
  facts: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      content: z.string(),
    })
  ),
});

export type TPokemon = z.infer<typeof pokemonSchema>;
