import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { FormField } from "./FormField";

type AdminInfo = {
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

interface AdminInfoFormProps {
  adminInfo: AdminInfo;
  onChange: (info: Partial<AdminInfo>) => void;
  onNext: () => void;
  onPrev: () => void;
}


export const AdminInfoForm = ({ adminInfo, onChange, onNext, onPrev }: AdminInfoFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onChange({ profilePhoto: e.target.files[0] });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!adminInfo.fullName.trim()) {
      newErrors.fullName = "Le nom complet est requis";
    }
    
    if (!adminInfo.email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminInfo.email)) {
      newErrors.email = "Format d'email invalide";
    }
    
    if (!adminInfo.dateOfBirth) {
      newErrors.dateOfBirth = "La date de naissance est requise";
    } else {
      const birthDate = new Date(adminInfo.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = "L'administrateur doit avoir au moins 18 ans";
      }
    }
    
    if (!adminInfo.gender) {
      newErrors.gender = "Le genre est requis";
    }
    
    if (!adminInfo.phone.trim()) {
      newErrors.phone = "Le numéro de téléphone est requis";
    } else if (!/^\d{8,15}$/.test(adminInfo.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Numéro de téléphone invalide";
    }
    
    if (!adminInfo.address.trim()) {
      newErrors.address = "L'adresse est requise";
    }
    
    if (!adminInfo.password) {
      newErrors.password = "Le mot de passe est requis";
    } else if (adminInfo.password.length < 8) {
      newErrors.password = "Le mot de passe doit contenir au moins 8 caractères";
    }
    
    if (adminInfo.password !== adminInfo.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
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
      <h3 className="text-lg font-medium">Informations de l'administrateur</h3>
      
      <FormField
        label="Nom complet"
        error={errors.fullName}
      >
        <Input
          value={adminInfo.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          placeholder="Nom et prénom"
        />
      </FormField>
      
      <FormField
        label="Email"
        error={errors.email}
      >
        <Input
          value={adminInfo.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder="Email de l'administrateur"
          type="email"
        />
      </FormField>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Date de naissance"
          error={errors.dateOfBirth}
        >
          <Input
            value={adminInfo.dateOfBirth}
            onChange={(e) => onChange({ dateOfBirth: e.target.value })}
            type="date"
          />
        </FormField>
        
        <FormField
          label="Genre"
          error={errors.gender}
        >
          <Select
            value={adminInfo.gender}
            onValueChange={(value) => onChange({ gender: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Sélectionnez un genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Homme</SelectItem>
              <SelectItem value="female">Femme</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Téléphone"
          error={errors.phone}
        >
          <Input
            value={adminInfo.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder="Numéro de téléphone"
            type="tel"
          />
        </FormField>
        
        <FormField
          label="Adresse"
          error={errors.address}
        >
          <Input
            value={adminInfo.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="Adresse de l'administrateur"
          />
        </FormField>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label="Mot de passe"
          error={errors.password}
        >
          <Input
            value={adminInfo.password}
            onChange={(e) => onChange({ password: e.target.value })}
            placeholder="Créez un mot de passe"type="password"
          />
        </FormField>
        
        <FormField
          label="Confirmer le mot de passe"
          error={errors.confirmPassword}
        >
          <Input
            value={adminInfo.confirmPassword}
            onChange={(e) => onChange({ confirmPassword: e.target.value })}
            placeholder="Confirmez le mot de passe"
            type="password"
          />
        </FormField>
      </div>
      
      <FormField
        label="Photo de profil"
        error={errors.profilePhoto}
      >
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="cursor-pointer"
        />
        <p className="text-xs text-gray-500 mt-1">
          Format recommandé: JPG, PNG. Taille max: 2MB
        </p>
      </FormField>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={onPrev}>
          Précédent
        </Button>
        <Button onClick={handleNext}>
          Suivant
        </Button>
      </div>
    </div>
  );
};