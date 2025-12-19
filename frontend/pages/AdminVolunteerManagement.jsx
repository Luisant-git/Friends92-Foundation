import React, { useState, useEffect } from 'react';
import { Trash2, Eye } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getVolunteers, deleteVolunteer, toggleVolunteerActive } from '../api/Volunteer';

const AdminVolunteerManagement = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showToggleModal, setShowToggleModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [toggleVolunteer, setToggleVolunteer] = useState(null);
  const [filterService, setFilterService] = useState('');

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const data = await getVolunteers();
      setVolunteers(data.filter(v => v.password));
    } catch (err) {
      console.error(err);
    }
  };

  const confirmDelete = async () => {
    try {
      await deleteVolunteer(deleteId);
      toast.success('Volunteer deleted successfully!');
      fetchVolunteers();
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (err) {
      toast.error('Failed to delete volunteer');
    }
  };

  const confirmToggle = async () => {
    try {
      await toggleVolunteerActive(toggleVolunteer.id);
      toast.success(`Volunteer ${toggleVolunteer.isActive ? 'deactivated' : 'activated'} successfully!`);
      fetchVolunteers();
      setShowToggleModal(false);
      setToggleVolunteer(null);
    } catch (err) {
      toast.error('Failed to toggle volunteer status');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Volunteer Management</h1>
        <select
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Services</option>
          <option value="Education & Tutoring">Education & Tutoring</option>
          <option value="Skill Development">Skill Development</option>
          <option value="Career Counseling">Career Counseling</option>
          <option value="Event Management">Event Management</option>
          <option value="Fundraising">Fundraising</option>
          <option value="Social Media & Marketing">Social Media & Marketing</option>
          <option value="Community Outreach">Community Outreach</option>
          <option value="Administrative Support">Administrative Support</option>
        </select>
      </div>

      {showToggleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Confirm Status Change</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to {toggleVolunteer?.isActive ? 'deactivate' : 'activate'} this volunteer?
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowToggleModal(false); setToggleVolunteer(null); }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={confirmToggle}
                className={`px-4 py-2 text-white rounded ${
                  toggleVolunteer?.isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                }`}
              >
                {toggleVolunteer?.isActive ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">Are you sure you want to delete this volunteer?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowDeleteModal(false); setDeleteId(null); }}
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

      {selectedVolunteer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold">Volunteer Details</h3>
              <button onClick={() => setSelectedVolunteer(null)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              {selectedVolunteer.photoUrl && (
                <img src={selectedVolunteer.photoUrl} alt={selectedVolunteer.name} className="w-32 h-32 object-cover rounded" />
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <div><strong>Name:</strong> {selectedVolunteer.name}</div>
                <div><strong>Service Area:</strong> {selectedVolunteer.service}</div>
                <div><strong>Mobile 1:</strong> {selectedVolunteer.mobile1}</div>
                <div><strong>Mobile 2:</strong> {selectedVolunteer.mobile2 || '-'}</div>
                <div><strong>Email:</strong> {selectedVolunteer.email}</div>
                <div><strong>Profession:</strong> {selectedVolunteer.profession}</div>
                {selectedVolunteer.companyName && <div><strong>Company:</strong> {selectedVolunteer.companyName}</div>}
                {selectedVolunteer.designation && <div><strong>Designation:</strong> {selectedVolunteer.designation}</div>}
                {selectedVolunteer.businessName && <div><strong>Business:</strong> {selectedVolunteer.businessName}</div>}
              </div>
              <div><strong>Permanent Address:</strong> {selectedVolunteer.permanentAddress}</div>
              <div><strong>Services Offered:</strong> {selectedVolunteer.servicesOffered}</div>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md border">
          <thead>
            <tr className="bg-blue-50 text-left">
              <th className="p-3">S.No</th>
              <th className="p-3">Name</th>
              <th className="p-3 hidden md:table-cell">Email</th>
              <th className="p-3 hidden sm:table-cell">Mobile</th>
              <th className="p-3 hidden lg:table-cell">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {volunteers.filter(v => !filterService || v.service === filterService).map((volunteer, index) => (
              <tr key={volunteer.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{index + 1}</td>
                <td className="p-3">{volunteer.name}</td>
                <td className="p-3 hidden md:table-cell">{volunteer.email}</td>
                <td className="p-3 hidden sm:table-cell">{volunteer.mobile1}</td>
                <td className="p-3 hidden lg:table-cell">
                  <button
                    onClick={() => { setToggleVolunteer(volunteer); setShowToggleModal(true); }}
                    className={`px-3 py-1 rounded text-xs cursor-pointer transition ${
                      volunteer.isActive ? 'bg-green-100 text-green-800 hover:bg-green-200' : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                  >
                    {volunteer.isActive ? 'Active' : 'Inactive'}
                  </button>
                </td>
                <td className="p-3 flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedVolunteer(volunteer)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="View Details"
                  >
                    <Eye size={20} />
                  </button>
                  <button
                    onClick={() => { setDeleteId(volunteer.id); setShowDeleteModal(true); }}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {volunteers.filter(v => !filterService || v.service === filterService).length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No active volunteers yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVolunteerManagement;
