const API_BASE_URL = import.meta.env.VITE_API_URL;

export const createVolunteer = async (volunteerData) => {
  const response = await fetch(`${API_BASE_URL}/volunteer`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(volunteerData),
  });
  
  console.log('Response status:', response.status);
  console.log('Response ok:', response.ok);
  
  const data = await response.json().catch((e) => {
    console.log('JSON parse error:', e);
    return { message: 'Failed to create volunteer' };
  });
  
  console.log('Response data:', data);
  
  if (!response.ok) {
    throw new Error(data.message || 'Failed to create volunteer');
  }
  
  return data;
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

export const toggleVolunteerActive = async (id) => {
  const response = await fetch(`${API_BASE_URL}/volunteer/${id}/toggle-active`, {
    method: 'PATCH',
  });
  if (!response.ok) throw new Error('Failed to toggle volunteer status');
  return response.json();
};

export const resetVolunteerPassword = async (email) => {
  const response = await fetch(`${API_BASE_URL}/volunteer/reset-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) throw new Error('Failed to reset password');
  return response.json();
};

export const updateVolunteerPassword = async (token, volunteerId, newPassword) => {
  const response = await fetch(`${API_BASE_URL}/volunteer/update-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token, volunteerId, newPassword }),
  });
  if (!response.ok) throw new Error('Failed to update password');
  return response.json();
};
