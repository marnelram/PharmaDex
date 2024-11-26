import { auth } from "@/auth";
import { Header } from "@/components/header";
import Home from "@/components/home";
import prisma from "@/lib/db/prisma";

export default async function HomePage() {
  const session = await auth();

  const topScores = await prisma.quizAttempt.findMany({
    where: {
      completed: true,
    },
    orderBy: {
      totalScore: "desc",
    },
    take: 3,
  });

  return (
    <div className="w-full flex flex-col items-center mx-auto">
      <Header session={session} />
      <Home topScores={topScores} />
    </div>
  );
}
