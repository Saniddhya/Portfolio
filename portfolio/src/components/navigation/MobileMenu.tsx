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
  const rootRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const pathname = usePathname();
  const { playClick, playMenuOpen, playMenuClose } = useSoundContext();

  useEffect(() => {
    if (open) {
      playMenuOpen();
      const tl = gsap.timeline();
      tl.set(rootRef.current, { display: "flex", visibility: "visible" })
        .to(rootRef.current, { opacity: 1, duration: 0.4, ease: "power2.out" })
        .fromTo(
          listRef.current?.children ?? [],
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.08,
            ease: "power3.out",
          },
          "-=0.1",
        );
    } else {
      playMenuClose();
      const tl = gsap.timeline();
      tl.to(listRef.current?.children ?? [], {
        y: 24,
        opacity: 0,
        duration: 0.3,
        stagger: 0.04,
        ease: "power2.in",
      })
        .to(rootRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.in",
        })
        .set(rootRef.current, { display: "none", visibility: "hidden" });
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
    <div
      ref={rootRef}
      className="mobile-menu md:hidden"
      style={{ display: "none", visibility: "hidden" }}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
    >
      <nav aria-label="Mobile">
        <ul ref={listRef} className="flex flex-col gap-2">
          {MOBILE_LINKS.map((link) => (
            <li key={link.label}>
              <Link
                href={link.href}
                className="mobile-menu-link"
                onClick={(event) => handleClick(event, link.label)}
                tabIndex={open ? 0 : -1}
              >
                <span className="font-mono text-xs text-accent mr-3">
                  {link.number}
                </span>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
