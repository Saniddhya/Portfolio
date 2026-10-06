import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Flow from "@/components/ui/Flow";
import Footer from "@/components/sections/Footer";
import { getProject, projects } from "@/data/projects";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render every known project at build time. */
export async function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) return { title: "Project not found" };

  return {
    title: `${project.name} — Case Study`,
    description: project.tagline,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.name} — Sanidhya Rathore`,
      description: project.tagline,
      url: `/projects/${project.slug}`,
    },
  };
}

/** Full case study. Unknown slugs 404 rather than rendering an empty shell. */
export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) notFound();

  return (
    <>
      <main id="main" className="pt-32">
        <article className="section">
          <div className="container">
            <Link href="/#projects" className="mono link-line text-[11px] text-muted-2">
              ← All projects
            </Link>

            <header className="mt-10 border-t border-line pt-10">
              <p className="mono text-[11px] text-accent/70">
                {project.year} · {project.category} · {project.status}
              </p>

              <h1 className="display display-lg mt-6">{project.name}</h1>
              <p className="lede mt-6 max-w-[52ch]">{project.tagline}</p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  View on GitHub
                  <span className="btn-arrow" aria-hidden="true">
                    ↗
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary"
                  >
                    Live demo
                    <span className="btn-arrow" aria-hidden="true">
                      ↗
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                )}
              </div>
            </header>

            <div className="mt-20 grid gap-14 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)] lg:gap-20">
              <div className="space-y-14">
                <section aria-labelledby="pc-summary">
                  <h2 id="pc-summary" className="display display-sm">
                    Summary
                  </h2>
                  <p className="body-text mt-5 max-w-[62ch]">{project.description}</p>
                </section>

                <section aria-labelledby="pc-problem">
                  <h2 id="pc-problem" className="display display-sm">
                    The problem
                  </h2>
                  <p className="body-text mt-5 max-w-[62ch]">{project.problem}</p>
                </section>

                <section aria-labelledby="pc-approach">
                  <h2 id="pc-approach" className="display display-sm">
                    What I built
                  </h2>
                  <p className="body-text mt-5 max-w-[62ch]">{project.approach}</p>
                </section>

                <section aria-labelledby="pc-architecture">
                  <h2 id="pc-architecture" className="display display-sm">
                    Architecture
                  </h2>
                  <ul className="mt-6 space-y-4">
                    {project.architecture.map((line, i) => (
                      <li
                        key={line}
                        className="flex gap-4 text-[14px] leading-relaxed text-muted"
                      >
                        <span className="mono shrink-0 text-[10px] text-accent/70">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {line}
                      </li>
                    ))}
                  </ul>
                </section>

                <section aria-labelledby="pc-role">
                  <h2 id="pc-role" className="display display-sm">
                    My role
                  </h2>
                  <p className="body-text mt-5 max-w-[62ch]">{project.role}</p>
                </section>
              </div>

              <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
                {project.pipeline.length > 0 && (
                  <div className="panel">
                    <p className="eyebrow">Pipeline</p>
                    <div className="mt-6">
                      <Flow
                        label={`${project.name} pipeline`}
                        detail={false}
                        steps={project.pipeline.map((label) => ({ label }))}
                      />
                    </div>
                  </div>
                )}

                <div className="panel">
                  <p className="eyebrow">Technology</p>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="mono border border-line px-2.5 py-1 text-[10px] text-muted"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              </aside>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}