import React, { useState, useEffect } from 'react';
import { Trash2, Eye } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getVolunteers, deleteVolunteer, approveVolunteer, activateVolunteer } from '../api/Volunteer';

const AdminVolunteerPage = () => {
  const [volunteers, setVolunteers] = useState([]);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [filterService, setFilterService] = useState('');

  useEffect(() => {
    fetchVolunteers();
  }, []);

  const fetchVolunteers = async () => {
    try {
      const data = await getVolunteers();
      setVolunteers(data.filter(v => !v.password));
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

  const handleApprove = async (id) => {
    try {
      await approveVolunteer(id);
      toast.success('Volunteer approved! Selection email sent.');
      fetchVolunteers();
    } catch (err) {
      toast.error('Failed to approve volunteer');
    }
  };

  const handleActivate = async (id) => {
    try {
      await activateVolunteer(id);
      toast.success('Volunteer activated! Activation email sent.');
      fetchVolunteers();
    } catch (err) {
      toast.error('Failed to activate volunteer');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold font-heading">Volunteer Requests</h1>
        <select
          value={filterService}
          onChange={(e) => setFilterService(e.target.value)}
          className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-primary"
        >
          <option value="">All Services</option>
          <option value="Education">Education</option>
          <option value="Health">Health</option>
          <option value="Environment">Environment</option>
          <option value="Women & Child Welfare">Women & Child Welfare</option>
          <option value="Disaster Relief">Disaster Relief</option>
        </select>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold mb-4 font-heading">Confirm Delete</h3>
            <p className="text-gray-600 mb-6 font-body">Are you sure you want to delete this volunteer?</p>
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
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-2xl font-bold font-heading">Volunteer Details</h3>
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
        <table className="min-w-full bg-white rounded-xl shadow-md border">
          <thead>
            <tr className="bg-primary/5 text-left">
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
                  <span className={`px-2 py-1 rounded text-xs ${
                    volunteer.isActive ? 'bg-secondary/10 text-secondary' : 
                    volunteer.password ? 'bg-yellow-100 text-yellow-800' : 
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {volunteer.isActive ? 'Active' : volunteer.password ? 'Approved' : 'Pending'}
                  </span>
                </td>
                <td className="p-3 flex gap-2 flex-wrap">
                  <button
                    onClick={() => setSelectedVolunteer(volunteer)}
                    className="text-primary hover:text-primary transition"
                    title="View Details"
                  >
                    <Eye size={20} />
                  </button>
                  {!volunteer.password && (
                    <button
                      onClick={() => handleApprove(volunteer.id)}
                      className="px-3 py-1 bg-secondary text-white text-xs rounded hover:bg-secondary/90"
                    >
                      Approve
                    </button>
                  )}
                  {volunteer.password && !volunteer.isActive && (
                    <button
                      onClick={() => handleActivate(volunteer.id)}
                      className="px-3 py-1 bg-secondary text-white text-xs rounded hover:bg-secondary"
                    >
                      Activate
                    </button>
                  )}
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
                  No volunteers registered yet
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminVolunteerPage;







