Internal linking — add subtle "Locations" links on the contact or about page pointing to the service-location pages so they're discoverable beyond the sitemap.
Phase 1 expansion — a Brisbane and Perth page would extend the Phase 1 location set; just add MDX files and they auto-route.
Hero h2 CTA banner — the bottom CTA section currently uses the list-2col layout pattern. Once you want more visual punch (darker background, bigger heading), a dedicated ServiceCta.astro component would be the next UI investment.
Service pillar page — [service].astro still doesn't render FAQs from its MDX. That's a quick improvement: add FAQ there too.
Meta on core pages — the plan has a pending todo to improve title tags and schema on home, about, work and reading pages.

# STRD

Blake Zajac portfolio and marketing site ([blakezajac.com](https://blakezajac.com)). Built with Astro 5, deployed on Vercel.

## Setup

```bash
npm install
cp .env.example .env
# Add Resend credentials to .env (required for the contact form)
npm run dev
```

| Command           | Description              |
| ----------------- | ------------------------ |
| `npm run dev`     | Local dev server         |
| `npm run build`   | Production build         |
| `npm run preview` | Preview production build |

## Project conventions

Coding standards and file layout are documented in [`.cursor/rules/`](.cursor/rules/) (`project.mdc` is always applied; `astro.mdc`, `scss.mdc`, and `typescript.mdc` apply by file type).

## Environment variables

| Variable            | Purpose                              |
| ------------------- | ------------------------------------ |
| `RESEND_API_KEY`    | Resend API key for contact form      |
| `RESEND_FROM_EMAIL` | Sender address for outbound mail     |
| `RESEND_TO_EMAIL`   | Inbox that receives form submissions |

## Content

- **MDX collections**: `work`, `services`, `service-locations` — see `src/content/config.ts`
- **Static JSON**: `menu.json`, `reading.json`, `experience.json`, `social.json`

Service location MDX files exist under `src/content/service-locations/`, but location routes (`/services/[service]/[location]`) are not implemented yet. Only `/services/[service]` is live.

## SEO & polish TODOs

1. Review `/services` pages — copy, Australian English, CTAs to `/contact/?source=seo&campaign=...`
2. Verify `<title>`, meta descriptions, and JSON-LD on key pages
3. Visual QA: home, about, work, reading, `/services/wordpress-developer`, `/contact`
