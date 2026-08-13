export interface Experience {
  id: string;
  period: string;
  role: string;
  org: string;
  summary: string;
  tags: string[];
}

/**
 * Vertical timeline milestones. Framed as builds/milestones rather than
 * employers so nothing is fabricated — swap in company names freely.
 */
export const experience: Experience[] = [
  {
    id: "01",
    period: "2023",
    role: "Data Studies",
    org: "Foundations · Data & Python",
    summary:
      "Systematic analyses and visualizations over real-world datasets — learning to extract signal, clean mess, and tell a story with numbers.",
    tags: ["Python", "Pandas", "Matplotlib"],
  },
  {
    id: "02",
    period: "2023",
    role: "Crop Advisor",
    org: "Advisory System",
    summary:
      "A data-driven advisory platform ingesting weather and soil metrics to surface clear, actionable crop recommendations through a React frontend.",
    tags: ["FastAPI", "PostgreSQL", "React"],
  },
  {
    id: "03",
    period: "2024",
    role: "Lock Module",
    org: "Auth & Access-Control",
    summary:
      "A reusable security layer with JWT sessions, role-based permissions, and full audit logging — engineered to drop into any application.",
    tags: ["TypeScript", "FastAPI", "Docker", "RBAC"],
  },
  {
    id: "04",
    period: "2024",
    role: "CRM Platform",
    org: "Full-Stack Platform",
    summary:
      "A role-aware CRM with pipeline management, real-time reporting, and automated workflows — a complete product across the whole stack.",
    tags: ["Next.js", "FastAPI", "PostgreSQL", "Docker"],
  },
  {
    id: "05",
    period: "2025",
    role: "This Portfolio",
    org: "Creative Engineering",
    summary:
      "A motion-first, WebGL-backed showcase built to feel alive — the design + dev combo you're looking at right now.",
    tags: ["Next.js", "WebGL", "Motion", "GSAP"],
  },
];
