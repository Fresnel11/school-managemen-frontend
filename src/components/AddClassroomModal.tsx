import { Modal } from "../components/ui/modal"; // Assure-toi que le chemin est correct

interface AddClassroomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Record<string, any>) => void;
  initialData?: Record<string, any>;
  submitButtonText?: string;
}

interface FieldConfig<T = string> {
  name: string;
  label: string;
  type: "text" | "email" | "date" | "select" | "textarea" | T;
  options?: { value: string; label: string }[];
  required?: boolean;
}

export function AddClassroomModal({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  submitButtonText = "Ajouter",
}: AddClassroomModalProps) {
  const fields: FieldConfig[] = [
    {
      name: "name",
      label: "Nom de la Classe",
      type: "text",
      required: true,
    },
    {
      name: "level",
      label: "Niveau",
      type: "select",
      options: [
        { value: "6ème", label: "6ème" },
        { value: "5ème", label: "5ème" },
        { value: "4ème", label: "4ème" },
        { value: "3ème", label: "3ème" },
        { value: "2nd", label: "2nd" },
        { value: "1ere", label: "1ère" },
        { value: "Terminal", label: "Terminal" },
      ],
      required: true,
    },
    {
      name: "capacity",
      label: "Capacité",
      type: "number",
      required: true,
    },
    {
      name: "description",
      label: "Description (optionnelle)",
      type: "textarea",
    },
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      title={submitButtonText === "Ajouter" ? "Ajouter une Classe" : "Modifier une Classe"}
      fields={fields}
      initialData={initialData}
      submitButtonText={submitButtonText}
      size="lg"
    />
  );
}