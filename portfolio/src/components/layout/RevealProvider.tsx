"use client";

import { useEffect } from "react";

/**
 * Progressive scroll reveal.
 *
 * Adds `js-reveal` to <html> only after confirming JS is running and motion is
 * allowed. Until then the CSS keeps `.reveal` fully visible, so content is never
 * trapped at opacity 0 if this fails. Elements are un-hidden as they enter the
 * viewport and the observer disconnects once everything has been seen.
 */
export default function RevealProvider() {
  useEffect(() => {
    const root = document.documentElement;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    root.classList.add("js-reveal");

    const targets = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (targets.length === 0) {
      root.classList.remove("js-reveal");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
    );

    targets.forEach((el) => observer.observe(el));

    return () => {
      observer.disconnect();
      root.classList.remove("js-reveal");
    };
  }, []);

  return null;
}