import { capabilities } from "@/data/capabilities";

/**
 * What I build.
 *
 * Four capability groups with their underlying technologies. No skill
 * percentages — technical maturity is better evidenced by the work itself than
 * by an invented number.
 */
export default function Capabilities() {
  return (
    <section className="section" aria-labelledby="capabilities-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="capabilities-heading" className="display display-lg">
            What I build.
          </h2>
          <p className="lede max-w-[46ch]">
            Four areas where the work overlaps — which is the point. A system that
            spans more than one of these is where the real engineering lives.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {capabilities.map((group) => (
            <article
              key={group.index}
              className="reveal group relative bg-panel p-8 transition-colors duration-500 hover:bg-bg-raise sm:p-10"
            >
              <span className="mono text-[11px] text-accent/70">{group.index}</span>

              <h3 className="display display-sm mt-5 transition-transform duration-500 group-hover:translate-x-1">
                {group.title}
              </h3>

              <p className="body-text mt-4 max-w-[40ch]">{group.summary}</p>

              <ul className="mt-7 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="mono border border-line px-3 py-1.5 text-[10px] text-muted transition-colors duration-300 group-hover:border-line-strong group-hover:text-fg"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}