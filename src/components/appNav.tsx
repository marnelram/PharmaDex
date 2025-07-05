import Link from "next/link";
import { Book, Users, Award, Settings } from "lucide-react";

export default function AppNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-primary-light border-t-[6px] flex justify-around items-center h-16 sm:hidden z-50">
      <Link
        href="/quiz"
        className="flex flex-col items-center p-2 rounded-lg border-2 border-transparent hover:border-black hover:bg-accent-red hover:text-white transition-all duration-200 hover:shadow-[4px_4px_0px_0px_#000] transform hover:scale-105 active:scale-95 animate-retro-bounce"
      >
        <Book className="size-6" />
        <span className="text-xs font-bold mt-1">Quiz</span>
      </Link>
      <Link
        href="/leaderboard"
        className="flex flex-col items-center p-2 rounded-lg border-2 border-transparent hover:border-black hover:bg-accent-red hover:text-white transition-all duration-200 hover:shadow-[4px_4px_0px_0px_#000] transform hover:scale-105 active:scale-95 animate-retro-bounce"
      >
        <Users className="size-6" />
        <span className="text-xs font-bold mt-1">Board</span>
      </Link>
      <Link
        href="/achievements"
        className="flex flex-col items-center p-2 rounded-lg border-2 border-transparent hover:border-black hover:bg-accent-red hover:text-white transition-all duration-200 hover:shadow-[4px_4px_0px_0px_#000] transform hover:scale-105 active:scale-95 animate-retro-bounce"
      >
        <Award className="size-6" />
        <span className="text-xs font-bold mt-1">Awards</span>
      </Link>
      <Link
        href="/settings"
        className="flex flex-col items-center p-2 rounded-lg border-2 border-transparent hover:border-black hover:bg-accent-red hover:text-white transition-all duration-200 hover:shadow-[4px_4px_0px_0px_#000] transform hover:scale-105 active:scale-95 animate-retro-bounce"
      >
        <Settings className="size-6" />
        <span className="text-xs font-bold mt-1">Settings</span>
      </Link>
    </nav>
  );
}
