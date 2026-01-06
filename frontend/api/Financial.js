const BASE_URL = import.meta.env.VITE_API_URL;

export async function createFinancial(data) {
  const res = await fetch(`${BASE_URL}/financial`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create financial data");
  return res.json();
}

export async function getFinancial() {
  const res = await fetch(`${BASE_URL}/financial`);
  if (!res.ok) throw new Error("Failed to fetch financial data");
  return res.json();
}

export async function updateFinancial(id, data) {
  const res = await fetch(`${BASE_URL}/financial/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update financial data");
  return res.json();
}

export async function deleteFinancial(id) {
  const res = await fetch(`${BASE_URL}/financial/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete financial data");
  return res.json();
}