export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand the problem, the users, and the constraints before writing a single line of code.",
  },
  {
    number: "02",
    title: "Design",
    description:
      "Map the architecture and interfaces, balancing aesthetics with engineering reality.",
  },
  {
    number: "03",
    title: "Develop",
    description:
      "Build the system iteratively — frontend, backend, database — with clean, testable code.",
  },
  {
    number: "04",
    title: "Deploy",
    description:
      "Ship it. Containerize, automate, monitor, and iterate based on real feedback.",
  },
];