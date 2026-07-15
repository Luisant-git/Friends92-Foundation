import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, CalendarCheck, ShieldCheck, Heart, X } from 'lucide-react';
import { toast } from 'react-hot-toast';

const MembershipRenewal = () => {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    mobile: '',
    renewalYear: new Date().getFullYear().toString() + '-' + (new Date().getFullYear() + 1).toString(),
  });
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`${apiUrl}/alumni/membership-plans`);
      const data = await response.json();
      if (data && data.length > 0) {
        setPlans(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleOpenPayment = (plan) => {
    setSelectedPlan(plan);
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.mobile || !selectedPlan) {
      toast.error('Please enter your mobile number.');
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      return;
    }

    setLoading(true);
    
    try {
      // 1. Create order
      const orderRes = await fetch(`${apiUrl}/payment/create-order`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: selectedPlan.amount })
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
        description: selectedPlan.name,
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
            // 4. Save Subscription
            const subRes = await fetch(`${apiUrl}/alumni/subscription`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                mobile: formData.mobile,
                transactionId: response.razorpay_payment_id,
                renewalYear: formData.renewalYear,
                planId: selectedPlan.id,
                amount: selectedPlan.amount,
              }),
            });
            const subData = await subRes.json();
            
            if (subData.message === 'success') {
              toast.success('Payment Successful! Subscription Active.');
              setFormData({ ...formData, mobile: '' });
              setShowModal(false);
            } else if (subData.message === 'alumni_not_found') {
              toast.error('Alumni not found with this mobile number.');
            } else {
              toast.error('Failed to submit request.');
            }
          } else {
            toast.error('Payment verification failed.');
          }
        },
        prefill: {
          contact: formData.mobile,
        },
        theme: {
          color: '#1E3A8A'
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      toast.error('Error initiating payment.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 min-h-screen relative overflow-hidden bg-slate-100">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-400/20 blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-400/20 blur-[120px]"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 font-heading">
            Alumni Membership <span className="text-secondary">Plans</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-body">
            Stay connected with the GPTCK 92 Trust family. Choose a membership plan to continue supporting our initiatives and enjoying alumni privileges.
          </p>
        </div>

        {/* Pricing Plans */}
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl p-8 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col w-full max-w-sm relative overflow-hidden border border-blue-800/50"
            >
              {/* Subtle glass effect highlight in the corner */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-48 h-48 rounded-full bg-white opacity-10 blur-2xl"></div>
              
              <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{plan.name}</h3>
              <p className="text-blue-100 mb-6 flex-grow relative z-10">{plan.description}</p>
              <div className="mb-8 relative z-10">
                <span className="text-4xl font-extrabold text-white drop-shadow-md">₹{plan.amount}</span>
              </div>
              <button
                onClick={() => handleOpenPayment(plan)}
                className="w-full py-3 rounded-xl font-extrabold transition bg-white text-blue-900 hover:bg-blue-50 shadow-lg hover:shadow-xl relative z-10"
              >
                Pay ₹{plan.amount}
              </button>
            </div>
          ))}
          {plans.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-8">
              No membership plans currently available. Please check back later.
            </div>
          )}
        </div>

        {/* Action Call */}
        <div className="text-center">
          <p className="text-gray-600 mb-4">Not yet registered as an Alumni?</p>
          <Link 
            to="/alumni/register" 
            className="inline-block bg-white border-2 border-primary text-primary px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition shadow-sm"
          >
            Register Now
          </Link>
        </div>

      </div>

      {/* Payment Modal */}
      {showModal && selectedPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative animate-slide-up">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 transition"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="bg-blue-50 px-8 py-6 border-b border-blue-100 text-center">
              <h2 className="text-xl font-bold text-blue-900 mb-1">Complete Payment</h2>
              <p className="text-blue-700 font-medium">{selectedPlan.name}</p>
            </div>
            
            <div className="p-8">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registered Mobile Number *</label>
                  <input
                    type="text"
                    required
                    autoFocus
                    className="w-full px-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:ring-0 focus:border-primary outline-none transition"
                    placeholder="Enter mobile number"
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#528FF0] text-white px-4 py-4 rounded-xl font-bold hover:bg-[#3D7FE6] transition shadow-lg disabled:opacity-50 text-lg flex items-center justify-center gap-2"
                >
                  {loading ? 'Processing...' : `Pay ₹${selectedPlan.amount} Securely`}
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Secured by Razorpay
                </p>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipRenewal;
