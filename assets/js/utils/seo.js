/*
 * SEO Utilities
 * Dynamic meta tags, structured data, and social media optimization
 */

export class SEOManager {
  constructor() {
    this.defaultMeta = {
      title: 'Eric Savoie - App Developer & Creator',
      description: 'Independent app developer creating productivity tools and meaningful software experiences. Download InfiniteRuler, Mental Load, and more.',
      keywords: ['app developer', 'productivity apps', 'iOS apps', 'macOS apps', 'Eric Savoie'],
      ogImage: '/assets/images/og-default.png',
      twitterCard: 'summary_large_image'
    };
  }

  // Update page meta tags dynamically
  updateMeta(meta = {}) {
    const finalMeta = { ...this.defaultMeta, ...meta };

    // Update title
    if (finalMeta.title) {
      document.title = finalMeta.title;
      this.updateMetaTag('og:title', finalMeta.title);
      this.updateMetaTag('twitter:title', finalMeta.title);
    }

    // Update description
    if (finalMeta.description) {
      this.updateMetaTag('description', finalMeta.description);
      this.updateMetaTag('og:description', finalMeta.description);
      this.updateMetaTag('twitter:description', finalMeta.description);
    }

    // Update keywords
    if (finalMeta.keywords) {
      const keywordString = Array.isArray(finalMeta.keywords) 
        ? finalMeta.keywords.join(', ') 
        : finalMeta.keywords;
      this.updateMetaTag('keywords', keywordString);
    }

    // Update Open Graph image
    if (finalMeta.ogImage) {
      this.updateMetaTag('og:image', this.getAbsoluteUrl(finalMeta.ogImage));
      this.updateMetaTag('twitter:image', this.getAbsoluteUrl(finalMeta.ogImage));
    }

    // Update URL
    if (finalMeta.url) {
      this.updateMetaTag('og:url', this.getAbsoluteUrl(finalMeta.url));
      this.updateMetaTag('twitter:url', this.getAbsoluteUrl(finalMeta.url));
    } else {
      this.updateMetaTag('og:url', window.location.href);
      this.updateMetaTag('twitter:url', window.location.href);
    }

    // Update Twitter card type
    if (finalMeta.twitterCard) {
      this.updateMetaTag('twitter:card', finalMeta.twitterCard);
    }
  }

  // Update individual meta tag
  updateMetaTag(name, content) {
    // Handle different meta tag formats
    const selectors = [
      `meta[name="${name}"]`,
      `meta[property="${name}"]`,
      `meta[property="og:${name}"]`,
      `meta[name="twitter:${name}"]`
    ];

    let metaTag = null;
    for (const selector of selectors) {
      metaTag = document.querySelector(selector);
      if (metaTag) break;
    }

    if (metaTag) {
      metaTag.setAttribute('content', content);
    } else {
      // Create new meta tag if it doesn't exist
      metaTag = document.createElement('meta');
      
      // Determine the correct attribute (name vs property)
      if (name.startsWith('og:') || name.startsWith('twitter:')) {
        metaTag.setAttribute('property', name);
      } else {
        metaTag.setAttribute('name', name);
      }
      
      metaTag.setAttribute('content', content);
      document.head.appendChild(metaTag);
    }
  }

  // Generate app-specific structured data
  generateAppStructuredData(app) {
    const structuredData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": app.name,
      "description": app.description,
      "applicationCategory": this.mapCategoryToSchema(app.category),
      "operatingSystem": this.mapPlatformsToOS(app.platforms),
      "author": {
        "@type": "Person",
        "name": "Eric Savoie",
        "url": "https://savoie.app"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Eric Savoie",
        "url": "https://savoie.app"
      }
    };

    // Add pricing information
    if (app.pricing) {
      structuredData.offers = {
        "@type": "Offer",
        "price": app.pricing.model === 'paid' ? app.pricing.price.replace('$', '') : "0",
        "priceCurrency": app.pricing.currency || "USD"
      };

      if (app.links.appStore) {
        structuredData.offers.url = app.links.appStore;
      }
    }

    // Add ratings if available
    if (app.rating) {
      structuredData.aggregateRating = {
        "@type": "AggregateRating",
        "ratingValue": app.rating.value,
        "ratingCount": app.rating.count
      };
    }

    // Add screenshots
    if (app.media.screenshots && app.media.screenshots.length > 0) {
      structuredData.screenshot = app.media.screenshots.map(url => this.getAbsoluteUrl(url));
    }

    // Add download/install URLs
    if (app.links.appStore) {
      structuredData.downloadUrl = app.links.appStore;
      structuredData.installUrl = app.links.appStore;
    }

    // Add version info
    if (app.version) {
      structuredData.softwareVersion = app.version;
    }

    // Add release date
    if (app.lastUpdated) {
      structuredData.dateModified = app.lastUpdated;
    }

    return structuredData;
  }

  // Generate breadcrumb structured data
  generateBreadcrumbData(breadcrumbs) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": crumb.name,
        "item": this.getAbsoluteUrl(crumb.url)
      }))
    };
  }

  // Generate organization structured data
  generateOrganizationData() {
    return {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Eric Savoie",
      "url": "https://savoie.app",
      "sameAs": [
        "https://twitter.com/ericsavoie",
        "https://github.com/ericsavoie119"
      ],
      "jobTitle": "App Developer",
      "description": "Independent app developer creating productivity tools and meaningful software experiences.",
      "knowsAbout": [
        "iOS Development",
        "macOS Development",
        "App Design",
        "User Experience",
        "Productivity Tools"
      ]
    };
  }

  // Generate website structured data
  generateWebsiteData() {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Eric Savoie",
      "url": "https://savoie.app",
      "description": "Independent app developer creating productivity tools and meaningful software experiences.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://savoie.app/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };
  }

  // Add structured data to page
  addStructuredData(data, id = null) {
    // Remove existing structured data with the same ID
    if (id) {
      const existing = document.getElementById(id);
      if (existing) {
        existing.remove();
      }
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    if (id) {
      script.id = id;
    }
    script.textContent = JSON.stringify(data, null, 2);
    document.head.appendChild(script);
  }

  // Generate sitemap data (for client-side sitemap generation)
  generateSitemapData() {
    const baseUrl = 'https://savoie.app';
    const urls = [
      { loc: baseUrl, priority: 1.0, changefreq: 'weekly' },
      { loc: `${baseUrl}/apps/`, priority: 0.9, changefreq: 'weekly' },
      { loc: `${baseUrl}/apps/infiniteruler/`, priority: 0.8, changefreq: 'monthly' },
      { loc: `${baseUrl}/apps/mental-load/`, priority: 0.8, changefreq: 'weekly' },
      { loc: `${baseUrl}/privacy-policy.html`, priority: 0.3, changefreq: 'yearly' },
      { loc: `${baseUrl}/terms.html`, priority: 0.3, changefreq: 'yearly' }
    ];

    return urls;
  }

  // Utility functions
  getAbsoluteUrl(path) {
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path;
    }
    
    const baseUrl = window.location.origin;
    return path.startsWith('/') ? `${baseUrl}${path}` : `${baseUrl}/${path}`;
  }

  mapCategoryToSchema(category) {
    const mapping = {
      'productivity': 'BusinessApplication',
      'creative': 'DesignApplication',
      'business': 'BusinessApplication',
      'utility': 'UtilitiesApplication',
      'entertainment': 'EntertainmentApplication'
    };
    return mapping[category] || 'SoftwareApplication';
  }

  mapPlatformsToOS(platforms) {
    const osMapping = {
      'ios': 'iOS',
      'macos': 'macOS',
      'web': 'Web Browser',
      'android': 'Android'
    };
    
    return platforms.map(platform => osMapping[platform] || platform).join(', ');
  }

  // Initialize SEO for the current page
  initPageSEO(pageType = 'default', data = {}) {
    switch (pageType) {
      case 'app-detail':
        this.initAppDetailSEO(data);
        break;
      case 'apps-directory':
        this.initAppsDirectorySEO();
        break;
      case 'home':
        this.initHomeSEO();
        break;
      default:
        this.updateMeta();
        break;
    }

    // Add common structured data
    this.addStructuredData(this.generateOrganizationData(), 'organization-data');
    this.addStructuredData(this.generateWebsiteData(), 'website-data');
  }

  // Initialize SEO for app detail pages
  initAppDetailSEO(app) {
    if (!app) return;

    const meta = {
      title: `${app.name} - ${app.tagline} | Eric Savoie`,
      description: app.seo?.description || app.description,
      keywords: app.seo?.keywords || [app.name, ...app.features.slice(0, 3)],
      ogImage: app.seo?.ogImage || app.media.hero,
      url: app.links.website
    };

    this.updateMeta(meta);
    this.addStructuredData(this.generateAppStructuredData(app), 'app-data');

    // Add breadcrumb data
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Apps', url: '/apps/' },
      { name: app.name, url: app.links.website }
    ];
    this.addStructuredData(this.generateBreadcrumbData(breadcrumbs), 'breadcrumb-data');
  }

  // Initialize SEO for apps directory page
  initAppsDirectorySEO() {
    const meta = {
      title: 'Apps by Eric Savoie - Productivity Tools & Creative Solutions',
      description: 'Discover productivity apps and creative tools by Eric Savoie. From InfiniteRuler for precise measurements to Mental Load for household harmony.',
      keywords: ['productivity apps', 'design tools', 'developer tools', 'iOS apps', 'macOS apps', 'Eric Savoie'],
      ogImage: '/assets/images/og-apps.png',
      url: '/apps/'
    };

    this.updateMeta(meta);

    // Add breadcrumb data
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Apps', url: '/apps/' }
    ];
    this.addStructuredData(this.generateBreadcrumbData(breadcrumbs), 'breadcrumb-data');
  }

  // Initialize SEO for home page
  initHomeSEO() {
    const meta = {
      title: 'Eric Savoie - App Developer & Creator',
      description: 'Independent app developer creating productivity tools and meaningful software experiences. Download InfiniteRuler, Mental Load, and more.',
      keywords: ['app developer', 'productivity apps', 'iOS apps', 'macOS apps', 'Eric Savoie'],
      ogImage: '/assets/images/og-home.png',
      url: '/'
    };

    this.updateMeta(meta);
  }
}

// Analytics integration
export class AnalyticsManager {
  constructor() {
    this.isGtagLoaded = typeof gtag !== 'undefined';
  }

  // Track page views
  trackPageView(title, location = window.location.href) {
    if (this.isGtagLoaded) {
      gtag('event', 'page_view', {
        page_title: title,
        page_location: location
      });
    }
  }

  // Track app interactions
  trackAppInteraction(appName, action, details = {}) {
    if (this.isGtagLoaded) {
      gtag('event', 'app_interaction', {
        app_name: appName,
        action: action,
        ...details
      });
    }
  }

  // Track download clicks
  trackDownload(appName, source, value = null) {
    if (this.isGtagLoaded) {
      gtag('event', 'app_download', {
        app_name: appName,
        source: source,
        value: value
      });
    }
  }

  // Track waitlist signups
  trackWaitlistSignup(appName, email = null) {
    if (this.isGtagLoaded) {
      gtag('event', 'waitlist_signup', {
        app_name: appName,
        method: 'email'
      });
    }
  }

  // Track newsletter signups
  trackNewsletterSignup(source = 'unknown') {
    if (this.isGtagLoaded) {
      gtag('event', 'newsletter_signup', {
        method: source
      });
    }
  }
}

// Create global instances
export const seoManager = new SEOManager();
export const analyticsManager = new AnalyticsManager();

// Auto-initialize SEO on page load
document.addEventListener('DOMContentLoaded', () => {
  // Determine page type based on URL and page content
  const path = window.location.pathname;
  
  if (path === '/') {
    seoManager.initPageSEO('home');
  } else if (path === '/apps/') {
    seoManager.initPageSEO('apps-directory');
  } else if (path.startsWith('/apps/') && path !== '/apps/') {
    // This is an app detail page - we'll need to get app data
    // This will be handled by individual app pages
    seoManager.initPageSEO('default');
  } else {
    seoManager.initPageSEO('default');
  }
});

export default {
  SEOManager,
  AnalyticsManager,
  seoManager,
  analyticsManager
}; 