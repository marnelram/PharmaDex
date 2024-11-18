"use client";

import { signIn } from "next-auth/react";
import Image from "next/image";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#A8D5E2] to-[#A7F3D0] flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full space-y-8">
        {/* Logo/Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-[#FB7185] to-[#C084FC] bg-clip-text text-transparent">
            Drug or Pokémon?
          </h1>
          <p className="text-gray-600">
            Test your knowledge of medicines and monsters!
          </p>
        </div>

        {/* Sign In Options */}
        <div className="space-y-4">
          <button
            onClick={() =>
              signIn("google", { callbackUrl: "/", redirect: true })
            }
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-200 rounded-xl py-3 px-4 text-gray-700 hover:bg-gray-50 hover:border-[#FDE68A] transition-all duration-200 font-medium"
          >
            <Image
              src="/google-icon.png" // Make sure to add this image to your public folder
              alt="Google"
              width={20}
              height={20}
            />
            Continue with Google
          </button>

          {/* Decorative Elements */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">
                or try as guest
              </span>
            </div>
          </div>

          <button
            onClick={() => signIn(undefined, { callbackUrl: "/" })}
            className="w-full bg-gradient-to-r from-[#A8D5E2] to-[#A7F3D0] text-gray-700 rounded-xl py-3 px-4 font-medium hover:opacity-90 transition-opacity duration-200"
          >
            Play as Guest
          </button>
        </div>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Start your journey as a Pharmacist Trainer today!</p>
        </div>
      </div>
    </div>
  );
}
