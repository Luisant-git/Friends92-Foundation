const BASE_URL = import.meta.env.VITE_API_URL;

export async function uploadReportFile(file) {
  const formData = new FormData();
  formData.append('file', file);
  
  const res = await fetch(`${BASE_URL}/reports/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to upload file");
  return res.json();
}

export async function createReport(data) {
  const formData = new FormData();
  formData.append('year', data.year);
  formData.append('title', data.title);
  if (data.size) formData.append('size', data.size);
  if (data.fileUrl) formData.append('fileUrl', data.fileUrl);
  
  const res = await fetch(`${BASE_URL}/reports`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create report");
  return res.json();
}

export async function getReports() {
  const res = await fetch(`${BASE_URL}/reports`);
  if (!res.ok) throw new Error("Failed to fetch reports");
  return res.json();
}

export async function updateReport(id, data) {
  const res = await fetch(`${BASE_URL}/reports/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to update report");
  return res.json();
}

export async function deleteReport(id) {
  const res = await fetch(`${BASE_URL}/reports/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete report");
  return res.json();
}