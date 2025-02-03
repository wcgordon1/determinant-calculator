import readingTime from 'reading-time';

export interface BlogPost {
  url: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
    tags: string[];
  };
  rawContent: () => string;
}

export const getReadingTime = (content: string): string => {
  const stats = readingTime(content);
  return Math.ceil(stats.minutes) + ' min read';
};

export const getRelatedPosts = (currentPost: BlogPost, allPosts: BlogPost[], limit = 3): BlogPost[] => {
  // Remove the current post from the pool
  const otherPosts = allPosts.filter(post => post.url !== currentPost.url);
  
  // Calculate relevance score based on shared tags
  const postsWithScores = otherPosts.map(post => {
    const sharedTags = currentPost.frontmatter.tags.filter(tag => 
      post.frontmatter.tags.includes(tag)
    ).length;
    return { post, score: sharedTags };
  });

  // Sort by score and return top matches
  return postsWithScores
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
};

export const getAllTags = (posts: BlogPost[]): string[] => {
  const tags = new Set<string>();
  posts.forEach(post => {
    post.frontmatter.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
};