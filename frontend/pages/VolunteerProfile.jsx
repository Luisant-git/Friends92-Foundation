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
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6 font-heading">My Profile</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-6 mb-6">
          {volunteer.photoUrl ? (
            <img
              src={volunteer.photoUrl}
              alt={volunteer.name}
              className="w-32 h-32 object-cover"
            />
          ) : (
            <div className="w-32 h-32 bg-primary flex items-center justify-center text-white text-5xl font-bold">
              {volunteer.name.charAt(0).toUpperCase()}
            </div>
          )}
          <div className="hidden md:flex flex-col flex-1 min-w-0">
            <h3 className="text-2xl font-bold break-words font-heading">{volunteer.name}</h3>
            <p className="text-gray-600 text-lg break-all font-body">{volunteer.email}</p>
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
              <label className="text-sm text-gray-500">Service Area</label>
              <p className="font-medium">{volunteer.service || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Mobile</label>
              <p className="font-medium">{volunteer.mobile1 || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Profession</label>
              <p className="font-medium">{volunteer.profession || 'N/A'}</p>
            </div>
            <div>
              <label className="text-sm text-gray-500">Status</label>
              <p className="font-medium text-primary font-body">Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerProfile;







