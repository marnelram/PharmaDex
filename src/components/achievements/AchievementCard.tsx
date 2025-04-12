"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Award,
  Star,
  Flame,
  Dna,
  Pill,
  FlaskConical,
  Zap,
  GraduationCap,
  Clock,
  Microscope,
  HeartPulse,
  Pipette,
  Stethoscope,
  Syringe,
  LucideProps,
} from "lucide-react";
import { AchievementDefinition } from "@/lib/achievements/achievement-defs";

// Map of icon names to components
const iconMap: Record<
  string,
  React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >
> = {
  Star,
  Award,
  Flame,
  Dna,
  Pill,
  FlaskConical,
  Zap,
  GraduationCap,
  Clock,
  Microscope,
  HeartPulse,
  Pipette,
  Stethoscope,
  Syringe,
};

export interface AchievementWithProgress {
  definition: AchievementDefinition;
  progress: number;
  isUnlocked: boolean;
  unlockedAt?: string;
}

// Helper function to format dates using native JS
const formatDate = (dateString: string) => {
  // Use a fixed format for server/client consistency
  const date = new Date(dateString);
  return (
    date.toISOString().split("T")[0] +
    " " +
    date.toISOString().split("T")[1].substring(0, 5)
  );
};

export default function AchievementCard({
  achievement,
}: {
  achievement: AchievementWithProgress;
}) {
  const { definition, progress, isUnlocked, unlockedAt } = achievement;
  const Icon = iconMap[definition.icon] || Award;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Card
            className={`${
              isUnlocked ? "bg-[#E63946]" : "bg-gray-400"
            } text-[#F5F5F5] hover:scale-105 transition-transform duration-200 rounded-[15px] ${
              isUnlocked ? "animate-none" : ""
            }`}
          >
            <CardContent className="p-6 flex flex-col items-center">
              <Icon className="w-16 h-16 mb-4" />
              <h3 className="text-[22px] font-medium font-['Poppins'] text-center mb-2">
                {definition.name}
              </h3>
              <Badge
                variant="outline"
                className="bg-F5F5F5/20 text-[#F5F5F5] mb-4 text-[14px] font-medium font-['Raleway']"
              >
                {isUnlocked ? "Completed" : "In Progress"}
              </Badge>
              <Progress value={progress} className="w-full bg-F5F5F5/30" />
              <p className="text-[14px] mt-2 font-['Raleway']">
                {isUnlocked
                  ? unlockedAt
                    ? formatDate(unlockedAt)
                    : "Unlocked"
                  : `${progress}% Complete`}
              </p>
            </CardContent>
          </Card>
        </TooltipTrigger>
        <TooltipContent className="font-['Raleway'] text-[14px]">
          <p>{definition.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
