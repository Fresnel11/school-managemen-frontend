import { Modal } from "../components/ui/modal";
import { Trash } from "lucide-react";

interface DeleteStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  studentName: string;
}

export function DeleteStudentModal({
  isOpen,
  onClose,
  onConfirm,
  studentName,
}: DeleteStudentModalProps) {
  const fields = [];

  const handleSubmit = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Confirmer la suppression"
      fields={fields}
      size="sm"
      submitButtonText="Supprimer"
      submitButtonIcon={<Trash size={16} />}
    >
      <div className="space-y-2">
        <p className="text-gray-700">
          Êtes-vous sûr de vouloir supprimer l'élève{" "}
          <span className="font-semibold">{studentName}</span> ? Cette action est irréversible.
        </p>
      </div>
    </Modal>
  );
}