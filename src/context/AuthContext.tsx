import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login as loginService, getUserInfo } from "../services/authServices";

interface User {
  token: string;
  name?: string;
  email?: string;
  school?: {
    _id: string;
    name?: string;
  };
}

interface AuthContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  token: string | null;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Charger les données depuis localStorage au démarrage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    console.log("Stored token:", storedToken);
    console.log("Stored user:", storedUser ? JSON.parse(storedUser) : null);
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    } else if (storedToken) {
      const fetchUserInfo = async () => {
        try {
          console.log("Appel de getUserInfo avec token:", storedToken);
          const userData = await getUserInfo(storedToken);
          console.log("Données reçues de getUserInfo:", userData);
          setUser({ ...userData.user, token: storedToken });
          localStorage.setItem("user", JSON.stringify({ ...userData.user, token: storedToken }));
          setToken(storedToken);
          setIsAuthenticated(true);
        } catch (err) {
          console.error("Erreur lors de la récupération des infos user:", err);
          logout();
        }
      };
      fetchUserInfo();
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginService(email, password);
      console.log("Réponse de loginService:", response);
      const { token, user: userData } = response;
      console.log("Données utilisateur pour setUser:", userData);
      const userWithToken = { ...userData, token };
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(userWithToken));
      setToken(token);
      setUser(userWithToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Erreur lors de la connexion:", error);
      throw error;
    }
  };

  const logout = () => {
    console.log("Déconnexion - Suppression de localStorage");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
  };

  // Log pour déboguer les changements de user
  useEffect(() => {
    console.log("État actuel de user:", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, token, user }}>
      {children}
    </AuthContext.Provider>
  );
};