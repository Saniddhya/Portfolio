"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useSoundContext } from "@/components/audio/SoundProvider";

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const barFillRef = useRef<HTMLDivElement | null>(null);
  const percentRef = useRef<HTMLSpanElement | null>(null);
  const labelRef = useRef<HTMLDivElement | null>(null);
  const { playTransition } = useSoundContext();

  useEffect(() => {
    const root = rootRef.current;
    const barFill = barFillRef.current;
    const percentEl = percentRef.current;
    const labelEl = labelRef.current;

    if (!root || !barFill || !percentEl || !labelEl) return;

    let current = 0;
    const target = 100;
    const duration = 1200; // ms — keep the loading snappy
    const start = performance.now();

    const raf = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(elapsed / duration, 1);
      // ease-out
      current = Math.round(target * (1 - Math.pow(1 - t, 3)));
      barFill.style.width = `${current}%`;
      percentEl.textContent = String(current);

      if (t < 1) {
        requestAnimationFrame(raf);
      } else {
        // Done — slide the preloader away and trigger hero intro
        playTransition();

        gsap.to(root, {
          yPercent: -100,
          duration: 0.8,
          ease: "power4.inOut",
          onComplete: () => setVisible(false),
        });

        gsap.to(barFill, {
          opacity: 0,
          duration: 0.4,
          ease: "power2.in",
        });
        gsap.to(labelEl, {
          opacity: 0,
          y: -12,
          duration: 0.3,
          ease: "power2.in",
        });

        // Dispatch an event the Hero listens for to begin its intro
        window.dispatchEvent(new CustomEvent("preloader-complete"));
      }
    };

    requestAnimationFrame(raf);

    return () => {
      // no-op cleanup
    };
  }, [playTransition]);

  if (!visible) return null;

  return (
    <div className="preloader" ref={rootRef} aria-hidden="true">
      <div className="preloader-label" ref={labelRef}>
        Compiling interface
      </div>
      <div className="preloader-bar">
        <div className="preloader-bar-fill" ref={barFillRef} />
      </div>
      <span className="preloader-percent" ref={percentRef}>
        0
      </span>
    </div>
  );
}