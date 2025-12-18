import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getTrust } from "../api/Trust.js";

const TeamSection = () => {
  const [trustLogos, setTrustLogos] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    loadTrust();
  }, []);

  const loadTrust = async () => {
    try {
      const data = await getTrust();
      setTrustLogos(data.filter(item => item.isActive));
    } catch (error) {
      console.error('Failed to load trust:', error);
    }
  };

  const prevSlide = () => {
    setIndex((prev) => (prev <= 0 ? Math.max(0, trustLogos.length - 5) : prev - 1));
  };

  const nextSlide = () => {
    setIndex((prev) => (prev >= Math.max(0, trustLogos.length - 5) ? 0 : prev + 1));
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-2xl font-bold text-brand-dark sm:text-3xl md:text-4xl">
          Our Trusted Partners
        </h2>
        <p className="mt-3 text-base sm:text-lg max-w-2xl mx-auto text-slate-600 px-4">
          Organizations that trust and support us.
        </p>
      </div>

      {/* MOBILE VIEW – Slider with Prev/Next + Clickable Dots */}
      <div className="md:hidden mt-8 px-4 relative">
        {trustLogos.length > 0 && (
          <>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500"
                style={{
                  transform: `translateX(-${index * 100}%)`,
                }}
              >
                {trustLogos.map((logo, i) => (
                  <div key={i} className="min-w-full text-center px-4">
                    <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto">
                      <img
                        src={logo.imageUrl}
                        alt={logo.name}
                        className="rounded-full w-full h-full object-cover shadow-lg"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() =>
                setIndex(index === 0 ? trustLogos.length - 1 : index - 1)
              }
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              onClick={() =>
                setIndex(index === trustLogos.length - 1 ? 0 : index + 1)
              }
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full hover:bg-gray-100 transition"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <div className="flex justify-center mt-6 space-x-2">
              {trustLogos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
                    i === index ? "bg-[#16a34a] scale-125" : "bg-gray-300"
                  }`}
                ></button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* DESKTOP/TABLET VIEW */}
      <div className="hidden md:block relative mt-10 max-w-7xl mx-auto px-20">
        {trustLogos.length > 5 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute -left-6 top-1/2 -translate-y-1/2 
                bg-white shadow-lg p-2 lg:p-3 rounded-full hover:scale-110 transition z-10"
            >
              <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute -right-6 top-1/2 -translate-y-1/2 
                bg-white shadow-lg p-2 lg:p-3 rounded-full hover:scale-110 transition z-10"
            >
              <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6" />
            </button>
          </>
        )}

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 gap-2"
            style={{
              transform: `translateX(-${index * 20}%)`,
            }}
          >
            {trustLogos.map((logo, i) => (
              <div
                key={i}
                className="min-w-[20%] text-center flex flex-col items-center flex-shrink-0"
              >
                <div className="w-36 h-36 mx-auto">
                  <img
                    src={logo.imageUrl}
                    alt={logo.name}
                    className="rounded-full w-full h-full object-cover shadow-lg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
