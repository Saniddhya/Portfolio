export type ProjectStatus = "DEPLOYED" | "PROTOTYPE" | "EXPERIMENT";

export interface Project {
  /** URL-safe identifier used for /projects/[slug]. */
  slug: string;
  name: string;
  /** One-line summary. Kept honest — no traction or scale claims. */
  tagline: string;
  category: string;
  year: number;
  status: ProjectStatus;
  description: string;
  technologies: string[];
  /** Rendered as the animated flow diagram on the detail page. */
  pipeline: string[];
  problem: string;
  approach: string;
  architecture: string[];
  role: string;
  github: string;
  liveDemo?: string;
  /** Flags a project for the oversized case-study treatment. */
  featured: boolean;
  /** Higher sorts first. */
  priority: number;
}

/**
 * Curated project context.
 *
 * Every claim here was read directly from the public repository or its README.
 * Where a repo has no description, README, or demo, the field is omitted rather
 * than invented. Live GitHub data is merged on top at request time — see
 * lib/projects.ts.
 */
export const projects: Project[] = [
  {
    slug: "aptino",
    name: "Aptino",
    tagline: "An evidence-grounded claim decision engine for health insurance.",
    category: "AI Systems · Retrieval · Decision Support",
    year: 2026,
    status: "DEPLOYED",
    description:
      "A multi-agent investigation platform that maps health-insurance claim facts to policy requirements through a structured evidence matrix, so every decision is grounded in retrieved policy text.",
    technologies: [
      "Python",
      "FastAPI",
      "Streamlit",
      "Hybrid Retrieval",
      "BM25",
      "RRF",
      "Reranking",
      "Docker",
      "LLM Agents",
    ],
    pipeline: ["Claim", "Policy", "Evidence", "Reasoning", "Decision", "Citation"],
    problem:
      "Claim adjudication depends on reading a large policy document and matching each fact in a claim to the clause that governs it. Doing that by hand is slow, and a summary that loses its citations cannot be defended in an audit.",
    approach:
      "Treat the system as investigation rather than prediction. Agents normalise the claim, plan what evidence is missing, retrieve the governing clauses, build an explicit evidence matrix, then reason over it under a fail-closed rule: when evidence is missing or conflicting, the system abstains and returns NEEDS_REVIEW instead of guessing.",
    architecture: [
      "Case Analysis Agent normalises facts and flags conflicts and missing evidence",
      "Hybrid retrieval: dense vectors and BM25 fused with Reciprocal Rank Fusion",
      "Post-fusion reranker narrows to high-precision policy chunks",
      "Policy Evidence Agent builds the evidence matrix with typed findings",
      "Decision Agent applies a safety hierarchy: Missing → Exclusion → Limits → Admissible",
      "Validation Agent checks every material claim against a retrieved citation",
      "FastAPI endpoints (/analyze, /review, /health) behind a Streamlit reviewer workspace",
      "Full provenance chain recorded as audit events for every analysis",
    ],
    role:
      "Built end to end — multi-agent orchestration, retrieval pipeline, evidence and decision modelling, API layer, reviewer UI, evaluation harness, and documentation.",
    github: "https://github.com/Saniddhya/Aptino-AI-Engineer-Health-insurance-",
    liveDemo: "https://aptionohealth.streamlit.app/",
    featured: true,
    priority: 100,
  },
  {
    slug: "vishwakarma-arts",
    name: "Vishwakarma Arts",
    tagline: "A deployed React web application.",
    category: "Full-Stack Application",
    year: 2026,
    status: "DEPLOYED",
    description:
      "A JavaScript web application built with React and Vite, deployed publicly on Vercel. The source is open; the specific product surface is best read from the live application.",
    technologies: ["JavaScript", "React", "Vite", "Vercel"],
    pipeline: ["Interface", "Application", "Data", "Deployment"],
    problem:
      "Kept as evidence of shipping a real web application to production rather than leaving it as a local prototype.",
    approach:
      "Built as a Vite + React application and deployed to Vercel, so the result is publicly reachable and verifiable rather than a screenshot.",
    architecture: [
      "React application built with Vite",
      "Deployed to Vercel with continuous deployment from the main branch",
    ],
    role: "Built and deployed the application.",
    github: "https://github.com/Saniddhya/Vishwakarma-Arts",
    liveDemo: "https://vishwakarma-arts.vercel.app",
    featured: false,
    priority: 60,
  },
  {
    slug: "portfolio",
    name: "Portfolio",
    tagline: "This site — an interactive engineering demonstration.",
    category: "Product Engineering · Creative Web",
    year: 2026,
    status: "DEPLOYED",
    description:
      "The portfolio itself: a Next.js application with a WebGL intelligence visualisation, a GitHub-derived project pipeline, scroll-driven motion, and a restrained editorial design system.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Three.js",
      "React Three Fiber",
      "GSAP",
      "Tailwind CSS",
      "Vercel",
    ],
    pipeline: ["Data", "Server", "Interface", "Motion", "Deployment"],
    problem:
      "Most engineering portfolios assert capability. This one is meant to be the evidence — the site itself demonstrates how the person it represents builds.",
    approach:
      "Server-render the content, dynamically import WebGL so it never blocks first paint, drive project data from the public GitHub API with a curated metadata layer on top, and degrade gracefully when WebGL or motion is unavailable.",
    architecture: [
      "Next.js App Router with server components for all content",
      "WebGL scene dynamically imported and paused when outside the viewport",
      "GitHub project pipeline merged with curated metadata, cached server-side",
      "Reduced-motion and no-WebGL fallbacks for every animated subsystem",
    ],
    role: "Design, engineering, 3D, motion, and deployment.",
    github: "https://github.com/Saniddhya/Portfolio",
    liveDemo: "https://sanidhyadev.vercel.app",
    featured: false,
    priority: 55,
  },
  {
    slug: "itune-music-sales-analysis",
    name: "iTunes Music Sales Analysis",
    tagline: "A data analysis study over a public sales dataset.",
    category: "Data & Analysis",
    year: 2026,
    status: "EXPERIMENT",
    description:
      "An analysis study built on a public music-sales dataset, exploring structure and trends in the data.",
    technologies: ["Python", "Data Analysis"],
    pipeline: ["Dataset", "Cleaning", "Analysis"],
    problem:
      "Working through a real dataset to build intuition for cleaning messy data and extracting signal.",
    approach:
      "Load and clean the dataset, then work through exploratory analysis to surface patterns.",
    architecture: [
      "Dataset loaded and cleaned for missing and inconsistent values",
      "Exploratory analysis to surface trends and structure",
    ],
    role: "Data analysis and study.",
    github: "https://github.com/Saniddhya/ITUNE-MUSIC-SALES-DA",
    featured: false,
    priority: 30,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProject(): Project {
  return projects.find((p) => p.featured) ?? projects[0];
}