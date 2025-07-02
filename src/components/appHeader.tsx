"use client";

import { LogIn, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default function AppHeader({ session }: { session: Session | null }) {
  return (
    <header className="sticky top-0 w-full z-50">
      <div className="flex items-center gap-2 justify-between w-full max-w-5xl mx-auto bg-primary/90 backdrop-blur-sm border-2 border-black shadow-[4px_4px_0px_0px_#000] p-2 sm:p-4 px-6 sm:px-8">
        <div className="hidden sm:flex items-center w-24">
          <Link
            href="/"
            className="transform transition-transform hover:scale-105"
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="border-2 border-black shadow-[2px_2px_0px_0px_#000]"
            />
          </Link>
        </div>
        <Link href="/" className="hover:animate-pulse">
          <h1 className="text-accent-red drop-shadow-[2px_2px_0px_#000]">
            PharmaDex
          </h1>
        </Link>
        <div className="relative">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer border-2 border-black shadow-[2px_2px_0px_0px_#000] hover:shadow-[4px_4px_0px_0px_#000] transition-all">
                  <AvatarImage
                    src={session.user.image || "/default-avatar.png"}
                  />
                  <AvatarFallback className="bg-accent-yellow text-black font-bold">
                    {session.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 -translate-x-7 bg-primary border-2 border-black shadow-[4px_4px_0px_0px_#000]">
                <DropdownMenuItem
                  onClick={() => redirect("/profile")}
                  className="hover:bg-accent-yellow hover:text-black cursor-pointer"
                >
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => signOut({ redirectTo: "/" })}
                  className="hover:bg-accent-red hover:text-primary cursor-pointer"
                >
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => redirect("/auth/signin")}
              variant="pokemon"
              size="sm"
              className="w-24"
            >
              <LogIn className="mr-2 h-5 w-5" />
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
