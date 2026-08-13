"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { gsap } from "@/lib/gsap";

import { Eyebrow } from "@/components/ui/Eyebrow";
import {
  innerOrbitSkills,
  outerOrbitSkills,
  proficiencySkills,
} from "@/data/skills";

type OrbitStyle = CSSProperties & {
  "--a"?: string;
};

interface SkillBarProps {
  name: string;
  level: number;
}

function SkillBar({ name, level }: SkillBarProps) {
  return (
    <div className="skill-bar">
      <div className="skill-bar-head">
        <span className="skill-bar-name">{name}</span>

        <span className="skill-bar-percent">
          {level}%
        </span>
      </div>

      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{ "--level": `${level}%` } as CSSProperties}
        />
      </div>
    </div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const bars = section.querySelectorAll<HTMLElement>(".skill-bar-fill");

      gsap.fromTo(
        bars,
        {
          scaleX: 0,
        },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      data-section="skills"
      className="section"
      aria-label="Skills and technologies"
    >
      <div className="container">
        {/* =========================
            SECTION HEADER
        ========================== */}
        <div className="mb-12">
          <Eyebrow>Capabilities</Eyebrow>

          <h2 className="font-display text-3xl md:text-4xl xl:text-5xl font-semibold tracking-[-0.02em] mt-4">
            The stack I live in
          </h2>
        </div>

        {/* =========================
            CONTENT
        ========================== */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* =========================
              SKILL PROFICIENCY
          ========================== */}
          <div className="space-y-6">
            {proficiencySkills.map((skill) => (
              <SkillBar
                key={skill.name}
                name={skill.name}
                level={skill.level}
              />
            ))}
          </div>

          {/* =========================
              ORBIT SYSTEM
          ========================== */}
          <div className="relative flex items-center justify-center">
            <div
              className="orbit-stage"
              aria-label="Technologies I work with"
            >
              {/* Outer ring */}
              <div
                className="orbit-ring orbit-ring--outer"
                aria-hidden="true"
              />

              {/* Inner ring */}
              <div
                className="orbit-ring orbit-ring--inner"
                aria-hidden="true"
              />

              {/* =========================
                  OUTER ORBIT
              ========================== */}
              <div className="orbit-group orbit-group--outer">
                {outerOrbitSkills.map((skill, index) => {
                  const angle =
                    (360 / outerOrbitSkills.length) * index;

                  const style: OrbitStyle = {
                    "--a": `${angle}deg`,
                  };

                  return (
                    <div
                      key={skill}
                      className="orbit-chip"
                      style={style}
                    >
                      {skill}
                    </div>
                  );
                })}
              </div>

              {/* =========================
                  INNER ORBIT
              ========================== */}
              <div className="orbit-group orbit-group--inner">
                {innerOrbitSkills.map((skill, index) => {
                  const angle =
                    (360 / innerOrbitSkills.length) * index;

                  const style: OrbitStyle = {
                    "--a": `${angle}deg`,
                  };

                  return (
                    <div
                      key={skill}
                      className="orbit-chip orbit-chip--inner"
                      style={style}
                    >
                      {skill}
                    </div>
                  );
                })}
              </div>

              {/* =========================
                  CENTER CORE
              ========================== */}
              <div className="orbit-core">
                <span>
                  Creative
                  <br />
                  Engine
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Skills;