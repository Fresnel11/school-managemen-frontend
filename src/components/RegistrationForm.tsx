import { useState } from "react";
import { SchoolInfoForm } from "./registration/SchoolInfoForm";
import { motion, AnimatePresence } from "framer-motion";
import { AdminInfoForm } from "./registration/AdminInfoForm";
import { ReviewForm } from "./registration/ReviewForm";
import { ProgressSteps } from "./registration/ProgressSteps";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { registerSchool } from "../services/authServices";

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
  transition: { duration: 0.4 }
};

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
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

    // Mapper les données aux noms attendus par le backend
    const schoolData = {
        name: schoolInfo.name,
        address: schoolInfo.address,
        phone: schoolInfo.phone,
        schoolEmail: schoolInfo.email, // Renommé pour correspondre au backend
        schoolType: schoolInfo.schoolType,
        status: schoolInfo.status,
        postalBox: schoolInfo.postalBox,
        officialId: schoolInfo.officialId,
        languages: schoolInfo.languages,
        website: schoolInfo.website,
    };

    const adminData = {
        fullName: adminInfo.fullName,
        adminEmail: adminInfo.email, // Renommé pour correspondre au backend
        dateOfBirth: adminInfo.dateOfBirth,
        gender: adminInfo.gender,
        userPhone: adminInfo.phone, // Renommé pour correspondre au backend
        address: adminInfo.address,
        password: adminInfo.password,
        profilePhoto: adminInfo.profilePhoto, 
    };

    try {
        const response = await registerSchool(
            JSON.stringify(schoolData),  // Sérialise les données en JSON
            JSON.stringify(adminData)    // Sérialise également adminData
        );
        setSubmissionStatus("success");
        setSubmissionMessage(
            response.message || "Inscription réussie ! En attente de validation."
        );
        console.log("Réponse de l'API :", response);
    } catch (error) {
        setSubmissionStatus("error");
        setSubmissionMessage(
            error.message || "Une erreur est survenue lors de l'inscription."
        );
        console.error("Erreur lors de l'inscription :", error);
    }
};

  

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto py-10 px-4 "
    >
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Inscription d'une nouvelle école
            </CardTitle>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <CardDescription className="text-lg text-gray-600">
              Complétez le formulaire en 3 étapes pour inscrire votre école et créer un compte administrateur
            </CardDescription>
          </motion.div>
        </CardHeader>
        <CardContent>
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ProgressSteps currentStep={currentStep} />
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
                  opacity: { duration: 0.2 }
                }}
                className="absolute w-full"
              >
                {currentStep === 1 && (
                  <SchoolInfoForm
                    schoolInfo={schoolInfo}
                    onChange={handleSchoolInfoChange}
                    onNext={nextStep}
                  />
                )}

{currentStep === 2 && (
                  <AdminInfoForm
                    adminInfo={adminInfo}
                    onChange={handleAdminInfoChange}
                    onNext={nextStep}
                    onPrev={prevStep}
                  />
                )}

                {currentStep === 3 && (
                  <ReviewForm
                    schoolInfo={schoolInfo}
                    adminInfo={adminInfo}
                    onPrev={prevStep}
                    onSubmit={handleSubmit}
                    // isLoading={isLoading}
                    // submissionStatus={submissionStatus}
                    // submissionMessage={submissionMessage}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
      </motion.div>
  );
};
