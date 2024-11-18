"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Trophy,
  Users,
  Award,
  Settings,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface HomeProps {
  children?: React.ReactNode;
}

const facts = [
    {
      title: "Did you know?",
      content: "Pikachu was originally going to be named 'Gorochu'.",
    },
    {
      title: "Fun Fact",
      content: "Aspirin was originally derived from the bark of willow trees.",
    },
    {
      title: "Pokémon Trivia",
      content: "There are over 900 Pokémon species as of 2023.",
    },
  ];

export default function Home({}: HomeProps) {
  const [facts, setFacts] = useState([]);
  const [currentFact, setCurrentFact] = useState(0);

  useEffect(() => {
    const fetchFacts = async () => {
      const response = await fetch('/api/facts');
      const data = await response.json();
      setFacts(data);
    };
    
    fetchFacts();
  }, []);

  const nextFact = () => {
    setCurrentFact((prev) => (prev + 1) % facts.length);
  };

  const prevFact = () => {
    setCurrentFact((prev) => (prev - 1 + facts.length) % facts.length);
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-100 to-green-100 flex flex-col items-center justify-between p-8">
      <div className="w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-8 font-['Poppins']">
          Drug or Pokémon?
        </h1>

        {/* Main CTA */}
        <Button className="w-full py-8 text-2xl font-bold rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg">
          Start Quiz
        </Button>

        {/* Leaderboard Preview */}
        <Card className="mt-8 p-4">
          <h2 className="text-xl font-semibold mb-4">Top Players</h2>
          <div className="flex justify-between items-center">
            {[1, 2, 3].map((rank) => (
              <div key={rank} className="flex flex-col items-center">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={`/placeholder-avatar-${rank}.png`} />
                  <AvatarFallback>{rank}</AvatarFallback>
                </Avatar>
                <span className="mt-2 font-semibold">Player {rank}</span>
                <span className="text-sm text-gray-600">
                  {1000 - (rank - 1) * 100} pts
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Facts Carousel */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <Button variant="ghost" size="icon" onClick={prevFact}>
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <div className="text-center">
                <h3 className="text-lg font-semibold">
                  {facts[currentFact]?.title}
                </h3>
                <p className="mt-2">{facts[currentFact]?.content}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={nextFact}>
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="grid grid-cols-2 gap-4 mt-8">
          <Button
            variant="outline"
            className="py-6 flex items-center justify-center"
          >
            <Trophy className="mr-2 h-5 w-5" />
            Quizzes
          </Button>
          <Button
            variant="outline"
            className="py-6 flex items-center justify-center"
          >
            <Users className="mr-2 h-5 w-5" />
            Leaderboard
          </Button>
          <Button
            variant="outline"
            className="py-6 flex items-center justify-center"
          >
            <Award className="mr-2 h-5 w-5" />
            My Achievements
          </Button>
          <Button
            variant="outline"
            className="py-6 flex items-center justify-center"
          >
            <Settings className="mr-2 h-5 w-5" />
            Settings
          </Button>
        </div>
      </div>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-20 h-20 bg-red-200 rounded-full opacity-20"></div>
        <div className="absolute bottom-20 right-20 w-32 h-12 bg-blue-200 rounded-full opacity-20 transform rotate-45"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border-4 border-yellow-300 rounded-full opacity-20"></div>
      </div>
    </div>
  );
}
