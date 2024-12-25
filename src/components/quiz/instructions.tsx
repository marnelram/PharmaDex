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
    <div className="size-full bg-[#F5F5F5] flex flex-col items-center sm:p-4 gap-4">
      <h1 className="hidden sm:block text-[44px] font-bold text-center font-['Poppins']">
        Drug or Pokémon?
      </h1>
      <Card className="w-full max-w-2xl rounded-[15px] bg-[#F5F5F5] sm:bg-white shadow-none border-none sm:border sm:shadow-lg">
        <CardContent className="p-6 flex flex-col items-center gap-6 sm:gap-8">
          <h2 className="sm:text-[32px] text-[22px] font-bold font-['Poppins']">
            How to Play:
          </h2>

          <div className="space-y-4 sm:space-y-6 text-[16px] font-['Raleway']">
            <p className="text-center">
              You&apos;ll be shown a name and have 5 seconds to decide if
              it&apos;s a Drug or a Pokémon!
            </p>

            <div className="space-y-6 sm:space-y-8">
              <ul className="list-disc list-inside space-y-1 sm:space-y-2">
                <li>
                  Quick answers earn more points (up to 1000 per question)
                </li>
                <li>Build streaks to multiply your score:</li>
                <li>
                  Balance speed with accuracy - wrong answers reset your streak!
                </li>
              </ul>
              <div className="w-full flex justify-center">
                <table className="w-full max-w-sm table-fixed border-none">
                  <thead className="border-b">
                    <tr className="text-left">
                      <th># Correct</th>
                      <th>Multiplier</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="h-10">3</td>
                      <td className="text-[#eeda44] font-bold flex items-center h-10">
                        1.5x multiplier <span className="text-[16px]">🔥</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="h-10">5</td>
                      <td className="text-[#e69b39] flex items-center font-bold h-10">
                        2x multiplier <span className="text-[22px]">🔥</span>
                      </td>
                    </tr>
                    <tr>
                      <td className="h-10">10</td>
                      <td className="text-[#E63946] font-bold flex items-center h-10">
                        3x multiplier <span className="text-[32px]">🔥</span>
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
              className="bg-[#E63946] mt-2 hover:bg-[#d32d3a] py-6 sm:py-8 px-8 sm:px-12 text-[22px] font-bold font-['Poppins'] rounded-[25px] transition-transform duration-300 hover:scale-105"
            >
              Start Quiz
            </Button>
            <Button
              onClick={() => {
                setIsPracticeMode(true);
                setIsGameStarted(true);
                startTimeRef.current = Date.now();
              }}
              className="bg-gray-500 mt-2 hover:bg-gray-600 py-6 sm:py-8 px-8 sm:px-12 text-[22px] font-bold font-['Poppins'] rounded-[25px] transition-transform duration-300 hover:scale-105"
            >
              Practice
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
