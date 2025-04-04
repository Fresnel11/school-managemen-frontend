import { ReactNode } from "react";
import { Label } from "../ui/label";

interface FormFieldProps {
  label: string;
  children: ReactNode;
  error?: string;
}

export const FormField = ({ label, children, error }: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};