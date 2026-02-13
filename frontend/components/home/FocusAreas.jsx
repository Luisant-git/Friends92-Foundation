import React from "react";
import { Link } from "react-router-dom";
import { GraduationCap, Heart, Leaf, Users } from "lucide-react";

const FocusAreas = () => {
  const areas = [
    {
      icon: <GraduationCap className="w-12 h-12" />,
      title: "Education Support",
      description: "Scholarships, coaching, skill training",
      link: "/programs"
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Health Camps",
      description: "Free medical checkups, awareness programmes",
      link: "/programs"
    },
    {
      icon: <Leaf className="w-12 h-12" />,
      title: "Environment Protection",
      description: "Tree plantation, awareness drives",
      link: "/programs"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Women & Youth Empowerment",
      description: "SHG support, mentoring, training",
      link: "/programs"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-heading">Our Focus Areas</h2>
          <p className="text-gray-600 max-w-2xl mx-auto font-body">Making a difference across multiple dimensions of community development</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {areas.map((area, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <div className="text-secondary mb-4">{area.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">{area.title}</h3>
              <p className="text-gray-600 mb-4 font-body">{area.description}</p>
              <Link to={area.link} className="text-primary font-semibold hover:text-primary/80">
                Learn More →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FocusAreas;






