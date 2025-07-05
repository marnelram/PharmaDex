import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

interface InstructionsProps {
  setIsGameStarted: (value: boolean) => void;
  setIsPracticeMode: (value: boolean) => void;
  startTimeRef: React.MutableRefObject<number>;
}

export default function Instructions({
  setIsGameStarted,
  setIsPracticeMode,
  startTimeRef,
}: InstructionsProps) {
  return (
    <Card className="retro-card w-full max-w-2xl">
      <CardContent className="p-4 flex flex-col items-center gap-4 sm:gap-8">
        <h2 className="text-center text-foreground">How to Play</h2>

        <div className="space-y-4 sm:space-y-6">
          <p className="text-center mx-4">
            You&apos;ll be shown a name and have 5 seconds to decide if
            it&apos;s a Drug or a Pokémon!
          </p>

          <div className="space-y-6 sm:space-y-8">
            <ul className="list-disc list-inside space-y-1 sm:space-y-2">
              <li>Quick answers earn more points (up to 1000 per question)</li>
              <li>Build streaks to multiply your score:</li>
              <li>
                Balance speed with accuracy - wrong answers reset your streak!
              </li>
            </ul>
            <div className="w-full flex justify-center p-4">
              <table className="w-full max-w-sm table-fixed border-none">
                <thead className="border-b border-border">
                  <tr className="text-left">
                    <th className="font-bold"># Correct</th>
                    <th className="font-bold">Multiplier</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="h-10">3</td>
                    <td className="text-accent-red-light tracking-wider text-outline font-bold flex items-center h-10">
                      1.5x multiplier{" "}
                      <span className="text-outline text-base ml-1">🔥</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-10">5</td>
                    <td className="text-accent-red tracking-wider text-outline flex items-center font-bold h-10">
                      2x multiplier{" "}
                      <span className="text-outline text-xl ml-1">🔥</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="h-10">10</td>
                    <td className="text-accent-red-dark tracking-wider text-outline font-bold flex items-center h-10">
                      3x multiplier{" "}
                      <span className="text-outline  text-2xl ml-1">🔥</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button
            onClick={() => {
              setIsGameStarted(true);
              startTimeRef.current = Date.now();
            }}
            variant="default"
            size="lg"
            className="hover:animate-retro-pulse"
          >
            Start Quiz
          </Button>
          <Button
            onClick={() => {
              setIsPracticeMode(true);
              setIsGameStarted(true);
              startTimeRef.current = Date.now();
            }}
            variant="secondary"
            size="lg"
            className="hover:animate-retro-pulse"
          >
            Practice
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
