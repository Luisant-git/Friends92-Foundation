const API_BASE_URL = import.meta.env.VITE_API_URL;

export const createTask = async (taskData) => {
  const response = await fetch(`${API_BASE_URL}/task`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(taskData),
  });
  if (!response.ok) throw new Error('Failed to create task');
  return response.json();
};

export const getVolunteerTasks = async (volunteerId) => {
  const response = await fetch(`${API_BASE_URL}/task/volunteer/${volunteerId}`);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
};

export const getAllTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/task`);
  if (!response.ok) throw new Error('Failed to fetch tasks');
  return response.json();
};

export const getCompletedTasks = async () => {
  const response = await fetch(`${API_BASE_URL}/task/completed`);
  if (!response.ok) throw new Error('Failed to fetch completed tasks');
  return response.json();
};

export const updateTaskStatus = async (id, status, comment) => {
  const response = await fetch(`${API_BASE_URL}/task/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, volunteerComment: comment }),
  });
  if (!response.ok) throw new Error('Failed to update task');
  return response.json();
};
