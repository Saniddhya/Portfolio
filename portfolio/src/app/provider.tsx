"use client";

import type { ReactNode } from "react";
import CustomCursor from "@/components/cursor/CustomCursor";
import Navbar from "@/components/navigation/Navbar";
import RevealProvider from "@/components/layout/RevealProvider";
import SmoothScroll from "@/components/layout/SmoothScroll";

/**
 * Global client shell.
 *
 * Intentionally small — no audio, no background canvas, no forced preloader.
 * Each was a tax on first paint and none carried information the visitor needs.
 */
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SmoothScroll>
      <RevealProvider />
      <CustomCursor />
      <Navbar />
      <a
        href="#main"
        className="mono sr-only-focusable absolute left-4 top-4 z-[110] rounded bg-accent px-4 py-2 text-[11px] text-bg"
      >
        Skip to content
      </a>
      {children}
    </SmoothScroll>
  );
}