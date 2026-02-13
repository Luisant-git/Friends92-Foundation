import React, { useState, useEffect } from 'react';
import { getAlumni, deleteAlumni } from '../api/Alumini';
import { Eye, Trash2 } from 'lucide-react';

const AdminAlumni = () => {
  const [alumni, setAlumni] = useState([]);
  const [filteredAlumni, setFilteredAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewModal, setViewModal] = useState(null);
  const [filters, setFilters] = useState({
    year: '',
    willingToDonateBlood: '',
    willingToProvideServices: ''
  });

  useEffect(() => {
    fetchAlumni();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [alumni, filters]);

  const fetchAlumni = async () => {
    try {
      const data = await getAlumni();
      setAlumni(data);
    } catch (err) {
      console.error('Failed to load alumni');
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...alumni];

    if (filters.year) {
      filtered = filtered.filter(a => a.year === Number(filters.year));
    }

    if (filters.willingToDonateBlood) {
      filtered = filtered.filter(a => a.willingToDonateBlood === filters.willingToDonateBlood);
    }

    if (filters.willingToProvideServices) {
      filtered = filtered.filter(a => a.willingToProvideServices === filters.willingToProvideServices);
    }

    setFilteredAlumni(filtered);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this alumni?')) {
      try {
        await deleteAlumni(id);
        setAlumni(alumni.filter(a => a.id !== id));
      } catch (err) {
        alert('Failed to delete alumni');
      }
    }
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1970 + 1 }, (_, i) => 1970 + i);

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 font-heading">Alumni Management</h1>
      
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h2 className="font-semibold mb-4 font-heading">Filters</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Passed Out Year</label>
            <select
              value={filters.year}
              onChange={(e) => setFilters({ ...filters, year: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">All Years</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Willing to Donate Blood</label>
            <select
              value={filters.willingToDonateBlood}
              onChange={(e) => setFilters({ ...filters, willingToDonateBlood: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Willing to Provide Services</label>
            <select
              value={filters.willingToProvideServices}
              onChange={(e) => setFilters({ ...filters, willingToProvideServices: e.target.value })}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="">All</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Department</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">City</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAlumni.map((person) => (
              <tr key={person.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{person.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{person.mobile}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{person.department}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{person.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{person.city}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm flex gap-2">
                  <button onClick={() => setViewModal(person)} className="text-primary hover:text-blue-900">
                    <Eye size={18} />
                  </button>
                  <button onClick={() => handleDelete(person.id)} className="text-red-600 hover:text-red-900">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {viewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 font-heading">Alumni Details</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="font-bold text-lg text-gray-700 border-b pb-2 font-heading">Personal Information</h3>
                <div><span className="font-semibold">Name:</span> {viewModal.name}</div>
                <div><span className="font-semibold">Email:</span> {viewModal.email || '-'}</div>
                <div><span className="font-semibold">Mobile:</span> {viewModal.mobile}</div>
                <div><span className="font-semibold">Mobile 2:</span> {viewModal.mobile2 || '-'}</div>
                <div><span className="font-semibold">Department:</span> {viewModal.department}</div>
                <div><span className="font-semibold">Passed Out Year:</span> {viewModal.year}</div>
                <div><span className="font-semibold">Current Location:</span> {viewModal.city}</div>
                <div><span className="font-semibold">Profession:</span> {viewModal.profession || '-'}</div>
                <div><span className="font-semibold">Service Area:</span> {viewModal.serviceArea || '-'}</div>
                <div><span className="font-semibold">Blood Group:</span> {viewModal.bloodGroup || '-'}</div>
                <div><span className="font-semibold">Willing to Donate Blood:</span> {viewModal.willingToDonateBlood || '-'}</div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg text-gray-700 border-b pb-2 font-heading">Professional Information</h3>
                <div><span className="font-semibold">Services Can Provide:</span> {viewModal.servicesCanProvide || '-'}</div>
                
                {viewModal.companyName && (
                  <>
                    <h4 className="font-semibold text-md text-gray-600 mt-4">Employee Details</h4>
                    <div><span className="font-semibold">Company Name:</span> {viewModal.companyName}</div>
                    <div><span className="font-semibold">Designation:</span> {viewModal.designation || '-'}</div>
                    <div><span className="font-semibold">Department:</span> {viewModal.employeeDepartment || '-'}</div>
                    <div><span className="font-semibold">Place:</span> {viewModal.employeePlace || '-'}</div>
                  </>
                )}

                {viewModal.businessName && (
                  <>
                    <h4 className="font-semibold text-md text-gray-600 mt-4">Entrepreneur Details</h4>
                    <div><span className="font-semibold">Business Name:</span> {viewModal.businessName}</div>
                    <div><span className="font-semibold">Nature of Business:</span> {viewModal.natureOfBusiness || '-'}</div>
                    <div><span className="font-semibold">Place:</span> {viewModal.businessPlace || '-'}</div>
                    <div><span className="font-semibold">Business Address:</span> {viewModal.businessAddress || '-'}</div>
                  </>
                )}

                <div><span className="font-semibold">Permanent Address:</span> {viewModal.permanentAddress || '-'}</div>
                <div><span className="font-semibold">Willing to Provide Services:</span> {viewModal.willingToProvideServices || '-'}</div>
              </div>
            </div>

            {viewModal.photo && (
              <div className="mt-6">
                <h3 className="font-bold text-lg text-gray-700 border-b pb-2 mb-3 font-heading">Photo</h3>
                <img src={viewModal.photo} alt="Alumni" className="w-32 h-32 object-cover rounded" />
              </div>
            )}

            <button onClick={() => setViewModal(null)} className="mt-6 px-6 py-2 bg-gray-600 text-white rounded hover:bg-gray-700">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAlumni;







