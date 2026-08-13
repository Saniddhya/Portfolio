import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Footer } from "@/components/sections/Footer";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found — Sanidhya Rathore",
    };
  }

  return {
    title: `${project.title} — Sanidhya Rathore`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="pt-32">
      <article className="section" aria-label={`${project.title} case study`}>
        <div className="container">
          {/* Header */}
          <div className="mb-16">
            <Link
              href="/work"
              className="font-mono text-xs text-muted hover:text-accent transition-colors mb-8 inline-block"
            >
              ← Back to all work
            </Link>
            <div className="mb-6">
              <Eyebrow>Case Study — {project.id}</Eyebrow>
            </div>
            <h1 className="font-display text-4xl md:text-5xl xl:text-6xl font-semibold tracking-[-0.03em] mb-6">
              {project.title}
            </h1>
            <p className="text-muted text-lg md:text-xl max-w-2xl leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tech stack */}
          <div className="mb-16">
            <h2 className="font-display text-xl font-semibold mb-4">
              Technology Stack
            </h2>
            <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex w-full items-center justify-center rounded-full border border-line bg-panel/40 px-3 py-2 text-center font-mono text-xs text-muted"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Problem */}
          {project.problem && (
            <div className="mb-16">
              <h2 className="font-display text-xl font-semibold mb-4">
                The Problem
              </h2>
              <p className="text-muted text-lg leading-relaxed max-w-2xl">
                {project.problem}
              </p>
              
            </div>
          )}

          {/* Solution */}
          {project.solution && (
            <div className="mb-16">
              <h2 className="font-display text-xl font-semibold mb-4">
                The Solution
              </h2>
              <p className="text-muted text-lg leading-relaxed max-w-2xl">
                {project.solution}
              </p>
            </div>
          )}

          {/* Architecture */}
          {project.architecture && project.architecture.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-xl font-semibold mb-4">
                Architecture
              </h2>
              <ul className="space-y-3">
                {project.architecture.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-muted text-lg"
                  >
                    <span
                      className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent2 flex-shrink-0"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Results placeholder */}
          {project.results && project.results.length > 0 && (
            <div className="mb-16">
              <h2 className="font-display text-xl font-semibold mb-4">
                Results
              </h2>
              <ul className="space-y-3">
                {project.results.map((result) => (
                  <li
                    key={result}
                    className="flex items-start gap-3 text-muted text-lg"
                  >
                    <span
                      className="mt-2.5 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0"
                      aria-hidden="true"
                    />
                    {result}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Links */}
          <div className="flex flex-wrap gap-4">
            {project.liveDemo && (
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
                className="btn primary"
              >
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}
