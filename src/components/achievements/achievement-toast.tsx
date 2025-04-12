import React, { useEffect } from "react";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
} from "@/components/ui/toast";
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

interface AchievementToastProps {
  achievement: AchievementDefinition;
  onClose?: () => void;
}

export function AchievementToast({
  achievement,
  onClose,
}: AchievementToastProps) {
  useEffect(() => {
    // Trigger confetti effect when the toast appears
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#E63946", "#F3E260"],
    });
  }, []);

  // Get the icon component based on the icon name
  const IconComponent =
    achievement.icon && iconMap[achievement.icon as keyof typeof iconMap]
      ? iconMap[achievement.icon as keyof typeof iconMap]
      : Award;

  return (
    <Toast className="bg-[#E63946] text-[#F5F5F5] border-none">
      <div className="flex items-center gap-3">
        <div className="bg-[#F5F5F5] text-[#E63946] rounded-full p-2">
          <IconComponent className="h-8 w-8" />
        </div>
        <div className="grid gap-1">
          <ToastTitle className="font-['Poppins'] font-bold">
            Achievement Unlocked!
          </ToastTitle>
          <ToastDescription className="font-['Raleway']">
            <span className="font-medium">{achievement.name}</span> -{" "}
            {achievement.description}
          </ToastDescription>
        </div>
      </div>
      <ToastClose onClick={onClose} />
    </Toast>
  );
}

interface AchievementToastManagerProps {
  achievements: AchievementDefinition[];
  onComplete?: () => void;
}

export function AchievementToastManager({
  achievements,
  onComplete,
}: AchievementToastManagerProps) {
  const { toast } = useToast();
  const [queue, setQueue] = React.useState<AchievementDefinition[]>([]);
  const [isShowing, setIsShowing] = React.useState(false);

  // Initialize the queue when achievements change
  useEffect(() => {
    if (achievements.length > 0 && queue.length === 0 && !isShowing) {
      setQueue([...achievements]);
    }
  }, [achievements, queue, isShowing]);

  // Process the queue
  useEffect(() => {
    if (queue.length > 0 && !isShowing) {
      setIsShowing(true);

      // Show toast for the first achievement in the queue
      const currentAchievement = queue[0];

      toast({
        duration: 5000,
      });
    } else if (queue.length === 0 && !isShowing && onComplete) {
      // Call onComplete when all toasts have been shown
      onComplete();
    }
  }, [queue, isShowing, toast, onComplete]);

  return null;
}

// Custom hook for showing achievement toasts
export function useAchievementToast() {
  const { toast } = useToast();

  const showAchievementToast = React.useCallback(
    (achievement: AchievementDefinition) => {
      toast({
        duration: 5000,
      });

      // Trigger confetti effect
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#E63946", "#F3E260"],
      });
    },
    [toast]
  );

  return { showAchievementToast };
}
