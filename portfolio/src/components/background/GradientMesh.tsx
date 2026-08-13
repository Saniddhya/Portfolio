"use client";

import { useEffect, useRef, type MutableRefObject } from "react";

/**
 * GradientMesh
 * -------------
 * A hand-rolled WebGL liquid gradient mesh — the "movement background" for
 * the whole portfolio. A scrolling fbm-noise field is warped by time and the
 * cursor and blended through a red → orange → amber neon ramp, with a
 * cinematic top-down falloff + vignette so text stays readable.
 *
 * Why raw WebGL instead of Three.js? Same GPU path, zero dependency weight,
 * and the fragment shader is tiny — great for performance budgets.
 *
 * Performance guards:
 *  - Renders at half the CSS resolution (a blurred mesh looks identical).
 *  - `prefers-reduced-motion` → draws one static frame, no loop.
 *  - Pauses the animation loop while the tab is hidden.
 *  - No React state in the frame loop — everything goes through uniforms.
 */
const VERT = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;

uniform vec2  u_resolution;
uniform float u_time;
uniform vec2  u_mouse;
uniform float u_intensity;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 5; i++) {
    v += amp * noise(p);
    p = rot * p * 2.02 + vec2(0.7);
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;

  float t = u_time * 0.05;
  vec2 p = (uv - 0.5) * 2.0;
  p.x *= u_resolution.x / u_resolution.y;

  // Gentle cursor warp — the liquid bends toward the pointer.
  p += u_mouse * (0.55 + 0.4 * sin(u_time * 0.3));

  float n1 = fbm(p * 1.7 + vec2(t, -t * 0.7));
  float n2 = fbm(p * 3.1 - vec2(t * 1.2, t * 0.6));
  float n3 = fbm(p * 5.2 + vec2(t * 0.8, -t));

  // Neon ramp: hot red -> ember orange -> amber.
  vec3 red    = vec3(1.0, 0.18, 0.24);
  vec3 orange = vec3(1.0, 0.35, 0.08);
  vec3 amber  = vec3(1.0, 0.72, 0.22);

  vec3 col = mix(red, orange, smoothstep(0.25, 0.8, n1));
  col = mix(col, amber, smoothstep(0.45, 0.95, n2));
  col *= 0.35 + 0.85 * n3;

  // Cinematic lighting: light pools near the top, falls away downward.
  float falloff = 1.0 - uv.y;
  col *= 0.22 + 0.78 * falloff;

  // Vignette keeps the frame edges near-black.
  float d = length((uv - 0.5) * vec2(1.1, 1.25));
  col *= smoothstep(1.05, 0.3, d);

  col *= u_intensity;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("WebGL shader allocation failed");
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(`Shader compile error: ${log}`);
  }
  return shader;
}

export default function GradientMesh({
  intensityRef,
  reduced,
}: {
  intensityRef: MutableRefObject<number>;
  reduced: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    let program: WebGLProgram | null = null;
    try {
      const vs = compileShader(gl, gl.VERTEX_SHADER, VERT);
      const fs = compileShader(gl, gl.FRAGMENT_SHADER, FRAG);

      program = gl.createProgram();
      if (!program) throw new Error("Program allocation failed");
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(`Program link error: ${gl.getProgramInfoLog(program)}`);
      }
      gl.useProgram(program);
    } catch (err) {
      // WebGL is best-effort — silently fall back to the CSS orb layer.
      if (process.env.NODE_ENV !== "production") console.warn(err);
      return;
    }

    const uRes = gl.getUniformLocation(program, "u_resolution");
    const uTime = gl.getUniformLocation(program, "u_time");
    const uMouse = gl.getUniformLocation(program, "u_mouse");
    const uIntensity = gl.getUniformLocation(program, "u_intensity");

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const loc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.clearColor(0, 0, 0, 0);

    // Half-resolution render — the mesh is soft and blurry anyway.
    const scale = 0.5;
    let width = 0;
    let height = 0;
    let ctxScale = 1;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const mobile = window.matchMedia("(max-width: 768px)").matches;
      ctxScale = Math.min(window.devicePixelRatio || 1, mobile ? 1 : 1.5);
      canvas.width = Math.max(1, Math.floor(width * scale * ctxScale));
      canvas.height = Math.max(1, Math.floor(height * scale * ctxScale));
      canvas.style.width = "100%";
      canvas.style.height = "100%";
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const pointer = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const draw = (time: number) => {
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, time);
      gl.uniform2f(uMouse, pointer.x, pointer.y);
      gl.uniform1f(uIntensity, intensityRef.current);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    const start = performance.now();
    let raf = 0;
    const loop = (now: number) => {
      draw((now - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      draw(0); // single static frame, then stop.
    } else {
      raf = requestAnimationFrame(loop);
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        raf = requestAnimationFrame(loop);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteProgram(program);
      gl.deleteBuffer(buffer);
    };
  }, [intensityRef, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className="motion-back__mesh"
      aria-hidden="true"
    />
  );
}