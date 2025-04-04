import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../components/ui/card";
import { login } from "../services/authServices"; 
interface LoginResponse {
  message?: string;
  data?: any;
  token?: string;
}

type Status = "success" | "error" | null;

export const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [status, setStatus] = useState<Status>(null);
  const [message, setMessage] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setMessage("");

    try {
      const response: LoginResponse = await login(formData.email, formData.password);
      setStatus("success");
      setMessage(response.message || "Connexion réussie !");
      console.log("Données de connexion :", response.data);
      console.log("Token JWT :", response.token);
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Erreur lors de la connexion.");
      console.error("Erreur de connexion :", error);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="w-full max-w-md"
      >
        <Card className="relative bg-white/95 backdrop-blur-md shadow-2xl rounded-xl border border-gray-200/50 overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-6 px-6 text-center rounded-t-xl">
            <CardTitle className="text-2xl font-extrabold tracking-tight">
              Connexion
            </CardTitle>
            <CardDescription className="mt-2 text-blue-100 text-base font-medium">
              Connectez-vous pour gérer votre école
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-800 font-medium">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Entrez votre email"
                  className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-800 font-medium">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Entrez votre mot de passe"
                  className="w-full rounded-lg border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-200 shadow-sm"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:from-indigo-700 hover:to-blue-700 transition-all duration-300"
              >
                Se connecter
              </Button>
            </form>

            {status && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className={`mt-6 p-4 rounded-lg shadow-sm border ${
                  status === "success"
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <p className="text-sm font-medium">{message}</p>
              </motion.div>
            )}
          </CardContent>

          <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-300/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-300/20 rounded-full blur-3xl pointer-events-none" />
        </Card>
      </motion.div>
    </div>
  );
};
