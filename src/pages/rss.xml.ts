import rss from '@astrojs/rss';
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();

export const GET: APIRoute = async () => {
  const allPosts = await Astro.glob('./blog/*.md');
  const allGuides = await Astro.glob('./guides/*.md');

  const allItems = [...allPosts, ...allGuides]
    .sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());

  return rss({
    title: 'Matrix Calculator Blog',
    description: 'Learn about matrix mathematics, determinants, linear algebra, and their applications.',
    site: 'https://matrixcalculator.com',
    items: allItems.map((post) => ({
      link: post.url,
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      pubDate: new Date(post.frontmatter.date),
      content: sanitizeHtml(parser.render(post.rawContent())),
      categories: post.frontmatter.tags || [],
    })),
    customData: `<language>en-us</language>`,
  });
};