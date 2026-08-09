import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://savoie.app',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      customPages: [
        'https://savoie.app/apps/fast-simple-invoice-maker/',
        'https://savoie.app/poker-timer/',
      ],
      filter: (page) => !page.includes('/demo/'),
    }),
  ],
});
