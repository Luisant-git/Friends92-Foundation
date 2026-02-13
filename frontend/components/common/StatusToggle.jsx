import React from "react";

export default function StatusToggle({
  label = "Status",
  value = true,
  onChange,
}) {
  return (
    <label className="block mb-4 flex items-center gap-3">
      <span className="text-gray-700 font-semibold">{label}</span>

      <label className="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={value} // controlled by value
          onChange={(e) => onChange(e.target.checked)}
        />
        <div
          className={`w-12 h-6 rounded-full transition-all relative
            ${value ? "bg-secondary" : "bg-gray-300"}
            peer-focus:ring-2 peer-focus:ring-secondary`}
        >
          <div
            className={`absolute top-[3px] left-[3px] w-5 h-5 bg-white rounded-full transition-all
              ${value ? "translate-x-6" : "translate-x-0"}`}
          ></div>
        </div>
      </label>

      <span
        className={`ml-2 font-medium ${
          value ? "text-secondary" : "text-red-600"
        }`}
      >
        {value ? "Active" : "Inactive"}
      </span>
    </label>
  );
}






