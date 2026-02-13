import React from "react";
import { Link } from "react-router-dom";
import { Quote } from "lucide-react";

const SuccessStories = () => {
  const stories = [
    {
      title: "Scholarship Changed My Life",
      quote: "Thanks to GPTCK 92 Trust, I could complete my engineering degree. Today I'm giving back to my community.",
      author: "Priya R., Scholarship Recipient",
      image: null
    },
    {
      title: "Alumni-Led Tree Plantation",
      quote: "We planted 120+ trees in our village. It's amazing to see alumni coming together for environmental causes.",
      author: "Rajesh K., Alumni Volunteer",
      image: null
    },
    {
      title: "Health Camp Impact",
      quote: "The free health checkup detected my mother's condition early. The trust literally saved her life.",
      author: "Anitha M., Beneficiary",
      image: null
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4 font-heading">Success Stories</h2>
          <p className="text-gray-600 font-body">Real impact, real lives transformed</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stories.map((story, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow">
              <Quote className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-4 font-heading">{story.title}</h3>
              <p className="text-gray-600 italic mb-4 font-body">"{story.quote}"</p>
              <p className="text-sm text-gray-500 font-semibold font-body">— {story.author}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="/success-stories" className="inline-block bg-secondary text-white px-8 py-3 rounded-full shadow-md hover:shadow-lg font-semibold hover:bg-secondary/90 transition">
            See More Stories
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;






