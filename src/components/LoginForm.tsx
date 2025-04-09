import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { useAuth } from "../context/AuthContext"; 
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

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
  const [isLoading, setIsLoading] = useState<boolean>(false); // État pour le chargement
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setMessage("");
    setIsLoading(true); // Activer le loader

    try {
      await login(formData.email, formData.password);
      navigate("/dashboard"); 
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || "Erreur lors de la connexion.");
      console.error("Erreur de connexion :", error);
    } finally {
      setIsLoading(false); // Désactiver le loader
    }
  };

  // Animation d'apparition pour le formulaire
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  // Animation pour les champs de formulaire
  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
    focus: {
      scale: 1.02,
      borderColor: "#000000",
      transition: { duration: 0.3 },
    },
  };

  // Animation pour le bouton
  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.98, transition: { duration: 0.2 } },
    pulse: {
      boxShadow: [
        "0px 0px 0px rgba(0, 0, 0, 0)",
        "0px 0px 20px rgba(0, 0, 0, 0.3)",
        "0px 0px 0px rgba(0, 0, 0, 0)",
      ],
      transition: { duration: 1.5, repeat: Infinity },
    },
  };

  // Animation pour le message de statut
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Animation pour le lien "Mot de passe oublié ?"
  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
    hover: {
      color: "#000000",
      transition: { duration: 0.3 },
    },
  };

  // Fonction pour répartir les particules de manière équilibrée
  const getParticlePosition = (index: number, total: number) => {
    const side = index % 2 === 0 ? "left" : "right"; // Alterne entre gauche et droite
    const xRange = side === "left" ? window.innerWidth * 0.4 : window.innerWidth * 0.6;
    const xOffset = Math.random() * (window.innerWidth * 0.2) - (window.innerWidth * 0.1); // Variation autour de la position
    return {
      x: xRange + xOffset,
      y: Math.random() * window.innerHeight,
    };
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Fond avec effet de particules et cercles flous */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-gray-100/50 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gray-200/50 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="w-full max-w-sm sm:max-w-md relative z-10"
      >
        <Card className="bg-white/90 backdrop-blur-lg border border-gray-200 rounded-2xl overflow-hidden">
          <CardHeader className="bg-white/95 py-6 px-6 text-center border-b border-gray-200">
            <CardTitle className="text-3xl font-extrabold text-black tracking-wide">
              Connexion
            </CardTitle>
            <CardDescription className="mt-2 text-gray-600 text-sm font-medium">
              Accédez à votre espace de gestion
            </CardDescription>
          </CardHeader>

          <CardContent className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                whileFocus="focus"
                className="space-y-2"
              >
                <Label htmlFor="email" className="text-black font-medium text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Entrez votre email"
                  className="w-full bg-white text-black border border-gray-300 rounded-lg focus:border-black focus:ring-0 placeholder-gray-500 transition-all duration-300"
                  required
                />
              </motion.div>

              <motion.div
                variants={inputVariants}
                initial="hidden"
                animate="visible"
                whileFocus="focus"
                className="space-y-2"
              >
                <Label htmlFor="password" className="text-black font-medium text-sm">
                  Mot de passe
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Entrez votre mot de passe"
                  className="w-full bg-white text-black border border-gray-300 rounded-lg focus:border-black focus:ring-0 placeholder-gray-500 transition-all duration-300"
                  required
                />
              </motion.div>

              <motion.div
                whileHover="hover"
                whileTap="tap"
                animate="pulse"
                variants={buttonVariants}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-black text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>{isLoading ? "Connexion..." : "Se connecter"}</span>
                  {isLoading && (
                    <motion.div
                      className="w-5 h-5 border-2 border-t-transparent border-white rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </Button>
              </motion.div>
            </form>

            {/* Lien "Mot de passe oublié ?" */}
            <motion.div
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="mt-4 text-center"
            >
              <Link
                to="/forgot-password"
                className="text-gray-600 text-sm font-medium relative inline-block group"
              >
                Mot de passe oublié ?
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-black transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>

            <AnimatePresence>
              {status && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={messageVariants}
                  className={`mt-6 p-4 rounded-lg border border-gray-200 ${
                    status === "success"
                      ? "bg-green-50/50 text-green-800"
                      : "bg-red-50/50 text-red-800"
                  }`}
                >
                  <p className="text-sm font-medium">{message}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>

      {/* Effet de particules flottantes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gray-500 rounded-full"
            initial={getParticlePosition(i, 30)}
            animate={{
              y: [
                null,
                Math.random() * window.innerHeight * 0.8, // Limiter l'amplitude sur l'axe y
              ],
              x: [
                null,
                getParticlePosition(i, 30).x + (Math.random() * 200 - 100), // Mouvement horizontal équilibré
              ],
              opacity: [0.5, 1, 0.5],
              transition: {
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 3,
              },
            }}
          />
        ))}
      </div>
    </div>
  );
};