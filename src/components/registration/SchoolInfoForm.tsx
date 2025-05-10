import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { FormField } from "./FormField";
import { useLanguage } from "../../context/LanguageContext";
import { schoolInfoForm } from "../../data/content";

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
  const { language } = useLanguage();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const languageOptions = [
    { id: "french", label: { en: "French", fr: "Français" } },
    { id: "english", label: { en: "English", fr: "Anglais" } },
    { id: "arabic", label: { en: "Arabic", fr: "Arabe" } },
    { id: "spanish", label: { en: "Spanish", fr: "Espagnol" } },
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
      newErrors.name = schoolInfoForm.errors.name[language];
    }

    if (!schoolInfo.address.trim()) {
      newErrors.address = schoolInfoForm.errors.address[language];
    }

    if (!schoolInfo.phone.trim()) {
      newErrors.phone = schoolInfoForm.errors.phone[language];
    } else if (!/^\d{8,15}$/.test(schoolInfo.phone.replace(/\D/g, ''))) {
      newErrors.phone = schoolInfoForm.errors.phone[language];
    }

    if (!schoolInfo.email.trim()) {
      newErrors.email = schoolInfoForm.errors.email[language];
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(schoolInfo.email)) {
      newErrors.email = schoolInfoForm.errors.email[language];
    }

    if (!schoolInfo.schoolType) {
      newErrors.schoolType = schoolInfoForm.errors.schoolType[language];
    }

    if (!schoolInfo.status) {
      newErrors.status = schoolInfoForm.errors.status[language];
    }

    if (!schoolInfo.officialId.trim()) {
      newErrors.officialId = schoolInfoForm.errors.officialId[language];
    }

    if (schoolInfo.languages.length === 0) {
      newErrors.languages = schoolInfoForm.errors.languages[language];
    }

    if (schoolInfo.website && !/^(https?:\/\/)?(www\.)?[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(\/\S*)?$/.test(schoolInfo.website)) {
      newErrors.website = schoolInfoForm.errors.website[language];
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
        {schoolInfoForm.title[language]}
      </h3>
      <FormField
        label={schoolInfoForm.fields.name.label[language]}
        error={errors.name}
      >
        <Input
          value={schoolInfo.name}
          onChange={(e) => onChange({ name: e.target.value })}
          placeholder={schoolInfoForm.fields.name.placeholder[language]}
          className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0 placeholder-landingPrimary-500 dark:placeholder-landingPrimary-400"
        />
      </FormField>
      <FormField
        label={schoolInfoForm.fields.address.label[language]}
        error={errors.address}
      >
        <Input
          value={schoolInfo.address}
          onChange={(e) => onChange({ address: e.target.value })}
          placeholder={schoolInfoForm.fields.address.placeholder[language]}
          className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0 placeholder-landingPrimary-500 dark:placeholder-landingPrimary-400"
        />
      </FormField>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label={schoolInfoForm.fields.phone.label[language]}
          error={errors.phone}
        >
          <Input
            value={schoolInfo.phone}
            onChange={(e) => {
              const value = e.target.value;
              const filteredValue = value.replace(/[^0-9+]/g, "");
              onChange({ phone: filteredValue });
            }}
            placeholder={schoolInfoForm.fields.phone.placeholder[language]}
            type="tel"
            className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0 placeholder-landingPrimary-500 dark:placeholder-landingPrimary-400"
          />
        </FormField>
        <FormField
          label={schoolInfoForm.fields.email.label[language]}
          error={errors.email}
        >
          <Input
            value={schoolInfo.email}
            onChange={(e) => onChange({ email: e.target.value })}
            placeholder={schoolInfoForm.fields.email.placeholder[language]}
            type="email"
            className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0 placeholder-landingPrimary-500 dark:placeholder-landingPrimary-400"
          />
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label={schoolInfoForm.fields.schoolType.label[language]}
          error={errors.schoolType}
        >
          <Select
            value={schoolInfo.schoolType}
            onValueChange={(value) => onChange({ schoolType: value })}
          >
            <SelectTrigger className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0">
              <SelectValue placeholder={schoolInfoForm.fields.schoolType.placeholder[language]} />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-landingPrimary-300 dark:border-landingPrimary-700">
              <SelectItem value="secondary">{language === 'en' ? "Secondary" : "Secondaire"}</SelectItem>
              <SelectItem value="high">{language === 'en' ? "High School" : "Lycée"}</SelectItem>
              <SelectItem value="university">{language === 'en' ? "University" : "Université"}</SelectItem>
              <SelectItem value="professional">{language === 'en' ? "Professional Training" : "Formation professionnelle"}</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
        <FormField
          label={schoolInfoForm.fields.status.label[language]}
          error={errors.status}
        >
          <Select
            value={schoolInfo.status}
            onValueChange={(value) => onChange({ status: value })}
          >
            <SelectTrigger className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0">
              <SelectValue placeholder={schoolInfoForm.fields.status.placeholder[language]} />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-landingPrimary-300 dark:border-landingPrimary-700">
              <SelectItem value="public">{language === 'en' ? "Public" : "Public"}</SelectItem>
              <SelectItem value="private">{language === 'en' ? "Private" : "Privé"}</SelectItem>
              <SelectItem value="confessional">{language === 'en' ? "Confessional" : "Confessionnel"}</SelectItem>
              <SelectItem value="other">{language === 'en' ? "Other" : "Autre"}</SelectItem>
            </SelectContent>
          </Select>
        </FormField>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField
          label={schoolInfoForm.fields.postalBox.label[language]}
          error={errors.postalBox}
        >
          <Input
            value={schoolInfo.postalBox}
            onChange={(e) => onChange({ postalBox: e.target.value })}
            placeholder={schoolInfoForm.fields.postalBox.placeholder[language]}
            className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0 placeholder-landingPrimary-500 dark:placeholder-landingPrimary-400"
          />
        </FormField>
        <FormField
          label={schoolInfoForm.fields.officialId.label[language]}
          error={errors.officialId}
        >
          <Input
            value={schoolInfo.officialId}
            onChange={(e) => onChange({ officialId: e.target.value })}
            placeholder={schoolInfoForm.fields.officialId.placeholder[language]}
            className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0 placeholder-landingPrimary-500 dark:placeholder-landingPrimary-400"
          />
        </FormField>
      </div>
      <FormField
        label={schoolInfoForm.fields.languages.label[language]}
        error={errors.languages}
      >
        <div className="grid grid-cols-2 gap-2">
          {languageOptions.map((languageOption) => (
            <div key={languageOption.id} className="flex items-center space-x-2">
              <Checkbox
                id={`language-${languageOption.id}`}
                checked={schoolInfo.languages.includes(languageOption.id)}
                onCheckedChange={() => handleLanguageChange(languageOption.id)}
                className="border-landingPrimary-300 dark:border-landingPrimary-700 text-landingPrimary-500 dark:text-landingPrimary-400"
              />
              <Label
                htmlFor={`language-${languageOption.id}`}
                className="text-landingPrimary-900 dark:text-landingPrimary-100"
              >
                {languageOption.label[language]}
              </Label>
            </div>
          ))}
        </div>
      </FormField>
      <FormField
        label={schoolInfoForm.fields.website.label[language]}
        error={errors.website}
      >
        <Input
          value={schoolInfo.website}
          onChange={(e) => onChange({ website: e.target.value })}
          placeholder={schoolInfoForm.fields.website.placeholder[language]}
          type="url"
          className="bg-white dark:bg-gray-800 text-landingPrimary-900 dark:text-landingPrimary-100 border border-landingPrimary-300 dark:border-landingPrimary-700 rounded-lg focus:border-landingPrimary-400 focus:ring-0 placeholder-landingPrimary-500 dark:placeholder-landingPrimary-400"
        />
      </FormField>
      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          className="bg-landingPrimary-500 text-white font-semibold py-2 px-6 rounded-lg hover:bg-landingPrimary-600 dark:bg-landingPrimary-600 dark:hover:bg-landingPrimary-700 transition-all duration-300"
        >
          {schoolInfoForm.nextButton[language]}
        </Button>
      </div>
    </div>
  );
};