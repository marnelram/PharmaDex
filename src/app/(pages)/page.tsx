import Home from "@/components/home";
import prisma from "@/lib/db/prisma";

export default async function HomePage() {
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
    <div className="w-full flex flex-col items-center mx-auto min-h-screen">
      <Home topScores={topScores} />
    </div>
  );
}
