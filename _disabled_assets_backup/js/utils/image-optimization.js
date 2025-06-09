/*
 * Image Optimization Utilities
 * WebP support, lazy loading, responsive images, and performance optimization
 */

export class ImageOptimizer {
  constructor() {
    this.supportsWebP = null;
    this.isIntersectionObserverSupported = 'IntersectionObserver' in window;
    this.lazyImages = new Set();
    this.imageCache = new Map();
    
    this.init();
  }

  async init() {
    // Check WebP support
    this.supportsWebP = await this.checkWebPSupport();
    
    // Initialize lazy loading
    this.initLazyLoading();
    
    // Preload critical images
    this.preloadCriticalImages();
  }

  // Check if browser supports WebP
  async checkWebPSupport() {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  // Initialize lazy loading system
  initLazyLoading() {
    if (!this.isIntersectionObserverSupported) {
      // Fallback for older browsers
      this.loadAllImages();
      return;
    }

    // Create intersection observer
    const observerOptions = {
      root: null,
      rootMargin: '50px 0px',
      threshold: 0.01
    };

    this.lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          this.loadImage(img);
          this.lazyImageObserver.unobserve(img);
          this.lazyImages.delete(img);
        }
      });
    }, observerOptions);

    // Observe all images with data-src
    this.observeImages();
  }

  // Observe images for lazy loading
  observeImages() {
    const images = document.querySelectorAll('img[data-src], img[data-srcset]');
    images.forEach(img => {
      this.lazyImages.add(img);
      this.lazyImageObserver.observe(img);
    });
  }

  // Load individual image
  async loadImage(img) {
    try {
      // Show loading state
      img.classList.add('image-loading');
      
      // Get optimal image source
      const src = await this.getOptimalImageSrc(img);
      
      // Preload the image
      await this.preloadImage(src);
      
      // Update image source
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
        delete img.dataset.srcset;
      }
      
      if (img.dataset.src) {
        img.src = src;
        delete img.dataset.src;
      }
      
      // Handle load completion
      img.onload = () => {
        img.classList.remove('image-loading');
        img.classList.add('image-loaded');
        
        // Trigger custom event
        img.dispatchEvent(new CustomEvent('imageLoaded', {
          detail: { src: img.src }
        }));
      };
      
      img.onerror = () => {
        img.classList.remove('image-loading');
        img.classList.add('image-error');
        console.warn('Failed to load image:', src);
      };
      
    } catch (error) {
      console.error('Error loading image:', error);
      img.classList.remove('image-loading');
      img.classList.add('image-error');
    }
  }

  // Get optimal image source (WebP if supported)
  async getOptimalImageSrc(img) {
    const originalSrc = img.dataset.src || img.src;
    
    if (!this.supportsWebP) {
      return originalSrc;
    }
    
    // Check if we have a WebP version available
    const webpSrc = this.convertToWebP(originalSrc);
    
    // Check if WebP version exists
    if (await this.imageExists(webpSrc)) {
      return webpSrc;
    }
    
    return originalSrc;
  }

  // Convert image URL to WebP equivalent
  convertToWebP(src) {
    // Simple conversion: replace extension with .webp
    return src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }

  // Check if image exists
  async imageExists(src) {
    // Check cache first
    if (this.imageCache.has(src)) {
      return this.imageCache.get(src);
    }
    
    try {
      const response = await fetch(src, { method: 'HEAD' });
      const exists = response.ok;
      this.imageCache.set(src, exists);
      return exists;
    } catch {
      this.imageCache.set(src, false);
      return false;
    }
  }

  // Preload image
  preloadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

  // Preload critical images (above the fold)
  preloadCriticalImages() {
    const criticalImages = document.querySelectorAll('img[data-critical="true"], .hero img, .navbar img');
    
    criticalImages.forEach(async (img) => {
      if (img.dataset.src) {
        const src = await this.getOptimalImageSrc(img);
        this.preloadImage(src).then(() => {
          img.src = src;
          delete img.dataset.src;
          img.classList.add('image-loaded');
        });
      }
    });
  }

  // Load all images (fallback for browsers without Intersection Observer)
  loadAllImages() {
    const images = document.querySelectorAll('img[data-src], img[data-srcset]');
    images.forEach(img => this.loadImage(img));
  }

  // Create responsive image srcset
  createResponsiveSrcset(baseName, sizes = [400, 800, 1200, 1600]) {
    const extension = baseName.includes('.webp') ? '.webp' : '.jpg';
    const nameWithoutExt = baseName.replace(/\.[^/.]+$/, '');
    
    return sizes.map(size => `${nameWithoutExt}-${size}w${extension} ${size}w`).join(', ');
  }

  // Generate picture element with WebP fallback
  createPictureElement(src, alt = '', className = '', sizes = '100vw') {
    const picture = document.createElement('picture');
    
    // WebP source
    if (this.supportsWebP) {
      const webpSource = document.createElement('source');
      webpSource.srcset = this.convertToWebP(src);
      webpSource.type = 'image/webp';
      picture.appendChild(webpSource);
    }
    
    // Fallback image
    const img = document.createElement('img');
    img.src = src;
    img.alt = alt;
    img.className = className;
    img.sizes = sizes;
    
    picture.appendChild(img);
    
    return picture;
  }

  // Optimize existing images on the page
  optimizeExistingImages() {
    const images = document.querySelectorAll('img:not([data-optimized])');
    
    images.forEach(img => {
      // Add loading attribute for native lazy loading support
      if (!img.hasAttribute('loading') && !img.dataset.critical) {
        img.loading = 'lazy';
      }
      
      // Add decoding attribute for better performance
      if (!img.hasAttribute('decoding')) {
        img.decoding = 'async';
      }
      
      // Mark as optimized
      img.dataset.optimized = 'true';
    });
  }

  // Add image to lazy loading system
  addImageToLazyLoading(img) {
    if (this.isIntersectionObserverSupported && this.lazyImageObserver) {
      this.lazyImages.add(img);
      this.lazyImageObserver.observe(img);
    } else {
      this.loadImage(img);
    }
  }

  // Remove image from lazy loading system
  removeImageFromLazyLoading(img) {
    if (this.lazyImageObserver) {
      this.lazyImageObserver.unobserve(img);
    }
    this.lazyImages.delete(img);
  }

  // Create optimized app icon with multiple sizes
  createAppIcon(iconBase, sizes = [60, 120, 180]) {
    const icons = sizes.map(size => ({
      src: `${iconBase}-${size}.png`,
      sizes: `${size}x${size}`,
      type: 'image/png'
    }));
    
    return icons;
  }

  // Preload app store badges
  preloadAppStoreBadges() {
    const badges = [
      '/assets/images/badges/app-store-badge.svg',
      '/assets/images/badges/mac-app-store-badge.svg',
      '/assets/images/badges/google-play-badge.png'
    ];
    
    badges.forEach(badge => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = badge;
      link.as = 'image';
      document.head.appendChild(link);
    });
  }

  // Create loading placeholder
  createLoadingPlaceholder(width, height, className = '') {
    const placeholder = document.createElement('div');
    placeholder.className = `image-placeholder ${className}`;
    placeholder.style.width = width + 'px';
    placeholder.style.height = height + 'px';
    placeholder.style.backgroundColor = 'var(--color-accent-100)';
    placeholder.style.display = 'flex';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.style.borderRadius = '8px';
    
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    placeholder.appendChild(spinner);
    
    return placeholder;
  }

  // Progressive image enhancement
  enhanceImageProgressive(img, lowQualitySrc, highQualitySrc) {
    // Load low quality first
    img.src = lowQualitySrc;
    img.classList.add('image-progressive-low');
    
    // Preload high quality
    this.preloadImage(highQualitySrc).then(() => {
      img.src = highQualitySrc;
      img.classList.remove('image-progressive-low');
      img.classList.add('image-progressive-high');
    });
  }

  // Cleanup resources
  cleanup() {
    if (this.lazyImageObserver) {
      this.lazyImageObserver.disconnect();
    }
    this.lazyImages.clear();
    this.imageCache.clear();
  }
}

// Performance monitoring for images
export class ImagePerformanceMonitor {
  constructor() {
    this.metrics = {
      totalImages: 0,
      loadedImages: 0,
      failedImages: 0,
      averageLoadTime: 0,
      totalLoadTime: 0
    };
    
    this.init();
  }

  init() {
    // Monitor image loading performance
    document.addEventListener('imageLoaded', (e) => {
      this.trackImageLoad(e.detail.src);
    });
    
    // Monitor failed image loads
    document.addEventListener('error', (e) => {
      if (e.target.tagName === 'IMG') {
        this.trackImageError(e.target.src);
      }
    }, true);
  }

  trackImageLoad(src) {
    this.metrics.loadedImages++;
    
    // Track load time if performance API is available
    if (window.performance && window.performance.getEntriesByName) {
      const entries = window.performance.getEntriesByName(src);
      if (entries.length > 0) {
        const loadTime = entries[0].responseEnd - entries[0].startTime;
        this.metrics.totalLoadTime += loadTime;
        this.metrics.averageLoadTime = this.metrics.totalLoadTime / this.metrics.loadedImages;
      }
    }
  }

  trackImageError(src) {
    this.metrics.failedImages++;
    console.warn('Image failed to load:', src);
  }

  getMetrics() {
    return { ...this.metrics };
  }

  reset() {
    this.metrics = {
      totalImages: 0,
      loadedImages: 0,
      failedImages: 0,
      averageLoadTime: 0,
      totalLoadTime: 0
    };
  }
}

// Create global instances
export const imageOptimizer = new ImageOptimizer();
export const imagePerformanceMonitor = new ImagePerformanceMonitor();

// Auto-initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', () => {
  // Optimize existing images
  imageOptimizer.optimizeExistingImages();
  
  // Preload app store badges
  imageOptimizer.preloadAppStoreBadges();
});

// Reinitialize when new content is added
export function reinitializeImageOptimization() {
  imageOptimizer.observeImages();
  imageOptimizer.optimizeExistingImages();
}

export default {
  ImageOptimizer,
  ImagePerformanceMonitor,
  imageOptimizer,
  imagePerformanceMonitor,
  reinitializeImageOptimization
}; 