import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Providers from "./provider";
import { profile } from "@/data/profile";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

const SITE_URL = "https://sanidhyadev.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.name} — AI Engineer & Builder`,
    template: `%s — ${profile.name}`,
  },
  description:
    "Sanidhya Rathore is an AI engineer and full-stack builder creating intelligent products across AI, automation, finance and modern web systems.",
  keywords: [
    "Sanidhya Rathore",
    "AI Engineer",
    "Full-Stack Developer",
    "Next.js",
    "React",
    "Python",
    "FastAPI",
    "AI Agents",
    "RAG",
    "Portfolio",
  ],
  authors: [{ name: profile.name, url: SITE_URL }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: profile.name,
    title: `${profile.name} — AI Engineer & Builder`,
    description:
      "Building intelligent products from idea to production. AI systems, full-stack engineering, and intelligent financial infrastructure.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: profile.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} — AI Engineer & Builder`,
    description: "Building intelligent products from idea to production.",
    images: ["/opengraph-image"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}