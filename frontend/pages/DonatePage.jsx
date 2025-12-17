import React, { useState } from 'react';
import { Heart, Shield, RefreshCw, Gift } from 'lucide-react';

const DonatePage = () => {
  const [donationType, setDonationType] = useState('one-time');
  const [amount, setAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [matchingGift, setMatchingGift] = useState(false);

  const suggestedAmounts = [500, 1000, 2500, 5000, 10000];

  const impactStatements = {
    500: "Provides school supplies for 1 child for a year",
    1000: "Supports skill training for 2 students",
    2500: "Sponsors education for 3 children for a month",
    5000: "Funds personality development program for 10 students",
    10000: "Supports complete education for 1 child for a year"
  };

  const selectedAmount = customAmount || amount;
  const impact = impactStatements[selectedAmount] || "Your contribution makes a difference";

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Processing ${donationType} donation of ₹${selectedAmount}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Heart className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Make a Difference Today</h1>
          <p className="text-gray-600 text-lg">Your generosity transforms lives and builds futures</p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Donation Type */}
            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-4">Donation Type</label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setDonationType('one-time')}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition ${
                    donationType === 'one-time'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  One-Time
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType('recurring')}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                    donationType === 'recurring'
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  Monthly
                </button>
              </div>
            </div>

            {/* Suggested Amounts */}
            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-4">Select Amount (₹)</label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {suggestedAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => { setAmount(amt); setCustomAmount(''); }}
                    className={`py-3 px-4 rounded-lg font-medium transition ${
                      amount === amt && !customAmount
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    ₹{amt}
                  </button>
                ))}
              </div>
              <input
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => { setCustomAmount(e.target.value); setAmount(''); }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Impact Statement */}
            {selectedAmount && (
              <div className="mb-8 p-4 bg-green-50 border-l-4 border-green-600 rounded">
                <p className="text-green-800 font-medium flex items-start gap-2">
                  <Gift className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>{impact}</span>
                </p>
              </div>
            )}

            {/* Donor Information */}
            <div className="mb-8 space-y-4">
              <h3 className="text-gray-700 font-semibold mb-4">Your Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="PAN Number (for tax receipt)"
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Matching Gift */}
            <div className="mb-8 p-4 bg-blue-50 rounded-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={matchingGift}
                  onChange={(e) => setMatchingGift(e.target.checked)}
                  className="mt-1 w-5 h-5 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                />
                <div>
                  <p className="font-semibold text-gray-800">Double Your Impact!</p>
                  <p className="text-sm text-gray-600">Check if your employer offers matching gift programs</p>
                </div>
              </label>
            </div>

            {/* Tax Information */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg flex items-start gap-3">
              <Shield className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-gray-800 mb-1">Tax Benefits</p>
                <p>Donations to Friends92 Foundation are eligible for 80G tax deduction. You will receive a tax receipt via email within 48 hours.</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedAmount}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              Donate ₹{selectedAmount || '0'}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              <Shield className="w-4 h-4 inline mr-1" />
              Secure payment powered by industry-standard encryption
            </p>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-gray-600">
          <p>For queries, contact us at <a href="mailto:friends92foundation@gmail.com" className="text-green-600 hover:underline">friends92foundation@gmail.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default DonatePage;
