const API_URL = import.meta.env.VITE_API_URL;

/**
 * Upload an image to the backend.
 * @param {File} imageFile - The image file to upload.
 * @returns {Promise<{ filename: string, url: string }>} The uploaded file info.
 */
export async function uploadImage(imageFile) {
  if (!imageFile) throw new Error("No image file provided");

  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await fetch(`${API_URL}/upload/image`, {
      method: "POST",
      body: formData, // don't set Content-Type; browser handles it
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Image upload failed: ${errorText}`);
    }

    const data = await response.json();
    console.log("Image uploaded:", data);
    return data; // contains { filename, url }
  } catch (error) {
    console.error("Upload error:", error);
    throw error;
  }
}
