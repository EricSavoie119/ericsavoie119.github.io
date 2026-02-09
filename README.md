# Eric Savoie - Portfolio Website

A modern, performant portfolio website showcasing iOS app development work. Built with a modular CSS architecture, progressive web app features, and comprehensive analytics.

## 🚀 Features

- **Modular CSS Architecture**: Component-based styles with Mental Load warm theme
- **Progressive Web App**: Service worker, offline support, installable
- **Performance Optimized**: Core Web Vitals monitoring, image optimization
- **SEO Optimized**: Meta tags, structured data, Open Graph
- **Analytics**: GA4 integration with privacy compliance
- **Responsive Design**: Mobile-first, works on all devices
- **Accessibility**: WCAG 2.1 AA compliant

## 📁 Project Structure

```
ericsavoie119.github.io/
├── apps/                      # App detail pages
│   ├── infiniteruler/        # InfiniteRuler app page
│   └── mental-load/          # Mental Load app page (coming soon)
├── assets/
│   ├── css/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/           # Page-specific styles
│   │   ├── utilities/       # Utility classes and helpers
│   │   └── main.css         # Main CSS entry point
│   ├── images/
│   │   ├── apps/            # App-specific images
│   │   ├── branding/        # Logo and brand assets
│   │   ├── hero/            # Hero section images
│   │   ├── icons/           # Icons and favicons
│   │   └── screenshots/     # App screenshots
│   └── js/
│       ├── components/      # JavaScript components
│       ├── config/          # Configuration files
│       └── utils/           # Utility functions
├── legal/                   # Legal pages
│   ├── privacy-policy.html
│   └── terms.html
├── manifest.json           # PWA manifest
├── sw.js                   # Service worker
└── index.html              # Homepage
```

## 🛠 Development Setup

### Prerequisites
- Modern web browser
- Python 3 (for local development server)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/ericsavoie119/ericsavoie119.github.io.git
   cd ericsavoie119.github.io
   ```

2. **Start local server**
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

### Making Changes

1. **CSS Changes**: Edit files in `assets/css/` following the component structure
2. **JavaScript Changes**: Update files in `assets/js/` maintaining the modular approach
3. **Content Changes**: Use the AppManager system for app content
4. **New Apps**: Add to `assets/js/config/apps.js` and create detail pages

### Blog Build Helper

When new blog posts are added to `blog/posts-manifest.json`, regenerate clean slug pages and sitemap blog entries:

```bash
node scripts/build-blog-pages.mjs
```

## 🎨 Design System

### Color Scheme (Mental Load Theme)
- **Primary Orange**: `#ff3c00`
- **Secondary Orange**: `#ff6b42`
- **Warm Brown**: `#431a00`
- **Neutral Gray**: `#2a2a2a`
- **Light Gray**: `#f8f9fa`

### Typography
- **Headings**: SF Pro Display
- **Body**: SF Pro Text
- **Monospace**: SF Mono

### Components
- Buttons with high contrast design
- Cards with subtle shadows
- Responsive navigation
- Animated elements with accessibility support

## 📱 Apps Management

### Adding New Apps

1. **Update apps configuration**:
   ```javascript
   // In assets/js/config/apps.js
   const APPS = {
     'your-app': {
       id: 'your-app',
       name: 'Your App',
       status: APP_STATUS.SHIPPED, // or DEVELOPMENT
       // ... other properties
     }
   };
   ```

2. **Create app detail page**:
   ```bash
   mkdir apps/your-app
   # Create apps/your-app/index.html
   ```

3. **Add images**:
   ```bash
   mkdir assets/images/apps/your-app
   # Add app icon, screenshots, etc.
   ```

## 🔧 Performance Features

### Service Worker
- **Cache Strategies**: Cache-first for assets, network-first for content
- **Offline Support**: Fallback pages with Mental Load theme
- **Background Sync**: For analytics and form submissions
- **Push Notifications**: Infrastructure ready

### Analytics
- **Google Analytics 4**: Privacy-compliant tracking
- **Core Web Vitals**: Performance monitoring
- **Conversion Tracking**: App downloads and engagement
- **Privacy Controls**: GDPR-friendly consent management

### Image Optimization
- **WebP Support**: Automatic format detection
- **Lazy Loading**: Intersection Observer based
- **Responsive Images**: Multiple sizes and formats
- **Performance Monitoring**: Loading time tracking

## 🚀 Deployment

### GitHub Pages (Current)
- Automatic deployment on push to `main`
- Custom domain: `savoie.app`
- HTTPS enabled

### Manual Deployment
```bash
# Build and commit changes
git add .
git commit -m "Your changes"
git push origin main
```

## 📊 Monitoring

### Performance Targets
- **Lighthouse Score**: 90+ in all categories
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1

### Tools
- **Google Analytics**: User behavior tracking
- **Google Search Console**: SEO monitoring
- **Lighthouse**: Performance audits
- **Core Web Vitals**: Real user monitoring

## 🔒 Privacy & Security

- **Privacy Policy**: Comprehensive data handling documentation
- **Analytics Opt-out**: User control over tracking
- **HTTPS Only**: Secure connections enforced
- **No Third-party Cookies**: Privacy-first approach

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Eric Savoie**
- Website: [savoie.app](https://savoie.app)
- Email: [contact@savoie.app](mailto:contact@savoie.app)

---

Built with ❤️ for the iOS development community. 
