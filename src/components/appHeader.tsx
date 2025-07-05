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
    <header className="sticky top-0 w-full z-50 ">
      <div className="flex items-center gap-2 justify-between w-full max-w-5xl mx-auto bg-primary-light backdrop-blur-sm border-[6px] border-t-0 rounded-lg rounded-t-none p-2 sm:p-4 px-6 sm:px-8">
        <div className="hidden sm:flex items-center w-24">
          <Link
            href="/"
            className="transform transition-transform hover:scale-105 animate-retro-bounce"
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={40}
              height={40}
              className="pixel-border pixel-perfect"
            />
          </Link>
        </div>
        <Link href="/" className="hover:animate-retro-pulse">
          <h1>PharmaDex</h1>
        </Link>
        <div className="relative">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer pixel-border hover:animate-retro-bounce transition-all">
                  <AvatarImage
                    src={session.user.image || "/default-avatar.png"}
                    className="pixel-perfect"
                  />
                  <AvatarFallback className="bg-secondary-light text-foreground font-bold">
                    {session.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 -translate-x-7 retro-card">
                <DropdownMenuItem
                  onClick={() => redirect("/profile")}
                  className="hover:bg-secondary-light hover:text-foreground cursor-pointer"
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
              variant="default"
              size="sm"
              className="w-24 hover:animate-shimmer"
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
