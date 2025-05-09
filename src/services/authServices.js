import axios from "axios";

const API_URL = "http://localhost:5000/api"; 

// Configurer l'intercepteur pour ajouter le token à chaque requête
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Fonction d'inscription d'une école et de son admin
export const registerSchool = async (schoolData, adminData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, { schoolData, adminData });
        return response.data; // Retourne la réponse de l'API
    } catch (error) {
        throw error.response?.data || { message: "Une erreur est survenue" };
    }
};

export const getUserInfo = async (token) => {
  const res = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("Réponse de getUserInfo:", res.data); 
  return res.data;
};

// Nouvelle fonction de connexion
export const login = async (email, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password });
      const token = response.data.token;
      localStorage.setItem("token", token);
      console.log("Réponse de loginService:", response.data); // Ajoute ce log
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

// 1. Envoyer le code de réinitialisation
export const sendResetCode = async (email) => {
  try {
      const response = await axios.post(`${API_URL}/send-reset-code`, { email });
      return response.data;
  } catch (error) {
      throw error.response?.data || { message: "Une erreur est survenue" };
  }
};

// 2. Vérifier le code de réinitialisation
export const verifyResetCode = async (email, code) => {
  try {
      const response = await axios.post(`${API_URL}/verify-reset-code`, { email, code });
      return response.data;
  } catch (error) {
      throw error.response?.data || { message: "Code invalide ou expiré" };
  }
};

// 3. Réinitialiser le mot de passe
export const resetPassword = async (email, code, newPassword) => {
  try {
      const response = await axios.post(`${API_URL}/reset-password`, {
          email,
          code,
          newPassword,
      });
      return response.data;
  } catch (error) {
      throw error.response?.data || { message: "Une erreur est survenue lors du changement de mot de passe" };
  }
};
