import React from "react";
import { auth } from "@/auth";
import Results from "@/components/results";
import prisma from "@/lib/db/prisma";

export default async function ResultsPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await auth();

  const quizAttempt = await prisma.quizAttempt.findUnique({
    where: {
      id: params.id,
      userId: session?.user.id,
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
