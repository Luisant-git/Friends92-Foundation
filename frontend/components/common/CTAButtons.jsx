import React from "react";
import { Link } from "react-router-dom";

export const DonateButton = ({ variant = "primary", size = "md", className = "" }) => {
  const baseStyles = "font-semibold rounded-full transition inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-secondary text-white hover:bg-secondary/90",
    secondary: "bg-white text-secondary border-2 border-secondary hover:bg-secondary/10",
    outline: "border-2 border-white text-white hover:bg-white/10"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-base"
  };

  return (
    <Link
      to="/donate"
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      Donate Now
    </Link>
  );
};

export const VolunteerButton = ({ variant = "secondary", size = "md", className = "" }) => {
  const baseStyles = "font-semibold rounded-full transition inline-flex items-center justify-center";
  
  const variants = {
    primary: "bg-secondary text-white hover:bg-secondary/90",
    secondary: "bg-white text-secondary border-2 border-secondary hover:bg-secondary/10",
    outline: "border-2 border-white text-white hover:bg-white/10"
  };
  
  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3 text-base"
  };

  return (
    <Link
      to="/volunteer-opportunities"
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
    >
      Volunteer Now
    </Link>
  );
};

export const CTAButtonGroup = ({ size = "md", className = "" }) => {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      <DonateButton size={size} />
      <VolunteerButton size={size} />
    </div>
  );
};


