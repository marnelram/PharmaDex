import { Progress } from "@/components/ui/progress";
import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { DosageFormIcon } from "@/lib/utils/dosage-form";
import { DosageForm } from "@prisma/client";
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
    <div className="size-full backdrop-blur-sm flex flex-col items-center sm:p-4 gap-4">
      {/* Title */}
      <h1 className="hidden sm:block text-[44px] font-bold text-center font-['Poppins']">
        Drug or Pokémon?
      </h1>
      <Card className="w-full max-w-2xl rounded-[15px] bg-[#F5F5F5]/80 backdrop-blur-sm shadow-none border-none sm:border sm:shadow-lg">
        <CardContent className="p-8 flex h-[80dvh] sm:h-auto flex-col items-center justify-between gap-4 sm:gap-8">
          {/* Progress Bar */}
          <Progress
            value={progress}
            className="h-3 rounded-full bg-[#9E9E9E]/40"
            indicatorClassName="bg-[#E63946]"
          />
          {isQuizComplete ? (
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
          ) : (
            <>
              {/* Question */}
              <div className="text-center flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <h2 className="text-[32px] font-bold font-['Poppins']">
                    {questions[currentQuestion]?.name}
                  </h2>
                  {showFeedback && (
                    <p className="text-[16px] text-[#5d5d5d] font-['Raleway']">
                      {questions[currentQuestion]?.description}
                    </p>
                  )}
                </div>
                <div className="w-40 h-40 mx-auto bg-[#9E9E9E]/10 rounded-full flex items-center justify-center">
                  {showFeedback ? (
                    <>
                      {questions[currentQuestion]?.type === "Pokemon" && (
                        <Image
                          src={questions[currentQuestion]?.image as string}
                          alt={questions[currentQuestion]?.name}
                          className="w-full h-full object-contain"
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
                    <span className="text-[44px] text-[#9E9E9E]">?</span>
                  )}
                </div>
              </div>

              {!showFeedback && (
                <div className="grid grid-cols-2 gap-6">
                  <Button
                    onClick={() => handleAnswer("Drug")}
                    className="py-8 text-[22px] font-bold font-['Poppins'] bg-[#E63946] hover:bg-[#d32d3a] rounded-[25px] transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    disabled={showFeedback}
                  >
                    Drug
                  </Button>
                  <Button
                    onClick={() => handleAnswer("Pokemon")}
                    className="py-8 text-[22px] font-bold font-['Poppins'] bg-[#E63946] hover:bg-[#d32d3a] rounded-[25px] transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                    disabled={showFeedback}
                  >
                    Pokémon
                  </Button>
                </div>
              )}

              {showFeedback && (
                <Button
                  onClick={handleNextQuestion}
                  className="bg-[#E63946] hover:bg-[#d32d3a] mx-4 rounded-[25px] transition-transform duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
                >
                  Next Question
                </Button>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
