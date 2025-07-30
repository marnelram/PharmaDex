import { notFound } from "next/navigation";
import prisma from "@/lib/db/prisma";
import FactsQuizResults from "@/components/results/facts-quiz";

export default async function FactsQuizResultsPage({
  params,
}: {
  params: Promise<{ quizAttemptId: string }>;
}) {
  const { quizAttemptId } = await params;

  try {
    const quizAttempt = await prisma.factsQuizAttempt.findUnique({
      where: {
        id: quizAttemptId,
      },
      include: {
        answers: {
          include: {
            question: true,
          },
        },
        user: true,
      },
    });

    if (!quizAttempt) {
      notFound();
    }

    return (
      <div className="w-full min-h-[calc(100dvh-92px)] flex flex-col items-center justify-center mx-auto p-4">
        <FactsQuizResults quizAttempt={quizAttempt} />
      </div>
    );
  } catch (error) {
    console.error("Error loading facts quiz results:", error);
    notFound();
  }
}
