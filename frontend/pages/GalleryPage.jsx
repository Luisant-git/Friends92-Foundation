import React, { useEffect, useState } from "react";
import { getGallery } from "../api/Gallery";

export default function GalleryPage() {
  const categories = [
    "All",
    "Alumini Meet",
    "Charitable Trust",
    "Sports",
    "Workshop",
  ];

  const [gallery, setGallery] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const data = await getGallery();
        setGallery(data);
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const filteredGallery =
    activeCategory === "All"
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto p-6 text-center">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-6">Gallery</h1>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition
              ${
                activeCategory === cat
                  ? "bg-green-600 text-white border-green-600"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-100"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <p>Loading gallery...</p>
      ) : filteredGallery.length === 0 ? (
        <p>No items found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="relative rounded-xl shadow-lg overflow-hidden group cursor-pointer
                         w-full h-[230px] bg-gray-200"
            >
              {/* Image */}
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-full object-cover transition duration-500 
                           group-hover:scale-110 group-hover:brightness-75"
              />

              {/* Hover Title Overlay */}
              <div
                className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent 
                              opacity-0 group-hover:opacity-100 transition-all duration-500"
              >
                <p className="text-white text-base font-semibold">
                  {item.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
