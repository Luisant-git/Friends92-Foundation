import React, { useState, useEffect } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createBlog, getBlogs, updateBlog, deleteBlog } from "../api/Blog";
import { uploadImage } from "../api/Upload";

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    content: "",
    imageUrl: "",
    videoUrl: ""
  });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingBlog, setEditingBlog] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadBlogs();
  }, []);

  const loadBlogs = async () => {
    try {
      const data = await getBlogs();
      setBlogs(data);
    } catch (error) {
      toast.error("Failed to load blogs");
    }
  };

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      content: "",
      imageUrl: "",
      videoUrl: ""
    });
    setEditingBlog(null);
    setShowEditModal(false);
    setImageFile(null);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!form.title || !form.description) {
      toast.error("Please fill required fields");
      return;
    }

    try {
      let imageUrl = form.imageUrl;
      if (imageFile) {
        const uploadRes = await uploadImage(imageFile);
        imageUrl = uploadRes.url;
      }

      const blogData = { ...form, imageUrl };

      if (editingBlog) {
        await updateBlog(editingBlog.id, blogData);
        toast.success("Blog updated successfully");
      } else {
        await createBlog(blogData);
        toast.success("Blog created successfully");
      }
      resetForm();
      loadBlogs();
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setForm(blog);
    setPreview(blog.imageUrl || "");
    setImageFile(null);
    setShowEditModal(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const confirmDelete = async () => {
    try {
      await deleteBlog(deleteId);
      toast.success("Blog deleted successfully");
      loadBlogs();
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      toast.error("Failed to delete blog");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-heading">Blog Management</h1>
        <button
          onClick={() => setShowEditModal(true)}
          className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-semibold"
        >
          Add New Blog
        </button>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold font-heading">{editingBlog ? 'Edit Blog' : 'Add Blog'}</h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">Title *</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                  placeholder="Blog title"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Description *</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                  rows="3"
                  placeholder="Brief description"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Content</label>
                <textarea
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                  rows="5"
                  placeholder="Full content"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/5 file:text-primary file:cursor-pointer hover:file:bg-primary/10"
                />
                {preview && (
                  <div className="mt-3">
                    <img src={preview} alt="Preview" className="w-20 h-20 object-cover rounded border" />
                  </div>
                )}
              </div>

              <div>
                <label className="block font-semibold mb-2">Video URL</label>
                <input
                  type="url"
                  value={form.videoUrl}
                  onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary"
                  placeholder="https://youtube.com/watch?v=..."
                />
              </div>

              <div className="flex gap-4">
                <button type="submit" className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-semibold">
                  {editingBlog ? "Update" : "Add"}
                </button>
                <button type="button" onClick={resetForm} className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4 font-heading">Confirm Delete</h3>
            <p className="text-gray-600 mb-6 font-body">Are you sure you want to delete this blog?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => { setShowDeleteModal(false); setDeleteId(null); }} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition">
                Cancel
              </button>
              <button onClick={confirmDelete} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl shadow-md border">
          <thead>
            <tr className="bg-primary/5 text-left">
              <th className="p-3">S.No</th>
              <th className="p-3">Title</th>
              <th className="p-3">Description</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{blog.title}</td>
                <td className="p-3">{blog.description.substring(0, 50)}...</td>
                <td className="p-3 flex gap-4">
                  <button onClick={() => handleEdit(blog)} className="text-primary hover:text-primary transition">
                    <Pencil size={20} />
                  </button>
                  <button onClick={() => { setDeleteId(blog.id); setShowDeleteModal(true); }} className="text-red-600 hover:text-red-800 transition">
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {blogs.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No blogs available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}







