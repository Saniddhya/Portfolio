"use client";

import Link from "next/link";
import { useEffect, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { SoundToggle } from "@/components/audio/SoundToggle";
import { useSoundContext } from "@/components/audio/SoundProvider";
import { useMagnetic } from "@/hooks/useMagnetic";
import { scrollToId } from "@/lib/lenis";
import MobileMenu from "./MobileMenu";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const pathname = usePathname();
  const { playClick, playHover } = useSoundContext();
  const logoRef = useMagnetic<HTMLAnchorElement>(0.2);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = current?.target.id;
        if (id) setActiveSection(id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.4, 0.7] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [pathname]);

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, label: string) => {
    playClick();

    // If on home page, smooth scroll to section
    if (pathname === "/") {
      const href =
        NAV_LINKS.find((l) => l.label === label)?.href ?? "";
      if (href.includes("#")) {
        event.preventDefault();
        scrollToId(href.split("#")[1]);
      }
    }
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-[1000] transition-all duration-300 border-b",
          scrolled
            ? "backdrop-blur-md border-b border-line"
            : "border-b border-transparent",
        )}
        style={{ background: scrolled ? "rgba(8,6,7,0.82)" : "transparent" }}
      >
        <nav
          className="container flex items-center justify-between py-4"
          aria-label="Main navigation"
        >
          <Link
            ref={logoRef}
            href="/"
            className="font-display font-bold text-lg tracking-tight text-fg hover:text-accent transition-colors"
            onClick={() => {
              playClick();
              setMobileOpen(false);
            }}
            onMouseEnter={playHover}
          >
            SANIDHYA<span className="glow-text">.DEV</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="nav-link"
                    onClick={(event) => handleNavClick(event, link.label)}
                    onMouseEnter={playHover}
                    aria-current={activeSection === link.href.split("#")[1] ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <SoundToggle />
          </div>

          {/* Mobile hamburger */}
          <div className="flex md:hidden items-center gap-4">
            <SoundToggle />
            <button
              type="button"
              className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 cursor-pointer bg-transparent border-none"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <span
                className={cn(
                  "block w-6 h-0.5 bg-fg transition-all duration-300",
                  mobileOpen && "rotate-45 translate-y-2",
                )}
              />
              <span
                className={cn(
                  "block w-6 h-0.5 bg-fg transition-all duration-300",
                  mobileOpen && "opacity-0",
                )}
              />
              <span
                className={cn(
                  "block w-6 h-0.5 bg-fg transition-all duration-300",
                  mobileOpen && "-rotate-45 -translate-y-2",
                )}
              />
            </button>
          </div>
        </nav>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
