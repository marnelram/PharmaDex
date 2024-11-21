import { auth } from "@/auth";
import Quiz from "@/components/quiz";
import { Header } from "@/components/header";
import { headers } from "next/headers";
import { QuizItems } from "@/app/lib/types/quiz";

export default async function QuizPage() {
  const session = await auth();

  // Get the host from headers
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";

  // Method 1: Direct fetch using full URL
  const response = await fetch(`${protocol}://${host}/api/quiz`, {
    cache: "no-store",
  });
  const quizItems: QuizItems = await response.json();

  return (
    <div className="w-full h-dvh flex flex-col items-center mx-auto">
      <Header session={session} />
      <Quiz session={session} quizItems={quizItems} />
    </div>
  );
}
