"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GameMode, GAME_MODES } from "@/lib/validation/types/gameMode";
import { useRouter } from "next/navigation";

export default function GameModeSelection() {
  const router = useRouter();

  const handleModeSelect = (mode: GameMode) => {
    router.push(`/quiz/${mode}`);
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <Card className="retro-card">
        <CardContent className="p-6">
          <h1 className="text-center text-foreground mb-4">Select Game Mode</h1>
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
