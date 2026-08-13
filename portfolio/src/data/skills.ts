export interface SkillCategory {
  title: string;
  icon: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: "frontend",
    skills: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GSAP / Motion",
      "Redux / Zustand",
    ],
  },
  {
    title: "Backend",
    icon: "backend",
    skills: [
      "Python",
      "FastAPI / Flask",
      "REST API Design",
      "PostgreSQL / SQL",
      "Docker",
      "Git & CI/CD",
    ],
  },
];

export const marqueeSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Docker",
  "Redux",
  "Git",
];

export interface ProficiencySkill {
  name: string;
  level: number;
}

export const proficiencySkills: ProficiencySkill[] = [
  { name: "React / Next.js", level: 92 },
  { name: "TypeScript", level: 86 },
  { name: "Tailwind / Motion", level: 93 },
  { name: "Python / FastAPI", level: 85 },
  { name: "PostgreSQL / SQL", level: 80 },
  { name: "Docker / CI/CD", level: 76 },
];

/** Skills displayed on the outer orbit ring. */
export const outerOrbitSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "GSAP",
  "Python",
  "FastAPI",
  "PostgreSQL",
  "Docker",
  "REST",
];

/** Skills displayed on the inner orbit ring. */
export const innerOrbitSkills = ["GSAP", "WebGL", "REST", "Motion"];