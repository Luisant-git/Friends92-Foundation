const BASE_URL = import.meta.env.VITE_API_URL;

export async function createDonation(data) {
  const res = await fetch(`${BASE_URL}/donation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create donation");
  return res.json();
}

export async function getDonations() {
  const res = await fetch(`${BASE_URL}/donation`);
  if (!res.ok) throw new Error("Failed to fetch donations");
  return res.json();
}
