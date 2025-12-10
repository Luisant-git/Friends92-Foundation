import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Users, Target, Briefcase, Award, MapPin, Mail, Clock, ArrowRight } from 'lucide-react';
import { getServices } from '../api/Services';
import { getPlacements } from '../api/Placement';

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [skillServices, setSkillServices] = useState([]);
  const [personalityServices, setPersonalityServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [servicesData, placementsData] = await Promise.all([
        getServices(),
        getPlacements()
      ]);
      
      setServices(servicesData);
      setPlacements(placementsData.filter(p => p.status));
      setSkillServices(servicesData.filter(s => s.type === 'SKILL_DEVELOPMENT'));
      setPersonalityServices(servicesData.filter(s => s.type === 'PERSONALITY_DEVELOPMENT'));
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  };

  const ServiceCard = ({ service }) => (
    <div className="group w-96 flex-shrink-0 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 mx-3 border border-gray-200">
      <div className="relative overflow-hidden rounded-xl mb-6">
        {service.imageUrl ? (
          <img 
            src={service.imageUrl} 
            alt={service.title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
            <Target className="w-16 h-16 text-blue-500" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
          {service.title}
        </h3>
        <p className="text-gray-600 leading-relaxed">{service.description}</p>
        {service.content && (
          <p className="text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">{service.content}</p>
        )}
        <button className="flex items-center text-blue-600 font-medium hover:text-blue-700 transition-colors group/btn">
          Learn More 
          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );

  const PlacementCard = ({ placement }) => (
    <div className="group w-96 flex-shrink-0 bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-6 mx-3 border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
            <Briefcase className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800 group-hover:text-green-600 transition-colors">
              {placement.companyName}
            </h3>
            <p className="text-sm text-gray-500">{placement.companyLocation}</p>
          </div>
        </div>
        <div className="flex flex-col items-end space-y-1">
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium flex items-center">
            <Clock className="w-3 h-3 mr-1" />
            {placement.experience} yrs
          </span>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-blue-600 mb-2">{placement.jobTitle}</h4>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">{placement.jobDescription}</p>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2 text-gray-400" />
            {placement.jobLocation}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Mail className="w-4 h-4 mr-2 text-gray-400" />
            {placement.companyEmail}
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-xs font-medium text-gray-700 uppercase tracking-wide">Required Skills</p>
          <div className="flex flex-wrap gap-1">
            {placement.skills.slice(0, 4).map((skill, idx) => (
              <span key={idx} className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium border border-blue-200">
                {skill}
              </span>
            ))}
            {placement.skills.length > 4 && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                +{placement.skills.length - 4} more
              </span>
            )}
          </div>
        </div>
        
        <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-4 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 transform hover:scale-105">
          Apply Now
        </button>
      </div>
    </div>
  );

  const ScrollableSection = ({ title, subtitle, items, renderCard, bgColor, icon: Icon }) => {
    const scrollContainer = React.useRef(null);

    const scroll = (direction) => {
      if (scrollContainer.current) {
        const scrollAmount = 350;
        scrollContainer.current.scrollBy({
          left: direction === 'left' ? -scrollAmount : scrollAmount,
          behavior: 'smooth'
        });
      }
    };

    return (
      <section className={`py-12 ${bgColor}`}>
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">{title}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
          </div>
          
          <div className="flex justify-end mb-6">
            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 bg-white rounded-lg shadow hover:shadow-md transition border border-gray-200"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          {items.length > 0 ? (
            <div 
              ref={scrollContainer}
              className="flex overflow-x-auto scrollbar-hide pb-6 gap-0"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {items.map((item, index) => (
                <div key={item.id || index} className="animate-fadeIn flex-shrink-0" style={{ animationDelay: `${index * 100}ms` }}>
                  {renderCard(item)}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Icon className="w-16 h-16 mx-auto" />
              </div>
              <h3 className="text-xl font-medium text-gray-600 mb-2">No {title.toLowerCase()} available</h3>
              <p className="text-gray-500">Check back later for new content.</p>
            </div>
          )}
        </div>
      </section>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading our services...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-slate-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-blue-100">Empowering futures through comprehensive development programs</p>
        </div>
      </section>

      {/* Services Sections */}
      <ScrollableSection
        title="Skill Development Programs"
        subtitle="Master new technologies and enhance your technical expertise with our comprehensive skill development courses"
        items={skillServices}
        renderCard={(service) => <ServiceCard service={service} />}
        bgColor="bg-gradient-to-br from-blue-50 to-indigo-100"
        icon={Target}
      />

      <ScrollableSection
        title="Career Placement Opportunities"
        subtitle="Connect with top employers and find your dream job through our extensive placement network"
        items={placements}
        renderCard={(placement) => <PlacementCard placement={placement} />}
        bgColor="bg-gradient-to-br from-green-50 to-emerald-100"
        icon={Briefcase}
      />

      <ScrollableSection
        title="Personality & Behavioral Development"
        subtitle="Build confidence, leadership skills, and professional etiquette to excel in your career"
        items={personalityServices}
        renderCard={(service) => <ServiceCard service={service} />}
        bgColor="bg-gradient-to-br from-purple-50 to-pink-100"
        icon={Users}
      />


    </div>
  );
};

export default ServicePage;