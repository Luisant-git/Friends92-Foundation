import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { getTrustees, createTrustee, updateTrustee, deleteTrustee } from '../api/Trustees.js';
import { uploadImage } from '../api/Upload.js';
import InputField from '../components/common/InputField.jsx';
import TextAreaField from '../components/common/TextAreaField.jsx';
import StatusToggle from '../components/common/StatusToggle.jsx';
import Toast from '../components/common/Toast.jsx';

const PAGE_SIZE = 10;

const AdminTrustees = () => {
  const [trustees, setTrustees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTrustee, setEditingTrustee] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    description: '',
    imageUrl: '',
    isActive: true
  });
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [uploading, setUploading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadTrustees();
  }, []);

  const loadTrustees = async () => {
    try {
      const data = await getTrustees();
      setTrustees(data);
    } catch (error) {
      showToast('Failed to load trustees', 'error');
    }
  };

  const filteredTrustees = useMemo(() => {
    let filtered = trustees;

    if (statusFilter !== 'ALL') {
      const active = statusFilter === 'ACTIVE';
      filtered = filtered.filter(t => !!t.isActive === active);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(t =>
        t.name?.toLowerCase().includes(term) ||
        t.designation?.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [trustees, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredTrustees.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedTrustees = filteredTrustees.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTrustee) {
        await updateTrustee(editingTrustee.id, formData);
        showToast('Trustee updated successfully', 'success');
      } else {
        await createTrustee(formData);
        showToast('Trustee created successfully', 'success');
      }
      resetForm();
      loadTrustees();
    } catch (error) {
      showToast('Failed to save trustee', 'error');
    }
  };

  const handleEdit = (trustee) => {
    setEditingTrustee(trustee);
    setFormData(trustee);
    setShowForm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTrustee(deleteId);
      showToast('Trustee deleted successfully', 'success');
      loadTrustees();
    } catch (error) {
      showToast('Failed to delete trustee', 'error');
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    try {
      const response = await uploadImage(file);
      setFormData({ ...formData, imageUrl: response.url });
      showToast('Image uploaded successfully', 'success');
    } catch (error) {
      showToast('Failed to upload image', 'error');
    } finally {
      setUploading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      designation: '',
      description: '',
      imageUrl: '',
      isActive: true
    });
    setEditingTrustee(null);
    setShowForm(false);
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: '', type: '' }), 3000);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Board of Trustees</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90"
        >
          <Plus className="w-4 h-4" />
          Add Trustee
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by name or designation..."
            value={searchTerm}
            onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            className="w-full max-w-2xl px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-wrap items-end gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
              className="w-52 px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>
          {(searchTerm || statusFilter !== 'ALL') && (
            <button
              onClick={() => { setSearchTerm(''); setStatusFilter('ALL'); setCurrentPage(1); }}
              className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4 shadow-2xl relative animate-slide-up">
            <h3 className="text-xl font-bold mb-4 text-gray-800 font-heading">Confirm Delete</h3>
            <p className="text-gray-600 mb-6 font-body">Are you sure you want to delete this trustee? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowDeleteModal(false); setDeleteId(null); }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition shadow-md"
              >
                Delete Trustee
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingTrustee ? 'Edit Trustee' : 'Add New Trustee'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <InputField
                label="Designation"
                value={formData.designation}
                onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                required
              />
              <TextAreaField
                label="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                required
              />
              <div>
                <label className="block font-semibold mb-2">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/5 file:text-primary file:cursor-pointer hover:file:bg-primary/10"
                />
                {formData.imageUrl && (
                  <div className="mt-3">
                    <img
                      src={formData.imageUrl}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded-full border"
                    />
                  </div>
                )}
              </div>
              <StatusToggle
                label="Active Status"
                value={formData.isActive}
                onChange={(checked) => setFormData({ ...formData, isActive: checked })}
              />
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90"
                >
                  {editingTrustee ? 'Update' : 'Create'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {paginatedTrustees.map((trustee) => (
          <div key={trustee.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-start gap-4">
              <img
                src={trustee.imageUrl || 'https://via.placeholder.com/100'}
                alt={trustee.name}
                className="w-20 h-20 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-gray-800">{trustee.name}</h3>
                <p className="text-primary font-semibold">{trustee.designation}</p>
                <p className="text-gray-600 text-sm mt-2">{trustee.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    trustee.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {trustee.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(trustee)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(trustee.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTrustees.length > PAGE_SIZE && (
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4 bg-white rounded-b-xl">
          <p className="text-sm text-gray-500">
            Showing <span className="font-medium">{Math.min((safePage - 1) * PAGE_SIZE + 1, filteredTrustees.length)}</span> to{' '}
            <span className="font-medium">{Math.min(safePage * PAGE_SIZE, filteredTrustees.length)}</span> of{' '}
            <span className="font-medium">{filteredTrustees.length}</span> trustees
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

      {filteredTrustees.length === 0 && (
        <div className="text-center text-gray-500 p-8 bg-white rounded-xl shadow-md">
          {searchTerm || statusFilter !== 'ALL'
            ? 'No trustees found matching your search/filter criteria'
            : 'No trustees found'}
        </div>
      )}

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: '', type: '' })}
        />
      )}
    </div>
  );
};

export default AdminTrustees;