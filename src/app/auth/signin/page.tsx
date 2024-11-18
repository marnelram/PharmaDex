"use client";

import { signIn } from "next-auth/react";

export default function SignIn() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <button
        onClick={() => signIn("google")}
        className="rounded bg-black px-4 py-2 text-white hover:bg-gray-800"
      >
        Sign in with Google
      </button>
    </div>
  );
}
