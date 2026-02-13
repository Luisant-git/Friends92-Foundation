import React from "react";
import { Link } from "react-router-dom";

const DonationSection = () => {
  const donationOptions = [
    { amount: "₹500", description: "Study materials for one student" },
    { amount: "₹1,000", description: "Health camp or tree plantation" },
    { amount: "₹3,000", description: "Topper prizes for three children" },
    { amount: "₹5,000+", description: "Scholarship support for higher education" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-heading">
            Make a Difference Today
          </h2>
          <p className="text-lg text-gray-600 mb-2 font-body">
            Every contribution helps us reach more students, families, and communities
          </p>
          <p className="text-sm text-secondary font-medium font-body">
            Every rupee brings hope
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {donationOptions.map((option, index) => (
            <div
              key={index}
              className="bg-secondary/10 border-2 border-primary/30 rounded-lg p-6 text-center hover:border-primary hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="text-2xl md:text-3xl font-bold text-secondary mb-2">
                {option.amount}
              </div>
              <div className="text-sm md:text-base text-gray-700">
                {option.description}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <Link to="/donate" className="inline-block bg-secondary text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg font-semibold hover:bg-primary transition-colors">
            Support a Student's Future
          </Link>
          <p className="text-sm text-gray-500 italic mt-3 font-body">
            Your gift empowers education, health, and dignity
          </p>
        </div>

        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm text-gray-600 mb-2 font-body">
            All donations are used only for charitable activities in line with the objects of the Trust. 
            Accounts are maintained and audited annually by a Chartered Accountant as per law.
          </p>
          <p className="text-xs text-gray-500 italic font-body">
            Together, we can transform lives
          </p>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;



