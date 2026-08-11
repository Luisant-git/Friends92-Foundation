import React, { useState, useEffect, useMemo } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  createPlacement,
  deletePlacement,
  getPlacements,
  updatePlacement,
} from "../api/Placement";

import StatusToggle from "../components/common/StatusToggle";
import InputField from "../components/common/InputField";
import TextAreaField from "../components/common/TextAreaField";

const PAGE_SIZE = 10;

export default function PlacementAdmin() {
  const [form, setForm] = useState({
    companyName: "",
    companyDesc: "",
    companyLocation: "",
    jobTitle: "",
    jobLocation: "",
    jobDescription: "",
    companyContactNumber: "",
    companyEmail: "",
    skills: "",
    experience: "",
    status: true,
  });

  const [placements, setPlacements] = useState([]);
  const [editId, setEditId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchAllPlacements();
  }, []);

  const fetchAllPlacements = async () => {
    try {
      const data = await getPlacements();
      setPlacements(data);
    } catch (err) {
      console.error(err);
    }
  };

  const filteredPlacements = useMemo(() => {
    let filtered = placements;

    if (statusFilter !== 'ALL') {
      const active = statusFilter === 'ACTIVE';
      filtered = filtered.filter(p => p.status === active);
    }

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        p.companyName?.toLowerCase().includes(term) ||
        p.jobTitle?.toLowerCase().includes(term) ||
        p.jobLocation?.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [placements, searchTerm, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPlacements.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedPlacements = filteredPlacements.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddOrUpdate = async () => {
    const requiredFields = [
      "companyName",
      "companyDesc",
      "companyLocation",
      "jobTitle",
      "jobLocation",
      "jobDescription",
      "companyContactNumber",
      "companyEmail",
      "skills",
      "experience",
    ];
    for (let field of requiredFields) {
      if (!form[field]) {
        alert("Please fill all required fields!");
        return;
      }
    }

    const payload = {
      ...form,
      skills: form.skills.split(",").map((s) => s.trim()),
      experience: Number(form.experience),
    };

    try {
      if (editId) {
        await updatePlacement(editId, payload);
        toast.success("Placement updated successfully!");
        setEditId(null);
      } else {
        await createPlacement(payload);
        toast.success("Placement added successfully!");
      }
      setForm({
        companyName: "",
        companyDesc: "",
        companyLocation: "",
        jobTitle: "",
        jobLocation: "",
        jobDescription: "",
        companyContactNumber: "",
        companyEmail: "",
        skills: "",
        experience: "",
        status: true,
      });
      setShowEditModal(false);
      setEditId(null);
      fetchAllPlacements();
    } catch (err) {
      console.error(err);
      alert("Error saving placement");
    }
  };

  const handleEdit = (placement) => {
    setForm({
      ...placement,
      skills: placement.skills.join(", "),
    });
    setEditId(placement.id);
    setShowEditModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deletePlacement(deleteId);
      toast.success("Placement deleted successfully!");
      fetchAllPlacements();
      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (err) {
      console.error(err);
      alert("Error deleting placement");
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold font-heading">Placement Management</h1>
        <button
          onClick={() => setShowEditModal(true)}
          className="bg-primary hover:bg-secondary text-white px-6 py-2 rounded-lg font-semibold"
        >
          Add New Placement
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Search</label>
          <input
            type="text"
            placeholder="Search by company, job title or location..."
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
              onClick={() => { setSearchTerm(""); setStatusFilter("ALL"); setCurrentPage(1); }}
              className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold font-heading">{editId ? 'Edit Placement' : 'Add Placement'}</h2>
              <button onClick={() => { setShowEditModal(false); setEditId(null); }} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column - Company Details */}
          <div className="space-y-4">
            <InputField
              label="Company Name"
              placeholder="Enter company name"
              value={form.companyName}
              onChange={(e) =>
                setForm({ ...form, companyName: e.target.value })
              }
            />
            <InputField
              label="Company Location"
              placeholder="Enter company location"
              value={form.companyLocation}
              onChange={(e) =>
                setForm({ ...form, companyLocation: e.target.value })
              }
            />
            <InputField
              label="Company Contact Number"
              placeholder="Enter contact number"
              value={form.companyContactNumber}
              onChange={(e) =>
                setForm({ ...form, companyContactNumber: e.target.value })
              }
            />
            <InputField
              label="Company Email"
              placeholder="Enter email"
              type="email"
              value={form.companyEmail}
              onChange={(e) =>
                setForm({ ...form, companyEmail: e.target.value })
              }
            />
            <TextAreaField
              label="Company Description"
              placeholder="Enter company description"
              value={form.companyDesc}
              onChange={(e) =>
                setForm({ ...form, companyDesc: e.target.value })
              }
            />
          </div>

          {/* Right Column - Job Details */}
          <div className="space-y-4">
            <InputField
              label="Job Title"
              placeholder="Enter job title"
              value={form.jobTitle}
              onChange={(e) => setForm({ ...form, jobTitle: e.target.value })}
            />
            <InputField
              label="Job Location"
              placeholder="Enter job location"
              value={form.jobLocation}
              onChange={(e) =>
                setForm({ ...form, jobLocation: e.target.value })
              }
            />
            <InputField
              label="Skills (comma separated)"
              placeholder="Enter skills"
              value={form.skills}
              onChange={(e) => setForm({ ...form, skills: e.target.value })}
            />
            <InputField
              label="Years of Experience"
              placeholder="Enter experience"
              type="number"
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
            />
            <TextAreaField
              label="Job Description"
              placeholder="Enter job description"
              value={form.jobDescription}
              onChange={(e) =>
                setForm({ ...form, jobDescription: e.target.value })
              }
            />
            <StatusToggle
              label="Status"
              value={form.status}
              onChange={(checked) => setForm({ ...form, status: checked })}
            />
          </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleAddOrUpdate}
                className="bg-secondary text-white px-6 py-3 rounded-xl hover:bg-secondary transition"
              >
                {editId ? "Update" : "Add"}
              </button>
              <button
                onClick={() => { setShowEditModal(false); setEditId(null); }}
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
          <div className="bg-white rounded-xl p-6 max-w-sm w-full mx-4">
            <h3 className="text-xl font-bold text-gray-800 mb-4 font-heading">Confirm Delete</h3>
            <p className="text-gray-600 mb-6 font-body">Are you sure you want to delete this placement?</p>
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
        <table className="min-w-full bg-white rounded-xl shadow-md border">
          <thead>
            <tr className="bg-primary/5 text-left">
              <th className="p-3">S.No</th>
              <th className="p-3">Company</th>
              <th className="p-3">Job</th>
              <th className="p-3">Location</th>
              <th className="p-3">Experience</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedPlacements.map((p, index) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3">{(safePage - 1) * PAGE_SIZE + index + 1}</td>
                <td className="p-3">{p.companyName}</td>
                <td className="p-3">{p.jobTitle}</td>
                <td className="p-3">{p.jobLocation}</td>
                <td className="p-3">{p.experience} yrs</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    p.status ? 'bg-secondary/10 text-secondary' : 'bg-red-100 text-red-800'
                  }`}>
                    {p.status ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="p-3 flex gap-4">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-primary hover:text-primary transition"
                  >
                    <Pencil size={20} />
                  </button>
                  <button
                    onClick={() => { setDeleteId(p.id); setShowDeleteModal(true); }}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {paginatedPlacements.length === 0 && (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  {searchTerm || statusFilter !== 'ALL'
                    ? 'No placements found matching your search/filter criteria'
                    : 'No placements available'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {filteredPlacements.length > PAGE_SIZE && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{Math.min((safePage - 1) * PAGE_SIZE + 1, filteredPlacements.length)}</span> to{' '}
              <span className="font-medium">{Math.min(safePage * PAGE_SIZE, filteredPlacements.length)}</span> of{' '}
              <span className="font-medium">{filteredPlacements.length}</span> placements
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







