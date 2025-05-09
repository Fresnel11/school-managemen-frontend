import { useState } from "react";
import { SchoolInfoForm } from "./registration/SchoolInfoForm";
import { motion, AnimatePresence } from "framer-motion";
import { AdminInfoForm } from "./registration/AdminInfoForm";
import { ReviewForm } from "./registration/ReviewForm";
import { ProgressSteps } from "./registration/ProgressSteps";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { registerSchool } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { Globe, Moon, Sun } from "lucide-react";
import { registrationForm } from "../data/content";

type SchoolInfo = {
  name: string;
  address: string;
  phone: string;
  email: string;
  schoolType: string;
  status: string;
  postalBox: string;
  officialId: string;
  languages: string[];
  website: string;
};

type AdminInfo = {
  fullName: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  phone: string;
  address: string;
  password: string;
  confirmPassword: string;
  profilePhoto: File | null;
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4 },
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(0);
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>({
    name: "",
    address: "",
    phone: "",
    email: "",
    schoolType: "",
    status: "",
    postalBox: "",
    officialId: "",
    languages: [],
    website: "",
  });

  const [adminInfo, setAdminInfo] = useState<AdminInfo>({
    fullName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
  });

  const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);
  const [submissionMessage, setSubmissionMessage] = useState("");

  const { language, toggleLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const nextStep = () => {
    setDirection(1);
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setDirection(-1);
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSchoolInfoChange = (info: Partial<SchoolInfo>) => {
    setSchoolInfo((prev) => ({ ...prev, ...info }));
  };

  const handleAdminInfoChange = (info: Partial<AdminInfo>) => {
    setAdminInfo((prev) => ({ ...prev, ...info }));
  };

  const handleSubmit = async () => {
    setSubmissionStatus(null);
    setSubmissionMessage("");

    const schoolData = {
      name: schoolInfo.name,
      address: schoolInfo.address,
      phone: schoolInfo.phone,
      schoolEmail: schoolInfo.email,
      schoolType: schoolInfo.schoolType,
      status: schoolInfo.status,
      postalBox: schoolInfo.postalBox,
      officialId: schoolInfo.officialId,
      languages: schoolInfo.languages,
      website: schoolInfo.website,
    };

    const adminData = {
      fullName: adminInfo.fullName,
      adminEmail: adminInfo.email,
      dateOfBirth: adminInfo.dateOfBirth,
      gender: adminInfo.gender,
      userPhone: adminInfo.phone,
      address: adminInfo.address,
      password: adminInfo.password,
      profilePhoto: adminInfo.profilePhoto,
    };

    try {
      const response = await registerSchool(
        JSON.stringify(schoolData),
        JSON.stringify(adminData)
      );
      setSubmissionStatus("success");
      setSubmissionMessage(
        response.message || registrationForm.review[language]
      );
      localStorage.setItem("pendingEmail", adminInfo.email);
      navigate("/confirm-email");
    } catch (error: any) {
      setSubmissionStatus("error");
      setSubmissionMessage(
        error.message || registrationForm.review[language]
      );
      console.error("Erreur lors de l'inscription :", error);
    }
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-4xl relative z-10"
      >
        <Card className="bg-primary-50/90 dark:bg-gray-900/90 backdrop-blur-lg border border-primary-200 rounded-2xl overflow-hidden">
          <CardHeader className="bg-primary-100/95 dark:bg-primary-900/95 py-6 px-6 text-center border-b border-primary-200">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-3xl font-extrabold text-primary-900 dark:text-primary-100 tracking-wide">
                {registrationForm.title[language]}
              </CardTitle>
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <CardDescription className="mt-2 text-primary-600 dark:text-primary-300 text-lg font-medium">
                {registrationForm.description[language]}
              </CardDescription>
            </motion.div>
          </CardHeader>
          <CardContent className="p-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <ProgressSteps currentStep={currentStep} language={language} />
            </motion.div>
            <div className="mt-8 relative min-h-[850px]">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute w-full"
                >
                  {currentStep === 1 && (
                    <SchoolInfoForm
                      schoolInfo={schoolInfo}
                      onChange={handleSchoolInfoChange}
                      onNext={nextStep}
                      language={language}
                    />
                  )}
                  {currentStep === 2 && (
                    <AdminInfoForm
                      adminInfo={adminInfo}
                      onChange={handleAdminInfoChange}
                      onNext={nextStep}
                      onPrev={prevStep}
                      language={language}
                    />
                  )}
                  {currentStep === 3 && (
                    <ReviewForm
                      schoolInfo={schoolInfo}
                      adminInfo={adminInfo}
                      onPrev={prevStep}
                      onSubmit={handleSubmit}
                      language={language}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};