/*
 * Analytics Manager
 * Google Analytics 4 integration with privacy compliance and comprehensive tracking
 */

export class AnalyticsManager {
  constructor(options = {}) {
    this.measurementId = options.measurementId || 'G-XXXXXXXXXX'; // Replace with actual ID
    this.debug = options.debug || false;
    this.privacyMode = options.privacyMode || false;
    this.consentGiven = false;
    this.initialized = false;
    this.eventQueue = [];
    
    // Configuration
    this.config = {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      restricted_data_processing: true,
      ...options.config
    };
    
    this.init();
  }

  async init() {
    if (this.initialized) return;
    
    // Check for consent
    this.checkConsent();
    
    // Load Google Analytics if consent given
    if (this.consentGiven) {
      await this.loadGoogleAnalytics();
    }
    
    // Set up event listeners
    this.setupEventListeners();
    
    this.initialized = true;
    console.log('📊 Analytics Manager initialized');
  }

  // Load Google Analytics script
  async loadGoogleAnalytics() {
    return new Promise((resolve, reject) => {
      // Create script element
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${this.measurementId}`;
      script.onload = () => {
        this.initializeGtag();
        resolve();
      };
      script.onerror = reject;
      
      document.head.appendChild(script);
    });
  }

  // Initialize gtag
  initializeGtag() {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    // Configure gtag
    window.gtag('js', new Date());
    window.gtag('config', this.measurementId, {
      ...this.config,
      debug_mode: this.debug,
      send_page_view: false // We'll send manually
    });

    // Process queued events
    this.processEventQueue();
    
    // Send initial page view
    this.trackPageView();
    
    console.log('✅ Google Analytics loaded and configured');
  }

  // Check user consent
  checkConsent() {
    // Check localStorage for consent
    const consent = localStorage.getItem('analytics-consent');
    
    if (consent === 'granted') {
      this.consentGiven = true;
    } else if (consent === 'denied') {
      this.consentGiven = false;
    } else {
      // Show consent banner if no choice made
      this.showConsentBanner();
    }
  }

  // Show consent banner
  showConsentBanner() {
    const banner = document.createElement('div');
    banner.id = 'analytics-consent-banner';
    banner.innerHTML = `
      <div style="
        position: fixed; bottom: 0; left: 0; right: 0; 
        background: rgba(67, 26, 0, 0.95); color: white;
        padding: 20px; z-index: 10000; font-family: system-ui, sans-serif;
        border-top: 3px solid var(--color-primary);
        backdrop-filter: blur(10px);
      ">
        <div style="max-width: 1200px; margin: 0 auto; display: flex; align-items: center; gap: 20px; flex-wrap: wrap;">
          <div style="flex: 1; min-width: 250px;">
            <strong>🍪 Analytics & Privacy</strong><br>
            <span style="opacity: 0.9; font-size: 14px;">
              We use analytics to improve your experience. Your data is anonymized and never sold.
            </span>
          </div>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            <button onclick="window.analytics.grantConsent()" style="
              background: var(--color-primary); border: none; color: white;
              padding: 10px 20px; border-radius: 6px; cursor: pointer;
              font-weight: 600; transition: all 0.3s ease;
            ">Accept</button>
            <button onclick="window.analytics.denyConsent()" style="
              background: transparent; border: 2px solid rgba(255,255,255,0.3);
              color: white; padding: 8px 18px; border-radius: 6px; cursor: pointer;
              transition: all 0.3s ease;
            ">Decline</button>
            <a href="/privacy-policy.html" style="
              color: rgba(255,255,255,0.7); text-decoration: none;
              padding: 10px; font-size: 14px;
            ">Privacy Policy</a>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(banner);
  }

  // Grant consent
  async grantConsent() {
    localStorage.setItem('analytics-consent', 'granted');
    this.consentGiven = true;
    
    // Load analytics if not already loaded
    if (!window.gtag && !this.debug) {
      await this.loadGoogleAnalytics();
    }
    
    // Hide consent banner
    const banner = document.getElementById('analytics-consent-banner');
    if (banner) banner.remove();
    
    // Update gtag consent
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
    
    console.log('✅ Analytics consent granted');
  }

  // Deny consent
  denyConsent() {
    localStorage.setItem('analytics-consent', 'denied');
    this.consentGiven = false;
    
    // Hide consent banner
    const banner = document.getElementById('analytics-consent-banner');
    if (banner) banner.remove();
    
    // Clear any existing analytics data
    this.clearAnalyticsData();
    
    console.log('❌ Analytics consent denied');
  }

  // Clear analytics data
  clearAnalyticsData() {
    // Clear gtag if loaded
    if (window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
    
    // Clear any analytics cookies
    const cookies = document.cookie.split(';');
    cookies.forEach(cookie => {
      const eqPos = cookie.indexOf('=');
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      if (name.startsWith('_ga') || name.startsWith('_gid')) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    });
  }

  // Setup event listeners for automatic tracking
  setupEventListeners() {
    // Track clicks on external links
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && this.isExternalLink(link.href)) {
        this.trackEvent('click', 'external_link', {
          link_url: link.href,
          link_text: link.textContent.trim().substring(0, 100)
        });
      }
    });

    // Track app store clicks
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (link && this.isAppStoreLink(link.href)) {
        const storeType = this.getStoreType(link.href);
        this.trackEvent('click', 'app_store_link', {
          store_type: storeType,
          link_url: link.href
        });
      }
    });

    // Track download attempts
    document.addEventListener('click', (e) => {
      const button = e.target.closest('[data-track="download"]');
      if (button) {
        const appName = button.getAttribute('data-app-name') || 'unknown';
        this.trackEvent('click', 'download_attempt', {
          app_name: appName,
          download_type: button.getAttribute('data-download-type') || 'unknown'
        });
      }
    });

    // Track form submissions
    document.addEventListener('submit', (e) => {
      const form = e.target;
      if (form.tagName === 'FORM') {
        const formType = form.getAttribute('data-form-type') || 'unknown';
        this.trackEvent('form', 'submit', {
          form_type: formType,
          form_id: form.id || 'unnamed'
        });
      }
    });

    // Track scroll depth
    this.setupScrollTracking();
    
    // Track engagement time
    this.setupEngagementTracking();
  }

  // Setup scroll depth tracking
  setupScrollTracking() {
    let scrollThresholds = [25, 50, 75, 90];
    let triggeredThresholds = new Set();

    const trackScroll = () => {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
      
      scrollThresholds.forEach(threshold => {
        if (scrolled >= threshold && !triggeredThresholds.has(threshold)) {
          triggeredThresholds.add(threshold);
          this.trackEvent('scroll', 'depth', {
            scroll_depth: threshold,
            page_location: window.location.href
          });
        }
      });
    };

    window.addEventListener('scroll', this.throttle(trackScroll, 500));
  }

  // Setup engagement time tracking
  setupEngagementTracking() {
    let startTime = Date.now();
    let isActive = true;

    // Track when user becomes inactive
    const inactivityEvents = ['blur', 'visibilitychange'];
    const activityEvents = ['focus', 'scroll', 'mousemove', 'keydown'];

    inactivityEvents.forEach(event => {
      document.addEventListener(event, () => {
        if (isActive) {
          const engagementTime = Date.now() - startTime;
          this.trackEvent('engagement', 'session_end', {
            engagement_time_msec: engagementTime
          });
          isActive = false;
        }
      });
    });

    activityEvents.forEach(event => {
      document.addEventListener(event, () => {
        if (!isActive) {
          startTime = Date.now();
          isActive = true;
        }
      });
    });

    // Track before page unload
    window.addEventListener('beforeunload', () => {
      if (isActive) {
        const engagementTime = Date.now() - startTime;
        this.trackEvent('engagement', 'page_unload', {
          engagement_time_msec: engagementTime
        });
      }
    });
  }

  // Track page view
  trackPageView(url = window.location.href, title = document.title) {
    if (!this.canTrack()) return;

    const event = {
      page_title: title,
      page_location: url,
      page_referrer: document.referrer
    };

    if (window.gtag) {
      window.gtag('event', 'page_view', event);
    } else {
      this.queueEvent('page_view', event);
    }

    if (this.debug) {
      console.log('📄 Page view tracked:', event);
    }
  }

  // Track custom event
  trackEvent(action, category, parameters = {}) {
    if (!this.canTrack()) return;

    const event = {
      event_category: category,
      event_label: parameters.label || '',
      value: parameters.value || 0,
      ...parameters
    };

    if (window.gtag) {
      window.gtag('event', action, event);
    } else {
      this.queueEvent(action, event);
    }

    if (this.debug) {
      console.log(`📊 Event tracked: ${action}`, event);
    }
  }

  // Track conversion
  trackConversion(conversionId, parameters = {}) {
    if (!this.canTrack()) return;

    const event = {
      send_to: conversionId,
      ...parameters
    };

    if (window.gtag) {
      window.gtag('event', 'conversion', event);
    } else {
      this.queueEvent('conversion', event);
    }

    console.log('🎯 Conversion tracked:', conversionId, event);
  }

  // Track ecommerce purchase (for future use)
  trackPurchase(transactionId, items, parameters = {}) {
    if (!this.canTrack()) return;

    const event = {
      transaction_id: transactionId,
      value: parameters.value || 0,
      currency: parameters.currency || 'USD',
      items: items,
      ...parameters
    };

    if (window.gtag) {
      window.gtag('event', 'purchase', event);
    } else {
      this.queueEvent('purchase', event);
    }

    console.log('💰 Purchase tracked:', event);
  }

  // Set user properties
  setUserProperties(properties) {
    if (!this.canTrack()) return;

    if (window.gtag) {
      window.gtag('set', 'user_properties', properties);
    }

    if (this.debug) {
      console.log('👤 User properties set:', properties);
    }
  }

  // Queue event for later processing
  queueEvent(action, parameters) {
    this.eventQueue.push({ action, parameters, timestamp: Date.now() });
  }

  // Process queued events
  processEventQueue() {
    while (this.eventQueue.length > 0) {
      const { action, parameters } = this.eventQueue.shift();
      if (window.gtag) {
        window.gtag('event', action, parameters);
      }
    }
  }

  // Check if tracking is allowed
  canTrack() {
    return this.consentGiven && (window.gtag || this.debug);
  }

  // Utility functions
  isExternalLink(url) {
    try {
      const link = new URL(url, window.location.href);
      return link.hostname !== window.location.hostname;
    } catch {
      return false;
    }
  }

  isAppStoreLink(url) {
    return url.includes('apps.apple.com') || 
           url.includes('play.google.com') || 
           url.includes('microsoft.com/store');
  }

  getStoreType(url) {
    if (url.includes('apps.apple.com')) return 'app_store';
    if (url.includes('play.google.com')) return 'google_play';
    if (url.includes('microsoft.com/store')) return 'microsoft_store';
    return 'unknown';
  }

  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  // Debug methods
  enableDebug() {
    this.debug = true;
    console.log('🔍 Analytics debug mode enabled');
  }

  disableDebug() {
    this.debug = false;
    console.log('🔍 Analytics debug mode disabled');
  }

  getDebugInfo() {
    return {
      initialized: this.initialized,
      consentGiven: this.consentGiven,
      measurementId: this.measurementId,
      queuedEvents: this.eventQueue.length,
      gtag: !!window.gtag
    };
  }
}

// Performance Analytics Integration
export class PerformanceAnalytics {
  constructor(analyticsManager) {
    this.analytics = analyticsManager;
    this.init();
  }

  init() {
    // Track Core Web Vitals
    this.trackCoreWebVitals();
    
    // Track resource timing
    this.trackResourceTiming();
    
    // Track navigation timing
    this.trackNavigationTiming();
  }

  trackCoreWebVitals() {
    // Import web-vitals library dynamically if available
    if (window.webVitals) {
      window.webVitals.getCLS(this.sendToAnalytics.bind(this));
      window.webVitals.getFID(this.sendToAnalytics.bind(this));
      window.webVitals.getFCP(this.sendToAnalytics.bind(this));
      window.webVitals.getLCP(this.sendToAnalytics.bind(this));
      window.webVitals.getTTFB(this.sendToAnalytics.bind(this));
    }
  }

  sendToAnalytics(metric) {
    this.analytics.trackEvent('performance', 'web_vitals', {
      metric_name: metric.name,
      metric_value: Math.round(metric.value),
      metric_id: metric.id,
      metric_delta: Math.round(metric.delta)
    });
  }

  trackResourceTiming() {
    // Track slow resources
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach(entry => {
        if (entry.duration > 1000) { // Slow resource > 1s
          this.analytics.trackEvent('performance', 'slow_resource', {
            resource_name: entry.name,
            resource_duration: Math.round(entry.duration),
            resource_type: entry.initiatorType
          });
        }
      });
    });

    try {
      observer.observe({ type: 'resource', buffered: true });
    } catch (e) {
      console.warn('Resource timing not supported');
    }
  }

  trackNavigationTiming() {
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = performance.getEntriesByType('navigation')[0];
        if (perfData) {
          this.analytics.trackEvent('performance', 'navigation_timing', {
            dns_time: Math.round(perfData.domainLookupEnd - perfData.domainLookupStart),
            tcp_time: Math.round(perfData.connectEnd - perfData.connectStart),
            ttfb: Math.round(perfData.responseStart - perfData.requestStart),
            dom_content_loaded: Math.round(perfData.domContentLoadedEventEnd - perfData.navigationStart),
            page_load: Math.round(perfData.loadEventEnd - perfData.navigationStart)
          });
        }
      }, 1000);
    });
  }
}

// Create and expose global analytics instance
const analytics = new AnalyticsManager({
  measurementId: 'G-XXXXXXXXXX', // Replace with actual measurement ID
  debug: window.location.hostname === 'localhost',
  config: {
    anonymize_ip: true,
    allow_google_signals: false,
    allow_ad_personalization_signals: false
  }
});

// Performance analytics
const performanceAnalytics = new PerformanceAnalytics(analytics);

// Make available globally
window.analytics = analytics;
window.performanceAnalytics = performanceAnalytics;

export { analytics, performanceAnalytics };
export default analytics; 