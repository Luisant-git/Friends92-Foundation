import React, { useState } from 'react';
import { createVolunteer } from '../api/Volunteer';
import { uploadImage } from '../api/Upload';

const VolunteerPage = () => {
  const [form, setForm] = useState({
    name: '',
    service: '',
    mobile1: '',
    mobile2: '',
    email: '',
    profession: '',
    companyName: '',
    designation: '',
    companyDepartment: '',
    companyPlace: '',
    businessName: '',
    natureOfBusiness: '',
    businessPlace: '',
    businessAddress: '',
    permanentAddress: '',
    servicesOffered: '',
    photoUrl: ''
  });
  
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [willProvideServices, setWillProvideServices] = useState(false);

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      try {
        const result = await uploadImage(file);
        setForm({ ...form, photoUrl: result.url });
      } catch (error) {
        console.error('Upload error:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.mobile1 || !form.service) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await createVolunteer(form);
      setShowSuccess(true);
      setForm({
        name: '',
        service: '',
        mobile1: '',
        mobile2: '',
        email: '',
        profession: '',
        companyName: '',
        designation: '',
        companyDepartment: '',
        companyPlace: '',
        businessName: '',
        natureOfBusiness: '',
        businessPlace: '',
        businessAddress: '',
        permanentAddress: '',
        servicesOffered: '',
        photoUrl: ''
      });
      setPhotoFile(null);
    } catch (error) {
      console.log('Error caught:', error);
      console.log('Error message:', error.message);
      const errorMessage = error.message || 'Failed to submit form';
      if (errorMessage.includes('Email already exists')) {
        alert('This email is already registered. Please use a different email.');
      } else {
        alert(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-slate-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4 font-heading">Volunteer Section</h1>
          <p className="text-xl text-white/90 font-body">Join us in making a difference</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6 font-heading">Volunteer Registration Form</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Service Area *</label>
                <select
                  value={form.service}
                  onChange={(e) => setForm({ ...form, service: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Service</option>
                  <option value="Education">Education</option>
                  <option value="Health">Health</option>
                  <option value="Environment">Environment</option>
                  <option value="Women & Child Welfare">Women & Child Welfare</option>
                  <option value="Disaster Relief">Disaster Relief</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mobile Number 1 *</label>
                <input
                  type="tel"
                  value={form.mobile1}
                  onChange={(e) => setForm({ ...form, mobile1: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mobile Number 2</label>
                <input
                  type="tel"
                  value={form.mobile2}
                  onChange={(e) => setForm({ ...form, mobile2: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Profession</label>
                <input
                  type="text"
                  value={form.profession}
                  onChange={(e) => setForm({ ...form, profession: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4 font-heading">If Employee</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Company Name</label>
                  <input
                    type="text"
                    value={form.companyName}
                    onChange={(e) => setForm({ ...form, companyName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Designation</label>
                  <input
                    type="text"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Department</label>
                  <input
                    type="text"
                    value={form.companyDepartment}
                    onChange={(e) => setForm({ ...form, companyDepartment: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Place</label>
                  <input
                    type="text"
                    value={form.companyPlace}
                    onChange={(e) => setForm({ ...form, companyPlace: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-semibold mb-4 font-heading">If Enterpruner</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Business Name</label>
                  <input
                    type="text"
                    value={form.businessName}
                    onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Nature of Business</label>
                  <input
                    type="text"
                    value={form.natureOfBusiness}
                    onChange={(e) => setForm({ ...form, natureOfBusiness: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Place</label>
                  <input
                    type="text"
                    value={form.businessPlace}
                    onChange={(e) => setForm({ ...form, businessPlace: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Business Address</label>
              <textarea
                value={form.businessAddress}
                onChange={(e) => setForm({ ...form, businessAddress: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                rows="2"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Permanent Address</label>
              <textarea
                value={form.permanentAddress}
                onChange={(e) => setForm({ ...form, permanentAddress: e.target.value })}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
                rows="2"
              />
            </div>

            <div className="border-t pt-6">
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="checkbox"
                  id="willProvideServices"
                  checked={willProvideServices}
                  onChange={(e) => {
                    setWillProvideServices(e.target.checked);
                    if (!e.target.checked) setForm({ ...form, servicesOffered: '' });
                  }}
                  className="w-4 h-4 text-secondary rounded focus:ring-2 focus:ring-secondary"
                />
                <label htmlFor="willProvideServices" className="text-sm font-medium cursor-pointer">
                  Are you willing to provide services to friends & alumni?
                </label>
              </div>

              {willProvideServices && (
                <div>
                  <label className="block text-sm font-medium mb-2">What kind of services can you provide? Please describe here:</label>
                  <textarea
                    value={form.servicesOffered}
                    onChange={(e) => setForm({ ...form, servicesOffered: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-secondary"
                    rows="3"
                    placeholder="E.g., Career guidance, mentorship, technical training, business consultation, etc."
                  />
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Photo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary bg-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-primary/5 file:text-primary file:cursor-pointer hover:file:bg-primary/10"
              />
              {form.photoUrl && (
                <img src={form.photoUrl} alt="Preview" className="mt-3 w-20 h-20 object-cover rounded border" />
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-secondary text-white py-3 rounded-lg font-semibold hover:bg-secondary/90 transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2 font-heading">Success!</h3>
            <p className="text-gray-600 mb-6 font-body">Your volunteer registration has been submitted successfully.</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-secondary text-white px-6 py-2 rounded-lg hover:bg-secondary/90 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerPage;







