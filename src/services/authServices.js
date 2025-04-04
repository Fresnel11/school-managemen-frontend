import axios from "axios";

const API_URL = "http://localhost:5000/api"; 

// Fonction d'inscription d'une école et de son admin
export const registerSchool = async (schoolData, adminData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { schoolData, adminData });
        return response.data; // Retourne la réponse de l'API
    } catch (error) {
        throw error.response?.data || { message: "Une erreur est survenue" };
    }
};

// Nouvelle fonction de connexion
export const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Une erreur est survenue" };
    }
  };

  export const verifyEmail = async (email, code) => {
    try {
      const response = await axios.post(`${API_URL}/verify-email`, {
        email,
        verificationCode: code, 
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Une erreur est survenue" };
    }
  };

  export const resendVerificationCode = async (email) => {
    try {
        const response = await axios.post(`${API_URL}/resend-code`, { email });
        return response.data;
    } catch (error) {
        throw error.response?.data || { message: "Une erreur est survenue" };
    }
};

export const getEmailFromToken = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/get-email-token`, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    return response.data; 
  } catch (error) {
    throw error.response?.data || { message: "Une erreur est survenue" };
  }
};
