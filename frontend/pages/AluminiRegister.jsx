import React, { useState } from "react";
import { X, User, Phone, MapPin, GraduationCap, Calendar } from "lucide-react";
import { createAlumni } from "../api/Alumini";
import SearchableDropdown from "../components/SearchableDropdown";
import toast from "react-hot-toast";

export default function AlumniRegister({ isOpen, onClose }) {
  const [form, setForm] = useState({
    name: "",
    department: "",
    year: "",
    mobile: "",
    city: "",
  });

  const [errors, setErrors] = useState({ mobile: "" });

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1970 + 1 },
    (_, i) => 1970 + i
  );
  const departments = ["DAE", "DCE", "DCSE", "DEE", "DECE", "DIT", "DME"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(form.mobile)) {
      setErrors({ mobile: "Mobile number must be exactly 10 digits" });
      toast.error("Mobile number must be exactly 10 digits.");
      return;
    }

    try {
      const res = await createAlumni({ ...form, year: Number(form.year) });

      if (res?.success === false) {
        toast.error(res.message || "Registration failed");
        return;
      }

      toast.success("Registered Successfully!");

      onClose();
      window.dispatchEvent(new Event("alumniListUpdated"));
      setForm({ name: "", department: "", year: "", mobile: "", city: "" });
    } catch (err) {
      toast.error("Registration Failed!");
      console.error(err);
    }
  };

  if (!isOpen) return null;

  // Common input classes
  const inputClass = `
    w-full pl-10 pr-3 py-3
    border-2 border-black
    text-black font-normal
    placeholder-black placeholder-opacity-70
    rounded-lg
    focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
    transition-all duration-300 ease-in-out
  `;

  return (
    <div className="fixed inset-0 flex items-start md:items-center justify-center bg-black/40 backdrop-blur-sm z-50 p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl p-6 sm:p-8 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#16a34a] text-center mb-6">
          Alumni Registration
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <User className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className={inputClass}
            />
          </div>

          {/* Department Dropdown */}
          <SearchableDropdown
            icon={GraduationCap}
            placeholder="Select Department"
            options={departments}
            value={form.department}
            onChange={(value) => setForm({ ...form, department: value })}
          />

          {/* Year Dropdown */}
          <SearchableDropdown
            icon={Calendar}
            placeholder="Select Year"
            options={years}
            value={form.year}
            onChange={(value) => setForm({ ...form, year: value })}
          />

          {/* Mobile */}
          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="tel"
              placeholder="Mobile Number"
              value={form.mobile}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              required
              className={`${inputClass} ${
                errors.mobile ? "border-red-500" : ""
              }`}
            />
            {errors.mobile && (
              <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>
            )}
          </div>

          {/* City */}
          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Current Location"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
              className={inputClass}
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#16a34a] text-white py-3 rounded-lg font-semibold hover:bg-[#15803d] transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}
