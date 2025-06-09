/*
 * Service Worker for savoie.app
 * Advanced caching strategies, offline support, and performance optimization
 */

const CACHE_NAME = 'savoie-app-v1.0.0';
const RUNTIME_CACHE = 'savoie-runtime-v1.0.0';

// Assets to cache immediately on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/apps/',
  '/apps/index.html',
  '/apps/infiniteruler/',
  '/apps/infiniteruler/index.html',
  '/apps/mental-load/',
  '/apps/mental-load/index.html',
  
  // CSS
  '/assets/css/main.css',
  '/assets/css/utilities/_variables.css',
  '/assets/css/utilities/_reset.css',
  '/assets/css/utilities/_layout.css',
  '/assets/css/components/_buttons.css',
  '/assets/css/components/_cards.css',
  '/assets/css/components/_navbar.css',
  '/assets/css/components/_forms.css',
  '/assets/css/components/_hero.css',
  '/assets/css/components/_footer.css',
  '/assets/css/components/_animations.css',
  
  // JavaScript
  '/assets/js/config/config.js',
  '/assets/js/config/apps.js',
  '/assets/js/components/navbar.js',
  '/assets/js/components/app-manager.js',
  '/assets/js/utils/animations.js',
  '/assets/js/utils/seo.js',
  '/assets/js/utils/image-optimization.js',
  
  // Critical images
  '/assets/images/icons/favicon.ico',
  '/assets/images/icons/apple-touch-icon.png',
  '/assets/images/icons/icon-192.png',
  '/assets/images/icons/icon-512.png',
  
  // App icons
  '/assets/images/apps/infiniteruler/icon.png',
  '/assets/images/apps/mental-load/icon.png',
  
  // App Store badges
  '/assets/images/badges/app-store-badge.svg',
  '/assets/images/badges/mac-app-store-badge.svg',
  
  // Legal pages
  '/privacy-policy.html',
  '/terms.html'
];

// Assets to cache on first request
const CACHE_ON_REQUEST = [
  // App screenshots and media
  /\/assets\/images\/apps\/.*/,
  // Hero images
  /\/assets\/images\/hero\/.*/,
  // Screenshots
  /\/assets\/images\/screenshots\/.*/,
  // Icons
  /\/assets\/images\/icons\/.*/,
  // Fonts (if any)
  /\/assets\/fonts\/.*/
];

// Network-first resources (always try network, cache as fallback)
const NETWORK_FIRST = [
  // API endpoints (if any)
  /\/api\/.*/,
  // Analytics
  /\/analytics\/.*/,
  // External resources
  /^https:\/\/.*\.googleapis\.com/,
  /^https:\/\/.*\.google-analytics\.com/,
  /^https:\/\/.*\.googletagmanager\.com/
];

// Cache duration settings
const CACHE_DURATION = {
  STATIC: 30 * 24 * 60 * 60 * 1000, // 30 days
  IMAGES: 7 * 24 * 60 * 60 * 1000,  // 7 days
  API: 5 * 60 * 1000,               // 5 minutes
  DEFAULT: 24 * 60 * 60 * 1000      // 1 day
};

// Install event - cache critical assets
self.addEventListener('install', (event) => {
  console.log('🚀 Service Worker installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching critical assets...');
        return cache.addAll(PRECACHE_ASSETS);
      })
      .then(() => {
        console.log('✅ Critical assets cached successfully');
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Failed to cache critical assets:', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('⚡ Service Worker activated');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE) {
              console.log('🗑️ Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all pages immediately
        return self.clients.claim();
      })
  );
});

// Fetch event - handle all network requests
self.addEventListener('fetch', (event) => {
  const request = event.request;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith('http')) {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

// Main request handler with intelligent caching strategies
async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;
  
  try {
    // Strategy 1: Cache First for static assets
    if (isCacheFirstResource(path)) {
      return await cacheFirst(request);
    }
    
    // Strategy 2: Network First for dynamic content
    if (isNetworkFirstResource(url)) {
      return await networkFirst(request);
    }
    
    // Strategy 3: Stale While Revalidate for images and fonts
    if (isStaleWhileRevalidateResource(path)) {
      return await staleWhileRevalidate(request);
    }
    
    // Strategy 4: Network Only for analytics and external APIs
    if (isNetworkOnlyResource(url)) {
      return fetch(request);
    }
    
    // Default: Cache First with network fallback
    return await cacheFirst(request);
    
  } catch (error) {
    console.error('❌ Request failed:', request.url, error);
    return await handleOfflineFallback(request);
  }
}

// Cache First strategy - check cache first, network as fallback
async function cacheFirst(request) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    const cache = await caches.open(RUNTIME_CACHE);
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Network First strategy - try network first, cache as fallback
async function networkFirst(request) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Stale While Revalidate - return cached version immediately, update in background
async function staleWhileRevalidate(request) {
  const cache = await caches.open(RUNTIME_CACHE);
  const cachedResponse = await cache.match(request);
  
  // Fetch in background to update cache
  const fetchPromise = fetch(request).then((networkResponse) => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  });
  
  // Return cached version immediately if available
  return cachedResponse || fetchPromise;
}

// Determine caching strategy based on resource type
function isCacheFirstResource(path) {
  return (
    path.endsWith('.css') ||
    path.endsWith('.js') ||
    path.includes('/components/') ||
    path.includes('/utilities/') ||
    path === '/' ||
    path.endsWith('.html')
  );
}

function isNetworkFirstResource(url) {
  return NETWORK_FIRST.some(pattern => pattern.test(url.href));
}

function isStaleWhileRevalidateResource(path) {
  return (
    path.includes('/images/') ||
    path.endsWith('.png') ||
    path.endsWith('.jpg') ||
    path.endsWith('.jpeg') ||
    path.endsWith('.gif') ||
    path.endsWith('.webp') ||
    path.endsWith('.svg') ||
    path.includes('/fonts/')
  );
}

function isNetworkOnlyResource(url) {
  return (
    url.href.includes('google-analytics.com') ||
    url.href.includes('googletagmanager.com') ||
    url.href.includes('analytics.') ||
    url.href.includes('/api/track')
  );
}

// Handle offline fallbacks
async function handleOfflineFallback(request) {
  const url = new URL(request.url);
  
  // HTML pages - return cached page or offline page
  if (request.destination === 'document') {
    const cachedResponse = await caches.match('/');
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return a simple offline page
    return new Response(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Offline - Eric Savoie</title>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
              margin: 0; padding: 40px; text-align: center; 
              background: linear-gradient(135deg, #ff3c00 0%, #431a00 100%);
              color: white; min-height: 100vh; display: flex;
              align-items: center; justify-content: center; flex-direction: column;
            }
            h1 { font-size: 2rem; margin-bottom: 1rem; }
            p { font-size: 1.1rem; margin-bottom: 2rem; opacity: 0.9; }
            .btn { 
              background: rgba(255,255,255,0.2); border: 2px solid rgba(255,255,255,0.3);
              color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px;
              font-weight: 600; transition: all 0.3s ease;
            }
            .btn:hover { background: rgba(255,255,255,0.3); }
          </style>
        </head>
        <body>
          <h1>You're Offline</h1>
          <p>It looks like you're not connected to the internet. Some content may not be available.</p>
          <a href="/" class="btn" onclick="window.location.reload()">Try Again</a>
        </body>
      </html>
    `, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
  // Images - return a placeholder
  if (request.destination === 'image') {
    return new Response(`
      <svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="sans-serif" font-size="16" fill="#999">
          Image not available offline
        </text>
      </svg>
    `, {
      headers: { 'Content-Type': 'image/svg+xml' }
    });
  }
  
  // Other requests - return network error
  return new Response('Network error', {
    status: 408,
    headers: { 'Content-Type': 'text/plain' }
  });
}

// Background sync for analytics and form submissions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-analytics') {
    event.waitUntil(sendPendingAnalytics());
  }
  
  if (event.tag === 'background-forms') {
    event.waitUntil(sendPendingForms());
  }
});

// Send pending analytics when back online
async function sendPendingAnalytics() {
  const pendingRequests = await getStoredRequests('pending-analytics');
  
  for (const request of pendingRequests) {
    try {
      await fetch(request.url, request.options);
      await removeStoredRequest('pending-analytics', request.id);
    } catch (error) {
      console.log('Analytics request still failing:', error);
    }
  }
}

// Send pending form submissions when back online
async function sendPendingForms() {
  const pendingForms = await getStoredRequests('pending-forms');
  
  for (const form of pendingForms) {
    try {
      await fetch(form.url, form.options);
      await removeStoredRequest('pending-forms', form.id);
    } catch (error) {
      console.log('Form submission still failing:', error);
    }
  }
}

// Utility functions for IndexedDB storage
async function getStoredRequests(storeName) {
  // Simplified - would use IndexedDB in production
  return [];
}

async function removeStoredRequest(storeName, id) {
  // Simplified - would use IndexedDB in production
  return true;
}

// Push notification handling
self.addEventListener('push', (event) => {
  const options = {
    body: 'New app update available!',
    icon: '/assets/images/icons/icon-192.png',
    badge: '/assets/images/icons/badge-72.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Updates',
        icon: '/assets/images/icons/checkmark.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/assets/images/icons/xmark.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Eric Savoie Apps', options)
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Performance monitoring
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_INFO') {
    getCacheInfo().then(info => {
      event.ports[0].postMessage(info);
    });
  }
});

// Get cache information for debugging
async function getCacheInfo() {
  const cacheNames = await caches.keys();
  const info = {};
  
  for (const cacheName of cacheNames) {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    info[cacheName] = keys.length;
  }
  
  return info;
}

console.log('🎯 Service Worker loaded successfully!'); 