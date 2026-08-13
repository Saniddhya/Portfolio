"use client";

import Link from "next/link";
import { useSoundContext } from "@/components/audio/SoundProvider";

export function Footer() {
  const { playClick, playHover } = useSoundContext();
  const year = new Date().getFullYear();

  return (
    <footer className="footer" aria-label="Footer">
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-mono text-xs text-muted">
          © {year} Sanidhya Rathore. Built with React, Next.js & GSAP.
        </p>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
            onClick={() => playClick()}
            onMouseEnter={playHover}
          >
            Home
          </Link>
          <a
            href="mailto:Rathorekuah@gmail.com"
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
            onClick={() => playClick()}
            onMouseEnter={playHover}
          >
            Email
          </a>
          <a
            href="https://github.com/saniddhya"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-muted hover:text-accent transition-colors"
            onClick={() => playClick()}
            onMouseEnter={playHover}
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;