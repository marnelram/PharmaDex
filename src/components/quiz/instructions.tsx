import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { GameMode, GAME_MODES } from "@/lib/validation/types/gameMode";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

interface InstructionsProps {
  setIsGameStarted: (value: boolean) => void;
  setGameMode: (mode: GameMode) => void;
  startTimeRef: React.MutableRefObject<number>;
}

export default function Instructions({
  setIsGameStarted,
  setGameMode,
  startTimeRef,
}: InstructionsProps) {
  const [selectedMode, setSelectedMode] = useState<GameMode | null>(null);

  const handleModeSelect = (mode: GameMode) => {
    setSelectedMode(mode);
  };

  const handleStartGame = () => {
    if (selectedMode) {
      setGameMode(selectedMode);
      setIsGameStarted(true);
      startTimeRef.current = Date.now();
    }
  };

  const handleBack = () => {
    setSelectedMode(null);
  };

  // Mode selection screen
  if (!selectedMode) {
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

  // Mode details screen
  const modeConfig = GAME_MODES[selectedMode];

  return (
    <div className="w-full max-w-4xl px-4 py-6 sm:px-6 overflow-y-auto max-h-[85vh]">
      <Card className="retro-card">
        <CardContent className="p-4 sm:p-6">
          {/* Header with back button */}
          <div className="flex items-center mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <div className="flex items-center gap-3 flex-1 justify-center">
              <span className="text-4xl">{modeConfig.icon}</span>
              <h2 className="text-foreground">{modeConfig.name} Mode</h2>
            </div>
          </div>

          <p className="text-center text-muted-foreground mb-8 text-lg">
            {modeConfig.description}
          </p>

          {/* Game Rules */}
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span>📋</span> How It Works
              </h3>
              <ul className="space-y-2 text-muted-foreground">
                {modeConfig.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mode-specific details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Questions */}
              <div className="bg-secondary/40 p-4 rounded-lg pixel-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">📝</span>
                  <h4 className="font-semibold">Questions</h4>
                </div>
                <p className="text-muted-foreground">
                  {modeConfig.questionCount === "unlimited"
                    ? "Unlimited - keep going!"
                    : `${modeConfig.questionCount} questions`}
                </p>
              </div>

              {/* Timer */}
              <div className="bg-secondary/40 p-4 rounded-lg pixel-border">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xl">⏱️</span>
                  <h4 className="font-semibold">Timer</h4>
                </div>
                <p className="text-muted-foreground">
                  {modeConfig.timePerQuestion
                    ? `${modeConfig.timePerQuestion} seconds per question`
                    : modeConfig.totalTime
                    ? `${modeConfig.totalTime} seconds total`
                    : "No timer - take your time!"}
                </p>
              </div>

              {/* Lives (if applicable) */}
              {modeConfig.lives && (
                <div className="bg-secondary/40 p-4 rounded-lg pixel-border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">❤️</span>
                    <h4 className="font-semibold">Lives</h4>
                  </div>
                  <p className="text-muted-foreground">
                    You have {modeConfig.lives} lives - lose them all and
                    it&apos;s game over!
                  </p>
                </div>
              )}

              {/* Score Multiplier */}
              {modeConfig.scoreMultiplier > 0 && (
                <div className="bg-secondary/40 p-4 rounded-lg pixel-border">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xl">⭐</span>
                    <h4 className="font-semibold">Score Multiplier</h4>
                  </div>
                  <p className="text-muted-foreground">
                    {modeConfig.scoreMultiplier}x base score multiplier
                  </p>
                </div>
              )}
            </div>

            {/* Scoring explanation (only for scored modes) */}
            {modeConfig.scoreMultiplier > 0 && (
              <div className="bg-accent-red/10 border-2 border-accent-red/30 p-4 rounded-lg">
                <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                  <span>🎯</span> Scoring System
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold mb-1">
                      Base Points (per question):
                    </h4>
                    <p className="text-muted-foreground">
                      • Fastest answers (0.1s):{" "}
                      <span className="text-accent-red font-bold">
                        1,000 points
                      </span>
                      <br />• Quick answers (1-2s):{" "}
                      <span className="text-accent-red font-bold">
                        500-800 points
                      </span>
                      <br />• Normal answers (2-4s):{" "}
                      <span className="text-accent-red font-bold">
                        200-500 points
                      </span>
                      <br />• Slowest answers (4.9s+):{" "}
                      <span className="text-accent-red font-bold">
                        100 points
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Streak Multipliers:</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          3+ correct in a row:
                        </span>
                        <span className="text-accent-red-light font-bold">
                          1.5x 🔥
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          5+ correct in a row:
                        </span>
                        <span className="text-accent-red font-bold">
                          2x 🔥🔥
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">
                          10+ correct in a row:
                        </span>
                        <span className="text-accent-red-dark font-bold">
                          3x 🔥🔥🔥
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-accent-red/20">
                    <p className="text-muted-foreground">
                      <span className="font-semibold">Final Score</span> = Base
                      Points × Streak Multiplier × {modeConfig.scoreMultiplier}x
                      Mode Bonus
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Start button */}
          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleStartGame}
              variant="default"
              size="lg"
              className="text-lg px-8 py-6 animate-retro-pulse"
            >
              Start {modeConfig.name} Mode
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Bottom padding for mobile scroll */}
      <div className="h-4 sm:h-0" />
    </div>
  );
}
