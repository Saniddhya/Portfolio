import { getActivity } from "@/lib/projects";

/**
 * Building in public.
 *
 * Real GitHub activity, fetched server-side with a one-hour cache. If the API is
 * unreachable the section renders a quiet, honest placeholder — never an error,
 * never a spinner that never resolves.
 */
export default async function Activity() {
  const activity = await getActivity();

  return (
    <section className="section" aria-labelledby="activity-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="activity-heading" className="display display-lg">
            Building
            <br />
            in public.
          </h2>
          <p className="lede max-w-[46ch]">
            {activity.live
              ? "Pulled directly from the public GitHub record — no screenshots, no claims."
              : "Live activity is unavailable right now. The GitHub profile is the source of truth."}
          </p>
        </div>

        {activity.live ? (
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.6fr)] lg:gap-16">
            <div>
              <p className="eyebrow">Recent Repositories</p>
              <ul className="mt-6 border-t border-line">
                {activity.recentRepos.map((repo) => (
                  <li key={repo.name} className="border-b border-line">
                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex flex-col gap-1 py-5 transition-colors duration-300 hover:bg-panel/40 md:flex-row md:items-baseline md:justify-between md:gap-6 md:px-2"
                    >
                      <span className="flex items-baseline gap-3">
                        <span className="mono text-[11px] text-accent/70">↗</span>
                        <span className="text-[15px] text-fg transition-transform duration-500 group-hover:translate-x-1">
                          {repo.name}
                        </span>
                      </span>

                      <span className="mono text-[10px] text-muted-2 md:text-right">
                        {[repo.language, new Date(repo.pushed_at).getFullYear()]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <aside>
              <p className="eyebrow">Languages</p>
              <ul className="mt-6 space-y-3">
                {activity.languages.map((lang) => (
                  <li key={lang.language} className="flex items-baseline justify-between gap-4">
                    <span className="text-[14px] text-muted">{lang.language}</span>
                    <span className="mono text-[10px] text-muted-2">{lang.count}</span>
                  </li>
                ))}
              </ul>

              <p className="body-text mt-8 text-[13px]">
                {activity.totalRepos} public repositories.
              </p>
            </aside>
          </div>
        ) : (
          <a
            href="https://github.com/saniddhya"
            target="_blank"
            rel="noopener noreferrer"
            className="btn"
          >
            View GitHub profile
            <span className="btn-arrow" aria-hidden="true">
              ↗
            </span>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        )}
      </div>
    </section>
  );
}