"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/**
 * OrbItem
 * --------
 * A single large blurred gradient orb.
 *
 * Two layers, so their transforms never collide:
 *  - The outer <motion.div> applies the scroll + mouse parallax (transforms
 *    driven imperatively by Motion on GPU).
 *  - The inner .orb__core div runs a pure-CSS infinite keyframe drift
 *    (translate + scale + rotate). CSS animation = zero React re-renders and
 *    constant motion even when the user does nothing.
 */
function OrbItem({
  className,
  size,
  scrollY,
  speed,
  driftDuration,
  driftDelay,
}: {
  className: string;
  size: number;
  scrollY: MotionValue<number>;
  speed: number;
  driftDuration: number;
  driftDelay: number;
}) {
  // Different orbs travel at different speeds while scrolling => parallax depth.
  // Amplitudes are deliberately small so the background drifts gently and
  // never whips past the content while the user scrolls.
  const y = useTransform(scrollY, [0, 1], [0, -70 * speed]);
  const x = useTransform(scrollY, [0, 1], [0, 16 * speed]);

  return (
    <motion.div
      className={`orb ${className}`}
      style={{ width: size, height: size, x, y }}
      aria-hidden="true"
    >
      <div
        className="orb__core"
        style={{
          animationDuration: `${driftDuration}s`,
          animationDelay: `${driftDelay}s`,
        }}
      />
    </motion.div>
  );
}

type OrbSpec = {
  id: string;
  size: number;
  speed: number;
  driftDuration: number;
  driftDelay: number;
};

/**
 * FloatingOrbs
 * ------------
 * Several soft, deeply-blurred radial-gradient orbs that continuously drift
 * (CSS keyframes) and subtly parallax with scroll (Motion). The whole layer
 * also follows the cursor by a few pixels via a springy MotionValue.
 *
 * Mouse motion is strictly optional — the CSS drift keeps everything alive.
 */
export default function FloatingOrbs({
  scrollY,
  mouseX,
  mouseY,
  reduced,
}: {
  scrollY: MotionValue<number>;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  reduced: boolean;
}) {
  // Long drift durations = slow, calm motion so the orbs never race behind text.
  const ORBS: OrbSpec[] = [
    // Large ember-red orb — top area, warm hero glow.
    { id: "orb-a", size: 720, speed: 0.5, driftDuration: 64, driftDelay: 0 },
    // Hot-red orb — mid right.
    { id: "orb-b", size: 560, speed: 0.8, driftDuration: 88, driftDelay: -12 },
    // Smaller amber orb — bottom left.
    { id: "orb-c", size: 460, speed: 0.35, driftDuration: 78, driftDelay: -24 },
    // Deep amber wash — centre.
    { id: "orb-d", size: 640, speed: 0.6, driftDuration: 62, driftDelay: -6 },
  ];

  return (
    <motion.div
      className="motion-back__orbs"
      style={{
        x: reduced ? 0 : mouseX,
        y: reduced ? 0 : mouseY,
      }}
    >
      {ORBS.map((orb) => (
        <OrbItem
          key={orb.id}
          className={`orb--${orb.id}`}
          size={orb.size}
          scrollY={scrollY}
          speed={orb.speed}
          driftDuration={orb.driftDuration}
          driftDelay={orb.driftDelay}
        />
      ))}
    </motion.div>
  );
}
