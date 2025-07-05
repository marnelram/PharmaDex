import { Button } from "@/components/ui/button";
import { ClipboardList } from "lucide-react";

interface PokeballPercentageProps {
  correctCount: number;
  totalQuestions: number;
  percentage: number;
  onMistakesClick: () => void;
}

export function PokeballPercentage({
  correctCount,
  totalQuestions,
  percentage,
  onMistakesClick,
}: PokeballPercentageProps) {
  return (
    <div className="relative size-44 sm:size-56">
      {/* Circle percentage */}
      <div className="relative size-44 sm:size-56">
        {/* Grade percentage */}
        <div className="absolute z-20 top-0 right-0 bg-white/80 backdrop-blur-sm rounded-full size-14 border-2 border-accent-red flex items-center justify-center shadow-md">
          <span className="font-bold text-accent-red">{percentage}%</span>
        </div>

        <div className="absolute inset-0 rounded-full border-8 border-accent-red overflow-hidden">
          <div
            className="absolute bottom-0 w-full bg-accent-red transition-all duration-1000"
            style={{ height: `${percentage}%` }}
          />
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="font-bold">
            {/* Diagonal fraction */}
            <div className="flex flex-col items-start gap-2">
              <h3 className="w-full text-center font-bold">{correctCount}</h3>
              <div className="h-[4px] w-16 text-black bg-black" />
              <h3 className="w-full text-center font-bold">{totalQuestions}</h3>
            </div>
          </h1>
        </div>

        <Button
          variant="none"
          className="absolute -right-12 top-1/2 -translate-y-1/2 p-2 rounded-full z-30 bg-white border-2 border-accent-red hover:bg-primary hover:text-white"
          onClick={onMistakesClick}
        >
          <ClipboardList className="size-16 text-accent-red" />
        </Button>
      </div>
    </div>
  );
}
