import React from "react";
import { GraduationCap, TreePine, Heart, Laptop } from "lucide-react";

const StatsBar = () => {
  const stats = [
    { icon: <GraduationCap className="w-8 h-8" />, value: "10+", label: "Students Supported" },
    { icon: <TreePine className="w-8 h-8" />, value: "120+", label: "Trees Planted" },
    { icon: <Heart className="w-8 h-8" />, value: "200+", label: "People Reached via Health Camps" },
    { icon: <Laptop className="w-8 h-8" />, value: "80+", label: "Students Trained in Computers" }
  ];

  return (
    <section className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;





