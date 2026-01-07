import React, { useState } from "react";
import { filterAlumni, updateAlumni } from "../api/Alumini";
import { createVolunteer } from "../api/Volunteer";
import SearchableDropdown from "../components/SearchableDropdown";

export default function ViewAlumni() {
  const [alumniList, setAlumniList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [editForm, setEditForm] = useState({ 
    willingToDonateBlood: "No", 
    bloodGroup: "", 
    willingToProvideServices: "No", 
    serviceArea: "", 
    servicesCanProvide: "" 
  });

  // Filters
  const [filters, setFilters] = useState({
    department: "",
    year: "",
  });

  const departments = ["DAE", "DCE", "DCSE", "DEE", "DECE", "DIT", "DME"];
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1970 + 1 },
    (_, i) => 1970 + i
  );

  const loadAlumni = async () => {
    setLoading(true);
    try {
      const data = await filterAlumni(filters.department, filters.year);
      setAlumniList(data);
    } catch (error) {
      console.error("Error fetching alumni:", error);
      setAlumniList([]);
    }
    setLoading(false);
  };

  const handleSearch = () => {
    setSearched(true);
    loadAlumni();
  };

  const handleReset = () => {
    setFilters({ department: "", year: "" });
    setAlumniList([]);
    setSearched(false);
  };

  const handleEdit = (alumni) => {
    setSelectedAlumni(alumni);
    setEditForm({ 
      willingToDonateBlood: alumni.willingToDonateBlood || "No",
      bloodGroup: alumni.bloodGroup || "", 
      willingToProvideServices: alumni.willingToProvideServices || "No",
      serviceArea: alumni.serviceArea || "",
      servicesCanProvide: alumni.servicesCanProvide || ""
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      await updateAlumni(selectedAlumni.id, editForm);
      
      if (editForm.willingToProvideServices === "Yes") {
        await createVolunteer({
          name: selectedAlumni.name,
          service: editForm.serviceArea,
          mobile1: selectedAlumni.mobile,
          mobile2: selectedAlumni.mobile2 || "",
          email: selectedAlumni.email || selectedAlumni.mobile + "@alumni.com",
          profession: selectedAlumni.profession || "Alumni",
          companyName: selectedAlumni.companyName || "",
          designation: selectedAlumni.designation || "",
          companyDepartment: selectedAlumni.employeeDepartment || "",
          companyPlace: selectedAlumni.employeePlace || "",
          businessName: selectedAlumni.businessName || "",
          natureOfBusiness: selectedAlumni.natureOfBusiness || "",
          businessPlace: selectedAlumni.businessPlace || "",
          businessAddress: selectedAlumni.businessAddress || "",
          permanentAddress: selectedAlumni.permanentAddress || selectedAlumni.city || "Not Provided",
          servicesOffered: editForm.servicesCanProvide || "General Support",
          photoUrl: selectedAlumni.photo || ""
        });
      }
      
      setShowModal(false);
      setSelectedAlumni(null);
      loadAlumni();
    } catch (error) {
      alert("Failed to update alumni");
      console.error(error);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setSelectedAlumni(null);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <div className="max-w-6xl mx-auto bg-white p-6 sm:p-8 rounded-2xl shadow-md border border-gray-200">
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#16a34a] mb-6 text-center">
          Alumni List
        </h2>

        {/* ---------------- FILTER SECTION ---------------- */}

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-6 justify-center items-center">
          {/* Department dropdown */}
          <SearchableDropdown
            placeholder="Select Department"
            options={departments}
            value={filters.department}
            onChange={(value) => setFilters({ ...filters, department: value })}
            className="w-full sm:w-60 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />

          {/* Year dropdown */}
          <SearchableDropdown
            placeholder="Select Year"
            options={years}
            value={filters.year}
            onChange={(value) => setFilters({ ...filters, year: value })}
            className="w-full sm:w-60 px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          />

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full sm:w-auto bg-green-700 text-white px-5 py-2 rounded-md hover:bg-primary-800 transition-all"
          >
            Search
          </button>

          {/* Reset Button */}
          <button
            onClick={handleReset}
            className="w-full sm:w-auto bg-gray-200 hover:bg-gray-300 px-5 py-2 rounded-md transition-all"
          >
            Reset
          </button>
        </div>

        {/* ---------------- RESULTS SECTION ---------------- */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : !searched ? (
          <p className="text-center text-gray-400">Search to see results.</p>
        ) : alumniList.length === 0 ? (
          <p className="text-center text-gray-500">No alumni records found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 rounded-lg">
              <thead className="bg-green-100 text-[#166534]">
                <tr>
                  <th className="py-2 px-4 border">S.No</th>
                  <th className="py-2 px-4 border">Name</th>
                  <th className="py-2 px-4 border">Department</th>
                  <th className="py-2 px-4 border">Passed Out Year</th>
                  <th className="py-2 px-4 border">Mobile</th>
                  <th className="py-2 px-4 border">Current Location</th>
                  <th className="py-2 px-4 border">Actions</th>
                </tr>
              </thead>

              <tbody>
                {alumniList.map((a, index) => (
                  <tr
                    key={a.id}
                    className="text-center hover:bg-green-50 transition"
                  >
                    <td className="py-2 px-4 border">{index + 1}</td>
                    <td className="py-2 px-4 border">{a.name}</td>
                    <td className="py-2 px-4 border">{a.department}</td>
                    <td className="py-2 px-4 border">{a.year}</td>
                    <td className="py-2 px-4 border">{a.mobile}</td>
                    <td className="py-2 px-4 border">{a.city}</td>
                    <td className="py-2 px-4 border">
                      <button
                        onClick={() => handleEdit(a)}
                        className="text-blue-600 hover:text-blue-800"
                        title="Edit"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Edit Alumni Details</h3>
            
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editForm.willingToDonateBlood === "Yes"}
                    onChange={(e) => setEditForm({ ...editForm, willingToDonateBlood: e.target.checked ? "Yes" : "No" })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Are you willing to donate blood in emergency situations?</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Blood Group</label>
                <select
                  value={editForm.bloodGroup}
                  onChange={(e) => setEditForm({ ...editForm, bloodGroup: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={editForm.willingToProvideServices === "Yes"}
                    onChange={(e) => setEditForm({ ...editForm, willingToProvideServices: e.target.checked ? "Yes" : "No" })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium">Are you willing to provide services to friends & alumni?</span>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Service Area</label>
                <select
                  value={editForm.serviceArea}
                  onChange={(e) => setEditForm({ ...editForm, serviceArea: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="">Select Service Area</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Environment">Environment</option>
                  <option value="Women & Child Welfare">Women & Child Welfare</option>
                  <option value="Disaster Relief">Disaster Relief</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">What kind of services can you provide?</label>
                <textarea
                  value={editForm.servicesCanProvide}
                  onChange={(e) => setEditForm({ ...editForm, servicesCanProvide: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md"
                  rows="3"
                  placeholder="E.g., Career guidance, mentorship, technical training..."
                />
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
