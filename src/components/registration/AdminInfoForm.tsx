import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { FormField } from "./FormField";
import { useLanguage } from "../../context/LanguageContext";
import { adminInfoForm } from "../../data/content";

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

export const AdminInfoForm = ({
  adminInfo,
  onChange,
  onNext,
  onPrev,
}: AdminInfoFormProps) => {
  const { language } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const validTypes = ["image/png", "image/webp", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        profilePhoto: adminInfoForm.errors.profilePhoto[language],
      }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        profilePhoto: adminInfoForm.errors.profilePhoto[language],
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, profilePhoto: "" }));
    onChange({ profilePhoto: file });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!adminInfo.fullName.trim()) {
      newErrors.fullName = adminInfoForm.errors.fullName[language];
    }

    if (!adminInfo.email.trim()) {
      newErrors.email = adminInfoForm.errors.email[language];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminInfo.email)) {
      newErrors.email = adminInfoForm.errors.email[language];
    }

    if (!adminInfo.dateOfBirth) {
      newErrors.dateOfBirth = adminInfoForm.errors.dateOfBirth[language];
    } else {
      const birthDate = new Date(adminInfo.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = language === 'en'
          ? "Admin must be at least 18 years old"
          : "L'administrateur doit avoir au moins 18 ans";
      }
    }

    if (!adminInfo.gender) {
      newErrors.gender = adminInfoForm.errors.gender[language];
    }

    if (!adminInfo.phone.trim()) {
      newErrors.phone = adminInfoForm.errors.phone[language];
    } else if (!/^\d{8,15}$/.test(adminInfo.phone.replace(/\D/g, ""))) {
      newErrors.phone = adminInfoForm.errors.phone[language];
    }

    if (!adminInfo.address.trim()) {
      newErrors.address = adminInfoForm.errors.address[language];
    }

    if (!adminInfo.password) {
      newErrors.password = adminInfoForm.errors.password[language];
    } else if (adminInfo.password.length < 8) {
      newErrors.password = adminInfoForm.errors.password[language];
    }

    if (adminInfo.password !== adminInfo.confirmPassword) {
      newErrors.confirmPassword = adminInfoForm.errors.confirmPassword[language];
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
      <h3 className="text-lg font-medium text-landingPrimary-900 dark:text-landingPrimary-100">
        {adminInfoForm.title[language]}
      </h3>
      <FormField label={adminInfoForm.fields.fullName.label[language]} error={errors.fullName}>
        <Input
          value={adminInfo.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          placeholder={adminInfoForm.fields.fullName.placeholder[language]}
          className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0 placeholder-landingPrimary-500 dark:placeholder-landingPrimary-400"
        />
      </FormField>
      <FormField label={adminInfoForm.fields.email.label[language]} error={errors.email}>
        <Input
          value={adminInfo.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder={adminInfoForm.fields.email.placeholder[language]}
          type="email"
          className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0 placeholder-landingPrimary-500 dark:placeholder-landingPrimary-400"
        />
      </FormField>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label={adminInfoForm.fields.dateOfBirth.label[language]} error={errors.dateOfBirth}>
          <Input
            value={adminInfo.dateOfBirth}
            onChange={(e) => onChange({ dateOfBirth: e.target.value })}
            type="date"
            className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0 placeholder-landingPrimary-500 dark:placeholder-landingPrimary-400"
          />
        </FormField>
        <FormField label={adminInfoForm.fields.gender.label[language]} error={errors.gender}>
          <Select
            value={adminInfo.gender}
            onValueChange={(value) => onChange({ gender: value })}
          >
            <SelectTrigger className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0">
              <SelectValue placeholder={adminInfoForm.fields.gender.placeholder[language]} />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-landingPrimary-300 dark:border-landingPrimary-700">
              <SelectItem value="Homme">{language === 'en' ? "Male" : "Homme"}</SelectItem>
              <SelectItem value="Femme">{language === 'en' ? "Female" : "Femme"}</SelectItem>
              <SelectItem value="Autre">{language === 'en' ? "Other" : "Autre"}</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label={adminInfoForm.fields.phone.label[language]} error={errors.phone}>
          <Input
            value={adminInfo.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder={adminInfoForm.fields.phone.placeholder[language]}
            type="tel"
            className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0 placeholder-landingPrimary-500 dark:placeholder-landingPrimary-400"
          />
        </FormField>
        <FormField label={adminInfoForm.fields.address.label[language]} error={errors.address}>
          <Input
            value={adminInfo.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder={adminInfoForm.fields.address.placeholder[language]}
            className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0 placeholder-landingPrimary-500 dark:placeholder-landingPrimary-400"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label={adminInfoForm.fields.password.label[language]} error={errors.password}>
          <Input
            value={adminInfo.password}
            onChange={(e) => onChange({ password: e.target.value })}
            placeholder={adminInfoForm.fields.password.placeholder[language]}
            type="password"
            className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0 placeholder-landingPrimary-500 dark:placeholder-landingPrimary-400"
          />
        </FormField>
        <FormField
          label={adminInfoForm.fields.confirmPassword.label[language]}
          error={errors.confirmPassword}
        >
          <Input
            value={adminInfo.confirmPassword}
            onChange={(e) => onChange({ confirmPassword: e.target.value })}
            placeholder={adminInfoForm.fields.confirmPassword.placeholder[language]}
            type="password"
            className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0 placeholder-landingPrimary-500 dark:placeholder-landingPrimary-400"
          />
        </FormField>
      </div>
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={onPrev}
          className="border-landingPrimary-200 dark:border-landingPrimary-700 text-landingPrimary-700 dark:text-landingPrimary-200 bg-landingPrimary-50 dark:bg-landingPrimary-900 hover:bg-landingPrimary-100 dark:hover:bg-landingPrimary-800 transition-all duration-300"
        >
          {adminInfoForm.prevButton[language]}
        </Button>
        <Button
          onClick={handleNext}
          className="bg-landingPrimary-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-landingPrimary-600 dark:bg-landingPrimary-600 dark:hover:bg-landingPrimary-700 transition-all duration-300"
        >
          {adminInfoForm.nextButton[language]}
        </Button>
      </div>
    </div>
  );
};