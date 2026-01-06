import React, { useState, useEffect } from 'react';
import { FileText, DollarSign, Users, Award, Download } from 'lucide-react';
import { getTrust } from '../api/Trust.js';
import { getReports } from '../api/Reports.js';
import { getFinancial } from '../api/Financial.js';

const TransparencyPage = () => {
  const [partners, setPartners] = useState([]);
  const [annualReports, setAnnualReports] = useState([]);
  const [financialSummary, setFinancialSummary] = useState([]);

  useEffect(() => {
    loadPartners();
    loadReports();
    loadFinancial();
  }, []);

  const loadPartners = async () => {
    try {
      const data = await getTrust();
      setPartners(data.filter(item => item.isActive));
    } catch (error) {
      console.error('Failed to load partners:', error);
    }
  };

  const loadReports = async () => {
    try {
      const data = await getReports();
      setAnnualReports(data);
    } catch (error) {
      console.error('Failed to load reports:', error);
    }
  };

  const loadFinancial = async () => {
    try {
      const data = await getFinancial();
      setFinancialSummary(data);
    } catch (error) {
      console.error('Failed to load financial data:', error);
    }
  };


  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Beneficiary Parent',
      text: 'Friends92 Foundation changed my daughter\'s life by providing quality education and mentorship. Forever grateful!',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Rajesh Kumar',
      role: 'Volunteer',
      text: 'Being part of this foundation has been incredibly rewarding. The transparency and dedication are commendable.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    {
      name: 'Anita Desai',
      role: 'Corporate Partner',
      text: 'We trust Friends92 Foundation with our CSR funds. Their accountability and impact reporting are exemplary.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    }
  ];



  const sponsors = [
    { name: 'ABC Corporation', amount: '₹10,00,000', year: '2023-24', type: 'Platinum' },
    { name: 'XYZ Industries', amount: '₹5,00,000', year: '2023-24', type: 'Gold' },
    { name: 'Tech Solutions Ltd', amount: '₹3,00,000', year: '2023-24', type: 'Silver' },
    { name: 'Global Enterprises', amount: '₹2,00,000', year: '2023-24', type: 'Bronze' }
  ];

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-slate-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Trust Building </h1>
          <p className="text-xl text-blue-100">Building Trust Through Openness and a Commitment to Transparency</p>
        </div>
      </section>

      {/* Annual Reports */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <FileText className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Annual Reports</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Download our comprehensive annual reports to see our impact and activities</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
                {annualReports.length > 0 ? (
                  annualReports.map((report) => (
                    <div key={report.id} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="bg-green-100 p-3 rounded-lg">
                          <FileText className="w-8 h-8 text-green-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-gray-800">{report.title}</h3>
                          <p className="text-gray-600 text-sm">{report.year}</p>
                        </div>
                      </div>
                      {report.fileUrl ? (
                        <a 
                          href={report.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(report.fileUrl, '_blank');
                          }}
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </a>
                      ) : (
                        <span className="text-gray-400 text-sm">No file available</span>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No annual reports available</p>
                  </div>
                )}
          </div>
        </div>
      </section>

      {/* Financial Summary */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Financial Summary{financialSummary.length > 0 ? ` ${financialSummary[0].year}` : ""}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Transparent breakdown of how your donations are utilized</p>
          </div>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="space-y-6">
                {financialSummary.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">{item.category}</span>
                      <span className="text-gray-600">{item.amount} ({item.percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-600 h-3 rounded-full" style={{ width: `${item.percentage}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Expenditure</span>
                  <span className="text-green-600">₹{financialSummary.reduce((total, item) => total + parseInt(item.amount.replace(/[₹,]/g, '')), 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Users className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What People Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Hear from our beneficiaries, volunteers, and partners</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <img src={testimonial.image} alt={testimonial.name} className="w-16 h-16 rounded-full mr-4" />
                  <div>
                    <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Partners</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Trusted organizations we collaborate with</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-12 max-w-7xl mx-auto">
            {partners.map((partner) => (
              <div key={partner.id} className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center hover:shadow-xl transition">
                <img src={partner.imageUrl} alt={partner.name} className="w-32 h-32 rounded-full object-cover mb-4" />
                <h3 className="text-lg font-semibold text-gray-800 text-center">{partner.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <Award className="w-12 h-12 text-green-600 mx-auto mb-4" />
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Sponsors</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Grateful to our generous sponsors who make our work possible</p>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {sponsors.map((sponsor, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between hover:shadow-xl transition">
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    sponsor.type === 'Platinum' ? 'bg-gray-300 text-gray-800' :
                    sponsor.type === 'Gold' ? 'bg-yellow-100 text-yellow-800' :
                    sponsor.type === 'Silver' ? 'bg-gray-200 text-gray-700' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {sponsor.type}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg">{sponsor.name}</h4>
                    <p className="text-sm text-gray-600">{sponsor.year}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">{sponsor.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-6">Questions About Our Work?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            We're committed to complete transparency. Contact us for any queries about our operations and finances.
          </p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-full text-lg hover:bg-green-700 transition">
            Contact Us
          </button>
        </div>
      </section>
    </div>
  );
};

export default TransparencyPage;
