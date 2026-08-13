"use client";

import { useEffect } from "react";
import type { RefObject } from "react";

/**
 * useSpotlight
 * ------------
 * Tracks the pointer over an element and writes its --mx / --my CSS custom
 * properties so a card's `::after` radial-gradient can follow the cursor
 * like a soft spotlight. Pair with `.capability-card` / `.stat-card` CSS.
 */
export function useSpotlight<T extends HTMLElement>(
  ref: RefObject<T | null>,
): void {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };

    el.addEventListener("mousemove", onMove, { passive: true });
    return () => el.removeEventListener("mousemove", onMove);
  }, [ref]);
}