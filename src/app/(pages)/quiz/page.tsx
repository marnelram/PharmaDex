import { auth } from "@/auth";
import Quiz from "@/components/quiz";
import { Header } from "@/components/header";
import prisma from "@/app/lib/db/prisma";
import { Drug, Fact, Pokemon } from "@prisma/client";

type QuizItems = Array<
  | (Drug & { type: "Drug"; facts: Fact[] })
  | (Pokemon & { type: "Pokemon"; facts: Fact[] })
>;

export default async function QuizPage() {
  const session = await auth();

  // Get random mix of drugs and pokemon
  const drugs = await prisma.drug.findMany({
    include: {
      facts: true,
    },
  });

  const pokemon = await prisma.pokemon.findMany({
    include: {
      facts: true,
    },
  });

  // Combine and transform the data
  let quizItems: QuizItems = [
    ...drugs.map((drug) => ({
      ...drug,
      type: "Drug" as const,
    })),
    ...pokemon.map((p) => ({
      ...p,
      type: "Pokemon" as const,
    })),
  ];

  // Shuffle the array
  quizItems = quizItems.sort(() => Math.random() - 0.5);

  return (
    <div className="w-full h-dvh flex flex-col items-center mx-auto">
      <Header session={session} />
      <Quiz session={session} quizItems={quizItems} />
    </div>
  );
}
