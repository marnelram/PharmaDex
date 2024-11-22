import { Drug, Pokemon } from "@prisma/client";

export type Questions = Array<
  (Drug & { type: "Drug" }) | (Pokemon & { type: "Pokemon" })
>;

export type Quiz = {
  quizId: string;
  questions: Questions;
};
