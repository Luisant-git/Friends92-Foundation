const BASE_URL = import.meta.env.VITE_API_URL;

export async function createTeam(data) {
  const res = await fetch(`${BASE_URL}/team`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to create team member");
  return res.json();
}

export async function getTeam() {
  const res = await fetch(`${BASE_URL}/team`);
  if (!res.ok) throw new Error("Failed to fetch team");
  return res.json();
}

export async function updateTeam(id, data) {
  const res = await fetch(`${BASE_URL}/team/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update team member");
  return res.json();
}

export async function deleteTeam(id) {
  const res = await fetch(`${BASE_URL}/team/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete team member");
  return res.json();
}