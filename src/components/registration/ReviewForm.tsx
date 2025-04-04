import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

interface ReviewFormProps {
  schoolInfo: {
    name: string;
    address: string;
    phone: string;
    email: string;
    schoolType: string;
    status: string;
    postalBox: string;
    officialId: string;
    languages: string[];
    website: string;
  };
  adminInfo: {
    fullName: string;
    email: string;
    dateOfBirth: string;
    gender: string;
    phone: string;
    address: string;
    password: string;
    confirmPassword: string;
    profilePhoto: File | null;
  };
  onPrev: () => void;
  onSubmit: () => void;
}

export const ReviewForm = ({ schoolInfo, adminInfo, onPrev, onSubmit }: ReviewFormProps) => {
  const formatSchoolType = (type: string) => {
    const types: Record<string, string> = {
      primary: "Primaire",
      secondary: "Secondaire",
      high: "Lycée",
      university: "Université",
      professional: "Formation professionnelle",
    };
    return types[type] || type;
  };

  const formatStatus = (status: string) => {
    const statuses: Record<string, string> = {
      public: "Public",
      private: "Privé",
      "semi-private": "Semi-privé",
    };
    return statuses[status] || status;
  };

  const formatGender = (gender: string) => {
    const genders: Record<string, string> = {
      male: "Homme",
      female: "Femme",
      other: "Autre",
    };
    return genders[gender] || gender;
  };

  const formatLanguages = (languages: string[]) => {
    const languageMap: Record<string, string> = {
      french: "Français",
      english: "Anglais",
      arabic: "Arabe",
      spanish: "Espagnol",
    };
    
    return languages.map(lang => languageMap[lang] || lang).join(", ");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Vérification des informations</h3>
      <p className="text-sm text-gray-500">
        Veuillez vérifier les informations ci-dessous avant de soumettre votre demande d'inscription.
      </p>
      
      <div className="space-y-4">
        <h4 className="font-medium">Informations de l'école</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Nom de l'école</p>
            <p className="font-medium">{schoolInfo.name}</p>
          </div>
          <div>
            <p className="text-gray-500">Adresse</p>
            <p className="font-medium">{schoolInfo.address}</p>
          </div>
          <div>
            <p className="text-gray-500">Téléphone</p>
            <p className="font-medium">{schoolInfo.phone}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{schoolInfo.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Type d'école</p>
            <p className="font-medium">{formatSchoolType(schoolInfo.schoolType)}</p>
          </div>
          <div>
            <p className="text-gray-500">Statut</p>
            <p className="font-medium">{formatStatus(schoolInfo.status)}</p>
          </div>
          <div>
            <p className="text-gray-500">Boîte postale</p>
            <p className="font-medium">{schoolInfo.postalBox || "Non spécifié"}</p>
          </div>
          <div>
            <p className="text-gray-500">Identifiant officiel</p>
            <p className="font-medium">{schoolInfo.officialId}</p>
          </div>
          <div>
            <p className="text-gray-500">Langues d'enseignement</p>
            <p className="font-medium">{formatLanguages(schoolInfo.languages)}</p>
          </div>
          <div>
            <p className="text-gray-500">Site web</p>
            <p className="font-medium">{schoolInfo.website || "Non spécifié"}</p>
          </div>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-4">
        <h4 className="font-medium">Informations de l'administrateur</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-gray-500">Nom complet</p>
            <p className="font-medium">{adminInfo.fullName}</p>
          </div>
          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{adminInfo.email}</p>
          </div>
          <div>
            <p className="text-gray-500">Date de naissance</p>
            <p className="font-medium">{formatDate(adminInfo.dateOfBirth)}</p>
          </div>
          <div>
            <p className="text-gray-500">Genre</p>
            <p className="font-medium">{formatGender(adminInfo.gender)}</p>
          </div>
          <div>
            <p className="text-gray-500">Téléphone</p>
            <p className="font-medium">{adminInfo.phone}</p>
          </div>
          <div>
            <p className="text-gray-500">Adresse</p>
            <p className="font-medium">{adminInfo.address}</p>
          </div>
          <div>
            <p className="text-gray-500">Photo de profil</p>
            <p className="font-medium">
              {adminInfo.profilePhoto ? adminInfo.profilePhoto.name : "Non fournie"}
            </p>
          </div>
        </div>
      </div>
      
      <div className="bg-blue-50 p-4 rounded-md">
        <p className="text-sm text-blue-800">
          <strong>Note:</strong> Après soumission, votre demande sera examinée par notre équipe. 
          Vous recevrez un email de confirmation une fois votre compte validé.
        </p>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Précédent
        </Button>
        <Button onClick={onSubmit}>
          Soumettre la demande
        </Button>
      </div>
    </div>
  );
};