import React, { useState, useEffect } from "react";
import {
  createGallery,
  deleteGallery,
  getGallery,
  updateGallery,
  uploadImage,
} from "../api/Gallery.js";
import { Edit, Trash2 } from "lucide-react";
import SearchableDropdown from "../components/SearchableDropdown.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AdminGallery() {
  const categories = ["Alumini Meet", "Charitable Trust", "Sports", "Workshop"];

  const [gallery, setGallery] = useState([]);
  const [form, setForm] = useState({ title: "", category: "", image: null });
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  useEffect(() => {
    loadGallery();
  }, []);

  const loadGallery = async () => {
    try {
      const data = await getGallery();
      setGallery(data);
    } catch (err) {
      toast.error("Failed to load gallery");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, image: file });
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const resetForm = () => {
    setForm({ title: "", category: "", image: null });
    setPreview("");
    setEditingItem(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title) return toast.warn("Please enter title");
    if (!form.category) return toast.warn("Please select category");
    if (!form.image && !editingItem)
      return toast.warn("Please select an image");

    setLoading(true);
    try {
      let imageUrl = editingItem?.imageUrl;
      if (form.image) {
        const upload = await uploadImage(form.image);
        imageUrl = upload.url;
      }

      const data = {
        title: form.title,
        category: form.category,
        imageUrl,
      };

      if (editingItem) {
        await updateGallery(editingItem.id, data);
        toast.success("Gallery updated");
      } else {
        await createGallery(data);
        toast.success("Image added");
      }

      resetForm();
      loadGallery();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({ title: item.title, category: item.category, image: null });
    setPreview(item.imageUrl);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      await deleteGallery(id);
      toast.success("Deleted successfully");
      loadGallery();
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Admin Gallery</h1>

      {/* Upload Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md mb-8"
      >
        {/* Title */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Title</label>
          <input
            type="text"
            placeholder="Enter image title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full p-3.5 rounded-xl border border-gray-300 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-green-600 transition-all"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Category</label>
          <SearchableDropdown
            options={categories}
            value={form.category}
            onChange={(val) => setForm({ ...form, category: val })}
            placeholder="Select"
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block font-semibold mb-2">Image</label>
          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files.length > 0)
                handleImageChange({ target: { files: e.dataTransfer.files } });
            }}
            onClick={() => document.getElementById("fileUpload").click()}
            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center cursor-pointer transition
              ${
                form.image || preview
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 bg-gray-50 hover:border-green-500 hover:bg-green-50"
              }`}
          >
            {!form.image && !preview && (
              <>
                <p className="text-gray-500">Drag & drop or click to upload</p>
                <p className="text-gray-400 text-sm">PNG, JPG — max 5MB</p>
              </>
            )}
            {(form.image || preview) && (
              <div className="flex flex-col items-center">
                <img
                  src={
                    preview || (form.image && URL.createObjectURL(form.image))
                  }
                  alt="Preview"
                  className="w-64 h-40 object-cover rounded border mb-3"
                />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setForm({ ...form, image: null });
                    setPreview("");
                  }}
                  className="text-red-600 hover:text-red-800 text-sm font-medium underline"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
          <input
            id="fileUpload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={loading}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold"
          >
            {loading ? "Saving..." : editingItem ? "Update" : "Add Gallery"}
          </button>
          {editingItem && (
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

      {/* Gallery Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md border">
          <thead>
            <tr className="bg-sky-100 text-left">
              <th className="p-3">S.No</th>
              <th className="p-3">Title</th>
              <th className="p-3">Category</th>
              <th className="p-3">Image</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {gallery.length ? (
              gallery.map((item, i) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{i + 1}</td>
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-32 h-20 object-cover rounded border"
                    />
                  </td>
                  <td className="p-3 flex items-center gap-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-sky-600 hover:text-sky-800"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No gallery images
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        theme="colored"
      />
    </div>
  );
}
