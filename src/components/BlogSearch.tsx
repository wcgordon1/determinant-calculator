import React, { useState, useEffect } from 'react';

interface Post {
  url: string;
  frontmatter: {
    title: string;
    description: string;
    date: string;
  };
}

interface BlogSearchProps {
  posts: Post[];
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

export const BlogSearch: React.FC<BlogSearchProps> = ({ posts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState(posts);

  useEffect(() => {
    const filtered = posts.filter(post => {
      const searchContent = `${post.frontmatter.title} ${post.frontmatter.description}`.toLowerCase();
      return searchContent.includes(searchTerm.toLowerCase());
    });
    setFilteredPosts(filtered);
  }, [searchTerm, posts]);

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <input
          type="text"
          placeholder="Search blog posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border-2 border-primary-200 focus:border-primary-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map(post => (
          <a key={post.url} href={post.url} className="block group">
            <article className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-primary-100 hover:border-primary-200 h-full">
              <h2 className="text-2xl font-semibold text-primary-800 group-hover:text-primary-600 mb-4 transition-colors">
                {post.frontmatter.title}
              </h2>
              <p className="text-gray-600 mb-6 line-clamp-3">{post.frontmatter.description}</p>
              <div className="flex items-center mt-auto">
                <time className="text-sm font-medium text-primary-600">
                  {formatDate(post.frontmatter.date)}
                </time>
                <span className="ml-auto text-primary-600 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </article>
          </a>
        ))}
      </div>
    </div>
  );
};