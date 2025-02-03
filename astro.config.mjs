import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://determinantcalculator.com', // Replace with your actual domain
  output: 'server',
  adapter: cloudflare(),
  integrations: [tailwind()]
});