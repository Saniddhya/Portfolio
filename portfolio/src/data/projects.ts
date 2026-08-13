export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  previewLabel: string;
  slug: string;
  problem?: string;
  solution?: string;
  architecture?: string[];
  screenshots?: string[];
  results?: string[];
  liveDemo?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: "01",
    title: "CRM Platform",
    description:
      "A full-stack customer relationship management platform with role-based access control, real-time reporting, and automated workflows.",
    technologies: ["React", "Next.js", "TypeScript", "FastAPI", "PostgreSQL"],
    previewLabel: "CRM Platform",
    slug: "crm-platform",
    problem:
      "Businesses needed a unified system to manage customer interactions, track deals, and generate reports without juggling multiple disconnected tools.",
    solution:
      "Built a modular CRM with a modern React frontend and a FastAPI REST backend, featuring role-based dashboards, pipeline management, and automated reporting.",
    architecture: [
      "Next.js App Router frontend with TypeScript",
      "FastAPI REST API with JWT authentication",
      "PostgreSQL database with SQLAlchemy ORM",
      "Docker containerization for consistent deployment",
    ],
    liveDemo: "https://github.com/saniddhya",
    github: "https://github.com/saniddhya",
  },
  {
    id: "02",
    title: "Lock Module",
    description:
      "A secure authentication and access-control system with JWT-based sessions, role-based permissions, and audit logging.",
    technologies: ["TypeScript", "FastAPI", "PostgreSQL", "Docker", "REST APIs"],
    previewLabel: "Lock Module",
    slug: "lock-module",
    problem:
      "Applications required a repeatable, secure authentication layer with fine-grained permission control and full audit trails.",
    solution:
      "Designed a reusable locks-and-permissions module with JWT authentication, role-based access control, and comprehensive audit logging.",
    architecture: [
      "JWT token-based authentication flow",
      "Role-based access control middleware",
      "PostgreSQL for user and permission storage",
      "Docker for isolated service deployment",
    ],
    liveDemo: "https://github.com/saniddhya",
    github: "https://github.com/saniddhya",
  },
  {
    id: "03",
    title: "Crop Advisor",
    description:
      "A data-driven advisory system that helps farmers make informed decisions using weather data, soil metrics, and crop recommendations.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "React", "REST APIs"],
    previewLabel: "Crop Advisor",
    slug: "crop-advisor",
    problem:
      "Farmers lacked access to actionable, data-backed guidance for crop selection and management decisions.",
    solution:
      "Created a crop advisory platform that ingests weather and soil data, applies recommendation logic, and delivers clear guidance through a simple interface.",
    architecture: [
      "Python data processing pipeline",
      "FastAPI backend serving recommendation endpoints",
      "PostgreSQL storing regional and crop data",
      "React frontend for advisory dashboards",
    ],
    liveDemo: "https://github.com/saniddhya",
    github: "https://github.com/saniddhya",
  },
  {
    id: "04",
    title: "Data Studies",
    description:
      "A collection of data analysis and visualization studies exploring patterns, trends, and insights across real-world datasets.",
    technologies: ["Python", "Pandas", "Matplotlib", "PostgreSQL"],
    previewLabel: "Data Studies",
    slug: "data-studies",
    problem:
      "Raw datasets held valuable insights that were difficult to surface without structured analysis and clear visualizations.",
    solution:
      "Performed systematic data studies using Python data tools, producing documented analyses and visualizations that reveal meaningful patterns.",
    architecture: [
      "Pandas for data cleaning and transformation",
      "Matplotlib for visualization",
      "PostgreSQL for storing processed datasets",
      "Jupyter-style analysis documentation",
    ],
    liveDemo: "https://github.com/saniddhya",
    github: "https://github.com/saniddhya",
  },
];