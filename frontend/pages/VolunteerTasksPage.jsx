import React, { useState, useEffect } from 'react';
import { getVolunteerTasks, updateTaskStatus } from '../api/Task';

const VolunteerTasksPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedTask, setSelectedTask] = useState(null);
  const [comment, setComment] = useState('');
  const [images, setImages] = useState([null, null, null]);
  const [uploading, setUploading] = useState(false);
  const [impactTitle, setImpactTitle] = useState('');
  const [impactDescription, setImpactDescription] = useState('');
  const [impactField, setImpactField] = useState('');

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

  const handleImageUpload = async (file, index) => {
    if (!file) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/upload/image`, {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setImages(prev => {
        const newImages = [...prev];
        const emptyIndex = newImages.findIndex(img => img === null);
        if (emptyIndex !== -1) {
          newImages[emptyIndex] = data.url;
        }
        return newImages;
      });
    } catch (err) {
      setError('Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  const handleStatusUpdate = async (taskId, status) => {
    setLoading(true);
    setError('');
    try {
      const validImageUrls = images.filter(url => url !== null);
      await updateTaskStatus(taskId, status, comment, validImageUrls, impactTitle, impactDescription, impactField);
      setComment('');
      setImages([null, null, null]);
      setImpactTitle('');
      setImpactDescription('');
      setImpactField('');
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
              <div className="flex gap-4 text-sm text-gray-500 mb-4">
                <p>Assigned: {new Date(task.createdAt).toLocaleDateString('en-GB')}</p>
                {task.deadline && <p>Deadline: {new Date(task.deadline).toLocaleDateString('en-GB')}</p>}
              </div>

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

              {task.imageUrls && task.imageUrls.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Images:</p>
                  <div className="flex gap-2">
                    {task.imageUrls.map((url, idx) => (
                      <img key={idx} src={url} alt={`Task ${idx + 1}`} className="w-20 h-20 object-cover rounded" />
                    ))}
                  </div>
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
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
            <h3 className="text-xl font-bold mb-4">Complete Task</h3>
            <input
              type="text"
              value={impactTitle}
              onChange={(e) => setImpactTitle(e.target.value)}
              placeholder="Title"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 mb-3"
            />
            <textarea
              value={impactDescription}
              onChange={(e) => setImpactDescription(e.target.value)}
              placeholder="Description"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 mb-3"
              rows="4"
            />
            <textarea
              value={impactField}
              onChange={(e) => setImpactField(e.target.value)}
              placeholder="Impact"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 mb-3"
              rows="4"
            />
            <p className="text-sm font-medium text-gray-700 mb-2">Upload Images (up to 3):</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file && images.filter(img => img).length < 3) {
                  handleImageUpload(file, 0);
                }
                e.target.value = '';
              }}
              disabled={images.filter(img => img).length >= 3}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:bg-blue-50 file:text-blue-700 file:cursor-pointer hover:file:bg-blue-100 mb-2"
            />
            {uploading && <p className="text-sm text-blue-600 mb-2">Uploading...</p>}
            {images.some(img => img) && (
              <div className="flex gap-2 mb-4">
                {images.map((img, idx) => img && (
                  <div key={idx} className="relative">
                    <img src={img} alt={`Upload ${idx + 1}`} className="w-20 h-20 object-cover rounded" />
                    <button
                      onClick={() => setImages(prev => prev.map((item, i) => i === idx ? null : item))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => { setSelectedTask(null); setComment(''); setImages([null, null, null]); setImpactTitle(''); setImpactDescription(''); setImpactField(''); }}
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
