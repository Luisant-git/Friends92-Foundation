const BASE_URL = `${import.meta.env.VITE_API_URL}/placement`;

/**
 * Create a new placement
 */
export const createPlacement = async (data) => {
  try {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create placement");
    return await res.json();
  } catch (error) {
    throw error;
  }
};

/**
 * Get all placements
 */
export const getPlacements = async () => {
  try {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error("Failed to fetch placements");
    return await res.json();
  } catch (error) {
    throw error;
  }
};

/**
 * Get only active placements (status = true)
 */
export const getActivePlacements = async () => {
  try {
    const res = await fetch(`${BASE_URL}/active`);
    if (!res.ok) throw new Error("Failed to fetch active placements");
    return await res.json();
  } catch (error) {
    throw error;
  }
};



/**
 * Get placement by ID
 */
export const getPlacementById = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("Failed to fetch placement");
    return await res.json();
  } catch (error) {
    throw error;
  }
};


/**
 * Update placement by ID
 */
export const updatePlacement = async (id, data) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update placement");
    return await res.json();
  } catch (error) {
    throw error;
  }
};

/**
 * Delete placement by ID
 */
export const deletePlacement = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete placement");
    return await res.json();
  } catch (error) {
    throw error;
  }
};
