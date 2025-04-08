import { useState } from "react";
import { Modal } from "../components/ui/modal";
import { createStudent } from "../services/studentService";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStudentAdded: (student: any) => void; // Callback pour ajouter l'étudiant à la liste
}

export function AddStudentModal({ isOpen, onClose, onStudentAdded }: AddStudentModalProps) {
  const [parents, setParents] = useState<any[]>([]); // Liste des parents ajoutés
  const [showParentFields, setShowParentFields] = useState(false); // Contrôle l'affichage des champs des parents
  const [parentData, setParentData] = useState<Record<string, any>>({}); // Données du parent en cours d'ajout

  // Champs pour le formulaire de l'étudiant
  const studentFields = [
    { name: "firstName", label: "Prénom", type: "text", required: true },
    { name: "lastName", label: "Nom", type: "text", required: true },
    { name: "dateOfBirth", label: "Date de naissance", type: "date", required: true },
    { name: "gender", label: "Genre", type: "select", options: [
      { value: "Homme", label: "Homme" },
      { value: "Femme", label: "Femme" },
    ], required: true },
    { name: "address", label: "Adresse", type: "text", required: true },
    { name: "phoneNumber", label: "Numéro de téléphone", type: "text" },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "status", label: "Statut", type: "select", options: [
      { value: "active", label: "Actif" },
      { value: "inactive", label: "Inactif" },
      { value: "pending", label: "En attente" },
    ], required: true },
  ];

  // Champs pour le formulaire du parent
  const parentFields = [
    { name: "firstName", label: "Prénom", type: "text", required: true },
    { name: "lastName", label: "Nom", type: "text", required: true },
    { name: "phoneNumber", label: "Numéro de téléphone", type: "text", required: true },
    { name: "email", label: "Email", type: "email", required: true },
    { name: "address", label: "Adresse", type: "text", required: true },
    { name: "profession", label: "Profession", type: "text" },
    { name: "relationToStudent", label: "Relation avec l'étudiant", type: "select", options: [
      { value: "Père", label: "Père" },
      { value: "Mère", label: "Mère" },
      { value: "Tuteur", label: "Tuteur" },
    ], required: true },
  ];

  // Gérer les changements dans les champs des parents
  const handleParentChange = (name: string, value: string) => {
    setParentData((prev) => ({ ...prev, [name]: value }));
  };

  // Gérer l'ajout d'un parent
  const handleAddParent = () => {
    if (Object.keys(parentData).length === 0) {
      alert("Veuillez remplir les champs du parent.");
      return;
    }
    setParents((prev) => [...prev, parentData]);
    setParentData({}); // Réinitialiser les champs après ajout
    setShowParentFields(false); // Cacher les champs après ajout
  };

  // Gérer la soumission du formulaire de l'étudiant
  const handleSubmit = async (studentData: any) => {
    try {
      const studentPayload = {
        ...studentData,
        parents, // Ajouter les parents au payload
      };
      const response = await createStudent(studentPayload);
      onStudentAdded(response.student); // Ajouter l'étudiant à la liste
      onClose(); // Fermer le modal
      setParents([]); // Réinitialiser la liste des parents
      setParentData({}); // Réinitialiser les données du parent
      setShowParentFields(false); // Cacher les champs des parents
    } catch (error: any) {
      console.error("Erreur lors de l'ajout de l'étudiant:", error);
      alert("Erreur lors de l'ajout de l'étudiant.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Ajouter un étudiant"
      fields={studentFields}
    >
      {/* Section pour les parents */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-800">Parents/Tuteurs ({parents.length}/2)</h3>
          {parents.length < 2 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowParentFields(true)}
            >
              Ajouter un parent
            </Button>
          )}
        </div>

        {/* Liste des parents ajoutés */}
        {parents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {parents.map((parent, index) => (
              <Card key={index} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-gray-800">
                    {parent.firstName} {parent.lastName}
                  </span>
                  <span className="text-xs text-gray-500">
                    {parent.relationToStudent} - {parent.email}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setParents(parents.filter((_, i) => i !== index))}
                  className="text-red-500 hover:text-red-700"
                >
                  <X size={16} />
                </Button>
              </Card>
            ))}
          </div>
        )}

        {/* Champs pour ajouter un parent */}
        {showParentFields && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-md font-medium text-gray-800">Nouveau parent/tuteur</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {parentFields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name} className="text-sm font-medium text-gray-700">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </Label>
                  {field.type === "select" ? (
                    <Select
                      onValueChange={(value) => handleParentChange(field.name, value)}
                      defaultValue={parentData[field.name] || ""}
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
                      value={parentData[field.name] || ""}
                      onChange={(e) => handleParentChange(field.name, e.target.value)}
                      required={field.required}
                      className="w-full"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setShowParentFields(false);
                  setParentData({});
                }}
                className="text-gray-600 border-gray-300"
              >
                Annuler
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleAddParent}
              >
                Ajouter le parent
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}