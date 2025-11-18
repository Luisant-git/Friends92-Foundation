const API_URL = import.meta.env.VITE_API_URL 

export async function getBanners() {
  const res = await fetch(`${API_URL}/banner`);
  if (!res.ok) throw new Error("Failed to fetch banners");
  return res.json();
}

export async function createBanner(bannerData) {
  const res = await fetch(`${API_URL}/banner`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bannerData),
  });
  if (!res.ok) throw new Error("Failed to create banner");
  return res.json();
}

export async function updateBanner(id, bannerData) {
  const res = await fetch(`${API_URL}/banner/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(bannerData),
  });
  if (!res.ok) throw new Error("Failed to update banner");
  return res.json();
}

export async function deleteBanner(id) {
  const res = await fetch(`${API_URL}/banner/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete banner");
  return res.json();
}
