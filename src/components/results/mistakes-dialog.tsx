"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Answer } from "@/generated/prisma/browser";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MistakeDialogProps {
  showModal: boolean;
  setShowModal: (open: boolean) => void;
  wrongAnswers: Answer[];
}

export function MistakeDialog({
  showModal,
  setShowModal,
  wrongAnswers,
}: MistakeDialogProps) {
  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="retro-card max-w-md max-h-[60vh] animate-retro-slide">
        <DialogHeader>
          <DialogTitle asChild>
            <h3 className="text-center animate-retro-glow">
              {wrongAnswers.length < 1
                ? "🎉 Congratulations! 🎉"
                : "Review Mistakes"}
            </h3>
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="mt-4 px-4 h-[40dvh] overflow-y-auto">
          <div className="grid gap-4">
            {wrongAnswers.length < 1 ? (
              <p className="text-center animate-retro-bounce">
                Perfect Score! 🥳🎈🎉
              </p>
            ) : (
              wrongAnswers.map((answer, i) => (
                <div key={i} className="retro-card p-4 px-6 animate-retro-fade">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <h5 className="mb-1">{answer.questionName}</h5>
                      <p className="text-sm opacity-70">
                        Actually a{" "}
                        {answer.userGuess === "Drug" ? "Pokémon" : "Drug"}
                      </p>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-sm pixel-border ${
                        answer.userGuess === "Drug"
                          ? "bg-[var(--secondary-light)] text-[var(--secondary-dark)]"
                          : "bg-[var(--accent-red-light)] text-[var(--accent-red-dark)]"
                      }`}
                    >
                      Guessed {answer.userGuess}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
