import React from "react";
import Leaderboard from "@/components/leaderboard";
import { auth } from "@/auth";
import prisma from "@/lib/db/prisma";

export default async function LeaderboardPage() {
  const session = await auth();
  const userId = session?.user.id;

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  const quizzes = await prisma.quizAttempt.findMany({
    where: {
      completed: true,
    },
    orderBy: {
      totalScore: "desc",
    },
    include: {
      user: true,
    },
  });

  const userRank = quizzes.findIndex((quiz) => quiz.userId === userId) + 1;

  return <Leaderboard user={user} quizzes={quizzes} userRank={userRank} />;
}
