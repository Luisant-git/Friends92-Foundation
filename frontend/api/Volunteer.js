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
