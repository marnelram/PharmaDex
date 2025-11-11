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
    <div className="min-h-screen bg-muted/80 backdrop-blur-sm flex items-center justify-center">
      <Card className="w-full max-w-md rounded-lg">
        <CardContent className="p-6 text-center flex flex-col items-center gap-4">
          <AlertCircle className="h-12 w-12 text-accent-red" />
          <h2 className="font-medium">Error</h2>
          <p className="text-muted-foreground">
            {error?.message || "Failed to load quiz"}
          </p>
          <Button
            onClick={() => reset()}
            className="bg-accent-red hover:bg-accent-red-dark rounded-lg transition-all duration-300"
          >
            Try Again
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
