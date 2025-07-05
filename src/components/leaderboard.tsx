import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Medal, UserIcon, ChevronLeft } from "lucide-react";
import { User } from "@prisma/client";
import { QuizAttempt } from "@prisma/client";
import Link from "next/link";

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
    <div className="size-full flex flex-col items-center justify-start p-4 sm:p-6">
      <div className="w-full h-fit max-w-3xl animate-retro-slide bg-primary-light border-[6px] rounded-[15px]">
        <div className="relative sm:p-6 p-4 border-b-[6px] border-border">
          <Link href="/">
            <ChevronLeft className="hover:translate-x-[-5px] transition-transform absolute size-8 left-4 sm:left-12 top-1/2 translate-y-[-50%] cursor-pointer text-foreground animate-retro-bounce" />
          </Link>
          <h1 className="text-center">Leaderboard</h1>
        </div>
        <div className="p-6">
          {/* Top 3 Players */}
          <div className="p-8 mb-6">
            <h2 className="text-center mb-6">🥇 Champions 🥇</h2>
            <div className="grid grid-cols-3 gap-4 md:gap-8 lg:gap-12 items-end">
              {[2, 1, 3].map((rank) => {
                const quizAttempt = quizzes[rank - 1];
                return (
                  <div
                    key={quizAttempt?.id}
                    className={`flex flex-col justify-between gap-4 rounded-[15px] items-center animate-retro-bounce ${
                      rank === 1
                        ? "order-2"
                        : rank === 2
                        ? "order-1"
                        : "order-3"
                    }`}
                  >
                    <Avatar
                      className={`pixel-border transition-transform hover:scale-105 ${
                        rank === 1
                          ? "border-yellow-400 size-16 sm:size-24"
                          : rank === 2
                          ? "border-gray-400 size-14 sm:size-20"
                          : "border-orange-400 size-12 sm:size-16"
                      }`}
                    >
                      <AvatarImage
                        src={quizAttempt?.user?.image ?? ""}
                        alt={quizAttempt?.displayName ?? ""}
                        className="pixel-perfect"
                      />
                      <AvatarFallback>
                        <UserIcon className="size-6 sm:size-8 text-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <div
                      className={`text-xl sm:text-2xl font-bold mt-1 sm:mt-2 ${
                        rank === 1
                          ? "text-yellow-400"
                          : rank === 2
                          ? "text-gray-400"
                          : "text-orange-400"
                      }`}
                    >
                      {rank === 1 ? (
                        <Trophy className="size-6 sm:size-8 animate-retro-bounce" />
                      ) : (
                        <Medal className="size-6 sm:size-8" />
                      )}
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <span className="font-semibold text-foreground">
                        {quizAttempt?.displayName ?? "Anonymous"}
                      </span>
                      <span className="text-sm text-foreground opacity-70">
                        {quizAttempt?.totalScore.toLocaleString() ?? 0} pts
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {user && (
            <Card className="mb-6">
              <CardContent className="flex items-center justify-between p-4">
                <div className="flex items-center">
                  <h3 className=" mr-4">#{userRank ?? "?"}</h3>
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10 mr-4 pixel-border">
                    <AvatarFallback>
                      <UserIcon className="size-4 sm:size-6 text-foreground" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">
                    {user?.name ?? "Anonymous"}
                  </span>
                </div>
                <span className="font-bold">
                  {user?.topScore.toLocaleString()} pts
                </span>
              </CardContent>
            </Card>
          )}

          {/* Scrollable Leaderboard */}
          <div className="retro-card">
            <h3 className="p-4 border-b border-border">📊 Full Rankings 📊</h3>
            <ScrollArea type="always" className="h-[20dvh] sm:h-[30dvh] w-full">
              {quizzes.slice(3).map((quiz, index) => (
                <div
                  key={quiz.id}
                  className="flex items-center justify-between py-3 border-b border-border last:border-b-0 transition-colors px-4 sm:px-6"
                >
                  <div className="flex items-center">
                    <span className="font-medium w-8 text-foreground">
                      {index + 4}
                    </span>
                    <Avatar className="w-8 h-8 sm:w-10 sm:h-10 mr-4 pixel-border">
                      <AvatarImage
                        src={quiz.user?.image ?? ""}
                        alt={quiz.displayName ?? "Anonymous"}
                        className="pixel-perfect"
                      />
                      <AvatarFallback>
                        <UserIcon className="size-4 sm:size-6 text-foreground" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-foreground">
                      {quiz.displayName ?? "Anonymous"}
                    </span>
                  </div>
                  <span className="font-medium text-foreground">
                    {quiz.totalScore} pts
                  </span>
                </div>
              ))}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
}
