import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

interface Post {
  filename: string;
  content: string;
}

interface PostFrontmatter {
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  slug: string;
  image: string;
  tags: string[];
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [newPostContent, setNewPostContent] = useState('');
  const [newFilename, setNewFilename] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to fetch posts' });
      setLoading(false);
    }
  };

  const parseFrontmatter = (content: string): PostFrontmatter => {
    const frontmatterMatch = content.match(/---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) {
      return {
        title: 'Untitled',
        excerpt: '',
        date: new Date().toISOString().split('T')[0],
        author: 'Mursen Maintenance Team',
        category: 'Uncategorized',
        readTime: '5 min read',
        slug: '',
        image: '',
        tags: [],
      };
    }

    const frontmatter = frontmatterMatch[1];
    const frontmatterData: any = {};
    
    frontmatter.split('\n').forEach(line => {
      const match = line.match(/(\w+):\s*(.*)/);
      if (match) {
        const key = match[1];
        let value = match[2].trim();
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value.slice(1, -1).split(',').map((v: string) => v.trim());
        }
        frontmatterData[key] = value;
      }
    });

    return {
      title: frontmatterData.title || 'Untitled',
      excerpt: frontmatterData.excerpt || '',
      date: frontmatterData.date || new Date().toISOString().split('T')[0],
      author: frontmatterData.author || 'Mursen Maintenance Team',
      category: frontmatterData.category || 'Uncategorized',
      readTime: frontmatterData.readTime || '5 min read',
      slug: frontmatterData.slug || '',
      image: frontmatterData.image || '',
      tags: frontmatterData.tags || [],
    };
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setNewPostContent(post.content);
    setNewFilename(post.filename);
  };

  const handleSave = async () => {
    if (!editingPost) return;

    const slug = editingPost.filename.replace('.md', '');
    try {
      const res = await fetch(`/api/posts/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: newPostContent,
          newFilename: newFilename !== editingPost.filename ? newFilename : undefined,
        }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Post updated successfully' });
        setEditingPost(null);
        fetchPosts();
      } else {
        const error = await res.json();
        setMessage({ type: 'error', text: error.error || 'Failed to update post' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to update post' });
    }
  };

  const handleDelete = async (post: Post) => {
    if (!confirm(`Delete "${post.filename}"? This cannot be undone.`)) return;

    const slug = post.filename.replace('.md', '');
    try {
      const res = await fetch(`/api/posts/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage({ type: 'success', text: 'Post deleted successfully' });
        fetchPosts();
      } else {
        const error = await res.json();
        setMessage({ type: 'error', text: error.error || 'Failed to delete post' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to delete post' });
    }
  };

  const handleCreate = async () => {
    if (!newFilename || !newPostContent) {
      setMessage({ type: 'error', text: 'Filename and content are required' });
      return;
    }

    try {
      const res = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filename: newFilename.endsWith('.md') ? newFilename : `${newFilename}.md`,
          content: newPostContent,
        }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Post created successfully' });
        setNewFilename('');
        setNewPostContent('');
        fetchPosts();
      } else {
        const error = await res.json();
        setMessage({ type: 'error', text: error.error || 'Failed to create post' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to create post' });
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading posts...</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Blog Post Management</h1>
        <Link to="/blog" className="text-primary-600 hover:underline">
          View Blog →
        </Link>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      {/* Create New Post */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <h2 className="text-lg font-semibold mb-4">Create New Post</h2>
        <input
          type="text"
          placeholder="Filename (e.g., my-new-post.md)"
          value={newFilename}
          onChange={(e) => setNewFilename(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />
        <textarea
          placeholder="Paste markdown content here..."
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          className="w-full p-2 border rounded h-40 font-mono text-sm"
        />
        <button onClick={handleCreate} className="btn-primary px-4 py-2 mt-4">
          Create Post
        </button>
      </div>

      {/* Edit Modal */}
      {editingPost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-auto">
            <h2 className="text-lg font-semibold mb-4">Edit Post</h2>
            <input
              type="text"
              value={newFilename}
              onChange={(e) => setNewFilename(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            />
            <textarea
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              className="w-full p-2 border rounded h-96 font-mono text-sm"
            />
            <div className="flex gap-4 mt-4">
              <button onClick={handleSave} className="btn-primary px-4 py-2">
                Save Changes
              </button>
              <button onClick={() => setEditingPost(null)} className="px-4 py-2 bg-gray-200 rounded">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((post, index) => {
          const frontmatter = parseFrontmatter(post.content);
          return (
            <div key={index} className="bg-white rounded-lg border p-4 flex justify-between items-center">
              <div className="flex-1">
                <h3 className="font-semibold">{frontmatter.title}</h3>
                <p className="text-sm text-gray-500">
                  {post.filename} • {frontmatter.date} • {frontmatter.category}
                </p>
                <p className="text-sm text-gray-600 mt-1 line-clamp-2">{frontmatter.excerpt}</p>
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(post)}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-sm hover:bg-blue-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post)}
                  className="px-3 py-1 bg-red-100 text-red-700 rounded text-sm hover:bg-red-200"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
