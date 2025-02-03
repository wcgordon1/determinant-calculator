import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';

const site = 'https://matrixcalculator.com';

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const GET: APIRoute = async () => {
  const allPosts = await Astro.glob('./blog/*.md');
  const allGuides = await Astro.glob('./guides/*.md');

  const pages = [
    '',
    '/blog',
    '/guides',
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${pages
    .map(
      (page) => `
    <url>
      <loc>${site}${page}</loc>
      <lastmod>${formatDate(new Date())}</lastmod>
      <changefreq>${page === '' ? 'daily' : 'weekly'}</changefreq>
      <priority>${page === '' ? '1.0' : '0.8'}</priority>
    </url>`
    )
    .join('')}
  ${allPosts
    .map(
      (post) => `
    <url>
      <loc>${site}${post.url}</loc>
      <lastmod>${formatDate(new Date(post.frontmatter.date))}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`
    )
    .join('')}
  ${allGuides
    .map(
      (guide) => `
    <url>
      <loc>${site}${guide.url}</loc>
      <lastmod>${formatDate(new Date(guide.frontmatter.date))}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.7</priority>
    </url>`
    )
    .join('')}
</urlset>`;

  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};