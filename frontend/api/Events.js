const API_URL = import.meta.env.VITE_API_URL;

export async function createEvent(eventData) {
  try {
    const response = await fetch(`${API_URL}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create event");
    }

    return await response.json();
  } catch (error) {
    console.error("Create event error:", error.message);
    throw error;
  }
}

export async function getEvents() {
  try {
    const response = await fetch(`${API_URL}/events`);
    
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }

    return await response.json();
  } catch (error) {
    console.error("Get events error:", error.message);
    throw error;
  }
}

export async function updateEvent(id, eventData) {
  try {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update event");
    }

    return await response.json();
  } catch (error) {
    console.error("Update event error:", error.message);
    throw error;
  }
}

export async function deleteEvent(id) {
  try {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to delete event");
    }

    return await response.json();
  } catch (error) {
    console.error("Delete event error:", error.message);
    throw error;
  }
}