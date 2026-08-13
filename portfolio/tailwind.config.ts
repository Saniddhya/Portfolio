import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080607",
        "bg-alt": "#0d0a07",
        panel: "#15100b",
        fg: "#fbf3e8",
        muted: "#b0967f",
        "muted-2": "#6e5d4f",
        accent: "#ff4a1a",
        "accent-soft": "rgba(255, 74, 26, 0.14)",
        accent2: "#ffb23e",
        "accent2-soft": "rgba(255, 178, 62, 0.14)",
        accent3: "#ff2d3f",
        "accent3-soft": "rgba(255, 45, 63, 0.14)",
        line: "rgba(251, 243, 232, 0.09)",
        "line-strong": "rgba(251, 243, 232, 0.16)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(255, 74, 26, 0.38), 0 0 90px rgba(255, 45, 63, 0.18)",
        "glow-amber": "0 0 40px rgba(255, 178, 62, 0.35)",
        "glow-lg":
          "0 0 60px rgba(255, 74, 26, 0.45), 0 0 140px rgba(255, 45, 63, 0.25)",
      },
      backgroundImage: {
        neon: "linear-gradient(120deg, #ff2d3f 0%, #ff5a1a 45%, #ffb23e 100%)",
        "neon-text":
          "linear-gradient(100deg, #ffb23e 0%, #ff5a1a 45%, #ff2d3f 100%)",
      },
    },
  },
  plugins: [],
};

export default config;