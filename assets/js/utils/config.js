/*
 * App Configuration System
 * Centralized configuration for managing app data
 */

// App configuration data
export const APP_CONFIG = {
  // Site information
  site: {
    title: "Eric Savoie - iOS Developer",
    description: "Building beautiful, intuitive apps for iPhone and iPad",
    author: "Eric Savoie",
    email: "eric@savoie.app",
    domain: "savoie.app",
    social: {
      linkedin: "https://www.linkedin.com/in/eric-savoie-2a713241/",
      github: "https://github.com/EricSavoie119",
      email: "mailto:eric@savoie.app"
    }
  },

  // Live apps (shipped to App Store)
  liveApps: [
    {
      id: "infiniteruler",
      name: "InfiniteRuler",
      description: "Digital measuring tool that turns your iPhone screen into a precise ruler using pixel density calculations.",
      icon: "assets/images/icons/infiniteruler.png",
      features: ["SwiftUI", "Offline", "Precision"],
      launchDate: "June 6, 2025",
      detailPage: "infiniteruler.html",
      appStoreUrl: "#", // Will be updated when app goes live
      status: "live",
      screenshots: [
        // Screenshots will be added as they become available
      ],
      compatibility: "iPhone 11 and newer",
      version: "1.0.0",
      category: "Utilities",
      requirements: "iOS 15.0 or later"
    }
  ],

  // Apps in development
  upcomingApps: [
    {
      id: "app-one",
      name: "App One",
      description: "Revolutionary iOS app that will change how you interact with your daily tasks. Built with SwiftUI and featuring cutting-edge design.",
      features: ["SwiftUI", "Core Data", "WidgetKit"],
      expectedLaunch: "Spring 2025",
      status: "development",
      category: "Productivity"
    },
    {
      id: "app-two", 
      name: "App Two",
      description: "Innovative productivity app designed for modern professionals. Seamlessly integrates with your workflow and adapts to your needs.",
      features: ["UIKit", "CloudKit", "AR"],
      expectedLaunch: "Summer 2025",
      status: "development",
      category: "Productivity"
    }
  ],

  // Navigation configuration
  navigation: {
    main: [
      { label: "Home", href: "#home", id: "home" },
      { label: "Apps", href: "#apps", id: "apps" },
      { label: "Coming Soon", href: "#upcoming", id: "upcoming" },
      { label: "Privacy", href: "privacy-policy.html", id: "privacy" },
      { label: "About", href: "about.html", id: "about" }
    ],
    footer: {
      connect: [
        { label: "Email", href: "mailto:eric@savoie.app" },
        { label: "LinkedIn", href: "https://www.linkedin.com/in/eric-savoie-2a713241/" },
        { label: "GitHub", href: "https://github.com/EricSavoie119" }
      ],
      legal: [
        { label: "Privacy Policy", href: "privacy-policy.html" },
        { label: "Terms of Service", href: "terms.html" }
      ]
    }
  },

  // Feature flags
  features: {
    darkMode: true,
    animations: true,
    analytics: false, // Will be enabled when analytics are set up
    newsletter: false, // Future feature
    blog: false // Future feature
  },

  // SEO and meta information
  seo: {
    keywords: [
      "iOS Developer",
      "iPhone Apps",
      "iPad Apps", 
      "SwiftUI",
      "App Development",
      "Mobile Apps",
      "InfiniteRuler",
      "Digital Ruler",
      "Measuring App"
    ],
    ogImage: "assets/images/hero/og-image.png", // Future addition
    twitterCard: "summary_large_image"
  }
};

// Utility functions for working with config data
export const ConfigUtils = {
  // Get live apps
  getLiveApps() {
    return APP_CONFIG.liveApps.filter(app => app.status === 'live');
  },

  // Get upcoming apps
  getUpcomingApps() {
    return APP_CONFIG.upcomingApps.filter(app => app.status === 'development');
  },

  // Get app by ID
  getAppById(id) {
    const allApps = [...APP_CONFIG.liveApps, ...APP_CONFIG.upcomingApps];
    return allApps.find(app => app.id === id);
  },

  // Check if feature is enabled
  isFeatureEnabled(feature) {
    return APP_CONFIG.features[feature] || false;
  },

  // Get navigation items
  getNavigation() {
    return APP_CONFIG.navigation.main;
  },

  // Get footer links
  getFooterLinks() {
    return APP_CONFIG.navigation.footer;
  },

  // Generate structured data for SEO
  generateStructuredData() {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": APP_CONFIG.site.author,
      "jobTitle": "iOS Developer",
      "email": APP_CONFIG.site.email,
      "url": `https://${APP_CONFIG.site.domain}`,
      "sameAs": [
        APP_CONFIG.site.social.linkedin,
        APP_CONFIG.site.social.github
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Independent Developer"
      },
      "knowsAbout": [
        "iOS Development",
        "SwiftUI",
        "UIKit",
        "Mobile App Development",
        "iPhone Apps",
        "iPad Apps"
      ]
    };
  }
};

// Export default config for convenience
export default APP_CONFIG; 