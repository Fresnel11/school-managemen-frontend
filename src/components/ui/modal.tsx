import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion"; // Ajout de framer-motion

interface FieldConfig<T = string> {
  name: string;
  label: string;
  type: "text" | "email" | "date" | "select" | "textarea" | T;
  options?: { value: string; label: string }[];
  required?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: Record<string, any>) => void; // Rendu optionnel
  title: string | React.ReactNode;
  fields?: FieldConfig[];
  initialData?: Record<string, any>;
  children?: React.ReactNode;
  size?: "sm" | "lg";
  submitButtonText?: string;
  submitButtonIcon?: React.ReactNode;
  errors?: Record<string, string>;
  isReadOnly?: boolean; // Nouveau prop pour mode lecture seule
}

export function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields = [],
  initialData = {},
  children,
  size = "lg",
  submitButtonText = "Ajouter",
  submitButtonIcon,
  errors = {},
  isReadOnly = false, // Par défaut, pas en mode lecture seule
}: ModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);

  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
    }
  }, [isOpen]);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  // Animation pour le modal
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, y: 20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <Card
            className={cn(
              "max-h-[90vh] overflow-y-auto",
              "bg-white/95 border border-gray-200 shadow-xl rounded-xl",
              size === "sm" ? "w-full max-w-md p-6" : "w-full max-w-5xl p-8" // Ajustement pour rendre plus large
            )}
          >
            {/* En-tête du modal */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </Button>
            </div>

            {isReadOnly ? (
              // Mode lecture seule : pas de formulaire
              <div className="space-y-6">
                {children}
                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="px-6 py-2"
                  >
                    Fermer
                  </Button>
                </div>
              </div>
            ) : (
              // Mode formulaire
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {fields.map((field) => (
                    <div key={field.name} className="space-y-2">
                      <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </Label>
                      {field.type === "textarea" ? (
                        <textarea
                          id={field.name}
                          name={field.name}
                          value={formData[field.name] || ""}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          required={field.required}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      ) : field.type === "select" ? (
                        <Select
                          onValueChange={(value) => handleChange(field.name, value)}
                          defaultValue={formData[field.name] || ""}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Sélectionner..." />
                          </SelectTrigger>
                          <SelectContent>
                            {field.options?.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : (
                        <Input
                          id={field.name}
                          name={field.name}
                          type={field.type}
                          value={formData[field.name] || ""}
                          onChange={(e) => handleChange(field.name, e.target.value)}
                          required={field.required}
                          className="w-full"
                        />
                      )}
                      {errors[field.name] && (
                        <p className="text-red-500 text-xs">{errors[field.name]}</p>
                      )}
                    </div>
                  ))}
                </div>

                {children && (
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    {children}
                  </div>
                )}

                <div className="flex justify-end gap-3 mt-6">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onClose}
                    className="px-6 py-2"
                  >
                    Annuler
                  </Button>
                  <Button
                    type="submit"
                    className={cn(
                      "px-6 py-2 flex items-center gap-2 text-white",
                      submitButtonText === "Supprimer" ? "bg-red-600 hover:bg-red-700" : "",
                      submitButtonText === "Archiver" ? "bg-yellow-600 hover:bg-yellow-700" : ""
                    )}
                  >
                    {submitButtonIcon && <span>{submitButtonIcon}</span>}
                    {submitButtonText}
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}