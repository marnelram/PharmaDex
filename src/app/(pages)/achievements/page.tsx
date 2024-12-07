"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Pill,
  Dna,
  Syringe,
  Stethoscope,
  Microscope,
  HeartPulse,
  Pipette,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

const badges = [
  {
    id: 1,
    name: "Pokémon Professor",
    icon: Dna,
    description: "Correctly identify 50 Pokémon",
    progress: 30,
    total: 50,
    color: "bg-[#E63946]",
  },
  {
    id: 2,
    name: "Pharmacist in Training",
    icon: Pill,
    description: "Correctly identify 25 drugs",
    progress: 15,
    total: 25,
    color: "bg-green-500",
  },
  {
    id: 3,
    name: "Master Classifier",
    icon: Microscope,
    description: "Achieve a 90% accuracy rate in 100 questions",
    progress: 70,
    total: 100,
    color: "bg-purple-500",
  },
  {
    id: 4,
    name: "Speed Demon",
    icon: Syringe,
    description: "Answer 20 questions correctly in under 1 minute",
    progress: 12,
    total: 20,
    color: "bg-red-500",
  },
  {
    id: 5,
    name: "Streak Master",
    icon: HeartPulse,
    description: "Maintain a 10-day login streak",
    progress: 7,
    total: 10,
    color: "bg-yellow-500",
  },
  {
    id: 6,
    name: "Quiz Champion",
    icon: Stethoscope,
    description: "Win 5 daily challenges",
    progress: 3,
    total: 5,
    color: "bg-indigo-500",
  },
  {
    id: 7,
    name: "Pokédex Expert",
    description: "Identify all 151 original Pokémon",
    progress: 100,
    total: 151,
    color: "bg-pink-500",
  },
  {
    id: 8,
    name: "Drug Encyclopaedia",
    description: "Learn about 200 different drugs",
    progress: 150,
    total: 200,
    color: "bg-orange-500",
  },
  {
    id: 9,
    name: "Perfect Scorer",
    description: "Achieve 100% in 5 quizzes",
    progress: 3,
    total: 5,
    color: "bg-teal-500",
  },
  {
    id: 10,
    name: "Consistent Learner",
    icon: Pipette,
    description: "Complete 30 quizzes in 30 days",
    progress: 25,
    total: 30,
    color: "bg-cyan-500",
  },
];

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-start p-8">
      <Card className="w-full max-w-4xl bg-[#e6e6e6]">
        <CardHeader className="relative p-4 border-b w-full">
          <Link href="/">
            <ChevronLeft className="hover:translate-x-[-5px] transition-transform absolute size-8 left-4 sm:left-12 top-1/2 translate-y-[-50%] cursor-pointer" />
          </Link>
          <CardTitle className="text-[44px] font-bold text-center font-['Poppins']">
            Achievements & Badges
          </CardTitle>
          <CardDescription className="text-[16px] font-['Raleway'] text-center">
            Coming Soon!
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ScrollArea className="h-[70vh] rounded-[15px]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
              {badges.map((badge) => (
                <TooltipProvider key={badge.id}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Card
                        className={`${
                          badge.color
                        } text-[#F5F5F5] hover:scale-105 transition-transform duration-200 rounded-[15px] ${
                          badge.progress >= badge.total ? "animate-bounce" : ""
                        }`}
                      >
                        <CardContent className="p-6 flex flex-col items-center">
                          {badge.icon && (
                            <badge.icon className="w-16 h-16 mb-4" />
                          )}
                          <h3 className="text-[22px] font-medium font-['Poppins'] text-center mb-2">
                            {badge.name}
                          </h3>
                          <Badge
                            variant="outline"
                            className="bg-white/20 text-[#F5F5F5] mb-4 text-[14px] font-medium font-['Raleway']"
                          >
                            {badge.progress >= badge.total
                              ? "Completed"
                              : "In Progress"}
                          </Badge>
                          <Progress
                            value={(badge.progress / badge.total) * 100}
                            className="w-full bg-white/30"
                          />
                          <p className="text-[14px] mt-2 font-['Raleway']">
                            {badge.progress} / {badge.total}
                          </p>
                        </CardContent>
                      </Card>
                    </TooltipTrigger>
                    <TooltipContent className="font-['Raleway'] text-[14px]">
                      <p>{badge.description}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
