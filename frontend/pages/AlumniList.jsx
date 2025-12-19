import React, { useState } from "react";
import { filterAlumni } from "../api/Alumini";
import SearchableDropdown from "../components/SearchableDropdown"; // ⭐ IMPORT

export default function ViewAlumni() {
  const [alumniList, setAlumniList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
