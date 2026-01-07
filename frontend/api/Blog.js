const API_URL = `${import.meta.env.VITE_API_URL}/blog`;

export const createBlog = async (data) => {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create blog');
  return res.json();
};

export const getBlogs = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error('Failed to fetch blogs');
  return res.json();
};

export const getBlog = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error('Failed to fetch blog');
  return res.json();
};

export const updateBlog = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update blog');
  return res.json();
};

export const deleteBlog = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete blog');
  return res.json();
};
