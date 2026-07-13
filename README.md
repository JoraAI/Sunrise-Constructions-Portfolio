# Sunrise Constructions — Premium Marketing Website

A production-grade, enterprise-tier marketing website for **Sunrise Constructions**, a ₹300Cr+ revenue construction company. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

| Concern | Technology |
|---|---|
| Framework | Next.js 14.2 (App Router, Server Components + Client Islands) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS 3 with custom design tokens |
| Fonts | `next/font` — Sora (headings) + Inter (body) |
| Animation | Framer Motion (scroll reveals, carousels, micro-interactions) |
| Images | `next/image` with reserved aspect-ratio containers (CLS-safe) |
| Icons | `lucide-react` |
| SEO | Metadata API, JSON-LD, `sitemap.ts`, `robots.ts`, OG/Twitter cards |

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open http://localhost:3000
```

### Build for production

```bash
npm run build
npm run start
```

### Type-check & lint

```bash
npm run type-check
npm run lint
```

## Project Structure

```
src/
├── app/                          # App Router pages
│   ├── layout.tsx                # Root layout (fonts, Navbar, Footer, ChatWidget, Org JSON-LD)
│   ├── page.tsx                  # Homepage (17 sections)
│   ├── globals.css               # Tailwind + design tokens
│   ├── not-found.tsx             # Custom 404
│   ├── sitemap.ts                # Auto-generated sitemap
│   ├── robots.ts                 # Robots.txt
│   ├── about-us/page.tsx
│   ├── services/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx       # Static-generated service detail pages
│   ├── projects/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── industries/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── careers/
│   │   ├── page.tsx              # Full careers page (perks, life, filterable listings)
│   │   └── [slug]/page.tsx       # Job detail + application form + JobPosting JSON-LD
│   ├── blog/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx       # Article + Article JSON-LD
│   └── contact-us/page.tsx
├── components/                   # Reusable UI components
│   ├── Navbar.tsx                # Utility bar + sticky nav + mobile drawer
│   ├── Footer.tsx                # Full footer with newsletter
│   ├── Hero.tsx                  # Homepage hero with video background
│   ├── VideoSlideshow.tsx        # Reusable autoplay video slideshow (CRITICAL)
│   ├── StatCounter.tsx           # Animated scroll-triggered counter
│   ├── StatsBar.tsx              # Stats strip
│   ├── AboutSection.tsx
│   ├── MissionVisionValues.tsx
│   ├── ServiceCard.tsx / ServicesSection.tsx
│   ├── IndustriesGrid.tsx
│   ├── ProjectCard.tsx / FeaturedProjects.tsx
│   ├── CredibilityBand.tsx       # Certifications + clients + press
│   ├── ProcessTimeline.tsx
│   ├── TestimonialCarousel.tsx   # Auto-advancing carousel
│   ├── TeamGrid.tsx
│   ├── CareersTeaser.tsx
│   ├── BlogTeaser.tsx
│   ├── CTABand.tsx
│   ├── ChatWidget.tsx            # Floating chat with sendMessageToLLM() stub
│   ├── ContactForm.tsx
│   ├── NewsletterForm.tsx
│   ├── ApplicationForm.tsx       # Job application form
│   ├── JobListingCard.tsx
│   ├── JobListingsFilter.tsx     # Client-side filterable job list
│   ├── PageHeader.tsx            # Reusable inner-page hero
│   ├── SmartImage.tsx            # CLS-safe next/image wrapper
│   ├── Reveal.tsx                # Scroll-reveal wrapper (Framer Motion)
│   ├── SectionHeading.tsx
│   ├── Logo.tsx                  # SVG sunrise-over-skyline mark
│   ├── Icon.tsx                  # String→Lucide icon registry
│   └── JsonLd.tsx                # Structured data renderer
├── lib/
│   ├── content.ts                # ALL site copy (single source of truth)
│   ├── seo.ts                    # Metadata + JSON-LD helpers
│   └── utils.ts                  # cn(), slugify(), formatDate(), truncate()
└── types/
    └── content.ts                # TypeScript interfaces for all content shapes
```

## Key Features

### Homepage (17 sections)
Hero with autoplaying video slideshow → Stats bar → About → Mission/Vision/Values → Services → Industries → Featured Projects → Credibility band → Process timeline → Testimonials carousel → Leadership team → Careers teaser → Blog teaser → CTA band → Footer → Chat widget.

### Careers (full page)
Hero, perks grid, life-at-Sunrise gallery, **filterable** job listings (by department + location), employee testimonials, stats band, and an open application CTA. Each job has a detail page with application form and JobPosting structured data.

### SEO
- Unique title (<60 chars) + meta description (<155 chars) per route via Metadata API
- Open Graph + Twitter Card tags with OG images
- JSON-LD: Organization + GeneralContractor, JobPosting (per role), Article (per post), BreadcrumbList
- `sitemap.ts` and `robots.ts` (Next.js native)
- Semantic HTML5, single H1 per page, descriptive alt text, canonical URLs

### Performance
- Hero video lazy-initialises after `requestIdleCallback` — poster image is the LCP element
- Reserved aspect-ratio containers on all images prevent CLS
- Server Components by default; `"use client"` only where interactivity is required
- Minimal client JS for good INP

## Customisation

**All copy lives in `src/lib/content.ts`.** Edit company details, services, projects, industries, team, jobs, testimonials, and blog posts there — components pick up changes automatically. Update `siteConfig.url` to your production domain before deploying.

## Chat Widget (LLM Integration)

The floating chat widget (`src/components/ChatWidget.tsx`) ships with a clearly-marked stub:

```ts
async function sendMessageToLLM(message: string): Promise<string> { ... }
```

Replace its body with a real API call (e.g. `fetch('/api/chat', ...)`) — the UI and state management work unchanged.

## License

© Sunrise Constructions Pvt. Ltd. All rights reserved.