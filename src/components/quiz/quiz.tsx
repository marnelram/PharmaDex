"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { AlertCircle, Loader2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Quiz } from "@/lib/validation/types/quiz";
import TimedQuiz from "./timed";
import Instructions from "./instructions";
import PracticeQuiz from "./practice";
import { GameMode, GAME_MODES } from "@/lib/validation/types/gameMode";

export default function QuizComponent({
  quiz,
  gameMode,
}: {
  quiz: Quiz;
  gameMode: GameMode;
}) {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [totalScore, setTotalScore] = React.useState(0);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [isQuizComplete, setIsQuizComplete] = React.useState(false);
  const { toast } = useToast();
  const startTimeRef = React.useRef<number>(0);
  const [streak, setStreak] = React.useState(0);
  const [multiplier, setMultiplier] = React.useState(1);
  const [isGameStarted, setIsGameStarted] = React.useState(false);
  const [lives, setLives] = React.useState(3);
  const [questionsAnswered, setQuestionsAnswered] = React.useState(0);

  const { questions, quizId } = quiz;
  const modeConfig = GAME_MODES[gameMode];

  const handleTimeComplete = () => {
    if (!showFeedback) {
      handleAnswer(
        questions[currentQuestion].type === "Pokemon" ? "Drug" : "Pokemon"
      );
    }
  };

  // Add mutations for answer and completion
  const {
    mutate: submitAnswer,
    error: answerError,
    isError: isAnswerError,
  } = useMutation({
    mutationFn: async (data: {
      quizId: string;
      questionName: string;
      userGuess: string;
      totalScore: number;
      score: number;
      isCorrect: boolean;
    }) => {
      const response = await fetch("/api/quiz/answer", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to save answer");
      }
      return response.json();
    },
  });

  const {
    mutate: saveQuizAttempt,
    isPending: isQuizAttemptPending,
    error: quizAttemptError,
    isError: isQuizAttemptError,
  } = useMutation({
    mutationFn: async (data: {
      quizId: string;
      totalScore: number;
      gameMode: GameMode;
    }) => {
      const response = await fetch("/api/quiz/complete", {
        method: "POST",
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error("Failed to complete quiz: " + response.statusText);
      }
      return response.json();
    },
  });

  const calculateScore = (elapsedTime: number) => {
    let baseScore;
    const timeLimit = modeConfig.timePerQuestion || 5;

    // If remaining time is between 4.95 and 5 seconds (answered within first 0.05s)
    if (elapsedTime <= 0.1) {
      baseScore = 1000;
    } else if (elapsedTime >= timeLimit - 0.1) {
      baseScore = 100;
    } else {
      const x = elapsedTime;
      baseScore = Math.round(25 + 1000 * Math.exp(-0.5 * (x - 0.05)));
    }

    // Apply streak multiplier and mode multiplier
    return Math.round(baseScore * multiplier * modeConfig.scoreMultiplier);
  };

  const handleAnswer = async (answer: string) => {
    const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
    const correct = answer === questions[currentQuestion].type;
    let currentScore = 0;

    setQuestionsAnswered((prev) => prev + 1);

    if (correct) {
      // Increment streak and update multiplier
      const newStreak = streak + 1;
      setStreak(newStreak);

      // Update multiplier based on streak
      const newMultiplier = calculateMultiplier(newStreak);
      setMultiplier(newMultiplier);

      if (gameMode !== "practice") {
        currentScore = calculateScore(elapsedTime);
        setTotalScore((prev) => prev + currentScore);
      }
    } else {
      // Handle wrong answer based on game mode
      if (gameMode === "endless") {
        // Endless mode: game ends on first wrong answer
        setIsQuizComplete(true);
      } else if (gameMode === "survival") {
        // Survival mode: lose a life
        const newLives = lives - 1;
        setLives(newLives);
        if (newLives === 0) {
          setIsQuizComplete(true);
        }
      }

      // Reset streak and multiplier on wrong answer
      setStreak(0);
      setMultiplier(1);
    }

    if (gameMode === "practice") {
      setShowFeedback(true);
    } else {
      handleNextQuestion();
    }

    if (gameMode === "practice") {
      toast({
        title: correct ? "Correct! 🎉" : "Incorrect! 😅",
        variant: correct ? "success" : "destructive",
        duration: 1000,
      });
    } else {
      toast({
        title: correct ? "Correct! 🎉" : "Incorrect! 😅",
        points: correct ? currentScore : 0,
        variant: correct ? "success" : "destructive",
        duration: 1000,
      });
    }

    submitAnswer({
      quizId,
      questionName: questions[currentQuestion].name,
      userGuess: answer,
      totalScore,
      score: correct ? currentScore : 0,
      isCorrect: correct,
    });

    // Handle loading and error states
    if (isAnswerError) {
      toast({
        title: "Error saving answer",
        description: answerError?.message,
        variant: "destructive",
      });
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    startTimeRef.current = Date.now(); // Reset start time for next question
    console.log("start time: ", startTimeRef.current);

    // Check if we've reached the question limit for modes with fixed counts
    const questionLimit =
      typeof modeConfig.questionCount === "number"
        ? modeConfig.questionCount
        : questions.length;

    if (currentQuestion < questions.length - 1 && questionsAnswered < questionLimit) {
      setCurrentQuestion(currentQuestion + 1);
    } else if (
      modeConfig.questionCount === "unlimited" &&
      currentQuestion < questions.length - 1
    ) {
      // For unlimited modes, keep going through available questions
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handleQuizComplete = async () => {
    if (!quizId) {
      toast({
        title: "Error",
        description: "Quiz ID not found. Please try again.",
        variant: "destructive",
      });
      return;
    }

    saveQuizAttempt(
      {
        quizId,
        totalScore,
        gameMode,
      },
      {
        onSuccess: () => {
          if (gameMode === "practice") {
            router.push(`/practice/${quizId}`);
          } else {
            router.push(`/results/${quizId}`);
          }
        },
      }
    );
  };

  // Calculate progress based on question count or questions answered
  const getProgress = () => {
    if (modeConfig.questionCount === "unlimited") {
      return 0; // No progress bar for unlimited modes
    }
    const total =
      typeof modeConfig.questionCount === "number"
        ? modeConfig.questionCount
        : questions.length;
    return ((currentQuestion + 1) / total) * 100;
  };

  const progress = getProgress();

  // needed to calculate the streak multiplier
  const calculateMultiplier = (currentStreak: number) => {
    if (currentStreak >= 10) return 3; // 3x for 10+ streak
    if (currentStreak >= 5) return 2; // 2x for 5-9 streak
    if (currentStreak >= 3) return 1.5; // 1.5x for 3-4 streak
    return 1; // Base multiplier
  };

  if (isQuizAttemptPending) {
    return (
      <div className="flex items-center justify-center">
        <div className="text-center flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-[var(--accent-red)]" />
          <p className="text-lg font-medium">Loading quiz...</p>
        </div>
      </div>
    );
  }

  if (isQuizAttemptError) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="retro-card w-full max-w-md">
          <CardContent className="p-6 text-center flex flex-col items-center gap-4">
            <AlertCircle className="h-12 w-12 text-[var(--accent-red)]" />
            <h2>Error</h2>
            <p className="text-[var(--muted-foreground)]">
              {quizAttemptError?.message || "Failed to load quiz"}
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="default"
              className="hover:animate-retro-pulse"
            >
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Guard clause for undefined quiz items
  if (!questions || questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="retro-card w-full max-w-md">
          <CardContent className="p-6 text-center flex flex-col items-center gap-4">
            <AlertCircle className="h-12 w-12 text-[var(--accent-red)]" />
            <h2>No Questions Available</h2>
            <p className="text-[var(--muted-foreground)]">
              Please try again later
            </p>
            <Button
              onClick={() => window.location.reload()}
              variant="default"
              className="animate-retro-pulse"
            >
              Refresh
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Instructions view needs scrolling, quiz view needs centering
  if (!isGameStarted) {
    return (
      <div className="w-full h-full overflow-y-auto">
        <Instructions
          gameMode={gameMode}
          setIsGameStarted={setIsGameStarted}
          startTimeRef={startTimeRef}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center sm:p-4 gap-4">
      <h1 className="hidden sm:block text-center text-accent-red text-outline-thick animate-retro-glow">
        Drug or Pokémon?
      </h1>
      {gameMode === "practice" ? (
        <PracticeQuiz
          progress={progress}
          showFeedback={showFeedback}
          isQuizComplete={isQuizComplete}
          questions={questions}
          currentQuestion={currentQuestion}
          handleQuizComplete={handleQuizComplete}
          handleAnswer={handleAnswer}
          handleNextQuestion={handleNextQuestion}
        />
      ) : (
        <TimedQuiz
          progress={progress}
          isQuizComplete={isQuizComplete}
          handleTimeComplete={handleTimeComplete}
          streak={streak}
          questions={questions}
          currentQuestion={currentQuestion}
          startTimeRef={startTimeRef}
          handleQuizComplete={handleQuizComplete}
          handleAnswer={handleAnswer}
          gameMode={gameMode}
          lives={lives}
          questionsAnswered={questionsAnswered}
        />
      )}
    </div>
  );
}
