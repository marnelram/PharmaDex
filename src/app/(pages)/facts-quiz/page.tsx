import { FactsQuiz } from "@/lib/validation/types/facts-quiz";
import { auth } from "@/auth";
import FactsQuizComponent from "@/components/quiz/facts-quiz";
import { headers } from "next/headers";

export default async function FactsQuizPage() {
  // Get the session
  const session = await auth();

  // Get the host from headers
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  try {
    // Forward the authentication cookies/headers
    const response = await fetch(`${protocol}://${host}/api/facts-quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Forward the cookie header from the incoming request
        cookie: headersList.get("cookie") ?? "",
      },
      body: JSON.stringify({ userId: session?.user.id ?? null }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to create facts quiz");
    }

    const quiz: FactsQuiz = await response.json();

    return (
      <div className="w-full min-h-[calc(100dvh-92px)] flex flex-col items-center justify-center mx-auto p-4">
        <FactsQuizComponent quiz={quiz} />
      </div>
    );
  } catch (error) {
    console.error("Error loading facts quiz:", error);

    return (
      <div className="w-full min-h-[calc(100dvh-92px)] flex flex-col items-center justify-center mx-auto p-4">
        <div className="retro-card max-w-md">
          <div className="p-8 text-center space-y-4">
            <h2 className="text-[var(--accent-red)]">⚠ Quiz Unavailable ⚠</h2>
            <p>Sorry, we couldn't load the facts quiz right now.</p>
            <p className="text-sm opacity-75">
              {error instanceof Error
                ? error.message
                : "Unknown error occurred"}
            </p>
            <a
              href="/"
              className="inline-block mt-4 px-6 py-2 bg-[var(--accent-red)] text-white rounded-lg hover:bg-[var(--accent-red-dark)] transition-colors"
            >
              ← Back to Home
            </a>
          </div>
        </div>
      </div>
    );
  }
}
