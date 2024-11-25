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
    include: {
      user: true, // Include user data if they're logged in
    },
  });

  // Get top 50 completed quiz attempts
  const topAttempts = await prisma.quizAttempt.findMany({
    where: {
      completed: true,
    },
    orderBy: [
      { totalScore: "desc" },
      { createdAt: "asc" }, // For tiebreakers, earlier attempt ranks higher
    ],
    take: 50,
    include: {
      user: {
        select: {
          name: true,
        },
      },
    },
  });

  if (!quizAttempt) {
    return <div>No quiz attempt found</div>;
  }

  // Find the rank of the current attempt
  const currentRank =
    topAttempts.findIndex((attempt) => attempt.id === quizAttemptId) + 1;

  // If attempt isn't in top 50, find its actual rank
  const actualRank =
    currentRank === 0
      ? (await prisma.quizAttempt.count({
          where: {
            completed: true,
            totalScore: {
              gt: quizAttempt.totalScore,
            },
          },
        })) + 1
      : currentRank;

  console.log("actual rank", actualRank);

  const { totalScore, correctCount, totalQuestions, answers } = quizAttempt;

  const wrongAnswers = answers.filter((answer) => answer.isCorrect === false);

  return (
    <Results
      totalScore={totalScore ?? 0}
      correctCount={correctCount ?? 0}
      totalQuestions={totalQuestions}
      rank={actualRank}
      topAttempts={topAttempts}
      wrongAnswers={wrongAnswers}
    />
  );
}
