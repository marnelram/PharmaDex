import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { DosageFormIcon } from "@/lib/utils/dosage-form";
import { DosageForm } from "@/generated/prisma/browser";
import { Questions } from "@/lib/validation/types/quiz";

interface PracticeQuizProps {
  progress: number;
  showFeedback: boolean;
  isQuizComplete: boolean;
  questions: Questions;
  currentQuestion: number;
  handleQuizComplete: () => void;
  handleAnswer: (answer: string) => void;
  handleNextQuestion: () => void;
}

export default function PracticeQuiz({
  progress,
  showFeedback,
  isQuizComplete,
  questions,
  currentQuestion,
  handleQuizComplete,
  handleAnswer,
  handleNextQuestion,
}: PracticeQuizProps) {
  return (
    <Card className="retro-card w-full max-w-2xl">
      <CardContent className="p-8 flex flex-col items-center justify-between gap-4 sm:gap-8">
        {/* Progress Bar */}
        <Progress
          value={progress}
          className="h-3 rounded-full bg-muted"
          indicatorClassName="bg-accent-red"
        />
        {isQuizComplete ? (
          <div className="text-center flex flex-col gap-6">
            <h2 className="text-foreground">Quiz Complete!</h2>
            <Button
              onClick={handleQuizComplete}
              variant="default"
              size="lg"
              className="hover:animate-retro-pulse"
            >
              See Results
            </Button>
          </div>
        ) : (
          <>
            {/* Question */}
            <div className="text-center flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-foreground">
                  {questions[currentQuestion]?.name}
                </h2>
                {showFeedback && (
                  <p className="text-muted-foreground">
                    {questions[currentQuestion]?.description}
                  </p>
                )}
              </div>
              <div className="w-40 h-40 mx-auto bg-muted rounded-full flex items-center justify-center pixel-border">
                {showFeedback ? (
                  <>
                    {questions[currentQuestion]?.type === "Pokemon" && (
                      <Image
                        src={questions[currentQuestion]?.image as string}
                        alt={questions[currentQuestion]?.name}
                        className="w-full h-full object-contain pixel-perfect"
                        width={100}
                        height={100}
                      />
                    )}
                    {questions[currentQuestion]?.type === "Drug" && (
                      <DosageFormIcon
                        className="w-full h-full object-contain p-8"
                        form={
                          questions[currentQuestion]?.dosageForm as DosageForm
                        }
                      />
                    )}
                  </>
                ) : (
                  <span className="text-4xl text-muted-foreground">?</span>
                )}
              </div>
            </div>

            {!showFeedback && (
              <div className="grid grid-cols-2 gap-6">
                <Button
                  onClick={() => handleAnswer("Drug")}
                  variant="default"
                  size="lg"
                  className="sm:hover:animate-retro-pulse"
                  disabled={showFeedback}
                >
                  Drug
                </Button>
                <Button
                  onClick={() => handleAnswer("Pokemon")}
                  variant="default"
                  size="lg"
                  className="sm:hover:animate-retro-pulse"
                  disabled={showFeedback}
                >
                  Pokémon
                </Button>
              </div>
            )}

            {showFeedback && (
              <Button
                onClick={handleNextQuestion}
                variant="default"
                size="lg"
                className="hover:animate-retro-pulse"
              >
                Next Question
              </Button>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
