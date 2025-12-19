import React, { useState, useEffect } from 'react';
import { getVolunteerTasks, updateTaskStatus } from '../api/Task';

const VolunteerTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem('volunteerAuth'));
      const data = await getVolunteerTasks(auth.id);
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
    }
  };

  const handleStatusUpdate = async (taskId, status) => {
    setLoading(true);
    setError('');
    try {
      await updateTaskStatus(taskId, status, comment);
      setComment('');
      setSelectedTask(null);
      fetchTasks();
    } catch (err) {
      setError('Failed to update task');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800';
      case 'COMPLETED': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-6">My Tasks</h2>

        {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}

        <div className="space-y-4">
          {tasks.map(task => (
            <div key={task.id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold">{task.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(task.status)}`}>
                  {task.status}
                </span>
              </div>
              <p className="text-gray-600 mb-4">{task.description}</p>
              {task.deadline && <p className="text-sm text-gray-500 mb-4">Deadline: {new Date(task.deadline).toLocaleDateString('en-GB')}</p>}

              {task.status !== 'COMPLETED' && (
                <div className="flex gap-2">
                  {task.status === 'PENDING' && (
                    <button
                      onClick={() => handleStatusUpdate(task.id, 'IN_PROGRESS')}
                      disabled={loading}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
                    >
                      Start Task
                    </button>
                  )}
                  {task.status === 'IN_PROGRESS' && (
                    <button
                      onClick={() => setSelectedTask(task)}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              )}

              {task.volunteerComment && (
                <div className="mt-4 p-3 bg-gray-50 rounded">
                  <p className="text-sm font-medium text-gray-700">Your Comment:</p>
                  <p className="text-sm text-gray-600">{task.volunteerComment}</p>
                </div>
              )}
            </div>
          ))}

          {tasks.length === 0 && (
            <div className="text-center py-12 text-gray-500">No tasks assigned yet</div>
          )}
        </div>
      </div>

      {selectedTask && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Complete Task</h3>
            <p className="text-gray-600 mb-4">Add a comment about the completed task:</p>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Enter your comment..."
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 mb-4"
              rows="4"
            />
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setSelectedTask(null); setComment(''); }}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Cancel
              </button>
              <button
                onClick={() => handleStatusUpdate(selectedTask.id, 'COMPLETED')}
                disabled={loading}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VolunteerTasksPage;
