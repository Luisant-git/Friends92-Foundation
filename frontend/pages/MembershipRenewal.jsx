import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, CalendarCheck, ShieldCheck, Heart, X, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';
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
  const [isVerified, setIsVerified] = useState(false);
  const [verifiedName, setVerifiedName] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchPlans();
  }, []);

  useEffect(() => {
    const verifyNumber = async () => {
      if (formData.mobile.length === 10) {
        setIsVerifying(true);
        try {
          const res = await fetch(`${apiUrl}/alumni/verify-mobile/${formData.mobile}`);
          const data = await res.json();
          if (data.exists) {
            setIsVerified(true);
            setVerifiedName(data.name);
            setShowSuccessModal(true);
          } else {
            setIsVerified(false);
            setVerifiedName('');
          }
        } catch (error) {
          console.error(error);
          setIsVerified(false);
          setVerifiedName('');
        } finally {
          setIsVerifying(false);
        }
      } else {
        setIsVerified(false);
        setVerifiedName('');
      }
    };

    const debounceTimeout = setTimeout(() => {
      verifyNumber();
    }, 400);

    return () => clearTimeout(debounceTimeout);
  }, [formData.mobile, apiUrl]);

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
    setFormData({ ...formData, mobile: '' });
    setIsVerified(false);
    setVerifiedName('');
    setShowSuccessModal(false);
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
                  <div className="relative">
                    <input
                      type="text"
                      required
                      autoFocus
                      maxLength="10"
                      className={`w-full px-4 py-3 pl-12 text-lg border-2 rounded-xl focus:ring-0 outline-none transition ${
                        isVerified ? 'border-green-500 focus:border-green-500' :
                        formData.mobile.length === 10 && !isVerifying && !isVerified ? 'border-red-400 focus:border-red-500' :
                        'border-gray-200 focus:border-primary'
                      }`}
                      placeholder="10-digit mobile number"
                      value={formData.mobile}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '');
                        setFormData({ ...formData, mobile: val });
                      }}
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Phone className="w-5 h-5" />
                    </div>
                    {isVerifying && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
                      </div>
                    )}
                    {isVerified && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      </div>
                    )}
                    {formData.mobile.length === 10 && !isVerifying && !isVerified && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-2 min-h-[24px]">
                    {isVerifying ? (
                      <p className="text-sm text-blue-500 font-medium animate-pulse flex items-center gap-1">
                        <Loader2 className="w-4 h-4 animate-spin" /> Verifying number...
                      </p>
                    ) : isVerified ? (
                      <p className="text-sm text-green-600 font-medium flex items-center gap-1 animate-fade-in">
                        <ShieldCheck className="w-4 h-4" /> Verified Alumni: {verifiedName}
                      </p>
                    ) : formData.mobile.length === 10 ? (
                      <p className="text-sm text-red-500 font-medium flex items-center gap-1 animate-fade-in">
                        <AlertCircle className="w-4 h-4" /> Not registered as an alumni.
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">Enter your 10-digit registered number.</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !isVerified}
                  className={`w-full text-white px-4 py-4 rounded-xl font-bold transition shadow-lg disabled:opacity-50 text-lg flex items-center justify-center gap-2 ${
                    isVerified ? 'bg-[#528FF0] hover:bg-[#3D7FE6]' : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {loading ? 'Processing...' : `Pay ₹${selectedPlan.amount} Securely`}
                </button>
                <p className="text-center text-xs text-gray-400 mt-4">
                  Secured by Razorpay
                </p>
              </form>
            </div>

            {/* Inner Success Verification Modal */}
            {showSuccessModal && (
              <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-white/95 backdrop-blur-sm animate-fade-in rounded-2xl">
                <style>
                  {`
                    @keyframes success-pop {
                      0% { transform: scale(0.3); opacity: 0; }
                      60% { transform: scale(1.15); opacity: 1; }
                      100% { transform: scale(1); opacity: 1; }
                    }
                    .animate-success-pop {
                      animation: success-pop 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
                    }
                  `}
                </style>
                <div className="bg-white border border-gray-100 p-8 rounded-2xl shadow-2xl text-center max-w-sm w-full animate-slide-up">
                  <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner animate-success-pop">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Verified Successfully!</h3>
                  <p className="text-gray-600 mb-8 text-lg">
                    Welcome back,<br/>
                    <span className="font-bold text-green-600 text-xl mt-1 block">{verifiedName}</span>
                  </p>
                  <button 
                    onClick={() => setShowSuccessModal(false)}
                    className="w-full bg-green-500 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition shadow-lg text-lg flex items-center justify-center gap-2"
                  >
                    Continue to Payment
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MembershipRenewal;
