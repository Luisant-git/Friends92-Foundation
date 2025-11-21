// Gallery.js
const BASE_URL = import.meta.env.VITE_API_URL;

// Upload image
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/upload/image`, {
    method: "POST",
    body: formData,
  });
  return res.json();
}

// Create gallery item
export async function createGallery(data) {
  // data = { title, categoryId, imageUrl }
  const res = await fetch(`${BASE_URL}/gallery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
}

// Get all gallery items
export async function getGallery() {
  const res = await fetch(`${BASE_URL}/gallery`);
  return res.json(); // returns gallery items with category objects
}

// Get all gallery items
export async function getGalleryLimit() {
  const res = await fetch(`${BASE_URL}/gallery/limit`);
  return res.json(); // returns gallery items with category objects
}

// Update gallery item
export async function updateGallery(id, data) {
  const res = await fetch(`${BASE_URL}/gallery/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
}

// Delete gallery item
export async function deleteGallery(id) {
  const res = await fetch(`${BASE_URL}/gallery/${id}`, { method: "DELETE" });
  return res.json();
}

// Category.js
export async function createCategory(data) {
  const res = await fetch(`${BASE_URL}/category`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json(); // returns created category {id, name}
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/category`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json(); // returns array of categories [{id, name}]
}

export async function deleteCategory(id) {
  const res = await fetch(`${BASE_URL}/category/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
}
