"use client";

import Image from "next/image";
import Link from "next/link";
import type { StaticImageData } from "next/image";
import type { Project } from "@/data/projects";
import { useSoundContext } from "@/components/audio/SoundProvider";

import crmPreview from "./img/CRM.jpeg";
import lockPreview from "./img/Lock.jpeg";
import cropPreview from "./img/Crop.jpeg";
import dataStudyPreview from "./img/Data_Study.jpeg";

/** Per-project neon tint for the preview tile. */
const TINTS: Record<string, string> = {
  "01": "red",
  "02": "orange",
  "03": "amber",
  "04": "red",
};

/** Per-project preview image shown inside the tile. */
const PREVIEW_IMAGES: Record<string, StaticImageData> = {
  "01": crmPreview,
  "02": lockPreview,
  "03": cropPreview,
  "04": dataStudyPreview,
};

export function ProjectItem({ project }: { project: Project }) {
  const { playClick, playHover } = useSoundContext();

  return (
    <Link
      href={`/work/${project.slug}`}
      className="project-card group"
      onMouseEnter={() => playHover()}
      onClick={() => playClick()}
      aria-label={`View case study: ${project.title}`}
    >
      <div
        className="project-preview"
        data-tint={TINTS[project.id] ?? "orange"}
      >
        {PREVIEW_IMAGES[project.id] && (
          <Image
            src={PREVIEW_IMAGES[project.id]}
            alt={`${project.title} preview`}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="project-preview-img"
          />
        )}
        <div className="project-preview-glow" aria-hidden="true" />
        <span className="project-preview-index">
          {project.id} / CASE STUDY
        </span>
        <span className="project-preview-title">{project.title}</span>
      </div>

      <div className="project-card-body">
        <p className="project-card-desc mb-5">{project.description}</p>

        <div className="tech-tag-row">
          {project.technologies.map((tech) => (
            <span key={tech} className="tech-tag">
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-5 pt-5 flex items-center justify-between border-t border-line">
          <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent2">
            View case study
          </span>
          <span className="project-card-arrow" aria-hidden="true">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17 17 7" />
              <path d="M7 7h10v10" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}

export default ProjectItem;