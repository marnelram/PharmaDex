"use client";

import { Button } from "@/components/ui/button";
import { GameMode, GAME_MODES } from "@/lib/validation/types/gameMode";
import { useRouter } from "next/navigation";

export default function GameModeSelection() {
  const router = useRouter();

  const handleModeSelect = (mode: GameMode) => {
    router.push(`/quiz/${mode}`);
  };

  const classicMode = GAME_MODES.classic;
  const otherModes = (Object.keys(GAME_MODES) as GameMode[]).filter(
    (key) => key !== "classic"
  );

  return (
    <div className="w-full max-w-2xl px-4 py-6 sm:px-6 sm:py-8 space-y-8 overflow-y-auto max-h-[85vh]">
      {/* Title with background for better readability */}
      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-4 sm:p-6 border-2 border-white/20">
        <h2 className="text-center text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] text-2xl sm:text-3xl font-bold">
          Select Game Mode
        </h2>
      </div>

      {/* Classic Mode - Centered on top */}
      <div className="flex justify-center px-2">
        <Button
          variant="default"
          size="lg"
          className="h-16 sm:h-20 px-6 sm:px-8 flex items-center gap-3 sm:gap-4 hover:scale-105 transition-all hover:animate-retro-pulse w-full sm:w-auto"
          onClick={() => handleModeSelect(classicMode.id)}
        >
          <span className="text-3xl sm:text-4xl">{classicMode.icon}</span>
          <span className="font-bold text-lg sm:text-xl">
            {classicMode.name}
          </span>
        </Button>
      </div>

      {/* Other Modes - 2 columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 px-2">
        {otherModes.map((modeKey) => {
          const mode = GAME_MODES[modeKey];
          return (
            <Button
              key={mode.id}
              variant="secondary"
              size="lg"
              className="h-16 sm:h-18 flex items-center justify-center gap-3 hover:scale-105 transition-all hover:animate-retro-pulse"
              onClick={() => handleModeSelect(mode.id)}
            >
              <span className="text-2xl sm:text-3xl">{mode.icon}</span>
              <span className="font-bold text-base sm:text-lg">
                {mode.name}
              </span>
            </Button>
          );
        })}
      </div>

      {/* Bottom padding for mobile scroll */}
      <div className="h-4 sm:h-0" />
    </div>
  );
}
