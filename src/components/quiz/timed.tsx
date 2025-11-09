import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "../ui/card";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { Button } from "../ui/button";
import { Questions } from "@/lib/validation/types/quiz";
import { GameMode, GAME_MODES } from "@/lib/validation/types/gameMode";
import { Heart } from "lucide-react";

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
  gameMode: GameMode;
  lives: number;
  questionsAnswered: number;
  totalTimeRemaining: number;
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
  gameMode,
  lives,
  questionsAnswered,
  totalTimeRemaining,
}: TimedQuizProps) {
  const modeConfig = GAME_MODES[gameMode];
  const timerDuration = modeConfig.timePerQuestion || 5;
  return (
    <Card className="retro-card w-full max-w-2xl">
      <CardContent className="p-8 pt-20 flex flex-col items-center justify-between gap-4 sm:gap-8">
        {/* Header Info */}
        <div className="w-full flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-muted-foreground">
              {modeConfig.name} Mode
            </span>
            <span className="text-lg">{modeConfig.icon}</span>
          </div>
          {gameMode === "survival" && (
            <div className="flex items-center gap-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Heart
                  key={i}
                  className={`h-5 w-5 ${
                    i < lives
                      ? "fill-accent-red text-accent-red"
                      : "fill-muted text-muted"
                  }`}
                />
              ))}
            </div>
          )}
          {(gameMode === "endless" || gameMode === "survival") && (
            <div className="text-sm font-bold text-muted-foreground">
              Questions: {questionsAnswered}
            </div>
          )}
        </div>

        {/* Progress Bar - only show for modes with fixed question counts */}
        {modeConfig.questionCount !== "unlimited" && (
          <Progress
            value={progress}
            className="h-3 rounded-full bg-muted"
            indicatorClassName="bg-accent-red"
          />
        )}

        {!isQuizComplete ? (
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <CountdownCircleTimer
                key={startTimeRef.current}
                isPlaying={!isQuizComplete}
                duration={timerDuration}
                colors={["#54d548", "#F3E260", "#eb4755"]}
                colorsTime={[timerDuration, timerDuration / 2, 0]}
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
            <h2 className="text-foreground">
              {gameMode === "endless" && "Your streak is over!"}
              {gameMode === "survival" && lives === 0 && "Game Over!"}
              {gameMode !== "endless" &&
                (gameMode !== "survival" || lives > 0) &&
                "Quiz Complete!"}
            </h2>
            {(gameMode === "endless" || gameMode === "survival") && (
              <p className="text-muted-foreground">
                You answered {questionsAnswered} questions correctly!
              </p>
            )}
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
