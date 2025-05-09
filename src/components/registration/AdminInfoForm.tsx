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
import { registrationForm } from "../../data/content";

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
  language: string;
}

export const AdminInfoForm = ({
  adminInfo,
  onChange,
  onNext,
  onPrev,
  language,
}: AdminInfoFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const validTypes = ["image/png", "image/webp", "image/jpeg", "image/jpg"];
    if (!validTypes.includes(file.type)) {
      setErrors((prev) => ({
        ...prev,
        profilePhoto: registrationForm.adminInfo.profilePhoto.error.format[language],
      }));
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      setErrors((prev) => ({
        ...prev,
        profilePhoto: registrationForm.adminInfo.profilePhoto.error.size[language],
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, profilePhoto: "" }));
    onChange({ profilePhoto: file });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!adminInfo.fullName.trim()) {
      newErrors.fullName = registrationForm.adminInfo.fullName.error[language];
    }

    if (!adminInfo.email.trim()) {
      newErrors.email = registrationForm.adminInfo.email.error.required[language];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(adminInfo.email)) {
      newErrors.email = registrationForm.adminInfo.email.error.invalid[language];
    }

    if (!adminInfo.dateOfBirth) {
      newErrors.dateOfBirth = registrationForm.adminInfo.dateOfBirth.error.required[language];
    } else {
      const birthDate = new Date(adminInfo.dateOfBirth);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 18) {
        newErrors.dateOfBirth = registrationForm.adminInfo.dateOfBirth.error.age[language];
      }
    }

    if (!adminInfo.gender) {
      newErrors.gender = registrationForm.adminInfo.gender.error[language];
    }

    if (!adminInfo.phone.trim()) {
      newErrors.phone = registrationForm.adminInfo.phone.error.required[language];
    } else if (!/^\d{8,15}$/.test(adminInfo.phone.replace(/\D/g, ""))) {
      newErrors.phone = registrationForm.adminInfo.phone.error.invalid[language];
    }

    if (!adminInfo.address.trim()) {
      newErrors.address = registrationForm.adminInfo.address.error[language];
    }

    if (!adminInfo.password) {
      newErrors.password = registrationForm.adminInfo.password.error.required[language];
    } else if (adminInfo.password.length < 8) {
      newErrors.password = registrationForm.adminInfo.password.error.length[language];
    }

    if (adminInfo.password !== adminInfo.confirmPassword) {
      newErrors.confirmPassword = registrationForm.adminInfo.confirmPassword.error[language];
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
      <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100">{registrationForm.adminInfo.title[language]}</h3>
      <FormField label={registrationForm.adminInfo.fullName.label[language]} error={errors.fullName}>
        <Input
          value={adminInfo.fullName}
          onChange={(e) => onChange({ fullName: e.target.value })}
          placeholder={registrationForm.adminInfo.fullName.placeholder[language]}
          className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400"
        />
      </FormField>
      <FormField label={registrationForm.adminInfo.email.label[language]} error={errors.email}>
        <Input
          value={adminInfo.email}
          onChange={(e) => onChange({ email: e.target.value })}
          placeholder={registrationForm.adminInfo.email.placeholder[language]}
          type="email"
          className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400"
        />
      </FormField>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label={registrationForm.adminInfo.dateOfBirth.label[language]} error={errors.dateOfBirth}>
          <Input
            value={adminInfo.dateOfBirth}
            onChange={(e) => onChange({ dateOfBirth: e.target.value })}
            type="date"
            className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400"
          />
        </FormField>
        <FormField label={registrationForm.adminInfo.gender.label[language]} error={errors.gender}>
          <Select
            value={adminInfo.gender}
            onValueChange={(value) => onChange({ gender: value })}
          >
            <SelectTrigger className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400">
              <SelectValue placeholder={registrationForm.adminInfo.gender.placeholder[language]} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">{registrationForm.adminInfo.gender.options.male[language]}</SelectItem>
              <SelectItem value="female">{registrationForm.adminInfo.gender.options.female[language]}</SelectItem>
              <SelectItem value="other">{registrationForm.adminInfo.gender.options.other[language]}</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label={registrationForm.adminInfo.phone.label[language]} error={errors.phone}>
          <Input
            value={adminInfo.phone}
            onChange={(e) => onChange({ phone: e.target.value })}
            placeholder={registrationForm.adminInfo.phone.placeholder[language]}
            type="tel"
            className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400"
          />
        </FormField>
        <FormField label={registrationForm.adminInfo.address.label[language]} error={errors.address}>
          <Input
            value={adminInfo.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder={registrationForm.adminInfo.address.placeholder[language]}
            className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField label={registrationForm.adminInfo.password.label[language]} error={errors.password}>
          <Input
            value={adminInfo.password}
            onChange={(e) => onChange({ password: e.target.value })}
            placeholder={registrationForm.adminInfo.password.placeholder[language]}
            type="password"
            className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400"
          />
        </FormField>
        <FormField
          label={registrationForm.adminInfo.confirmPassword.label[language]}
          error={errors.confirmPassword}
        >
          <Input
            value={adminInfo.confirmPassword}
            onChange={(e) => onChange({ confirmPassword: e.target.value })}
            placeholder={registrationForm.adminInfo.confirmPassword.placeholder[language]}
            type="password"
            className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400"
          />
        </FormField>
      </div>
      {/* <FormField label={registrationForm.adminInfo.profilePhoto.label[language]} error={errors.profilePhoto}>
        <Input
          type="file"
          accept="image/png, image/webp, image/jpeg, image/jpg"
          onChange={handleFileChange}
          className="cursor-pointer bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400"
        />
        <p className="text-xs text-primary-500 dark:text-primary-400 mt-1">
          {registrationForm.adminInfo.profilePhoto.note[language]}
        </p>
      </FormField> */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={onPrev}
          className="border-primary-300 text-primary-700 hover:bg-primary-100 dark:border-primary-700 dark:text-primary-200 dark:hover:bg-primary-800"
        >
          {registrationForm.adminInfo.previous[language]}
        </Button>
        <Button
          onClick={handleNext}
          className="bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
        >
          {registrationForm.adminInfo.next[language]}
        </Button>
      </div>
    </div>
  );
};