"use client";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";

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
        <div className="text-white p-8 text-center animate-retro-slide bg-black/30 rounded-lg">
          <h2 className="mb-4">Drug or Pokémon?</h2>
          <h5 className="mt-4 max-w-4xl mx-auto">
            Can you tell the difference between medication and Pokémon?
          </h5>
        </div>

        {/* Main CTA */}
        <div className="flex justify-center animate-retro-slide">
          <Button
            size="lg"
            className="animate-retro-pulse transition-all duration-300"
            onClick={() => router.push("/quiz")}
          >
            ▶ Start Quiz ◀
          </Button>
        </div>

        {/* Leaderboard Preview */}
        <div className="retro-card animate-retro-slide">
          <div className="md:p-8 p-6 space-y-6 lg:space-y-12">
            <h2 className="text-center">🏆 Champions 🏆</h2>

            {/* Podium Display */}
            <div className="flex justify-around items-end">
              {/* Second Place */}
              <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                  <div className="size-16 rounded-full bg-gray-200 border-4 border-gray-500 pixel-circle flex items-center justify-center shadow-lg pixel-perfect">
                    <span className="font-bold text-lg">🥈</span>
                  </div>
                  <div className="absolute rounded-full -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gray-500 pixel-circle-small border-2 border-[var(--border)] flex items-center justify-center text-xs font-bold text-white">
                    2
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <h5 className="block truncate max-w-42">
                    {topScores[1]?.displayName ?? "---"}
                  </h5>
                  <span className="block text-sm opacity-75">
                    {topScores[1]?.totalScore.toLocaleString() ?? 0} PTS
                  </span>
                </div>
              </div>

              {/* First Place */}
              <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                  <div className="size-20 rounded-full bg-yellow-200 border-4 border-yellow-600 pixel-circle flex items-center justify-center shadow-xl pixel-perfect animate-retro-glow">
                    <span className="font-bold text-2xl">🥇</span>
                  </div>
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-3xl animate-retro-bounce">
                    👑
                  </div>
                  <div className="absolute rounded-full -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-yellow-600 pixel-circle-small border-2 border-[var(--border)] flex items-center justify-center text-xs font-bold">
                    1
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <h5 className="block truncate max-w-42">
                    {topScores[0]?.displayName ?? "---"}
                  </h5>
                  <span className="block text-sm opacity-75">
                    {topScores[0]?.totalScore.toLocaleString() ?? 0} PTS
                  </span>
                </div>
              </div>

              {/* Third Place */}
              <div className="flex flex-col items-center space-y-3">
                <div className="relative">
                  <div className="size-14 rounded-full bg-orange-200 border-4 border-orange-700 pixel-circle flex items-center justify-center shadow-lg pixel-perfect">
                    <span className="font-bold">🥉</span>
                  </div>
                  <div className="absolute rounded-full -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-orange-700 pixel-circle-small border-2 border-[var(--border)] flex items-center justify-center text-xs font-bold text-white">
                    3
                  </div>
                </div>
                <div className="text-center space-y-1">
                  <h5 className="block truncate max-w-42">
                    {topScores[2]?.displayName ?? "---"}
                  </h5>
                  <span className="block text-sm opacity-75">
                    {topScores[2]?.totalScore.toLocaleString() ?? 0} PTS
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Facts Carousel */}
        <div className="retro-card animate-retro-slide">
          <CardContent className="p-8 space-y-6">
            <div className="text-center">
              <h3 className="mb-2">💡 Did You Know? 💡</h3>
            </div>

            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin" />
                <p>Loading facts...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 space-y-3">
                <h4>⚠ ERROR! ⚠</h4>
                <p>Unable to load fun facts</p>
              </div>
            ) : facts.length === 0 ? (
              <div className="text-center py-12">
                <p>No facts available</p>
              </div>
            ) : (
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
                      <div className="px-6 py-4 text-center space-y-4">
                        <h4 className="font-bold">{fact.title}</h4>
                        <p className="leading-relaxed max-w-2xl mx-auto">
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
        </div>

        {/* Navigation Buttons */}
        <div className="hidden sm:grid grid-cols-1 sm:grid-cols-2 gap-4 animate-retro-slide">
          <Button
            variant="secondary"
            size="lg"
            className="h-16 flex items-center justify-center space-x-3 group"
            onClick={() => router.push("/quizHistory")}
          >
            <Book className="h-6 w-6 group-hover:animate-retro-bounce" />
            <span>Quiz History</span>
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="h-16 flex items-center justify-center space-x-3 group"
            onClick={() => router.push("/leaderboard")}
          >
            <Users className="h-6 w-6 group-hover:animate-retro-bounce" />
            <span>Leaderboard</span>
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="h-16 flex items-center justify-center space-x-3 group"
            onClick={() => router.push("/achievements")}
          >
            <Award className="h-6 w-6 group-hover:animate-retro-bounce" />
            <span>Achievements</span>
          </Button>

          <Button
            variant="secondary"
            size="lg"
            className="h-16 flex items-center justify-center space-x-3 group"
            onClick={() => router.push("/settings")}
          >
            <Settings className="h-6 w-6 group-hover:animate-retro-bounce" />
            <span>Settings</span>
          </Button>
        </div>

        {/* Spacer for bottom */}
        <div className="h-8"></div>
      </div>
    </main>
  );
}
