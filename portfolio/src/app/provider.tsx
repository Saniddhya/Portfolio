"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";
import { SoundProvider } from "@/components/audio/SoundProvider";
import CustomCursor from "@/components/cursor/CustomCursor";
import Preloader from "@/components/layout/Preloader";
import SmoothScroll from "@/components/layout/SmoothScroll";
import Navbar from "@/components/navigation/Navbar";
const MotionBackground = dynamic(
  () => import("@/components/background/MotionBackground"),
  { ssr: false },
);

export default function Providers({
  children,
}: {
  children: ReactNode;
}) {
  return <SoundProvider><Preloader /><CustomCursor /><Navbar /><MotionBackground /><SmoothScroll>{children}</SmoothScroll></SoundProvider>;
}
