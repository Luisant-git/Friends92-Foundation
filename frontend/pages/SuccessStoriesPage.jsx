import React from 'react';
import { Quote } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SuccessStoriesPage = () => {
  const navigate = useNavigate();
  const successStories = [
    {
      quote: "Thanks to GPTCK 92 Trust, I could complete my engineering degree. Today I'm giving back to my community.",
      name: "Priya R.",
      role: "Scholarship Recipient",
      category: "Education"
    },
    {
      quote: "We planted 120+ trees in our village. It's amazing to see alumni coming together for environmental causes.",
      name: "Rajesh K.",
      role: "Alumni Volunteer",
      category: "Environment"
    },
    {
      quote: "The free health checkup detected my mother's condition early. The trust literally saved her life.",
      name: "Anitha M.",
      role: "Beneficiary",
      category: "Health"
    }
  ];

  const categoryColors = {
    'Education': 'bg-primary/10 text-primary',
    'Health': 'bg-secondary/10 text-secondary',
    'Environment': 'bg-emerald-100 text-emerald-800'
  };

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 font-heading">Success Stories</h1>
          <p className="text-xl text-white/90 font-body">Inspiring Journeys of Transformation and Hope</p>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl mb-4 font-heading">Stories of Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-body">
              These are the stories that fuel our passion and drive our mission forward. Each story represents a life transformed and a community strengthened.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <div className="p-8">
                  <Quote className="w-12 h-12 text-secondary mb-6" />
                  
                  <blockquote className="text-lg text-gray-700 mb-6 font-body italic leading-relaxed">
                    "{story.quote}"
                  </blockquote>
                  
                  <div className="border-t pt-6">
                    <p className="font-semibold text-gray-800 font-heading">{story.name}</p>
                    <p className="text-gray-600 text-sm font-body mb-3">{story.role}</p>
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[story.category]}`}>
                      {story.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6 font-heading">Be Part of the Next Success Story</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto font-body">
            Every success story starts with someone who believes in the power of change. Join us in creating more stories of hope and transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => navigate('/contact')} className="bg-secondary text-white px-8 py-3 rounded-full text-lg hover:bg-secondary/90 transition">
              Share Your Story
            </button>
            <button onClick={() => navigate('/contact')} className="border-2 border-secondary text-secondary px-8 py-3 rounded-full text-lg hover:bg-secondary hover:text-white transition">
              Support Our Mission
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStoriesPage;






