import React, { useState, useEffect } from 'react';
import { getVerifiedTasks } from '../api/Task';

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
      <section className="bg-slate-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Volunteer Opportunities</h1>
          <p className="text-xl text-blue-100">Join Our Verified Programs and Make a Difference</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">{volunteer.impactTitle || volunteer.title}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{volunteer.impactDescription || volunteer.description}</p>
                    {volunteer.impactField && (
                      <div className="bg-green-50 border-l-4 border-green-500 p-4">
                        <h4 className="text-green-600 font-bold text-sm mb-2">IMPACT</h4>
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
    </div>
  );
};

export default VolunteerOpportunitiesPage;
