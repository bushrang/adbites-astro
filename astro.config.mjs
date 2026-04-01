import { defineConfig } from 'astro/config';
import { loadEnv } from "vite";
import vercel from '@astrojs/vercel';
import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';
import sanityIntegration from '@sanity/astro';

const { PUBLIC_SANITY_PROJECT_ID, PUBLIC_SANITY_DATASET } = loadEnv(process.env.NODE_ENV, process.cwd(), "");

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [
    react(),
    sanityIntegration({
      projectId: PUBLIC_SANITY_PROJECT_ID || 'xqrqkfgr',
      dataset: PUBLIC_SANITY_DATASET || 'adbites',
      useCdn: true,
    }),
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});