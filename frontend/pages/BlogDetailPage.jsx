import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlog } from '../api/Blog';

const BlogDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      const data = await getBlog(id);
      setBlog(data);
    } catch (err) {
      console.error('Failed to load blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="p-6 text-center">Loading...</div>;
  if (!blog) return <div className="p-6 text-center">Blog not found</div>;

  return (
    <div className="bg-white min-h-screen">
      <section className="bg-slate-700 text-white py-20">
        <div className="container mx-auto px-6">
          <button onClick={() => navigate('/blog')} className="text-white/90 hover:text-white mb-4">
            ← Back to Blogs
          </button>
          <h1 className="text-4xl font-bold font-heading">{blog.title}</h1>
        </div>
      </section>

      <div className="container mx-auto px-6 py-12 max-w-4xl">
        {blog.imageUrl && (
          <img src={blog.imageUrl} alt={blog.title} className="w-full h-96 object-cover rounded-lg mb-8" />
        )}

        <div className="prose max-w-none">
          <p className="text-xl text-gray-700 mb-6 font-body">{blog.description}</p>
          {blog.content && (
            <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">{blog.content}</div>
          )}
        </div>

        {blog.videoUrl && (
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4 font-heading">Video</h3>
            <div className="aspect-video">
              <iframe
                src={blog.videoUrl.replace('watch?v=', 'embed/')}
                className="w-full h-full rounded-lg"
                allowFullScreen
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetailPage;







