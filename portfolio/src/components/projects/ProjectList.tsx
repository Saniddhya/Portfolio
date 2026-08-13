"use client";

import { projects } from "@/data/projects";
import { ProjectItem } from "./ProjectItem";

export function ProjectList() {
  return (
    <div className="projects-grid">
      {projects.map((project) => (
        <ProjectItem key={project.slug} project={project} />
      ))}
    </div>
  );
}

export default ProjectList;