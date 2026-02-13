import React, { useState, useEffect } from "react";
import { getBanners } from "../api/Banner";
import { CTAButtonGroup } from "../components/common/CTAButtons";
import StatsBar from "../components/home/StatsBar";
import FocusAreas from "../components/home/FocusAreas";
import LatestEvents from "../components/home/LatestEvents";
import AboutIntro from "../components/home/AboutIntro";
import SuccessStories from "../components/home/SuccessStories";
import GalleryPreview from "../components/home/GalleryPreview";
import DonateCTA from "../components/home/DonateCTA";
import DonationSection from "../components/home/DonationSection";
import VolunteerSection from "../components/home/VolunteerSection";

const HomePage = () => {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const data = await getBanners();
        setBanners(data);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [banners.length]);



  return (
    <div className="animate-fadeIn">
      {/* 2. Hero Section (Full-width Banner) */}
      <section className="relative h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[80vh] text-white overflow-hidden z-0">
        {!isLoading && banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* MOBILE — cover to fill */}
            <img
              src={banner.imageUrl}
              alt="banner"
              loading="eager"
              className="sm:hidden w-full h-full object-cover pointer-events-none"
            />

            {/* DESKTOP — cover */}
            <img
              src={banner.imageUrl}
              alt="banner"
              loading="eager"
              className="hidden sm:block w-full h-full object-cover pointer-events-none"
            />

            {/* DARK OVERLAY for text visibility */}
            <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>
          </div>
        ))}

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <div className="text-center px-4 max-w-5xl">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] font-heading">
              Empowering Communities, Transforming Lives
            </h1>
            <p className="text-sm sm:text-base md:text-xl mb-6 sm:mb-8 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-body">
              Alumni united for education, health, environment, and social welfare
            </p>
            <CTAButtonGroup size="lg" className="justify-center" />
          </div>
        </div>

        {/* Indicators */}
        <div className="absolute bottom-4 w-full flex justify-center z-20">
          <div className="flex space-x-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? "bg-white" : "bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. Quick Impact Numbers (Stats Bar) */}
      <StatsBar />

      {/* 4. Focus Areas (Highlight Tiles / Cards) */}
      <FocusAreas />

      {/* 5. Latest News & Events */}
      <LatestEvents />

      {/* 6. About Us (Short Intro Block) */}
      <AboutIntro />

      {/* 7. Success Stories (Impact Showcase) */}
      <SuccessStories />

      {/* 8. Gallery Preview */}
      <GalleryPreview />

      {/* 9. Donation Section */}
      <DonationSection />

      {/* 10. Volunteer Section */}
      <VolunteerSection />
    </div>
  );
};

export default HomePage;






