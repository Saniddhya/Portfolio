"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { getCapabilities, type Capabilities } from "@/lib/capabilities";

/**
 * Client boundary for the WebGL layer.
 *
 * Responsibilities kept out of the scene itself:
 *  - capability detection (device tier, reduced motion, WebGL availability)
 *  - dynamic import so three.js never blocks first paint
 *  - pointer tracking via a ref (no per-frame React state)
 *  - pausing rendering when the canvas scrolls out of view
 *  - a designed static fallback that is itself premium, never a broken box
 */

// `ssr: false` because WebGL is inherently client-only. `loading` keeps the
// composition stable so there is no layout shift while the chunk arrives.
const IntelligenceScene = dynamic(() => import("./IntelligenceScene"), {
  ssr: false,
  loading: () => null,
});

/**
 * Static fallback: a CSS-only concentric rendering of the same core. Deliberately
 * minimal so it reads as intentional rather than as a failed canvas.
 */
function CoreFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center" aria-hidden="true">
      <div
        className="absolute rounded-full border border-white/10"
        style={{ width: "58%", aspectRatio: "1" }}
      />
      <div
        className="absolute rounded-full border border-white/[0.07]"
        style={{ width: "78%", aspectRatio: "1" }}
      />
      <div
        className="absolute rounded-full border border-white/[0.05]"
        style={{ width: "98%", aspectRatio: "1" }}
      />
      <div
        className="rounded-full bg-[radial-gradient(circle_at_38%_34%,rgba(214,255,75,0.55),rgba(10,10,11,0.9)_68%)]"
        style={{ width: "30%", aspectRatio: "1" }}
      />
    </div>
  );
}

export interface IntelligenceCoreProps {
  color?: string;
  /** Extra technical readouts rendered around the canvas. */
  hud?: { label: string; value: string }[];
  className?: string;
}

export default function IntelligenceCore({
  color = "#d6ff4b",
  hud,
  className = "",
}: IntelligenceCoreProps) {
  const [caps, setCaps] = useState<Capabilities | null>(null);
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerTarget = useRef({ x: 0, y: 0 });

  // Probe once on mount. Until this resolves we render the static fallback, so
  // there is never a flash of an over-budget canvas.
  useEffect(() => {
    setCaps(getCapabilities());
  }, []);

  // Track pointer / touch into a ref — mutating it does not re-render.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const onMove = (e: PointerEvent) => {
      const rect = node.getBoundingClientRect();
      pointerTarget.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerTarget.current.y = ((e.clientY - rect.top) / rect.height - 0.5) * -2;
    };
    const onLeave = () => {
      pointerTarget.current.x = 0;
      pointerTarget.current.y = 0;
    };

    node.addEventListener("pointermove", onMove, { passive: true });
    node.addEventListener("pointerleave", onLeave, { passive: true });
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  // Pause work when scrolled away — the single biggest win for long pages.
  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0, rootMargin: "100px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const useWebGL = caps !== null && caps.webglSupported && caps.quality !== "static";
  const shouldMountScene = useWebGL && inView;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      role="img"
      aria-label={
        "Abstract visualisation of an intelligence core: a central geometric structure surrounded by connected data nodes."
      }
    >
      {/* The canvas is decorative; the label above carries the meaning. */}
      <div className="absolute inset-0" aria-hidden="true">
        {shouldMountScene ? (
          <IntelligenceScene
            color={color}
            particleCount={caps.particleCount}
            dpr={caps.dpr}
            reducedMotion={caps.reducedMotion}
            pointerTarget={pointerTarget}
          />
        ) : (
          <CoreFallback />
        )}
      </div>

      {hud && hud.length > 0 && (
        <ul className="pointer-events-none absolute inset-0">
          {hud.map((item, i) => (
            <li
              key={item.label}
              className={`mono absolute flex items-center gap-2 whitespace-nowrap text-[9px] text-white/25 sm:text-[10px] ${
                HUD_POSITIONS[i] ?? HUD_POSITIONS[0]
              }`}
            >
              <span className="h-1 w-1 rounded-full bg-accent/60" />
              <span>{item.label}</span>
              <span className="text-white/45">{item.value}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

/** Corner anchors for the technical readouts, in order. */
const HUD_POSITIONS = [
  "left-3 top-3 sm:left-6 sm:top-6",
  "right-3 top-3 sm:right-6 sm:top-6",
  "bottom-3 left-3 sm:bottom-6 sm:left-6",
  "bottom-3 right-3 sm:bottom-6 sm:right-6",
] as const;