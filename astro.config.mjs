// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx'
import lenis from 'astro-lenis';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';


// https://astro.build/config
export default defineConfig({
    output: 'server',
    adapter: vercel(),
    site: 'https://blakezajac.com',
    integrations: [mdx(), lenis(), sitemap()],
});