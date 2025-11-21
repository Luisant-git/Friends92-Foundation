import React, { useState, useEffect } from "react";
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
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this placement?")) {
      try {
        await deletePlacement(id);
        toast.success("Placement deleted successfully!");
        fetchAllPlacements();
      } catch (err) {
        console.error(err);
        alert("Error deleting placement");
      }
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />

      <h1 className="text-3xl font-bold mb-6">Placement Management</h1>

      {/* Form */}
      <div className="bg-white p-6 rounded-2xl shadow-lg mb-8">
        <h2 className="text-xl font-semibold mb-4">
          {editId ? "Edit Placement" : "Add Placement"}
        </h2>

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

        <button
          onClick={handleAddOrUpdate}
          className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
        >
          {editId ? "Update Placement" : "Add Placement"}
        </button>
      </div>

      {/* Table/List */}
      <div className="bg-white rounded-2xl shadow-lg p-6 overflow-x-auto">
        <h2 className="text-xl font-semibold mb-4">Placement List</h2>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="p-3 border-b">Company</th>
              <th className="p-3 border-b">Job</th>
              <th className="p-3 border-b">Location</th>
              <th className="p-3 border-b">Skills</th>
              <th className="p-3 border-b">Experience</th>
              <th className="p-3 border-b">Status</th>
              <th className="p-3 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {placements.map((p) => (
              <tr key={p.id} className="hover:bg-gray-50 transition">
                <td className="p-3 border-b">{p.companyName}</td>
                <td className="p-3 border-b">{p.jobTitle}</td>
                <td className="p-3 border-b">{p.jobLocation}</td>
                <td className="p-3 border-b">{p.skills.join(", ")}</td>
                <td className="p-3 border-b">{p.experience} yrs</td>
                <td className="p-3 border-b">
                  {p.status ? (
                    <span className="text-green-600 font-medium">Active</span>
                  ) : (
                    <span className="text-red-600 font-medium">Inactive</span>
                  )}
                </td>
                <td className="p-3 border-b flex space-x-3">
                  <button
                    onClick={() => handleEdit(p)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Pencil />
                  </button>
                  <button
                    onClick={() => handleDelete(p.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 />
                  </button>
                </td>
              </tr>
            ))}
            {placements.length === 0 && (
              <tr>
                <td
                  colSpan="7"
                  className="text-center p-4 text-gray-500 italic"
                >
                  No placements added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
