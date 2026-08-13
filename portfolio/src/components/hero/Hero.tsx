"use client";

import Link from "next/link";
import { useEffect, useRef, type MouseEvent } from "react";
import { gsap } from "@/lib/gsap";
import { useSoundContext } from "@/components/audio/SoundProvider";
import { useMagnetic } from "@/hooks/useMagnetic";
import { scrollToId } from "@/lib/lenis";
import StackVisual from "./StackVisual";

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { playClick, playHover } = useSoundContext();
  const workRef = useMagnetic<HTMLAnchorElement>(0.35);
  const hireRef = useMagnetic<HTMLAnchorElement>(0.3);

  const scrollTo = (event: MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    playClick();
    scrollToId(id);
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const start = () =>
      gsap.context(() => {
        gsap.to(".hero-line-inner", {
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power4.out",
        });
        gsap.to(".hero-fade", {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.35,
          stagger: 0.1,
          ease: "power3.out",
        });
      }, section);
    let context: gsap.Context | undefined;
    const onLoaded = () => {
      context = start();
    };
    window.addEventListener("preloader-complete", onLoaded, { once: true });
    const timeout = window.setTimeout(() => {
      if (!context) context = start();
    }, 2600);
    return () => {
      window.clearTimeout(timeout);
      context?.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="hero"
      data-section="hero"
      className="hero"
      aria-label="Introduction"
    >
      <div className="container hero-grid">
        <div>
          <div className="hero-fade opacity-0">
            <span className="badge-dot" aria-hidden="true" />
            <span className="eyebrow">
              Full-stack developer + creative technologist
            </span>
          </div>

          <h1 className="hero-title">
            <span className="hero-line">
              <span className="hero-line-inner">Crafting digital</span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner">experiences that</span>
            </span>
            <span className="hero-line">
              <span className="hero-line-inner">
                <span className="glow-text">feel alive.</span>
              </span>
            </span>
          </h1>

          <p className="hero-fade hero-sub opacity-0">
            I design and build motion-rich, high-performance products in React
            &amp; Next.js — then wire them to Python systems built to hold
            weight. One person, the whole stack.
          </p>

          <div className="hero-fade hero-cta opacity-0">
            <Link
              ref={workRef}
              href="#work"
              className="btn primary"
              onClick={(event) => scrollTo(event, "work")}
              onMouseEnter={playHover}
            >
              View Work
              <span className="hero-cta-arrow" aria-hidden="true">
                →
              </span>
            </Link>
            <Link
              ref={hireRef}
              href="#contact"
              className="btn"
              onClick={(event) => scrollTo(event, "contact")}
              onMouseEnter={playHover}
            >
              Hire Me
            </Link>
          </div>
        </div>

        <StackVisual />
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span className="hero-scroll-track" />
        <em>scroll</em>
      </div>
    </section>
  );
}
