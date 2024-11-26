import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Medal } from "lucide-react";
import { User } from "@prisma/client";
import { QuizAttempt } from "@prisma/client";

interface LeaderboardProps {
  user: User | null;
  quizzes: (QuizAttempt & { user: User | null })[];
  userRank: number;
}

export default function Leaderboard({
  user,
  quizzes,
  userRank,
}: LeaderboardProps) {
  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col items-center justify-start p-4 sm:p-8">
      <Card className="w-full max-w-3xl bg-white shadow-lg">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-[32px] sm:text-[44px] font-bold text-center font-['Poppins']">
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 sm:p-6">
          {/* Top 3 Players */}
          <div className="flex justify-around items-end mb-6 sm:mb-8 bg-[#e6e6e6] p-4 sm:p-6 rounded-[15px]">
            {[2, 1, 3].map((rank) => {
              const quizAttempt = quizzes[rank - 1];
              return (
                <div
                  key={quizAttempt.id}
                  className={`flex flex-col items-center ${
                    rank === 1 ? "order-2" : rank === 2 ? "order-1" : "order-3"
                  }`}
                >
                  <Avatar
                    className={`${
                      rank === 1
                        ? "w-16 h-16 sm:w-24 sm:h-24"
                        : "w-14 h-14 sm:w-20 sm:h-20"
                    } border-2 sm:border-4 transition-transform hover:scale-105 ${
                      rank === 1
                        ? "border-[#F3E260]"
                        : rank === 2
                        ? "border-[#e6e6e6]"
                        : "border-[#E63946]"
                    }`}
                  >
                    <AvatarImage
                      src={quizAttempt.user?.image ?? ""}
                      alt={quizAttempt.displayName ?? ""}
                    />
                    <AvatarFallback className="font-['Raleway'] text-sm sm:text-base">
                      {quizAttempt.displayName ?? "Anonymous"}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`text-xl sm:text-2xl font-bold mt-1 sm:mt-2 ${
                      rank === 1
                        ? "text-[#F3E260]"
                        : rank === 2
                        ? "text-[#e6e6e6]"
                        : "text-[#E63946]"
                    }`}
                  >
                    {rank === 1 ? (
                      <Trophy className="w-6 h-6 sm:w-8 sm:h-8 animate-bounce" />
                    ) : (
                      <Medal className="w-4 h-4 sm:w-6 sm:h-6" />
                    )}
                  </div>
                  <span className="font-['Raleway'] font-medium text-[14px] sm:text-[16px] mt-1">
                    {quizAttempt.displayName ?? "Anonymous"}
                  </span>
                  <span className="font-['Raleway'] text-[12px] sm:text-[14px] text-gray-600">
                    {quizAttempt.totalScore} pts
                  </span>
                </div>
              );
            })}
          </div>
          {user && (
            <Card className="mb-4 sm:mb-6 bg-[#E63946] text-white hover:shadow-lg transition-shadow">
              <CardContent className="flex items-center justify-between p-3 sm:p-4">
                <div className="flex items-center">
                  <span className="text-[18px] sm:text-[22px] font-medium font-['Raleway'] mr-2 sm:mr-4">
                    {userRank}
                  </span>
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-4 border-2 border-white">
                    <AvatarFallback className="font-['Raleway'] text-sm">
                      {user.name ?? "Anonymous"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-['Raleway'] font-medium text-[14px] sm:text-[16px]">
                    {user.name ?? "Anonymous"}
                  </span>
                </div>
                <span className="font-['Raleway'] font-bold text-[14px] sm:text-[16px]">
                  {user.topScore} pts
                </span>
              </CardContent>
            </Card>
          )}

          {/* Scrollable Leaderboard */}
          <ScrollArea className="h-48 sm:h-64 rounded-[15px] border">
            {quizzes.slice(3).map((quiz, index) => (
              <div
                key={quiz.id}
                className="flex items-center justify-between py-2 border-b last:border-b-0 hover:bg-[#F5F5F5] transition-colors px-4 sm:px-8"
              >
                <div className="flex items-center">
                  <span className="font-['Raleway'] text-[14px] sm:text-[16px] font-medium w-6 sm:w-8">
                    {index + 4}
                  </span>
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10 mr-2 sm:mr-4">
                    <AvatarImage
                      src={quiz.user?.image ?? ""}
                      alt={quiz.displayName ?? "Anonymous"}
                    />
                    <AvatarFallback className="font-['Raleway'] text-sm">
                      {quiz.displayName ?? "Anonymous"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-['Raleway'] text-[14px] sm:text-[16px]">
                    {quiz.displayName ?? "Anonymous"}
                  </span>
                </div>
                <span className="font-['Raleway'] font-medium text-[14px] sm:text-[16px]">
                  {quiz.totalScore} pts
                </span>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
