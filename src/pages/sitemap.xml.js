import { getCollection } from 'astro:content';

export async function GET({ site }) {
  const posts = await getCollection('blog');
  const guides = await getCollection('guides');

  // Remove trailing slash from site URL if it exists
  const siteUrl = site?.toString().replace(/\/$/, '');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${siteUrl}/</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${siteUrl}/quiz</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${siteUrl}/guides</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      <url>
        <loc>${siteUrl}/blog</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
      </url>
      ${posts.map(post => `
        <url>
          <loc>${siteUrl}/blog/${post.slug}</loc>
          <lastmod>${new Date(post.data.date).toISOString()}</lastmod>
        </url>
      `).join('')}
      ${guides.map(guide => `
        <url>
          <loc>${siteUrl}/guides/${guide.slug}</loc>
          <lastmod>${new Date(guide.data.date).toISOString()}</lastmod>
        </url>
      `).join('')}
    </urlset>`.trim()
  );
} 