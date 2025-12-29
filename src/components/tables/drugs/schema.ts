import { z } from "zod";
import { DosageForm, Drug, Fact } from "@/generated/prisma/browser";

export type DrugWithFacts = Drug & {
  facts: Fact[];
};

export const drugSchema = z.object({
  id: z.string(),
  name: z.string(),
  generic: z.string(),
  drugClass: z.string(),
  dosageForm: z.enum(Object.values(DosageForm) as [string, ...string[]]),
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

export type TDrug = z.infer<typeof drugSchema>;
