import React, { useState, useEffect } from 'react';
import { getVolunteerTasks } from '../api/Task';

const VolunteerDashboard = () => {
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    verifiedTasks: 0
  });
  const [tasks, setTasks] = useState([]);

  const verificationPercentage = stats.totalTasks > 0 
    ? Math.round((stats.verifiedTasks / stats.totalTasks) * 100) 
    : 0;

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const auth = JSON.parse(localStorage.getItem('volunteerAuth'));
      const taskData = await getVolunteerTasks(auth.id);
      setTasks(taskData);
      
      setStats({
        totalTasks: taskData.length,
        completedTasks: taskData.filter(t => t.status === 'COMPLETED').length,
        pendingTasks: taskData.filter(t => t.status !== 'COMPLETED' && t.status !== 'VERIFIED').length,
        verifiedTasks: taskData.filter(t => t.status === 'VERIFIED').length
      });
    } catch (err) {
      console.error('Failed to load stats', err);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Tasks</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.totalTasks}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Completed</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.completedTasks}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Pending Tasks</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.pendingTasks}</h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Verified Tasks</p>
              <h3 className="text-3xl font-bold text-gray-800">{stats.verifiedTasks}</h3>
            </div>
            <div className="bg-teal-100 p-3 rounded-full">
              <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-6 mb-6">
        <div className="md:col-span-3 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Task Verified Progress</h2>
          <div className="flex items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="transform -rotate-90 w-48 h-48">
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="#e5e7eb"
                  strokeWidth="16"
                  fill="none"
                />
                <circle
                  cx="96"
                  cy="96"
                  r="80"
                  stroke="#16a34a"
                  strokeWidth="16"
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 80}`}
                  strokeDashoffset={`${2 * Math.PI * 80 * (1 - verificationPercentage / 100)}`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-4xl font-bold text-gray-800">{verificationPercentage}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-7 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Task Timeline</h2>
          <div className="flex items-end justify-around h-64 border-b border-l border-gray-300 p-4">
            {tasks.slice(0, 5).map((task, index) => {
              const maxHeight = 200;
              const deadlineDate = task.deadline ? new Date(task.deadline).getTime() : 0;
              const completedDate = (task.status === 'COMPLETED' || task.status === 'VERIFIED') ? new Date(task.updatedAt).getTime() : 0;
              const heightRatio = deadlineDate > 0 ? Math.min((completedDate / deadlineDate) * maxHeight, maxHeight) : 0;
              
              return (
                <div key={task.id} className="flex flex-col items-center gap-2">
                  <div className="flex gap-1 items-end">
                    <div 
                      className="w-12 bg-blue-500 rounded-t" 
                      style={{ height: `${Math.max(deadlineDate > 0 ? 100 : 20, 20)}px` }}
                      title={`Deadline: ${task.deadline ? new Date(task.deadline).toLocaleDateString('en-GB') : 'N/A'}`}
                    ></div>
                    {(task.status === 'COMPLETED' || task.status === 'VERIFIED') && (
                      <div 
                        className="w-12 bg-green-500 rounded-t" 
                        style={{ height: `${Math.max(heightRatio, 20)}px` }}
                        title={`Completed: ${new Date(task.updatedAt).toLocaleDateString('en-GB')}`}
                      ></div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 text-center w-20 truncate">{task.title}</p>
                </div>
              );
            })}
          </div>
          <div className="flex justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded"></div>
              <span className="text-sm text-gray-600">Deadline</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">Completed</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
