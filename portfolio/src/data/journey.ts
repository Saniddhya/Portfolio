/** Founder trajectory — five phases, deliberately not a resume dump. */
export const journey = [
  {
    index: "01",
    label: "Learn",
    title: "Foundations in data and software",
    body: "Started by building with data, Python, and software fundamentals — learning to reason about structure before reaching for tools.",
  },
  {
    index: "02",
    label: "Ship",
    title: "Real-world software development",
    body: "Moved into professional development and full-stack product engineering, working inside production codebases with real constraints.",
  },
  {
    index: "03",
    label: "Build Systems",
    title: "Across the entire stack",
    body: "Worked through frontend, backend, databases, authentication, APIs, and deployment — owning the seams between them rather than one layer.",
  },
  {
    index: "04",
    label: "Explore AI",
    title: "Intelligence as a component",
    body: "Started building AI-powered systems, automation workflows, and intelligent products where the model is a part of the system, not the whole system.",
  },
  {
    index: "05",
    label: "Build for Real Users",
    title: "AI × automation × finance",
    body: "Current direction: intelligent financial infrastructure — systems that understand financial information, evaluate risk, and keep a human in the loop.",
  },
] as const;

/** Editorial principles section. */
export const principles = [
  {
    index: "01",
    title: "Start with the problem",
    body: "Technology comes after understanding the user and the constraint. Choosing the stack first is how you end up building the wrong thing well.",
  },
  {
    index: "02",
    title: "Ship the smallest real system",
    body: "Build something usable before building something impressive. A running end-to-end slice teaches more than an elaborate plan.",
  },
  {
    index: "03",
    title: "Make the system explainable",
    body: "AI should produce evidence, structure, and observable decisions — not just an output. If nobody can see why it decided, it isn't finished.",
  },
] as const;

/** The layered system architecture revealed in the introduction section. */
export const architectureLayers = [
  { label: "User", detail: "The person and the constraint" },
  { label: "Interface", detail: "What they see and interact with" },
  { label: "Application", detail: "Orchestration and state" },
  { label: "AI / Logic", detail: "Reasoning and rules" },
  { label: "Data", detail: "What is actually true" },
  { label: "Infrastructure", detail: "Where it runs and how it ships" },
] as const;

/** Direction section — explicitly exploratory, no traction implied. */
export const direction = {
  statement:
    "I'm interested in the intersection of AI, automation and financial infrastructure — systems that can understand financial information, evaluate risk, and automate decisions while keeping humans in control.",
  status: "EXPLORING",
  headline: "AI × FINANCE × AUTOMATION",
  pipeline: [
    "Financial Data",
    "AI Analysis",
    "Risk Signal",
    "Decision",
    "Human Approval",
    "Action",
  ],
} as const;

/** Current status block. */
export const status = {
  building: ["AI × Finance × Automation"],
  learning: ["AI Systems", "Distributed Systems", "Product Engineering"],
  openTo: ["Founders", "Builders", "Interesting problems", "AI product opportunities"],
} as const;

/** Experience — one role, described in terms of actual engineering work. */
export const experience = [
  {
    period: "2025",
    role: "Software Development",
    org: "Sthapatya Consultants",
    context: "Government / civic technology",
    body: "Built and maintained modules across a civic technology codebase — frontend engineering, database interaction, access control, and debugging production workflows against real operational requirements.",
    responsibilities: [
      "Built and extended frontend modules in React and TypeScript",
      "Worked directly against SQL databases and schema constraints",
      "Implemented and maintained authentication and access control",
      "Debugged production workflows and resolved defects in live systems",
      "Coordinated interface and backend changes across module boundaries",
    ],
    technologies: ["Next.js", "React", "TypeScript", "SQL"],
  },
] as const;