import React from "react";
import PracticeResults from "@/components/results/practice";
import prisma from "@/lib/db/prisma";

type tParams = Promise<{ quizAttemptId: string }>;

export default async function ResultsPage(props: { params: tParams }) {
  const { quizAttemptId } = await props.params;
  const quizAttempt = await prisma.quizAttempt.findUnique({
    where: {
      id: quizAttemptId,
    },
    include: {
      user: true,
      answers: true,
    },
  });

  if (!quizAttempt) {
    return <div>No quiz attempt found</div>;
  }

  const { totalScore, correctCount, totalQuestions, answers } = quizAttempt;
  const wrongAnswers = answers.filter((answer) => answer.isCorrect === false);

  return (
    <PracticeResults
      quizAttempt={quizAttempt}
      totalScore={totalScore ?? 0}
      correctCount={correctCount ?? 0}
      totalQuestions={totalQuestions}
      wrongAnswers={wrongAnswers}
    />
  );
}
