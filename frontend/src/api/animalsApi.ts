import api from "./axiosInstance";

export const fetchAnimals = async (queryParams?: Record<string, string | number>) => {
  try {
    let queryString = '';
    if (queryParams) {
      const params = new URLSearchParams();
      Object.entries(queryParams).forEach(([key, value]) => {
        params.append(key, String(value));
      });
      queryString = '?' + params.toString();
    }
    
    const response = await api.get(`/animals${queryString}`);
    console.log("API Response:", response); // Debug log
    
    // Based on your API structure: { data: [...], pagination: {...} }
    return response.data.data; // This should return the animals array
    
  } catch (error) {
    console.error("Error in fetchAnimals:", error);
    throw error;
  }
};