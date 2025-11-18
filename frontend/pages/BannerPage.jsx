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
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (banner) => {
    setEditingBanner(banner);
    setTitle(banner.title);
    setPreview(banner.imageUrl);
    setImageFile(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;
    try {
      await deleteBanner(id);
      toast.success("Banner deleted successfully");
      loadBanners();
    } catch (err) {
      toast.error(err.message || "Failed to delete banner");
    }
  };

  const resetForm = () => {
    setTitle("");
    setImageFile(null);
    setPreview("");
    setEditingBanner(null);
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Manage Banners</h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <div className="mb-4">
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            placeholder="e.g. 'Sunset over the mountains'"
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-2">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        {preview && (
          <div className="mb-4">
            <img
              src={preview}
              alt="Preview"
              className="w-64 h-40 object-cover rounded border"
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            {loading
              ? "Saving..."
              : editingBanner
              ? "Update Banner"
              : "Add Banner"}
          </button>

          {editingBanner && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md border">
          <thead>
            <tr className="bg-sky-100 text-left">
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
                  {new Date(b.createdAt).toLocaleString()}
                </td>
                <td className="p-3 flex items-center gap-4">
                  <button
                    onClick={() => handleEdit(b)}
                    className="text-sky-600 hover:text-sky-800 transition"
                    title="Edit"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(b.id)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete"
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
