export interface AppPageSection {
  eyebrow: string;
  title: string;
  body: string;
  screenshot: string;
  screenshotAlt: string;
  format?: 'phone' | 'widget';
}

export interface AppPage {
  slug: string;
  name: string;
  icon: string;
  accent: string;
  accentDark: string;
  eyebrow: string;
  headline: string;
  subhead: string;
  appStoreUrl: string;
  heroScreenshot: string;
  heroScreenshotAlt: string;
  sections: AppPageSection[];
  trustTitle: string;
  trustBody: string;
  footnote: string;
  faq: Array<{ question: string; answer: string }>;
}

export const appPages: AppPage[] = [
  {
    slug: 'gridmetrics',
    name: 'GridMetrics',
    icon: '/assets/images/apps/GridMetrics/1024.png',
    accent: '#2876ff',
    accentDark: '#0a3b99',
    eyebrow: 'A clearer energy forecast for Great Britain',
    headline: 'Know when to use electricity.',
    subhead:
      'GridMetrics turns the next 24 hours of grid and tariff data into one practical recommendation: the cleanest time to run everyday appliances, with price considered when available.',
    appStoreUrl: 'https://apps.apple.com/gb/app/gridmetrics/id6752292390',
    heroScreenshot: '/assets/images/apps/GridMetrics/product/forecast-top.webp',
    heroScreenshotAlt: 'GridMetrics recommending the cleanest upcoming time to use electricity',
    sections: [
      {
        eyebrow: 'Price-aware with Pro',
        title: 'Find the cheapest clean window.',
        body:
          'Add Octopus Agile or your own time-of-use rates. GridMetrics keeps carbon first, then shows the price, estimated appliance cost, and potential saving for the recommended window.',
        screenshot: '/assets/images/apps/GridMetrics/product/forecast-tariff.webp',
        screenshotAlt: 'A GridMetrics tariff recommendation with unit price, estimated cost, and saving',
      },
      {
        eyebrow: 'No chart-reading required',
        title: 'See the whole day ahead.',
        body:
          'The 24-hour forecast explains why a window is recommended while still giving you the detail to plan around the rest of your day.',
        screenshot: '/assets/images/apps/GridMetrics/product/forecast-detail.webp',
        screenshotAlt: 'The GridMetrics 24-hour carbon intensity forecast',
      },
      {
        eyebrow: 'At a glance',
        title: 'Check without opening the app.',
        body:
          'Put the same saved recommendation on your Home Screen. The widget keeps the cleanest upcoming window, carbon intensity, and comparison visible whenever you need it.',
        screenshot: '/assets/images/apps/GridMetrics/product/widget.webp',
        screenshotAlt: 'GridMetrics Home Screen widget showing the next clean electricity window',
        format: 'widget',
      },
      {
        eyebrow: 'Live context',
        title: 'See what is powering Britain.',
        body:
          'Check the current generation mix and renewable share when you want the bigger picture behind the recommendation.',
        screenshot: '/assets/images/apps/GridMetrics/product/fuel-mix.webp',
        screenshotAlt: 'The live Great Britain electricity generation mix in GridMetrics',
      },
    ],
    trustTitle: 'Useful without an energy account.',
    trustBody:
      'The core carbon forecast is provider-neutral and needs no login. Optional price-aware recommendations support public Octopus Agile prices or manual time-of-use rates.',
    footnote:
      'Forecasts are estimates and may change. GridMetrics is an independent app and is not affiliated with NESO or Octopus Energy.',
    faq: [
      {
        question: 'Do I need to be an Octopus Energy customer?',
        answer:
          'No. The carbon recommendation works without an energy account. Octopus Agile is one optional source for price-aware recommendations.',
      },
      {
        question: 'Does GridMetrics control my appliances?',
        answer:
          'No. It recommends a time window so you can decide when to run them.',
      },
      {
        question: 'What does GridMetrics Pro add?',
        answer:
          'Pro combines supported tariff prices with the carbon forecast and shows the estimated appliance cost and saving for a recommended window.',
      },
    ],
  },
];

export function getAppPage(slug: string) {
  return appPages.find((app) => app.slug === slug);
}
