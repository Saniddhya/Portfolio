import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";

interface ButtonProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  type?: "button" | "submit" | "reset";
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export function Button({
  variant = "primary",
  children,
  className,
  href,
  onClick,
  onMouseEnter,
  type = "button",
  target,
  rel,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const classes = cn("btn", `btn-${variant}`, className);

  if (href) {
    const isExternal = href.startsWith("http") || href.startsWith("mailto");
    return (
      <Link
        href={href}
        className={classes}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        target={target}
        rel={rel || (isExternal ? "noopener noreferrer" : undefined)}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}