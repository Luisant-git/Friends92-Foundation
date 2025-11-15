import React, { useState, useEffect } from "react";
import { getBanners } from "../api/Banner";
import { Briefcase, Users, ClipboardList, Cpu } from "lucide-react";
import Objective from "./Objective";
import TeamSection from "./Teamsection";
import Carousel from "../components/common/Carousel";



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
  },
  {
    icon: <Users className="w-10 h-10 text-primary" />,
    title: "Alumnis",
  },
  {
    icon: <ClipboardList className="w-10 h-10 text-primary" />,
    title: "Services",
  },
  {
    icon: <Cpu className="w-10 h-10 text-primary" />,
    title: "Projects",
  },
];

const images = [
  {
    id: 1,
    src: "https://picsum.photos/400/300?random=10",
    title: "Career Development Center",
  },
  {
    id: 2,
    src: "https://picsum.photos/400/300?random=11",
    title: "Academic Advising",
  },
  {
    id: 3,
    src: "https://picsum.photos/400/300?random=12",
    title: "Research & Innovation Support",
  },
  {
    id: 4,
    src: "https://picsum.photos/400/300?random=13",
    title: "Student Wellness Helpline",
  },
  {
    id: 5,
    src: "https://picsum.photos/400/300?random=14",
    title: "Skill Development Workshops",
  },
];


  const ServiceCard = ({ icon, title }) => (
    <div className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col items-center justify-center text-center">
      <div className="h-12 w-12 text-[#16a34a] mb-4">{icon}</div>
      <h3 className="text-lg font-bold text-brand-dark">{title}</h3>
    </div>
  );

  return (
    <div className="animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] bg-cover bg-center text-white overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${banner.imageUrl}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        ))}

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
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

            <p className="mt-3 text-lg text-slate-600">
              {" "}
              {/* Reduced margin-top */}
              Explore memorable moments, campus activities, events, and
              achievements at Friends 92 Foundation.
            </p>
          </div>
        </section>

        <Carousel images={images} />
      </div>

      {/* Services Section */}
      <section className="py-16 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl">
              Services
            </h2>
            <p className="mt-4 text-lg max-w-2xl mx-auto text-slate-600">
              We provide comprehensive services to ensure our students
              transition seamlessly from academia to the professional world.
            </p>
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
