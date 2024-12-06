import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Medal, UserIcon } from "lucide-react";
import { User } from "@prisma/client";
import { QuizAttempt } from "@prisma/client";

// Add this test data array before the LeaderboardProps interface
const TEST_QUIZZES = Array.from({ length: 50 }, (_, i) => ({
  id: `test-${i}`,
  displayName: `Player ${i + 1}`,
  totalScore: Math.floor(Math.random() * 10000),
  user: {
    name: `Player ${i + 1}`,
    image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`, // Optional: generates random avatars
  },
}));

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
    <div className="size-full max-h-[90dvh] bg-[#F5F5F5] flex flex-col items-center justify-start p-4 sm:p-6">
      <Card className="size-full max-w-3xl bg-white shadow-lg">
        <CardHeader className="p-4 sm:pb-0">
          <CardTitle className="text-[32px] sm:text-[44px] font-bold text-center font-['Poppins']">
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Top 3 Players */}
          <div className="grid grid-cols-3 gap-4 md:gap-8 lg:gap-12 items-end py-4 sm:py-6 rounded-[15px]">
            {[2, 1, 3].map((rank) => {
              const quizAttempt = quizzes[rank - 1];
              return (
                <div
                  key={quizAttempt.id}
                  className={`flex flex-col justify-between bg-white gap-4 rounded-[15px] items-center ${
                    rank === 1 ? "order-2" : rank === 2 ? "order-1" : "order-3"
                  }`}
                >
                  <Avatar
                    className={`border-2 sm:border-4 transition-transform hover:scale-105 ${
                      rank === 1
                        ? "border-[#F3E260] size-16 sm:size-24"
                        : rank === 2
                        ? "border-[#A7A7A7] size-14 sm:size-20"
                        : "border-[#E63946] size-12 sm:size-16"
                    }`}
                  >
                    <AvatarImage
                      src={quizAttempt.user?.image ?? ""}
                      alt={quizAttempt.displayName ?? ""}
                    />
                    <AvatarFallback className="font-['Raleway'] text-sm sm:text-base">
                      <UserIcon className="size-6 sm:size-8 text-gray-600" />
                    </AvatarFallback>
                  </Avatar>
                  <div
                    className={`text-xl sm:text-2xl font-bold mt-1 sm:mt-2 ${
                      rank === 1
                        ? "text-[#F3E260]"
                        : rank === 2
                        ? "text-[#A7A7A7]"
                        : "text-[#E63946]"
                    }`}
                  >
                    {rank === 1 ? (
                      <Trophy className="size-6 sm:size-8 animate-bounce" />
                    ) : (
                      <Medal className="size-6 sm:size-8" />
                    )}
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="font-['Raleway'] font-semibold text-gray-800 text-[14px] sm:text-[16px] mt-1">
                      {quizAttempt.displayName ?? "Anonymous"}
                    </span>
                    <span className="font-['Raleway'] text-[12px] sm:text-[14px] text-gray-600">
                      {quizAttempt.totalScore.toLocaleString()} pts
                    </span>
                  </div>
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
                      <UserIcon className="size-4 sm:size-6 text-gray-600" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-['Raleway'] font-medium text-[14px] sm:text-[16px]">
                    {user.name ?? "Anonymous"}
                  </span>
                </div>
                <span className="font-['Raleway'] font-bold text-[14px] sm:text-[16px]">
                  {user.topScore.toLocaleString()} pts
                </span>
              </CardContent>
            </Card>
          )}

          {/* Scrollable Leaderboard */}
          <ScrollArea className="size-full rounded-[15px] border">
            {TEST_QUIZZES.slice(3).map((quiz, index) => (
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
                      <UserIcon className="size-4 sm:size-6 text-gray-600" />
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
