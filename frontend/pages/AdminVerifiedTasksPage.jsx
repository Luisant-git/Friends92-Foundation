import React, { useState, useEffect, useMemo } from 'react';
import { getVerifiedTasks } from '../api/Task';

const PAGE_SIZE = 10;

const AdminVerifiedTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewTask, setViewTask] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchVerifiedTasks();
  }, []);

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(task =>
        task.title?.toLowerCase().includes(term) ||
        task.volunteer?.name?.toLowerCase().includes(term) ||
        task.volunteer?.email?.toLowerCase().includes(term)
      );
    }

    if (dateFrom) {
      filtered = filtered.filter(task => new Date(task.updatedAt).toISOString().slice(0, 10) >= dateFrom);
    }

    if (dateTo) {
      filtered = filtered.filter(task => new Date(task.updatedAt).toISOString().slice(0, 10) <= dateTo);
    }

    return filtered;
  }, [tasks, searchTerm, dateFrom, dateTo]);

  const totalPages = Math.max(1, Math.ceil(filteredTasks.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedTasks = filteredTasks.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const fetchVerifiedTasks = async () => {
    try {
      const data = await getVerifiedTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load verified tasks');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-6 font-heading">Verified Tasks</h1>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Search</label>
            <input
              type="text"
              placeholder="Search by task title, volunteer name or email..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
              className="w-full max-w-2xl px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Completed From</label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => { setDateFrom(e.target.value); setCurrentPage(1); }}
                className="w-44 px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Completed To</label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => { setDateTo(e.target.value); setCurrentPage(1); }}
                className="w-44 px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
              />
            </div>
            {(searchTerm || dateFrom || dateTo) && (
              <button
                onClick={() => { setSearchTerm(""); setDateFrom(""); setDateTo(""); setCurrentPage(1); }}
                className="px-3 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
              >
                Clear All Filters
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-xl shadow-md border">
              <thead>
                <tr className="bg-primary/5 text-left">
                  <th className="p-3">S.No</th>
                  <th className="p-3">Task Title</th>
                  <th className="p-3">Volunteer</th>
                  <th className="p-3">Assigned Date</th>
                  <th className="p-3">Deadline</th>
                  <th className="p-3">Completed</th>
                  <th className="p-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTasks.map((task, index) => (
                  <tr key={task.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{(safePage - 1) * PAGE_SIZE + index + 1}</td>
                    <td className="p-3">{task.title}</td>
                    <td className="p-3">
                      <div>{task.volunteer.name}</div>
                      <div className="text-sm text-gray-500">{task.volunteer.email}</div>
                    </td>
                    <td className="p-3 text-sm">{new Date(task.createdAt).toLocaleDateString('en-GB')}</td>
                    <td className="p-3 text-sm">{task.deadline ? new Date(task.deadline).toLocaleDateString('en-GB') : 'N/A'}</td>
                    <td className="p-3 text-sm">{new Date(task.updatedAt).toLocaleDateString('en-GB')}</td>
                    <td className="p-3">
                      <button
                        onClick={() => setViewTask(task)}
                        className="text-primary hover:text-primary"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
                {filteredTasks.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      {searchTerm || dateFrom || dateTo
                        ? 'No verified tasks found matching your search/filter criteria'
                        : 'No verified tasks yet'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
            {filteredTasks.length > PAGE_SIZE && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between flex-wrap gap-4">
                <p className="text-sm text-gray-500">
                  Showing <span className="font-medium">{Math.min((safePage - 1) * PAGE_SIZE + 1, filteredTasks.length)}</span> to{' '}
                  <span className="font-medium">{Math.min(safePage * PAGE_SIZE, filteredTasks.length)}</span> of{' '}
                  <span className="font-medium">{filteredTasks.length}</span> tasks
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handlePageChange(safePage - 1)}
                    disabled={safePage === 1}
                    className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg ${
                        page === safePage
                          ? 'bg-primary text-white'
                          : 'border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(safePage + 1)}
                    disabled={safePage === totalPages}
                    className="px-3 py-1.5 text-sm font-medium border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {viewTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4 font-heading">Task Details</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <p className="text-gray-900 font-body">{viewTask.title}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <p className="text-gray-900 whitespace-pre-wrap font-body">{viewTask.description}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Volunteer</label>
                <p className="text-gray-900 font-body">{viewTask.volunteer.name} ({viewTask.volunteer.email})</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assigned Date</label>
                <p className="text-gray-900 font-body">{new Date(viewTask.createdAt).toLocaleDateString('en-GB')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
                <p className="text-gray-900 font-body">{viewTask.deadline ? new Date(viewTask.deadline).toLocaleDateString('en-GB') : 'N/A'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Completed On</label>
                <p className="text-gray-900 font-body">{new Date(viewTask.updatedAt).toLocaleDateString('en-GB')}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Volunteer Comment</label>
                <p className="text-gray-900 whitespace-pre-wrap font-body">{viewTask.volunteerComment || 'No comment'}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary">
                  Verified
                </span>
              </div>
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setViewTask(null)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminVerifiedTasksPage;







