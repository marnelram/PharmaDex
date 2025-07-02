import Link from "next/link";
import { Book, Users, Award, Settings } from "lucide-react";

export default function AppNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary/95 backdrop-blur-sm border-t-2 border-black shadow-[0px_-4px_0px_0px_#000] flex justify-around items-center h-16 sm:hidden">
      <Link
        href="/quiz"
        className="flex flex-col items-center p-2 hover:bg-accent-yellow hover:text-black transition-all duration-200 border border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_#000] transform hover:scale-105 active:scale-95"
      >
        <Book className="size-6" />
        <span className="text-xs font-bold mt-1">Quiz</span>
      </Link>
      <Link
        href="/leaderboard"
        className="flex flex-col items-center p-2 hover:bg-accent-yellow hover:text-black transition-all duration-200 border border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_#000] transform hover:scale-105 active:scale-95"
      >
        <Users className="size-6" />
        <span className="text-xs font-bold mt-1">Board</span>
      </Link>
      <Link
        href="/achievements"
        className="flex flex-col items-center p-2 hover:bg-accent-yellow hover:text-black transition-all duration-200 border border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_#000] transform hover:scale-105 active:scale-95"
      >
        <Award className="size-6" />
        <span className="text-xs font-bold mt-1">Awards</span>
      </Link>
      <Link
        href="/settings"
        className="flex flex-col items-center p-2 hover:bg-accent-yellow hover:text-black transition-all duration-200 border border-transparent hover:border-black hover:shadow-[2px_2px_0px_0px_#000] transform hover:scale-105 active:scale-95"
      >
        <Settings className="size-6" />
        <span className="text-xs font-bold mt-1">Settings</span>
      </Link>
    </nav>
  );
}
