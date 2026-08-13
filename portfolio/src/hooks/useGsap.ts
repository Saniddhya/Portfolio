"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Scoped GSAP animation hook using gsap.context to prevent leaks.
 */
export function useGsap(
  callback: (ctx: gsap.Context, scope: Element) => void,
  deps: React.DependencyList = [],
) {
  const scopeRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    const scope = scopeRef.current;
    if (!scope) return;

    const ctx = gsap.context(() => {
      callback(ctx, scope);
    }, scope);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}