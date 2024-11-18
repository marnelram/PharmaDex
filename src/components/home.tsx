"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Trophy,
  Users,
  Award,
  Settings,
  ChevronRight,
  ChevronLeft,
  Loader2,
  LogIn,
  LogOut,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { Fact } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/auth";

export default function Home({ session }: { session: Session | null }) {
  const router = useRouter();
  const [currentFact, setCurrentFact] = useState(0);

  const {
    data: facts = [] as Fact[],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["facts"],
    queryFn: async () => {
      const response = await fetch("/api/facts");
      if (!response.ok) {
        throw new Error("Failed to fetch facts");
      }
      return response.json();
    },
  });

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % facts.length);
  };

  const prevFact = () => {
    setCurrentFact((prev) => (prev - 1 + facts.length) % facts.length);
  };

  return (
    <div className="sm:max-h-screen h-full bg-[#F5F5F5] flex flex-col items-center justify-between p-8">
      {/* Header */}
      <header className="w-full max-w-5xl flex justify-between items-center p-4 bg-white rounded-[15px] shadow-md">
        <h1 className="text-[32px] font-bold font-['Poppins']">
          Drug or Pokémon?
        </h1>
        <div className="relative">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer">
                  <AvatarImage
                    src={session.user.image || "/default-avatar.png"}
                  />
                  <AvatarFallback>
                    {session.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 -translate-x-7">
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut({ redirectTo: "/" })}>
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => router.push("/auth/signin")}
              className="bg-[#E63946] hover:bg-[#d32d3a] transition-all duration-300 shadow-md rounded-[25px] text-[14px] font-medium"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Login
            </Button>
          )}
        </div>
      </header>

      <div className="w-full max-w-4xl mt-8">
        {/* Title */}
        <h1 className="text-[44px] font-bold text-center mb-8 font-['Poppins']">
          Drug or Pokémon?
        </h1>

        {/* Main CTA */}
        <Button
          className="w-full py-8 text-[22px] font-bold rounded-[25px] bg-[#E63946] hover:bg-[#d32d3a] transition-all duration-300 shadow-lg font-['Poppins']"
          onClick={() => router.push("/quiz")}
        >
          Start Quiz
        </Button>

        {/* Leaderboard Preview */}
        <Card className="mt-4 p-4 rounded-[15px]">
          <h2 className="text-[32px] font-bold mb-4 font-['Poppins']">
            Top Players
          </h2>
          <div className="flex justify-center items-center gap-12 md:gap-24 lg:gap-36">
            {[1, 2, 3].map((rank) => (
              <div key={rank} className="flex flex-col items-center">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={`/placeholder-avatar-${rank}.png`} />
                  <AvatarFallback>{rank}</AvatarFallback>
                </Avatar>
                <span className="mt-2 font-semibold">Player {rank}</span>
                <span className="text-sm text-gray-600">
                  {1000 - (rank - 1) * 100} pts
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Facts Carousel */}
        <Card className="mt-8 h-32 rounded-[15px]">
          <CardContent className="p-6 h-full">
            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <span className="ml-2 text-gray-600">Loading facts...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8">
                <p className="text-red-500 font-semibold">
                  Oops! Something went wrong
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Unable to load fun facts right now
                </p>
              </div>
            ) : facts.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No facts available</p>
              </div>
            ) : (
              <div className="flex items-center justify-between h-full">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevFact}
                  disabled={facts.length <= 1}
                  className="rounded-[25px]"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <div className="text-center">
                  <h3 className="text-[22px] font-medium font-['Poppins']">
                    {facts[currentFact]?.title}
                  </h3>
                  <p className="mt-2 text-[16px] font-['Raleway']">
                    {facts[currentFact]?.content}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={nextFact}>
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
          <Button
            variant="outline"
            className="py-6 flex items-center justify-center rounded-[25px] text-[14px] font-medium font-['Raleway'] border-[#9E9E9E] hover:bg-[#F3E260]/10"
            onClick={() => router.push("/quizHistory")}
          >
            <Trophy className="mr-2 h-5 w-5" />
            Quizzes
          </Button>
          <Button
            variant="outline"
            className="py-6 flex items-center justify-center rounded-[25px] text-[14px] font-medium font-['Raleway'] border-[#9E9E9E] hover:bg-[#F3E260]/10"
            onClick={() => router.push("/leaderboard")}
          >
            <Users className="mr-2 h-5 w-5" />
            Leaderboard
          </Button>
          <Button
            variant="outline"
            className="py-6 flex items-center justify-center rounded-[25px] text-[14px] font-medium font-['Raleway'] border-[#9E9E9E] hover:bg-[#F3E260]/10"
            onClick={() => router.push("/achievements")}
          >
            <Award className="mr-2 h-5 w-5" />
            My Achievements
          </Button>
          <Button
            variant="outline"
            className="py-6 flex items-center justify-center rounded-[25px] text-[14px] font-medium font-['Raleway'] border-[#9E9E9E] hover:bg-[#F3E260]/10"
            onClick={() => router.push("/settings")}
          >
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </div>
      </div>

      {/* Background Elements - Updated with design colors */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#E63946] rounded-full opacity-10"></div>
        <div className="absolute bottom-20 right-20 w-32 h-12 bg-[#F3E260] rounded-full opacity-10 transform rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-[#9E9E9E] rounded-full opacity-10"></div>
      </div>
    </div>
  );
}
