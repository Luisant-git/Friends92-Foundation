import React, { useState, useEffect, useMemo } from "react";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { createFinancial, getFinancial, updateFinancial, deleteFinancial } from "../api/Financial.js";

const PAGE_SIZE = 10;

export default function AdminFinancial() {
  const [financial, setFinancial] = useState([]);
  const [form, setForm] = useState({ category: "", amount: "", percentage: "", year: "" });
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadFinancial();
  }, []);

  const filteredFinancial = useMemo(() => {
    if (!searchTerm.trim()) return financial;
    const term = searchTerm.toLowerCase();
    return financial.filter(item =>
      item.category?.toLowerCase().includes(term) ||
      item.year?.toLowerCase().includes(term)
    );
  }, [financial, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredFinancial.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedFinancial = filteredFinancial.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
        <h1 className="text-2xl font-bold font-heading">Financial Summary Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-semibold"
        >
          Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by category or year..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full max-w-2xl px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
          />
        </div>

        {searchTerm && (
          <div className="flex flex-wrap items-end gap-4">
            <button
              onClick={() => { setSearchTerm(""); setCurrentPage(1); }}
              className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Clear All Filters
            </button>
          </div>
        )}
      </div>

      {totalPercentage !== 100 && financial.length > 0 && (
        <div className="mb-4 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded">
          <p className="text-yellow-800 font-body">
            Warning: Total percentage is {totalPercentage}%. It should equal 100%.
          </p>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4 font-heading">{editingItem ? 'Edit Category' : 'Add Category'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Year</label>
                <input
                  type="text"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  placeholder="2023-24"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
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
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
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
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
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
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
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

      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold mb-4 font-heading">Confirm Delete</h3>
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
        <table className="min-w-full bg-white rounded-xl shadow-md border">
          <thead>
            <tr className="bg-primary/5">
              <th className="p-3 text-left">S.No</th>
              <th className="p-3 text-left">Year</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Percentage</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedFinancial.length ? (
              paginatedFinancial.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{(safePage - 1) * PAGE_SIZE + index + 1}</td>
                  <td className="p-3">{item.year}</td>
                  <td className="p-3">{item.category}</td>
                  <td className="p-3">{item.amount}</td>
                  <td className="p-3">{item.percentage}%</td>
                  <td className="p-3 flex gap-4">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-primary hover:text-primary"
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
                <td colSpan="6" className="p-8 text-center text-gray-500">
                  {searchTerm
                    ? 'No financial data found matching your search criteria'
                    : 'No financial data found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {filteredFinancial.length > PAGE_SIZE && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{Math.min((safePage - 1) * PAGE_SIZE + 1, filteredFinancial.length)}</span> to{' '}
              <span className="font-medium">{Math.min(safePage * PAGE_SIZE, filteredFinancial.length)}</span> of{' '}
              <span className="font-medium">{filteredFinancial.length}</span> categories
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(safePage - 1)}
                disabled={safePage === 1}
                className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
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
                onClick={() => handlePageChange(safePage + 1)}
                disabled={safePage === totalPages}
                className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}






