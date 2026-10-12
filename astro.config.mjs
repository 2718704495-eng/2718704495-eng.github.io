// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://2718704495-eng.github.io',
  output: 'static',
  trailingSlash: 'ignore',
  integrations: [sitemap()],
});
