import type { Metadata } from "next";
import Providers from "./provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sanidhya Rathore — Full-Stack Developer & Creative Technologist",
  description:
    "Sanidhya Rathore — full-stack developer and creative technologist crafting motion-first experiences in React, Next.js, Python and WebGL.",
  keywords: [
    "Full-stack developer",
    "Creative technologist",
    "Next.js",
    "React",
    "Python",
    "FastAPI",
    "Portfolio",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap" rel="stylesheet" /><meta name="theme-color" content="#080607" /></head><body><Providers>{children}</Providers></body></html>;
}
