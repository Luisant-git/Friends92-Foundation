import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGallery } from "../../api/Gallery";

const GalleryPreview = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const data = await getGallery();
        setImages(data.slice(0, 4));
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      }
    }
    fetchGallery();
  }, []);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-heading">Gallery</h2>
          <p className="text-gray-600 font-body">Relive our journey through alumni meets, student felicitation, tree plantations, medical camps and training programmes</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="aspect-square overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <img 
                src={image.imageUrl} 
                alt={image.title || `Gallery ${index + 1}`}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/gallery" className="inline-block bg-secondary text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg font-semibold hover:bg-primary transition">
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default GalleryPreview;






