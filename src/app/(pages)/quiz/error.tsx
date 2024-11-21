"use client"; // Error components must be Client components

import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function QuizError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center">
      <Card className="w-full max-w-md rounded-[15px]">
        <CardContent className="p-6 text-center font-['Raleway'] flex flex-col items-center gap-4">
          <AlertCircle className="h-12 w-12 text-[#E63946]" />
          <h2 className="text-[22px] font-medium">Error</h2>
          <p className="text-[#9E9E9E]">
            {error?.message || "Failed to load quiz"}
          </p>
          <Button
            onClick={() => reset()}
            className="bg-[#E63946] hover:bg-[#d32d3a] rounded-[25px] transition-all duration-300"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
