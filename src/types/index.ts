export type Language = 'en' | 'fr';
export type Theme = 'light' | 'dark';

export interface NavItem {
  id: string;
  label: {
    en: string;
    fr: string;
  };
  href: string;
}

export interface Feature {
  id: string;
  title: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  icon: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: {
    en: string;
    fr: string;
  };
  content: {
    en: string;
    fr: string;
  };
  avatar: string;
}

export interface RegistrationFormContent {
  title: Record<string, string>;
  description: Record<string, string>;
}

export interface ProgressStepsContent {
  steps: {
    id: number;
    name: Record<string, string>;
  }[];
}

export interface SchoolInfoFormContent {
  title: Record<string, string>;
  fields: {
    name: { label: Record<string, string>; placeholder: Record<string, string> };
    address: { label: Record<string, string>; placeholder: Record<string, string> };
    phone: { label: Record<string, string>; placeholder: Record<string, string> };
    email: { label: Record<string, string>; placeholder: Record<string, string> };
    schoolType: { label: Record<string, string>; placeholder: Record<string, string> };
    status: { label: Record<string, string>; placeholder: Record<string, string> };
    postalBox: { label: Record<string, string>; placeholder: Record<string, string> };
    officialId: { label: Record<string, string>; placeholder: Record<string, string> };
    languages: { label: Record<string, string> };
    website: { label: Record<string, string>; placeholder: Record<string, string> };
  };
  errors: {
    name: Record<string, string>;
    address: Record<string, string>;
    phone: Record<string, string>;
    email: Record<string, string>;
    schoolType: Record<string, string>;
    status: Record<string, string>;
    officialId: Record<string, string>;
    languages: Record<string, string>;
    website: Record<string, string>;
  };
  nextButton: Record<string, string>;
}

export interface AdminInfoFormContent {
  title: Record<string, string>;
  fields: {
    fullName: { label: Record<string, string>; placeholder: Record<string, string> };
    email: { label: Record<string, string>; placeholder: Record<string, string> };
    dateOfBirth: { label: Record<string, string> };
    gender: { label: Record<string, string>; placeholder: Record<string, string> };
    phone: { label: Record<string, string>; placeholder: Record<string, string> };
    address: { label: Record<string, string>; placeholder: Record<string, string> };
    password: { label: Record<string, string>; placeholder: Record<string, string> };
    confirmPassword: { label: Record<string, string>; placeholder: Record<string, string> };
    profilePhoto: { label: Record<string, string>; description: Record<string, string> };
  };
  errors: {
    fullName: Record<string, string>;
    email: Record<string, string>;
    dateOfBirth: Record<string, string>;
    gender: Record<string, string>;
    phone: Record<string, string>;
    address: Record<string, string>;
    password: Record<string, string>;
    confirmPassword: Record<string, string>;
    profilePhoto: Record<string, string>;
  };
  prevButton: Record<string, string>;
  nextButton: Record<string, string>;
}

export interface ReviewFormContent {
  title: Record<string, string>;
  description: Record<string, string>;
  schoolSection: Record<string, string>;
  adminSection: Record<string, string>;
  note: Record<string, string>;
  fields: {
    name: Record<string, string>;
    address: Record<string, string>;
    phone: Record<string, string>;
    email: Record<string, string>;
    schoolType: Record<string, string>;
    status: Record<string, string>;
    postalBox: Record<string, string>;
    officialId: Record<string, string>;
    languages: Record<string, string>;
    website: Record<string, string>;
    fullName: Record<string, string>;
    adminEmail: Record<string, string>;
    dateOfBirth: Record<string, string>;
    gender: Record<string, string>;
    adminPhone: Record<string, string>;
    adminAddress: Record<string, string>;
  };
  prevButton: Record<string, string>;
  submitButton: Record<string, string>;
  submitting: Record<string, string>;
}