import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Heart, TreePine, Users } from "lucide-react";

const VolunteerSection = () => {
  const volunteerActivities = [
    { icon: <GraduationCap className="w-12 h-12" />, title: "Event Volunteers", description: "Support health camps, education programmes and plantation drives" },
    { icon: <Users className="w-12 h-12" />, title: "Mentors", description: "Guide students in academics, career and personal development" },
    { icon: <Heart className="w-12 h-12" />, title: "Content & Documentation", description: "Help with reports, blogs, photography and social media" },
    { icon: <TreePine className="w-12 h-12" />, title: "Local Coordinators", description: "Expand outreach in different districts" }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-heading">
            Be the Change
          </h2>
          <p className="text-lg text-gray-600 mb-2 font-body">
            We invite GPTC Krishnagiri alumni and like-minded individuals to join hands with us as volunteers, mentors and supporters
          </p>
          <p className="text-sm text-secondary font-medium font-body">
            Your time and skills can light the path for others
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {volunteerActivities.map((activity, index) => (
            <div
              key={index}
              className="bg-white border-2 border-primary/30 rounded-lg p-8 text-center hover:border-primary hover:shadow-lg transition-all"
            >
              <div className="flex justify-center text-secondary mb-4">
                {activity.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">
                {activity.title}
              </h3>
              <p className="text-gray-600 font-body">
                {activity.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center space-y-3">
          <div>
            <Link to="/volunteer-opportunities" className="inline-block bg-secondary text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg font-semibold hover:bg-secondary/90 transition-colors">
              Join Hands, Inspire Change
            </Link>
          </div>
          <div>
            <Link to="/alumni/register" className="text-secondary font-semibold hover:text-secondary/80 underline">
              Reconnect & Serve
            </Link>
          </div>
          <p className="text-sm text-gray-500 italic mt-2 font-body">
            Alumni power, community impact
          </p>
        </div>
      </div>
    </section>
  );
};

export default VolunteerSection;



