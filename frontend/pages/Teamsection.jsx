import React, { useState, useEffect } from "react";
import { getTrust } from "../api/Trust.js";

const TeamSection = () => {
  const [trustLogos, setTrustLogos] = useState([]);

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

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 font-heading">Our Trusted Partners</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-body">Organizations that trust and support us.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
          {trustLogos.map((partner, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md flex flex-col items-center justify-center hover:shadow-xl transition">
              <img src={partner.imageUrl} alt={partner.name} className="w-32 h-32 rounded-full object-cover mb-4" />
              <h3 className="text-lg font-semibold text-gray-800 text-center font-heading">{partner.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;







