import React, { useState, useRef, useEffect } from "react";

export default function SearchableDropdown({
  label,
  icon: Icon,
  options,
  value,
  onChange,
  placeholder,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={wrapperRef}>
      {/* Optional icon */}
      {Icon && <Icon className="absolute left-3 top-3 text-gray-400 w-5 h-5" />}

      <input
        type="text"
        placeholder={placeholder}
        value={search || value}
        onChange={(e) => setSearch(e.target.value)}
        onFocus={() => {
          setOpen(true);
          setSearch("");
        }}
        onMouseDown={(e) => e.stopPropagation()} // Prevent auto close
        className="
          w-full pl-10 pr-3 py-3
          border-2 border-black
          text-black font-normal
          placeholder-black placeholder-opacity-70
          rounded-lg
          focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500
          transition-all duration-300 ease-in-out
        "
      />

      {/* Dropdown options */}
      {open && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-40 overflow-y-auto z-50 mt-1">
          {options.filter((o) =>
            o.toString().toLowerCase().includes(search.toLowerCase())
          ).length === 0 && (
            <p className="p-2 px-4 text-gray-500 text-sm">No results found</p>
          )}

          {options
            .filter((o) =>
              o.toString().toLowerCase().includes(search.toLowerCase())
            )
            .map((opt, i) => (
              <p
                key={i}
                onMouseDown={() => {
                  onChange(opt);
                  setOpen(false);
                  setSearch("");
                }}
                className="p-2 px-4 cursor-pointer hover:bg-gray-100 text-sm"
              >
                {opt}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
