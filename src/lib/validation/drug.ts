import { z } from "zod";

export const drugFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  generic: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  class: z.string().min(1, "Class is required"),
  generation: z.number().optional(),
  facts: z.array(
    z.object({
      title: z.string().min(1, "Fact title is required"),
      content: z.string().min(1, "Fact content is required"),
    })
  ),
});
