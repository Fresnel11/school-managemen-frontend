import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Eye, Edit, Trash } from "lucide-react";
import { DataTable } from "./DataTable";
import { getAllStudents, deleteStudent } from "../services/studentService";
import { generateColumns } from "../utils/generateColumns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AddStudentModal } from "./AddStudentModal";

export function Students() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour le modal

  // Fonction pour charger les étudiants
  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getAllStudents();
      setStudents(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la récupération des étudiants.");
    } finally {
      setLoading(false);
    }
  };

  // Récupérer les étudiants au chargement initial
  useEffect(() => {
    fetchStudents();
  }, []);

  // Définir un rendu personnalisé pour le statut
  const renderStatus = (row: any) => {
    const statusMap: Record<string, { color: string; bg: string; label: string }> = {
      active: { color: "text-green-700", bg: "bg-green-100", label: "Actif" },
      graduated: { color: "text-blue-700", bg: "bg-blue-100", label: "Gradué(e)" },
      transferred: { color: "text-orange-700", bg: "bg-orange-100", label: "Transféré(e)" },
      excluded: { color: "text-red-700", bg: "bg-red-100", label: "Exclu(e)" },
    };
    const style = statusMap[row.status?.toLowerCase()] || { color: "text-gray-700", bg: "bg-gray-100", label: "N/A" };
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.color} ${style.bg}`}>
        {style.label}
      </span>
    );
  };

  // Définir le rendu pour la colonne "Actions"
  const renderActions = (row: any) => (
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
            console.log("View student:", row);
            // Implémenter la logique pour afficher les détails
          }}
          className="cursor-pointer"
        >
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            console.log("Edit student:", row);
            // Implémenter la logique pour modifier l'étudiant
          }}
          className="cursor-pointer"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            if (window.confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) {
              try {
                await deleteStudent(row._id);
                setStudents(students.filter((student) => student._id !== row._id));
              } catch (err: any) {
                setError("Erreur lors de la suppression de l'étudiant.");
              }
            }
          }}
          className="cursor-pointer text-destructive"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  // Générer les colonnes dynamiquement
  const columns = generateColumns(students, {
    displayFields: ["firstName", "lastName", "email", "classroomId", "status"],
    hiddenFields: ["_id", "__v", "parents", "inscriptions", "documents", "dateOfBirth", "gender", "address", "phoneNumber"],
    sortableFields: ["firstName", "lastName", "email", "classroomId", "status"],
    customRender: {
      firstName: (row: any) => (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback>{row.firstName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{`${row.firstName} ${row.lastName}`}</div>
            <div className="text-xs text-gray-500">{row.email}</div>
          </div>
        </div>
      ),
      classroomId: (row: any) => <span>{row.classroomId?.name || "N/A"}</span>,
      status: renderStatus,
    },
    actions: {
      renderActions,
    },
    customHeaders: {
      classroomId: "Classroom", // Personnaliser l'en-tête de la colonne classroomId
    },
  });

  // Gérer l'ajout d'un étudiant
  const handleStudentAdded = async () => {
    // Recharger les données complètes après l'ajout
    await fetchStudents();
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Students</h1>
        <p className="text-muted-foreground">
          Manage and view all student information.
        </p>
      </div>

      <div className="flex justify-end">
        <Button size="sm" className="h-9" onClick={() => setIsModalOpen(true)}>
          Add Student
        </Button>
      </div>

      {/* Afficher un message de chargement ou d'erreur si nécessaire */}
      {loading && <p className="text-center text-gray-500">Chargement des étudiants...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* Afficher le tableau si les données sont prêtes */}
      <div className="rounded-xl overflow-hidden backdrop-blur-sm bg-white/70 border border-gray-100 shadow-lg">
        {!loading && !error && (
          <DataTable
            columns={columns}
            data={students}
            searchPlaceholder="Search students..."
            searchColumn="firstName"
            pageSize={10}
            pageSizeOptions={[5, 10, 20, 50]}
            showActions={true}
          />
        )}
      </div>

      {/* Modal pour ajouter un étudiant */}
      <AddStudentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onStudentAdded={handleStudentAdded}
      />
    </div>
  );
}