import IntelligenceCore from "@/components/three/IntelligenceCore";
import { profile } from "@/data/profile";

/**
 * Hero.
 *
 * Split composition on desktop, stacked on mobile. The WebGL layer is a client
 * island; everything that carries meaning is server-rendered HTML beside it, so
 * the section reads correctly with no JavaScript and for screen readers.
 */
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28"
      aria-labelledby="hero-heading"
    >
      <div className="container relative w-full">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-10">
          {/* ---- Copy ---- */}
          <div className="order-2 lg:order-1">
            <p className="eyebrow mb-7 flex flex-wrap items-center gap-x-3 gap-y-1">
              <span>{profile.name}</span>
              <span className="h-px w-6 bg-line-strong" aria-hidden="true" />
              <span>{profile.shortRole}</span>
            </p>

            <h1 id="hero-heading" className="display display-xl">
              Building
              <br />
              intelligence
              <br />
              <span className="text-accent">into products.</span>
            </h1>

            <p className="lede mt-8 max-w-[46ch]">
              I build AI-powered products and full-stack systems from interface to
              infrastructure.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href="#projects" className="btn btn-primary" data-cursor="project">
                Explore my work
                <span className="btn-arrow" aria-hidden="true">
                  ↓
                </span>
              </a>
              <a
                href="https://github.com/saniddhya"
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                GitHub
                <span className="btn-arrow" aria-hidden="true">
                  ↗
                </span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </div>

            <p className="mono mt-12 flex items-center gap-2 text-muted-2">
              <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
              Currently building
              <span className="text-muted">intelligent financial infrastructure</span>
            </p>
          </div>

          {/* ---- Visualisation ---- */}
          <div className="order-1 lg:order-2">
            <IntelligenceCore
              className="aspect-square w-full max-w-[520px] justify-self-center lg:max-w-none"
              hud={[
                { label: "System", value: "Online" },
                { label: "AI", value: "Active" },
                { label: "Stack", value: "Full-stack" },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-7">
        <div className="container flex justify-center">
          <p className="mono flex flex-col items-center gap-2 text-muted-2">
            Scroll to explore
            <span aria-hidden="true">↓</span>
          </p>
        </div>
      </div>
    </section>
  );
}