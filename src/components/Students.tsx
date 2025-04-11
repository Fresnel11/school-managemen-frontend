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
import { MoreHorizontal, Eye, Edit, Trash, Archive } from "lucide-react";
import { DataTable } from "./DataTable";
import { getAllStudents, deleteStudent, archiveStudent } from "../services/studentService";
import { generateColumns } from "../utils/generateColumns";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AddStudentModal } from "./AddStudentModal";
import { DeleteStudentModal } from "./DeleteStudentModal";
import { ArchiveStudentModal } from "./ArchiveStudentModal";
import { EditStudentModal } from "./EditStudentModal";
import { ViewStudentDetailsModal } from "./ViewStudentDetailsModal";
import { StudentStats } from "./StudentStats";
import { NotificationProvider, Notification, useNotification } from "../components/ui/Notification";

export function Students() {
  const [students, setStudents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [statsRefreshTrigger, setStatsRefreshTrigger] = useState(0);
  const { notifications, addNotification, removeNotification } = useNotification();

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const data = await getAllStudents();
      setStudents(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Une erreur est survenue lors de la récupération des étudiants.");
      addNotification("Erreur lors de la récupération des étudiants", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const renderStatus = (row: any) => {
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
    const normalizedStatus = row.status?.toLowerCase().replace(/\s/g, "");
    const style = statusMap[normalizedStatus] || { color: "text-gray-700", bg: "bg-gray-100", label: "N/A" };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${style.color} ${style.bg}`}>
        {style.label}
      </span>
    );
  };

  const handleDeleteStudent = async () => {
    if (!selectedStudent) return;
    try {
      await deleteStudent(selectedStudent._id);
      setStudents(students.filter((student) => student._id !== selectedStudent._id));
      addNotification(`Étudiant ${selectedStudent.firstName} ${selectedStudent.lastName} supprimé avec succès`, "success");
      setSelectedStudent(null);
      setStatsRefreshTrigger((prev) => prev + 1);
    } catch (err: any) {
      setError("Erreur lors de la suppression de l'étudiant.");
      addNotification("Erreur lors de la suppression de l'étudiant", "error");
    }
  };

  const handleArchiveStudent = async () => {
    if (!selectedStudent) return;
    try {
      await archiveStudent(selectedStudent._id);
      await fetchStudents();
      addNotification(`Étudiant ${selectedStudent.firstName} ${selectedStudent.lastName} archivé avec succès`, "success");
      setSelectedStudent(null);
      setStatsRefreshTrigger((prev) => prev + 1);
    } catch (err: any) {
      setError("Erreur lors de l'archivage de l'étudiant.");
      addNotification("Erreur lors de l'archivage de l'étudiant", "error");
    }
  };

  const handleStudentUpdated = async (updatedStudent: any) => {
    await fetchStudents();
    addNotification(`Étudiant ${updatedStudent.firstName} ${updatedStudent.lastName} mis à jour avec succès`, "success");
    setStatsRefreshTrigger((prev) => prev + 1);
  };

  const handleStudentAdded = async (student: any) => {
    await fetchStudents();
    addNotification(`Étudiant ${student.firstName} ${student.lastName} ajouté avec succès`, "success");
    setStatsRefreshTrigger((prev) => prev + 1);
  };

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
            setSelectedStudent(row);
            setIsViewModalOpen(true);
          }}
          className="cursor-pointer"
        >
          <Eye className="mr-2 h-4 w-4" />
          View Details
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setSelectedStudent(row);
            setIsEditModalOpen(true);
          }}
          className="cursor-pointer"
        >
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setSelectedStudent(row);
            setIsArchiveModalOpen(true);
          }}
          className="cursor-pointer text-yellow-600"
        >
          <Archive className="mr-2 h-4 w-4" />
          Archive
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            setSelectedStudent(row);
            setIsDeleteModalOpen(true);
          }}
          className="cursor-pointer text-destructive"
        >
          <Trash className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

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
      classroomId: "Classroom",
    },
  });

  return (
    <NotificationProvider>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Titre et description */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Étudiants</h1>
            <p className="text-muted-foreground text-sm sm:text-base">
              Gérez et visualisez toutes les informations des étudiants.
            </p>
          </div>
          <Button
            size="sm"
            className="h-9 w-full sm:w-auto"
            onClick={() => setIsAddModalOpen(true)}
          >
            Add Student
          </Button>
        </div>

        {/* Statistiques */}
        <StudentStats refreshTrigger={statsRefreshTrigger} />

        {/* Messages de chargement et d'erreur */}
        {loading && <p className="text-center text-gray-500">Chargement des étudiants...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Tableau */}
        <div className="overflow-x-auto rounded-xl backdrop-blur-sm bg-white/70 border border-gray-100 shadow-lg">
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

        {/* Modals */}
        <AddStudentModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onStudentAdded={handleStudentAdded}
        />

        {selectedStudent && (
          <EditStudentModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedStudent(null);
            }}
            onStudentUpdated={handleStudentUpdated}
            student={selectedStudent}
          />
        )}

        {selectedStudent && (
          <DeleteStudentModal
            isOpen={isDeleteModalOpen}
            onClose={() => {
              setIsDeleteModalOpen(false);
              setSelectedStudent(null);
            }}
            onConfirm={handleDeleteStudent}
            studentName={`${selectedStudent.firstName} ${selectedStudent.lastName}`}
          />
        )}

        {selectedStudent && (
          <ArchiveStudentModal
            isOpen={isArchiveModalOpen}
            onClose={() => {
              setIsArchiveModalOpen(false);
              setSelectedStudent(null);
            }}
            onConfirm={handleArchiveStudent}
            studentName={`${selectedStudent.firstName} ${selectedStudent.lastName}`}
          />
        )}

        {selectedStudent && (
          <ViewStudentDetailsModal
            isOpen={isViewModalOpen}
            onClose={() => {
              setIsViewModalOpen(false);
              setSelectedStudent(null);
            }}
            student={selectedStudent}
          />
        )}

        {/* Notifications */}
        {notifications.map((notif) => (
          <Notification
            key={notif.id}
            message={notif.message}
            type={notif.type}
            duration={notif.duration}
            onOpenChange={(open) => {
              if (!open) removeNotification(notif.id);
            }}
          />
        ))}
      </div>
    </NotificationProvider>
  );
}