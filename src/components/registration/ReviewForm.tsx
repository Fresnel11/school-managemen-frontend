import { motion } from "framer-motion"; // Pour les animations
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { School, User, Info } from "lucide-react"; // Icônes

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

  // Animation pour les cartes
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.02 },
  };

  // URL de l'image de profil (si elle existe)
  const profilePhotoUrl = adminInfo.profilePhoto ? URL.createObjectURL(adminInfo.profilePhoto) : null;

  return (
    <div className="bg-white rounded-lg border border-gray-200 flex flex-col h-full">
      {/* Contenu avec défilement */}
      <div className="flex-1 p-6 max-h-[calc(80vh-80px)] overflow-auto space-y-6">
        {/* Titre principal */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-extrabold text-gray-900">
            Vérification des informations
          </h3>
          <p className="mt-2 text-sm text-gray-500 font-medium">
            Veuillez vérifier les informations ci-dessous avant de soumettre votre demande d'inscription.
          </p>
        </motion.div>

        {/* Section : Informations de l'école */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-4"
        >
          <div className="flex items-center space-x-3">
            <School className="w-6 h-6 text-gray-700" />
            <h4 className="text-xl font-semibold text-gray-800">Informations de l'école</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Nom de l'école", value: schoolInfo.name },
              { label: "Adresse", value: schoolInfo.address },
              { label: "Téléphone", value: schoolInfo.phone },
              { label: "Email", value: schoolInfo.email },
              { label: "Type d'école", value: formatSchoolType(schoolInfo.schoolType) },
              { label: "Statut", value: formatStatus(schoolInfo.status) },
              { label: "Boîte postale", value: schoolInfo.postalBox || "Non spécifié" },
              { label: "Identifiant officiel", value: schoolInfo.officialId },
              { label: "Langues d'enseignement", value: formatLanguages(schoolInfo.languages) },
              { label: "Site web", value: schoolInfo.website || "Non spécifié" },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative p-4 rounded-lg bg-white border border-gray-200 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                <p className="text-base font-semibold text-gray-800">{item.value}</p>
                <div className="absolute top-0 right-0 w-12 h-12 bg-gray-200 rounded-bl-full opacity-20" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Séparateur */}
        <Separator className="bg-gray-300 h-1 rounded-full" />

        {/* Section : Informations de l'administrateur */}
        <motion.div
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          className="bg-gray-50 rounded-lg p-6 border border-gray-200 space-y-4"
        >
          <div className="flex items-center space-x-3">
            <User className="w-6 h-6 text-gray-700" />
            <h4 className="text-xl font-semibold text-gray-800">Informations de l'administrateur</h4>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: "Nom complet", value: adminInfo.fullName },
              { label: "Email", value: adminInfo.email },
              { label: "Date de naissance", value: formatDate(adminInfo.dateOfBirth) },
              { label: "Genre", value: formatGender(adminInfo.gender) },
              { label: "Téléphone", value: adminInfo.phone },
              { label: "Adresse", value: adminInfo.address },
              // {
              //   label: "Photo de profil",
              //   value: profilePhotoUrl ? (
              //     <img
              //       src={profilePhotoUrl}
              //       alt="Photo de profil"
              //       className="w-18 h-18  object-cover border border-gray-300"
              //     />
              //   ) : (
              //     <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 font-medium">
              //       N/A
              //     </div>
              //   ),
              // },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative p-4 rounded-lg bg-white border border-gray-200 transition-all duration-300"
                whileHover={{ scale: 1.03 }}
              >
                <p className="text-sm text-gray-500 font-medium">{item.label}</p>
                {typeof item.value === "string" ? (
                  <p className="text-base font-semibold text-gray-800">{item.value}</p>
                ) : (
                  <div className="mt-2">{item.value}</div>
                )}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gray-200 rounded-bl-full opacity-20" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Note */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-100 p-4 rounded-lg flex items-start space-x-3"
        >
          <Info className="w-5 h-5 text-gray-600 mt-1" />
          <p className="text-sm text-gray-700 font-medium">
            <strong>Note :</strong> Après soumission, votre demande sera examinée par notre équipe. 
            Vous recevrez un email de confirmation une fois votre compte validé.
          </p>
        </motion.div>
      </div>

      {/* Boutons fixes en bas */}
      <div className="p-6 border-t border-gray-200 bg-white flex justify-between">
        <Button
          variant="outline"
          onClick={onPrev}
          className="border-2 border-gray-600 text-gray-600 font-semibold py-2 px-6 rounded-lg hover:bg-gray-100 transition-all duration-300"
        >
          Précédent
        </Button>
        <Button
          onClick={onSubmit}
          className="bg-gray-800 text-white font-semibold py-2 px-6 rounded-lg hover:bg-gray-900 transition-all duration-300"
        >
          Soumettre la demande
        </Button>
      </div>
    </div>
  );
};