/*
 * App Configuration System
 * Centralized data for all apps and their metadata
 */

// App status constants
export const APP_STATUS = {
  AVAILABLE: 'available',
  COMING_SOON: 'coming_soon',
  IN_DEVELOPMENT: 'in_development',
  BETA: 'beta'
};

// App categories
export const APP_CATEGORIES = {
  PRODUCTIVITY: 'productivity',
  CREATIVE: 'creative',
  BUSINESS: 'business',
  UTILITY: 'utility',
  ENTERTAINMENT: 'entertainment'
};

// Platform constants
export const PLATFORMS = {
  IOS: 'ios',
  MACOS: 'macos',
  WEB: 'web',
  ANDROID: 'android'
};

// Store links
export const STORE_LINKS = {
  APP_STORE: 'https://apps.apple.com/app',
  MAC_APP_STORE: 'https://apps.apple.com/app',
  GOOGLE_PLAY: 'https://play.google.com/store/apps/details',
  WEB_APP: ''
};

// InfiniteRuler App Configuration
export const INFINITE_RULER = {
  id: 'infinite-ruler',
  name: 'InfiniteRuler',
  tagline: 'Precision measurement for designers and developers',
  description: 'A powerful on-screen ruler and measurement tool for macOS. Perfect for designers, developers, and anyone who needs precise measurements on their screen.',
  longDescription: `InfiniteRuler brings precision measurement to your Mac with an elegant, always-available on-screen ruler. Whether you're a designer aligning elements, a developer checking spacing, or anyone who needs accurate measurements, InfiniteRuler provides the tools you need.

Key features include multiple measurement units, customizable appearance, keyboard shortcuts for quick access, and a clean interface that stays out of your way until you need it.`,
  
  // App metadata
  status: APP_STATUS.AVAILABLE,
  category: APP_CATEGORIES.PRODUCTIVITY,
  platforms: [PLATFORMS.MACOS],
  version: '2.1.0',
  lastUpdated: '2024-01-15',
  
  // Pricing
  pricing: {
    model: 'paid',
    price: '$4.99',
    currency: 'USD',
    freeTrial: false
  },
  
  // Features
  features: [
    'Pixel-perfect measurements',
    'Multiple units (px, pt, cm, in)',
    'Customizable ruler appearance',
    'Global keyboard shortcuts',
    'Retina display support',
    'Transparent overlay mode',
    'Quick toggle visibility',
    'Measurement guides'
  ],
  
  // Technical specs
  requirements: {
    os: 'macOS 11.0 or later',
    architecture: ['Apple Silicon', 'Intel'],
    diskSpace: '5 MB'
  },
  
  // Media assets
  media: {
    icon: '/assets/images/apps/infiniteruler/icon.png',
    hero: '/assets/images/apps/infiniteruler/hero.png',
    screenshots: [
      '/assets/images/apps/infiniteruler/screenshot-1.png',
      '/assets/images/apps/infiniteruler/screenshot-2.png',
      '/assets/images/apps/infiniteruler/screenshot-3.png'
    ],
    video: null
  },
  
  // Store links
  links: {
    appStore: 'https://apps.apple.com/app/infiniteruler/id123456789',
    website: '/apps/infiniteruler/',
    support: '/support/infiniteruler/',
    pressKit: '/press/infiniteruler/'
  },
  
  // SEO metadata
  seo: {
    title: 'InfiniteRuler - Precision Screen Measurement Tool for macOS',
    description: 'Professional on-screen ruler for macOS. Perfect for designers and developers who need accurate measurements. Download from the Mac App Store.',
    keywords: ['screen ruler', 'measurement tool', 'macOS', 'design tool', 'developer tool', 'precision'],
    ogImage: '/assets/images/apps/infiniteruler/og-image.png'
  },
  
  // Analytics
  analytics: {
    trackingId: 'infinite-ruler',
    events: {
      view: 'app_view_infinite_ruler',
      download: 'app_download_infinite_ruler',
      feature_click: 'app_feature_click_infinite_ruler'
    }
  }
};

// Mental Load App Configuration (Coming Soon)
export const MENTAL_LOAD = {
  id: 'mental-load',
  name: 'Mental Load',
  tagline: 'Reduce cognitive burden, increase family harmony',
  description: 'An iOS app designed to help families fairly distribute household tasks and reduce the mental load on any one person.',
  longDescription: `Mental Load helps families create more equitable households by making the invisible work visible. Track household tasks, automate fair distribution, and reduce the cognitive burden that often falls disproportionately on one family member.

Features include smart task distribution, family member profiles, progress tracking, and insights to help create lasting positive changes in your household dynamics.`,
  
  status: APP_STATUS.IN_DEVELOPMENT,
  category: APP_CATEGORIES.PRODUCTIVITY,
  platforms: [PLATFORMS.IOS],
  version: null,
  lastUpdated: null,
  expectedRelease: '2024-Q2',
  
  pricing: {
    model: 'freemium',
    price: 'Free with Premium features',
    currency: 'USD',
    freeTrial: true
  },
  
  features: [
    'Smart task distribution',
    'Family member profiles',
    'Progress tracking & insights',
    'Customizable task categories',
    'Notification scheduling',
    'Achievement system',
    'Data export & sharing',
    'Offline functionality'
  ],
  
  media: {
    icon: '/assets/images/apps/mental-load/icon.png',
    hero: '/assets/images/apps/mental-load/hero.png',
    screenshots: [],
    mockups: [
      '/assets/images/apps/mental-load/mockup-1.png',
      '/assets/images/apps/mental-load/mockup-2.png'
    ]
  },
  
  links: {
    appStore: null,
    website: '/apps/mental-load/',
    waitlist: '/waitlist/mental-load/',
    updates: '/updates/mental-load/'
  },
  
  seo: {
    title: 'Mental Load - Fair Household Task Distribution iOS App',
    description: 'Reduce cognitive burden and create household harmony. Smart task distribution app for families. Coming soon to iOS.',
    keywords: ['mental load', 'household tasks', 'family organization', 'task distribution', 'iOS app'],
    ogImage: '/assets/images/apps/mental-load/og-image.png'
  },
  
  analytics: {
    trackingId: 'mental-load',
    events: {
      view: 'app_view_mental_load',
      waitlist: 'app_waitlist_mental_load',
      interest: 'app_interest_mental_load'
    }
  }
};

// Placeholder for future apps
export const FUTURE_APPS = [
  {
    id: 'app-placeholder-1',
    name: 'Future App',
    tagline: 'Coming soon',
    description: 'An exciting new app in early development.',
    status: APP_STATUS.COMING_SOON,
    category: APP_CATEGORIES.UTILITY,
    platforms: [PLATFORMS.IOS, PLATFORMS.MACOS],
    expectedRelease: '2024-Q4'
  }
];

// Main apps array
export const APPS = [
  INFINITE_RULER,
  MENTAL_LOAD,
  ...FUTURE_APPS
];

// Helper functions
export const getAppById = (id) => {
  return APPS.find(app => app.id === id);
};

export const getAppsByStatus = (status) => {
  return APPS.filter(app => app.status === status);
};

export const getAppsByCategory = (category) => {
  return APPS.filter(app => app.category === category);
};

export const getAppsByPlatform = (platform) => {
  return APPS.filter(app => app.platforms.includes(platform));
};

export const getFeaturedApps = () => {
  return APPS.filter(app => app.status === APP_STATUS.AVAILABLE);
};

export const getUpcomingApps = () => {
  return APPS.filter(app => 
    app.status === APP_STATUS.COMING_SOON || 
    app.status === APP_STATUS.IN_DEVELOPMENT
  );
};

// Export default configuration object
export default {
  apps: APPS,
  constants: {
    APP_STATUS,
    APP_CATEGORIES,
    PLATFORMS,
    STORE_LINKS
  },
  helpers: {
    getAppById,
    getAppsByStatus,
    getAppsByCategory,
    getAppsByPlatform,
    getFeaturedApps,
    getUpcomingApps
  }
}; 