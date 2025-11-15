import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function ImageModal({ image, onClose }) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/50 backdrop-blur-sm animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl p-6
                   max-w-4xl w-[90%] border border-gray-200 animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-white rounded-full p-2 
                     shadow hover:bg-gray-100 transition"
        >
          <X className="w-5 h-5 text-gray-700" />
        </button>

        {/* Image */}
        <img
          src={image.src}
          alt={image.title}
          className="w-full max-h-[80vh] object-contain rounded-xl shadow-md"
        />

        {/* Title */}
        <h2 className="mt-4 text-center text-lg font-semibold text-gray-800">
          {image.title}
        </h2>
      </div>

      <style>{`
        @keyframes scaleIn {
          0% { transform: scale(0.9); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
        .animate-fadeIn { animation: fadeIn 0.25s ease-out; }
      `}</style>
    </div>
  );
}
