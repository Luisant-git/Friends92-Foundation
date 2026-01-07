import React from 'react';
import { CheckCircle } from 'lucide-react';

const ProgramsPage = () => {

  const programs = [
    {
      id: 1,
      title: 'Education',
      description: 'Empowering communities through quality education and skill development programs. We provide scholarships, learning materials, and infrastructure support to ensure every child has access to education.',
      impact: '5,000+ students educated with scholarships and learning resources'
    },
    {
      id: 2,
      title: 'Health',
      description: 'Delivering essential healthcare services and promoting wellness in underserved areas. Our medical camps, health awareness programs, and free consultations ensure accessible healthcare for all.',
      impact: '25,000+ medical consultations and health check-ups conducted'
    },
    {
      id: 3,
      title: 'Environment',
      description: 'Protecting our planet through tree plantation drives, waste management initiatives, and environmental awareness campaigns. Building a sustainable future for generations to come.',
      impact: '50,000+ trees planted and environmental conservation projects'
    },
    {
      id: 4,
      title: 'Women and Child Welfare',
      description: 'Empowering women through skill training, entrepreneurship support, and ensuring child safety and development. Creating opportunities for women to become self-reliant and protecting children\'s rights.',
      impact: '3,000+ women empowered through skill training and support programs'
    },
    {
      id: 5,
      title: 'Disaster Relief',
      description: 'Providing immediate assistance and long-term rehabilitation support during natural calamities and emergencies. Our rapid response teams ensure timely aid reaches affected communities.',
      impact: '10+ disaster relief operations supporting thousands of families'
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

  const realTimeImpact = [
    {
      id: 1,
      title: 'Education Initiative',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=500',
      metric: '5,000+',
      impact: 'Provided scholarships, learning materials, and infrastructure support to underprivileged students across rural and urban areas. Our program includes free textbooks, digital learning tools, and mentorship to ensure quality education reaches every child regardless of their economic background.'
    },
    {
      id: 2,
      title: 'Healthcare Outreach',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500',
      metric: '25,000+',
      impact: 'Conducted free medical consultations, health check-ups, and awareness programs in underserved rural communities. Our mobile health camps provide essential medicines, diagnostic services, and preventive care to families who lack access to basic healthcare facilities.'
    },
    {
      id: 3,
      title: 'Green Earth Campaign',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=500',
      metric: '50,000+',
      impact: 'Planted trees across multiple regions through community-driven plantation drives to combat climate change and restore ecological balance. Our initiative includes ongoing maintenance, environmental education workshops, and creating green spaces in urban areas for sustainable development.'
    }
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

      {/* Core Initiatives Section - Static */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl mb-4">Core Initiatives</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Our comprehensive programs address the most pressing challenges in our communities through targeted interventions and sustainable solutions.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((program) => (
              <div key={program.id} className="bg-white rounded-xl border border-gray-200 shadow-lg p-6 hover:shadow-xl transition">
                <div className="flex items-center mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600 mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">{program.title}</h3>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">{program.description}</p>
                <div className="bg-green-50 border-l-4 border-green-500 p-4">
                  <p className="text-gray-700 text-sm font-semibold">{program.impact}</p>
                </div>
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

      {/* Featured Programs Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-800 sm:text-4xl mb-4">Featured Programs</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Highlighting our key initiatives that are transforming lives across communities.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {realTimeImpact.map((item) => (
              <div key={item.id} className="bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition">
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <div className="bg-green-50 border-l-4 border-green-500 p-4">
                    <p className="text-green-600 font-bold text-2xl mb-3">{item.metric}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.impact}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-50">
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
