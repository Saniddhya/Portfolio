"use client";

import { useEffect, useRef } from "react";

/**
 * Tracks mouse position without triggering React re-renders.
 * Uses refs + requestAnimationFrame for performance.
 */
export function useMousePosition() {
  const xRef = useRef(0);
  const yRef = useRef(0);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      xRef.current = e.clientX;
      yRef.current = e.clientY;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);

  return { xRef, yRef };
}