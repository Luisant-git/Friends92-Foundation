import React, { useState, useEffect, useMemo } from "react";
import { Edit, Trash2, Download, Upload } from "lucide-react";
import { toast } from "react-hot-toast";
import { createReport, getReports, updateReport, deleteReport, uploadReportFile } from "../api/Reports.js";

const PAGE_SIZE = 10;

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({ year: "", title: "", size: "", fileUrl: "" });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadReports();
  }, []);

  const filteredReports = useMemo(() => {
    if (!searchTerm.trim()) return reports;
    const term = searchTerm.toLowerCase();
    return reports.filter(item =>
      item.title?.toLowerCase().includes(term) ||
      item.year?.toLowerCase().includes(term)
    );
  }, [reports, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedReports = filteredReports.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const loadReports = async () => {
    try {
      const data = await getReports();
      setReports(data);
    } catch {
      toast.error("Failed to load reports");
    }
  };

  const resetForm = () => {
    setForm({ year: "", title: "", size: "", fileUrl: "" });
    setEditingItem(null);
    setShowModal(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast.error('Please select a PDF file');
      return;
    }

    setUploading(true);
    try {
      const result = await uploadReportFile(file);
      setForm(prev => ({
        ...prev,
        fileUrl: result.downloadUrl || result.url,
        size: result.size
      }));
      toast.success('File uploaded successfully');
    } catch (err) {
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.year || !form.title) return;

    setLoading(true);
    try {
      if (editingItem) {
        await updateReport(editingItem.id, form);
        toast.success("Report updated successfully");
      } else {
        await createReport(form);
        toast.success("Report added successfully");
      }
      resetForm();
      await loadReports();
    } catch (err) {
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setForm({
      year: item.year,
      title: item.title,
      size: item.size,
      fileUrl: item.fileUrl
    });
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteReport(deleteId);
      toast.success("Deleted successfully");
      await loadReports();
      setDeleteId(null);
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-heading">Annual Reports Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-semibold"
        >
          Add Report
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by title or year..."
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

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-bold mb-4 font-heading">{editingItem ? 'Edit Report' : 'Add Report'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Year</label>
                <input
                  type="text"
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  placeholder="e.g., 2023-24"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Title</label>
                <input
                  type="text"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Annual Report 2023-24"
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Upload PDF File</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg cursor-pointer border"
                  >
                    <Upload size={16} />
                    {uploading ? 'Uploading...' : 'Choose PDF'}
                  </label>
                  {form.fileUrl && (
                    <span className="text-secondary text-sm">✓ File uploaded</span>
                  )}
                </div>
                {form.size && (
                  <p className="text-sm text-gray-600 mt-1 font-body">File Size: {form.size}</p>
                )}
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading || uploading}
                  className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-semibold disabled:opacity-50"
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
            <p className="mb-6">Are you sure you want to delete this report?</p>
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
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Size</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedReports.length ? (
              paginatedReports.map((item, index) => (
                <tr key={item.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{(safePage - 1) * PAGE_SIZE + index + 1}</td>
                  <td className="p-3">{item.year}</td>
                  <td className="p-3">{item.title}</td>
                  <td className="p-3">{item.size}</td>
                  <td className="p-3 flex gap-4">
                    {item.fileUrl && (
                      <a
                        href={item.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-secondary hover:text-secondary"
                        title="Download PDF"
                      >
                        <Download size={20} />
                      </a>
                    )}
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
                <td colSpan="5" className="p-8 text-center text-gray-500">
                  {searchTerm
                    ? 'No reports found matching your search criteria'
                    : 'No reports found'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {filteredReports.length > PAGE_SIZE && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{Math.min((safePage - 1) * PAGE_SIZE + 1, filteredReports.length)}</span> to{' '}
              <span className="font-medium">{Math.min(safePage * PAGE_SIZE, filteredReports.length)}</span> of{' '}
              <span className="font-medium">{filteredReports.length}</span> reports
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






