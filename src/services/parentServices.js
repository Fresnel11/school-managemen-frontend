import axios from "axios";

const API_URL = "http://localhost:5000/api"; 
export const getAllParents = async () => {
  try {
    const response = await axios.get(`${API_URL}/parents`);
    return response.data; // Retourne la liste des parents
  } catch (error) {
    throw error.response?.data || { message: "Une erreur est survenue" };
  }
}