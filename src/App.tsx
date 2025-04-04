import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { RegistrationForm } from "./components/RegistrationForm";
import { LoginForm } from "./components/LoginForm";
import { DataTable } from "./components/DataTable";
import { columns } from "./components/columns";
import { users } from "./data/users";

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

// Composant Dashboard
const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Dashboard</h1>
        <div className="rounded-xl overflow-hidden backdrop-blur-sm bg-white/70 border border-gray-100 shadow-lg">
          <DataTable 
            columns={columns} 
            data={users} 
            searchPlaceholder="Search users..."
            searchColumn="name"
          />
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Routes */}
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/" element={<Home />} /> {/* Page d'accueil par défaut */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
