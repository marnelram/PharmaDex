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
    return (
      <div className="w-full max-w-6xl space-y-8">
        <Card className="retro-card">
          <CardContent className="p-6">
            <h2 className="text-center text-foreground mb-4">Select Game Mode</h2>
            <p className="text-center text-muted-foreground mb-8">
              Choose your challenge and see if you can tell Drugs from Pokémon!
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(Object.keys(GAME_MODES) as GameMode[]).map((modeKey) => {
                const mode = GAME_MODES[modeKey];
                return (
                  <Card
                    key={mode.id}
                    className="retro-card hover:scale-105 transition-transform cursor-pointer border-2 hover:border-primary"
                    onClick={() => handleModeSelect(mode.id)}
                  >
                    <CardContent className="p-4">
                      <div className="text-center mb-3">
                        <div className="text-4xl mb-2">{mode.icon}</div>
                        <h3 className="font-bold text-lg text-foreground">
                          {mode.name}
                        </h3>
                      </div>
                      <p className="text-sm text-muted-foreground text-center mb-4">
                        {mode.description}
                      </p>
                      <div className="mt-4 text-center">
                        <Button
                          variant={mode.id === "classic" ? "default" : "secondary"}
                          size="sm"
                          className="w-full hover:animate-retro-pulse"
                        >
                          Select {mode.name}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mode details screen
  const modeConfig = GAME_MODES[selectedMode];

  return (
    <div className="w-full max-w-4xl space-y-6">
      <Card className="retro-card">
        <CardContent className="p-6">
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
                    You have {modeConfig.lives} lives - lose them all and it&apos;s game over!
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
                    <h4 className="font-semibold mb-1">Base Points (per question):</h4>
                    <p className="text-muted-foreground">
                      • Fastest answers (0.1s): <span className="text-accent-red font-bold">1,000 points</span>
                      <br />
                      • Quick answers (1-2s): <span className="text-accent-red font-bold">500-800 points</span>
                      <br />
                      • Normal answers (2-4s): <span className="text-accent-red font-bold">200-500 points</span>
                      <br />
                      • Slowest answers (4.9s+): <span className="text-accent-red font-bold">100 points</span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Streak Multipliers:</h4>
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">3+ correct in a row:</span>
                        <span className="text-accent-red-light font-bold">1.5x 🔥</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">5+ correct in a row:</span>
                        <span className="text-accent-red font-bold">2x 🔥🔥</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">10+ correct in a row:</span>
                        <span className="text-accent-red-dark font-bold">3x 🔥🔥🔥</span>
                      </div>
                    </div>
                  </div>
                  <div className="pt-2 border-t border-accent-red/20">
                    <p className="text-muted-foreground">
                      <span className="font-semibold">Final Score</span> = Base Points × Streak Multiplier × {modeConfig.scoreMultiplier}x Mode Bonus
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
    </div>
  );
}
