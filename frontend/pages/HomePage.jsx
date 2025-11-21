import React, { useState, useEffect } from "react";
import { getBanners } from "../api/Banner";
import { Briefcase, Users, ClipboardList, Cpu } from "lucide-react";
import Objective from "./Objective";
import TeamSection from "./Teamsection";
import Carousel from "../components/common/Carousel";

import { Link } from "react-router-dom";

const HomePage = () => {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    async function fetchBanners() {
      try {
        const data = await getBanners();
        setBanners(data);
      } catch (error) {
        console.error("Failed to fetch banners:", error);
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

  const services = [
    {
      icon: <Briefcase className="w-10 h-10 text-primary" />,
      title: "Placement Opportunities",
      link: "/placement",
    },
    {
      icon: <Users className="w-10 h-10 text-primary" />,
      title: "Alumnis",
      link: "/alumni/view",
    },
    {
      icon: <ClipboardList className="w-10 h-10 text-primary" />,
      title: "Services",
      link: "/services",
    },
    {
      icon: <Cpu className="w-10 h-10 text-primary" />,
      title: "Projects",
      link: "/projects/live",
    },
  ];

  

  const ServiceCard = ({ icon, title, link }) => (
    <Link
      to={link}
      className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg 
               hover:shadow-2xl transition-all duration-300 transform 
               hover:-translate-y-2 flex flex-col items-center justify-center 
               text-center cursor-pointer"
    >
      <div className="h-12 w-12 text-[#16a34a] mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
    </Link>
  );

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}

      <section
        className="relative 
  h-[45vh] sm:h-[55vh] md:h-[65vh] lg:h-[80vh]
  text-white overflow-hidden"
      >
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* ⭐ MOBILE — full image, NO CROP */}
            <img
              src={banner.imageUrl}
              alt="banner"
              className="sm:hidden w-full h-full object-contain bg-[#f5f5f5] pointer-events-none"
            />

            {/* ⭐ DESKTOP — cover */}
            <img
              src={banner.imageUrl}
              alt="banner"
              className="hidden sm:block w-full h-full object-cover pointer-events-none"
            />

            {/* ⭐ DARK LAYOUT (but soft) → for indicators visibility */}
            <div className="absolute inset-0 bg-black/30 pointer-events-none"></div>
            {/* ↑ You can change bg-black/30 → bg-black/40 to make darker */}
          </div>
        ))}

        {/* ⭐ INDICATORS — visible in dark layout */}
        <div className="absolute bottom-4 w-full flex justify-center z-30">
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

      {/* Objective Section */}

      <Objective />

      {/* Gallery carosole */}
      <div className="mt-6">
        <section className="py-8 bg-white">
          {" "}
          {/* Reduced from py-16 to py-8 */}
          <div className="max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-dark">
              Gallery
            </h2>
          </div>
        </section>

        <Carousel />
      </div>

      {/* Services Section */}
      <section className="py-16 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              Services
            </h2>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))}
          </div>
        </div>
      </section>

      {/* TeamSection */}
      <TeamSection />
    </div>
  );
};

export default HomePage;
