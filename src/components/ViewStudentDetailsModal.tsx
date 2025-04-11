import { motion } from "framer-motion";
import { Modal } from "../components/ui/modal";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface ViewStudentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: any;
}

export function ViewStudentDetailsModal({ isOpen, onClose, student }: ViewStudentDetailsModalProps) {
  if (!student) return null;

  // Fonction pour formater les dates
  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Animation pour les sections
  const sectionVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, delay: 0.2 } },
  };

  // Définition du statusMap pour gérer tous les statuts
  const statusMap: Record<string, { color: string; bg: string; label: string }> = {
    active: { color: "text-green-700", bg: "bg-green-100", label: "Actif" },
    graduated: { color: "text-blue-700", bg: "bg-blue-100", label: "Gradué(e)" },
    transferred: { color: "text-orange-700", bg: "bg-orange-100", label: "Transféré(e)" },
    excluded: { color: "text-red-700", bg: "bg-red-100", label: "Exclu(e)" },
    archived: { color: "text-gray-700", bg: "bg-gray-100", label: "Archivé(e)" },
    tobewatched: { color: "text-yellow-700", bg: "bg-yellow-100", label: "À surveiller" },
    indifficulty: { color: "text-red-700", bg: "bg-red-100", label: "En difficulté" },
  };

  // Normalisation du statut pour gérer les différences de casse et les espaces
  const normalizedStatus = student.status?.toLowerCase().replace(/\s/g, "");
  const statusStyle = statusMap[normalizedStatus] || { color: "text-gray-700", bg: "bg-gray-100", label: "N/A" };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gray-900 text-white">
              {student.firstName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          Détails de {student.firstName} {student.lastName}
        </div>
      }
      size="lg"
      isReadOnly={true} // Mode lecture seule
    >
      {/* Section : Informations de l'étudiant */}
      <motion.div variants={sectionVariants} initial="hidden" animate="visible">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Informations de l'étudiant</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Prénom :</span> {student.firstName}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Nom :</span> {student.lastName}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Date de naissance :</span>{" "}
              {formatDate(student.dateOfBirth)}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Genre :</span> {student.gender}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Adresse :</span> {student.address}
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Téléphone :</span>{" "}
              {student.phoneNumber || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Email :</span> {student.email}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Classe :</span>{" "}
              {student.classroomId?.name || "N/A"}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Statut :</span>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyle.bg} ${statusStyle.color}`}
              >
                {statusStyle.label}
              </span>
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium text-gray-900">Date d'inscription :</span>{" "}
              {student.enrollmentDate ? formatDate(student.enrollmentDate) : "N/A"}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section : Parents/Tuteurs */}
      <motion.div variants={sectionVariants} initial="hidden" animate="visible" className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Parents/Tuteurs ({student.parents?.length || 0})
        </h3>
        {student.parents && student.parents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {student.parents.map((parent: any, index: number) => (
              <Card
                key={index}
                className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-gray-900 text-white">
                      {parent.firstName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {parent.firstName} {parent.lastName}
                    </p>
                    <p className="text-xs text-gray-500">{parent.relationToStudent}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Email :</span> {parent.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Téléphone :</span>{" "}
                    {parent.phoneNumber}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Adresse :</span>{" "}
                    {parent.address || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">Profession :</span>{" "}
                    {parent.profession || "N/A"}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 italic">Aucun parent/tuteur associé.</p>
        )}
      </motion.div>
    </Modal>
  );
}