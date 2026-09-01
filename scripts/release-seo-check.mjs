import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const siteOrigin = 'https://savoie.app';
const distDirectory = resolve('dist');
const requestedApp = process.argv.find((argument) => argument.startsWith('--app='))?.slice('--app='.length)
  ?? (process.argv.includes('--app') ? process.argv[process.argv.indexOf('--app') + 1] : undefined);

function readBuiltFile(path) {
  const absolutePath = resolve(distDirectory, path);
  if (!existsSync(absolutePath)) return undefined;
  return readFileSync(absolutePath, 'utf8');
}

function linksFrom(html) {
  return [...html.matchAll(/href=["']([^"']+)["']/g)].map((match) => match[1]);
}

function unique(values) {
  return [...new Set(values)];
}

function appSlugFromPath(path) {
  return path.match(/^\/apps\/([^/]+)\/$/)?.[1];
}

function relatedContentLinks(slug, links) {
  return unique(links.filter((link) => {
    if (/^\/guides\/[^/]+\/$/.test(link)) return true;
    if (!link.startsWith(`/apps/${slug}/`) || link === `/apps/${slug}/`) return false;
    return !/(?:privacy|support|terms|account-deletion)\/$/.test(link);
  }));
}

function result(label, passed, detail) {
  return { label, passed, detail };
}

if (!existsSync(distDirectory)) {
  console.error('SEO release check needs a production build. Run `npm run build` first.');
  process.exit(1);
}

const homepage = readBuiltFile('index.html');
const sitemapIndex = readBuiltFile('sitemap-index.xml');
const sitemap = readBuiltFile('sitemap-0.xml');
const robots = readBuiltFile('robots.txt');

if (!homepage || !sitemapIndex || !sitemap || !robots) {
  console.error('SEO release check could not find the built homepage, sitemap, and robots.txt.');
  process.exit(1);
}

const appPaths = unique(linksFrom(homepage).filter((link) => appSlugFromPath(link)));
const discoveredApps = appPaths.map((path) => {
  const slug = appSlugFromPath(path);
  const html = readBuiltFile(`apps/${slug}/index.html`);
  const links = html ? linksFrom(html) : [];
  const appStoreLinks = links.filter((link) => /^https:\/\/apps\.apple\.com\//.test(link));
  return { slug, path, html, links, appStoreLinks };
});

const selectedApps = requestedApp
  ? discoveredApps.filter(({ slug }) => slug === requestedApp)
  : discoveredApps.filter(({ appStoreLinks }) => appStoreLinks.length > 0);

if (requestedApp && selectedApps.length === 0) {
  console.error(`No homepage app card and landing page were found for “${requestedApp}”.`);
  process.exit(1);
}

const reports = selectedApps.map((app) => {
  const relatedLinks = relatedContentLinks(app.slug, app.links);
  const checks = [
    result('landing page', Boolean(app.html), app.path),
    result('App Store destination', app.appStoreLinks.length > 0, app.appStoreLinks[0] ?? 'missing'),
    result('privacy link', app.links.some((link) => /privacy(?:-policy)?\/?$/.test(link)), 'linked from landing page'),
    result('support link', app.links.some((link) => link.startsWith('mailto:') || /support\/?$/.test(link)), 'linked from landing page'),
    result('two related resources', relatedLinks.length >= 2, relatedLinks.length > 0 ? relatedLinks.join(', ') : 'none found'),
    result('landing page in sitemap', sitemap.includes(`${siteOrigin}${app.path}`), `${siteOrigin}${app.path}`),
    result('related resources in sitemap', relatedLinks.length >= 2 && relatedLinks.every((link) => sitemap.includes(`${siteOrigin}${link}`)), relatedLinks.join(', ') || 'none found'),
    result('tracked App Store CTA', /data-app-store-cta=|data-analytics-event=["']app_store_clicked["']/.test(app.html ?? ''), 'landing-page App Store link'),
  ];
  return { ...app, relatedLinks, checks, passed: checks.every((check) => check.passed) };
});

const sharedChecks = [
  result('sitemap index', sitemapIndex.includes('sitemap-0.xml'), `${siteOrigin}/sitemap-index.xml`),
  result('robots sitemap pointer', robots.includes(`${siteOrigin}/sitemap-index.xml`), `${siteOrigin}/robots.txt`),
];

for (const report of reports) {
  console.log(`\n${report.passed ? 'PASS' : 'FAIL'} ${report.slug}`);
  for (const check of report.checks) {
    console.log(`  ${check.passed ? '✓' : '✗'} ${check.label}: ${check.detail}`);
  }
}

console.log('\nShared discovery');
for (const check of sharedChecks) {
  console.log(`  ${check.passed ? '✓' : '✗'} ${check.label}: ${check.detail}`);
}

const unreleased = discoveredApps.filter(({ appStoreLinks }) => appStoreLinks.length === 0).map(({ slug }) => slug);
if (!requestedApp && unreleased.length > 0) {
  console.log(`\nSkipped without an App Store destination: ${unreleased.join(', ')}`);
}

console.log('\nExternal release evidence (checked live by Release Readiness)');
console.log('  • Search Console: landing page and related resources are indexable; record their current indexing status.');
console.log('  • PostHog: confirm production $pageview and app_store_clicked events include landing_path, app, and placement.');

const passed = reports.length > 0
  && reports.every((report) => report.passed)
  && sharedChecks.every((check) => check.passed);

process.exitCode = passed ? 0 : 1;
