
import type { Metadata } from "next";

import { Eyebrow } from "@/components/ui/Eyebrow";
import { Footer } from "@/components/sections/Footer";
import { skillCategories } from "@/data/skills";

export const metadata: Metadata = {
  title: "About — Sanidhya Rathore",
  description:
    "About Sanidhya Rathore — full-stack developer based in Pune, India, building interfaces you feel and systems you trust.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          {/* Header */}
          <div className="mb-7">
            <Eyebrow>About</Eyebrow>

            <h1 className="mt-3 font-display text-4xl font-semibold leading-none md:text-5xl lg:text-6xl">
              Sanidhya Rathore
            </h1>

            <p className="mt-3 font-mono text-xs uppercase tracking-wider text-muted">
              Pune, India — Full-Stack Developer
            </p>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_300px]">
            {/* About Text */}
            <div className="max-w-2xl space-y-4 text-base leading-relaxed text-muted">
              <p>
                I'm a full-stack developer who cares about the details that
                make software feel deliberate — smooth motion, accessible
                markup, clean architecture, and performant code.
              </p>

              <p>
                On the frontend, I work with React, Next.js, TypeScript, and
                Tailwind CSS to build polished, responsive interfaces. On the
                backend, I build robust APIs with Python, FastAPI, and
                PostgreSQL, containerized with Docker and deployed with CI/CD.
              </p>

              <p>
                I'm currently available for freelance projects, collaborations,
                and full-time roles.
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-3">
              {skillCategories.map((category) => (
                <div
                  key={category.title}
                  className="capability-card"
                >
                  <h2 className="capability-card-title">
                    {category.title}
                  </h2>

                  <ul className="capability-list">
                    {category.skills.map((skill) => (
                      <li key={skill}>{skill}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
