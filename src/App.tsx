import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { RegistrationForm } from "./components/RegistrationForm";
import { LoginForm } from "./components/LoginForm";
import { EmailConfirmationForm } from "./components/EmailConfirmationForm";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { Dashboard } from "./components/Dashboard";
import { Layout } from "./components/Layout";
import { Students } from "./components/Students";
import { Teachers } from "./components/Teachers";
import { Parents } from "./components/Parents";
import { Settings } from "./components/Setting";
import { Classrooms } from "./components/Classrooms";
import { AuthProvider, useAuth } from "@/context/AuthContext";

// Composant Home
const Home: React.FC = () => (
  <div className="flex items-center justify-center min-h-[calc(100vh-64px)]">
    <div className="text-center">
      <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
        Bienvenue sur Gestion École
      </h1>
      <p className="mt-4 text-lg text-gray-600 font-medium">
        Connectez-vous ou inscrivez votre établissement pour commencer.
      </p>
      <div className="mt-6 space-x-4">
        <Link
          to="/login"
          className="inline-block bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-700 transition-all duration-300"
        >
          Connexion
        </Link>
        <Link
          to="/register"
          className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all duration-300"
        >
          Inscription
        </Link>
      </div>
    </div>
  </div>
);

// Composant ProtectedLayout pour les routes nécessitant une sidebar
const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Layout>{children}</Layout>;
};

const App: React.FC = () => {
  return (
    <Router> {/* Router enveloppe tout */}
      <AuthProvider> {/* AuthProvider est maintenant à l'intérieur de Router */}
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/forgot-password" element={<ForgotPasswordForm />} />
            <Route path="/confirm-email" element={<EmailConfirmationForm />} />
            <Route path="/" element={<Home />} />

            <Route
              path="/dashboard"
              element={
                <ProtectedLayout>
                  <Dashboard />
                </ProtectedLayout>
              }
            />
            <Route
              path="/students"
              element={
                <ProtectedLayout>
                  <Students />
                </ProtectedLayout>
              }
            />
            <Route
              path="/teachers"
              element={
                <ProtectedLayout>
                  <Teachers />
                </ProtectedLayout>
              }
            />
            <Route
              path="/parents"
              element={
                <ProtectedLayout>
                  <Parents />
                </ProtectedLayout>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedLayout>
                  <Settings />
                </ProtectedLayout>
              }
            />
            <Route
              path="/classrooms"
              element={
                <ProtectedLayout>
                  <Classrooms/>
                </ProtectedLayout>
              }
            />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;