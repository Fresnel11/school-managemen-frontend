import axios from "axios";

const API_URL = "http://localhost:5000/api/classrooms";

// Créer une classe
export const createClassroom = async (data) => {
  const response = await axios.post(`${API_URL}`, data);
  return response.data;
};

// Mettre à jour une classe
export const updateClassroom = async (id, data) => {
  const response = await axios.put(`${API_URL}/${id}`, data);
  return response.data;
};

// Récupérer toutes les classes
export const getAllClassrooms = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Récupérer une classe par ID
export const getClassroomById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

// Supprimer une classe
export const deleteClassroom = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
