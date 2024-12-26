import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "../ui/card";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button } from "../ui/button";
import { Questions } from "@/lib/validation/types/quiz";

interface TimedQuizProps {
  progress: number;
  isQuizComplete: boolean;
  handleTimeComplete: () => void;
  streak: number;
  questions: Questions;
  currentQuestion: number;
  startTimeRef: React.MutableRefObject<number>;
  handleQuizComplete: () => void;
  handleAnswer: (answer: string) => void;
}

export default function TimedQuiz({
  progress,
  isQuizComplete,
  handleTimeComplete,
  streak,
  questions,
  currentQuestion,
  startTimeRef,
  handleQuizComplete,
  handleAnswer,
}: TimedQuizProps) {
  return (
    <div className="size-full bg-[#F5F5F5] flex flex-col items-center sm:p-4 gap-4">
      {/* Title */}
      <h1 className="hidden sm:block text-[44px] font-bold text-center font-['Poppins']">
        Drug or Pokémon?
      </h1>
      <Card className="w-full max-w-2xl rounded-[15px] bg-[#F5F5F5] sm:bg-white shadow-none border-none sm:border sm:shadow-lg">
        <CardContent className="p-8 flex h-[80dvh] sm:h-auto flex-col items-center justify-between gap-4 sm:gap-8">
          {/* Progress Bar */}
          <Progress
            value={progress}
            className="h-3 rounded-full bg-[#9E9E9E]/20"
            indicatorClassName="bg-[#E63946]"
          />
          {!isQuizComplete ? (
            <div className="flex flex-col items-center gap-4">
              <div className="relative">
                <CountdownCircleTimer
                  key={startTimeRef.current}
                  isPlaying={!isQuizComplete}
                  duration={5}
                  colors={["#54d548", "#F3E260", "#E63946"]}
                  colorsTime={[5, 2.5, 0]}
                  size={60}
                  strokeWidth={6}
                  trailColor="#9E9E9E20"
                  onComplete={handleTimeComplete}
                  updateInterval={0.05}
                />
                <div className="absolute top-1/2 left-20 -translate-y-1/2 flex items-center">
                  {streak >= 3 && streak < 5 && (
                    <p className="text-[16px] font-bold">🔥</p>
                  )}
                  {streak >= 5 && streak < 10 && (
                    <p className="text-[22px] font-bold">🔥</p>
                  )}
                  {streak >= 10 && <p className="text-[32px] font-bold">🔥</p>}
                </div>
              </div>
              <div className="text-center flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-[32px] font-bold font-['Poppins']">
                    {questions[currentQuestion]?.name}
                  </h2>
                </div>
              </div>
              <div className="w-40 h-40 mx-auto bg-[#9E9E9E]/10 rounded-full flex items-center justify-center">
                <span className="text-[44px] text-[#9E9E9E]">?</span>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <Button
                  onClick={() => handleAnswer("Drug")}
                  className="py-8 text-[22px] font-bold font-['Poppins'] bg-[#E63946] hover:bg-[#d32d3a] rounded-[25px] transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  Drug
                </Button>
                <Button
                  onClick={() => handleAnswer("Pokemon")}
                  className="py-8 text-[22px] font-bold font-['Poppins'] bg-[#E63946] hover:bg-[#d32d3a] rounded-[25px] transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  Pokémon
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center flex flex-col gap-6">
              <h2 className="text-[32px] font-bold font-['Poppins']">
                Quiz Complete!
              </h2>
              <Button
                onClick={handleQuizComplete}
                className="bg-[#E63946] hover:bg-[#d32d3a] py-8 text-[22px] font-bold font-['Poppins'] rounded-[25px] transition-transform duration-300 hover:scale-105"
              >
                See Results
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
