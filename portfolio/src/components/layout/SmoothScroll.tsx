"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Smooth scrolling.
 *
 * Deliberately opt-out: it is skipped entirely under reduced motion, on touch
 * devices (where it fights native momentum and hurts accessibility), and if the
 * library fails to initialise. Normal browser scrolling always remains valid.
 */
export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;

    if (reduced || coarse) return;

    let lenis: Lenis | null = null;
    let frame = 0;

    try {
      lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    } catch {
      return;
    }

    const raf = (time: number) => {
      lenis?.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      lenis?.destroy();
    };
  }, []);

  return <>{children}</>;
}