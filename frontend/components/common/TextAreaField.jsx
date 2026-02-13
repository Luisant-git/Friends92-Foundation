import React from "react";

export default function TextAreaField({ label, placeholder, value, onChange }) {
  return (
    <label className="block mb-4">
      <span className="text-gray-700 font-semibold">{label}</span>
      <textarea
        className="mt-1 w-full border border-gray-300 rounded-xl p-3 h-28 resize-none
                   focus:ring-2 focus:ring-[#16a34a] focus:outline-none"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </label>
  );
}






