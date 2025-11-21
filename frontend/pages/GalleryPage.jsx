import React, { useEffect, useState } from "react";
import { getGallery, getCategories } from "../api/Gallery";
import ImageModal from "../components/common/GalleryModel";
import GalleryCard from "../components/common/GalleryCard";

export default function GalleryPage() {
  const [categories, setCategories] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [galleryData, categoriesData] = await Promise.all([
          getGallery(),
          getCategories(),
        ]);

        setGallery(galleryData);

        // Add "All" as the first category
        const categoryNames = ["All", ...categoriesData.map((c) => c.name)];
        setCategories(categoryNames);
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Filter gallery based on active category
  const filteredGallery =
    activeCategory === "All"
      ? gallery
      : gallery.filter((item) => item.category?.name === activeCategory);

  return (
    <div className="max-w-7xl mx-auto p-6 text-center">
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
              className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl 
                         transition-all duration-300 cursor-pointer group"
              onClick={() => setSelectedImage(item)}
            >
              {/* Image */}
              <img
                src={
                  item?.src ||
                  item?.url ||
                  item?.image ||
                  item?.imageUrl ||
                  item?.image_url ||
                  item?.img ||
                  ""
                }
                alt={item?.title || ""}
                className="w-full h-64 object-cover transition-transform duration-500 
                           group-hover:scale-105"
              />

              {/* Light Dark Overlay */}
              <div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20 
                             transition-all duration-300 ease-out"
              />

              {/* Title - Bottom Left */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4 
                             transform translate-y-full group-hover:translate-y-0 
                             transition-transform duration-300 ease-out"
              >
                <div className="text-left">
                  <h3 className="text-white font-semibold text-lg drop-shadow-lg">
                    {item?.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          onClose={() => setSelectedImage(null)}
        />
      )}
    </div>
  );
}
