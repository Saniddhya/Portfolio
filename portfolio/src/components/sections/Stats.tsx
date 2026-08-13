"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { stats, type Stat } from "@/data/stats";
import { useSpotlight } from "@/hooks/useSpotlight";
import { Eyebrow } from "@/components/ui/Eyebrow";

/**
 * Animated counter card — counts 0 → value the moment it scrolls into view.
 */
function StatCard({ value, suffix, prefix, label, hint }: Stat) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });
  const [display, setDisplay] = useState(0);

  useSpotlight(ref);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <div ref={ref} className="stat-card">
      <div className="stat-value" aria-label={`${label}: ${value}${suffix}`}>
        {prefix}
        {display}
        {suffix}
      </div>
      <div className="stat-label">{label}</div>
      <div className="stat-hint">{hint}</div>
    </div>
  );
}

export function Stats() {
  return (
    <section
      id="stats"
      data-section="stats"
      className="section"
      aria-label="Stats"
    >
      <div className="container">
        <div className="mb-12">
          <Eyebrow>By the numbers</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl xl:text-5xl font-semibold tracking-[-0.02em] mt-4">
            Proof, not promises
          </h2>
        </div>

        <div className="stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.id} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Stats;