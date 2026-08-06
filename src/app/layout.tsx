import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Space_Grotesk, Inter } from "next/font/google";
import { SettingsProvider } from "@/components/SettingsProvider";
import "./globals.css";

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});
const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Shrijay Mankar — Full-Stack Developer & Data Scientist",
  description:
    "Space-themed portfolio of Shrijay Mankar, a full-stack developer and data scientist building web apps and machine-learning models.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body className="bg-[#05030f] font-sans text-slate-200 antialiased">
        <SettingsProvider>{children}</SettingsProvider>
      </body>
    </html>
  );
}
