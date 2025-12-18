const API_BASE_URL = import.meta.env.VITE_API_URL;

export const createVolunteer = async (volunteerData) => {
  const response = await fetch(`${API_BASE_URL}/volunteer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(volunteerData),
  });
  if (!response.ok) throw new Error('Failed to create volunteer');
  return response.json();
};

export const getVolunteers = async () => {
  const response = await fetch(`${API_BASE_URL}/volunteer`);
  if (!response.ok) throw new Error('Failed to fetch volunteers');
  return response.json();
};

export const deleteVolunteer = async (id) => {
  const response = await fetch(`${API_BASE_URL}/volunteer/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete volunteer');
  return response.json();
};

export const approveVolunteer = async (id) => {
  const response = await fetch(`${API_BASE_URL}/volunteer/${id}/approve`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Failed to approve volunteer');
  return response.json();
};

export const activateVolunteer = async (id) => {
  const response = await fetch(`${API_BASE_URL}/volunteer/${id}/activate`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Failed to activate volunteer');
  return response.json();
};

export const volunteerLogin = async (email, password) => {
  const response = await fetch(`${API_BASE_URL}/volunteer/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Invalid credentials');
  return response.json();
};
