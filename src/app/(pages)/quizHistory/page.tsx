import { ChevronLeft } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

export default function QuizHistoryPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <Card className="w-full max-w-2xl rounded-lg shadow-lg">
        <CardHeader className="relative p-4 border-b w-full">
          <Link href="/">
            <ChevronLeft className="hover:translate-x-[-5px] transition-transform absolute size-8 left-4 sm:left-12 top-1/2 translate-y-[-50%] cursor-pointer" />
          </Link>
          <h1 className="text-center font-bold">
            Quiz History
          </h1>
        </CardHeader>
        <CardContent className="p-8">
          <h2 className="font-bold text-center mb-8">
            Coming Soon!
          </h2>
        </CardContent>
      </Card>
    </div>
  );
}
