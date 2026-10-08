import Link from "next/link";
import Flow from "@/components/ui/Flow";
import { getFeaturedProject, projects } from "@/data/projects";

/**
 * Projects.
 *
 * The flagship project gets the oversized case-study treatment; the rest form a
 * compact index. Every project links to a full detail route. Data comes from
 * src/data/projects.ts, where each entry is grounded in a real public repo.
 */
export default function Projects() {
  const featured = getFeaturedProject();
  const rest = projects.filter((p) => p.slug !== featured.slug);

  return (
    <section id="projects" className="section" aria-labelledby="projects-heading">
      <div className="container">
        <div className="section-head">
          <h2 id="projects-heading" className="display display-lg">
            Selected
            <br />
            work.
          </h2>
          <p className="lede max-w-[46ch]">
            Case studies rather than cards — the problem, the approach, and what
            the system actually does.
          </p>
        </div>

        {/* ---- Feature: 01 ---- */}
        <article className="reveal border-t border-line pt-10">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <span className="mono text-[11px] text-accent/70">PROJECT 01</span>
            <span className="mono text-[11px] text-muted-2">
              {featured.category} · {featured.year} · {featured.status}
            </span>
          </div>

          <div className="mt-6 grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
            <div>
              <h3 className="display display-lg">{featured.name}</h3>
              <p className="lede mt-5 max-w-[44ch]">{featured.tagline}</p>

              <div className="mt-8">
                <p className="eyebrow">Tech Stack</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {featured.technologies.map((tech) => (
                    <li key={tech} className="mono border border-line px-3 py-1.5 text-[10px] text-muted">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-10 space-y-8">
                <div>
                  <h4 className="mono text-[11px] text-accent/70">Problem</h4>
                  <p className="body-text mt-3 max-w-[58ch]">{featured.problem}</p>
                </div>
                <div>
                  <h4 className="mono text-[11px] text-accent/70">Approach</h4>
                  <p className="body-text mt-3 max-w-[58ch]">{featured.approach}</p>
                </div>
                <div>
                  <h4 className="mono text-[11px] text-accent/70">Architecture</h4>
                  <ul className="mt-4 space-y-3">
                    {featured.architecture.map((line) => (
                      <li key={line} className="flex gap-3 text-[14px] leading-relaxed text-muted">
                        <span
                          className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/70"
                          aria-hidden="true"
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href={`/projects/${featured.slug}`}
                  className="btn btn-primary"
                  data-cursor="project"
                >
                  View project
                  <span className="btn-arrow" aria-hidden="true">
                    →
                  </span>
                </Link>
                <a href={featured.github} target="_blank" rel="noopener noreferrer" className="btn">
                  GitHub
                  <span className="btn-arrow" aria-hidden="true">
                    ↗
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                {featured.liveDemo && (
                  <a href={featured.liveDemo} target="_blank" rel="noopener noreferrer" className="btn">
                    Live demo
                    <span className="btn-arrow" aria-hidden="true">
                      ↗
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>

            {/* The project's own decision pipeline, as a diagram */}
            <aside className="lg:pt-2">
              <div className="panel sticky top-24">
                <p className="eyebrow">Decision Pipeline</p>
                <div className="mt-6">
                  <Flow
                    label={`${featured.name} decision pipeline`}
                    detail={false}
                    steps={featured.pipeline.map((label) => ({ label }))}
                  />
                </div>
              </div>
            </aside>
          </div>
        </article>

        {/* ---- Index: the rest ---- */}
        {rest.length > 0 && (
          <div className="mt-24 border-t border-line pt-12">
            <p className="eyebrow">More Projects</p>

            <ul className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
              {rest.map((project, i) => (
                <li key={project.slug} className="bg-panel">
                  <Link
                    href={`/projects/${project.slug}`}
                    data-cursor="project"
                    className="group flex h-full flex-col p-8 transition-colors duration-500 hover:bg-bg-raise sm:p-10"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="mono text-[11px] text-accent/70">
                        {String(i + 2).padStart(2, "0")}
                      </span>
                      <span className="mono text-[10px] text-muted-2">
                        {project.year} · {project.status}
                      </span>
                    </div>

                    <h3 className="display display-sm mt-6 transition-transform duration-500 group-hover:translate-x-1">
                      {project.name}
                    </h3>

                    <p className="body-text mt-3 flex-1">{project.tagline}</p>

                    <ul className="mt-7 flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <li key={tech} className="mono border border-line px-2.5 py-1 text-[10px] text-muted-2">
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <span className="mono mt-7 inline-flex items-center gap-2 text-[11px] text-muted">
                      Read case study
                      <span className="btn-arrow" aria-hidden="true">
                        →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}