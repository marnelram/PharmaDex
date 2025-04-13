import Link from "next/link";
import { Book, Users, Award, Settings, Zap } from "lucide-react";

export default function AppNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-[#F5F5F5]/60 backdrop-blur-sm shadow-md flex justify-around items-center h-16 sm:hidden">
      <Link
        href="/quiz"
        className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-lg"
      >
        <Book className="size-6" />
      </Link>
      <Link
        href="/leaderboard"
        className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-lg"
      >
        <Users className="size-6" />
      </Link>
      <Link
        href="/achievements"
        className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-lg"
      >
        <Award className="size-6" />
      </Link>
      <Link
        href="/pricing"
        className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-lg"
      >
        <Zap className="size-6" />
      </Link>
      <Link
        href="/settings"
        className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-lg"
      >
        <Settings className="size-6" />
      </Link>
    </nav>
  );
}
