"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { socials } from "@/data/socials";
import { useSoundContext } from "@/components/audio/SoundProvider";
import { useMagnetic } from "@/hooks/useMagnetic";

export function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { playClick, playHover } = useSoundContext();
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-reveal",
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

      // A soft neon halo behind the headline for the grand finale.
      gsap.fromTo(
        ".contact-halo",
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      data-section="contact"
      className="section"
      aria-label="Contact"
    >
      <div className="container text-center">
        <div className="contact-reveal mb-10">
          <Eyebrow>Get in touch</Eyebrow>
        </div>

        <div className="relative">
          <div className="contact-halo" aria-hidden="true" />
          <h2 className="contact-reveal relative font-display text-4xl md:text-6xl xl:text-8xl font-semibold tracking-[-0.03em] leading-[1.02]">
            Let's build something
            <br />
            <span className="glow-text">crazy together.</span>
          </h2>
        </div>

        <p className="contact-reveal mx-auto mt-8 max-w-xl text-muted text-lg leading-relaxed">
          Have a project, a role, or an idea that needs a builder with taste?
          My inbox is open — let's make it real.
        </p>

        <div className="contact-reveal mt-10">
          <a
            ref={ctaRef}
            href="mailto:rathorekuah@gmail.com"
            className="btn primary"
            data-cursor
            onClick={() => playClick()}
            onMouseEnter={playHover}
          >
            Start a project
            <span className="hero-cta-arrow" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>

        <div className="contact-reveal flex flex-col items-center gap-4 mt-16">
          <a
            href="mailto:rathorekuah@gmail.com"
            className="contact-link"
            onClick={() => playClick()}
            onMouseEnter={playHover}
          >
            rathorekuah@gmail.com
          </a>

          <div className="flex flex-wrap justify-center gap-6 mt-4">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  social.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="font-mono text-sm text-muted hover:text-accent2 transition-colors"
                onClick={() => playClick()}
                onMouseEnter={playHover}
              >
                {social.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;