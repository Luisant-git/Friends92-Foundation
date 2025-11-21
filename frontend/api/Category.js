// Use environment variable
const BASE_URL = import.meta.env.VITE_API_URL;

// 1️⃣ Create a new category
export async function createCategory(data) {
  const res = await fetch(`${BASE_URL}/category`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

// 2️⃣ Get all categories
export async function getCategories() {
  const res = await fetch(`${BASE_URL}/category`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

// 3️⃣ Delete category
export async function deleteCategory(id) {
  const res = await fetch(`${BASE_URL}/category/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
}
