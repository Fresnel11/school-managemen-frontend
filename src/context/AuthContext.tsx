import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login as loginService } from "../services/authServices"; // Importer votre service
import { useNavigate } from "react-router-dom";

// Définir le type du contexte
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
}

// Créer le contexte
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Hook personnalisé pour utiliser le contexte
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Fournisseur du contexte
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const navigate = useNavigate();

  // Vérifier si un token est présent dans localStorage au chargement
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginService(email, password); // Appeler votre service
      const { token } = response; // Supposons que l'API renvoie un token
      localStorage.setItem("authToken", token); // Stocker le token
      setToken(token);
      setIsAuthenticated(true);
      navigate("/dashboard"); // Rediriger vers le dashboard
    } catch (error) {
      throw error; // Laisser le composant appelant gérer l'erreur
    }
  };

  const logout = () => {
    localStorage.removeItem("authToken"); // Supprimer le token
    setToken(null);
    setIsAuthenticated(false);
    navigate("/login"); // Rediriger vers la page de connexion
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};