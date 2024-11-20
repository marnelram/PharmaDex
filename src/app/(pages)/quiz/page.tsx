import { auth } from "@/auth";
import Quiz from "@/components/quiz";
import { Header } from "@/components/header";

export default async function QuizPage() {
  const session = await auth();

  return (
    <div className="w-full h-dvh flex flex-col items-center mx-auto">
      <Header session={session} />
      <Quiz session={session} />
    </div>
  );
}
