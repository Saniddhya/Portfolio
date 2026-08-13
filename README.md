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
| `--accent2` | `#3adca6` |
