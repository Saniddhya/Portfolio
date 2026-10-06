"use client";

import { useEffect, useRef, useState } from "react";

type CursorState = "default" | "link" | "project" | "drag";

/**
 * Small, precise custom cursor for pointer devices only.
 *
 * Disabled on touch/coarse pointers and under reduced motion, so it never
 * becomes an accessibility liability. State comes from event delegation via
 * data attributes rather than per-link React state, so hovering never re-renders
 * the page tree. All motion is rAF-driven and transform-only.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<CursorState>("default");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduced);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let rx = x;
    let ry = y;
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;

      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        "[data-cursor], a, button",
      );
      if (!target) {
        setState("default");
      } else if (target.dataset.cursor) {
        setState(target.dataset.cursor as CursorState);
      } else {
        setState("link");
      }
    };

    const tick = () => {
      // The ring lags the dot — that lag is the whole effect.
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;

      if (dotRef.current) dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  const ringSize = state === "project" ? 56 : state === "link" ? 40 : 28;

  return (
    <div className="no-print pointer-events-none fixed inset-0 z-[100]" aria-hidden="true">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-1 w-1 rounded-full bg-fg"
        style={{ marginLeft: -2, marginTop: -2, willChange: "transform" }}
      />
      {/* Lagging ring — resizes with state, never a giant circle */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 rounded-full border border-fg/40 transition-[width,height,margin,opacity] duration-300 ease-out"
        style={{
          width: ringSize,
          height: ringSize,
          marginLeft: -ringSize / 2,
          marginTop: -ringSize / 2,
          willChange: "transform",
          opacity: state === "default" ? 0.5 : 0.9,
        }}
      />
    </div>
  );
}