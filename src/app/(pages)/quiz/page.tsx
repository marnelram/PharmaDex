import GameModeSelection from "@/components/quiz/game-mode-selection";

export default function QuizSelectionPage() {
  return (
    <div className="w-full min-h-[calc(100dvh-92px)] flex flex-col items-center justify-center mx-auto">
      <GameModeSelection />
    </div>
  );
}
