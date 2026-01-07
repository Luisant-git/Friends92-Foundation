// Use environment variable for API URL
const API_URL = `${import.meta.env.VITE_API_URL}/alumni`;

// Create Alumni
export const createAlumni = async (data) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Failed to register alumni: ${res.statusText}`);
    }

    return await res.json();
  } catch (error) {
    console.error("Error creating alumni:", error);
    throw error;
  }
};

// Get all alumni
export const getAlumni = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch alumni list");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Delete alumni
export const deleteAlumni = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete alumni");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Filter alumni
export const filterAlumni = async (department, year) => {
  try {
    const params = new URLSearchParams();
    if (department) params.append("department", department);
    if (year) params.append("passedOutYear", year);

    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/alumni/filter?${params.toString()}`
    );
    if (!res.ok) throw new Error("Failed to fetch filtered alumni");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Update alumni
export const updateAlumni = async (id, data) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update alumni");
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
