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
  DialogDescription,
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-[22px] font-['Poppins'] font-bold">
            Add Your Name to the Leaderboard
          </DialogTitle>
          <DialogDescription className="font-['Raleway']">
            Enter a name to show on the leaderboard!! 🎉🎈
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <Input
            placeholder="Enter your display name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="font-['Raleway']"
          />

          {isError && (
            <p className="text-[#E63946] text-sm font-['Raleway']">
              Failed to update display name. Please try again.
            </p>
          )}

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="font-['Raleway']"
            >
              Cancel
            </Button>
            <Button
              onClick={() => mutate()}
              disabled={!displayName.trim() || isPending}
              className="bg-[#E63946] hover:bg-[#d62f3c] font-['Raleway']"
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
