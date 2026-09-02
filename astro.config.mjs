import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://savoie.app',
  output: 'static',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      customPages: [
        'https://savoie.app/poker-timer/',
      ],
      filter: (page) =>
        !page.includes('/demo/')
        && !page.includes('/gridmetrics-today/')
        && !page.includes('/blog/')
        && !page.endsWith('/privacy-policy.html')
        && !page.endsWith('/legal/terms.html')
        && !page.endsWith('/terms.html'),
    }),
  ],
});
