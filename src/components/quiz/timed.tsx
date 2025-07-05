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
    <Card className="retro-card w-full max-w-2xl">
      <CardContent className="p-8 pt-20 flex flex-col items-center justify-between gap-4 sm:gap-8">
        {/* Progress Bar */}
        <Progress
          value={progress}
          className="h-3 rounded-full bg-muted"
          indicatorClassName="bg-accent-red"
        />
        {!isQuizComplete ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <CountdownCircleTimer
                key={startTimeRef.current}
                isPlaying={!isQuizComplete}
                duration={5}
                colors={["#54d548", "#F3E260", "#eb4755"]}
                colorsTime={[5, 2.5, 0]}
                size={60}
                strokeWidth={10}
                trailColor="#9ca3af"
                onComplete={handleTimeComplete}
                updateInterval={0.05}
              />
              <div className="absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 flex items-center">
                {streak >= 3 && streak < 5 && (
                  <p className="text-base font-bold animate-retro-glow text-outline">
                    🔥
                  </p>
                )}
                {streak >= 5 && streak < 10 && (
                  <p className="text-xl font-bold animate-retro-glow text-outline">
                    🔥
                  </p>
                )}
                {streak >= 10 && (
                  <p className="text-2xl font-bold animate-retro-glow text-outline">
                    🔥
                  </p>
                )}
              </div>
            </div>
            <div className="text-center flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-foreground">
                  {questions[currentQuestion]?.name}
                </h2>
              </div>
            </div>
            <div className="w-40 h-40 mx-auto bg-muted rounded-full flex items-center justify-center pixel-border">
              <span className="text-4xl text-muted-foreground">?</span>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <Button
                onClick={() => handleAnswer("Drug")}
                variant="default"
                size="lg"
                className="sm:hover:animate-retro-pulse"
              >
                Drug
              </Button>
              <Button
                onClick={() => handleAnswer("Pokemon")}
                variant="default"
                size="lg"
                className="sm:hover:animate-retro-pulse"
              >
                Pokémon
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center flex flex-col gap-6">
            <h2 className="text-foreground">Quiz Complete!</h2>
            <Button
              onClick={handleQuizComplete}
              variant="default"
              size="lg"
              className="animate-retro-pulse"
            >
              See Results
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
