import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../api/Blog';

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (err) {
      console.error('Failed to load blogs');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-slate-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl text-blue-100">Read our latest articles and insights</p>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <Link key={blog.id} to={`/blog/${blog.id}`} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              {blog.imageUrl && (
                <img src={blog.imageUrl} alt={blog.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{blog.title}</h3>
                <p className="text-gray-600 mb-4">{blog.description}</p>
                <span className="text-green-600 font-semibold hover:underline">Read More →</span>
              </div>
            </Link>
          ))}
        </div>
        {blogs.length === 0 && (
          <p className="text-center text-gray-500 py-12">No blogs available</p>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
