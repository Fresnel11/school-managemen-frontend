import React from "react";
import { CheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../../context/LanguageContext";
import { progressSteps } from "../../data/content";

interface ProgressStepsProps {
  currentStep: number;
}

export const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  const { language } = useLanguage();

  return (
    <div className="relative p-8">
      <div className="absolute inset-0 flex items-center px-4 mt-8" aria-hidden="true">
        <div className="h-1 w-full bg-landingPrimary-200 dark:bg-landingPrimary-700 rounded-full">
          <motion.div
            className="h-full bg-landingPrimary-500 dark:bg-landingPrimary-400 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep - 1) / (progressSteps.steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>
      <ul className="relative flex justify-between">
        {progressSteps.steps.map((step) => (
          <li key={step.id} className="flex flex-col items-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: step.id * 0.1 }}
              className="relative mb-4"
            >
              <motion.div
                className={`
                  relative z-10 flex h-16 w-16 items-center justify-center rounded-full
                  border-4 transition-all duration-300
                  ${
                    step.id < currentStep
                      ? "border-landingPrimary-500 bg-landingPrimary-500 text-white dark:border-landingPrimary-400 dark:bg-landingPrimary-400"
                      : step.id === currentStep
                      ? "border-landingPrimary-500 bg-white text-landingPrimary-500 dark:border-landingPrimary-400 dark:bg-gray-900 dark:text-landingPrimary-200"
                      : "border-landingPrimary-200 bg-white text-landingPrimary-400 dark:border-landingPrimary-700 dark:bg-gray-900 dark:text-landingPrimary-400"
                  }
                `}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {step.id < currentStep ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <CheckIcon className="h-8 w-8" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <span className="text-xl font-semibold">{step.id}</span>
                )}
              </motion.div>
              {step.id === currentStep && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.2, opacity: 0 }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                  style={{
                    border: "2px solid #338fff",
                  }}
                />
              )}
            </motion.div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: step.id * 0.1 }}
              className={`
                text-sm font-medium text-center max-w-[150px]
                transition-colors duration-300
                ${
                  step.id <= currentStep
                    ? "text-landingPrimary-900 dark:text-landingPrimary-100"
                    : "text-landingPrimary-400 dark:text-landingPrimary-400"
                }
              `}
            >
              {step.name[language]}
            </motion.span>
          </li>
        ))}
      </ul>
    </div>
  );
};