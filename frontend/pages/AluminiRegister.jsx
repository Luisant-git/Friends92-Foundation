import React, { useState } from "react";
import { createAlumni } from "../api/Alumini";
import { createVolunteer } from "../api/Volunteer";
import { uploadImage } from "../api/Upload";

const AluminiRegister = () => {
  const [form, setForm] = useState({
    name: "",
    department: "",
    year: "",
    mobile: "",
    city: "",
    mobile2: "",
    email: "",
    profession: "",
    bloodGroup: "",
    companyName: "",
    designation: "",
    companyDepartment: "",
    companyPlace: "",
    businessName: "",
    natureOfBusiness: "",
    businessPlace: "",
    businessAddress: "",
    permanentAddress: "",
    servicesOffered: "",
    photoUrl: "",
    service: ""
  });

  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [willProvideServices, setWillProvideServices] = useState(false);
  const [photoFile, setPhotoFile] = useState(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1970 + 1 },
    (_, i) => 1970 + i
  );
  const departments = ["DAE", "DCE", "DCSE", "DEE", "DECE", "DIT", "DME"];

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

    if (!/^\d{10}$/.test(form.mobile)) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    setLoading(true);
    try {
      const res = await createAlumni({ name: form.name, department: form.department, year: Number(form.year), mobile: form.mobile, city: form.city });

      if (res?.success === false) {
        alert(res.message || "Registration failed");
        return;
      }

      if (willProvideServices) {
        await createVolunteer({
          name: form.name,
          service: form.service,
          mobile1: form.mobile,
          mobile2: form.mobile2,
          email: form.email,
          profession: form.profession,
          companyName: form.companyName,
          designation: form.designation,
          companyDepartment: form.companyDepartment,
          companyPlace: form.companyPlace,
          businessName: form.businessName,
          natureOfBusiness: form.natureOfBusiness,
          businessPlace: form.businessPlace,
          businessAddress: form.businessAddress,
          permanentAddress: form.permanentAddress,
          servicesOffered: form.servicesOffered,
          photoUrl: form.photoUrl
        });
      }

      setShowSuccess(true);
      window.dispatchEvent(new Event("alumniListUpdated"));
      setForm({ name: "", department: "", year: "", mobile: "", city: "", mobile2: "", email: "", profession: "", bloodGroup: "", companyName: "", designation: "", companyDepartment: "", companyPlace: "", businessName: "", natureOfBusiness: "", businessPlace: "", businessAddress: "", permanentAddress: "", servicesOffered: "", photoUrl: "", service: "" });
      setWillProvideServices(false);
      setPhotoFile(null);
    } catch (err) {
      alert("Registration Failed!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-slate-700 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">Alumni Section</h1>
          <p className="text-xl text-blue-100">Connect with your alma mater</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold mb-6">Alumni Registration Form</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>


              <div>
                <label className="block text-sm font-medium mb-2">Email *</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Department *</label>
                <select
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Passed Out Year *</label>
                <select
                  value={form.year}
                  onChange={(e) => setForm({ ...form, year: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Passed Out Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>


              <div>
                <label className="block text-sm font-medium mb-2">Mobile Number 2</label>
                <input
                  type="tel"
                  value={form.mobile2}
                  onChange={(e) => setForm({ ...form, mobile2: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Current Location *</label>
                <input
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Profession</label>
                <input
                  type="text"
                  value={form.profession}
                  onChange={(e) => setForm({ ...form, profession: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Blood Group</label>
                <select
                  value={form.bloodGroup}
                  onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
                  className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Blood Group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="bloodDonor"
                    className="w-4 h-4 text-red-600 rounded focus:ring-2 focus:ring-red-500"
                  />
                  <label htmlFor="bloodDonor" className="text-sm font-medium cursor-pointer">
                    Are you willing to donate blood in emergency situations?
                  </label>
                </div>
              </div>
            </div>

            {/* Volunteer Fields - Always Visible */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Photo</label>
                <input type="file" accept="image/*" onChange={handlePhotoChange} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 bg-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-green-50 file:text-green-700 file:cursor-pointer hover:file:bg-green-100" />
                {form.photoUrl && <img src={form.photoUrl} alt="Preview" className="mt-3 w-20 h-20 object-cover rounded border" />}
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">What kind of services can you provide?</label>
                <textarea value={form.servicesOffered} onChange={(e) => setForm({ ...form, servicesOffered: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500" rows="3" placeholder="E.g., Career guidance, mentorship, technical training, business consultation, etc." />
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">If Employee</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Company Name</label>
                    <input type="text" value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Designation</label>
                    <input type="text" value={form.designation} onChange={(e) => setForm({ ...form, designation: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Department</label>
                    <input type="text" value={form.companyDepartment} onChange={(e) => setForm({ ...form, companyDepartment: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Place</label>
                    <input type="text" value={form.companyPlace} onChange={(e) => setForm({ ...form, companyPlace: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold mb-4">If Entrepreneur</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Business Name</label>
                    <input type="text" value={form.businessName} onChange={(e) => setForm({ ...form, businessName: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Nature of Business</label>
                    <input type="text" value={form.natureOfBusiness} onChange={(e) => setForm({ ...form, natureOfBusiness: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Place</label>
                    <input type="text" value={form.businessPlace} onChange={(e) => setForm({ ...form, businessPlace: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Business Address</label>
                <textarea value={form.businessAddress} onChange={(e) => setForm({ ...form, businessAddress: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500" rows="2" />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Permanent Address</label>
                <textarea value={form.permanentAddress} onChange={(e) => setForm({ ...form, permanentAddress: e.target.value })} className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500" rows="2" />
              </div>
            </div>

            <div className="border-t pt-6" id="volunteer">
              <div className="flex items-center gap-3 mb-4">
                <input
                  type="checkbox"
                  id="willProvideServices"
                  checked={willProvideServices}
                  onChange={(e) => setWillProvideServices(e.target.checked)}
                  className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
                />
                <label htmlFor="willProvideServices" className="text-sm font-medium cursor-pointer">
                  Are you willing to provide services to friends & alumni?
                </label>
              </div>

              {willProvideServices && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Service Area *</label>
                    <select
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500"
                      required={willProvideServices}
                    >
                      <option value="">Select Service</option>
                      <option value="Education">Education</option>
                      <option value="Health">Health</option>
                      <option value="Environment">Environment</option>
                      <option value="Women & Child Welfare">Women & Child Welfare</option>
                      <option value="Disaster Relief">Disaster Relief</option>
                    </select>
                  </div>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-2">Success!</h3>
            <p className="text-gray-600 mb-6">Your alumni registration has been submitted successfully.</p>
            <button
              onClick={() => setShowSuccess(false)}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AluminiRegister;
