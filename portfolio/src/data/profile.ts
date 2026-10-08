/**
 * Identity and positioning. Single source of truth for the header, footer,
 * contact section, and metadata.
 */
export const profile = {
  name: "Sanidhya Rathore",
  initials: "SR",
  role: "AI Engineer · Full-Stack Builder · Product Engineer",
  shortRole: "AI ENGINEER · BUILDER",
  tagline: "Building intelligent products from idea to production.",
  location: "Pune, India",
  bio: "I enjoy taking ambiguous problems and turning them into working software.",
  intro:
    "I work across the stack — from React and Next.js interfaces to Python APIs, databases, AI workflows and deployment. That allows me to move from an idea to a working product without losing the connection between product thinking and engineering.",
  email: "rathorekuah@gmail.com",
  site: "sanidhyadev.vercel.app",
} as const;

export const socials = [
  { label: "GitHub", handle: "github.com/saniddhya", href: "https://github.com/saniddhya" },
  {
    label: "LinkedIn",
    handle: "linkedin.com/in/sanidhya-rathore",
    href: "https://www.linkedin.com/in/sanidhya-rathore-377a99226",
  },
  { label: "Email", handle: profile.email, href: `mailto:${profile.email}` },
] as const;

/** Section order is the reading order of the site. */
export const navSections = [
  { id: "about", index: "01", label: "About" },
  { id: "build", index: "02", label: "Build" },
  { id: "projects", index: "03", label: "Projects" },
  { id: "systems", index: "04", label: "Systems" },
  { id: "now", index: "05", label: "Now" },
  { id: "contact", index: "06", label: "Contact" },
] as const;