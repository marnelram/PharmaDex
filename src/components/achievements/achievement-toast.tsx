import React from "react";
import { useToast } from "@/hooks/use-toast";
import { AchievementDefinition } from "@/lib/achievements/achievement-defs";
import {
  Award,
  Flame,
  Trophy,
  Medal,
  Star,
  Pill,
  Dna,
  FlaskConical,
  Zap,
  GraduationCap,
  Clock,
} from "lucide-react";
import confetti from "canvas-confetti";

// Map of icon names to components
const iconMap = {
  Star,
  Trophy,
  Medal,
  Award,
  Clock,
  Flame,
  Dna,
  Pill,
  FlaskConical,
  Zap,
  GraduationCap,
};

/**
 * Custom hook for showing achievement toasts
 */
export function useAchievementToast() {
  const { toast } = useToast();

  const showAchievementToast = React.useCallback(
    (achievement: AchievementDefinition) => {
      // Get the icon component based on the icon name
      const IconComponent =
        achievement.icon && iconMap[achievement.icon as keyof typeof iconMap]
          ? iconMap[achievement.icon as keyof typeof iconMap]
          : Award;

      // Trigger confetti effect when the toast appears
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E63946", "#F3E260"],
      });

      // Display the toast
      toast({
        title: "Achievement Unlocked!",
        description: (
          <div className="flex items-center gap-3">
            <div className="bg-[#F5F5F5] text-[#E63946] rounded-full p-2 flex-shrink-0">
              <IconComponent className="h-8 w-8" />
            </div>
            <div>
              <span className="font-medium">{achievement.name}</span> -{" "}
              {achievement.description}
            </div>
          </div>
        ),
        variant: "default",
        className: "bg-[#E63946] text-[#F5F5F5] border-none",
        duration: 5000,
      });
    },
    [toast]
  );

  return { showAchievementToast };
}

interface AchievementToastManagerProps {
  achievements: AchievementDefinition[];
  onComplete?: () => void;
}

/**
 * Component to manage showing multiple achievement toasts in sequence
 */
export function AchievementToastManager({
  achievements,
  onComplete,
}: AchievementToastManagerProps) {
  const { showAchievementToast } = useAchievementToast();
  const [queue, setQueue] = React.useState<AchievementDefinition[]>([]);
  const [isShowing, setIsShowing] = React.useState(false);

  // Initialize the queue when achievements change
  React.useEffect(() => {
    if (achievements.length > 0 && queue.length === 0 && !isShowing) {
      setQueue([...achievements]);
    }
  }, [achievements, queue, isShowing]);

  // Process the queue
  React.useEffect(() => {
    if (queue.length > 0 && !isShowing) {
      setIsShowing(true);

      // Show toast for the first achievement in the queue
      const currentAchievement = queue[0];
      showAchievementToast(currentAchievement);

      // Remove the shown achievement from queue
      const timeoutId = setTimeout(() => {
        setQueue((prevQueue) => prevQueue.slice(1));
        setIsShowing(false);
      }, 5000); // Match toast duration

      return () => clearTimeout(timeoutId);
    } else if (queue.length === 0 && !isShowing && onComplete) {
      // Call onComplete when all toasts have been shown
      onComplete();
    }
  }, [queue, isShowing, showAchievementToast, onComplete]);

  return null;
}
