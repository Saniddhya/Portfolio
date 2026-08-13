"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProjectList } from "@/components/projects/ProjectList";

export function Work() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".work-reveal",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 70%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="work" data-section="work" className="section" aria-label="Selected work">
      <div className="container">
        <div className="work-reveal flex items-end justify-between mb-12">
          <div>
            <Eyebrow>Selected Work</Eyebrow>
            <h2 className="font-display text-3xl md:text-4xl xl:text-5xl font-semibold tracking-[-0.02em] mt-4">
              Things I've built
            </h2>
          </div>
          <p className="hidden md:block font-mono text-xs text-muted max-w-xs text-right">
            Hover to glow — click through for the full case study.
          </p>
        </div>

        <div className="work-reveal">
          <ProjectList />
        </div>
      </div>
    </section>
  );
}

export default Work;