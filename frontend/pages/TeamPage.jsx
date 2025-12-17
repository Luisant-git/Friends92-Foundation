import React, { useState, useEffect } from "react";
import { Phone, Mail } from "lucide-react";
import { getTeam } from "../api/Team.js";

export default function TeamPage() {
  const [team, setTeam] = useState([]);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const data = await getTeam();
      setTeam(data.filter(member => member.isActive));
    } catch (error) {
      console.error("Failed to load team:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Team</h1>
          <p className="text-gray-600 text-lg">Meet the dedicated professionals behind our success</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {team.map((member) => (
            <div key={member.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
              <div className="p-6 text-center">
                <div className="w-32 h-32 mx-auto mb-4">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full rounded-full object-cover shadow-md"
                  />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                
                {member.designation && (
                  <p className="text-green-600 font-medium mb-3">{member.designation}</p>
                )}
                
                {member.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{member.description}</p>
                )}
                
                {member.phone && (
                  <div className="flex items-center justify-center text-gray-700 text-sm">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>{member.phone}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {team.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No team members available</p>
          </div>
        )}
      </div>
    </div>
  );
}