import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const distRoot = resolve(repositoryRoot, 'dist');
const manifestRoot = resolve(repositoryRoot, '..', 'Portfolio Dashboard', 'config', 'marketing-releases');
const appSlugs = [
  'beloved',
  'bread-engineer',
  'fast-simple-invoice-maker',
  'flip-clock-flow',
  'gridmetrics',
  'infinite-ruler',
  'look-at-yourself',
];

function read(path) {
  return readFileSync(path, 'utf8');
}

function occurrences(value, pattern) {
  return [...value.matchAll(pattern)].length;
}

function localImages(html) {
  return [...html.matchAll(/<img[^>]+src="(\/[^"?]+)"[^>]*>/g)].map((match) => match[1]);
}

function checkApp(slug) {
  const pagePath = resolve(distRoot, 'apps', slug, 'index.html');
  const manifestPath = resolve(manifestRoot, `${slug}.v1.json`);
  const checks = [];
  const add = (fact, passed, evidence) => checks.push({ fact, passed, evidence });

  if (!existsSync(pagePath) || !existsSync(manifestPath)) {
    add('landingPageLive', false, `missing dist/apps/${slug}/index.html`);
    if (!existsSync(manifestPath)) add('appStoreMetadataAligned', false, `missing ${manifestPath}`);
    return { slug, passed: false, checks };
  }

  const html = read(pagePath);
  const manifest = JSON.parse(read(manifestPath));
  const canonical = `https://savoie.app/apps/${slug}/`;
  const appStoreId = manifest.app.appStoreUrl.match(/id(\d+)/)?.[1];
  const imagePaths = localImages(html);
  const missingImages = imagePaths.filter((path) => !existsSync(resolve(distRoot, decodeURIComponent(path.slice(1)))));
  const hasAppStoreDestination = appStoreId ? html.includes(`id${appStoreId}`) : false;
  const launchPending = manifest.release.promotionStatus === 'launch-pending';
  const versionAligned = html.includes(`data-marketing-material-version="${manifest.marketingMaterialVersion}"`);

  add('landingPageLive', html.includes(`<link rel="canonical" href="${canonical}"`), canonical);
  add(
    'appStoreMetadataAligned',
    versionAligned
      && html.includes('<meta name="description"')
      && html.includes('SoftwareApplication')
      && (launchPending ? !html.includes('data-app-store-cta=') : hasAppStoreDestination),
    launchPending
      ? `${manifest.marketingMaterialVersion}; launch-pending page correctly withholds its App Store CTA`
      : `${manifest.marketingMaterialVersion}; App Store id${appStoreId}`,
  );
  add(
    'screenshotsAligned',
    versionAligned && imagePaths.length >= 5 && missingImages.length === 0 && occurrences(html, /<img[^>]+alt="[^"]+"/g) >= 5,
    `${manifest.marketingMaterialVersion}; ${imagePaths.length} rendered images; ${missingImages.length} missing files`,
  );
  add(
    'faqPresent',
    occurrences(html, /<details(?:\s|>)/g) >= 3 && html.includes('FAQPage'),
    `${occurrences(html, /<details(?:\s|>)/g)} visible answers plus FAQ structured data`,
  );
  add(
    'analyticsVerified',
    html.includes('data-analytics-page-type="app_product_page"')
      && (launchPending || occurrences(html, /data-app-store-cta=/g) >= 3),
    launchPending ? 'product-page view tracking; Store clicks activate at release' : 'product-page views and three tracked App Store placements',
  );

  return {
    slug,
    appId: manifest.app.id,
    appName: manifest.app.name,
    marketingMaterialVersion: manifest.marketingMaterialVersion,
    promotionStatus: manifest.release.promotionStatus,
    passed: checks.every((check) => check.passed),
    checks,
  };
}

if (!existsSync(distRoot)) {
  console.error('Destination conversion check needs a production build. Run `npm run build` first.');
  process.exit(1);
}

const reports = appSlugs.map(checkApp);
for (const report of reports) {
  console.log(`\n${report.passed ? 'PASS' : 'FAIL'} ${report.slug}`);
  for (const check of report.checks) {
    console.log(`  ${check.passed ? '✓' : '✗'} ${check.fact}: ${check.evidence}`);
  }
}

console.log(`\n${reports.filter((report) => report.passed).length}/${reports.length} destinations satisfy the conversion contract.`);
process.exitCode = reports.every((report) => report.passed) ? 0 : 1;
