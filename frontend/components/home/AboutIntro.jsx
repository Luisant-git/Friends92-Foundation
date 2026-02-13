import React from "react";
import { Link } from "react-router-dom";

const AboutIntro = () => {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 font-heading">About GPTCK 92 Trust</h2>
        <p className="text-lg mb-4 leading-relaxed font-body">
          Founded by the alumni of Government Polytechnic Tiruchirapalli Class of 1992, 
          our trust is dedicated to giving back to society through education, healthcare, 
          environmental conservation, and community empowerment.
        </p>
        <p className="text-lg mb-8 leading-relaxed font-body">
          Our vision is to create sustainable change by empowering communities and transforming lives 
          through collaborative efforts and dedicated service.
        </p>
        <Link 
          to="/about" 
          className="inline-block bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
        >
          Read More About Us
        </Link>
      </div>
    </section>
  );
};

export default AboutIntro;





