"use client";

import { useState } from "react";
import { stackGroups } from "@/data/capabilities";

/**
 * Technical constellation.
 *
 * Interactive rather than a keyword list: hovering or focusing a technology
 * reveals what it is actually used for. State is a single hovered name, and the
 * same information is rendered as always-visible text on touch devices where
 * there is no hover state.
 */
export default function Stack() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="systems" className="section" aria-labelledby="stack-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="stack-heading" className="display display-lg">
            The stack.
          </h2>
          <p className="lede max-w-[46ch]">
            Tools I reach for, and what each one is for. Hover a node to see it in
            context.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:gap-16">
          <div className="space-y-10">
            {stackGroups.map((group) => (
              <div key={group.label}>
                <h3 className="mono text-[11px] text-muted-2">{group.label}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(item.name)}
                        onMouseLeave={() => setActive(null)}
                        onFocus={() => setActive(item.name)}
                        onBlur={() => setActive(null)}
                        aria-describedby="stack-detail"
                        className={`mono border px-3.5 py-2 text-[11px] transition-all duration-300 ${
                          active === item.name
                            ? "border-accent bg-accent/10 text-fg"
                            : "border-line text-muted hover:border-line-strong hover:text-fg"
                        }`}
                      >
                        {item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* What the active technology is used for. */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="panel min-h-[190px]">
              <p className="eyebrow">What I use it for</p>

              <div id="stack-detail" aria-live="polite">
                {active ? (
                  <>
                    <p className="display display-sm mt-5">{active}</p>
                    <p className="body-text mt-4">
                      {stackGroups
                        .flatMap((g) => g.items)
                        .find((i) => i.name === active)?.use}
                    </p>
                  </>
                ) : (
                  <p className="body-text mt-5 text-muted-2">
                    Select a technology to see how I use it.
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}