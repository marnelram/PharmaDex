"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AchievementCard, { AchievementWithProgress } from "./AchievementCard";

interface AchievementsClientProps {
  achievements: AchievementWithProgress[];
  isLoading?: boolean;
}

export default function AchievementsClient({
  achievements,
  isLoading = false,
}: AchievementsClientProps) {
  // Get achievements by category
  const getAchievementsByCategory = (category: string) => {
    return achievements.filter((a) => a.definition.category === category);
  };

  // Get recently unlocked achievements
  const getRecentlyUnlocked = () => {
    return achievements
      .filter((a) => a.isUnlocked)
      .sort((a, b) => {
        const dateA = a.unlockedAt ? new Date(a.unlockedAt).getTime() : 0;
        const dateB = b.unlockedAt ? new Date(b.unlockedAt).getTime() : 0;
        return dateB - dateA;
      });
  };

  // Get in-progress achievements
  const getInProgressAchievements = () => {
    return achievements.filter((a) => !a.isUnlocked && a.progress > 0);
  };

  // Display loading state if data is being loaded
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <p className="text-[22px] font-medium font-['Poppins']">
          Loading achievements...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-8">
      <Card className="w-full max-w-4xl bg-[#e6e6e6]">
        <CardHeader className="relative p-4 border-b w-full">
          <Link href="/">
            <ChevronLeft className="hover:translate-x-[-5px] transition-transform absolute size-8 left-4 sm:left-12 top-1/2 translate-y-[-50%] cursor-pointer" />
          </Link>
          <CardTitle className="text-[44px] font-bold text-center font-['Poppins']">
            Achievements & Badges
          </CardTitle>
          <CardDescription className="text-[16px] font-['Raleway'] text-center">
            Track your progress and showcase your gaming achievements
          </CardDescription>
        </CardHeader>

        <CardContent className="p-0">
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="w-full grid grid-cols-3">
              <TabsTrigger value="all">All Achievements</TabsTrigger>
              <TabsTrigger value="recently-unlocked">
                Recently Unlocked
              </TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <ScrollArea className="h-[70vh] rounded-[15px]">
                <div className="p-6">
                  <h2 className="text-[22px] font-medium font-['Poppins'] mb-4">
                    Quiz Master
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {getAchievementsByCategory("quiz-count").map(
                      (achievement) => (
                        <AchievementCard
                          key={achievement.definition.id}
                          achievement={achievement}
                        />
                      )
                    )}
                  </div>

                  <h2 className="text-[22px] font-medium font-['Poppins'] mb-4">
                    Pokémon Expert
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {getAchievementsByCategory("pokemon-experts").map(
                      (achievement) => (
                        <AchievementCard
                          key={achievement.definition.id}
                          achievement={achievement}
                        />
                      )
                    )}
                  </div>

                  <h2 className="text-[22px] font-medium font-['Poppins'] mb-4">
                    Pharmacist
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {getAchievementsByCategory("drug-experts").map(
                      (achievement) => (
                        <AchievementCard
                          key={achievement.definition.id}
                          achievement={achievement}
                        />
                      )
                    )}
                  </div>

                  <h2 className="text-[22px] font-medium font-['Poppins'] mb-4">
                    Speed Demon
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {getAchievementsByCategory("speed-demon").map(
                      (achievement) => (
                        <AchievementCard
                          key={achievement.definition.id}
                          achievement={achievement}
                        />
                      )
                    )}
                  </div>

                  <h2 className="text-[22px] font-medium font-['Poppins'] mb-4">
                    Perfect Scores
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {getAchievementsByCategory("perfect-score").map(
                      (achievement) => (
                        <AchievementCard
                          key={achievement.definition.id}
                          achievement={achievement}
                        />
                      )
                    )}
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="recently-unlocked">
              <ScrollArea className="h-[70vh] rounded-[15px]">
                <div className="p-6">
                  <h2 className="text-[22px] font-medium font-['Poppins'] mb-4">
                    Recently Unlocked Achievements
                  </h2>
                  {getRecentlyUnlocked().length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getRecentlyUnlocked().map((achievement) => (
                        <AchievementCard
                          key={achievement.definition.id}
                          achievement={achievement}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <p className="text-[16px] font-['Raleway'] text-gray-500">
                        No achievements unlocked yet. Keep playing to earn
                        achievements!
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="in-progress">
              <ScrollArea className="h-[70vh] rounded-[15px]">
                <div className="p-6">
                  <h2 className="text-[22px] font-medium font-['Poppins'] mb-4">
                    Achievements In Progress
                  </h2>
                  {getInProgressAchievements().length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {getInProgressAchievements().map((achievement) => (
                        <AchievementCard
                          key={achievement.definition.id}
                          achievement={achievement}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <p className="text-[16px] font-['Raleway'] text-gray-500">
                        No achievements in progress. Start playing to make
                        progress!
                      </p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
