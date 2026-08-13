"use client";

import type { ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  onMouseEnter?: () => void;
  "aria-label"?: string;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  onClick,
  onMouseEnter,
  "aria-label": ariaLabel,
}: MagneticButtonProps) {
  const ref = useMagnetic<HTMLButtonElement>(strength);

  return (
    <button
      ref={ref}
      type="button"
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}