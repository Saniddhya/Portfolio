import type { Metadata } from "next";
import { ProjectList } from "@/components/projects/ProjectList";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Work — Sanidhya Rathore",
  description:
    "Selected projects by Sanidhya Rathore — full-stack developer building interfaces you feel and systems you trust.",
};

export default function WorkPage() {
  return (
    <main className="pt-32">
      <section className="section" aria-label="All work">
        <div className="container">
          <div className="mb-12">
            <Eyebrow>All Work</Eyebrow>
            <h1 className="font-display text-4xl md:text-5xl xl:text-6xl font-semibold tracking-[-0.03em] mt-4">
              Selected projects
            </h1>
          </div>
          <ProjectList />
        </div>
      </section>
      <Footer />
    </main>
  );
}