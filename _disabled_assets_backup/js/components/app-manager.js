/*
 * App Manager Component
 * Handles dynamic app rendering, filtering, and card generation
 */

import { APPS, APP_STATUS, getFeaturedApps, getUpcomingApps } from '../config/apps.js';

export class AppManager {
  constructor() {
    this.apps = APPS;
    this.featuredApps = getFeaturedApps();
    this.upcomingApps = getUpcomingApps();
    this.init();
  }

  init() {
    this.renderFeaturedApps();
    this.renderUpcomingApps();
    this.setupEventListeners();
  }

  // Render featured (available) apps
  renderFeaturedApps() {
    const container = document.querySelector('.apps-grid, #featured-apps');
    if (!container) return;

    container.innerHTML = '';
    
    this.featuredApps.forEach(app => {
      const appCard = this.createAppCard(app);
      container.appendChild(appCard);
    });
  }

  // Render upcoming apps
  renderUpcomingApps() {
    const container = document.querySelector('.upcoming-grid, #upcoming-apps');
    if (!container) return;

    container.innerHTML = '';
    
    this.upcomingApps.forEach(app => {
      const appCard = this.createUpcomingAppCard(app);
      container.appendChild(appCard);
    });
  }

  // Create app card element for available apps
  createAppCard(app) {
    const card = document.createElement('div');
    card.className = 'app-card hover-lift fade-in-up';
    card.dataset.appId = app.id;

    const pricing = app.pricing.model === 'paid' 
      ? app.pricing.price 
      : app.pricing.model === 'freemium' 
        ? 'Free' 
        : 'Free';

    card.innerHTML = `
      <div class="app-icon">
        <img src="${app.media.icon}" alt="${app.name} icon" loading="lazy">
        ${app.status === APP_STATUS.BETA ? '<span class="beta-badge">β</span>' : ''}
      </div>
      
      <div class="app-content">
        <h3>${app.name}</h3>
        <p class="app-tagline">${app.tagline}</p>
        <p class="app-description">${app.description}</p>
        
        <div class="app-features">
          ${app.features.slice(0, 3).map(feature => 
            `<span class="feature-tag">${feature}</span>`
          ).join('')}
        </div>
        
        <div class="app-meta">
          <span class="app-category">${this.formatCategory(app.category)}</span>
          <span class="app-platforms">${this.formatPlatforms(app.platforms)}</span>
          <span class="app-pricing">${pricing}</span>
        </div>
      </div>
      
      <div class="app-actions">
        ${this.createAppStoreButtons(app)}
        <button class="btn btn-secondary btn-sm app-details-btn" data-app-id="${app.id}">
          Learn More
        </button>
      </div>
    `;

    return card;
  }

  // Create upcoming app card element
  createUpcomingAppCard(app) {
    const card = document.createElement('div');
    card.className = 'upcoming-app hover-lift fade-in-up';
    card.dataset.appId = app.id;

    card.innerHTML = `
      <div class="app-preview">
        <div class="app-icon-large">
          <img src="${app.media.icon}" alt="${app.name} icon" loading="lazy">
          ${this.getStatusBadge(app.status)}
        </div>
        
        ${app.media.mockups && app.media.mockups.length > 0 ? `
          <div class="app-mockups">
            ${app.media.mockups.slice(0, 2).map(mockup => 
              `<img src="${mockup}" alt="${app.name} mockup" loading="lazy">`
            ).join('')}
          </div>
        ` : ''}
      </div>
      
      <div class="app-details">
        <h3>${app.name}</h3>
        <p class="app-tagline">${app.tagline}</p>
        <p class="app-description">${app.description}</p>
        
        <div class="app-features">
          ${app.features.slice(0, 4).map(feature => 
            `<span class="feature-tag">${feature}</span>`
          ).join('')}
        </div>
        
        <div class="launch-info">
          ${app.expectedRelease ? `
            <span class="launch-date">Expected: ${app.expectedRelease}</span>
          ` : ''}
          <span class="app-platforms">${this.formatPlatforms(app.platforms)}</span>
        </div>
        
        <div class="app-actions">
          ${app.links.waitlist ? `
            <button class="btn btn-primary waitlist-btn" data-app-id="${app.id}">
              Join Waitlist
            </button>
          ` : ''}
          <button class="btn btn-secondary btn-sm app-details-btn" data-app-id="${app.id}">
            Learn More
          </button>
        </div>
      </div>
    `;

    return card;
  }

  // Create App Store buttons based on platforms
  createAppStoreButtons(app) {
    const buttons = [];
    
    if (app.platforms.includes('ios') && app.links.appStore) {
      buttons.push(`
        <a href="${app.links.appStore}" class="app-store-btn ios-btn" data-app-id="${app.id}" data-action="download">
          <img src="/assets/images/icons/app-store-badge.svg" alt="Download on the App Store">
        </a>
      `);
    }
    
    if (app.platforms.includes('macos') && app.links.appStore) {
      buttons.push(`
        <a href="${app.links.appStore}" class="app-store-btn mac-btn" data-app-id="${app.id}" data-action="download">
          <img src="/assets/images/icons/mac-app-store-badge.svg" alt="Download on the Mac App Store">
        </a>
      `);
    }
    
    return buttons.join('');
  }

  // Get status badge for apps
  getStatusBadge(status) {
    const badges = {
      [APP_STATUS.BETA]: '<span class="status-badge beta">Beta</span>',
      [APP_STATUS.IN_DEVELOPMENT]: '<span class="status-badge dev">In Development</span>',
      [APP_STATUS.COMING_SOON]: '<span class="status-badge soon">Coming Soon</span>'
    };
    
    return badges[status] || '';
  }

  // Format category for display
  formatCategory(category) {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }

  // Format platforms for display
  formatPlatforms(platforms) {
    const platformIcons = {
      ios: '📱',
      macos: '💻',
      web: '🌐',
      android: '🤖'
    };
    
    return platforms.map(platform => 
      `<span class="platform-icon" title="${platform}">${platformIcons[platform] || platform}</span>`
    ).join('');
  }

  // Setup event listeners
  setupEventListeners() {
    // App details buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('app-details-btn')) {
        const appId = e.target.dataset.appId;
        this.showAppDetails(appId);
      }
    });

    // Waitlist buttons
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('waitlist-btn')) {
        const appId = e.target.dataset.appId;
        this.handleWaitlistSignup(appId);
      }
    });

    // App Store buttons tracking
    document.addEventListener('click', (e) => {
      if (e.target.closest('.app-store-btn')) {
        const btn = e.target.closest('.app-store-btn');
        const appId = btn.dataset.appId;
        const action = btn.dataset.action;
        this.trackAppAction(appId, action);
      }
    });

    // App card clicks
    document.addEventListener('click', (e) => {
      const appCard = e.target.closest('[data-app-id]');
      if (appCard && !e.target.closest('button, a')) {
        const appId = appCard.dataset.appId;
        this.showAppDetails(appId);
      }
    });
  }

  // Show app details (navigate to app page or modal)
  showAppDetails(appId) {
    const app = this.getAppById(appId);
    if (!app) return;

    // If app has a dedicated page, navigate to it
    if (app.links.website) {
      window.location.href = app.links.website;
      return;
    }

    // Otherwise, show modal or detailed view
    this.showAppModal(app);
  }

  // Show app modal (for apps without dedicated pages)
  showAppModal(app) {
    const modal = document.createElement('div');
    modal.className = 'app-modal';
    modal.innerHTML = `
      <div class="modal-backdrop" data-close-modal></div>
      <div class="modal-content">
        <button class="modal-close" data-close-modal>&times;</button>
        
        <div class="modal-header">
          <img src="${app.media.icon}" alt="${app.name} icon" class="modal-app-icon">
          <div>
            <h2>${app.name}</h2>
            <p class="modal-tagline">${app.tagline}</p>
          </div>
        </div>
        
        <div class="modal-body">
          <p class="modal-description">${app.longDescription || app.description}</p>
          
          <div class="modal-features">
            <h3>Features</h3>
            <ul>
              ${app.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
          </div>
          
          ${app.media.screenshots && app.media.screenshots.length > 0 ? `
            <div class="modal-screenshots">
              <h3>Screenshots</h3>
              <div class="screenshot-grid">
                ${app.media.screenshots.map(screenshot => 
                  `<img src="${screenshot}" alt="${app.name} screenshot" loading="lazy">`
                ).join('')}
              </div>
            </div>
          ` : ''}
        </div>
        
        <div class="modal-footer">
          ${this.createAppStoreButtons(app)}
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';

    // Close modal functionality
    modal.addEventListener('click', (e) => {
      if (e.target.dataset.closeModal !== undefined) {
        this.closeModal(modal);
      }
    });

    // Escape key to close
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        this.closeModal(modal);
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  // Close modal
  closeModal(modal) {
    modal.classList.add('modal-closing');
    setTimeout(() => {
      document.body.removeChild(modal);
      document.body.style.overflow = '';
    }, 300);
  }

  // Handle waitlist signup
  handleWaitlistSignup(appId) {
    const app = this.getAppById(appId);
    if (!app || !app.links.waitlist) return;

    // In a real app, this would handle the signup process
    // For now, just navigate to waitlist page
    window.location.href = app.links.waitlist;
  }

  // Track app actions for analytics
  trackAppAction(appId, action) {
    const app = this.getAppById(appId);
    if (!app) return;

    // Analytics tracking would go here
    console.log(`Tracking: ${action} for ${app.name} (${appId})`);
    
    // Example: gtag('event', app.analytics.events[action], { ... });
  }

  // Helper to get app by ID
  getAppById(id) {
    return this.apps.find(app => app.id === id);
  }

  // Filter apps by status
  filterAppsByStatus(status) {
    return this.apps.filter(app => app.status === status);
  }

  // Filter apps by category
  filterAppsByCategory(category) {
    return this.apps.filter(app => app.category === category);
  }

  // Search apps
  searchApps(query) {
    const lowerQuery = query.toLowerCase();
    return this.apps.filter(app => 
      app.name.toLowerCase().includes(lowerQuery) ||
      app.description.toLowerCase().includes(lowerQuery) ||
      app.features.some(feature => feature.toLowerCase().includes(lowerQuery))
    );
  }
}

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if we're on a page with app containers
  if (document.querySelector('.apps-grid, .upcoming-grid, #featured-apps, #upcoming-apps')) {
    window.appManager = new AppManager();
  }
});

export default AppManager; 