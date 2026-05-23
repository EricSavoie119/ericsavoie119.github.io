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
    name: 'Curiosity AI',
    image: '/assets/images/apps/CuriosityAI/appstore.png',
    category: 'Anonymous community chat',
    description: 'Drop into live, topic-based rooms, speak your mind anonymously, and let built-in AI help you express ideas and keep conversations productive.',
    tech: ['Cognito Identity Pool', 'DynamoDB', 'SigV4', 'WebSockets', 'URLSessionWebSocketTask', 'OpenAI ChatGPT API', 'OpenAI Moderation API', 'Streaming API responses', 'Presigned URLs', 'CryptoKit'],
    links: { appStore: 'https://apps.apple.com/gb/app/curiosity-ai/id6753080466' },
  },
  {
    name: 'Bread Engineer',
    image: '/assets/images/icons/BreadEngineer.png',
    category: 'ML‑driven fermentation timer for perfect loaves',
    description: 'On‑device machine learning predicts peak fermentation for your dough—no more guesswork. Generous two‑month trial included.',
    tech: ['CoreML', 'CloudKit', 'SwiftData', 'Firebase Auth', 'Firebase Analytics', 'Tuist', 'Module architecture', 'Photo Compression', 'Fastlane'],
    links: { appStore: 'https://apps.apple.com/gb/app/bread-engineer/id6738381066' },
  },
  {
    name: 'GridMetrics',
    image: '/assets/images/apps/GridMetrics/1024.png',
    category: 'Real‑time electricity grid insights',
    description: 'See the real time distribution of the UK grid generation mix.',
    tech: ['AWS APIGateway', 'AWS Lambda', 'AWS S3', 'AWS EC2', 'AWS ECR'],
    links: { appStore: 'https://apps.apple.com/gb/app/gridmetrics/id6752292390' },
  },
  {
    name: 'Swivo',
    image: '/assets/images/apps/Swivo/appstore.png',
    category: 'AI-generated social video feed',
    description: 'Like TikTok for AI generated content with cloud-powered video generation.',
    tech: ['UICollectionView', 'UIKit', 'Google Cloud Platform', 'Vertex AI API', 'VEO3 (Video Generation)', 'Cloud Storage'],
    links: { appStore: 'https://apps.apple.com/gb/app/swivo/id6753713071' },
  },
  {
    name: 'BeLoved',
    image: '/assets/images/apps/BeLoved/appstore.png',
    category: 'Beautiful relationship tracker',
    description: 'Track anniversaries, milestones, and special dates with notifications to never miss a moment.',
    tech: ['WidgetKit', 'StoreKit Configuration files'],
    links: { appStore: 'https://apps.apple.com/gb/app/beloved/id6752829410' },
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
    category: 'Measure anything with your phone',
    description: 'An app that uses known DPI values to turn your phone into an old school ruler. Limited use but kind of fun.',
    tech: ['Measurement framework'],
    links: { appStore: 'https://apps.apple.com/gb/app/infinite-ruler/id6746876762' },
  },
  {
    name: 'Loan Calculator Smart',
    image: '/assets/images/apps/LoanCalculatorSmart/appstore.png',
    category: 'Compare loans with interactive charts',
    description: 'A comprehensive loan comparison tool featuring multi-scenario analysis, interactive charts, breakeven calculations, and PDF report generation.',
    tech: ['Swift Charts'],
    links: { appStore: 'https://apps.apple.com/gb/app/loan-calculator-smart/id6752863737' },
  },
  {
    name: 'SuperGoodBudget',
    image: '/assets/images/apps/SuperGoodBudget/appstore.png',
    category: 'Budget smarter, spend better',
    description: 'Inspired by YNAB budgeting and tracking every dollar you spend helps to keep you on top of your finances.',
    tech: [],
    links: { appStore: 'https://apps.apple.com/gb/app/supergoodbudget/id6752673311' },
  },
  {
    name: 'Flip Clock Flow',
    image: '/assets/images/apps/Flip%20Clock%20Flow/appstore.png',
    category: 'Elegant flip clock + focus timer',
    description: 'A cool nostalgic clock built by referencing open source code.',
    tech: [],
    links: { appStore: 'https://apps.apple.com/gb/app/flip-clock-flow/id6752408901' },
  },
  {
    name: 'Water?',
    image: '/assets/images/apps/Water%3F/appstore.png',
    category: 'Elegant hydration tracker',
    description: "Track the amount of water you're drinking during the day - interesting to see if you hit the water requirements every day.",
    tech: [],
    links: { appStore: 'https://apps.apple.com/gb/app/water/id6752577649' },
  },
  {
    name: 'Tip Calculator Fast',
    image: '/assets/images/apps/Tip%20Calculator%20Fast/appstore.png',
    category: 'Split bills in seconds',
    description: 'Using a keyboard toolbar and auto focusing textfields to achieve the fastest tip calculator on the market.',
    tech: [],
    links: { appStore: 'https://apps.apple.com/gb/app/tip-calculator-fast/id6752381498' },
  },
];
