import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  createGallery,
  getGallery,
  updateGallery,
  deleteGallery,
  uploadImage,
} from "../api/Gallery.js";
import CategoryDropdown from "../components/common/Categorydropdown.jsx";

const PAGE_SIZE = 10;

export default function AdminGallery() {
  const [gallery, setGallery] = useState([]);
  const [form, setForm] = useState({ title: "", category: null, image: null, isVideo: false });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const data = await getGallery();
      setGallery(data);
    } catch {
      toast.error("Failed to load gallery");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const extractYouTubeUrl = (input) => {
    if (!input) return '';
    // Extract URL from iframe if pasted
    const iframeSrc = input.match(/src=["']([^"']+)["']/)?.[1];
    return iframeSrc || input;
  };

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/)?.[1];
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const resetForm = () => {
    setForm({ title: "", category: null, image: null, isVideo: false });
    setPreview("");
    setEditingItem(null);
    setShowEditModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Silent validation: just prevent submission if fields missing
    if (!form.title || !form.category || (!form.image && !editingItem)) {
      return; // do nothing, no warning
    }

    setLoading(true);
    try {
      let imageUrl = editingItem?.imageUrl;
      if (form.image) {
        const upload = await uploadImage(form.image);
        imageUrl = upload.url;
      }

      const data = {
        title: form.title,
        categoryId: form.category.id,
        imageUrl: form.isVideo ? form.image : imageUrl,
        isVideo: form.isVideo,
      };

      if (editingItem) {
        await updateGallery(editingItem.id, data);
        toast.success("Gallery updated successfully");
      } else {
        await createGallery(data);
        toast.success("Image added successfully");
      }

      resetForm();
      await loadGallery();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      title: item.title,
      category: item.category,
      image: item.imageUrl,
      isVideo: item.isVideo || false,
    });
    setPreview(item.imageUrl);
    setShowEditModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteGallery(deleteId);
      toast.success("Deleted successfully");
      await loadGallery();
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  const categories = [...new Set(gallery.map(g => g.category?.name).filter(Boolean))].sort();

  const filteredGallery = gallery.filter(g => {
    if (categoryFilter && g.category?.name !== categoryFilter) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      if (!(g.title?.toLowerCase().includes(term) || g.category?.name?.toLowerCase().includes(term))) return false;
    }
    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredGallery.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedGallery = filteredGallery.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-heading">Gallery Management</h1>
        <button
          onClick={() => setShowEditModal(true)}
          className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-semibold"
        >
          Add New Image
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by title or category..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full max-w-2xl px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1); }}
              className="w-52 px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          {(searchTerm || categoryFilter) && (
            <button
              onClick={() => { setSearchTerm(""); setCategoryFilter(""); setCurrentPage(1); }}
              className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold font-heading">{editingItem ? 'Edit Gallery' : 'Add Gallery'}</h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Enter image title"
            className="w-full h-12 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Category</label>
          <CategoryDropdown
            value={form.category}
            onChange={(cat) => setForm({ ...form, category: cat })}
          />
        </div>

        <div className="mb-4">
          <label className="flex items-center gap-2 font-semibold mb-2">
            <input
              type="checkbox"
              checked={form.isVideo}
              onChange={(e) => setForm({ ...form, isVideo: e.target.checked, image: null })}
              className="w-4 h-4"
            />
            This is a YouTube Video
          </label>
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">{form.isVideo ? 'YouTube URL' : 'Image'}</label>
          {form.isVideo ? (
            <input
              type="text"
              value={form.image || ''}
              onChange={(e) => setForm({ ...form, image: extractYouTubeUrl(e.target.value) })}
              placeholder="Enter YouTube URL or paste iframe code"
              className="w-full h-12 p-3 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-secondary"
            />
          ) : (
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/5 file:text-primary file:cursor-pointer hover:file:bg-primary/10"
            />
          )}
          {preview && (
            <div className="mt-3">
              {form.isVideo ? (
                <iframe
                  src={getYouTubeEmbedUrl(preview)}
                  className="w-full h-40 rounded border"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-20 h-20 object-cover rounded border"
                />
              )}
            </div>
          )}
        </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-semibold"
                >
                  {loading ? "Saving..." : editingItem ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold"
                >
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
            <p className="text-gray-600 mb-6 font-body">Are you sure you want to delete this image?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowDeleteModal(false); setDeleteId(null); }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              >
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
              <th className="p-3">Category</th>
              <th className="p-3">Type</th>
              <th className="p-3">Preview</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedGallery.length ? (
              paginatedGallery.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{(safePage - 1) * PAGE_SIZE + index + 1}</td>
                  <td className="p-3">{item.title || "-"}</td>
                  <td className="p-3">{item.category?.name || "-"}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${
                      item.isVideo ? 'bg-red-100 text-red-800' : 'bg-primary/10 text-primary'
                    }`}>
                      {item.isVideo ? 'Video' : 'Image'}
                    </span>
                  </td>
                  <td className="p-3">
                    {item.isVideo ? (
                      <iframe
                        src={getYouTubeEmbedUrl(item.imageUrl)}
                        className="w-32 h-20 rounded border"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      />
                    ) : (
                      <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="w-32 h-20 object-cover rounded border"
                      />
                    )}
                  </td>
                  <td className="p-3">
                    <div className="flex gap-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="text-primary hover:text-primary transition"
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => { setDeleteId(item.id); setShowDeleteModal(true); }}
                        className="text-red-600 hover:text-red-800 transition"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No gallery images
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {filteredGallery.length > PAGE_SIZE && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{Math.min((safePage - 1) * PAGE_SIZE + 1, filteredGallery.length)}</span> to{' '}
              <span className="font-medium">{Math.min(safePage * PAGE_SIZE, filteredGallery.length)}</span> of{' '}
              <span className="font-medium">{filteredGallery.length}</span> items
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(safePage - 1)}
                disabled={safePage === 1}
                className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                    page === safePage
                      ? 'bg-primary text-white'
                      : 'border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(safePage + 1)}
                disabled={safePage === totalPages}
                className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
}







