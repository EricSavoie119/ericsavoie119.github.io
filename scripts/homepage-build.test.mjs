import { readFileSync, existsSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';
import test from 'node:test';
import assert from 'node:assert/strict';

const dist = resolve('dist');
const html = readFileSync(resolve(dist, 'index.html'), 'utf8');

test('homepage remains indexable and retains analytics and brand metadata', () => {
  assert.match(html, /rel="canonical" href="https:\/\/savoie.app\/"/);
  assert.doesNotMatch(html, /noindex/);
  assert.match(html, /data-analytics-page-type="portfolio_home"/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /savoie-apps-social-preview.png/);
  assert.match(html, /data-analytics-event="developer_contact_opened"/);
});

test('every local homepage resource and destination exists in the build', () => {
  for (const [, value] of html.matchAll(/(?:src|href|poster|data-src)="(\/[^"#]*)"/g)) {
    const path = decodeURIComponent(value.split('?')[0]);
    const file = resolve(dist, `.${path}`, ...(path.endsWith('/') ? ['index.html'] : []));
    assert.ok(existsSync(file), `Missing ${path}`);
    let parent = dist;
    for (const segment of file.slice(dist.length + 1).split('/')) {
      assert.ok(readdirSync(parent).includes(segment), `Incorrect filename case: ${path}`);
      parent = resolve(parent, segment);
    }
  }
  assert.doesNotMatch(html, /prototypes\/|\.\.\/public\/|localhost|127\.0\.0\.1/);
});

test('all eight apps stay discoverable and Easymode remains coming soon', () => {
  for (const slug of ['beloved', 'bread-engineer', 'flip-clock-flow', 'infinite-ruler', 'gridmetrics', 'look-at-yourself', 'fast-simple-invoice-maker', 'easymode']) {
    assert.ok(html.includes(`href="/apps/${slug}/"`), slug);
  }
  assert.match(html, /COMING SOON/);
  assert.match(html, /Past projects/);
  assert.match(html, /Skip to apps/);
});

test('video is muted and inline; homepage styles do not leak to app pages', () => {
  assert.match(html, /<video[^>]*muted[^>]*playsinline/);
  assert.match(html, /featured-video.js/);
  assert.doesNotMatch(readFileSync(resolve(dist, 'apps/beloved/index.html'), 'utf8'), /mountain-home/);
});
