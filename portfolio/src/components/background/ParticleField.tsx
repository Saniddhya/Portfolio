"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

/**
 * ParticleField
 * -------------
 * A lightweight <canvas> particle system rendered on the GPU. Particles
 * continuously drift upward with a gentle sine wobble and a slow twinkle,
 * so the field always feels alive. When the mouse moves nearby, particles
 * are given a soft push (impulse) — purely decorative and optional.
 *
 * Everything lives in refs; no React state is touched per frame, so there
 * are no re-renders. The canvas uses transforms via the browser compositor.
 *
 * Honours:
 *  - `prefers-reduced-motion` (renders a single static frame, no loop).
 *  - mobile factor (fewer particles, slower).
 */
export default function ParticleField({
  intensityRef,
  reduced,
}: {
  intensityRef: MutableRefObject<number>;
  reduced: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mobile = window.matchMedia("(max-width: 768px)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);

    let width = 0;
    let height = 0;
    let particles: {
      x: number;
      y: number;
      r: number;
      vx: number;
      vy: number;
      phase: number;
      twinkleSpeed: number;
      alpha: number;
    }[] = [];

    const COUNT = mobile ? 34 : 72;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles = Array.from({ length: COUNT }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.8 + Math.random() * 1.9,
        // Slight lateral drift + slow upward drift.
        vx: (Math.random() - 0.5) * 0.16,
        vy: -(0.12 + Math.random() * 0.28),
        phase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.4 + Math.random() * 0.9,
        alpha: 0.2 + Math.random() * 0.5,
      }));
    };

    resize();
    seed();

    // A single static frame for reduced-motion / no-animation contexts.
    const drawStatic = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 156, 88, ${p.alpha * 0.6})`;
        ctx.fill();
      }
    };

    if (reduced) {
      drawStatic();
      return;
    }

    // Soft pointer interaction (optional parallax/deflection).
    const pointer = { x: -9999, y: -9999 };
    let pointerActive = false;
    const onMove = (e: MouseEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
      pointerActive = true;
    };
    const onLeave = () => {
      pointerActive = false;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    let raf = 0;
    let running = true;
    const tick = (time: number) => {
      if (!running) return;
      const t = time / 1000;
      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        // Continuous drift (independent of the pointer).
        p.y += p.vy;
        p.x += p.vx + Math.sin(t * 0.4 + p.phase) * 0.08;

        // Optional gentle push from the cursor.
        if (pointerActive) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const dist = Math.hypot(dx, dy);
          const RADIUS = 120;
          if (dist < RADIUS && dist > 0.001) {
            const force = (1 - dist / RADIUS) * 0.6 * intensityRef.current;
            p.x += (dx / dist) * force;
            p.y += (dy / dist) * force;
          }
        }

        // Wrap around edges so the field never empties.
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        // Slow alpha twinkle.
        const alpha = p.alpha * (0.55 + 0.45 * Math.sin(t * p.twinkleSpeed + p.phase));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 156, 88, ${alpha})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    const onVisibilityChange = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [intensityRef, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="motion-back__canvas"
      aria-hidden="true"
    />
  );
}
