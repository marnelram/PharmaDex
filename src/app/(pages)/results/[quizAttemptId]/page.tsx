import React from "react";
import Results from "@/components/results";
import prisma from "@/lib/db/prisma";

type tParams = Promise<{ quizAttemptId: string }>;

export default async function ResultsPage(props: { params: tParams }) {
  const { quizAttemptId } = await props.params;
  const quizAttempt = await prisma.quizAttempt.findUnique({
    where: {
      id: quizAttemptId,
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
