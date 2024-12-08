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
      <div className="flex items-center gap-2 justify-between w-full max-w-5xl mx-auto bg-white rounded-[15px] shadow-md p-2 sm:p-4 px-6 sm:px-8">
        <div className="hidden sm:flex items-center w-24">
          <Link href="/">
            <Image src="/logo.png" alt="logo" width={40} height={40} />
          </Link>
        </div>
        <h1 className=" text-[32px] font-bold font-['Poppins']">PharmaDex</h1>
        <div className="relative">
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="w-10 h-10 cursor-pointer">
                  <AvatarImage
                    src={session.user.image || "/default-avatar.png"}
                  />
                  <AvatarFallback>
                    {session.user.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 -translate-x-7">
                <DropdownMenuItem onClick={() => redirect("/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut({ redirectTo: "/" })}>
                  <LogOut className="mr-2 h-5 w-5" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => redirect("/auth/signin")}
              className="bg-[#E63946] hover:bg-[#d32d3a] transition-all duration-300 w-24 shadow-md rounded-[25px] text-[14px] font-medium"
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
