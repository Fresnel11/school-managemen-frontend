import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext"; // Importer useAuth pour le token
import { DataTable } from "./DataTable";
import { generateColumns } from "../utils/generateColumns"; // Assure-toi que le chemin est correct
import { AddClassroomModal } from "./AddClassroomModal"; // Importer le modal
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal"; // Importer le composant Modal
import { MoreHorizontal, Eye, Edit, Trash } from "lucide-react";
import {
  createClassroom,
  updateClassroom,
  getAllClassrooms,
  deleteClassroom,
} from "../services/classroomServices"; // Importer le service

// Définir l'interface Classroom avec tous les champs possibles
interface Classroom {
  _id: string;
  name: string;
  level: string;
  capacity: number;
  description?: string; // Optionnel
  school: string; // Ajouté pour correspondre au modèle côté back-end
  createdAt: string;
}

// Définir l'interface pour les données soumises via le formulaire
interface ClassroomFormData {
  name: string;
  level: string;
  capacity: string | number; // Peut être une chaîne dans le formulaire, converti en nombre
  description?: string;
}

export function Classrooms() {
  const { user } = useAuth(); // Récupérer l'utilisateur pour le token et les infos
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClassroom, setSelectedClassroom] = useState<Classroom | null>(null);
  const [loading, setLoading] = useState(false);

  // Récupérer les classes lors du montage du composant
  useEffect(() => {
    const fetchClassrooms = async () => {
      if (!user || !user.token) {
        
        return;
      }

      try {
        setLoading(true);
        const response = await getAllClassrooms(user.token); // Passer le token à getAllClassrooms
        setClassrooms(response);
      } catch (error: any) {
        console.error("Erreur lors de la récupération des classes :", error);
        
      } finally {
        setLoading(false);
      }
    };
    fetchClassrooms();
  }, [user]); // Dépendance sur user pour recharger si l'utilisateur change

  // Créer une nouvelle classe
  const handleCreateClassroom = async (data: ClassroomFormData) => {
    console.log("User object:", user);

    // Vérifier que l'utilisateur est connecté et a une école associée
    if (!user || !user.school || !user.school._id) {
      console.error("Erreur : Utilisateur non connecté ou aucune école associée.");
      
      return;
    }

    try {
      const classroomData = {
        ...data,
        capacity: Number(data.capacity), // Convertir en nombre
        school: user.school._id, // Utiliser user.school._id directement
      };
      const response = await createClassroom(classroomData, user.token);
      setClassrooms([...classrooms, response.classroom]);
      setIsAddModalOpen(false);
      
    } catch (error: any) {
      console.error("Erreur lors de la création de la classe :", error);
      
    }
  };

  // Modifier une classe existante
  const handleUpdateClassroom = async (data: ClassroomFormData) => {
    if (!selectedClassroom || !user || !user.token) {
      
      return;
    }

    try {
      const updatedData = {
        ...data,
        capacity: Number(data.capacity), // S'assurer que capacity est un nombre
      };
      const response = await updateClassroom(selectedClassroom._id, updatedData, user.token);
      setClassrooms(
        classrooms.map((cls) =>
          cls._id === selectedClassroom._id ? response.classroom : cls
        )
      );
      setIsEditModalOpen(false);
      setSelectedClassroom(null);
      
    } catch (error: any) {
      console.error("Erreur lors de la mise à jour de la classe :", error);
      
    }
  };

  // Supprimer une classe
  const handleDeleteClassroom = async () => {
    if (!selectedClassroom || !user || !user.token) {
      
      return;
    }

    try {
      await deleteClassroom(selectedClassroom._id, user.token);
      setClassrooms(classrooms.filter((cls) => cls._id !== selectedClassroom._id));
      setIsDeleteModalOpen(false);
      setSelectedClassroom(null);
      
    } catch (error: any) {
      console.error("Erreur lors de la suppression de la classe :", error);
      
    }
  };

  // Définir les colonnes pour le DataTable en utilisant generateColumns
  const columns = generateColumns(classrooms, {
    displayFields: ["name", "level", "capacity", "description", "createdAt"],
    hiddenFields: ["_id", "school"],
    sortableFields: ["name", "level", "capacity", "createdAt"],
    customRender: {
      createdAt: (row: Classroom) => <span>{new Date(row.createdAt).toLocaleDateString()}</span>,
      level: (row: Classroom) => {
        const levelMap: { [key: string]: string } = {
          "6ème": "6ème",
          "5ème": "5ème",
          "4ème": "4ème",
          "3ème": "3ème",
          "2nd": "2nde",
          "1ere": "1ère",
          Terminal: "Terminale",
        };
        return <span>{levelMap[row.level] || row.level}</span>;
      },
    },
    customHeaders: {
      name: "Nom",
      level: "Niveau",
      capacity: "Capacité",
      description: "Description",
      createdAt: "Date de Création",
    },
    actions: {
      renderActions: (row: Classroom) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                setSelectedClassroom(row);
                setIsViewModalOpen(true);
              }}
              className="cursor-pointer"
            >
              <Eye className="mr-2 h-4 w-4" />
              Voir
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedClassroom(row);
                setIsEditModalOpen(true);
              }}
              className="cursor-pointer"
            >
              <Edit className="mr-2 h-4 w-4" />
              Modifier
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                setSelectedClassroom(row);
                setIsDeleteModalOpen(true);
              }}
              className="cursor-pointer text-destructive"
            >
              <Trash className="mr-2 h-4 w-4" />
              Supprimer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Gestion des Classes</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>Ajouter une Classe</Button>
      </div>

      {/* Tableau des classes */}
      {loading ? (
        <p>Chargement des classes...</p>
      ) : (
        <div className="overflow-x-auto rounded-xl backdrop-blur-sm bg-white/70 border border-gray-100 shadow-lg">
          <DataTable
            columns={columns}
            data={classrooms}
            searchPlaceholder="Rechercher une classe..."
            searchColumn="name"
            pageSize={10}
            pageSizeOptions={[5, 10, 20, 50]}
            showActions={true}
          />
        </div>
      )}

      {/* Modal d'ajout */}
      <AddClassroomModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleCreateClassroom}
        submitButtonText="Ajouter"
      />

      {/* Modal de modification */}
      <AddClassroomModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedClassroom(null);
        }}
        onSubmit={handleUpdateClassroom}
        initialData={selectedClassroom || {}}
        submitButtonText="Modifier"
      />

      {/* Modal de visualisation */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedClassroom(null);
        }}
        title="Détails de la Classe"
        isReadOnly={true}
      >
        {selectedClassroom && (
          <div className="space-y-4">
            <p>
              <strong>Nom :</strong> {selectedClassroom.name}
            </p>
            <p>
              <strong>Niveau :</strong> {selectedClassroom.level}
            </p>
            <p>
              <strong>Capacité :</strong> {selectedClassroom.capacity}
            </p>
            <p>
              <strong>Description :</strong> {selectedClassroom.description || "N/A"}
            </p>
            <p>
              <strong>Date de Création :</strong>{" "}
              {new Date(selectedClassroom.createdAt).toLocaleDateString()}
            </p>
          </div>
        )}
      </Modal>

      {/* Modal de confirmation de suppression */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedClassroom(null);
        }}
        onSubmit={handleDeleteClassroom}
        title="Confirmer la Suppression"
        submitButtonText="Supprimer"
      >
        <p>
          Êtes-vous sûr de vouloir supprimer la classe{" "}
          <strong>{selectedClassroom?.name}</strong> ?
        </p>
      </Modal>
    </div>
  );
}