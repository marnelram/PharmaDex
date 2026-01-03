"use client";

// BetterAuth doesn't need a session provider wrapper like NextAuth
// The auth client handles session state internally
// This file is kept for backward compatibility but just passes through children

export default function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
