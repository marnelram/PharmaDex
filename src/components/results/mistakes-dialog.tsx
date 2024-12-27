"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Answer } from "@prisma/client";

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
      <DialogContent className="max-w-md max-h-[60vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-[22px] font-['Poppins'] font-bold">
            {wrongAnswers.length < 1 ? "Congratulations!" : "Review Mistakes"}
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 mt-4">
          {wrongAnswers.length < 1 ? (
            <p className="text-center text-gray-500 text-bold font-['Raleway']">
              Perfect Score! 🥳🎈🎉
            </p>
          ) : (
            wrongAnswers.map((answer, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
              >
                <div className="flex flex-col">
                  <span className="font-['Poppins'] font-medium">
                    {answer.questionName}
                  </span>
                  <span className="text-sm text-gray-500 font-['Raleway']">
                    Actually a{" "}
                    {answer.userGuess === "Drug" ? "Pokémon" : "Drug"}
                  </span>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-sm font-['Raleway'] ${
                    answer.userGuess === "Drug"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  Guessed {answer.userGuess}
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
