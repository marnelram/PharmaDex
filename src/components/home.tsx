"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Award, Settings, Loader2, Book } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fact, QuizAttempt } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";
import Autoplay from "embla-carousel-autoplay";

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
    <main className="min-h-[80dvh] sm:min-h-[90dvh] w-full flex flex-col items-center p-4 sm:p-6 lg:p-8 animate-pixel-fade">
      <div className="w-full max-w-4xl mx-auto space-y-8">
        {/* Title Section */}
        <div className="text-center py-1 bg-white/60 rounded-t-xl">
          <h1 className="text-[#E63946] animate-retro-glow">
            Drug or Pokémon?
          </h1>
          <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#E63946] to-transparent mx-auto"></div>
        </div>

        {/* Main CTA */}
        <div className="flex justify-center">
          <Button
            size="wide"
            className="animate-retro-pulse hover:animate-none transition-all duration-300"
            onClick={() => router.push("/quiz")}
          >
            ▶ Start Quiz ◀
          </Button>
        </div>

        {/* Leaderboard Preview */}
        <Card className="animate-retro-slide">
          <div className="p-6 space-y-6">
            <div className="text-center">
              <h2 className="text-[#E63946] mb-2">🏆 Champions 🏆</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#F3E260] to-transparent mx-auto"></div>
            </div>

            {/* Podium Display */}
            <div className="flex justify-center items-end gap-8 sm:gap-12 lg:gap-16">
              {/* Second Place - Left */}
              <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                  <Avatar className="size-16 border-4 border-[#9E9E9E] shadow-lg pixel-perfect transition-all duration-300 hover:scale-105">
                    <AvatarImage
                      src={`/placeholder-avatar-1.png`}
                      className="pixel-perfect"
                    />
                    <AvatarFallback className="text-white font-bold bg-[#9E9E9E]">
                      2
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#9E9E9E] rounded-full flex items-center justify-center text-xs font-bold text-white">
                    2
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <span className="text-[#2D2D2D] block truncate max-w-20">
                    {topScores[1]?.displayName ?? "---"}
                  </span>
                  <span className="text-[#666] block">
                    {topScores[1]?.totalScore.toLocaleString() ?? 0} PTS
                  </span>
                </div>
                {/* Podium Base */}
                <div className="w-16 h-12 bg-gradient-to-t from-[#9E9E9E] to-[#B8B8B8] border-t-4 border-[#9E9E9E] shadow-lg"></div>
              </div>

              {/* First Place - Center */}
              <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                  <Avatar className="size-20 border-4 border-[#F3E260] shadow-xl pixel-perfect transition-all duration-300 hover:scale-105 animate-retro-glow">
                    <AvatarImage
                      src={`/placeholder-avatar-0.png`}
                      className="pixel-perfect"
                    />
                    <AvatarFallback className="text-[#2D2D2D] font-bold bg-[#F3E260]">
                      1
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-3xl animate-retro-bounce">
                    👑
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#F3E260] rounded-full flex items-center justify-center text-xs font-bold text-[#2D2D2D]">
                    1
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <span className="text-[#2D2D2D] block truncate max-w-24">
                    {topScores[0]?.displayName ?? "---"}
                  </span>
                  <span className="text-[#666] block">
                    {topScores[0]?.totalScore.toLocaleString() ?? 0} PTS
                  </span>
                </div>
                {/* Podium Base */}
                <div className="w-20 h-16 bg-gradient-to-t from-[#F3E260] to-[#F5E880] border-t-4 border-[#F3E260] shadow-xl"></div>
              </div>

              {/* Third Place - Right */}
              <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                  <Avatar className="size-14 border-4 border-[#CD7F32] shadow-lg pixel-perfect transition-all duration-300 hover:scale-105">
                    <AvatarImage
                      src={`/placeholder-avatar-2.png`}
                      className="pixel-perfect"
                    />
                    <AvatarFallback className="text-white font-bold bg-[#CD7F32]">
                      3
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#CD7F32] rounded-full flex items-center justify-center text-xs font-bold text-white">
                    3
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <span className="text-[#2D2D2D] block truncate max-w-20">
                    {topScores[2]?.displayName ?? "---"}
                  </span>
                  <span className="text-[#666] block">
                    {topScores[2]?.totalScore.toLocaleString() ?? 0} PTS
                  </span>
                </div>
                {/* Podium Base */}
                <div className="w-14 h-8 bg-gradient-to-t from-[#CD7F32] to-[#E6934A] border-t-4 border-[#CD7F32] shadow-lg"></div>
              </div>
            </div>
          </div>
        </Card>

        {/* Quick Facts Carousel */}
        <Card className="animate-retro-slide">
          <CardContent className="p-6 space-y-4">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-[#E63946]" />
                <p className="text-[#666]">Loading facts...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 space-y-3">
                <h4 className="text-[#E63946]">⚠ ERROR! ⚠</h4>
                <p className="text-[#666]">Unable to load fun facts</p>
              </div>
            ) : facts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-[#666]">No facts available</p>
              </div>
            ) : (
              <>
                <div className="text-center space-y-2">
                  <h3 className="text-[#E63946]">💡 Did You Know? 💡</h3>
                  <div className="w-20 h-1 bg-gradient-to-r from-transparent via-[#F3E260] to-transparent mx-auto"></div>
                </div>
                <Carousel
                  plugins={[
                    Autoplay({
                      delay: 6000,
                      stopOnInteraction: true,
                    }),
                  ]}
                  className="w-full"
                >
                  <CarouselContent>
                    {facts.map((fact: Fact, index: number) => (
                      <CarouselItem key={index}>
                        <div className="px-6 py-4 text-center space-y-3">
                          <h4 className="text-[#2D2D2D]">{fact.title}</h4>
                          <p className="leading-relaxed text-[#2D2D2D] max-w-2xl mx-auto">
                            {fact.content}
                          </p>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </>
            )}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-retro-slide">
          <Button
            variant="outline"
            size="lg"
            className="h-16 flex items-center justify-center space-x-3 group transition-all duration-300 hover:scale-[1.02]"
            onClick={() => router.push("/quizHistory")}
          >
            <Book className="h-5 w-5 group-hover:animate-retro-bounce" />
            <span>📚 Quiz History</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 flex items-center justify-center space-x-3 group transition-all duration-300 hover:scale-[1.02]"
            onClick={() => router.push("/leaderboard")}
          >
            <Users className="h-5 w-5 group-hover:animate-retro-bounce" />
            <span>👥 Leaderboard</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 flex items-center justify-center space-x-3 group transition-all duration-300 hover:scale-[1.02]"
            onClick={() => router.push("/achievements")}
          >
            <Award className="h-5 w-5 group-hover:animate-retro-bounce" />
            <span>🏅 Achievements</span>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-16 flex items-center justify-center space-x-3 group transition-all duration-300 hover:scale-[1.02]"
            onClick={() => router.push("/settings")}
          >
            <Settings className="h-5 w-5 group-hover:animate-retro-bounce" />
            <span>⚙️ Settings</span>
          </Button>
        </div>

        {/* Spacer for bottom */}
        <div className="h-8"></div>
      </div>

      {/* Cleaner Background Elements */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        {/* Subtle Pokéball */}
        <div className="absolute top-[15%] left-[5%] w-12 h-12 opacity-15 animate-retro-pulse">
          <div className="w-full h-full bg-[#E63946] rounded-full relative">
            <div className="absolute top-[45%] w-full h-[10%] bg-[#2D2D2D]"></div>
            <div className="absolute top-[50%] w-full h-[50%] bg-[#F5F5F5] rounded-b-full"></div>
            <div className="absolute top-[40%] left-[40%] w-[20%] h-[20%] bg-[#2D2D2D] rounded-full border border-[#F5F5F5]"></div>
          </div>
        </div>

        {/* Subtle Pill */}
        <div className="absolute bottom-[20%] right-[8%] w-16 h-8 opacity-15 animate-retro-pulse">
          <div className="w-full h-full bg-gradient-to-r from-[#F3E260] to-[#1E90FF] rounded-full relative">
            <div className="absolute left-[48%] w-[4%] h-full bg-[#2D2D2D]"></div>
          </div>
        </div>

        {/* Minimal floating particles */}
        <div className="absolute top-[30%] right-[15%] w-2 h-2 bg-[#F3E260] rounded-full animate-retro-pulse opacity-20"></div>
        <div className="absolute bottom-[35%] left-[12%] w-3 h-3 bg-[#1E90FF] rounded-full animate-retro-pulse opacity-20"></div>
      </div>
    </main>
  );
}
