import { getCollection } from 'astro:content';

export async function GET(context) {
  const blog = await getCollection('blog');
  const guides = await getCollection('guides');

  const pages = [
    '',
    'quiz',
    'guides',
    'blog',
    ...blog.map(post => `blog/${post.slug}`),
    ...guides.map(guide => `guides/${guide.slug}`)
  ];

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pages.map(page => `
        <url>
          <loc>${context.site}/${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
        </url>
      `).join('')}
    </urlset>`,
    {
      headers: {
        'Content-Type': 'application/xml'
      }
    }
  );
} 