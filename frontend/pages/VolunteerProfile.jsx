import React, { useEffect, useState } from 'react';

const VolunteerProfile = () => {
  const [volunteer, setVolunteer] = useState(null);

  useEffect(() => {
    const auth = localStorage.getItem('volunteerAuth');
    if (auth) {
      setVolunteer(JSON.parse(auth));
    }
  }, []);

  if (!volunteer) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {volunteer.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-xl font-bold">{volunteer.name}</h3>
            <p className="text-gray-600">{volunteer.email}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold text-gray-700 mb-3">Account Information</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-500">Name</label>
              <p className="font-medium">{volunteer.name}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Email</label>
              <p className="font-medium">{volunteer.email}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Volunteer ID</label>
              <p className="font-medium">#{volunteer.id}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Status</label>
              <p className="font-medium text-blue-600">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile;
