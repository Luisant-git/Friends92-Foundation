import React, { useRef, useEffect, useState } from "react";
import GalleryCard from "./GalleryCard.jsx";
import ImageModal from "./GalleryModel.jsx";
import { getGalleryLimit } from "../../api/Gallery.js";

const getYouTubeEmbedUrl = (url) => {
  if (!url) return null;
  const videoId = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\s]+)/)?.[1];
  return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
};


export default function Carousel() {
  const trackRef = useRef(null);
  const animationRef = useRef(null);
  const pos = useRef(0);

  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);

  const speed = 0.5;

  // ⭐ FETCH IMAGES DIRECTLY FROM API
  useEffect(() => {
    async function loadData() {
      try {
        const data = await getGalleryLimit();
        setImages(data || []);
        pos.current = 0;
      } catch (err) {
        console.error("Failed to load gallery", err);
      }
    }

    loadData();
  }, []);

  const doubled = [...images, ...images];

  // SCALE + CENTER EFFECT
  const applyTransform = () => {
    if (!trackRef.current) return;

    const items = Array.from(trackRef.current.children);
    const center = window.innerWidth / 2;

    items.forEach((child) => {
      const rect = child.getBoundingClientRect();
      const childCenter = rect.left + rect.width / 2;
      const dist = Math.abs(center - childCenter);
      const maxDist = center;
      const scale = Math.max(0.85, 1.2 - (dist / maxDist) * 0.35);

      const innerCard = child.querySelector('.w-full');
      if (innerCard) {
        innerCard.style.transform = `scale(${scale})`;
        innerCard.style.transition = "transform 0.25s ease-out";
      }
    });

    trackRef.current.style.transform = `translateX(${pos.current}px)`;
    updateCurrentIndex();
  };

  // AUTOSCROLL LOOP
  useEffect(() => {
    if (images.length === 0) return;

    const loop = () => {
      if (!trackRef.current) return;

      const trackWidth = trackRef.current.scrollWidth / 2;
      pos.current -= speed;

      if (Math.abs(pos.current) >= trackWidth) {
        pos.current = 0;
      }

      applyTransform();
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animationRef.current);
  }, [images]);

  // UPDATE CURRENT
  const updateCurrentIndex = () => {
    const track = trackRef.current;
    if (!track) return;

    const centerX = window.innerWidth / 2;
    const items = Array.from(track.children);

    let closestDist = Infinity;
    let closestIdx = 0;

    items.forEach((child, i) => {
      const rect = child.getBoundingClientRect();
      const itemCenter = rect.left + rect.width / 2;
      const dist = Math.abs(centerX - itemCenter);

      if (dist < closestDist) {
        closestDist = dist;
        closestIdx = i % images.length;
      }
    });

    setCurrentIndex(closestIdx);
  };

  // INDICATOR CLICK
  const jumpTo = (i) => {
    const width = 220;
    pos.current = -(i * (width + 24));
    applyTransform();
    setCurrentIndex(i);
  };

  return (
    <div className="relative w-full overflow-hidden py-6 px-6 sm:px-10 lg:px-16">
      {/* Main Carousel */}
      <div className="overflow-hidden">
        <div ref={trackRef} className="flex items-center cursor-pointer gap-4">
          {doubled.map((img, i) => (
            img.isVideo ? (
              <div key={img.id + "-" + i} className="p-3 cursor-pointer bg-transparent flex-shrink-0">
                <div className="w-full h-52 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-transparent">
                  <iframe
                    src={getYouTubeEmbedUrl(img.imageUrl)}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              </div>
            ) : (
              <div key={img.id + "-" + i} className="flex-shrink-0" onClick={() => setSelected(img)}>
                <GalleryCard image={img} />
              </div>
            )
          ))}
        </div>
      </div>

      {/* Indicators */}
      <div className="flex justify-center mt-6 space-x-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => jumpTo(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentIndex === i
                ? "bg-secondary scale-125"
                : "bg-gray-400 opacity-60"
            }`}
          />
        ))}
      </div>

      {/* Modal */}
      {selected && (
        <ImageModal image={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}






