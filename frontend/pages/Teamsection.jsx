import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const teamMembers = [
  {
    name: "Dr. Evelyn Reed",
    title: "President & Vice-Chancellor",
    image: "https://picsum.photos/seed/team1/300",
  },
  {
    name: "Prof. Samuel Chen",
    title: "Provost & Academic Head",
    image: "https://picsum.photos/seed/team2/300",
  },
  {
    name: "Dr. Alisha Khan",
    title: "Dean of Engineering",
    image: "https://picsum.photos/seed/team3/300",
  },
  {
    name: "Mr. David Lee",
    title: "Dean of Arts & Sciences",
    image: "https://picsum.photos/seed/team4/300",
  },
  {
    name: "Dr. Evelyn Reed",
    title: "President & Vice-Chancellor",
    image: "https://picsum.photos/seed/team1/300",
  },
  {
    name: "Prof. Samuel Chen",
    title: "Provost & Academic Head",
    image: "https://picsum.photos/seed/team2/300",
  },
];

const TeamSection = () => {
  const [index, setIndex] = useState(0);
  const ITEMS_VISIBLE = 5;

  const prevSlide = () => {
    setIndex((prev) =>
      prev <= 0 ? teamMembers.length - ITEMS_VISIBLE : prev - 1
    );
  };

  const nextSlide = () => {
    setIndex((prev) =>
      prev >= teamMembers.length - ITEMS_VISIBLE ? 0 : prev + 1
    );
  };

  return (
    <section className="py-16 sm:py-24 bg-white relative">
      {/* Heading */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-brand-dark sm:text-4xl">
          Our Honourable Team Members
        </h2>
        <p className="mt-4 text-lg max-w-2xl mx-auto text-slate-600">
          Meet the dedicated leaders shaping the future.
        </p>
      </div>

      {/* MOBILE VIEW – Slider with Prev/Next + Clickable Dots */}
      <div className="sm:hidden mt-10 px-6 relative">
        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500"
            style={{
              transform: `translateX(-${index * 100}%)`,
            }}
          >
            {teamMembers.map((member, i) => (
              <div key={i} className="min-w-full text-center">
                <div className="w-32 h-32 mx-auto">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full w-full h-full object-cover shadow-lg"
                  />
                </div>

                <h3 className="mt-4 text-lg font-semibold text-brand-dark">
                  {member.name}
                </h3>

                <p className="text-brand-accent text-sm font-medium">
                  {member.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Prev Button */}
        <button
          onClick={() =>
            setIndex(index === 0 ? teamMembers.length - 1 : index - 1)
          }
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Next Button */}
        <button
          onClick={() =>
            setIndex(index === teamMembers.length - 1 ? 0 : index + 1)
          }
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Indicators – Click to jump to slide */}
        <div className="flex justify-center mt-4 space-x-2">
          {teamMembers.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                i === index ? "bg-[#16a34a] scale-125" : "bg-gray-300"
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* DESKTOP/TABLET CAROUSEL */}
      <div className="hidden sm:block relative mt-10">
        {/* Left Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-[50%] -translate-y-1/2 
            bg-white shadow-lg p-3 rounded-full hover:scale-110 transition z-10"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Right Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-[50%] -translate-y-1/2 
            bg-white shadow-lg p-3 rounded-full hover:scale-110 transition z-10"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slider */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 gap-8 px-6"
            style={{
              transform: `translateX(-${index * (100 / ITEMS_VISIBLE)}%)`,
              width: `${(teamMembers.length / ITEMS_VISIBLE) * 100}%`,
            }}
          >
            {teamMembers.map((member, i) => (
              <div
                key={i}
                className="w-1/5 text-center flex flex-col items-center"
              >
                <div className="w-40 h-40 mx-auto">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="rounded-full w-full h-full object-cover shadow-lg"
                  />
                </div>

                <h3 className="mt-3 text-lg font-semibold text-brand-dark">
                  {member.name}
                </h3>

                <p className="text-brand-accent text-sm font-medium">
                  {member.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
