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