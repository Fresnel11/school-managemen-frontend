import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { FormField } from "./FormField";

type SchoolInfo = {
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

interface SchoolInfoFormProps {
  schoolInfo: SchoolInfo;
  onChange: (info: Partial<SchoolInfo>) => void;
  onNext: () => void;
}

export const SchoolInfoForm = ({ schoolInfo, onChange, onNext }: SchoolInfoFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const languageOptions = [
    { id: "french", label: "Français" },
    { id: "english", label: "Anglais" },
    { id: "arabic", label: "Arabe" },
    { id: "spanish", label: "Espagnol" },
  ];

  const handleLanguageChange = (language: string) => {
    const updatedLanguages = schoolInfo.languages.includes(language)
      ? schoolInfo.languages.filter((lang) => lang !== language)
      : [...schoolInfo.languages, language];
    
    onChange({ languages: updatedLanguages });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!schoolInfo.name.trim()) {
      newErrors.name = "Le nom de l'école est requis";
    }
    
    if (!schoolInfo.address.trim()) {
      newErrors.address = "L'adresse est requise";
    }
    
    if (!schoolInfo.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis";
    } else if (!/^\d{8,15}$/.test(schoolInfo.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Numéro de téléphone invalide";
    }
    
    if (!schoolInfo.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(schoolInfo.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!schoolInfo.schoolType) {
      newErrors.schoolType = "Le type d'école est requis";
    }
    
    if (!schoolInfo.status) {
      newErrors.status = "Le statut est requis";
    }
    
    if (!schoolInfo.officialId.trim()) {
      newErrors.officialId = "L'identifiant officiel est requis";
    }
    
    if (schoolInfo.languages.length === 0) {
      newErrors.languages = "Sélectionnez au moins une langue";
    }
    
    if (schoolInfo.website && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(schoolInfo.website)) {
      newErrors.website = "Format de site web invalide";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-medium">Informations de l'école</h3>
      
      <FormField
        label="Nom de l'école"
        error={errors.name}
      >
        <Input
          value={schoolInfo.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder="Entrez le nom de l'école"
        />
      </FormField>
      
      <FormField
        label="Adresse"
        error={errors.address}
      >
        <Input
          value={schoolInfo.address}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder="Adresse complète"
        />
      </FormField>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Téléphone"
          error={errors.phone}
        >
          <Input
  value={schoolInfo.phone}
  onChange={(e) => {
    const value = e.target.value;
    // Filtrer pour ne garder que les chiffres
    const filteredValue = value.replace(/[^0-9+]/g, "");
    onChange({ phone: filteredValue });
  }}
  placeholder="Numéro de téléphone"
  type="tel"
/>

        </FormField>
        
        <FormField
          label="Email"
          error={errors.email}
        >
          <Input
            value={schoolInfo.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder="Email de l'école"
            type="email"
          />
        </FormField>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Type d'école"
          error={errors.schoolType}
        >
          <Select
            value={schoolInfo.schoolType}
            onValueChange={(value) => onChange({ schoolType: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="secondary">Secondaire</SelectItem>
              <SelectItem value="high">Lycée</SelectItem>
              <SelectItem value="university">Université</SelectItem>
              <SelectItem value="professional">Formation professionnelle</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        
        <FormField
          label="Statut"
          error={errors.status}
        >
          <Select
            value={schoolInfo.status}
            onValueChange={(value) => onChange({ status: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Privé</SelectItem>
              <SelectItem value="confessional">Confessionnel</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Boîte postale"
          error={errors.postalBox}
        >
          <Input
            value={schoolInfo.postalBox}
            onChange={(e) => onChange({ postalBox: e.target.value })}
            placeholder="Boîte postale (optionnel)"
          />
        </FormField>
        
        <FormField
          label="Identifiant officiel"
          error={errors.officialId}
        >
          <Input
            value={schoolInfo.officialId}
            onChange={(e) => onChange({ officialId: e.target.value })}
            placeholder="Numéro d'identification officiel"
          />
        </FormField>
      </div>
      
      <FormField
        label="Langues d'enseignement"
        error={errors.languages}
      >
        <div className="grid grid-cols-2 gap-2">
          {languageOptions.map((language) => (
            <div key={language.id} className="flex items-center space-x-2">
              <Checkbox
                id={`language-${language.id}`}
                checked={schoolInfo.languages.includes(language.id)}
                onCheckedChange={() => handleLanguageChange(language.id)}
              />
              <Label htmlFor={`language-${language.id}`}>{language.label}</Label>
            </div>
          ))}
        </div>
      </FormField>
      
      <FormField
        label="Site web"
        error={errors.website}
      >
        <Input
          value={schoolInfo.website}
          onChange={(e) => onChange({ website: e.target.value })}
          placeholder="Site web (optionnel)"
          type="url"
        />
      </FormField>
      
      <div className="flex justify-end">
        <Button onClick={handleNext}>
          Suivant
        </Button>
      </div>
    </div>
  );
};