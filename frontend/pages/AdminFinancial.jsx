import React, { useState, useEffect } from "react";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { createFinancial, getFinancial, updateFinancial, deleteFinancial } from "../api/Financial.js";

export default function AdminFinancial() {
  const [financial, setFinancial] = useState([]);
  const [form, setForm] = useState({ category: "", amount: "", percentage: "", year: "" });
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    loadFinancial();
  }, []);

  const loadFinancial = async () => {
    try {
      const data = await getFinancial();
      setFinancial(data);
    } catch {
      toast.error("Failed to load financial data");
    }
  };

  const resetForm = () => {
    setForm({ category: "", amount: "", percentage: "", year: "" });
    setEditingItem(null);
    setShowModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category || !form.amount || !form.percentage || !form.year) return;

    setLoading(true);
    try {
      const data = {
        ...form,
        percentage: parseInt(form.percentage)
      };

      if (editingItem) {
        await updateFinancial(editingItem.id, data);
        toast.success("Financial data updated successfully");
      } else {
        await createFinancial(data);
        toast.success("Financial data added successfully");
      }
      resetForm();
      await loadFinancial();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      category: item.category,
      amount: item.amount,
      percentage: item.percentage.toString(),
      year: item.year || ""
    });
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteFinancial(deleteId);
      toast.success("Deleted successfully");
      await loadFinancial();
      setDeleteId(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  const totalPercentage = financial.reduce((sum, item) => sum + item.percentage, 0);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Financial Summary Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Add Category
        </button>
      </div>

      {totalPercentage !== 100 && financial.length > 0 && (
        <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded">
          <p className="text-yellow-800">
            Warning: Total percentage is {totalPercentage}%. It should equal 100%.
          </p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4">{editingItem ? 'Edit Category' : 'Add Category'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Year</label>
                <input
                  type="text"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  placeholder="2023-24"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Category</label>
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  placeholder="Education Programs"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Amount</label>
                <input
                  type="text"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="₹45,00,000"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Percentage</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={form.percentage}
                  onChange={(e) => setForm({ ...form, percentage: e.target.value })}
                  placeholder="45"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
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

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this category?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md border">
          <thead>
            <tr className="bg-blue-50">
              <th className="p-3 text-left">Year</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Percentage</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {financial.length ? (
              financial.map((item) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{item.year}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.amount}</td>
                  <td className="p-3">{item.percentage}%</td>
                  <td className="p-3 flex gap-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => setDeleteId(item.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  No financial data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}