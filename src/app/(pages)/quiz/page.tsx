import { auth } from "@/auth";
import Quiz from "@/components/quiz";

export default async function QuizPage() {
  const session = await auth();

  return <Quiz session={session} />;
}
