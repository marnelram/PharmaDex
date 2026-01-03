"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface LeaderboardDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  topAttempts: Array<{
    id: string;
    totalScore: number;
    displayName?: string | null;
    user?: { name: string | null } | null;
  }>;
  currentAttemptId: string;
}

export function LeaderboardDialog({
  open,
  onOpenChange,
  topAttempts,
  currentAttemptId,
}: LeaderboardDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="retro-card max-w-md max-h-[70vh] animate-retro-slide">
        <DialogHeader>
          <DialogTitle asChild>
            <h3 className="text-center animate-retro-glow">
              Top Scores
            </h3>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 px-2 h-[50dvh] overflow-y-auto">
          <div className="space-y-2">
            {topAttempts.map((attempt, index) => {
              // Show only first 10 and last 3 entries
              if (index < 10 || index >= topAttempts.length - 3) {
                return (
                  <div
                    key={attempt.id}
                    className={cn(
                      "flex items-center justify-between p-3 rounded-lg hover:bg-secondary/20 px-4 transition-colors duration-200",
                      attempt.id === currentAttemptId &&
                        "bg-accent-red-light hover:bg-accent-red-light/80"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-medium w-8">
                        {index + 1 <= 3 ? (
                          <span className="text-lg">
                            {index + 1 === 1 ? "🥇" : index + 1 === 2 ? "🥈" : "🥉"}
                          </span>
                        ) : (
                          `#${index + 1}`
                        )}
                      </span>
                      <span>
                        {attempt.displayName ||
                          attempt.user?.name ||
                          "Anonymous"}
                      </span>
                    </div>
                    <span className="font-bold">
                      {attempt.totalScore.toLocaleString()}
                    </span>
                  </div>
                );
              } else if (index === 10) {
                // Add ellipsis between top 10 and bottom 3
                return (
                  <div
                    key="ellipsis"
                    className="text-center py-2 text-foreground/60"
                  >
                    ...
                  </div>
                );
              }
              return null;
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
