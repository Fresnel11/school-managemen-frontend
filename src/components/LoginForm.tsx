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
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Globe, Moon, Sun } from "lucide-react";
import { loginForm } from "../data/content";

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuth();
  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(null);
    setMessage("");
    setIsLoading(true);

    try {
      await login(formData.email, formData.password);
      setStatus("success");
      setMessage(loginForm.messages.success[language]);
      setTimeout(() => navigate("/dashboard"), 1000);
    } catch (error: any) {
      setStatus("error");
      setMessage(error.message || loginForm.messages.error[language]);
      console.error("Erreur de connexion :", error);
    } finally {
      setIsLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.2 } },
    focus: {
      scale: 1.02,
      borderColor: "#338fff",
      transition: { duration: 0.3 },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0px 0px 15px rgba(0, 115, 255, 0.3)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.98, transition: { duration: 0.2 } },
    pulse: {
      boxShadow: [
        "0px 0px 0px rgba(0, 115, 255, 0)",
        "0px 0px 20px rgba(0, 115, 255, 0.4)",
        "0px 0px 0px rgba(0, 115, 255, 0)",
      ],
      transition: { duration: 1.5, repeat: Infinity },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.4 } },
    hover: {
      color: "#338fff",
      transition: { duration: 0.3 },
    },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-primary-100 to-primary-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.2)_0%,_transparent_70%)] dark:bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.1)_0%,_transparent_70%)] pointer-events-none" />
      <div className="absolute top-4 right-4 flex space-x-3 z-20">
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#e6f1ff' }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleLanguage}
          className="flex items-center space-x-1 px-3 py-1.5 rounded-full border border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-900 dark:text-primary-200 dark:border-primary-700 dark:hover:bg-primary-800 transition-all duration-200"
          aria-label="Toggle language"
        >
          <Globe size={18} />
          <span className="text-xs font-medium">{language.toUpperCase()}</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: '#e6f1ff' }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2 rounded-full border border-primary-200 bg-primary-50 text-primary-700 hover:bg-primary-100 dark:bg-primary-900 dark:text-primary-200 dark:border-primary-700 dark:hover:bg-primary-800 transition-all duration-200"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
        </motion.button>
      </div>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        className="w-full max-w-sm sm:max-w-md relative z-10"
      >
        <Card className="bg-primary-50/90 dark:bg-gray-900/90 backdrop-blur-lg border border-primary-200 rounded-2xl overflow-hidden">
          <CardHeader className="bg-primary-100/95 dark:bg-primary-900/95 py-6 px-6 text-center border-b border-primary-200">
            <CardTitle className="text-3xl font-extrabold text-primary-900 dark:text-primary-100 tracking-wide">
              {loginForm.title[language]}
            </CardTitle>
            <CardDescription className="mt-2 text-primary-600 dark:text-primary-300 text-sm font-medium">
              {loginForm.description[language]}
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
                <Label htmlFor="email" className="text-primary-900 dark:text-primary-100 font-medium text-sm">
                  {loginForm.email.label[language]}
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={loginForm.email.placeholder[language]}
                  className="w-full bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border border-primary-300 rounded-lg focus:border-primary-400 focus:ring-0 placeholder-primary-500 dark:placeholder-primary-400 transition-all duration-300"
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
                <Label htmlFor="password" className="text-primary-900 dark:text-primary-100 font-medium text-sm">
                  {loginForm.password.label[language]}
                </Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={loginForm.password.placeholder[language]}
                  className="w-full bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border border-primary-300 rounded-lg focus:border-primary-400 focus:ring-0 placeholder-primary-500 dark:placeholder-primary-400 transition-all duration-300"
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
                  className="w-full bg-primary-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>{isLoading ? loginForm.submit[language] + "..." : loginForm.submit[language]}</span>
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
            <motion.div
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="mt-4 text-center"
            >
              <Link
                to="/forgot-password"
                className="text-primary-600 dark:text-primary-300 text-sm font-medium relative inline-block group"
              >
                {loginForm.forgotPassword[language]}
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-primary-400 transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
            <AnimatePresence>
              {status && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={messageVariants}
                  className={`mt-6 p-4 rounded-lg border border-primary-200 ${
                    status === "success"
                      ? "bg-primary-50/50 text-primary-800"
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
    </div>
  );
};