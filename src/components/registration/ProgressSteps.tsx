import React from "react";
import { CheckIcon } from "lucide-react";
import { motion } from "framer-motion";
import { registrationForm } from "../../data/content";

interface ProgressStepsProps {
  currentStep: number;
  language: string;
}

export const ProgressSteps = ({ currentStep, language }: ProgressStepsProps) => {
  const steps = [
    { id: 1, name: registrationForm.steps.schoolInfo[language] },
    { id: 2, name: registrationForm.steps.adminInfo[language] },
    { id: 3, name: registrationForm.steps.review[language] },
  ];

  return (
    <div className="relative p-8">
      <div className="absolute inset-0 flex items-center px-4 mt-8" aria-hidden="true">
        <div className="h-1 w-full bg-primary-200 rounded-full">
          <motion.div
            className="h-full bg-primary-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>
      <ul className="relative flex justify-between">
        {steps.map((step) => (
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
                      ? "border-primary-500 bg-primary-500 text-white"
                      : step.id === currentStep
                      ? "border-primary-500 bg-primary-50 text-primary-900 dark:bg-primary-900 dark:text-primary-100"
                      : "border-primary-200 bg-primary-50 text-primary-400 dark:bg-primary-900 dark:text-primary-400"
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
                    border: "2px solid #0073ff",
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
                    ? "text-primary-900 dark:text-primary-100"
                    : "text-primary-400 dark:text-primary-400"
                }
              `}
            >
              {step.name}
            </motion.span>
          </li>
        ))}
      </ul>
    </div>
  );
};