import React from 'react';
import { Star, Calendar, MapPin } from 'lucide-react';

const SuccessStoriesPage = () => {
  const successStories = [
    {
      name: 'Priya Sharma',
      title: 'From Village to Engineer',
      category: 'Education',
      image: 'https://picsum.photos/400/300?random=1',
      story: 'Born in a remote village with limited educational opportunities, Priya received a scholarship through our education program. Today, she works as a software engineer at a leading tech company and sponsors education for 5 other children.',
      impact: 'Now sponsors 5 children',
      year: '2019',
      location: 'Rural Maharashtra'
    },
    {
      name: 'Rajesh Kumar',
      title: 'Healthcare Hero in Remote Areas',
      category: 'Health',
      image: 'https://picsum.photos/400/300?random=2',
      story: 'After receiving medical training through our healthcare program, Rajesh returned to his village to serve the community. He has conducted over 1,000 medical consultations and saved countless lives through early intervention.',
      impact: '1,000+ consultations conducted',
      year: '2020',
      location: 'Rural Bihar'
    },
    {
      name: 'Sunita Devi',
      title: 'Women Empowerment Champion',
      category: 'Women & Child Welfare',
      image: 'https://picsum.photos/400/300?random=3',
      story: 'Through our skill development program, Sunita learned tailoring and started her own business. She now employs 15 women from her community and has become a local leader advocating for women\'s rights.',
      impact: 'Employs 15 women',
      year: '2021',
      location: 'Urban Slum, Delhi'
    },
    {
      name: 'Green Warriors Group',
      title: 'Environmental Champions',
      category: 'Environment',
      image: 'https://picsum.photos/400/300?random=4',
      story: 'A group of young volunteers who participated in our tree plantation drive have now formed their own environmental organization. They have planted over 10,000 trees and conduct regular awareness programs.',
      impact: '10,000+ trees planted',
      year: '2022',
      location: 'Multiple Cities'
    },
    {
      name: 'Disaster Response Team',
      title: 'Community Resilience Builders',
      category: 'Disaster Relief',
      image: 'https://picsum.photos/400/300?random=5',
      story: 'Trained through our disaster preparedness program, this community team successfully coordinated relief efforts during recent floods, helping evacuate 500+ families and providing essential supplies.',
      impact: '500+ families helped',
      year: '2023',
      location: 'Coastal Karnataka'
    },
    {
      name: 'Amit Patel',
      title: 'From Beneficiary to Benefactor',
      category: 'Education',
      image: 'https://picsum.photos/400/300?random=6',
      story: 'Amit received educational support during his school years and went on to become a successful businessman. He has now established a scholarship fund that supports 50 students annually.',
      impact: 'Supports 50 students annually',
      year: '2018',
      location: 'Gujarat'
    }
  ];

  const categoryColors = {
    'Education': 'bg-blue-100 text-blue-800',
    'Health': 'bg-green-100 text-green-800',
    'Environment': 'bg-emerald-100 text-emerald-800',
    'Women & Child Welfare': 'bg-pink-100 text-pink-800',
    'Disaster Relief': 'bg-red-100 text-red-800'
  };

  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="bg-slate-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Success Stories</h1>
          <p className="text-xl text-blue-100">Inspiring Journeys of Transformation and Hope</p>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-brand-dark sm:text-4xl mb-4">Stories of Impact</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              These are the stories that fuel our passion and drive our mission forward. Each story represents a life transformed and a community strengthened.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {successStories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                <img 
                  src={story.image} 
                  alt={story.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${categoryColors[story.category]}`}>
                      {story.category}
                    </span>
                    <div className="flex items-center text-yellow-500">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-brand-dark mb-2">{story.title}</h3>
                  <h4 className="text-green-600 font-semibold mb-3">{story.name}</h4>
                  
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {story.story}
                  </p>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2 text-green-600" />
                      <span>{story.year}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2 text-green-600" />
                      <span>{story.location}</span>
                    </div>
                    <div className="text-sm font-semibold text-green-600">
                      Impact: {story.impact}
                    </div>
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
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Be Part of the Next Success Story</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Every success story starts with someone who believes in the power of change. Join us in creating more stories of hope and transformation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-600 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition">
              Share Your Story
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-full text-lg hover:bg-green-600 hover:text-white transition">
              Support Our Mission
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SuccessStoriesPage;