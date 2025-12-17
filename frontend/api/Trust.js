const BASE_URL = import.meta.env.VITE_API_URL;

export async function createTrust(data) {
  const res = await fetch(`${BASE_URL}/trust`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create trust");
  return res.json();
}

export async function getTrust() {
  const res = await fetch(`${BASE_URL}/trust`);
  if (!res.ok) throw new Error("Failed to fetch trust");
  return res.json();
}

export async function updateTrust(id, data) {
  const res = await fetch(`${BASE_URL}/trust/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update trust");
  return res.json();
}

export async function deleteTrust(id) {
  const res = await fetch(`${BASE_URL}/trust/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete trust");
  return res.json();
}