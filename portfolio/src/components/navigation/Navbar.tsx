"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { navSections } from "@/data/profile";

/** Sticky nav: scroll progress hairline, active section, focus-trapped overlay. */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>("");
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Batched into one rAF so scrolling never re-renders per pixel.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setScrolled(y > 24);
        setProgress(max > 0 ? Math.min(1, y / max) : 0);
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  // Active section via IntersectionObserver — no scroll maths, no jank.
  useEffect(() => {
    const sections = navSections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6] },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Close on Escape, restore focus, lock scroll while the overlay is open.
  useEffect(() => {
    if (!menuOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    overlayRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const go = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <>
      <header
        className={`no-print fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled ? "border-b border-line bg-bg/80 backdrop-blur-xl" : "border-b border-transparent"
        }`}
      >
        <nav className="container flex h-16 items-center justify-between" aria-label="Primary">
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mono text-[12px] tracking-[0.2em] text-fg"
          >
            SANIDHYA.DEV
          </a>

          <ul className="hidden items-center gap-7 lg:flex">
            {navSections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    go(section.id);
                  }}
                  aria-current={active === section.id ? "true" : undefined}
                  className={`mono flex items-baseline gap-1.5 text-[11px] transition-colors duration-300 ${
                    active === section.id ? "text-fg" : "text-muted-2 hover:text-fg"
                  }`}
                >
                  <span className="text-accent/70">{section.index}</span>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/saniddhya"
              target="_blank"
              rel="noopener noreferrer"
              className="btn hidden !px-4 !py-2 sm:inline-flex"
            >
              GitHub
              <span className="btn-arrow" aria-hidden="true">
                ↗
              </span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>

            <button
              ref={toggleRef}
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              className="mono flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg lg:hidden"
            >
              <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
              <span aria-hidden="true" className="flex flex-col gap-1">
                <span
                  className={`block h-px w-4 bg-current transition-transform duration-300 ${
                    menuOpen ? "translate-y-[2.5px] rotate-45" : ""
                  }`}
                />
                <span
                  className={`block h-px w-4 bg-current transition-transform duration-300 ${
                    menuOpen ? "-translate-y-[2.5px] -rotate-45" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </nav>

        <div className="h-px w-full bg-line/60" aria-hidden="true">
          <div
            className="h-px bg-accent transition-[width] duration-150 ease-out"
            style={{ width: `${progress * 100}%` }}
          />
        </div>
      </header>
      {menuOpen && (
        <div
          ref={overlayRef}
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col justify-between bg-bg px-6 pb-10 pt-24 lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {navSections.map((section) => (
                <li key={section.id} className="border-b border-line">
                  <a
                    href={`#${section.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(section.id);
                    }}
                    className="flex items-baseline gap-4 py-5"
                  >
                    <span className="mono text-[11px] text-accent/70">{section.index}</span>
                    <span className="display display-sm">{section.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href="https://github.com/saniddhya"
            target="_blank"
            rel="noopener noreferrer"
            className="mono text-[11px] text-muted"
          >
            GitHub ↗
          </a>
        </div>
      )}
    </>
  );
}