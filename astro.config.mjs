// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx'
import lenis from 'astro-lenis';

// https://astro.build/config
export default defineConfig({
    integrations: [mdx(), lenis()],
});