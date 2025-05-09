import axios from "axios";

const API_URL = "http://localhost:5000/api/classrooms";

// Fonction pour obtenir les headers avec le token
const getAuthHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// Créer une classe
export const createClassroom = async (classroomData) => {
  try {
    const response = await axios.post(`${API_URL}`, classroomData);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la création de la classe.");
  }
  
};

// Mettre à jour une classe
export const updateClassroom = async (id, data, token) => {
  const response = await axios.put(`${API_URL}/${id}`, data, getAuthHeaders(token));
  return response.data;
};

// Récupérer toutes les classes
export const getAllClassrooms = async (token) => {
  const response = await axios.get(`${API_URL}`, getAuthHeaders(token));
  return response.data;
};

// Récupérer une classe par ID
export const getClassroomById = async (id, token) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthHeaders(token));
  return response.data;
};

// Supprimer une classe
export const deleteClassroom = async (id, token) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthHeaders(token));
  return response.data;
};