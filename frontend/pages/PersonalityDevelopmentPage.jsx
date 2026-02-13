import React, { useState, useEffect } from 'react';
import { Users, ArrowRight, Heart, Star, Trophy } from 'lucide-react';
import { getServices } from '../api/Services';

const PersonalityDevelopmentPage = () => {
  const [personalityServices, setPersonalityServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPersonalityServices();
  }, []);

  const fetchPersonalityServices = async () => {
    try {
      const data = await getServices();
      setPersonalityServices(data.filter(s => s.type === 'PERSONALITY_DEVELOPMENT'));
    } catch (err) {
      console.error('Error fetching personality services:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-body">Loading personality development programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 font-heading">Personality & Behavioral Development</h1>
          <p className="text-xl text-white/90 font-body">Build confidence, leadership skills, and professional etiquette</p>
        </div>
      </section>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-heading">Emotional Intelligence</h3>
              <p className="text-gray-600 font-body">Develop self-awareness and emotional regulation for better relationships</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-heading">Leadership Skills</h3>
              <p className="text-gray-600 font-body">Learn to inspire, motivate, and lead teams effectively</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-heading">Professional Excellence</h3>
              <p className="text-gray-600 font-body">Master communication, etiquette, and workplace dynamics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Programs */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-heading">Development Programs</h2>
          
          {personalityServices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {personalityServices.map((service) => (
                <div key={service.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {service.imageUrl ? (
                    <img 
                      src={service.imageUrl} 
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                      <Users className="w-16 h-16 text-purple-500" />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 font-heading">{service.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed font-body">{service.description}</p>
                    {service.content && (
                      <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg mb-4 font-body">{service.content}</p>
                    )}
                    <button className="flex items-center text-purple-600 font-medium hover:text-purple-700 transition-colors group">
                      Join Program
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Users className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-4 font-heading">No Programs Available</h3>
              <p className="text-gray-500 font-body">We're developing new personality development programs. Stay tuned!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalityDevelopmentPage;






