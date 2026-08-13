"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

type Ripple = { id: number; x: number; y: number; };

/**
 * ClickRipple
 * -----------
 * Listens for clicks anywhere on the page and spawns a small, soft
 * expanding ring at the click position. It is purely additive — it never
 * calls preventDefault/stopPropagation, so buttons, links, forms and
 * navigation keep working untouched. Ripples disappear on their own.
 */
export default function ClickRipple({ reduced }: { reduced: boolean }) {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  useEffect(() => {
    if (reduced) return;

    let nextId = 0;
    const timers = new Set<number>();
    const onClick = (e: MouseEvent) => {
      const ripple = { id: nextId++, x: e.clientX, y: e.clientY };
      // Keep the list small so old ripples never accumulate.
      setRipples((prev) => [...prev.slice(-4), ripple]);
      // Self-cleanup after the animation window.
      const timer = window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id));
        timers.delete(timer);
      }, 900);
      timers.add(timer);
    };

    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("click", onClick);
      timers.forEach((timer) => window.clearTimeout(timer));
    };
  }, [reduced]);

  return (
    <AnimatePresence>
      {ripples.map((r) => (
        <motion.div
          key={r.id}
          className="motion-back__ripple"
          style={{ left: r.x, top: r.y }}
          initial={{ opacity: 0.55, scale: 0.15 }}
          animate={{ opacity: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          aria-hidden="true"
        />
      ))}
    </AnimatePresence>
  );
}
