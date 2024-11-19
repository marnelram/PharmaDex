import React from "react";
import Results from "@/components/results";
import prisma from "@/lib/db/prisma";

export default async function ResultsPage(context: {
  params: { quizAttemptId: string };
}) {
  const { params } = await context;

  const quizAttempt = await prisma.quizAttempt.findUnique({
    where: {
      id: params.quizAttemptId,
    },
    include: {
      answers: true,
    },
  });

  if (!quizAttempt) {
    return <div>No quiz attempt found</div>;
  }

  return (
    <Results
      score={quizAttempt.score}
      totalQuestions={quizAttempt.totalQuestions}
    />
  );
}
