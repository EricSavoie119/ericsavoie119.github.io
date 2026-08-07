export interface App {
  name: string;
  image: string;
  category: string;
  description: string;
  tech: string[];
  links: {
    appStore?: string;
    features?: string;
  };
}

export const apps: App[] = [
  {
    name: 'Bread Engineer',
    image: '/assets/images/icons/BreadEngineer.png',
    category: 'Equation-based fermentation timer',
    description: 'Predicts peak fermentation for your dough using proven equations—no more guesswork. Generous two‑month trial included.',
    tech: ['CloudKit', 'SwiftData', 'Firebase Auth', 'Firebase Analytics', 'Tuist', 'Module architecture', 'Photo Compression', 'Fastlane'],
    links: { appStore: 'https://apps.apple.com/gb/app/bread-engineer/id6738381066' },
  },
  {
    name: 'GridMetrics',
    image: '/assets/images/apps/GridMetrics/1024.png',
    category: 'Clean energy & tariff forecast',
    description: 'Know the cleanest—and with Pro, cheapest—time to use electricity with one practical 24-hour recommendation.',
    tech: ['SwiftUI', 'WidgetKit', 'StoreKit', 'PostHog'],
    links: {
      appStore: 'https://apps.apple.com/gb/app/gridmetrics/id6752292390',
      features: '/apps/gridmetrics/',
    },
  },
  {
    name: 'BeLoved',
    image: '/assets/images/apps/BeLoved/appstore.png',
    category: 'Beautiful relationship tracker',
    description: 'Track anniversaries, milestones, and special dates with notifications to never miss a moment.',
    tech: ['WidgetKit', 'StoreKit Configuration files'],
    links: {
      appStore: 'https://apps.apple.com/gb/app/beloved/id6752829410',
      features: '/apps/beloved/',
    },
  },
  {
    name: 'Fast Simple Invoice Maker',
    image: '/assets/images/apps/Fast%20Simple%20Invoice%20Maker/appstore.png',
    category: 'Create professional invoices fast',
    description: 'Invoice apps that create PDFs had log ins and lots of friction when creating PDFs is quite simple so I made a Fast Simple version.',
    tech: ['PDFKit'],
    links: {
      appStore: 'https://apps.apple.com/gb/app/fast-simple-invoice-maker/id6752559476',
      features: '/apps/fast-simple-invoice-maker/',
    },
  },
  {
    name: 'Infinite Ruler',
    image: '/assets/images/icons/infiniteruler.png',
    category: 'A calibrated ruler that keeps going',
    description: 'Measure in centimetres or fractional inches with a movable zero, A–B markers and a ruler that continues past one screen.',
    tech: ['SwiftUI', 'Device calibration', 'PostHog'],
    links: {
      appStore: 'https://apps.apple.com/gb/app/infinite-ruler/id6746876762',
      features: '/apps/infinite-ruler/',
    },
  },
  {
    name: 'Flip Clock Flow',
    image: '/assets/images/apps/Flip%20Clock%20Flow/appstore.png',
    category: 'Elegant flip clock + focus timer',
    description: 'A cool nostalgic clock built by referencing open source code.',
    tech: [],
    links: { appStore: 'https://apps.apple.com/gb/app/flip-clock-flow/id6752408901' },
  },
];

export const retiredApps: App[] = [
  {
    name: 'Curiosity AI',
    image: '/assets/images/apps/CuriosityAI/appstore.png',
    category: 'Anonymous community chat · 2025–2026',
    description: 'An experiment in anonymous, topic-based conversation with AI-assisted expression and moderation.',
    tech: ['SwiftUI', 'WebSockets', 'AWS Lambda', 'DynamoDB', 'OpenAI'],
    links: {},
  },
  {
    name: 'Swivo',
    image: '/assets/images/apps/Swivo/appstore.png',
    category: 'AI-generated social video · 2025–2026',
    description: 'An exploration of a social feed built around cloud-generated images and video.',
    tech: ['UIKit', 'Google Cloud', 'Vertex AI', 'Veo', 'Cloud Storage'],
    links: {},
  },
  {
    name: 'SuperGoodBudget',
    image: '/assets/images/apps/SuperGoodBudget/appstore.png',
    category: 'Personal budgeting · 2025–2026',
    description: 'A zero-based budgeting and spending tracker inspired by envelope budgeting.',
    tech: [],
    links: {},
  },
  {
    name: 'Loan Calculator Smart',
    image: '/assets/images/apps/LoanCalculatorSmart/appstore.png',
    category: 'Loan comparison · 2025–2026',
    description: 'A loan comparison calculator with interactive charts, breakeven calculations and PDF reports.',
    tech: ['Swift Charts'],
    links: {},
  },
  {
    name: 'Tip Calculator Fast',
    image: '/assets/images/apps/Tip%20Calculator%20Fast/appstore.png',
    category: 'Tip calculator · 2025–2026',
    description: 'A fast tip and bill-splitting calculator built around keyboard-first input.',
    tech: [],
    links: {},
  },
  {
    name: 'Water?',
    image: '/assets/images/apps/Water/appstore.png',
    category: 'Hydration tracker · 2025–2026',
    description: 'A lightweight daily water-intake tracker.',
    tech: [],
    links: {},
  },
];
