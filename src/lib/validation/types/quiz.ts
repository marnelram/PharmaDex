import { Drug, Pokemon } from "@/generated/prisma/browser";

export type Questions = Array<
  (Drug & { type: "Drug" }) | (Pokemon & { type: "Pokemon" })
>;

export type Quiz = {
  quizId: string;
  questions: Questions;
};
