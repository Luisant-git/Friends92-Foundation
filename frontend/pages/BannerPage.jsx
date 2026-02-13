import React, { useState, useEffect } from "react";
import { uploadImage } from "../api/Upload";
import {
  createBanner,
  deleteBanner,
  getBanners,
  updateBanner,
} from "../api/Banner";
import { Pencil, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingBanner, setEditingBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const adminId = 1; // Replace with logged-in admin ID

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const data = await getBanners();
      setBanners(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load banners");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return toast.warn("Please enter a title");
    if (!editingBanner && !imageFile)
      return toast.warn("Please select an image");

    setLoading(true);
    try {
      let imageUrl = editingBanner?.imageUrl;
      if (imageFile) {
        const uploadRes = await uploadImage(imageFile);
        imageUrl = uploadRes.url;
      }

      const bannerData = { title, imageUrl, adminId };

      if (editingBanner) {
        await updateBanner(editingBanner.id, bannerData);
        toast.success("Banner updated successfully");
      } else {
        await createBanner(bannerData);
        toast.success("Banner added successfully");
      }

      resetForm();
      loadBanners();
    } catch (err) {
      console.error(err);
      toast.error( "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setTitle(banner.title);
    setPreview(banner.imageUrl);
    setImageFile(null);
    setShowEditModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteBanner(deleteId);
      toast.success("Banner deleted successfully");
      loadBanners();
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (err) {
      toast.error(err.message || "Failed to delete banner");
    }
  };

  const resetForm = () => {
    setTitle("");
    setImageFile(null);
    setPreview("");
    setEditingBanner(null);
    setShowEditModal(false);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-heading">Banner Management</h1>
        <button
          onClick={() => setShowEditModal(true)}
          className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-semibold"
        >
          Add New Banner
        </button>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold font-heading">{editingBanner ? 'Edit Banner' : 'Add Banner'}</h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            placeholder="e.g. 'Sunset over the mountains'"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-secondary focus:border-secondary"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Image</label>
          <div className="flex items-center gap-3">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/5 file:text-primary file:cursor-pointer hover:file:bg-primary/10"
            />
          </div>
          {preview && (
            <div className="mt-3">
              <img
                src={preview}
                alt="Preview"
                className="w-20 h-20 object-cover rounded border"
              />
            </div>
          )}
        </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-semibold"
                >
                  {loading ? "Saving..." : editingBanner ? "Update" : "Add"}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4 font-heading">Confirm Delete</h3>
            <p className="text-gray-600 mb-6 font-body">Are you sure you want to delete this banner?</p>
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
              <th className="p-3">Image</th>
              <th className="p-3">Created At</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {banners.map((b, index) => (
              <tr key={b.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{b.title}</td>
                <td className="p-3">
                  <img
                    src={b.imageUrl}
                    alt={b.title}
                    className="w-32 h-20 object-cover rounded border"
                  />
                </td>
                <td className="p-3">
                  {new Date(b.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 flex gap-4">
                  <button
                    onClick={() => handleEdit(b)}
                    className="text-primary hover:text-primary transition"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => { setDeleteId(b.id); setShowDeleteModal(true); }}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {banners.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No banners available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Toastify */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};

export default BannerPage;







