import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://determinantcalculator.com', // Replace with your actual domain
  trailingSlash: 'never', // Enforce no trailing slash
  integrations: [
    tailwind(),
    sitemap(),
    mdx(),
    react({
      include: ['**/*.tsx', '**/*.jsx'], // Ensure both .tsx and .jsx files are handled
      typescript: true
    })
  ]
});