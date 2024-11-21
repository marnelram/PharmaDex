import { Drug, Fact, Pokemon } from "@prisma/client";

export type Questions = Array<
  | (Drug & { type: "Drug"; facts: Fact[] })
  | (Pokemon & { type: "Pokemon"; facts: Fact[] })
>;

export type Quiz = {
  quizId: string;
  questions: Questions;
};
