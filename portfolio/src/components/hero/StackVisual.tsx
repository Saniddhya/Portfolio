"use client";
import { useRef, type MouseEvent } from "react";
import { gsap } from "@/lib/gsap";

const layers = [
  ["// 01 — interface", "UI Layer", "React · Next.js · TypeScript · Tailwind", "ui-layer"],
  ["// 02 — logic", "API Layer", "Python · FastAPI · REST · Auth", "api-layer"],
  ["// 03 — storage", "Data Layer", "PostgreSQL · Docker · CI/CD", "data-layer"],
];

const chips = ["React", "Next.js", "TypeScript", "Python", "FastAPI", "WebGL"];

export default function StackVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const tilt = (event: MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const rect = el.getBoundingClientRect();
    gsap.to(el, { rotateY: ((event.clientX - rect.left) / rect.width - .5) * 18, rotateX: -((event.clientY - rect.top) / rect.height - .5) * 12, duration: .6, ease: "power2.out" });
  };
  return <div className="stack-visual" onMouseMove={tilt} onMouseLeave={() => gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: .8 })} aria-label="Technology stack layers" role="img">
    <div ref={ref} className="stack-planes">
      {layers.map(([tag, name, tech, type]) => <div key={name} className={`stack-layer ${type}`}><span className="stack-layer-label">{tag}</span><strong>{name}</strong><span className="stack-layer-tech">{tech}</span></div>)}
    </div>
    {chips.map((chip, i) => (
      <span key={chip} className="stack-chip" style={{ "--i": i } as React.CSSProperties}>{chip}</span>
    ))}
  </div>;
}
