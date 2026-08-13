"use client";

import type Lenis from "lenis";

/**
 * Tiny module-level singleton so any component (Navbar, mobile menu, hero)
 * can drive the same Lenis instance for buttery in-page scrolling.
 */
let lenis: Lenis | null = null;

export function setLenis(l: Lenis | null): void {
  lenis = l;
}

export function getLenis(): Lenis | null {
  return lenis;
}

/**
 * Smoothly scroll to an element by id. Falls back to native smooth
 * scrolling when Lenis isn't running (e.g. reduced-motion).
 */
export function scrollToId(id: string): void {
  const el = document.getElementById(id);
  if (!el) return;
  const instance = getLenis();
  if (instance) {
    instance.scrollTo(el, { offset: 0, duration: 1.5 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}
