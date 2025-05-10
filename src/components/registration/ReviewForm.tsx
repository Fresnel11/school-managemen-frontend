import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { School, User, Info, Loader2 } from "lucide-react";
import { useLanguage } from "../../context/LanguageContext";
import { reviewForm } from "../../data/content";

interface ReviewFormProps {
  schoolInfo: {
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
  adminInfo: {
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
  onPrev: () => void;
  onSubmit: () => Promise<void>;
}

export const ReviewForm = ({ schoolInfo, adminInfo, onPrev, onSubmit }: ReviewFormProps) => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await onSubmit();
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatSchoolType = (type: string) => {
    const types: Record<string, string> = {
      secondary: language === 'en' ? "Secondary" : "Secondaire",
      high: language === 'en' ? "High School" : "Lycée",
      university: language === 'en' ? "University" : "Université",
      professional: language === 'en' ? "Professional Training" : "Formation professionnelle",
    };
    return types[type] || type;
  };

  const formatStatus = (status: string) => {
    const statuses: Record<string, string> = {
      public: language === 'en' ? "Public" : "Public",
      private: language === 'en' ? "Private" : "Privé",
      confessional: language === 'en' ? "Confessional" : "Confessionnel",
      other: language === 'en' ? "Other" : "Autre",
    };
    return statuses[status] || status;
  };

  const formatGender = (gender: string) => {
    const genders: Record<string, string> = {
      Homme: language === 'en' ? "Male" : "Homme",
      Femme: language === 'en' ? "Female" : "Femme",
      Autre: language === 'en' ? "Other" : "Autre",
    };
    return genders[gender] || gender;
  };

  const formatLanguages = (languages: string[]) => {
    const languageMap: Record<string, string> = {
      french: language === 'en' ? "French" : "Français",
      english: language === 'en' ? "English" : "Anglais",
      arabic: language === 'en' ? "Arabic" : "Arabe",
      spanish: language === 'en' ? "Spanish" : "Espagnol",
    };
    return languages.map(lang => languageMap[lang] || lang).join(", ");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'en' ? 'en-US' : 'fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.02 },
  };

  return (
    <div className="bg-landingPrimary-50 dark:bg-gray-900 rounded-lg border border-landingPrimary-200 dark:border-landingPrimary-700 flex flex-col h-full">
      <div className="flex-1 p-6 max-h-[calc(80vh-80px)] overflow-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-extrabold text-landingPrimary-900 dark:text-landingPrimary-100">
            {reviewForm.title[language]}
          </h3>
          <p className="mt-2 text-sm text-landingPrimary-600 dark:text-landingPrimary-300 font-medium">
            {reviewForm.description[language]}
          </p>
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-landingPrimary-200 dark:border-landingPrimary-700 space-y-4"
        >
          <div className="flex items-center space-x-3">
            <School className="w-6 h-6 text-landingPrimary-700 dark:text-landingPrimary-200" />
            <h4 className="text-xl font-semibold text-landingPrimary-900 dark:text-landingPrimary-100">
              {reviewForm.schoolSection[language]}
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: reviewForm.fields.name[language], value: schoolInfo.name },
              { label: reviewForm.fields.address[language], value: schoolInfo.address },
              { label: reviewForm.fields.phone[language], value: schoolInfo.phone },
              { label: reviewForm.fields.email[language], value: schoolInfo.email },
              { label: reviewForm.fields.schoolType[language], value: formatSchoolType(schoolInfo.schoolType) },
              { label: reviewForm.fields.status[language], value: formatStatus(schoolInfo.status) },
              { label: reviewForm.fields.postalBox[language], value: schoolInfo.postalBox || (language === 'en' ? "Not specified" : "Non spécifié") },
              { label: reviewForm.fields.officialId[language], value: schoolInfo.officialId },
              { label: reviewForm.fields.languages[language], value: formatLanguages(schoolInfo.languages) },
              { label: reviewForm.fields.website[language], value: schoolInfo.website || (language === 'en' ? "Not specified" : "Non spécifié") },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative p-4 rounded-lg bg-landingPrimary-50 dark:bg-gray-900 border border-landingPrimary-200 dark:border-landingPrimary-700 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-sm text-landingPrimary-600 dark:text-landingPrimary-300 font-medium">{item.label}</p>
                <p className="text-base font-semibold text-landingPrimary-900 dark:text-landingPrimary-100">{item.value}</p>
                <div className="absolute top-0 right-0 w-12 h-12 bg-landingPrimary-200 dark:bg-landingPrimary-700 rounded-bl-full opacity-20" />
              </motion.div>
            ))}
          </div>
        </motion.div>
        <Separator className="bg-landingPrimary-300 dark:bg-landingPrimary-700 h-1 rounded-full" />
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-white dark:bg-gray-800 rounded-lg p-6 border border-landingPrimary-200 dark:border-landingPrimary-700 space-y-4"
        >
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-landingPrimary-700 dark:text-landingPrimary-200" />
            <h4 className="text-xl font-semibold text-landingPrimary-900 dark:text-landingPrimary-100">
              {reviewForm.adminSection[language]}
            </h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: reviewForm.fields.fullName[language], value: adminInfo.fullName },
              { label: reviewForm.fields.adminEmail[language], value: adminInfo.email },
              { label: reviewForm.fields.dateOfBirth[language], value: formatDate(adminInfo.dateOfBirth) },
              { label: reviewForm.fields.gender[language], value: formatGender(adminInfo.gender) },
              { label: reviewForm.fields.adminPhone[language], value: adminInfo.phone },
              { label: reviewForm.fields.adminAddress[language], value: adminInfo.address },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative p-4 rounded-lg bg-landingPrimary-50 dark:bg-gray-900 border border-landingPrimary-200 dark:border-landingPrimary-700 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-sm text-landingPrimary-600 dark:text-landingPrimary-300 font-medium">{item.label}</p>
                <p className="text-base font-semibold text-landingPrimary-900 dark:text-landingPrimary-100">{item.value}</p>
                <div className="absolute top-0 right-0 w-12 h-12 bg-landingPrimary-200 dark:bg-landingPrimary-700 rounded-bl-full opacity-20" />
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-landingPrimary-100 dark:bg-landingPrimary-800 p-4 rounded-lg flex items-start space-x-3"
        >
          <Info className="w-5 h-5 text-landingPrimary-600 dark:text-landingPrimary-300 mt-1" />
          <p className="text-sm text-landingPrimary-700 dark:text-landingPrimary-200 font-medium">
            <strong>{language === 'en' ? "Note:" : "Note :"}</strong> {reviewForm.note[language]}
          </p>
        </motion.div>
      </div>
      <div className="p-6 border-t border-landingPrimary-200 dark:border-landingPrimary-700 bg-white dark:bg-gray-900 flex justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={isSubmitting}
          className="border-landingPrimary-200 dark:border-landingPrimary-700 text-landingPrimary-700 dark:text-landingPrimary-200 bg-landingPrimary-50 dark:bg-landingPrimary-900 hover:bg-landingPrimary-100 dark:hover:bg-landingPrimary-800 transition-all duration-300"
        >
          {reviewForm.prevButton[language]}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-landingPrimary-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-landingPrimary-600 dark:bg-landingPrimary-600 dark:hover:bg-landingPrimary-700 transition-all duration-300 flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="animate-spin w-4 h-4" />}
          {isSubmitting ? reviewForm.submitting[language] : reviewForm.submitButton[language]}
        </Button>
      </div>
    </div>
  );
};