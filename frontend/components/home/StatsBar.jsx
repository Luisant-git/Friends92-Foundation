import React, { useState, useEffect, useRef } from "react";
import { GraduationCap, TreePine, Heart, Laptop } from "lucide-react";

const useCountAnimation = (end, duration = 2000) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      setCount(Math.floor(progress * end));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    
    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return [count, ref];
};

const StatsBar = () => {
  const stats = [
    { icon: <GraduationCap className="w-8 h-8" />, value: 10, suffix: "+", label: "Students Supported" },
    { icon: <TreePine className="w-8 h-8" />, value: 120, suffix: "+", label: "Trees Planted" },
    { icon: <Heart className="w-8 h-8" />, value: 200, suffix: "+", label: "People Reached via Health Camps" },
    { icon: <Laptop className="w-8 h-8" />, value: 80, suffix: "+", label: "Students Trained in Computers" }
  ];

  return (
    <section className="bg-primary text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const [count, ref] = useCountAnimation(stat.value);
            return (
              <div key={index} className="text-center" ref={ref}>
                <div className="flex justify-center mb-3">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  {count}{stat.suffix}
                </div>
                <div className="text-sm md:text-base">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBar;





