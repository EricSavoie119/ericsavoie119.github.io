// Apple-inspired smooth animations and interactions

document.addEventListener('DOMContentLoaded', function() {
    initScrollAnimations();
    initNavbarScroll();
    initSmoothScrolling();
    initAppManager();
});

// Intersection Observer for scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in-up class to elements that should animate
    const animateElements = document.querySelectorAll('.section-header, .app-placeholder, .upcoming-app, .privacy-card');
    animateElements.forEach(el => {
        el.classList.add('fade-in-up');
        observer.observe(el);
    });

    // Stagger animations for grid items
    const gridItems = document.querySelectorAll('.apps-grid .app-placeholder, .privacy-grid .privacy-card');
    gridItems.forEach((item, index) => {
        item.style.transitionDelay = `${index * 0.1}s`;
    });
}

// Navbar scroll effect
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(245, 245, 247, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(245, 245, 247, 0.8)';
            navbar.style.boxShadow = 'none';
        }

        lastScrollTop = scrollTop;
    });
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"], .cta-button[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// App Manager - Dynamic app management
function initAppManager() {
    const appsGrid = document.getElementById('shipped-apps');
    
    // Sample apps structure - you'll update this when you ship apps
    const shippedApps = [
        // Add your apps here when they're live
        // Example:
        // {
        //     name: "My App",
        //     description: "App description",
        //     icon: "path/to/icon.png",
        //     appStoreUrl: "https://apps.apple.com/app/id123456",
        //     features: ["SwiftUI", "Core Data"],
        //     color: ["#007aff", "#30d158"]
        // }
    ];

    // Function to add a new app
    window.addApp = function(appData) {
        shippedApps.push(appData);
        renderApps();
    };

    // Function to render apps
    function renderApps() {
        if (shippedApps.length === 0) {
            // Show placeholder
            appsGrid.innerHTML = `
                <div class="app-placeholder fade-in-up">
                    <div class="app-icon-placeholder"></div>
                    <h3>Your First App</h3>
                    <p>Coming Soon</p>
                    <div class="app-links">
                        <a href="#" class="app-store-button disabled">App Store</a>
                    </div>
                </div>
            `;
        } else {
            // Render actual apps
            appsGrid.innerHTML = shippedApps.map(app => `
                <div class="shipped-app fade-in-up">
                    <div class="app-icon" style="background: linear-gradient(135deg, ${app.color[0]}, ${app.color[1]});">
                        ${app.icon ? `<img src="${app.icon}" alt="${app.name}">` : ''}
                    </div>
                    <h3>${app.name}</h3>
                    <p>${app.description}</p>
                    <div class="app-features">
                        ${app.features.map(feature => `<span class="feature-tag">${feature}</span>`).join('')}
                    </div>
                    <div class="app-links">
                        <a href="${app.appStoreUrl}" class="app-store-button" target="_blank">View on App Store</a>
                    </div>
                </div>
            `).join('');

            // Reinitialize animations for new elements
            const newElements = appsGrid.querySelectorAll('.fade-in-up');
            newElements.forEach(el => {
                const observer = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            entry.target.classList.add('visible');
                        }
                    });
                });
                observer.observe(el);
            });
        }
    }

    // Initial render
    renderApps();
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-devices');
    
    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Device hover effects
document.addEventListener('mousemove', (e) => {
    const devices = document.querySelectorAll('.device');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    
    devices.forEach(device => {
        const rect = device.getBoundingClientRect();
        const deviceX = rect.left + rect.width / 2;
        const deviceY = rect.top + rect.height / 2;
        
        const deltaX = (mouseX - deviceX) * 0.02;
        const deltaY = (mouseY - deviceY) * 0.02;
        
        device.style.transform = `translate(${deltaX}px, ${deltaY}px) rotate(${deltaX * 0.1}deg)`;
    });
});

// Enhanced button interactions
document.querySelectorAll('.cta-button, .app-store-button').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Privacy card interactions
document.querySelectorAll('.privacy-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'none';
    });
});

// App card interactions
document.querySelectorAll('.upcoming-app').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.app-icon-large');
        if (icon) {
            icon.style.transform = 'scale(1.05) rotate(2deg)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.app-icon-large');
        if (icon) {
            icon.style.transform = 'scale(1) rotate(0deg)';
        }
    });
});

// Loading animation for when page loads
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-line, .hero-subtitle, .hero-cta');
    heroElements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Utility function to update upcoming app launch dates
function updateLaunchDates() {
    const launchDates = document.querySelectorAll('.launch-date');
    const currentDate = new Date();
    
    launchDates.forEach(dateEl => {
        const text = dateEl.textContent;
        if (text.includes('Spring 2025')) {
            const springDate = new Date('2025-04-01');
            const diffTime = springDate - currentDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays > 0) {
                dateEl.innerHTML = `Expected Launch: Spring 2025 <small>(${diffDays} days)</small>`;
            }
        }
        
        if (text.includes('Summer 2025')) {
            const summerDate = new Date('2025-07-01');
            const diffTime = summerDate - currentDate;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            if (diffDays > 0) {
                dateEl.innerHTML = `Expected Launch: Summer 2025 <small>(${diffDays} days)</small>`;
            }
        }
    });
}

// Update launch dates on load
updateLaunchDates();

// Mobile menu toggle (for future mobile navigation)
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Export functions for external use
window.AppManager = {
    addApp: window.addApp,
    updateLaunchDates: updateLaunchDates
}; 