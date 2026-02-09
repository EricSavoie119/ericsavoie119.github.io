import { promises as fs } from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'blog');
const MANIFEST_PATH = path.join(BLOG_DIR, 'posts-manifest.json');
const TEMPLATE_PATH = path.join(BLOG_DIR, 'post-template.html');
const SITEMAP_PATH = path.join(ROOT, 'sitemap.xml');
const SITE_URL = 'https://savoie.app';

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

function toIsoDate(dateValue) {
  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) return null;
  return date.toISOString().slice(0, 10);
}

function buildSitemapPostEntries(posts) {
  return posts
    .map((post) => {
      const lastmod = toIsoDate(post.date) || new Date().toISOString().slice(0, 10);
      const loc = `${SITE_URL}/blog/${post.slug}/`;
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`;
    })
    .join('\n');
}

function upsertBlogEntriesInSitemap(sitemapXml, posts) {
  const blogPostsBlock = buildSitemapPostEntries(posts);
  const lines = sitemapXml.split('\n');

  // Robust range detection for existing blog post URL entries.
  let startIndex = -1;
  let endIndex = -1;
  for (let i = 0; i < lines.length; i += 1) {
    if (lines[i].trim() !== '<url>') continue;
    const locLine = lines[i + 1] || '';
    if (locLine.includes('<loc>https://savoie.app/blog/') && !locLine.includes('<loc>https://savoie.app/blog/</loc>')) {
      if (startIndex === -1) startIndex = i;
      endIndex = i + 4;
    }
  }

  if (startIndex !== -1 && endIndex !== -1) {
    const before = lines.slice(0, startIndex).join('\n');
    const after = lines.slice(endIndex).join('\n');
    return `${before}\n${blogPostsBlock}\n${after}`.replace(/\n{3,}/g, '\n\n');
  }

  // Fallback: append before </urlset>.
  if (sitemapXml.includes('</urlset>')) {
    return sitemapXml.replace('</urlset>', `${blogPostsBlock}\n</urlset>`);
  }

  return sitemapXml;
}

async function buildBlogPages() {
  const manifest = await readJson(MANIFEST_PATH);
  const posts = Array.isArray(manifest.posts) ? manifest.posts : [];
  if (posts.length === 0) {
    throw new Error('No posts found in blog/posts-manifest.json');
  }

  const templateHtml = await fs.readFile(TEMPLATE_PATH, 'utf8');
  let createdCount = 0;

  for (const post of posts) {
    if (!post.slug || typeof post.slug !== 'string') {
      throw new Error(`Invalid post slug in manifest: ${JSON.stringify(post)}`);
    }

    const targetDir = path.join(BLOG_DIR, post.slug);
    const targetPath = path.join(targetDir, 'index.html');
    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(targetPath, templateHtml, 'utf8');
    createdCount += 1;
  }

  const sitemapXml = await fs.readFile(SITEMAP_PATH, 'utf8');
  const updatedSitemap = upsertBlogEntriesInSitemap(sitemapXml, posts);
  await fs.writeFile(SITEMAP_PATH, updatedSitemap, 'utf8');

  console.log(`Generated ${createdCount} blog pages from template.`);
  console.log('Updated blog post entries in sitemap.xml.');
}

buildBlogPages().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
