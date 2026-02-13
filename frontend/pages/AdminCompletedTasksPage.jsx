import React, { useState, useEffect } from 'react';
import { getCompletedTasks, verifyTask } from '../api/Task';

const AdminCompletedTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewTask, setViewTask] = useState(null);

  useEffect(() => {
    fetchCompletedTasks();
  }, []);

  const fetchCompletedTasks = async () => {
    try {
      const data = await getCompletedTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load completed tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (id) => {
    try {
      await verifyTask(id);
      fetchCompletedTasks();
    } catch (err) {
      setError('Failed to verify task');
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold mb-6 font-heading">Completed Tasks</h1>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

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
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task, index) => (
                  <tr key={task.id} className="border-t hover:bg-gray-50">
                    <td className="p-3">{index + 1}</td>
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
                        className="text-primary hover:text-primary mr-2"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      </button>
                      <button
                        onClick={() => handleVerify(task.id)}
                        className="px-3 py-1 bg-secondary text-white text-sm rounded hover:bg-secondary/90"
                      >
                        Verify
                      </button>
                    </td>
                  </tr>
                ))}
                {tasks.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">
                      No completed tasks yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {viewTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold mb-4 font-heading">Task Details</h3>
            <div className="space-y-4">
              {viewTask.impactTitle && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <p className="text-gray-900 font-body">{viewTask.impactTitle}</p>
                </div>
              )}
              {viewTask.impactDescription && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <p className="text-gray-900 whitespace-pre-wrap font-body">{viewTask.impactDescription}</p>
                </div>
              )}
              {viewTask.impactField && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Impact</label>
                  <p className="text-gray-900 whitespace-pre-wrap font-body">{viewTask.impactField}</p>
                </div>
              )}
              {viewTask.imageUrls && viewTask.imageUrls.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Images</label>
                  <div className="flex gap-2 flex-wrap">
                    {viewTask.imageUrls.map((url, idx) => (
                      <img key={idx} src={url} alt={`Task ${idx + 1}`} className="w-32 h-32 object-cover rounded" />
                    ))}
                  </div>
                </div>
              )}
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

export default AdminCompletedTasksPage;







