import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://thomas.legrand.sh',
  outDir: '../../dist/apps/website',
  integrations: [react(), tailwind()],
});
