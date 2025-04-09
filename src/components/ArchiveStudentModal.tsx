import { Modal } from "../components/ui/modal";
import { Archive } from "lucide-react";

interface ArchiveStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  studentName: string;
}

export function ArchiveStudentModal({
  isOpen,
  onClose,
  onConfirm,
  studentName,
}: ArchiveStudentModalProps) {
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
      title="Confirmer l'archivage"
      fields={fields}
      size="sm"
      submitButtonText="Archiver"
      submitButtonIcon={<Archive size={16} />}
    >
      <div className="space-y-2">
        <p className="text-gray-700">
          Êtes-vous sûr de vouloir archiver l'élève{" "}
          <span className="font-semibold">{studentName}</span> ? Il ne sera plus actif.
        </p>
      </div>
    </Modal>
  );
}