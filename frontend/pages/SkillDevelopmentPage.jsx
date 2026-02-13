import React, { useState, useEffect } from 'react';
import { Target, ArrowRight, BookOpen, Code, Lightbulb } from 'lucide-react';
import { getServices } from '../api/Services';

const SkillDevelopmentPage = () => {
  const [skillServices, setSkillServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSkillServices();
  }, []);

  const fetchSkillServices = async () => {
    try {
      const data = await getServices();
      setSkillServices(data.filter(s => s.type === 'SKILL_DEVELOPMENT'));
    } catch (err) {
      console.error('Error fetching skill services:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-body">Loading skill development programs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 font-heading">Skill Development Programs</h1>
          <p className="text-xl text-white/90 font-body">Master cutting-edge technologies and enhance your technical expertise</p>
        </div>
      </section>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-heading">Technical Excellence</h3>
              <p className="text-gray-600 font-body">Learn from industry experts and gain hands-on experience with latest technologies</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-heading">Comprehensive Curriculum</h3>
              <p className="text-gray-600 font-body">Structured learning paths covering fundamentals to advanced concepts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lightbulb className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 font-heading">Innovation Focus</h3>
              <p className="text-gray-600 font-body">Develop creative problem-solving skills and innovative thinking</p>
            </div>
          </div>
        </div>
      </div>

      {/* Programs */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-heading">Available Programs</h2>
          
          {skillServices.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skillServices.map((service) => (
                <div key={service.id} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  {service.imageUrl ? (
                    <img 
                      src={service.imageUrl} 
                      alt={service.title}
                      className="w-full h-48 object-cover"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-primary/10 to-indigo-100 flex items-center justify-center">
                      <Target className="w-16 h-16 text-primary" />
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-3 font-heading">{service.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed font-body">{service.description}</p>
                    {service.content && (
                      <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg mb-4 font-body">{service.content}</p>
                    )}
                    <button className="flex items-center text-primary font-medium hover:text-primary transition-colors group">
                      Enroll Now
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <Target className="w-24 h-24 text-gray-300 mx-auto mb-6" />
              <h3 className="text-2xl font-semibold text-gray-600 mb-4 font-heading">No Programs Available</h3>
              <p className="text-gray-500 font-body">We're working on exciting new skill development programs. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SkillDevelopmentPage;






