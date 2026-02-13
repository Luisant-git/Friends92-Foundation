import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { volunteerLogin, resetVolunteerPassword } from '../api/Volunteer';

const VolunteerLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const data = await volunteerLogin(email, password);
      localStorage.setItem('volunteerAuth', JSON.stringify(data));
      navigate('/volunteer/dashboard');
    } catch (err) {
      setError('Invalid credentials or account not active');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetEmail) {
      setError('Please enter your email');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const result = await resetVolunteerPassword(resetEmail);
      localStorage.setItem('resetVolunteerId', result.volunteerId);
      setSuccess('Password reset link sent! Check your email.');
      setShowResetModal(false);
      setResetEmail('');
    } catch (err) {
      setError('Failed to send reset link. Please check your email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 font-heading">Volunteer Login</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-secondary/5 border border-green-200 text-secondary/90 px-4 py-3 rounded mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-secondary"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-secondary"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-secondary/90 transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setShowResetModal(true)}
            className="text-secondary hover:underline text-sm"
          >
            Forgot Password?
          </button>
        </div>
      </div>

      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-xl font-bold mb-4 font-heading">Reset Password</h3>
            <p className="text-gray-600 mb-4 text-sm font-body">Enter your email to reset your password</p>
            <input
              type="email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-secondary mb-4"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setShowResetModal(false); setResetEmail(''); }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={handleResetPassword}
                disabled={loading}
                className="px-4 py-2 bg-secondary text-white rounded hover:bg-secondary/90 disabled:opacity-50"
              >
                {loading ? 'Resetting...' : 'Reset Password'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerLoginPage;







