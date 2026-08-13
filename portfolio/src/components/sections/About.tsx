"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useSpotlight } from "@/hooks/useSpotlight";

const IDENTITY = [
  {
    tag: "The Journey",
    title: "Self-built, honestly",
    text: "From raw datasets to full products, every project has taught me to value structure as much as spark.",
  },
  {
    tag: "The Thinking",
    title: "Design-aware engineering",
    text: "I treat motion, contrast and micro-interactions as first-class requirements — not polish bolted on after.",
  },
  {
    tag: "The Edge",
    title: "One mind, whole stack",
    text: "A React frontend and a Python backend speaking the same language: because I build both, nothing gets lost.",
  },
];

export function About() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const card1 = useRef<HTMLDivElement | null>(null);
  const card2 = useRef<HTMLDivElement | null>(null);
  const card3 = useRef<HTMLDivElement | null>(null);
  useSpotlight(card1);
  useSpotlight(card2);
  useSpotlight(card3);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-reveal",
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
    <section
      ref={sectionRef}
      id="about"
      data-section="about"
      className="section"
      aria-label="About"
    >
      <div className="container">
        <div className="about-reveal mb-12">
          <Eyebrow>About / Identity</Eyebrow>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="about-reveal font-display text-3xl md:text-4xl xl:text-5xl font-semibold leading-tight tracking-[-0.02em] text-fg mb-8">
              Meet the mind behind
              <br />
              <span className="glow-text">the work.</span>
            </h2>
            <div className="about-reveal space-y-5 text-muted text-lg leading-relaxed">
              <p>
                I'm Sanidhya — a full-stack developer and creative
                technologist based in Pune, India. I live where interface
                craft meets engineering depth: pixel-perfect React and
                Next.js frontends, backed by Python, FastAPI, and PostgreSQL
                systems built to hold real weight.
              </p>
              <p>
                What sets me apart is the seamlessness. Because I design the
                experience and build the architecture, nothing dissolves
                between the two. Motion is deliberate, markup is accessible,
                and the code stays clean, tested, and fast.
              </p>
              <p className="font-mono text-sm text-muted-2">
                Currently open to freelance projects, collaborations, and
                full-time roles.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {IDENTITY.map((item, i) => {
              const refs = [card1, card2, card3];
              return (
                <div
                  key={item.tag}
                  ref={refs[i]}
                  className="capability-card about-reveal"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent2">
                    {item.tag}
                  </span>
                  <h3 className="capability-card-title mt-2">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 text-muted text-[14.5px] leading-relaxed">
                    {item.text}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;