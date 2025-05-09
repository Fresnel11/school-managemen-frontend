import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { School, User, Info, Loader2 } from "lucide-react";
import { registrationForm } from "../../data/content";

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
  language: string;
}

export const ReviewForm = ({ schoolInfo, adminInfo, onPrev, onSubmit, language }: ReviewFormProps) => {
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
    const types = registrationForm.schoolInfo.schoolType.options;
    return types[type]?.[language] || type;
  };

  const formatStatus = (status: string) => {
    const statuses = registrationForm.schoolInfo.status.options;
    return statuses[status]?.[language] || status;
  };

  const formatGender = (gender: string) => {
    const genders = registrationForm.adminInfo.gender.options;
    return genders[gender]?.[language] || gender;
  };

  const formatLanguages = (languages: string[]) => {
    const languageMap = registrationForm.schoolInfo.languages.options;
    return languages.map(lang => languageMap[lang]?.[language] || lang).join(", ");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'fr' ? 'fr-FR' : 'en-US', {
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
    <div className="bg-primary-50 dark:bg-gray-900 rounded-lg border border-primary-200 flex flex-col h-full">
      <div className="flex-1 p-6 max-h-[calc(80vh-80px)] overflow-auto space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-extrabold text-primary-900 dark:text-primary-100">
            {registrationForm.review.title[language]}
          </h3>
          <p className="mt-2 text-sm text-primary-500 dark:text-primary-400 font-medium">
            {registrationForm.review.description[language]}
          </p>
        </motion.div>
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-primary-100 dark:bg-primary-900 rounded-lg p-6 border border-primary-200 space-y-4"
        >
          <div className="flex items-center space-x-3">
            <School className="w-6 h-6 text-primary-700 dark:text-primary-200" />
            <h4 className="text-xl font-semibold text-primary-900 dark:text-primary-100">{registrationForm.review.schoolSection[language]}</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: registrationForm.schoolInfo.name.label[language], value: schoolInfo.name },
              { label: registrationForm.schoolInfo.address.label[language], value: schoolInfo.address },
              { label: registrationForm.schoolInfo.phone.label[language], value: schoolInfo.phone },
              { label: registrationForm.schoolInfo.email.label[language], value: schoolInfo.email },
              { label: registrationForm.schoolInfo.schoolType.label[language], value: formatSchoolType(schoolInfo.schoolType) },
              { label: registrationForm.schoolInfo.status.label[language], value: formatStatus(schoolInfo.status) },
              { label: registrationForm.schoolInfo.postalBox.label[language], value: schoolInfo.postalBox || registrationForm.review[language] },
              { label: registrationForm.schoolInfo.officialId.label[language], value: schoolInfo.officialId },
              { label: registrationForm.schoolInfo.languages.label[language], value: formatLanguages(schoolInfo.languages) },
              { label: registrationForm.schoolInfo.website.label[language], value: schoolInfo.website || registrationForm.review[language] },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative p-4 rounded-lg bg-white dark:bg-gray-800 border border-primary-200 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-sm text-primary-500 dark:text-primary-400 font-medium">{item.label}</p>
                <p className="text-base font-semibold text-primary-900 dark:text-primary-100">{item.value}</p>
                <div className="absolute top-0 right-0 w-12 h-12 bg-primary-200 dark:bg-primary-700 rounded-bl-full opacity-20" />
              </motion.div>
            ))}
          </div>
        </motion.div>
        <Separator className="bg-primary-300 dark:bg-primary-700 h-1 rounded-full" />
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-primary-100 dark:bg-primary-900 rounded-lg p-6 border border-primary-200 space-y-4"
        >
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-primary-700 dark:text-primary-200" />
            <h4 className="text-xl font-semibold text-primary-900 dark:text-primary-100">{registrationForm.review.adminSection[language]}</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: registrationForm.adminInfo.fullName.label[language], value: adminInfo.fullName },
              { label: registrationForm.adminInfo.email.label[language], value: adminInfo.email },
              { label: registrationForm.adminInfo.dateOfBirth.label[language], value: formatDate(adminInfo.dateOfBirth) },
              { label: registrationForm.adminInfo.gender.label[language], value: formatGender(adminInfo.gender) },
              { label: registrationForm.adminInfo.phone.label[language], value: adminInfo.phone },
              { label: registrationForm.adminInfo.address.label[language], value: adminInfo.address },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative p-4 rounded-lg bg-white dark:bg-gray-800 border border-primary-200 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-sm text-primary-500 dark:text-primary-400 font-medium">{item.label}</p>
                <p className="text-base font-semibold text-primary-900 dark:text-primary-100">{item.value}</p>
                <div className="absolute top-0 right-0 w-12 h-12 bg-primary-200 dark:bg-primary-700 rounded-bl-full opacity-20" />
              </motion.div>
            ))}
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-primary-100 dark:bg-primary-900 p-4 rounded-lg flex items-start space-x-3"
        >
          <Info className="w-5 h-5 text-primary-600 dark:text-primary-300 mt-1" />
          <p className="text-sm text-primary-700 dark:text-primary-200 font-medium">
            {registrationForm.review.note[language]}
          </p>
        </motion.div>
      </div>
      <div className="p-6 border-t border-primary-200 dark:border-primary-700 bg-primary-50 dark:bg-gray-900 flex justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          disabled={isSubmitting}
          className="border-primary-300 text-primary-700 hover:bg-primary-100 dark:border-primary-700 dark:text-primary-200 dark:hover:bg-primary-800"
        >
          {registrationForm.review.previous[language]}
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700 flex items-center gap-2"
        >
          {isSubmitting && <Loader2 className="animate-spin w-4 h-4" />}
          {isSubmitting ? registrationForm.review.submitting[language] : registrationForm.review.submit[language]}
        </Button>
      </div>
    </div>
  );
};