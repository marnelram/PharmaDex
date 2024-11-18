"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";
import { useSession } from "next-auth/react";

// Add new types
type QuizItem = {
  id: string;
  name: string;
  type: "Drug" | "Pokemon";
  description: string;
  facts: {
    title: string;
    content: string;
  }[];
};

export default function QuizPage() {
  const { data: session } = useSession();
  const [quizData, setQuizData] = React.useState<QuizItem[]>([]);
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [showFeedback, setShowFeedback] = React.useState(false);
  const [isCorrect, setIsCorrect] = React.useState(false);
  const [currentFact, setCurrentFact] = React.useState<string>("");

  // Fetch quiz data on component mount
  React.useEffect(() => {
    const fetchQuizData = async () => {
      const response = await fetch('/api/quiz/questions');
      const data = await response.json();
      setQuizData(data);
    };
    fetchQuizData();
  }, []);

  const handleAnswer = async (answer: string) => {
    const correct = answer === quizData[currentQuestion].type;
    setIsCorrect(correct);
    setShowFeedback(true);

    // Set a random fact for feedback
    const facts = quizData[currentQuestion].facts;
    if (facts.length > 0) {
      const randomFact = facts[Math.floor(Math.random() * facts.length)];
      setCurrentFact(randomFact.content);
    }

    if (correct) {
      setScore(score + 1);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    // Save answer to database if user is logged in
    if (session?.user) {
      await fetch('/api/quiz/answer', {
        method: 'POST',
        body: JSON.stringify({
          userId: session.user.id,
          questionName: quizData[currentQuestion].name,
          userGuess: answer,
          isCorrect: correct,
          score: score + (correct ? 1 : 0),
        }),
      });
    }

    setTimeout(() => {
      setShowFeedback(false);
      setCurrentFact("");
      if (currentQuestion < quizData.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Handle quiz completion
        handleQuizComplete();
      }
    }, 2000);
  };

  const handleQuizComplete = async () => {
    if (session?.user) {
      // Update user score and check for achievements
      await fetch('/api/quiz/complete', {
        method: 'POST',
        body: JSON.stringify({
          userId: session.user.id,
          finalScore: score,
        }),
      });
    }
    // Redirect to results page or show completion modal
  };

  const progress = ((currentQuestion + 1) / quizData.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-100 to-green-100 flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-2xl">
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold text-center mb-6 font-['Poppins']">
            Drug or Pokémon?
          </h1>

          <Progress value={progress} className="mb-6" />

          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              {quizData[currentQuestion]?.name}
            </h2>
            <p className="text-gray-600 mb-4">
              {quizData[currentQuestion]?.description}
            </p>
            <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4 flex items-center justify-center">
              <span className="text-4xl">?</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={() => handleAnswer("Drug")}
              className="py-8 text-xl font-semibold bg-blue-500 hover:bg-blue-600"
              disabled={showFeedback}
            >
              Drug
            </Button>
            <Button
              onClick={() => handleAnswer("Pokemon")}
              className="py-8 text-xl font-semibold bg-red-500 hover:bg-red-600"
              disabled={showFeedback}
            >
              Pokémon
            </Button>
          </div>
          <div className="mt-6 text-center">
            <p className="text-lg font-semibold">
              Score: {score} / {quizData.length}
            </p>
          </div>
        </CardContent>
      </Card>
      {showFeedback && (
        <div
          className={`mt-6 p-4 rounded-lg absolute bottom-24 ${
            isCorrect ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <div className="flex flex-col items-center">
            {isCorrect ? (
              <div className="flex items-center">
                <CheckCircle2 className="w-6 h-6 text-green-500 mr-2" />
                <p className="text-green-700">Correct! Great job!</p>
              </div>
            ) : (
              <div className="flex items-center">
                <AlertCircle className="w-6 h-6 text-red-500 mr-2" />
                <p className="text-red-700">
                  Oops! That&apos;s not right. Keep trying!
                </p>
              </div>
            )}
            {currentFact && (
              <p className="text-gray-700 mt-2 text-center">
                Fun fact: {currentFact}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
