import React, { useState, useEffect } from 'react';
import { getTeam } from '../api/Team.js';

const AboutPage = () => {
  const trustees = [
    { name: 'John Smith', role: 'Chairman', photo: 'https://picsum.photos/300/300?random=1', bio: 'With over 25 years of experience in education and philanthropy, John leads our foundation with vision and dedication.' },
    { name: 'Sarah Johnson', role: 'Vice Chairman', photo: 'https://picsum.photos/300/300?random=2', bio: 'A renowned educator and community leader, Sarah brings strategic insight to our mission.' },
    { name: 'Michael Chen', role: 'Treasurer', photo: 'https://picsum.photos/300/300?random=3', bio: 'Financial expert with a passion for social impact, ensuring our resources create maximum value.' },
    { name: 'Emily Davis', role: 'Secretary', photo: 'https://picsum.photos/300/300?random=4', bio: 'Legal professional committed to governance excellence and organizational transparency.' }
  ];

  const [team, setTeam] = useState([]);

  useEffect(() => {
    loadTeam();
  }, []);

  const loadTeam = async () => {
    try {
      const data = await getTeam();
      setTeam(data.filter(member => member.isActive));
    } catch (error) {
      console.error('Failed to load team:', error);
    }
  };

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-primary text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 font-heading">About Us</h1>
          <p className="text-xl text-white/90 font-body">Building a Better Tomorrow Together</p>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-primary mb-12 font-heading">History</h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-6 font-body">
              Founded in 1992, Gptck92 trust emerged from a shared vision among classmates to create lasting positive change in our community. What began as a small group of dedicated individuals has grown into a thriving organization touching thousands of lives.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-body">
              Over three decades, we've evolved from grassroots initiatives to comprehensive programs in education, healthcare, and community development, always staying true to our founding principles of compassion, integrity, and excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Vision, Mission & Values */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-primary mb-12 font-heading">Vision, Mission and Values</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-primary/10 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-primary mb-4 font-heading">Vision</h3>
              <p className="text-gray-700 font-body">To be a catalyst for sustainable community transformation, creating opportunities for every individual to reach their full potential.</p>
            </div>
            <div className="bg-secondary/10 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-secondary mb-4 font-heading">Mission</h3>
              <p className="text-gray-700 font-body">Empowering communities through education, healthcare, and sustainable development programs that foster dignity, equality, and hope.</p>
            </div>
            <div className="bg-purple-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-600 mb-4 font-heading">Values</h3>
              <p className="text-gray-700 font-body">Integrity, Compassion, Excellence, Collaboration, and Accountability guide everything we do.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-primary mb-12 font-heading">Our Story and History</h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-primary">1992</span>
                </div>
                <div className="flex-1 pb-8 border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">The Beginning</h3>
                  <p className="text-gray-700 font-body">A group of friends from the class of '92 came together with a dream to give back to society.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-primary">2000</span>
                </div>
                <div className="flex-1 pb-8 border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">Expansion</h3>
                  <p className="text-gray-700 font-body">Launched our first major education initiative, providing scholarships to 100 underprivileged students.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-primary">2010</span>
                </div>
                <div className="flex-1 pb-8 border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">Healthcare Initiative</h3>
                  <p className="text-gray-700 font-body">Established mobile health clinics serving rural communities across the region.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex-shrink-0 w-24 text-right">
                  <span className="text-2xl font-bold text-primary">2024</span>
                </div>
                <div className="flex-1 pl-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 font-heading">Today</h3>
                  <p className="text-gray-700 font-body">Serving over 10,000 beneficiaries annually through diverse programs and partnerships.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Board of Trustees */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-primary mb-4 font-heading">Board of Trustees</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto font-body">Our distinguished board members bring diverse expertise and unwavering commitment to our mission.</p>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {trustees.map((trustee, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                <div className="md:flex">
                  <div className="md:flex-shrink-0">
                    <img src={trustee.photo} alt={trustee.name} className="h-48 w-full md:w-48 object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-800 font-heading">{trustee.name}</h3>
                    <p className="text-primary font-semibold mb-3 font-body">{trustee.role}</p>
                    <p className="text-gray-600 text-sm font-body">{trustee.bio}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dedicated Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-primary mb-4 font-heading">Dedicated Team</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto font-body">Meet the passionate professionals who bring our vision to life every day.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {team.map((member) => (
              <div key={member.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition text-center">
                <img src={member.imageUrl} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-1 font-heading">{member.name}</h3>
                  {member.designation && <p className="text-primary mb-2 font-body">{member.designation}</p>}
                  {member.description && <p className="text-gray-600 text-sm mb-2 font-body">{member.description}</p>}
                  {member.phone && <p className="text-gray-600 text-sm font-body">{member.phone}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;






