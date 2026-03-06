import React, { useState, useEffect } from 'react';
import { getTeam } from '../api/Team.js';
import { getTrustees } from '../api/Trustees.js';

const AboutPage = () => {
  const [trustees, setTrustees] = useState([]);
  const [team, setTeam] = useState([]);

  useEffect(() => {
    loadTrustees();
    loadTeam();
  }, []);

  const loadTrustees = async () => {
    try {
      const data = await getTrustees();
      setTrustees(data.filter(trustee => trustee.isActive));
    } catch (error) {
      console.error('Failed to load trustees:', error);
    }
  };

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
          <div className="max-w-4xl mx-auto space-y-6">
            <p className="text-lg text-gray-700 leading-relaxed font-body">
              Founded by the 1992 alumni of GPTC Krishnagiri, the Trust grew from informal reunions into a registered charitable foundation on 15 July 2025. Since then, we have organized alumni meets, supported students, and expanded into structured social initiatives.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-body">
              GPTCK 92 Trust (Alumni Foundation) was founded by the 1992 alumni of Government Polytechnic College, Krishnagiri (GPTC Krishnagiri), who studied between 1989–1992 in DME, DCE and DECE branches. The alumni first reunited through informal meets and later formalized their efforts into a registered public charitable trust on 03.07.2025 to serve people across India in education, skill development and social welfare.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-body">
              In 2019, some of our batchmates met and successfully organized an alumni meet at GPTC Krishnagiri. Encouraged by the success, we decided to bring together as many 1992 batchmates as possible and formed the "GPT 92 Batch" group.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-body">
              Due to the Corona pandemic, our planned 2020–2021 alumni events were postponed. In 2023, we again celebrated an alumni meet at the GPTC Krishnagiri campus with around 113 batchmates, which became a memorable milestone in our journey.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed font-body">
              Over the years, the group has organised alumni meets, honoured meritorious students, and gradually expanded into structured social activities such as fee support, medical assistance and tree plantation. To ensure continuity, transparency and long-term impact, Founded by the 1992 alumni of GPTC Krishnagiri, the Trust grew from informal reunions into a registered charitable foundation as "GPTCK 92 TRUST (ALUMNI FOUNDATION)" at Krishnagiri on 15 July 2025. Since then, we have organized alumni meets, supported students, and expanded into structured social initiatives.
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
              <p className="text-gray-700 font-body">An educated, healthy, and environmentally responsible society where every deserving individual has the opportunity to learn, live with dignity, and contribute to the nation.</p>
            </div>
            <div className="bg-secondary/10 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-secondary mb-4 font-heading">Mission</h3>
              <ul className="text-gray-700 font-body space-y-2">
                <li>• Provide education and skill development for underprivileged youth</li>
                <li>• Promote health, environment protection, and women & child welfare</li>
                <li>• Serve society collectively, without discrimination</li>
              </ul>
            </div>
            <div className="bg-purple-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-purple-600 mb-4 font-heading">Values</h3>
              <ul className="text-gray-700 font-body space-y-2">
                <li>• Equity</li>
                <li>• Transparency</li>
                <li>• Service</li>
                <li>• Sustainability</li>
              </ul>
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
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {trustees.map((trustee) => (
              <div key={trustee.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition flex">
                <img src={trustee.imageUrl} alt={trustee.name} className="w-24 h-24 sm:w-32 sm:h-32 object-contain flex-shrink-0" />
                <div className="p-3 sm:p-4 flex-1">
                  <h3 className="text-sm sm:text-base font-bold text-gray-800 font-heading mb-1">{trustee.name}</h3>
                  <p className="text-primary font-semibold mb-2 text-xs sm:text-sm font-body">{trustee.designation}</p>
                  <p className="text-gray-600 text-xs leading-relaxed font-body">{trustee.description}</p>
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
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {team.map((member) => (
              <div key={member.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
                <img src={member.imageUrl} alt={member.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800 text-center font-heading mb-2">{member.name}</h3>
                  {member.description && (
                    <p className="text-xs text-gray-600 text-center font-body">{member.description}</p>
                  )}
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
