import { Quiz } from "@/lib/validation/types/quiz";
import { auth } from "@/auth";
import QuizComponent from "@/components/quiz/quiz";
import { headers } from "next/headers";
import { GameMode, GAME_MODES } from "@/lib/validation/types/gameMode";
import { notFound } from "next/navigation";

interface QuizPageProps {
  params: Promise<{
    gameMode: string;
  }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { gameMode } = await params;

  // Validate game mode
  if (!GAME_MODES[gameMode as GameMode]) {
    notFound();
  }

  // Get the session
  const session = await auth();

  // Get the host from headers
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  // Determine question count based on game mode
  const modeConfig = GAME_MODES[gameMode as GameMode];
  const questionCount =
    modeConfig.questionCount === "unlimited" ? 100 : modeConfig.questionCount;

  // Forward the authentication cookies/headers
  const response = await fetch(`${protocol}://${host}/api/quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Forward the cookie header from the incoming request
      cookie: headersList.get("cookie") ?? "",
    },
    body: JSON.stringify({
      userId: session?.user.id ?? null,
      questionCount,
    }),
    cache: "no-store",
  });

  const quiz: Quiz = await response.json();

  return (
    <div className="w-full sm:h-[calc(100dvh-92px)] h-[calc(100dvh-130px)] flex flex-col items-center mx-auto overflow-hidden">
      <QuizComponent quiz={quiz} gameMode={gameMode as GameMode} />
    </div>
  );
}
