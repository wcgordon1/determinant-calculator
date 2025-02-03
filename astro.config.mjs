import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://determinantcalculator.com', // Replace with your actual domain
  trailingSlash: 'never', // Enforce no trailing slash
  integrations: [
    tailwind(),
    sitemap()
  ]
});