import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { GameMode, GAME_MODES } from "@/lib/validation/types/gameMode";

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
  const handleModeSelect = (mode: GameMode) => {
    setGameMode(mode);
    setIsGameStarted(true);
    startTimeRef.current = Date.now();
  };

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
                    <ul className="space-y-1 text-xs">
                      {mode.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span className="text-muted-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 text-center">
                      <Button
                        variant={mode.id === "classic" ? "default" : "secondary"}
                        size="sm"
                        className="w-full hover:animate-retro-pulse"
                      >
                        Play {mode.name}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card className="retro-card">
        <CardContent className="p-4">
          <h3 className="text-center font-bold mb-4">How Scoring Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-sm">Speed Bonus</h4>
              <p className="text-xs text-muted-foreground">
                Faster answers earn more points (up to 1000 per question).
                Wrong answers reset your streak!
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-sm">Streak Multipliers</h4>
              <div className="space-y-1 text-xs">
                <div className="flex justify-between items-center">
                  <span>3+ correct:</span>
                  <span className="text-accent-red-light font-bold">
                    1.5x 🔥
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>5+ correct:</span>
                  <span className="text-accent-red font-bold">2x 🔥🔥</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>10+ correct:</span>
                  <span className="text-accent-red-dark font-bold">
                    3x 🔥🔥🔥
                  </span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
