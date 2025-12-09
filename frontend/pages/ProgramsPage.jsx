import React from 'react';
import { GraduationCap, Heart, Leaf, Users, AlertTriangle } from 'lucide-react';

const ProgramsPage = () => {
  const programs = [
    {
      title: 'Education',
      description: 'Providing quality education and scholarships to underprivileged children, building schools, and supporting teachers.',
      icon: <GraduationCap className="w-12 h-12 text-green-600" />,
      stats: '5,000+ Students Educated'
    },
    {
      title: 'Health',
      description: 'Mobile health clinics, free medical camps, and healthcare awareness programs for rural communities.',
      icon: <Heart className="w-12 h-12 text-green-600" />,
      stats: '25,000+ Medical Consultations'
    },
    {
      title: 'Environment',
      description: 'Tree plantation drives, waste management initiatives, and promoting sustainable living practices.',
      icon: <Leaf className="w-12 h-12 text-green-600" />,
      stats: '50,000+ Trees Planted'
    },
    {
      title: 'Women & Child Welfare',
      description: 'Empowerment programs, skill development, nutrition support, and protection services for women and children.',
      icon: <Users className="w-12 h-12 text-green-600" />,
      stats: '3,000+ Women Empowered'
    },
    {
      title: 'Disaster Relief',
      description: 'Emergency response, relief distribution, and rehabilitation support during natural disasters and crises.',
      icon: <AlertTriangle className="w-12 h-12 text-green-600" />,
      stats: '10+ Relief Operations'
    }
  ];

  const impact = [
    { number: '15,000+', label: 'Families Helped' },
    { number: '5,000+', label: 'Students Educated' },
    { number: '25,000+', label: 'Medical Consultations' },
    { number: '50,000+', label: 'Trees Planted' },
    { number: '3,000+', label: 'Women Empowered' },
    { number: '10+', label: 'Disaster Relief Operations' }
  ];

  return (
    <div className="bg-white">
      {/* Header Section - matching AboutPage pattern */}
      <section className="bg-slate-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Our Programs</h1>
          <p className="text-xl text-blue-100">Making a Difference Through Action</p>
        </div>
      </section>

      {/* Programs Section - matching HomePage service cards pattern */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl mb-4">Core Initiatives</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our comprehensive programs address the most pressing challenges in our communities through targeted interventions and sustainable solutions.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((program, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="mb-6">{program.icon}</div>
                <h3 className="text-2xl font-bold text-brand-dark mb-4">{program.title}</h3>
                <p className="text-gray-700 mb-4 leading-relaxed">{program.description}</p>
                <div className="text-green-600 font-semibold text-sm">{program.stats}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section - matching AboutPage pattern with gray background */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">Our Impact</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">Real numbers showing the lives we've touched and communities we've transformed through our dedicated efforts.</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto">
            {impact.map((stat, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-xl transition">
                <div className="text-3xl font-bold text-green-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section - matching project's green theme */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Get Involved</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join us in our mission to create positive change and transform communities. Every contribution makes a difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition">
              Donate Now
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full text-lg hover:bg-green-600 hover:text-white transition">
              Volunteer With Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProgramsPage;
