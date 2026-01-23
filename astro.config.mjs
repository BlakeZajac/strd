// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import mdx from '@astrojs/mdx'
import lenis from 'astro-lenis';

// https://astro.build/config
export default defineConfig({
    site: 'https://blakezajac.com',
    integrations: [mdx(), lenis(), sitemap()],
});