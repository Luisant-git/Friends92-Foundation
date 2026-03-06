import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';
import { getTrustees, createTrustee, updateTrustee, deleteTrustee } from '../api/Trustees.js';
import { uploadImage } from '../api/Upload.js';
import InputField from '../components/common/InputField.jsx';
import TextAreaField from '../components/common/TextAreaField.jsx';
import StatusToggle from '../components/common/StatusToggle.jsx';
import Toast from '../components/common/Toast.jsx';

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

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this trustee?')) {
      try {
        await deleteTrustee(id);
        showToast('Trustee deleted successfully', 'success');
        loadTrustees();
      } catch (error) {
        showToast('Failed to delete trustee', 'error');
      }
    }
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
        {trustees.map((trustee) => (
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