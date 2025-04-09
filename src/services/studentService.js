import axios from "axios";

// Remplacez cette URL par l'URL de votre backend
const API_URL = "http://localhost:5000/api/students";

// Récupérer tous les étudiants non archivés
export const getAllStudents = async () => {
  try {
    const response = await axios.get(API_URL);
    console.log("response", response.data);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des étudiants.");
  }
};

// Récupérer les étudiants archivés
export const getArchivedStudents = async () => {
  try {
    const response = await axios.get(`${API_URL}/archived`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération des étudiants archivés.");
  }
};

// Récupérer un étudiant par ID
export const getStudentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération de l'étudiant.");
  }
};

// Créer un étudiant
export const createStudent = async (studentData) => {
  try {
    const response = await axios.post(API_URL, studentData);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la création de l'étudiant.");
  }
};

// Mettre à jour un étudiant
export const updateStudent = async (id, studentData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, studentData);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la mise à jour de l'étudiant.");
  }
};

// Supprimer un étudiant
export const deleteStudent = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la suppression de l'étudiant.");
  }
};

// Archiver un étudiant
export const archiveStudent = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/archive`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de l'archivage de l'étudiant.");
  }
};

// Réinscrire un étudiant
export const reinscrireStudent = async (studentId, newClassroomId, startDate, endDate) => {
  try {
    const response = await axios.post(`${API_URL}/reinscrire`, {
      studentId,
      newClassroomId,
      startDate,
      endDate,
    });
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la réinscription de l'étudiant.");
  }
};

// Récupérer l'historique des inscriptions d'un étudiant
export const getStudentInscriptions = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}/inscriptions`);
    return response.data;
  } catch (error) {
    throw new Error("Erreur lors de la récupération de l'historique des inscriptions.");
  }
};
