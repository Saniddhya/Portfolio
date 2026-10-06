import { journey } from "@/data/journey";

/**
 * Founder trajectory.
 *
 * Framed as a progression of capability rather than a resume timeline — five
 * phases, each one building on the last. No impact metrics, since none are
 * verifiable from the public record.
 */
export default function Journey() {
  return (
    <section id="build" className="section" aria-labelledby="journey-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="journey-heading" className="display display-lg">
            Built by
            <br />
            building.
          </h2>
          <p className="lede max-w-[46ch]">
            Not a résumé — a progression. Each phase was a deliberate move from
            understanding a layer to owning what sits around it.
          </p>
        </div>

        <ol className="border-t border-line">
          {journey.map((phase) => (
            <li key={phase.index}>
              <article className="reveal group grid gap-4 border-b border-line py-8 transition-colors duration-500 hover:bg-panel/40 md:grid-cols-[100px_minmax(0,1fr)_minmax(0,1.1fr)] md:items-baseline md:gap-8 md:px-2">
                <div className="flex items-baseline gap-3">
                  <span className="mono text-[11px] text-accent/70">{phase.index}</span>
                  <span className="mono text-[11px] text-muted">{phase.label}</span>
                </div>

                <h3 className="display display-sm transition-transform duration-500 group-hover:translate-x-1">
                  {phase.title}
                </h3>

                <p className="body-text">{phase.body}</p>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}