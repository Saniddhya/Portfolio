/** Capability groups — breadth of what I build, no arbitrary percentages. */
export const capabilities = [
  {
    index: "01",
    title: "AI Systems",
    summary:
      "Retrieval pipelines, multi-agent orchestration, and structured outputs that stay grounded in evidence.",
    items: ["LLMs", "Agents", "RAG", "Automation", "Structured Outputs", "Tool Calling"],
  },
  {
    index: "02",
    title: "Product Engineering",
    summary:
      "Typed, accessible interfaces and the APIs behind them — built to be maintained, not just shipped.",
    items: ["Next.js", "React", "TypeScript", "Python", "FastAPI", "REST APIs"],
  },
  {
    index: "03",
    title: "Data & Infrastructure",
    summary:
      "Schemas, migrations, auth, and deployment — the parts that decide whether a system survives contact with reality.",
    items: ["PostgreSQL", "MySQL", "SQL", "Docker", "Authentication", "RBAC"],
  },
  {
    index: "04",
    title: "Intelligent Products",
    summary:
      "Applied AI where the decision matters more than the output: risk, evidence, and human approval.",
    items: ["AI Finance", "Computer Vision", "Decision Systems", "Workflow Automation", "Developer Tools"],
  },
] as const;

/**
 * Technical constellation. `use` explains what the technology is actually for —
 * shown on hover/focus so the list reads as capability, not a keyword dump.
 */
/** Explicit shape, so the union of literal `as const` groups stays assignable. */
export interface StackItem {
  name: string;
  use: string;
}

export const stackGroups: readonly { label: string; items: readonly StackItem[] }[] = [
  {
    label: "Languages",
    items: [
      { name: "TypeScript", use: "Typed application and API code where refactors must stay safe." },
      { name: "JavaScript", use: "Application logic, tooling, and browser-side behaviour." },
      { name: "Python", use: "Backend systems, automation, data processing and AI workflows." },
      { name: "SQL", use: "Schema design, reporting queries, and reading a system honestly." },
    ],
  },
  {
    label: "Frontend",
    items: [
      { name: "React", use: "Component architecture for complex, stateful interfaces." },
      { name: "Next.js", use: "Server components, routing, and shipping to a CDN." },
      { name: "Tailwind CSS", use: "Consistent, low-specificity styling with a small design surface." },
    ],
  },
  {
    label: "Backend",
    items: [
      { name: "FastAPI", use: "Typed Python services with automatic validation and docs." },
      { name: "Node.js", use: "Server-side JavaScript alongside Next.js." },
      { name: "REST", use: "Clear, inspectable contracts between interface and service." },
      { name: "JWT", use: "Stateless sessions with explicit claims." },
    ],
  },
  {
    label: "AI",
    items: [
      { name: "LLMs", use: "Reasoning over language when the task is genuinely generative." },
      { name: "RAG", use: "Grounding answers in retrieved documents instead of memory." },
      { name: "Agents", use: "Multi-step work with tools, validation, and explicit handoff." },
      { name: "Prompt Engineering", use: "Tying model behaviour to a verifiable contract." },
      { name: "Structured Outputs", use: "Schemas instead of prose when downstream code must parse it." },
      { name: "Computer Vision", use: "Perception problems where the input is an image." },
    ],
  },
  {
    label: "Data",
    items: [
      { name: "PostgreSQL", use: "Relational data, constraints, and transactions." },
      { name: "MySQL", use: "Relational workloads in existing stacks." },
      { name: "Pandas", use: "Cleaning and reshaping tabular data." },
      { name: "NumPy", use: "Numeric work underpinning analysis and features." },
      { name: "scikit-learn", use: "Classical modelling and evaluation baselines." },
    ],
  },
  {
    label: "Infrastructure",
    items: [
      { name: "Docker", use: "Reproducible environments and isolated services." },
      { name: "Git", use: "Version history as the record of how a system evolved." },
      { name: "GitHub", use: "Source of truth and public project record." },
      { name: "Vercel", use: "Edge deployment for the front-end." },
      { name: "AWS", use: "Managed compute and storage for backend services." },
    ],
  },
];