import React from "react";
import { DonateButton } from "../common/CTAButtons";

const DonateCTA = () => {
  const amounts = [
    { value: "₹500", label: "Study materials for one student" },
    { value: "₹1,000", label: "Health camp or tree plantation" },
    { value: "₹3,000", label: "Topper prizes for three children" },
    { value: "₹5,000+", label: "Scholarship support for higher education" }
  ];

  return (
    <section className="py-16 bg-secondary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white font-heading">Make a Difference Today</h2>
        <p className="text-lg mb-2 text-white font-body">
          Every contribution helps us reach more students, families, and communities
        </p>
        <p className="text-sm text-primary/10 font-medium mb-8 font-body">
          Every rupee brings hope
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {amounts.map((amount, index) => (
            <div key={index} className="bg-white/20 backdrop-blur-sm p-6 rounded-lg border border-white/30">
              <div className="text-2xl font-bold mb-2 text-white">{amount.value}</div>
              <div className="text-sm text-white">{amount.label}</div>
            </div>
          ))}
        </div>
        <DonateButton variant="outline" size="lg" />
      </div>
    </section>
  );
};

export default DonateCTA;






