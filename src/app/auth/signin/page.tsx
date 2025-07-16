"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="bg-primary-light rounded-[15px] shadow-xl p-8 max-w-md w-full space-y-8">
        {/* Logo/Header Section */}
        <div className="text-center space-y-4">
          <h1 className="font-bold text-accent-red">Drug or Pokémon?</h1>
          <p className="text-muted-foreground">
            Test your knowledge of medicines and monsters!
          </p>
        </div>

        {/* Sign In Options */}
        <div className="space-y-6">
          <button
            onClick={() =>
              signIn("google", { callbackUrl: "/", redirect: true })
            }
            className="w-full flex items-center justify-center gap-3 bg-primary-light border-2 border-muted-foreground rounded-[25px] py-4 px-6 font-medium hover:scale-105 transition-transform duration-200"
          >
            <Image
              src="/google-icon.webp"
              alt="Google"
              width={24}
              height={24}
              className="min-w-6"
            />
            Continue with Google
          </button>

          {/* Decorative Elements */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted-foreground"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-primary-light text-muted-foreground">
                or try as guest
              </span>
            </div>
          </div>

          <button
            onClick={() => router.push("/quiz")}
            className="w-full bg-accent-red text-primary rounded-[25px] py-4 px-6 font-medium hover:scale-105 transition-transform duration-200"
          >
            Play as Guest
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-muted-foreground">
          <p>Start your journey as a Pharmacist Trainer today!</p>
        </div>
      </div>
    </div>
  );
}
