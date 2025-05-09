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

export interface LoginFormContent {
  title: {
    en: string;
    fr: string;
  };
  description: {
    en: string;
    fr: string;
  };
  email: {
    label: {
      en: string;
      fr: string;
    };
    placeholder: {
      en: string;
      fr: string;
    };
  };
  password: {
    label: {
      en: string;
      fr: string;
    };
    placeholder: {
      en: string;
      fr: string;
    };
  };
  submit: {
    en: string;
    fr: string;
  };
  forgotPassword: {
    en: string;
    fr: string;
  };
  messages: {
    success: {
      en: string;
      fr: string;
    };
    error: {
      en: string;
      fr: string;
    };
  };
}

export interface RegistrationFormContent {
  title: Record<string, string>;
  description: Record<string, string>;
  steps: {
    schoolInfo: Record<string, string>;
    adminInfo: Record<string, string>;
    review: Record<string, string>;
  };
  schoolInfo: {
    title: Record<string, string>;
    name: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
      error: Record<string, string>;
    };
    address: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
      error: Record<string, string>;
    };
    phone: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
      error: {
        required: Record<string, string>;
        invalid: Record<string, string>;
      };
    };
    email: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
      error: {
        required: Record<string, string>;
        invalid: Record<string, string>;
      };
    };
    schoolType: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
      error: Record<string, string>;
      options: {
        secondary: Record<string, string>;
        high: Record<string, string>;
        university: Record<string, string>;
        professional: Record<string, string>;
      };
    };
    status: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
      error: Record<string, string>;
      options: {
        public: Record<string, string>;
        private: Record<string, string>;
        confessional: Record<string, string>;
        other: Record<string, string>;
      };
    };
    postalBox: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
    };
    officialId: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
      error: Record<string, string>;
    };
    languages: {
      label: Record<string, string>;
      error: Record<string, string>;
      options: {
        french: Record<string, string>;
        english: Record<string, string>;
        arabic: Record<string, string>;
        spanish: Record<string, string>;
      };
    };
    website: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
      error: Record<string, string>;
    };
    next: Record<string, string>;
  };
  adminInfo: {
    title: Record<string, string>;
    fullName: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
      error: Record<string, string>;
    };
    email: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
      error: {
        required: Record<string, string>;
        invalid: Record<string, string>;
      };
    };
    dateOfBirth: {
      label: Record<string, string>;
      error: {
        required: Record<string, string>;
        age: Record<string, string>;
      };
    };
    gender: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
      error: Record<string, string>;
      options: {
        male: Record<string, string>;
        female: Record<string, string>;
        other: Record<string, string>;
      };
    };
    phone: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
      error: {
        required: Record<string, string>;
        invalid: Record<string, string>;
      };
    };
    address: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
      error: Record<string, string>;
    };
    password: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
      error: {
        required: Record<string, string>;
        length: Record<string, string>;
      };
    };
    confirmPassword: {
      label: Record<string, string>;
      placeholder: Record<string, string>;
      error: Record<string, string>;
    };
    profilePhoto: {
      label: Record<string, string>;
      note: Record<string, string>;
      error: {
        format: Record<string, string>;
        size: Record<string, string>;
      };
    };
    previous: Record<string, string>;
    next: Record<string, string>;
  };
  review: {
    title: Record<string, string>;
    description: Record<string, string>;
    schoolSection: Record<string, string>;
    adminSection: Record<string, string>;
    note: Record<string, string>;
    previous: Record<string, string>;
    submit: Record<string, string>;
    submitting: Record<string, string>;
  };
}