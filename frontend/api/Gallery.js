const BASE_URL = "http://localhost:3000";

// 1️⃣ Upload Image
export async function uploadImage(file) {
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`${BASE_URL}/upload/image`, {
    method: "POST",
    body: formData,
  });

  return res.json();
}

// 2️⃣ Create Gallery Item
export async function createGallery(data) {
  const res = await fetch(`${BASE_URL}/gallery`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
}

// 3️⃣ Get All Gallery Items
export async function getGallery() {
  const res = await fetch(`${BASE_URL}/gallery`);
  return res.json();
}

export async function getGalleryLimit() {
  const res = await fetch(`${BASE_URL}/gallery/limit`);
  return res.json();
}

// Update gallery
export async function updateGallery(id, data) {
  const res = await fetch(`${BASE_URL}/gallery/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Update failed");
  return res.json();
}
// 4️⃣ Delete Gallery Item
export async function deleteGallery(id) {
  const res = await fetch(`${BASE_URL}/gallery/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
