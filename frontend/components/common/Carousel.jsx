import React, { useRef, useEffect, useState } from "react";
import GalleryCard from "./GalleryCard";
import ImageModal from "./GalleryModel";

export default function CenterFocusCarousel({ images }) {
  const trackRef = useRef(null);
  const pos = useRef(0);
  const animationRef = useRef(null);
  const [hovering, setHovering] = useState(false);
  const [selected, setSelected] = useState(null);

  const speed = 0.5;
  const doubledImages = [...images, ...images];

  const applyTransform = () => {
    if (!trackRef.current) return;

    const items = Array.from(trackRef.current.children);
    const center = trackRef.current.offsetWidth / 2;

    items.forEach((child) => {
      const rect = child.getBoundingClientRect();
      const childCenter = rect.left + rect.width / 2;
      const distance = Math.abs(center - childCenter);
      const maxDistance = center;

      // scale effect
      const scale = Math.max(0.85, 1.2 - (distance / maxDistance) * 0.35);
      child.style.transform = `scale(${scale})`;
      child.style.transition = "transform 0.25s ease-out";

      // ⭐ ONLY small shadow — no border, no rounded corner added
      child.style.boxShadow = "0 8px 18px rgba(0,0,0,0.18)";
    });

    trackRef.current.style.transform = `translateX(${pos.current}px)`;
  };

  useEffect(() => {
    const loop = () => {
      if (!hovering && trackRef.current) {
        const trackWidth = trackRef.current.scrollWidth / 2;
        pos.current -= speed;

        if (Math.abs(pos.current) >= trackWidth) pos.current = 0;

        applyTransform();
      }
      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(animationRef.current);
  }, [hovering]);

  return (
    <div
      className="relative w-full overflow-hidden py-6"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <div ref={trackRef} className="flex items-center gap-6 cursor-pointer">
        {doubledImages.map((img) => (
          <div
            key={img.id + Math.random()}
            className="flex-shrink-0 transition-all duration-300"
            onClick={() => setSelected(img)}
          >
            <GalleryCard image={img} />
          </div>
        ))}
      </div>

      {selected && (
        <ImageModal image={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
