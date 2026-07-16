import React, { useState } from "react";
import { Heart, Shield, RefreshCw, Gift } from "lucide-react";
import { createDonation } from "../api/Donation";
import Toast from "../components/common/Toast";

const DonatePage = () => {
  const [donationType, setDonationType] = useState("one-time");
  const [amount, setAmount] = useState("");
  const [customAmount, setCustomAmount] = useState("");
  const [matchingGift, setMatchingGift] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    pan: ""
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const suggestedAmounts = [500, 1000, 3000, 5000, 10000];

  const impactStatements = {
    500: "₹500 – Study materials for one student",
    1000: "₹1,000 – Health camp or tree plantation",
    3000: "₹3,000 – Topper prizes for three children",
    5000: "₹5,000+ – Scholarship support for higher education",
    10000: "₹10,000+ – Scholarship support for higher education",
  };

  const selectedAmount = customAmount || amount;
  const impact = impactStatements[selectedAmount] || 
    (selectedAmount >= 5000 ? "₹5,000+ – Scholarship support for higher education" : "Your contribution makes a difference");

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAmount || !formData.name || !formData.phone || !formData.email) {
      setToast({ message: "Please fill in required fields", type: "error" });
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      setToast({ message: "Razorpay SDK failed to load. Are you online?", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      
      // 1. Create Order
      const orderRes = await fetch(`${apiUrl}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: parseInt(selectedAmount) })
      });
      const orderData = await orderRes.json();

      if (!orderData || !orderData.id) {
        throw new Error('Failed to create order');
      }

      // 2. Open Razorpay Checkout
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Friends92 Foundation',
        description: 'Donation',
        order_id: orderData.id,
        handler: async function (response) {
          // 3. Verify Payment
          const verifyRes = await fetch(`${apiUrl}/payment/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature
            })
          });
          const verifyData = await verifyRes.json();

          if (verifyData.status === 'success') {
            const donationData = {
              amount: parseInt(selectedAmount),
              name: formData.name,
              phone: formData.phone,
              email: formData.email || "",
              message: formData.pan 
                ? `PAN: ${formData.pan} | Txn: ${response.razorpay_payment_id}` 
                : `Txn: ${response.razorpay_payment_id}`
            };

            await createDonation(donationData);
            setToast({ message: `Thank you! Your donation of ₹${selectedAmount} has been processed successfully.`, type: "success" });
            
            setAmount("");
            setCustomAmount("");
            setFormData({ name: "", phone: "", email: "", pan: "" });
          } else {
            setToast({ message: "Payment verification failed.", type: "error" });
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: '#1E3A8A'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      setToast({ message: "Failed to process donation. Please try again.", type: "error" });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary/5 to-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <Heart className="w-16 h-16 text-secondary mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-primary mb-3 font-heading">
            Your Support Changes Lives
          </h1>
          <p className="text-gray-600 text-lg font-body mb-6">
            Every contribution helps us reach more students, families, and communities.
          </p>
         
        </div>

        {/* Main Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit}>
            {/* Donation Type */}
            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-4">
                Donation Type
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setDonationType("one-time")}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition ${
                    donationType === "one-time"
                      ? "bg-secondary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  One-Time
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType("recurring")}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium transition flex items-center justify-center gap-2 ${
                    donationType === "recurring"
                      ? "bg-secondary text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  <RefreshCw className="w-4 h-4" />
                  Monthly
                </button>
              </div>
            </div>

            {/* Suggested Amounts */}
            <div className="mb-8">
              <label className="block text-gray-700 font-semibold mb-4">
                Select Amount (₹)
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mb-4">
                {suggestedAmounts.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => {
                      setAmount(amt);
                      setCustomAmount("");
                    }}
                    className={`py-3 px-4 rounded-lg font-medium transition ${
                      amount === amt && !customAmount
                        ? "bg-secondary text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
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
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setAmount("");
                }}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
              />
            </div>

            {/* Impact Statement */}
            {selectedAmount && (
              <div className="mb-8 p-4 bg-secondary/5 border-l-4 border-secondary rounded">
                <p className="text-secondary font-medium flex items-start gap-2 font-body">
                  <Gift className="w-5 h-5 mt-0.5 flex-shrink-0" />
                  <span>{impact}</span>
                </p>
              </div>
            )}

            {/* Donor Information */}
            <div className="mb-8 space-y-4">
              <h3 className="text-gray-700 font-semibold mb-4 font-heading">
                Your Information
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Full Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone Number *"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
                <input
                  type="text"
                  placeholder="PAN Number (for tax receipt)"
                  value={formData.pan}
                  onChange={(e) => setFormData({...formData, pan: e.target.value})}
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary focus:border-transparent"
                />
              </div>
            </div>

            {/* Tax Information */}
            <div className="mb-8 p-4 bg-gray-50 rounded-lg flex items-start gap-3">
              <Shield className="w-5 h-5 text-gray-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-gray-600">
                <p className="font-semibold text-gray-800 mb-1 font-body">Tax Benefits</p>
                <p>
                  Donations to Gptck92Trust Foundation are eligible for 80G tax
                  deduction. Tax receipt will be sent via email within 48 hours.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!selectedAmount || loading}
              className="w-full bg-secondary text-white py-4 rounded-lg font-semibold text-lg hover:bg-secondary/90 transition disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Heart className="w-5 h-5" />
              {loading ? "Processing..." : `Donate ₹${selectedAmount || "0"}`}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4 font-body">
              <Shield className="w-4 h-4 inline mr-1" />
              Secure payment powered by industry-standard encryption
            </p>
          </form>
        </div>

        {/* Additional Info */}
        <div className="mt-8 text-center text-gray-600">
          <p>
            For queries, contact us at{" "}
            <a
              href="mailto:gptck92trust@gmail.com"
              className="text-secondary hover:underline"
            >
              gptck92trust@gmail.com
            </a>
          </p>
        </div>
      </div>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default DonatePage;







