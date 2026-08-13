"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
} from "motion/react";
import FloatingOrbs from "./FloatingOrbs";
import GradientMesh from "./GradientMesh";
import ParticleField from "./ParticleField";
import ClickRipple from "./ClickRipple";
import { prefersReducedMotion } from "@/lib/utils";

/**
 * Per-section intensity (0..~1.1). The background reads the active section
 * via IntersectionObserver on `[data-section]` elements and eases the glow
 * toward this target, so each part of the page feels a little different
 * without any abrupt jumps.
 *
 *  hero      → strong glow, slower drift
 *  about     → softer ambient
 *  stack     → a touch more particle energy (skills)
 *  work      → subtle depth / parallax
 *  process   → measured ambience (experience)
 *  contact   → calm, minimal glow
 *  default   → balanced
 */
const SECTION_INTENSITY: Record<string, number> = {
  hero: 1.0,
  stats: 0.9,
  about: 0.75,
  work: 0.85,
  skills: 1.0,
  experience: 0.8,
  contact: 0.6,
};

const DEFAULT_INTENSITY = 0.8;

/**
 * MotionBackground
 * ----------------
 * The single global animated backdrop. Mount it once (e.g. in the app
 * providers) and it runs behind the entire portfolio.
 *
 * Movement sources (all independent of user input):
 *  - CSS keyframe orb drift (FloatingOrbs) — infinite, GPU transforms.
 *  - Canvas particle drift (ParticleField) — requestAnimationFrame.
 *
 * Extra, optional layers:
 *  - Scroll parallax via Motion `useScroll` / `useTransform`.
 *  - A subtle spring mouse follow (the background still animates if the
 *    mouse is perfectly still).
 *  - A gentle click ripple (ClickRipple).
 *
 * Everything is decorative (`pointer-events: none`) and none of it blocks
 * selection, links, forms or scrolling.
 */
export default function MotionBackground() {
  const reduced = Boolean(useReducedMotion()) || prefersReducedMotion();

  // Page scroll progress (0..1), smoothed so the parallax feels buttery.
  const { scrollYProgress } = useScroll();
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.6,
  });

  // Normalised cursor position (-0.5..0.5), read into springs for a soft follow.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20, mass: 0.5 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20, mass: 0.5 });

  const [sectionId, setSectionId] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const glowRef = useRef<HTMLDivElement | null>(null);
  const energyRef = useRef<number>(DEFAULT_INTENSITY);
  const energyFrame = useRef<number | null>(null);

  const reducedMotion = reduced || isMobile;

  useEffect(() => {
    const query = window.matchMedia("(max-width: 768px)");
    const onChange = () => setIsMobile(query.matches);
    onChange();
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const target = reducedMotion ? 0.35 : 0.5 + energyRef.current * 0.5;
    const controls = animate(el, { opacity: target }, { duration: 0.6, ease: "easeOut" });
    return () => controls.stop();
  }, [reducedMotion, sectionId]);

  useEffect(() => {
    const target = sectionId
      ? SECTION_INTENSITY[sectionId] ?? DEFAULT_INTENSITY
      : DEFAULT_INTENSITY;

    if (reducedMotion) {
      energyRef.current = target;
      if (energyFrame.current !== null) {
        cancelAnimationFrame(energyFrame.current);
        energyFrame.current = null;
      }
      return;
    }

    let lastTime = performance.now();
    const step = (time: number) => {
      const current = energyRef.current;
      const delta = Math.min(1, (time - lastTime) / 1000);
      lastTime = time;
      const next = current + (target - current) * Math.min(1, 0.16 + delta * 2.8);
      energyRef.current = Math.abs(target - next) < 0.001 ? target : next;
      if (Math.abs(target - energyRef.current) > 0.001 && !document.hidden) {
        energyFrame.current = window.requestAnimationFrame(step);
      } else {
        energyRef.current = target;
        energyFrame.current = null;
      }
    };

    energyFrame.current = window.requestAnimationFrame(step);
    return () => {
      if (energyFrame.current !== null) {
        cancelAnimationFrame(energyFrame.current);
        energyFrame.current = null;
      }
    };
  }, [sectionId, reducedMotion]);

  // Section awareness: observe [data-section] elements, pick the most-visible.
  useEffect(() => {
    const els = Array.from(
      document.querySelectorAll<HTMLElement>("[data-section]"),
    );
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) {
          const id = visible.target.getAttribute("data-section");
          if (id) setSectionId(id);
        }
      },
      { threshold: [0.15, 0.35, 0.55], rootMargin: "0px 0px -25% 0px" },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="motion-back" aria-hidden="true">
      {/* Liquid WebGL gradient mesh — the animated "movement background". */}
      <GradientMesh intensityRef={energyRef} reduced={reducedMotion} />

      {!reducedMotion && (
        <FloatingOrbs
          scrollY={smoothScroll}
          mouseX={springX}
          mouseY={springY}
          reduced={reducedMotion}
        />
      )}

      <ParticleField intensityRef={energyRef} reduced={reducedMotion} />

      {/* Soft vignette so edges fall away into the dark base. */}
      <div className="motion-back__vignette" />

      {/* Dark overlay keeps the light-on-dark typography readable. */}
      <div className="motion-back__overlay" />

      {/* Static top tint that eases with the active section's energy. */}
      {/* Opacity is set post-hydration via glowRef to keep SSR output stable. */}
      <div ref={glowRef} className="motion-back__glow" />

      {/* Click ripples are wired to a global listener — never blocks UI. */}
      <ClickRipple reduced={reduced} />
    </div>
  );
}
