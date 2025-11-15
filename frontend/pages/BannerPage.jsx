import React, { useState, useEffect } from "react";
import { uploadImage } from "../api/Upload";
import { createBanner, deleteBanner, getBanners, updateBanner } from "../api/Banner";


const BannerPage = () => {
  const [banners, setBanners] = useState([]);
  const [title, setTitle] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [editingBanner, setEditingBanner] = useState(null);
  const [loading, setLoading] = useState(false);

  const adminId = 1; // 🔹 Replace with logged-in admin ID if available

  useEffect(() => {
    loadBanners();
  }, []);

  const loadBanners = async () => {
    try {
      const data = await getBanners();
      setBanners(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert("Please enter a title");
    if (!editingBanner && !imageFile)
      return alert("Please select an image for new banner");

    setLoading(true);
    try {
      let imageUrl = editingBanner?.imageUrl;

      // 🔹 Upload image if new file selected
      if (imageFile) {
        const uploadRes = await uploadImage(imageFile);
        imageUrl = uploadRes.url;
      }

      const bannerData = { title, imageUrl, adminId };

      if (editingBanner) {
        await updateBanner(editingBanner.id, bannerData);
        alert("Banner updated successfully");
      } else {
        await createBanner(bannerData);
        alert("Banner added successfully");
      }

      resetForm();
      loadBanners();
    } catch (err) {
      console.error(err);
      alert(err.message);
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
    if (!confirm("Are you sure you want to delete this banner?")) return;
    try {
      await deleteBanner(id);
      alert("Banner deleted");
      loadBanners();
    } catch (err) {
      alert(err.message);
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

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md mb-8"
      >
        <div className="mb-4">
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded w-full"
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
            className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg font-semibold"
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
      <table className="min-w-full bg-white rounded-lg shadow-md border">
        <thead>
          <tr className="bg-sky-100 text-left">
            <th className="p-3">S.No</th>
            <th className="p-3">Title</th>
            <th className="p-3 hidden sm:table-cell">Image</th>
            <th className="p-3 hidden md:table-cell">Created At</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.map((b, index) => (
            <tr key={b.id} className="border-t hover:bg-gray-50">
              <td className="p-3">{index + 1}</td>
              <td className="p-3">{b.title}</td>
              <td className="p-3 hidden sm:table-cell">
                <img
                  src={b.imageUrl}
                  alt={b.title}
                  className="w-32 h-20 object-cover rounded border"
                />
              </td>
              <td className="p-3 hidden md:table-cell">
                {new Date(b.createdAt).toLocaleString()}
              </td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => handleEdit(b)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                >
                  Delete
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
  );
};

export default BannerPage;
