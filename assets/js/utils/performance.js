/*
 * Performance Monitoring Utilities
 * Core Web Vitals tracking, resource monitoring, and optimization recommendations
 */

export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fcp: null,      // First Contentful Paint
      lcp: null,      // Largest Contentful Paint
      fid: null,      // First Input Delay
      cls: null,      // Cumulative Layout Shift
      ttfb: null,     // Time to First Byte
      fmp: null,      // First Meaningful Paint
      tti: null,      // Time to Interactive
      tbt: null       // Total Blocking Time
    };
    
    this.thresholds = {
      fcp: { good: 1800, poor: 3000 },
      lcp: { good: 2500, poor: 4000 },
      fid: { good: 100, poor: 300 },
      cls: { good: 0.1, poor: 0.25 },
      ttfb: { good: 800, poor: 1800 }
    };
    
    this.observations = [];
    this.isInitialized = false;
    this.init();
  }

  async init() {
    if (this.isInitialized) return;
    
    // Initialize Core Web Vitals monitoring
    this.initCoreWebVitals();
    
    // Initialize resource timing monitoring
    this.initResourceTiming();
    
    // Initialize navigation timing
    this.initNavigationTiming();
    
    // Initialize memory monitoring (if supported)
    this.initMemoryMonitoring();
    
    // Initialize connection monitoring
    this.initConnectionMonitoring();
    
    this.isInitialized = true;
    console.log('📊 Performance monitoring initialized');
  }

  // Core Web Vitals monitoring
  initCoreWebVitals() {
    // First Contentful Paint
    this.observePerformanceEntry('paint', (entries) => {
      const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        this.metrics.fcp = fcpEntry.startTime;
        this.reportMetric('FCP', fcpEntry.startTime);
      }
    });

    // Largest Contentful Paint
    this.observePerformanceEntry('largest-contentful-paint', (entries) => {
      const lcpEntry = entries[entries.length - 1];
      if (lcpEntry) {
        this.metrics.lcp = lcpEntry.startTime;
        this.reportMetric('LCP', lcpEntry.startTime);
      }
    });

    // Cumulative Layout Shift
    let clsValue = 0;
    this.observePerformanceEntry('layout-shift', (entries) => {
      for (const entry of entries) {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      }
      this.metrics.cls = clsValue;
      this.reportMetric('CLS', clsValue);
    });

    // First Input Delay
    this.observePerformanceEntry('first-input', (entries) => {
      const fidEntry = entries[0];
      if (fidEntry) {
        this.metrics.fid = fidEntry.processingStart - fidEntry.startTime;
        this.reportMetric('FID', this.metrics.fid);
      }
    });

    // Time to First Byte
    this.getTTFB().then(ttfb => {
      this.metrics.ttfb = ttfb;
      this.reportMetric('TTFB', ttfb);
    });
  }

  // Resource timing monitoring
  initResourceTiming() {
    // Monitor all resource loading
    this.observePerformanceEntry('resource', (entries) => {
      for (const entry of entries) {
        this.analyzeResourceTiming(entry);
      }
    });

    // Monitor navigation timing
    this.observePerformanceEntry('navigation', (entries) => {
      for (const entry of entries) {
        this.analyzeNavigationTiming(entry);
      }
    });
  }

  // Navigation timing analysis
  initNavigationTiming() {
    if (window.performance && window.performance.timing) {
      const timing = window.performance.timing;
      
      // Calculate key timing metrics
      const domContentLoaded = timing.domContentLoadedEventEnd - timing.navigationStart;
      const windowLoad = timing.loadEventEnd - timing.navigationStart;
      const domInteractive = timing.domInteractive - timing.navigationStart;
      
      this.metrics.domContentLoaded = domContentLoaded;
      this.metrics.windowLoad = windowLoad;
      this.metrics.domInteractive = domInteractive;
      
      this.reportMetric('DOM Content Loaded', domContentLoaded);
      this.reportMetric('Window Load', windowLoad);
      this.reportMetric('DOM Interactive', domInteractive);
    }
  }

  // Memory monitoring
  initMemoryMonitoring() {
    if (window.performance && window.performance.memory) {
      const memory = window.performance.memory;
      
      this.metrics.memory = {
        usedJSHeapSize: memory.usedJSHeapSize,
        totalJSHeapSize: memory.totalJSHeapSize,
        jsHeapSizeLimit: memory.jsHeapSizeLimit
      };
      
      // Monitor memory usage periodically
      setInterval(() => {
        this.updateMemoryMetrics();
      }, 30000); // Every 30 seconds
    }
  }

  // Connection monitoring
  initConnectionMonitoring() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      this.metrics.connection = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
      
      // Monitor connection changes
      connection.addEventListener('change', () => {
        this.updateConnectionMetrics();
      });
    }
  }

  // Generic performance observer
  observePerformanceEntry(type, callback) {
    try {
      const observer = new PerformanceObserver((list) => {
        callback(list.getEntries());
      });
      
      observer.observe({ type, buffered: true });
    } catch (error) {
      console.warn(`Performance observer for ${type} not supported:`, error);
    }
  }

  // Get Time to First Byte
  async getTTFB() {
    return new Promise((resolve) => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const navigationEntry = entries.find(entry => entry.entryType === 'navigation');
        
        if (navigationEntry) {
          const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
          resolve(ttfb);
          observer.disconnect();
        }
      });
      
      try {
        observer.observe({ type: 'navigation', buffered: true });
      } catch (error) {
        // Fallback for older browsers
        if (window.performance && window.performance.timing) {
          const timing = window.performance.timing;
          const ttfb = timing.responseStart - timing.requestStart;
          resolve(ttfb);
        } else {
          resolve(null);
        }
      }
    });
  }

  // Analyze resource timing
  analyzeResourceTiming(entry) {
    const resourceType = this.getResourceType(entry.name);
    const loadTime = entry.responseEnd - entry.startTime;
    const transferSize = entry.transferSize || 0;
    
    // Track slow resources
    if (loadTime > 1000) { // More than 1 second
      this.reportSlowResource(entry.name, loadTime, resourceType);
    }
    
    // Track large resources
    if (transferSize > 100 * 1024) { // More than 100KB
      this.reportLargeResource(entry.name, transferSize, resourceType);
    }
    
    // Calculate efficiency metrics
    const efficiency = transferSize > 0 ? loadTime / transferSize : 0;
    
    this.observations.push({
      type: 'resource',
      name: entry.name,
      resourceType,
      loadTime,
      transferSize,
      efficiency,
      timestamp: Date.now()
    });
  }

  // Analyze navigation timing
  analyzeNavigationTiming(entry) {
    const metrics = {
      dns: entry.domainLookupEnd - entry.domainLookupStart,
      tcp: entry.connectEnd - entry.connectStart,
      ssl: entry.secureConnectionStart > 0 ? entry.connectEnd - entry.secureConnectionStart : 0,
      ttfb: entry.responseStart - entry.requestStart,
      download: entry.responseEnd - entry.responseStart,
      domProcessing: entry.domContentLoadedEventStart - entry.responseEnd,
      resourceLoading: entry.loadEventStart - entry.domContentLoadedEventEnd
    };
    
    for (const [metric, value] of Object.entries(metrics)) {
      this.reportMetric(`Navigation ${metric}`, value);
    }
  }

  // Update memory metrics
  updateMemoryMetrics() {
    if (window.performance && window.performance.memory) {
      const memory = window.performance.memory;
      const memoryUsage = (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100;
      
      this.metrics.memory.usedJSHeapSize = memory.usedJSHeapSize;
      this.metrics.memory.totalJSHeapSize = memory.totalJSHeapSize;
      this.metrics.memoryUsagePercent = memoryUsage;
      
      // Warn if memory usage is high
      if (memoryUsage > 80) {
        console.warn('⚠️ High memory usage detected:', memoryUsage.toFixed(1) + '%');
      }
    }
  }

  // Update connection metrics
  updateConnectionMetrics() {
    if ('connection' in navigator) {
      const connection = navigator.connection;
      
      this.metrics.connection = {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
      
      console.log('🌐 Connection changed:', this.metrics.connection);
    }
  }

  // Report individual metric
  reportMetric(name, value) {
    const score = this.getMetricScore(name, value);
    const status = this.getMetricStatus(name, value);
    
    console.log(`📊 ${name}: ${value.toFixed(2)}ms (${status})`);
    
    // Send to analytics if available
    if (typeof gtag !== 'undefined') {
      gtag('event', 'performance_metric', {
        metric_name: name,
        metric_value: Math.round(value),
        metric_score: score,
        metric_status: status
      });
    }
  }

  // Get metric score (0-100)
  getMetricScore(name, value) {
    const metricKey = name.toLowerCase().replace(/\s+/g, '');
    const threshold = this.thresholds[metricKey];
    
    if (!threshold) return 100;
    
    if (value <= threshold.good) return 100;
    if (value <= threshold.poor) return 50;
    return 0;
  }

  // Get metric status
  getMetricStatus(name, value) {
    const metricKey = name.toLowerCase().replace(/\s+/g, '');
    const threshold = this.thresholds[metricKey];
    
    if (!threshold) return 'unknown';
    
    if (value <= threshold.good) return 'good';
    if (value <= threshold.poor) return 'needs-improvement';
    return 'poor';
  }

  // Report slow resource
  reportSlowResource(url, loadTime, type) {
    console.warn(`🐌 Slow ${type} resource:`, url, `${loadTime.toFixed(2)}ms`);
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'slow_resource', {
        resource_url: url,
        resource_type: type,
        load_time: Math.round(loadTime)
      });
    }
  }

  // Report large resource
  reportLargeResource(url, size, type) {
    const sizeKB = (size / 1024).toFixed(1);
    console.warn(`📦 Large ${type} resource:`, url, `${sizeKB}KB`);
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'large_resource', {
        resource_url: url,
        resource_type: type,
        resource_size: Math.round(size)
      });
    }
  }

  // Get resource type from URL
  getResourceType(url) {
    if (url.includes('.css')) return 'css';
    if (url.includes('.js')) return 'javascript';
    if (url.match(/\.(png|jpg|jpeg|gif|webp|svg)$/i)) return 'image';
    if (url.match(/\.(woff|woff2|ttf|otf)$/i)) return 'font';
    if (url.includes('/api/')) return 'api';
    return 'other';
  }

  // Generate performance report
  generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      metrics: { ...this.metrics },
      scores: {},
      recommendations: []
    };
    
    // Calculate scores
    for (const [metric, value] of Object.entries(this.metrics)) {
      if (value !== null && typeof value === 'number') {
        report.scores[metric] = this.getMetricScore(metric, value);
      }
    }
    
    // Generate recommendations
    report.recommendations = this.generateRecommendations();
    
    return report;
  }

  // Generate optimization recommendations
  generateRecommendations() {
    const recommendations = [];
    
    // LCP recommendations
    if (this.metrics.lcp > this.thresholds.lcp.poor) {
      recommendations.push({
        type: 'LCP',
        severity: 'high',
        title: 'Improve Largest Contentful Paint',
        description: 'Your LCP is slow. Consider optimizing images, reducing server response times, and eliminating render-blocking resources.',
        actions: [
          'Optimize and compress images',
          'Use modern image formats (WebP)',
          'Implement lazy loading',
          'Reduce server response time',
          'Remove unused CSS and JavaScript'
        ]
      });
    }
    
    // FCP recommendations
    if (this.metrics.fcp > this.thresholds.fcp.poor) {
      recommendations.push({
        type: 'FCP',
        severity: 'medium',
        title: 'Improve First Contentful Paint',
        description: 'Your FCP could be faster. Focus on eliminating render-blocking resources.',
        actions: [
          'Inline critical CSS',
          'Defer non-critical CSS',
          'Remove unused code',
          'Optimize web fonts'
        ]
      });
    }
    
    // CLS recommendations
    if (this.metrics.cls > this.thresholds.cls.poor) {
      recommendations.push({
        type: 'CLS',
        severity: 'high',
        title: 'Reduce Cumulative Layout Shift',
        description: 'Your page has significant layout shifts. Ensure stable layouts.',
        actions: [
          'Set dimensions for images and videos',
          'Reserve space for ads and embeds',
          'Use CSS Grid or Flexbox',
          'Avoid injecting content dynamically'
        ]
      });
    }
    
    // FID recommendations
    if (this.metrics.fid > this.thresholds.fid.poor) {
      recommendations.push({
        type: 'FID',
        severity: 'medium',
        title: 'Improve First Input Delay',
        description: 'Users are experiencing delays when interacting with your page.',
        actions: [
          'Break up long-running JavaScript tasks',
          'Use web workers for heavy computation',
          'Reduce JavaScript execution time',
          'Remove non-critical third-party scripts'
        ]
      });
    }
    
    // Memory recommendations
    if (this.metrics.memoryUsagePercent > 80) {
      recommendations.push({
        type: 'Memory',
        severity: 'medium',
        title: 'Optimize Memory Usage',
        description: 'High memory usage detected. Consider optimizing JavaScript.',
        actions: [
          'Remove memory leaks',
          'Optimize data structures',
          'Use efficient algorithms',
          'Clean up event listeners'
        ]
      });
    }
    
    return recommendations;
  }

  // Get current metrics
  getMetrics() {
    return { ...this.metrics };
  }

  // Get performance observations
  getObservations() {
    return [...this.observations];
  }

  // Clear observations
  clearObservations() {
    this.observations = [];
  }
}

// PWA install prompt manager
export class PWAInstallManager {
  constructor() {
    this.deferredPrompt = null;
    this.isInstalled = false;
    this.init();
  }

  init() {
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      console.log('💾 PWA install prompt available');
      e.preventDefault();
      this.deferredPrompt = e;
      this.showInstallButton();
    });

    // Listen for app installed event
    window.addEventListener('appinstalled', () => {
      console.log('✅ PWA installed successfully');
      this.isInstalled = true;
      this.hideInstallButton();
      
      if (typeof gtag !== 'undefined') {
        gtag('event', 'pwa_install', {
          method: 'install_prompt'
        });
      }
    });

    // Check if already installed
    this.checkIfInstalled();
  }

  showInstallButton() {
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.style.display = 'block';
      installButton.addEventListener('click', () => this.promptInstall());
    }
  }

  hideInstallButton() {
    const installButton = document.getElementById('pwa-install-button');
    if (installButton) {
      installButton.style.display = 'none';
    }
  }

  async promptInstall() {
    if (!this.deferredPrompt) return;

    this.deferredPrompt.prompt();
    const { outcome } = await this.deferredPrompt.userChoice;
    
    console.log('🤔 User choice:', outcome);
    
    if (typeof gtag !== 'undefined') {
      gtag('event', 'pwa_install_prompt', {
        outcome: outcome
      });
    }

    this.deferredPrompt = null;
  }

  checkIfInstalled() {
    // Check if running as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      this.isInstalled = true;
      console.log('📱 Running as PWA');
    }

    // Check if installed via navigator
    if ('getInstalledRelatedApps' in navigator) {
      navigator.getInstalledRelatedApps().then(apps => {
        if (apps.length > 0) {
          this.isInstalled = true;
          console.log('📱 PWA is installed');
        }
      });
    }
  }
}

// Service Worker manager
export class ServiceWorkerManager {
  constructor() {
    this.registration = null;
    this.init();
  }

  async init() {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js');
        console.log('🔧 Service Worker registered:', this.registration);
        
        // Handle updates
        this.registration.addEventListener('updatefound', () => {
          this.handleUpdate();
        });
        
        // Listen for controller changes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          window.location.reload();
        });
        
      } catch (error) {
        console.error('❌ Service Worker registration failed:', error);
      }
    }
  }

  handleUpdate() {
    const newWorker = this.registration.installing;
    
    newWorker.addEventListener('statechange', () => {
      if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
        this.showUpdatePrompt();
      }
    });
  }

  showUpdatePrompt() {
    const updateBanner = document.createElement('div');
    updateBanner.innerHTML = `
      <div style="
        position: fixed; top: 0; left: 0; right: 0; 
        background: var(--color-primary); color: white; 
        padding: 12px; text-align: center; z-index: 10000;
        font-family: system-ui, sans-serif;
      ">
        🚀 New version available! 
        <button onclick="this.parentElement.remove(); window.location.reload();" 
                style="
                  background: rgba(255,255,255,0.2); border: 1px solid rgba(255,255,255,0.3);
                  color: white; padding: 4px 12px; margin-left: 8px; border-radius: 4px;
                  cursor: pointer;
                ">
          Update Now
        </button>
        <button onclick="this.parentElement.remove();" 
                style="
                  background: transparent; border: none; color: white; 
                  padding: 4px 8px; margin-left: 4px; cursor: pointer;
                ">
          ✕
        </button>
      </div>
    `;
    document.body.appendChild(updateBanner);
  }

  async getCacheInfo() {
    if (!this.registration) return null;
    
    return new Promise((resolve) => {
      const messageChannel = new MessageChannel();
      messageChannel.port1.onmessage = (event) => {
        resolve(event.data);
      };
      
      this.registration.active?.postMessage(
        { type: 'GET_CACHE_INFO' }, 
        [messageChannel.port2]
      );
    });
  }
}

// Create global instances
export const performanceMonitor = new PerformanceMonitor();
export const pwaInstallManager = new PWAInstallManager();
export const serviceWorkerManager = new ServiceWorkerManager();

// Initialize monitoring on page load
document.addEventListener('DOMContentLoaded', () => {
  performanceMonitor.init();
});

export default {
  PerformanceMonitor,
  PWAInstallManager,
  ServiceWorkerManager,
  performanceMonitor,
  pwaInstallManager,
  serviceWorkerManager
};