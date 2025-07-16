"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2 } from "lucide-react";

interface DisplayNameDialogProps {
  quizAttemptId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function DisplayNameDialog({
  quizAttemptId,
  open,
  onOpenChange,
  onSuccess,
}: DisplayNameDialogProps) {
  const [displayName, setDisplayName] = useState("");

  const { mutate, isPending, isError } = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/quiz-attempts/display-name", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          quizAttemptId,
          displayName,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update display name");
      }

      return response.json();
    },
    onSuccess: () => {
      onOpenChange(false);
      onSuccess?.();
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="retro-card sm:max-w-md animate-retro-slide">
        <DialogHeader>
          <DialogTitle asChild>
            <h3 className="text-center animate-retro-glow">
              Add Your Name to the Leaderboard
            </h3>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Enter your display name"
            maxLength={15}
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="pixel-border"
          />

          {isError && (
            <p className="text-accent-red text-sm animate-retro-shake">
              Failed to update display name. Please try again.
            </p>
          )}

          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              <p className="text-foreground">Cancel</p>
            </Button>
            <Button
              onClick={() => mutate()}
              disabled={!displayName.trim() || isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Name"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
