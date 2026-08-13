# Sanidhya Rathore — Portfolio

A production-quality Next.js portfolio for Sanidhya Rathore, full-stack developer based in Pune, India.

Built with **Next.js 15**, **React 19**, **TypeScript**, **Tailwind CSS**, **GSAP**, **Lenis**, and the **Web Audio API**.

## Stack

- **Framework:** Next.js 15 (App Router) + React 19 + TypeScript
- **Styling:** Tailwind CSS + CSS variables
- **Fonts:** Space Grotesk, JetBrains Mono, Inter (via `next/font`)
- **Animation:** GSAP + ScrollTrigger + Lenis smooth scrolling
- **Sound:** Synthesized Web Audio API (no external audio files)
- **Linting:** ESLint with `next/core-web-vitals`

## Getting Started

### Install dependencies

```bash
npm install
```

### Run in development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build for production

```bash
npm run build
```

### Start the production server

```bash
npm run start
```

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts, metadata
│   ├── page.tsx            # Homepage
│   ├── globals.css         # Design system + global styles
│   ├── loading.tsx         # Route loading state
│   ├── error.tsx           # Route error boundary
│   ├── not-found.tsx       # 404 page
│   ├── sitemap.ts          # SEO sitemap
│   ├── robots.ts           # robots.txt
│   ├── about/page.tsx      # About page
│   ├── contact/page.tsx    # Contact page
│   ├── work/page.tsx       # All work page
│   └── work/[slug]/page.tsx # Dynamic case study routes
├── components/
│   ├── audio/              # SoundProvider, SoundToggle
│   ├── cursor/             # CustomCursor
│   ├── hero/               # Hero, StackVisual
│   ├── layout/             # Preloader, SmoothScroll
│   ├── navigation/         # Navbar, MobileMenu
│   ├── projects/           # ProjectList, ProjectItem
│   ├── sections/           # Marquee, About, Work, Capabilities, Process, Contact, Footer
│   └── ui/                 # Button, MagneticButton, Eyebrow
├── data/                   # projects.ts, skills.ts, socials.ts, process.ts
├── hooks/                  # useMousePosition, useMagnetic, useSound, useGsap, useMediaQuery
├── lib/                    # gsap.ts, audio.ts, utils.ts
└── public/
    ├── images/             # Portfolio images
    ├── projects/           # Project screenshots
    └── sounds/             # (Reserved for future external sounds)
```

## Key Features

- **Preloader** — "Compiling interface" entrance with progress bar and GSAP exit
- **Custom Cursor** — Circular cursor dot + ring with hover expansion (desktop only)
- **Hero Animation** — Heading lines reveal upward, elements fade/slide in after preloader
- **Stack Visual** — 3D layered tech stack with mouse tilt (desktop) and simplified layout on mobile
- **Marquee** — Infinite scrolling technology list (CSS animation)
- **Project Hover Preview** — Floating preview card that follows mouse (desktop only)
- **Smooth Scrolling** — Lenis + ScrollTrigger sync
- **Sound System** — Synthesized Web Audio sounds for clicks, hovers, transitions, menu open/close
- **Sound Preference** — Persisted via `localStorage` (`portfolio-sound-enabled`)
- **Reduced Motion** — Respects `prefers-reduced-motion`
- **Mobile Menu** — Full-screen animated hamburger menu with GSAP
- **SEO** — Metadata, Open Graph, Twitter cards, sitemap, robots.txt
- **Case Studies** — Dynamic routes at `/work/[slug]` with placeholders for screenshots

## Adding New Projects

1. Open `src/data/projects.ts`
2. Add a new project object:

```ts
{
  id: "05",
  title: "Your Project",
  description: "Short description...",
  technologies: ["React", "FastAPI", "PostgreSQL"],
  previewLabel: "Your Project",
  slug: "your-project",
  problem: "What problem it solved...",
  solution: "How you built it...",
  architecture: ["Key architectural decision 1", "..."],
  liveDemo: "https://...",
  github: "https://github.com/...",
}
```

3. The project automatically appears in the Work list and gets its own `/work/your-project` case study page.

## Sound System

Sounds are generated entirely with the **Web Audio API** — no audio files needed.

The system supports:

- `playClick()` — subtle click for buttons/links
- `playHover()` — very subtle hover feedback with 80ms cooldown
- `playTransition()` — preloader/page transition swoosh
- `playMenuOpen()` / `playMenuClose()` — menu chimes

**Note:** Browsers block audio until user interaction. AudioContext is created lazily on first click.

## Future Backend

Set `NEXT_PUBLIC_API_URL` in `.env.local` to connect a FastAPI backend:

```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

The architecture is designed for:

```
Next.js frontend
    ↓
FastAPI (Python)
    ↓
PostgreSQL
```

## Design System

| Variable | Value |
|----------|-------|
| `--bg` | `#0a0a0d` |
| `--bg-alt` | `#0e0e13` |
| `--panel` | `#121218` |
| `--fg` | `#edebe4` |
| `--muted` | `#8a8a93` |
| `--accent` | `#7c5cff` |
| `--accent2` | `#3adca6` |