/**
 * Render shared site footer so footer content stays consistent across pages.
 * @param {string} containerSelector
 */
export function renderFooter(containerSelector = '#site-footer') {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    if (!document.getElementById('shared-site-footer-styles')) {
        const style = document.createElement('style');
        style.id = 'shared-site-footer-styles';
        style.textContent = `
          .site-footer {
            background: #7f8fa6 !important;
            color: #f5f6fa !important;
            padding: 3rem 0 1rem !important;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          }
          .site-footer .site-footer__container {
            max-width: 1200px !important;
            margin: 0 auto !important;
            padding: 0 1rem !important;
          }
          .site-footer .site-footer__content {
            display: grid !important;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) !important;
            gap: 2rem !important;
            margin-bottom: 2rem !important;
          }
          .site-footer .site-footer__title {
            margin: 0 0 1rem !important;
            color: #ffb8a3 !important;
            font-size: 1rem !important;
            font-weight: 700 !important;
            line-height: 1.2 !important;
          }
          .site-footer .site-footer__link {
            color: #f5f6fa !important;
            text-decoration: none !important;
            display: block !important;
            margin-bottom: 0.5rem !important;
            font-size: 1rem !important;
            font-weight: 400 !important;
            line-height: 1.5 !important;
          }
          .site-footer .site-footer__link:hover {
            color: #ffb8a3 !important;
          }
          .site-footer .site-footer__music-note {
            color: #f5f6fa !important;
            font-size: 0.9rem !important;
            font-weight: 400 !important;
            margin-top: 0.5rem !important;
            margin-bottom: 0 !important;
            opacity: 0.8 !important;
            line-height: 1.4 !important;
          }
          .site-footer .site-footer__bottom {
            border-top: 1px solid #66330a !important;
            padding-top: 1rem !important;
            text-align: center !important;
          }
          .site-footer .site-footer__copyright {
            color: #f5f6fa !important;
            margin: 0 !important;
            font-size: 1rem !important;
            font-weight: 400 !important;
            line-height: 1.4 !important;
          }
        `;
        document.head.appendChild(style);
    }

    container.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer__container">
          <div class="site-footer__content">
            <div class="site-footer__section">
              <h4 class="site-footer__title">Connect</h4>
              <a class="site-footer__link" href="mailto:eric@savoie.app">Email</a>
              <a class="site-footer__link" href="https://www.linkedin.com/in/eric-savoie-2a713241/">LinkedIn</a>
              <a class="site-footer__link" href="https://github.com/EricSavoie119">GitHub</a>
            </div>
            <div class="site-footer__section">
              <h4 class="site-footer__title">Music</h4>
              <a class="site-footer__link" href="https://shakejudy.com" target="_blank">Shake Judy (Band)</a>
              <a class="site-footer__link" href="https://www.instagram.com/shake.judy/" target="_blank">Instagram</a>
              <p class="site-footer__music-note">Click through to the Insta to see a live show</p>
            </div>
            <div class="site-footer__section">
              <h4 class="site-footer__title">Legal</h4>
              <a class="site-footer__link" href="/legal/privacy-policy.html">Privacy Policy</a>
              <a class="site-footer__link" href="/legal/terms.html">Terms of Service</a>
            </div>
          </div>
          <div class="site-footer__bottom">
            <p class="site-footer__copyright">&copy; 2025 Eric Savoie. All rights reserved.</p>
          </div>
        </div>
      </footer>
    `;
}

export default renderFooter;
