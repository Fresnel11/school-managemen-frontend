import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import Navbar from "./components/landing/Navbar";
import HeroSection from "./components/landing/HeroSection";
import AboutSection from "./components/landing/AboutSection";
import FeaturesSection from "./components/landing/FeaturesSection";
import TestimonialsSection from "./components/landing/TestimonialsSection";
import ContactSection from "./components/landing/ContactSection";
import Footer from "./components/landing/Footer";

// Composant LandingPage pour la route racine
const LandingPage: React.FC = () => {
  useEffect(() => {
    document.title = 'EduManage - School Management System';
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
          <Navbar />
          <main>
            <HeroSection />
            <AboutSection />
            <FeaturesSection />
            <TestimonialsSection />
            <ContactSection />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </ThemeProvider>
  );
};

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
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <div className="min-h-screen bg-gray-50">
              <Routes>
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/forgot-password" element={<ForgotPasswordForm />} />
                <Route path="/confirm-email" element={<EmailConfirmationForm />} />
                <Route path="/" element={<LandingPage />} />

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
                      <Classrooms />
                    </ProtectedLayout>
                  }
                />
              </Routes>
            </div>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;