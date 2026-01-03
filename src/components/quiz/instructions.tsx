import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { GameMode, GAME_MODES } from "@/lib/validation/types/gameMode";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

interface InstructionsProps {
  gameMode: GameMode;
  setIsGameStarted: (value: boolean) => void;
  startTimeRef: React.MutableRefObject<number>;
}

export default function Instructions({
  gameMode,
  setIsGameStarted,
  startTimeRef,
}: InstructionsProps) {
  const router = useRouter();
  const modeConfig = GAME_MODES[gameMode];

  const handleStartGame = () => {
    setIsGameStarted(true);
    startTimeRef.current = Date.now();
  };

  const handleBack = () => {
    router.push("/quiz");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-4 sm:px-6 sm:py-6 space-y-6">
      {/* Back Button - Fixed at top */}
      <div className="flex items-center">
        <Button
          variant="secondary"
          size="lg"
          onClick={handleBack}
          className="flex items-center gap-2 hover:scale-105 transition-all"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="font-semibold">Back to Modes</span>
        </Button>
      </div>

      {/* Header Card */}
      <Card className="retro-card">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <span className="text-6xl sm:text-7xl">{modeConfig.icon}</span>
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                {modeConfig.name}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl">
                {modeConfig.description}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <Card className="retro-card">
        <CardContent className="p-6 sm:p-8 space-y-4">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">📋</span>
            How It Works
          </h2>
          <ul className="space-y-3 text-base sm:text-lg">
            {modeConfig.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="text-primary text-xl mt-1 flex-shrink-0">
                  •
                </span>
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Game Details Section */}
      <Card className="retro-card">
        <CardContent className="p-6 sm:p-8 space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="text-3xl">⚙️</span>
            Game Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Questions */}
            <div className="bg-secondary/50 p-5 rounded-lg pixel-border space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📝</span>
                <h3 className="font-bold text-lg">Questions</h3>
              </div>
              <p className="text-muted-foreground text-base pl-9">
                {modeConfig.questionCount === "unlimited"
                  ? "Unlimited - keep going!"
                  : `${modeConfig.questionCount} questions`}
              </p>
            </div>

            {/* Timer */}
            <div className="bg-secondary/50 p-5 rounded-lg pixel-border space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⏱️</span>
                <h3 className="font-bold text-lg">Timer</h3>
              </div>
              <p className="text-muted-foreground text-base pl-9">
                {modeConfig.timePerQuestion
                  ? `${modeConfig.timePerQuestion} seconds per question`
                  : modeConfig.totalTime
                  ? `${modeConfig.totalTime} seconds total`
                  : "No timer - take your time!"}
              </p>
            </div>

            {/* Lives (if applicable) */}
            {modeConfig.lives && (
              <div className="bg-secondary/50 p-5 rounded-lg pixel-border space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">❤️</span>
                  <h3 className="font-bold text-lg">Lives</h3>
                </div>
                <p className="text-muted-foreground text-base pl-9">
                  {modeConfig.lives} lives - lose them all and it&apos;s game
                  over!
                </p>
              </div>
            )}

            {/* Score Multiplier */}
            {modeConfig.scoreMultiplier > 0 && (
              <div className="bg-secondary/50 p-5 rounded-lg pixel-border space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⭐</span>
                  <h3 className="font-bold text-lg">Score Multiplier</h3>
                </div>
                <p className="text-muted-foreground text-base pl-9">
                  {modeConfig.scoreMultiplier}x base score
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Scoring System (only for scored modes) */}
      {modeConfig.scoreMultiplier > 0 && (
        <Card className="retro-card border-2 border-accent-red/40">
          <CardContent className="p-6 sm:p-8 space-y-6 bg-accent-red/5">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="text-3xl">🎯</span>
              Scoring System
            </h2>

            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="font-bold text-lg text-foreground">
                  Base Points (per question)
                </h3>
                <div className="space-y-2 pl-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Fastest (0.1s):
                    </span>
                    <span className="text-accent-red font-bold text-lg">
                      1,000 pts
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Quick (1-2s):</span>
                    <span className="text-accent-red font-bold text-lg">
                      500-800 pts
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Normal (2-4s):
                    </span>
                    <span className="text-accent-red font-bold text-lg">
                      200-500 pts
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Slow (4.9s+):</span>
                    <span className="text-accent-red font-bold text-lg">
                      100 pts
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-lg text-foreground">
                  Streak Multipliers
                </h3>
                <div className="space-y-2 pl-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      3+ correct in a row:
                    </span>
                    <span className="text-accent-red-light font-bold text-lg">
                      1.5x 🔥
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      5+ correct in a row:
                    </span>
                    <span className="text-accent-red font-bold text-lg">
                      2x 🔥🔥
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      10+ correct in a row:
                    </span>
                    <span className="text-accent-red-dark font-bold text-lg">
                      3x 🔥🔥🔥
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t-2 border-accent-red/20">
                <p className="text-center text-base sm:text-lg font-semibold">
                  <span className="text-foreground">Final Score</span>
                  <span className="text-muted-foreground">
                    {" "}
                    = Base Points × Streak ×{" "}
                  </span>
                  <span className="text-accent-red">
                    {modeConfig.scoreMultiplier}x Mode Bonus
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Start Button - Sticky at bottom */}
      <div className="sticky bottom-0 left-0 right-0 pt-8 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 ">
        <Button
          onClick={handleStartGame}
          variant="default"
          size="lg"
          className="w-full text-xl py-6 sm:py-8 animate-retro-pulse font-bold shadow-lg"
        >
          ▶ Start {modeConfig.name} Mode ◀
        </Button>
      </div>

      {/* Bottom spacing for scroll padding */}
      <div className="h-8" />
    </div>
  );
}
