import { principles } from "@/data/journey";

/** Editorial principles — the product-thinking argument. */
export default function Principles() {
  return (
    <section className="section" aria-labelledby="principles-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="principles-heading" className="display display-lg">
            The way
            <br />
            I build.
          </h2>
          <p className="lede max-w-[46ch]">
            Three principles that decide what gets built, and what gets thrown
            away before it wastes a month.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle.index} className="reveal bg-panel p-8 sm:p-10">
              <span className="mono text-[11px] text-accent/70">{principle.index}</span>
              <h3 className="display display-sm mt-6">{principle.title}</h3>
              <p className="body-text mt-4">{principle.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}