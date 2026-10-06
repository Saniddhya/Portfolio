/**
 * Device capability probe.
 *
 * Determines how much the WebGL layer is allowed to spend. Runs once on the
 * client, never on the server, and never re-evaluates per frame.
 */

export type Quality = "high" | "medium" | "low" | "static";

export interface Capabilities {
  quality: Quality;
  /** Device pixel ratio to hand the renderer, already clamped. */
  dpr: [number, number];
  particleCount: number;
  /** Skip post-processing entirely on anything but "high". */
  postProcessing: boolean;
  /** Only render when something changes (scroll, pointer, hover). */
  onDemand: boolean;
  reducedMotion: boolean;
  webglSupported: boolean;
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ?? canvas.getContext("webgl") ?? canvas.getContext("experimental-webgl");
    if (!gl) return false;

    // Release the probe context immediately so it doesn't count against the
    // browser's WebGL context limit.
    const lose = (gl as WebGLRenderingContext).getExtension("WEBGL_lose_context");
    lose?.loseContext();
    return true;
  } catch {
    return false;
  }
}

export function getCapabilities(): Capabilities {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!detectWebGL()) {
    return {
      quality: "static",
      dpr: [1, 1],
      particleCount: 0,
      postProcessing: false,
      onDemand: true,
      reducedMotion,
      webglSupported: false,
    };
  }

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const isMobile = window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 900;
  const isSmall = window.innerWidth < 768;

  // Low power: few cores, little memory, or a mobile GPU budget.
  const lowPower = cores <= 4 || memory <= 4;
  // "static" is the graceful no-3D state — still a designed page.
  if (reducedMotion || (isSmall && lowPower)) {
    return {
      quality: "static",
      dpr: [1, 1],
      particleCount: 0,
      postProcessing: false,
      onDemand: true,
      reducedMotion: true,
      webglSupported: true,
    };
  }

  if (lowPower) {
    return {
      quality: "low",
      dpr: [1, 1],
      particleCount: 90,
      postProcessing: false,
      onDemand: true,
      reducedMotion,
      webglSupported: true,
    };
  }

  if (isMobile) {
    return {
      quality: "medium",
      dpr: [1, 1.5],
      particleCount: 180,
      postProcessing: false,
      onDemand: true,
      reducedMotion,
      webglSupported: true,
    };
  }

  const cappedDpr = Math.min(window.devicePixelRatio, 2);

  return {
    quality: "high",
    dpr: [1, cappedDpr],
    particleCount: 420,
    postProcessing: true,
    onDemand: false,
    reducedMotion,
    webglSupported: true,
  };
}