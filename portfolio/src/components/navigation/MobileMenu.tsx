"use client";

import Link from "next/link";
import { useEffect, useRef, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "@/lib/gsap";
import { scrollToId } from "@/lib/lenis";
import { useSoundContext } from "@/components/audio/SoundProvider";

const MOBILE_LINKS = [
  { label: "About", href: "/#about", number: "01" },
  { label: "Work", href: "/#work", number: "02" },
  { label: "Skills", href: "/#skills", number: "03" },
  { label: "Experience", href: "/#experience", number: "04" },
  { label: "Contact", href: "/#contact", number: "05" },
];

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  const backdropRef = useRef<HTMLDivElement | null>(null);
  const drawerRef = useRef<HTMLElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const pathname = usePathname();
  const { playClick, playMenuOpen, playMenuClose } = useSoundContext();

  // Lock body scroll while the drawer is open so the page can't scroll behind it.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const children = listRef.current?.children ?? [];

    if (open) {
      playMenuOpen();
      const tl = gsap.timeline();
      tl.set(backdropRef.current, { display: "block", visibility: "visible" })
        .set(drawerRef.current, { display: "flex", visibility: "visible" })
        .to(backdropRef.current, { opacity: 1, duration: 0.35, ease: "power2.out" }, 0)
        .fromTo(
          drawerRef.current,
          { xPercent: 100 },
          { xPercent: 0, duration: 0.5, ease: "power3.out" },
          0,
        )
        .fromTo(
          children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.06,
            ease: "power3.out",
          },
          0.1,
        );
    } else {
      playMenuClose();
      const tl = gsap.timeline();
      tl.to(children, {
        y: 24,
        opacity: 0,
        duration: 0.22,
        stagger: 0.03,
        ease: "power2.in",
      })
        .to(
          drawerRef.current,
          { xPercent: 100, duration: 0.35, ease: "power3.in" },
          "-=0.05",
        )
        .to(backdropRef.current, { opacity: 0, duration: 0.3, ease: "power2.in" }, "<")
        .set(drawerRef.current, { display: "none", visibility: "hidden" })
        .set(backdropRef.current, { display: "none", visibility: "hidden" });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => {
    onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, open]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>, label: string) => {
    playClick();
    onClose();

    if (pathname === "/") {
      const href = MOBILE_LINKS.find((l) => l.label === label)?.href ?? "";
      if (href.includes("#")) {
        event.preventDefault();
        scrollToId(href.split("#")[1]);
      }
    }
  };

  return (
    <>
      {/* Scrim behind the drawer — click anywhere to close */}
      <div
        ref={backdropRef}
        className="mobile-menu-backdrop md:hidden"
        style={{ display: "none", visibility: "hidden", opacity: 0 }}
        aria-hidden="true"
        onClick={onClose}
      />

      {/* Drawer that slides in from the right */}
      <aside
        ref={drawerRef}
        className="mobile-menu md:hidden"
        style={{ display: "none", visibility: "hidden" }}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className="mobile-menu__head">
          <span className="mobile-menu__brand">
            SANIDHYA<span className="glow-text">.DEV</span>
          </span>
          <button
            type="button"
            className="mobile-menu__close"
            onClick={() => {
              playClick();
              onClose();
            }}
            aria-label="Close menu"
            tabIndex={open ? 0 : -1}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <nav aria-label="Mobile">
          <ul ref={listRef} className="mobile-menu__list">
            {MOBILE_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="mobile-menu-link"
                  onClick={(event) => handleClick(event, link.label)}
                  tabIndex={open ? 0 : -1}
                >
                  <span className="mobile-menu-link__num">{link.number}</span>
                  <span className="mobile-menu-link__label">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu__foot">
          <a
            href="mailto:rathorekuah@gmail.com"
            className="mobile-menu__mail"
            tabIndex={open ? 0 : -1}
          >
            hello@sanidhya.dev
          </a>
        </div>
      </aside>
    </>
  );
}
