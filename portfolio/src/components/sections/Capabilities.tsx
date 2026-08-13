"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { skillCategories } from "@/data/skills";

export function Capabilities() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".capability-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
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
    <section
      ref={sectionRef}
      id="stack"
      data-section="stack"
      className="section"
      aria-label="Capabilities"
    >
      <div className="container">
        <div className="mb-12">
          <Eyebrow>Capabilities</Eyebrow>
          <h2 className="font-display text-3xl md:text-4xl xl:text-5xl font-semibold tracking-[-0.02em] mt-4">
            What I work with
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <div key={category.title} className="capability-card">
              <h3 className="capability-card-title">{category.title}</h3>
              <ul className="capability-list">
                {category.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Capabilities;