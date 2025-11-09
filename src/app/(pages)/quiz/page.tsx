import { Quiz } from "@/lib/validation/types/quiz";
import { auth } from "@/auth";
import QuizComponent from "@/components/quiz/quiz";
import { headers } from "next/headers";

export default async function QuizPage() {
  // Get the session
  const session = await auth();

  // Get the host from headers
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  // Forward the authentication cookies/headers
  // Fetch a large pool of questions (100) to support all game modes
  const response = await fetch(`${protocol}://${host}/api/quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Forward the cookie header from the incoming request
      cookie: headersList.get("cookie") ?? "",
    },
    body: JSON.stringify({
      userId: session?.user.id ?? null,
      questionCount: 100
    }),
    cache: "no-store",
  });

  const quiz: Quiz = await response.json();

  return (
    <div className="w-full sm:h-[calc(100dvh-92px)] h-[calc(100dvh-130px)] flex flex-col items-center justify-center mx-auto">
      <QuizComponent quiz={quiz} />
    </div>
  );
}
