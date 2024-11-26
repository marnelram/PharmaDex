"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Award, Settings, Loader2, Book } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fact, QuizAttempt } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

export default function Home({ topScores }: { topScores: QuizAttempt[] }) {
  const router = useRouter();

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

  return (
    <main className="size-full h-[80dvh] sm:h-[90dvh] overflow-y-auto flex flex-col items-center justify-between p-8">
      <div className="w-full max-w-4xl flex flex-col gap-4">
        {/* Title */}
        <h1 className="text-[44px] font-bold text-center font-['Poppins']">
          Drug or Pokémon?
        </h1>

        {/* Main CTA */}
        <Button
          className="w-full py-8 text-[22px] font-bold rounded-[25px] bg-[#E63946] hover:bg-[#d32d3a] transition-all hover:scale-105 duration-300 shadow-lg font-['Poppins']"
          onClick={() => router.push("/quiz")}
        >
          Start Quiz
        </Button>

        {/* Leaderboard Preview */}
        <Card className="p-4 rounded-[15px]">
          <h2 className="text-[32px] font-bold pb-2 px-4 font-['Poppins']">
            Top Players
          </h2>
          <div className="flex justify-center items-end gap-6 md:gap-12 lg:gap-24">
            {[2, 0, 1].map((rank) => (
              <div key={rank} className="flex flex-col items-center">
                <Avatar
                  className={cn(
                    rank == 0 && "size-16",
                    rank == 1 && "size-14",
                    rank == 2 && "size-12"
                  )}
                >
                  <AvatarImage src={`/placeholder-avatar-${rank}.png`} />
                  <AvatarFallback>{rank + 1}</AvatarFallback>
                </Avatar>
                <span className="mt-2 font-semibold">player {rank + 1}</span>
                <span className="text-sm text-gray-600">
                  {topScores[rank].totalScore.toLocaleString()} pts
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Facts Carousel */}
        <Card>
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
              <Carousel
                plugins={[
                  Autoplay({
                    delay: 5000,
                    stopOnInteraction: true,
                  }),
                ]}
              >
                <CarouselContent>
                  {facts.map((fact: Fact, index: number) => (
                    <CarouselItem key={index}>
                      <div className="px-2">
                        <h3 className="text-[22px] text-center font-medium font-['Poppins']">
                          {fact.title}
                        </h3>
                        <p className="mt-2 text-left sm:text-center text-[16px] font-['Raleway']">
                          {fact.content}
                        </p>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className=" grid-cols-1 sm:grid-cols-2 gap-4 hidden sm:grid">
          <Button
            variant="outline"
            className="py-6 flex items-center justify-center rounded-[25px] text-[14px] font-medium font-['Raleway'] border-[#9E9E9E] hover:bg-[#F3E260]/10"
            onClick={() => router.push("/quizHistory")}
          >
            <Book className="mr-2 h-5 w-5" />
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

      {/* Bottom Navbar for Mobile */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md flex justify-around items-center h-16 sm:hidden">
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
          href="/settings"
          className="flex flex-col items-center p-2 hover:bg-gray-100 rounded-lg"
        >
          <Settings className="size-6" />
        </Link>
      </nav>

      {/* Background Elements - Updated with design colors */}
      <div className="fixed inset-0 pointer-events-none -z-10">
        {/* Pokéball background element */}
        <div className="absolute -rotate-45 top-5 left-5 sm:size-20 bg-[#E63946] rounded-full opacity-10 overflow-hidden">
          <div className="absolute top-[45%] w-full h-[10%] bg-[#9E9E9E]"></div>
          <div className="absolute top-[50%] w-full h-[50%] bg-white"></div>
          <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-[#9E9E9E] rounded-full"></div>
        </div>
        {/* Pill background element */}
        <div className="absolute rotate-45 bottom-20 right-2 w-20 h-12 sm:w-32 sm:h-12 opacity-10">
          <div className="absolute inset-0 bg-[#F3E260] rounded-full"></div>
          <div className="absolute left-[45%] w-[10%] h-full bg-[#9E9E9E]"></div>
        </div>
      </div>
    </main>
  );
}
