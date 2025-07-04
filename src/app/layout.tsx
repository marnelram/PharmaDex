import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "PharmaDex",
  description: "A quiz app to test your knowledge on drugs and Pokémon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Providers>{children}</Providers>
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
