"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { gsap } from "@/lib/gsap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { experience } from "@/data/experience";

export function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.75", "end 0.65"],
  });
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.6,
  });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".timeline-item",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          stagger: 0.14,
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
    <section
      ref={sectionRef}
      id="experience"
      data-section="experience"
      className="section"
      aria-label="Experience timeline"
    >
      <div className="container">
        <div className="mb-12">
          <Eyebrow>Timeline</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl xl:text-5xl font-semibold tracking-[-0.02em] mt-4">
            The path here
          </h2>
        </div>

        <div ref={timelineRef} className="timeline">
          {/* Progress line that fills as you scroll. */}
          <div className="timeline-line" aria-hidden="true">
            <div className="timeline-line__base" />
            <motion.div className="timeline-line__fill" style={{ scaleY }} />
          </div>

          {experience.map((item) => (
            <article key={item.id} className="timeline-item">
              <div className="timeline-meta">
                <span className="timeline-period">{item.period}</span>
                <h3 className="timeline-role">{item.role}</h3>
                <span className="timeline-org">{item.org}</span>
              </div>

              <div className="timeline-card">
                <p>{item.summary}</p>
                <div className="tech-tag-row">
                  {item.tags.map((tag) => (
                    <span key={tag} className="tech-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;