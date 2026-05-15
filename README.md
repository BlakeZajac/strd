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
