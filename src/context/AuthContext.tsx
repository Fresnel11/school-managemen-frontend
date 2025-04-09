import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login as loginService, getUserInfo } from "../services/authServices"; // Importer votre service


interface User {
    id: string;
    name: string;
    email: string;
  }
// Définir le type du contexte
interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
  user: User | null;
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
  const [user, setUser] = useState<User | null>(null);

  // Vérifier si un token est présent dans localStorage au chargement
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        try {
          setToken(storedToken);
          const userData = await getUserInfo(storedToken);
          setUser(userData.user);
          setIsAuthenticated(true);
        } catch (err) {
          console.error("Erreur lors de la récupération des infos user :", err);
          logout(); // Token expiré ou invalide → déconnexion
        }
      }
    };
  
    fetchUserInfo();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginService(email, password); // Appeler votre service
      const { token } = response;
      localStorage.setItem("token", token); // Stocker le token
      setToken(token);
      const userData = await getUserInfo(token);
      setUser(userData.user);;
      setIsAuthenticated(true);
    } catch (error) {
      throw error; // Laisser le composant appelant gérer l'erreur
    }
  };

  useEffect(() => {
    console.log("user", user);
    
  });

  const logout = () => {
    localStorage.removeItem("token"); // Supprimer le token
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, user }}>
      {children}
    </AuthContext.Provider>
  );
};