import React, { useEffect, useState } from "react";
import { getGallery, getCategories } from "../api/Gallery";
import ImageModal from "../components/common/GalleryModel";
import GalleryCard from "../components/common/GalleryCard";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/)?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};

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
      <h1 className="text-4xl font-bold mb-6 text-primary font-heading">Gallery</h1>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-5 py-2 rounded-full text-sm font-medium border transition
              ${
                activeCategory === cat
                  ? "bg-secondary text-white border-secondary"
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
              className="relative overflow-hidden rounded-xl shadow-md hover:shadow-xl 
                         transition-all duration-300 group"
            >
              {item.isVideo ? (
                <div className="w-full h-64">
                  <iframe
                    src={getYouTubeEmbedUrl(item.imageUrl)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="cursor-pointer" onClick={() => setSelectedImage(item)}>
                  <img
                    src={item.imageUrl}
                    alt={item?.title || ""}
                    className="w-full h-64 object-cover transition-transform duration-500 
                               group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 bg-black/0 group-hover:bg-black/20 
                                 transition-all duration-300 ease-out"
                  />
                </div>
              )}

              {/* Title - Bottom Left */}
              <div
                className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent"
              >
                <div className="text-left">
                  <h3 className="text-white font-semibold text-lg drop-shadow-lg font-heading">
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







