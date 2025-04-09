import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

interface FieldConfig<T = string> {
  name: string;
  label: string;
  type: "text" | "email" | "date" | "select" | "textarea" | T; // Ajouter T pour des extensions
  options?: { value: string; label: string }[]; // Pour les champs de type "select"
  required?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => void;
  title: string;
  fields: FieldConfig[];
  initialData?: Record<string, any>;
  children?: React.ReactNode; // Pour ajouter du contenu personnalisé
}

export function Modal({
  isOpen,
  onClose,
  onSubmit,
  title,
  fields,
  initialData = {},
  children,
}: ModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);

  // Réinitialiser les données du formulaire uniquement lorsque le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setFormData(initialData);
    }
  }, [isOpen]); // Retirer initialData des dépendances pour éviter une réinitialisation à chaque changement

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <Card
        className={cn(
          "w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8 transform transition-all duration-300 ease-in-out",
          "bg-white/95 border border-gray-200 shadow-xl rounded-xl",
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
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

        {/* Formulaire */}
        <form onSubmit={handleSubmit}>
          {/* Grille pour les champs */}
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
              </div>
            ))}
          </div>

          {/* Contenu personnalisé */}
          {children && (
            <div className="mt-8 pt-6 border-t border-gray-200">
              {children}
            </div>
          )}

          {/* Boutons */}
          <div className="flex justify-end gap-3 mt-8">
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
              className="px-6 py-2 text-white"
            >
              Ajouter
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}