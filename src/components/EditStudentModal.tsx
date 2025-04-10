import { useState, useEffect } from "react";
import { Modal } from "../components/ui/modal";
import { updateStudent } from "../services/studentService";
import { getAllClassrooms } from "../services/classroomServices";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface EditStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStudentUpdated: (student: any) => void;
  student: any;
}

export function EditStudentModal({ isOpen, onClose, onStudentUpdated, student }: EditStudentModalProps) {
  const [parents, setParents] = useState<any[]>(student?.parents || []);
  const [showParentFields, setShowParentFields] = useState(false);
  const [parentData, setParentData] = useState<Record<string, any>>({});
  const [editingParentIndex, setEditingParentIndex] = useState<number | null>(null);
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [loadingClassrooms, setLoadingClassrooms] = useState(false);
  const [errorClassrooms, setErrorClassrooms] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [parentErrors, setParentErrors] = useState<Record<string, string>>({});

  const initialStudentData = {
    firstName: student?.firstName || "",
    lastName: student?.lastName || "",
    dateOfBirth: student?.dateOfBirth ? new Date(student.dateOfBirth).toISOString().split("T")[0] : "",
    gender: student?.gender || "",
    address: student?.address || "",
    phoneNumber: student?.phoneNumber || "",
    email: student?.email || "",
    classroomId: student?.classroomId?._id || "",
    status: student?.status || "active",
  };

  useEffect(() => {
    if (isOpen) {
      const fetchClassrooms = async () => {
        try {
          setLoadingClassrooms(true);
          setErrorClassrooms(null);
          const data = await getAllClassrooms();
          setClassrooms(data);
        } catch (error: any) {
          console.error("Erreur lors de la récupération des classes:", error);
          setErrorClassrooms("Erreur lors de la récupération des classes.");
        } finally {
          setLoadingClassrooms(false);
        }
      };

      fetchClassrooms();
      setParents(student?.parents || []);
    }
  }, [isOpen, student]);

  const validateName = (value: string, fieldName: string) => {
    if (!value) return `${fieldName} est requis`;
    if (!/^[A-Za-zÀ-ÿ\s-]+$/.test(value)) return `${fieldName} doit contenir uniquement des lettres, espaces ou tirets`;
    return "";
  };

  const validateEmail = (value: string) => {
    if (!value) return "Email est requis";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email invalide";
    return "";
  };

  const validateDateOfBirth = (value: string) => {
    if (!value) return "Date de naissance est requise";
    const date = new Date(value);
    const today = new Date();
    let age = today.getFullYear() - date.getFullYear();
    const monthDiff = today.getMonth() - date.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < date.getDate())) {
      age--;
    }
    if (age < 5 || age > 25) return "L'âge doit être entre 5 et 25 ans";
    return "";
  };

  const validateStudentData = (data: Record<string, any>) => {
    const newErrors: Record<string, string> = {};
    studentFields.forEach((field) => {
      const value = data[field.name];
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} est requis`;
      } else {
        if (field.name === "firstName" || field.name === "lastName") {
          const error = validateName(value, field.label);
          if (error) newErrors[field.name] = error;
        }
        if (field.name === "email") {
          const error = validateEmail(value);
          if (error) newErrors[field.name] = error;
        }
        if (field.name === "dateOfBirth") {
          const error = validateDateOfBirth(value);
          if (error) newErrors[field.name] = error;
        }
      }
    });
    return newErrors;
  };

  const validateParentData = (data: Record<string, any>) => {
    const newErrors: Record<string, string> = {};
    parentFields.forEach((field) => {
      const value = data[field.name];
      if (field.required && !value) {
        newErrors[field.name] = `${field.label} est requis`;
      } else {
        if (field.name === "firstName" || field.name === "lastName") {
          const error = validateName(value, field.label);
          if (error) newErrors[field.name] = error;
        }
        if (field.name === "email") {
          const error = validateEmail(value);
          if (error) newErrors[field.name] = error;
        }
      }
    });
    return newErrors;
  };

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
    { name: "classroomId", label: "Classe", type: "select", options: classrooms.map((classroom) => ({
      value: classroom._id,
      label: classroom.name,
    })), required: true },
    { name: "status", label: "Statut", type: "select", options: [
      { value: "active", label: "Actif" },
      { value: "graduated", label: "Gradué(e)" },
      { value: "transferred", label: "Transféré(e)" },
      { value: "excluded", label: "Exclu(e)" },
    ], required: true },
  ];

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

  const handleParentChange = (name: string, value: string) => {
    setParentData((prev) => {
      const updatedData = { ...prev, [name]: value };
      const newErrors = validateParentData(updatedData);
      setParentErrors(newErrors);
      return updatedData;
    });
  };

  const handleAddOrUpdateParent = (e: React.MouseEvent) => {
    e.preventDefault(); // Empêche la soumission du formulaire principal
    const newErrors = validateParentData(parentData);
    setParentErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (editingParentIndex !== null) {
      setParents((prev) =>
        prev.map((parent, index) =>
          index === editingParentIndex ? { ...parent, ...parentData } : parent
        )
      );
    } else {
      setParents((prev) => [...prev, parentData]);
    }

    setParentData({});
    setShowParentFields(false);
    setEditingParentIndex(null);
    setParentErrors({});
  };

  const handleEditParent = (e: React.MouseEvent, index: number) => {
    e.preventDefault(); // Empêche la soumission du formulaire principal
    setParentData(parents[index]);
    setEditingParentIndex(index);
    setShowParentFields(true);
  };

  const handleSubmit = async (studentData: any) => {
    const newErrors = validateStudentData(studentData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const studentPayload = {
        ...studentData,
        parents: parents.map((parent) => ({
          ...parent,
          _id: parent._id || undefined,
        })),
      };
      const response = await updateStudent(student._id, studentPayload);
      onStudentUpdated(response.student);
      onClose();
      setParents([]);
      setParentData({});
      setShowParentFields(false);
      setEditingParentIndex(null);
      setErrors({});
      setParentErrors({});
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour de l'étudiant:", error);
      alert("Erreur lors de la mise à jour de l'étudiant.");
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      title="Modifier un étudiant"
      fields={studentFields}
      initialData={initialStudentData}
      errors={errors}
      size="lg"
      submitButtonText="Mettre à jour"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium text-gray-800">Parents/Tuteurs ({parents.length}/2)</h3>
          {parents.length < 2 && (
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.preventDefault(); // Empêche la soumission du formulaire principal
                setParentData({});
                setEditingParentIndex(null);
                setShowParentFields(true);
              }}
            >
              Ajouter un parent
            </Button>
          )}
        </div>

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
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => handleEditParent(e, index)} // Ajout de e.preventDefault()
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      className="h-4 w-4"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.536L16.732 3.732z"
                      />
                    </svg>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.preventDefault(); // Empêche la soumission du formulaire principal
                      setParents(parents.filter((_, i) => i !== index));
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X size={16} />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        {showParentFields && (
          <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h4 className="text-md font-medium text-gray-800">
              {editingParentIndex !== null ? "Modifier un parent/tuteur" : "Nouveau parent/tuteur"}
            </h4>
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
                  {parentErrors[field.name] && (
                    <p className="text-red-500 text-xs">{parentErrors[field.name]}</p>
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.preventDefault(); // Empêche la soumission du formulaire principal
                  setShowParentFields(false);
                  setParentData({});
                  setEditingParentIndex(null);
                  setParentErrors({});
                }}
                className="text-gray-600 border-gray-300"
              >
                Annuler
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleAddOrUpdateParent} // Ajout de e.preventDefault()
              >
                {editingParentIndex !== null ? "Mettre à jour le parent" : "Ajouter le parent"}
              </Button>
            </div>
          </div>
        )}
      </div>

      {loadingClassrooms && (
        <div className="mt-4 text-center text-gray-500">
          Chargement des classes...
        </div>
      )}
      {errorClassrooms && (
        <div className="mt-4 text-center text-red-500">
          {errorClassrooms}
        </div>
      )}
    </Modal>
  );
}