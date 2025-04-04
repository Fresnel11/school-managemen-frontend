import { CheckIcon } from "lucide-react";

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
    <div className="relative">
      <div className="absolute inset-0 flex items-center" aria-hidden="true">
        <div className="h-0.5 w-full bg-gray-200"></div>
      </div>
      <ul className="relative flex justify-between">
        {steps.map((step) => (
          <li key={step.id} className="flex items-center">
            <div
              className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                step.id < currentStep
                  ? "bg-primary text-primary-foreground"
                  : step.id === currentStep
                  ? "bg-primary text-primary-foreground"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {step.id < currentStep ? (
                <CheckIcon className="h-5 w-5" aria-hidden="true" />
              ) : (
                <span>{step.id}</span>
              )}
            </div>
            <span className="ml-2 text-sm font-medium text-gray-900 hidden sm:block">
              {step.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};