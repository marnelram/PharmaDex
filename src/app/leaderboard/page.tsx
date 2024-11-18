import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trophy, Medal } from "lucide-react";

// Mock data for the leaderboard
const leaderboardData = [
  { id: 1, name: "Ash", score: 9500, avatar: "/avatar-1.png" },
  { id: 2, name: "Misty", score: 9200, avatar: "/avatar-2.png" },
  { id: 3, name: "Brock", score: 8800, avatar: "/avatar-3.png" },
  { id: 4, name: "Gary", score: 8500, avatar: "/avatar-4.png" },
  { id: 5, name: "May", score: 8200, avatar: "/avatar-5.png" },
  { id: 6, name: "Dawn", score: 8000, avatar: "/avatar-6.png" },
  { id: 7, name: "Serena", score: 7800, avatar: "/avatar-7.png" },
  { id: 8, name: "Clemont", score: 7600, avatar: "/avatar-8.png" },
  { id: 9, name: "Iris", score: 7400, avatar: "/avatar-9.png" },
  { id: 10, name: "Cilan", score: 7200, avatar: "/avatar-10.png" },
];

const currentPlayer = { id: 42, name: "You", score: 7900, rank: 6 };

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-yellow-100 to-green-100 flex flex-col items-center justify-start p-8">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center font-['Poppins']">
            Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Top 3 Players */}
          <div className="flex justify-around items-end mb-8">
            {[2, 1, 3].map((rank) => {
              const player = leaderboardData[rank - 1];
              return (
                <div
                  key={player.id}
                  className={`flex flex-col items-center ${
                    rank === 1 ? "order-2" : rank === 2 ? "order-1" : "order-3"
                  }`}
                >
                  <Avatar
                    className={`${
                      rank === 1 ? "w-24 h-24" : "w-20 h-20"
                    } border-4 ${
                      rank === 1
                        ? "border-yellow-400"
                        : rank === 2
                        ? "border-gray-400"
                        : "border-orange-400"
                    }`}
                  >
                    <AvatarImage src={player.avatar} alt={player.name} />
                    <AvatarFallback>{player.name[0]}</AvatarFallback>
                  </Avatar>
                  <div
                    className={`text-2xl font-bold mt-2 ${
                      rank === 1
                        ? "text-yellow-500"
                        : rank === 2
                        ? "text-gray-500"
                        : "text-orange-500"
                    }`}
                  >
                    {rank === 1 ? (
                      <Trophy className="w-8 h-8" />
                    ) : (
                      <Medal className="w-6 h-6" />
                    )}
                  </div>
                  <span className="font-semibold mt-1">{player.name}</span>
                  <span className="text-sm text-gray-600">
                    {player.score} pts
                  </span>
                </div>
              );
            })}
          </div>

          {/* Current Player's Score */}
          <Card className="mb-6 bg-blue-50">
            <CardContent className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <span className="text-xl font-semibold mr-4">
                  {currentPlayer.rank}
                </span>
                <Avatar className="mr-4">
                  <AvatarFallback>{currentPlayer.name[0]}</AvatarFallback>
                </Avatar>
                <span className="font-semibold">{currentPlayer.name}</span>
              </div>
              <span className="font-bold text-blue-600">
                {currentPlayer.score} pts
              </span>
            </CardContent>
          </Card>

          {/* Scrollable Leaderboard */}
          <ScrollArea className="h-64 rounded-md border p-4">
            {leaderboardData.slice(3).map((player, index) => (
              <div
                key={player.id}
                className="flex items-center justify-between py-2 border-b last:border-b-0"
              >
                <div className="flex items-center">
                  <span className="text-lg font-semibold w-8">{index + 4}</span>
                  <Avatar className="mr-4">
                    <AvatarImage src={player.avatar} alt={player.name} />
                    <AvatarFallback>{player.name[0]}</AvatarFallback>
                  </Avatar>
                  <span>{player.name}</span>
                </div>
                <span className="font-semibold">{player.score} pts</span>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
