import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Upload, X } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getServices, createService, updateService, deleteService } from '../api/Services';
import { uploadImage } from '../api/Upload';
import InputField from '../components/common/InputField';
import TextAreaField from '../components/common/TextAreaField';

const ManageServicesPage = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    content: '',
    imageUrl: '',
    type: 'SKILL_DEVELOPMENT'
  });

  const [services, setServices] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.type) {
      alert('Please fill all required fields!');
      return;
    }

    try {
      if (editId) {
        await updateService(editId, form);
        toast.success('Service updated successfully!');
      } else {
        await createService(form);
        toast.success('Service added successfully!');
      }
      resetForm();
      fetchServices();
    } catch (err) {
      console.error(err);
      alert('Error saving service');
    }
  };

  const resetForm = () => {
    setForm({ title: '', description: '', content: '', imageUrl: '', type: 'SKILL_DEVELOPMENT' });
    setEditId(null);
    setShowModal(false);
    setSelectedFile(null);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) return;
    
    setUploading(true);
    try {
      const result = await uploadImage(selectedFile);
      setForm({ ...form, imageUrl: result.url });
      setSelectedFile(null);
      toast.success('Image uploaded successfully!');
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (service) => {
    setForm(service);
    setEditId(service.id);
    setShowModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteService(deleteId);
      toast.success('Service deleted successfully!');
      fetchServices();
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      alert('Error deleting service');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Services Management</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
        >
          Add New Service
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">{editId ? 'Edit Service' : 'Add Service'}</h2>
              <button onClick={resetForm} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="space-y-4">
              <InputField
                label="Title"
                placeholder="Enter service title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              
              <TextAreaField
                label="Description"
                placeholder="Enter service description"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              
              <TextAreaField
                label="Content (Optional)"
                placeholder="Enter detailed content"
                value={form.content}
                onChange={(e) => setForm({ ...form, content: e.target.value })}
              />
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image (Optional)</label>
                <div className="flex items-center gap-3">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100"
                  />
                  {selectedFile && (
                    <button
                      onClick={handleFileUpload}
                      disabled={uploading}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50"
                    >
                      {uploading ? 'Uploading...' : 'Upload'}
                    </button>
                  )}
                </div>
                {form.imageUrl && (
                  <div className="mt-3">
                    <img
                      src={form.imageUrl}
                      alt="Preview"
                      className="w-20 h-20 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="SKILL_DEVELOPMENT">Skill Development</option>
                  <option value="PERSONALITY_DEVELOPMENT">Personality Development</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleSubmit}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
              >
                {editId ? 'Update' : 'Add'}
              </button>
              <button
                onClick={resetForm}
                className="bg-gray-400 text-white px-6 py-3 rounded-xl hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this service?</p>
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
        <table className="min-w-full bg-white rounded-lg shadow-md border">
          <thead>
            <tr className="bg-blue-50 text-left">
              <th className="p-3">S.No</th>
              <th className="p-3">Title</th>
              <th className="p-3 hidden sm:table-cell">Type</th>
              <th className="p-3 hidden md:table-cell">Description</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service, index) => (
              <tr key={service.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">
                  <div className="font-medium">{service.title}</div>
                  <div className="sm:hidden text-sm text-gray-500 mt-1">
                    <span className={`px-2 py-1 rounded text-xs ${
                      service.type === 'SKILL_DEVELOPMENT' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {service.type === 'SKILL_DEVELOPMENT' ? 'Skill Dev' : 'Personality Dev'}
                    </span>
                  </div>
                  <div className="md:hidden text-sm text-gray-600 mt-1 truncate max-w-xs">
                    {service.description}
                  </div>
                </td>
                <td className="p-3 hidden sm:table-cell">
                  <span className={`px-2 py-1 rounded text-sm ${
                    service.type === 'SKILL_DEVELOPMENT' 
                      ? 'bg-blue-100 text-blue-800' 
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {service.type === 'SKILL_DEVELOPMENT' ? 'Skill Development' : 'Personality Development'}
                  </span>
                </td>
                <td className="p-3 hidden md:table-cell max-w-xs truncate">{service.description}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      className="text-blue-600 hover:text-blue-800 transition p-1"
                    >
                      <Pencil size={18} />
                    </button>
                    <button
                      onClick={() => { setDeleteId(service.id); setShowDeleteModal(true); }}
                      className="text-red-600 hover:text-red-800 transition p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {services.length === 0 && (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No services available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageServicesPage;
