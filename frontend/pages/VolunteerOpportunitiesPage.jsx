import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getVerifiedTasks } from '../api/Task';
import { Users, Heart, Camera, MapPin } from 'lucide-react';

const VolunteerOpportunitiesPage = () => {
  const [volunteers, setVolunteers] = useState([]);

  useEffect(() => {
    fetchVerifiedTasks();
  }, []);

  const fetchVerifiedTasks = async () => {
    try {
      const tasks = await getVerifiedTasks();
      setVolunteers(tasks);
    } catch (err) {
      console.error('Failed to load verified tasks');
    }
  };

  return (
    <div className="bg-white">
      <section className="bg-primary text-white py-12 md:py-20">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 font-heading">Join Hands, Inspire Change</h1>
          <p className="text-base md:text-lg lg:text-xl text-white/90 font-body max-w-4xl mx-auto">Your time, skills, and passion can transform lives. Together, alumni and volunteers create lasting impact in education, health, environment, and social welfare.</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 font-heading">Volunteer Roles & Opportunities</h2>
            <p className="text-gray-600 font-body">Choose how you want to make a difference</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <Users className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Event Volunteers</h3>
              <p className="text-gray-600 font-body">Support health camps, education programmes, and plantation drives</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <Heart className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Mentors</h3>
              <p className="text-gray-600 font-body">Guide students in academics, career, and personal development</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <Camera className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Content & Documentation</h3>
              <p className="text-gray-600 font-body">Photography, writing, social media, reports</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition">
              <MapPin className="w-12 h-12 text-secondary mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">Local Coordinators</h3>
              <p className="text-gray-600 font-body">Expand outreach in different districts</p>
            </div>
          </div>
          <div className="text-center">
            <Link to="/alumni/register" className="inline-block bg-secondary text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg font-semibold hover:bg-secondary/90 transition">
              Register as Alumni Volunteer
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4 font-heading">Current Opportunities</h2>
          </div>
          <div className="space-y-8">
            {volunteers.map((volunteer) => (
              <div key={volunteer.id} className="bg-white rounded-xl border border-gray-200 shadow-lg p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="grid grid-cols-3 gap-2">
                    {volunteer.imageUrls && volunteer.imageUrls.slice(0, 3).map((url, idx) => (
                      <img key={idx} src={url} alt={`${volunteer.impactTitle || volunteer.title} ${idx + 1}`} className="w-full h-48 object-cover rounded-lg" />
                    ))}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-4 font-heading">{volunteer.impactTitle || volunteer.title}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed font-body">{volunteer.impactDescription || volunteer.description}</p>
                    {volunteer.impactField && (
                      <div className="bg-secondary/5 border-l-4 border-secondary p-4">
                        <h4 className="text-secondary font-bold text-sm mb-2">IMPACT</h4>
                        <div className="text-gray-700 text-sm space-y-1">
                          {volunteer.impactField.split('\n').filter(line => line.trim()).map((line, idx) => (
                            <div key={idx}>{line}</div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 font-heading">Be the Change You Want to See</h2>
          <p className="text-lg mb-8 font-body">Whether you give your time, skills, or guidance, your contribution matters</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/alumni/register" className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
              Volunteer Now
            </Link>
            <Link to="/donate" className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary transition">
              Donate Now
            </Link>
          </div>
          <p className="text-sm text-secondary/10 mt-6 italic font-body">
            All volunteer activities are coordinated transparently. Alumni and community members work together to ensure maximum impact.
          </p>
        </div>
      </section>
    </div>
  );
};

export default VolunteerOpportunitiesPage;







