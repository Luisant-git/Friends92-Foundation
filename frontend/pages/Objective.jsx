import React from "react";

const Objective = () => {
  const heading = "Objective";
  const paragraphText =
    "To cultivate a vibrant learning community where students can achieve their full potential. We are dedicated to providing a transformative educational experience that fosters critical thinking, creativity, and a commitment to lifelong learning. Our goal is to prepare students to become leaders and innovators in their chosen fields, equipped to navigate the complexities of a global society and contribute meaningfully to the world.";
  const imageUrl = "https://picsum.photos/id/24/800/1000";

  return (
    <section className="bg-white rounded-3xl shadow-sm overflow-hidden">
      <div className="container mx-auto px-6 sm:px-10 py-16 lg:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image Column */}
          <div className="wow animate__animated animate__fadeInLeft">
            <div className="relative group overflow-hidden rounded-2xl shadow-xl transform hover:-translate-y-2 transition-transform duration-500 ease-in-out">
              <img
                src={imageUrl}
                alt="Our objective illustration"
                className="w-full h-auto object-cover aspect-square transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-75 group-hover:opacity-50 transition-opacity duration-300"></div>
            </div>
          </div>

          {/* Text Column */}
          <div className="wow animate__animated animate__fadeInRight">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-800 mb-6 tracking-tight">
              {heading}
            </h2>
            <div className="w-24 h-1.5 bg-green-500 rounded-full mb-8"></div>
            <p className="text-lg text-slate-600 leading-relaxed">
              {paragraphText}
            </p>
            <button className="mt-10 inline-flex items-center px-8 py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-300 transform hover:scale-105">
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Objective;
