import { Quiz } from "@/lib/validation/types/quiz";
import { auth } from "@/auth";
import QuizComponent from "@/components/quiz";
import { headers } from "next/headers";

export default async function QuizPage() {
  // Get the session
  const session = await auth();

  // Get the host from headers
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  // Forward the authentication cookies/headers
  const response = await fetch(`${protocol}://${host}/api/quiz`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Forward the cookie header from the incoming request
      cookie: headersList.get("cookie") ?? "",
    },
    body: JSON.stringify({ userId: session?.user.id ?? null }),
    cache: "no-store",
  });

  const quiz: Quiz = await response.json();

  return (
    <div className="w-full flex flex-col items-center mx-auto">
      <QuizComponent quiz={quiz} />
    </div>
  );
}
