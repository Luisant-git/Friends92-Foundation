import React, { useState, useEffect, useRef } from "react";
import { Plus, Trash2, X } from "lucide-react";
import { toast } from "react-toastify";
import {
  createCategory,
  deleteCategory,
  getCategories,
} from "../../api/Gallery";

export default function CategoryDropdown({ value, onChange }) {
  const [categories, setCategories] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const dropdownRef = useRef();

  useEffect(() => {
    loadCategories();
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      toast.error("Failed to load categories");
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return; // <-- no toast here
    try {
      const created = await createCategory({ name: newCategory });
      setCategories([...categories, created]);
      onChange(created); // automatically select new category
      setNewCategory("");
      setShowModal(false);
      toast.success("Category added"); // only success toast
    } catch {
      toast.error("Failed to add category");
    }
  };

  const handleDelete = async (cat) => {
    if (!window.confirm("Delete this category?")) return;
    try {
      await deleteCategory(cat.id);
      setCategories(categories.filter((c) => c.id !== cat.id));
      if (value?.id === cat.id) onChange(null);
      toast.success("Category deleted");
    } catch {
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div
        className="flex items-center border border-gray-300 rounded-xl h-12 p-2 bg-white cursor-pointer"
        onClick={() => setShowDropdown((prev) => !prev)}
      >
        <span className="flex-1 text-gray-700">
          {value ? value.name : "Select category"}
        </span>
        <Plus
          size={18}
          className="text-secondary hover:text-secondary"
          onClick={(e) => {
            e.stopPropagation();
            setShowModal(true);
          }}
        />
      </div>

      {/* Dropdown List */}
      {showDropdown && (
        <ul className="absolute z-10 bg-white border rounded shadow mt-1 max-h-60 overflow-y-auto w-full">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="flex justify-between items-center p-2 hover:bg-gray-100 cursor-pointer"
            >
              <span
                onClick={() => {
                  onChange(cat);
                  setShowDropdown(false);
                }}
                className={`flex-1 ${
                  value?.id === cat.id ? "font-semibold text-secondary" : ""
                }`}
              >
                {cat.name}
              </span>
              <Trash2
                size={16}
                className="text-red-600 hover:text-red-800"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(cat);
                }}
              />
            </li>
          ))}
          {categories.length === 0 && (
            <li className="p-2 text-gray-500">No categories found</li>
          )}
        </ul>
      )}

      {/* Modal for Adding Category */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-20">
          <div className="bg-white p-6 rounded-xl w-96 relative">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
              onClick={() => setShowModal(false)}
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-4 font-heading">Add New Category</h2>
            <input
              type="text"
              placeholder="Category name"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="w-full h-12 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-secondary mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-secondary hover:bg-secondary text-white px-4 py-2 rounded"
                onClick={handleAddCategory}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}






