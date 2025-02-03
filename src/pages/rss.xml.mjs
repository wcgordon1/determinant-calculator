import rss from '@astrojs/rss';
import { glob } from 'glob';
import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';

export async function GET({ site }) {
  const blogFiles = await glob('src/pages/blog/*.md');
  
  const posts = blogFiles.map(file => {
    const content = fs.readFileSync(file, 'utf-8');
    const { data } = matter(content);
    const slug = path.basename(file, '.md');
    
    return {
      title: data.title,
      pubDate: data.pubDate || data.date,
      description: data.description,
      slug: slug
    };
  });

  return rss({
    title: 'Matrix Calculator Blog',
    description: 'Learn about matrices, determinants, and linear algebra',
    site: site,
    items: posts.map((post) => ({
      title: post.title,
      pubDate: post.pubDate,
      description: post.description,
      link: `/blog/${post.slug}/`,
    })),
  });
} 