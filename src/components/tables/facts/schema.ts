import { z } from "zod";

export const factSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string(),
  type: z.enum(["drug", "pokemon"]),
  drugId: z.string().nullable(),
  pokemonId: z.string().nullable(),
});

export type TFact = z.infer<typeof factSchema>;
