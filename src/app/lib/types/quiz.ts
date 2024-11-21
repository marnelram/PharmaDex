import { Drug, Fact, Pokemon } from "@prisma/client";

export type QuizItems = Array<
  | (Drug & { type: "Drug"; facts: Fact[] })
  | (Pokemon & { type: "Pokemon"; facts: Fact[] })
>;
