# STRD – SEO services and contact TODOs

These are the next steps to review and polish before committing the recent SEO and contact changes.

1. Review `/services` pages
   - Check copy, headings, and tone (Australian English) for:
     - `src/pages/services/[service].astro`
     - `src/pages/services/[service]/[location].astro`
     - `src/content/services/wordpress-developer.mdx`
     - `src/content/service-locations/wordpress-developer-*.mdx`
   - Confirm each CTA button points to `/contact/?source=seo&campaign=...` with the correct service and location slug.

2. Verify SEO and schema
   - Ensure `<title>` and meta descriptions are correct on:
     - Home, about, work, reading, `/services/...`, and `/contact`.
   - Use a structured data tester to validate:
     - `Service`, `FAQPage`, and `BreadcrumbList` JSON-LD on a couple of `/services` pages.

3. Polish the contact page
   - File: `src/pages/contact.astro`.
   - Check:
     - Layout, spacing, and typography match the rest of the site.
     - Thank-you message appears correctly when `?status=sent` is present.
     - Hidden `source` and `campaign` fields are set from query params.

4. Wire up real email delivery
   - File: `src/pages/api/contact.ts`.
   - Choose a mail provider and:
     - Install and configure the client (e.g. Nodemailer).
     - Add `.env` values (`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `SMTP_FROM`).
     - Uncomment and adjust the email sending block to send to `contact@blakezajac.com`.

5. Final visual QA
   - Run through:
     - `/services/wordpress-developer`
     - `/services/wordpress-developer/newcastle`
     - `/services/wordpress-developer/melbourne`
     - `/services/wordpress-developer/remote-australia`
     - `/contact`
   - Check:
     - Mobile and desktop spacing.
     - Sentence case in headings and buttons.
     - No obvious content or UX regressions.

---

