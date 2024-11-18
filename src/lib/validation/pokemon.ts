import { z } from "zod";

export const pokemonFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  type1: z.string().min(1, "Primary Type is required"),
  type2: z.string().optional(),
  generation: z.number().min(1, "Generation is required"),
  facts: z.array(
    z.object({
      title: z.string().min(1, "Fact title is required"),
      content: z.string().min(1, "Fact content is required"),
    })
  ),
});
