import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

const poppinsFont = Poppins({
  weight: ["100", "400", "900"],
  subsets: ["latin"],
});

const ralewayFont = Raleway({
  weight: ["400", "700"],
  subsets: ["latin"],
});

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
      <body
        className={`${poppinsFont.className} ${ralewayFont.className} antialiased bg-[#F5F5F5]`}
      >
        <Providers>{children}</Providers>
        <Toaster />
      </body>
    </html>
  );
}
