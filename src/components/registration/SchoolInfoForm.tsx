import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { FormField } from "./FormField";
import { registrationForm } from "../../data/content";

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
  language: string;
}

export const SchoolInfoForm = ({ schoolInfo, onChange, onNext, language }: SchoolInfoFormProps) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const languageOptions = [
    { id: "french", label: registrationForm.schoolInfo.languages.options.french[language] },
    { id: "english", label: registrationForm.schoolInfo.languages.options.english[language] },
    { id: "arabic", label: registrationForm.schoolInfo.languages.options.arabic[language] },
    { id: "spanish", label: registrationForm.schoolInfo.languages.options.spanish[language] },
  ];

  const handleLanguageChange = (languageId: string) => {
    const updatedLanguages = schoolInfo.languages.includes(languageId)
      ? schoolInfo.languages.filter((lang) => lang !== languageId)
      : [...schoolInfo.languages, languageId];
    onChange({ languages: updatedLanguages });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!schoolInfo.name.trim()) {
      newErrors.name = registrationForm.schoolInfo.name.error[language];
    }

    if (!schoolInfo.address.trim()) {
      newErrors.address = registrationForm.schoolInfo.address.error[language];
    }

    if (!schoolInfo.phone.trim()) {
      newErrors.phone = registrationForm.schoolInfo.phone.error.required[language];
    } else if (!/^\d{8,15}$/.test(schoolInfo.phone.replace(/\D/g, ''))) {
      newErrors.phone = registrationForm.schoolInfo.phone.error.invalid[language];
    }

    if (!schoolInfo.email.trim()) {
      newErrors.email = registrationForm.schoolInfo.email.error.required[language];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(schoolInfo.email)) {
      newErrors.email = registrationForm.schoolInfo.email.error.invalid[language];
    }

    if (!schoolInfo.schoolType) {
      newErrors.schoolType = registrationForm.schoolInfo.schoolType.error[language];
    }

    if (!schoolInfo.status) {
      newErrors.status = registrationForm.schoolInfo.status.error[language];
    }

    if (!schoolInfo.officialId.trim()) {
      newErrors.officialId = registrationForm.schoolInfo.officialId.error[language];
    }

    if (schoolInfo.languages.length === 0) {
      newErrors.languages = registrationForm.schoolInfo.languages.error[language];
    }

    if (schoolInfo.website && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(schoolInfo.website)) {
      newErrors.website = registrationForm.schoolInfo.website.error[language];
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
      <h3 className="text-lg font-medium text-primary-900 dark:text-primary-100">{registrationForm.schoolInfo.title[language]}</h3>
      <FormField
        label={registrationForm.schoolInfo.name.label[language]}
        error={errors.name}
      >
        <Input
          value={schoolInfo.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder={registrationForm.schoolInfo.name.placeholder[language]}
          className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400"
        />
      </FormField>
      <FormField
        label={registrationForm.schoolInfo.address.label[language]}
        error={errors.address}
      >
        <Input
          value={schoolInfo.address}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder={registrationForm.schoolInfo.address.placeholder[language]}
          className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400"
        />
      </FormField>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label={registrationForm.schoolInfo.phone.label[language]}
          error={errors.phone}
        >
          <Input
            value={schoolInfo.phone}
            onChange={(e) => {
              const value = e.target.value;
              const filteredValue = value.replace(/[^0-9+]/g, "");
              onChange({ phone: filteredValue });
            }}
            placeholder={registrationForm.schoolInfo.phone.placeholder[language]}
            type="tel"
            className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400"
          />
        </FormField>
        <FormField
          label={registrationForm.schoolInfo.email.label[language]}
          error={errors.email}
        >
          <Input
            value={schoolInfo.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder={registrationForm.schoolInfo.email.placeholder[language]}
            type="email"
            className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label={registrationForm.schoolInfo.schoolType.label[language]}
          error={errors.schoolType}
        >
          <Select
            value={schoolInfo.schoolType}
            onValueChange={(value) => onChange({ schoolType: value })}
          >
            <SelectTrigger className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400">
              <SelectValue placeholder={registrationForm.schoolInfo.schoolType.placeholder[language]} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="secondary">{registrationForm.schoolInfo.schoolType.options.secondary[language]}</SelectItem>
              <SelectItem value="high">{registrationForm.schoolInfo.schoolType.options.high[language]}</SelectItem>
              <SelectItem value="university">{registrationForm.schoolInfo.schoolType.options.university[language]}</SelectItem>
              <SelectItem value="professional">{registrationForm.schoolInfo.schoolType.options.professional[language]}</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField
          label={registrationForm.schoolInfo.status.label[language]}
          error={errors.status}
        >
          <Select
            value={schoolInfo.status}
            onValueChange={(value) => onChange({ status: value })}
          >
            <SelectTrigger className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400">
              <SelectValue placeholder={registrationForm.schoolInfo.status.placeholder[language]} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">{registrationForm.schoolInfo.status.options.public[language]}</SelectItem>
              <SelectItem value="private">{registrationForm.schoolInfo.status.options.private[language]}</SelectItem>
              <SelectItem value="confessional">{registrationForm.schoolInfo.status.options.confessional[language]}</SelectItem>
              <SelectItem value="other">{registrationForm.schoolInfo.status.options.other[language]}</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label={registrationForm.schoolInfo.postalBox.label[language]}
          error={errors.postalBox}
        >
          <Input
            value={schoolInfo.postalBox}
            onChange={(e) => onChange({ postalBox: e.target.value })}
            placeholder={registrationForm.schoolInfo.postalBox.placeholder[language]}
            className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400"
          />
        </FormField>
        <FormField
          label={registrationForm.schoolInfo.officialId.label[language]}
          error={errors.officialId}
        >
          <Input
            value={schoolInfo.officialId}
            onChange={(e) => onChange({ officialId: e.target.value })}
            placeholder={registrationForm.schoolInfo.officialId.placeholder[language]}
            className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400"
          />
        </FormField>
      </div>
      <FormField
        label={registrationForm.schoolInfo.languages.label[language]}
        error={errors.languages}
      >
        <div className="grid grid-cols-2 gap-2">
          {languageOptions.map((languageOption) => (
            <div key={languageOption.id} className="flex items-center space-x-2">
              <Checkbox
                id={`language-${languageOption.id}`}
                checked={schoolInfo.languages.includes(languageOption.id)}
                onCheckedChange={() => handleLanguageChange(languageOption.id)}
                className="border-primary-300 text-primary-500 focus:ring-primary-400"
              />
              <Label
                htmlFor={`language-${languageOption.id}`}
                className="text-primary-900 dark:text-primary-100"
              >
                {languageOption.label}
              </Label>
            </div>
          ))}
        </div>
      </FormField>
      <FormField
        label={registrationForm.schoolInfo.website.label[language]}
        error={errors.website}
      >
        <Input
          value={schoolInfo.website}
          onChange={(e) => onChange({ website: e.target.value })}
          placeholder={registrationForm.schoolInfo.website.placeholder[language]}
          type="url"
          className="bg-white dark:bg-gray-800 text-primary-900 dark:text-primary-100 border-primary-300 focus:border-primary-400"
        />
      </FormField>
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          className="bg-primary-500 text-white hover:bg-primary-600 dark:bg-primary-600 dark:hover:bg-primary-700"
        >
          {registrationForm.schoolInfo.next[language]}
        </Button>
      </div>
    </div>
  );
};