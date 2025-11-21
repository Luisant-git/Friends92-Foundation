import { MapPin, Briefcase, Building2, Mail, Phone } from "lucide-react";

import { useEffect, useState } from "react";
import { getActivePlacements } from "../api/Placement";

export default function PlacementPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchActiveJobs();
  }, []);

  const fetchActiveJobs = async () => {
    try {
      const data = await getActivePlacements();
      setJobs(data);
    } catch (err) {
      setError("Failed to load job listings");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-600">Loading jobs...</p>;

  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <div className="bg-gray-50 min-h-screen px-4 sm:px-6 py-6">
      {/* CENTER CONTENT */}
      <div className="max-w-5xl mx-auto space-y-6">
        {jobs.map((job) => (
          <div
            key={job.id}
            className="bg-white p-6 sm:p-8 rounded-3xl shadow-sm border border-gray-200 
            hover:shadow-lg transition-all flex flex-col lg:flex-row justify-between gap-6"
          >
            {/* LEFT SIDE JOB DETAILS */}
            <div className="w-full lg:w-2/3 space-y-4">
              <h2 className="text-3xl font-bold text-[#16a34a] leading-tight">
                {job.jobTitle}
              </h2>

              <div className="text-gray-700 space-y-1">
                <p className="text-base font-semibold flex items-center gap-2">
                  <Building2 size={18} className="text-[#16a34a]" />
                  {job.companyName}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <MapPin size={16} className="text-[#16a34a]" />
                  {job.companyLocation}
                </p>
              </div>

              <p className="text-gray-700 leading-relaxed">{job.companyDesc}</p>
              <p className="text-gray-700 leading-relaxed">
                {job.jobDescription}
              </p>
            </div>

            {/* RIGHT SIDE REQUIREMENTS */}
            <div className="w-full lg:w-1/3 bg-gray-50 border border-gray-200 rounded-2xl p-5 space-y-5 h-fit">
              <div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  Required Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {job.skills.map((skill, i) => (
                    <span
                      key={i}
                      className="text-sm bg-[#16a34a1a] text-[#16a34a] px-3 py-1 rounded-full border border-[#16a3493]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-1">Experience</h4>
                <p className="text-sm text-gray-700">{job.experience} yrs</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-gray-800 mb-1">
                  Contact Details
                </h4>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <Phone size={16} className="text-[#16a34a]" />
                  {job.companyContactNumber}
                </p>
                <p className="text-sm text-gray-700 flex items-center gap-2">
                  <Mail size={16} className="text-[#16a34a]" />
                  {job.companyEmail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
