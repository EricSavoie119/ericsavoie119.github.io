/**
 * Render shared site navbar so navigation stays consistent across pages.
 * @param {string} containerSelector
 */
export function renderNavbar(containerSelector = '#site-navbar') {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const rawPath = window.location.pathname || '/';
    const normalizedPath = rawPath.endsWith('/index.html')
        ? rawPath.replace(/index\.html$/, '')
        : rawPath;
    const path = normalizedPath || '/';
    const hash = window.location.hash || '';

    const isBlog = path.startsWith('/blog');
    const isPrivacy = path === '/legal/privacy-policy.html' || path === '/privacy-policy.html';
    const isAppPage = path.startsWith('/apps/');
    const isHome = !isBlog && !isPrivacy && (path === '/' || path === '');
    const isApps = isAppPage || (isHome && hash === '#apps');

    const homeHref = isHome ? '#home' : '/';
    const appsHref = isHome ? '#apps' : '/#apps';

    container.innerHTML = `
      <nav class="navbar" id="main-navbar">
        <div class="nav-container">
          <div class="nav-logo">
            <a href="/" class="nav-logo-link">
              <img src="/assets/images/Eric.png" alt="ERIC" style="width: 32px; height: 32px;">
            </a>
          </div>
          <div class="nav-links">
            <a href="${homeHref}" class="nav-link ${isHome && !isApps ? 'active' : ''}">Home</a>
            <a href="${appsHref}" class="nav-link ${isApps ? 'active' : ''}">Apps</a>
            <a href="/blog/" class="nav-link ${isBlog ? 'active' : ''}">Blog</a>
            <a href="/legal/privacy-policy.html" class="nav-link ${isPrivacy ? 'active' : ''}">Privacy</a>
          </div>
          <button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation">
            <span class="nav-toggle-line"></span>
            <span class="nav-toggle-line"></span>
            <span class="nav-toggle-line"></span>
          </button>
        </div>
      </nav>
    `;
}

export default renderNavbar;
