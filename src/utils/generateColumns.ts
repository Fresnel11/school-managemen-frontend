// Options pour personnaliser les colonnes
interface ColumnOptions {
    displayFields?: string[]; // Champs à afficher (si non spécifié, tous les champs sont affichés)
    hiddenFields?: string[]; // Champs à masquer
    customRender?: { [key: string]: (row: any) => JSX.Element }; // Rendu personnalisé pour certains champs
    sortableFields?: string[]; // Champs triables
    actions?: {
      onView?: (row: any) => void;
      onEdit?: (row: any) => void;
      onDelete?: (row: any) => void;
      renderActions?: (row: any) => JSX.Element; // Rendu personnalisé pour la colonne "Actions"
    }; // Gestion des actions
    customHeaders?: { [key: string]: string }; // En-têtes personnalisés
  }
  
  // Définir le type de colonne attendu par DataTable
  interface Column {
    header: string;
    accessor: string;
    sortable: boolean;
    cell: (row: any) => any;
  }
  
  // Fonction pour générer les colonnes dynamiquement
  export const generateColumns = (data: any[], options: ColumnOptions = {}): Column[] => {
    if (!data || data.length === 0) return [];
  
    const {
      displayFields,
      hiddenFields = [],
      customRender = {},
      sortableFields = [],
      actions,
      customHeaders = {}, // Ajouter customHeaders avec une valeur par défaut
    } = options;
  
    // Récupérer tous les champs possibles à partir de la première ligne de données
    const firstRow = data[0];
    const allFields = Object.keys(firstRow).filter(
      (key) => !hiddenFields.includes(key) && key !== "_id" && key !== "__v"
    );
  
    // Déterminer les champs à afficher
    const fieldsToDisplay = displayFields || allFields;
  
    // Générer les colonnes
    const columns: Column[] = fieldsToDisplay.map((field) => {
      // Utiliser l'en-tête personnalisé s'il existe, sinon capitaliser le nom du champ
      const header = customHeaders[field] || field
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
  
      // Définir un rendu par défaut ou personnalisé
      const cellRenderer = customRender[field] || ((row: any) => {
        const value = row[field];
  
        // Gestion des objets imbriqués (par exemple, classroomId.name)
        if (typeof value === "object" && value !== null) {
          if (field.toLowerCase().includes("classroom")) {
            return value?.name || "N/A";
          }
          return JSON.stringify(value);
        }
  
        return value?.toString() || "N/A";
      });
  
      return {
        header,
        accessor: field,
        sortable: sortableFields.includes(field),
        cell: cellRenderer,
      };
    });
  
    // Ajouter une colonne "Actions" si spécifiée
    if (actions) {
      columns.push({
        header: "Actions",
        accessor: "actions",
        sortable: false,
        cell: actions.renderActions || (() => "N/A"),
      });
    }
  
    return columns;
  };