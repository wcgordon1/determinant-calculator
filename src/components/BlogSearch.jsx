import { useState } from 'react';

export function BlogSearch({ posts }) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="mb-8">
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
      
      {searchTerm && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">Search Results:</h2>
          {filteredPosts.length === 0 ? (
            <p className="text-gray-600">No posts found</p>
          ) : (
            <ul className="space-y-4">
              {filteredPosts.map(post => (
                <li key={post.slug}>
                  <a href={post.url} className="block hover:bg-gray-50 p-4 rounded-lg">
                    <h3 className="text-xl font-semibold text-primary-600">{post.title}</h3>
                    <p className="text-gray-600 mt-1">{post.description}</p>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
} 