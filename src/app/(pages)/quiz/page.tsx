import { Quiz } from "@/lib/validation/types/quiz";
import { auth } from "@/auth";
import { Header } from "@/components/header";
import QuizComponent from "@/components/quiz";
import { headers } from "next/headers";

export default async function QuizPage() {
  // Get the session
  const session = await auth();

  // Get the host from headers
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  const response = await fetch(`${protocol}://${host}/api/quiz`, {
    method: "POST",
    body: JSON.stringify({ userId: session?.user.id }),
    cache: "no-store",
  });

  const quiz: Quiz = await response.json();

  return (
    <div className="w-full h-dvh flex flex-col items-center mx-auto">
      <Header session={session} />
      <QuizComponent quiz={quiz} />
    </div>
  );
}
