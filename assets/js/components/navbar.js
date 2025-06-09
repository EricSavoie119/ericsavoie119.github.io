/**
 * Navigation Controller
 * Handles mobile menu, smooth scrolling, and navbar scroll effects
 */

class NavbarController {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.mobileMenuButton = document.querySelector('.mobile-menu-button');
    this.mobileMenu = document.querySelector('.mobile-menu');
    this.mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
    this.navLinks = document.querySelectorAll('.nav-links a, .mobile-menu-links a');
    
    this.isMenuOpen = false;
    this.lastScrollY = 0;
    this.scrollThreshold = 100;
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.handleScroll();
    this.setActiveLink();
  }
  
  setupEventListeners() {
    // Mobile menu toggle
    if (this.mobileMenuButton) {
      this.mobileMenuButton.addEventListener('click', () => this.toggleMobileMenu());
    }
    
    // Close menu when clicking overlay
    if (this.mobileMenuOverlay) {
      this.mobileMenuOverlay.addEventListener('click', () => this.closeMobileMenu());
    }
    
    // Close menu when clicking links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        this.handleLinkClick(e);
        this.closeMobileMenu();
      });
    });
    
    // Scroll effects
    window.addEventListener('scroll', this.throttle(() => this.handleScroll(), 16));
    
    // Resize handler
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 768 && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
    
    // Escape key to close menu
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMobileMenu();
      }
    });
  }
  
  toggleMobileMenu() {
    if (this.isMenuOpen) {
      this.closeMobileMenu();
    } else {
      this.openMobileMenu();
    }
  }
  
  openMobileMenu() {
    this.isMenuOpen = true;
    document.body.classList.add('mobile-menu-open');
    
    if (this.mobileMenu) {
      this.mobileMenu.classList.add('open');
    }
    
    if (this.mobileMenuOverlay) {
      this.mobileMenuOverlay.classList.add('open');
    }
    
    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    // Focus first menu item for accessibility
    const firstLink = this.mobileMenu?.querySelector('a');
    if (firstLink) {
      setTimeout(() => firstLink.focus(), 100);
    }
  }
  
  closeMobileMenu() {
    this.isMenuOpen = false;
    document.body.classList.remove('mobile-menu-open');
    
    if (this.mobileMenu) {
      this.mobileMenu.classList.remove('open');
    }
    
    if (this.mobileMenuOverlay) {
      this.mobileMenuOverlay.classList.remove('open');
    }
    
    // Restore body scroll
    document.body.style.overflow = '';
    
    // Return focus to menu button
    if (this.mobileMenuButton) {
      this.mobileMenuButton.focus();
    }
  }
  
  handleScroll() {
    const currentScrollY = window.scrollY;
    
    // Add scrolled class for blur effect
    if (this.navbar) {
      if (currentScrollY > 20) {
        this.navbar.classList.add('navbar--scrolled');
      } else {
        this.navbar.classList.remove('navbar--scrolled');
      }
      
      // Hide navbar on scroll down, show on scroll up
      if (currentScrollY > this.scrollThreshold) {
        if (currentScrollY > this.lastScrollY && !this.isMenuOpen) {
          this.navbar.classList.add('navbar--hidden');
        } else {
          this.navbar.classList.remove('navbar--hidden');
        }
      }
    }
    
    this.lastScrollY = currentScrollY;
    this.setActiveLink();
  }
  
  setActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    let activeSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        activeSection = section.id;
      }
    });
    
    // Update active link
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      
      if (link.getAttribute('href') === `#${activeSection}`) {
        link.classList.add('active');
      }
    });
  }
  
  handleLinkClick(e) {
    const href = e.target.getAttribute('href');
    
    // Handle anchor links for smooth scrolling
    if (href && href.startsWith('#')) {
      e.preventDefault();
      
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        const navbarHeight = this.navbar?.offsetHeight || 64;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Update URL without scrolling
        if (window.history && window.history.pushState) {
          window.history.pushState(null, null, href);
        }
      }
    }
  }
  
  // Utility function to throttle scroll events
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
    }
  }
}

// Initialize navbar when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new NavbarController();
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = NavbarController;
} 