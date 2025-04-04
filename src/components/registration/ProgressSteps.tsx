import React from "react";
import { CheckIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ProgressStepsProps {
  currentStep: number;
}

export const ProgressSteps = ({ currentStep }: ProgressStepsProps) => {
  const steps = [
    { id: 1, name: "Informations de l'école" },
    { id: 2, name: "Informations de l'administrateur" },
    { id: 3, name: "Vérification et soumission" },
  ];

  return (
    <div className="relative p-8">
      {/* Progress Line */}
      <div className="absolute inset-0 flex items-center px-4 mt-8" aria-hidden="true">
        <div className="h-1 w-full bg-gray-100 rounded-full">
          <motion.div
            className="h-full bg-black rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      {/* Steps */}
      <ul className="relative flex justify-between">
        {steps.map((step) => (
          <li key={step.id} className="flex flex-col items-center">
            {/* Step Circle */}
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
                      ? "border-black bg-black text-white"
                      : step.id === currentStep
                      ? "border-black bg-white text-black"
                      : "border-gray-200 bg-white text-gray-400"
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

              {/* Pulse Effect for Current Step */}
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
                    border: "2px solid black",
                  }}
                />
              )}
            </motion.div>

            {/* Step Name */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: step.id * 0.1 }}
              className={`
                text-sm font-medium text-center max-w-[150px]
                transition-colors duration-300
                ${
                  step.id <= currentStep
                    ? "text-black"
                    : "text-gray-400"
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


