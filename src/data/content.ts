import { Feature, NavItem, Testimonial } from '../types';

export const navItems: NavItem[] = [
  {
    id: 'home',
    label: {
      en: 'Home',
      fr: 'Accueil',
    },
    href: '#home',
  },
  {
    id: 'about',
    label: {
      en: 'About',
      fr: 'À Propos',
    },
    href: '#about',
  },
  {
    id: 'features',
    label: {
      en: 'Features',
      fr: 'Fonctionnalités',
    },
    href: '#features',
  },
  {
    id: 'testimonials',
    label: {
      en: 'Testimonials',
      fr: 'Témoignages',
    },
    href: '#testimonials',
  },
  {
    id: 'contact',
    label: {
      en: 'Contact',
      fr: 'Contact',
    },
    href: '#contact',
  },
];

export const heroContent = {
  title: {
    en: 'Modern School Management Made Simple',
    fr: 'Gestion Scolaire Moderne Simplifiée',
  },
  subtitle: {
    en: 'An all-in-one platform to streamline administration, enhance teaching, and improve student outcomes',
    fr: 'Une plateforme tout-en-un pour simplifier l\'administration, améliorer l\'enseignement et les résultats des élèves',
  },
  cta: {
    primary: {
      en: 'Get Started',
      fr: 'Commencer',
    },
    secondary: {
      en: 'Learn More',
      fr: 'En Savoir Plus',
    },
  },
};

export const aboutContent = {
  title: {
    en: 'About EduManage',
    fr: 'À Propos d\'EduManage',
  },
  description: {
    en: 'EduManage is a comprehensive school management system designed to simplify administrative tasks, enhance communication between teachers, students, and parents, and improve overall educational outcomes. Our platform brings together all aspects of school management into one intuitive system.',
    fr: 'EduManage est un système complet de gestion scolaire conçu pour simplifier les tâches administratives, améliorer la communication entre les enseignants, les élèves et les parents, et améliorer les résultats éducatifs globaux. Notre plateforme rassemble tous les aspects de la gestion scolaire en un seul système intuitif.',
  },
  stats: [
    {
      value: '500+',
      label: {
        en: 'Schools',
        fr: 'Écoles',
      },
    },
    {
      value: '50,000+',
      label: {
        en: 'Students',
        fr: 'Étudiants',
      },
    },
    {
      value: '95%',
      label: {
        en: 'Satisfaction',
        fr: 'Satisfaction',
      },
    },
  ],
};

export const features: Feature[] = [
  {
    id: 'attendance',
    title: {
      en: 'Attendance Tracking',
      fr: 'Suivi des Présences',
    },
    description: {
      en: 'Automated attendance system with real-time notifications to parents for absences and tardiness.',
      fr: 'Système de présence automatisé avec notifications en temps réel aux parents pour les absences et les retards.',
    },
    icon: 'UserCheck',
  },
  {
    id: 'grades',
    title: {
      en: 'Grade Management',
      fr: 'Gestion des Notes',
    },
    description: {
      en: 'Comprehensive grading system with customizable assessment criteria and detailed progress reports.',
      fr: 'Système de notation complet avec critères d\'évaluation personnalisables et rapports de progression détaillés.',
    },
    icon: 'BarChart',
  },
  {
    id: 'communication',
    title: {
      en: 'Parent-Teacher Communication',
      fr: 'Communication Parents-Enseignants',
    },
    description: {
      en: 'Direct messaging, automated updates, and scheduled conferences to keep parents informed.',
      fr: 'Messagerie directe, mises à jour automatisées et conférences programmées pour tenir les parents informés.',
    },
    icon: 'MessageSquare',
  },
  {
    id: 'schedule',
    title: {
      en: 'Timetable Management',
      fr: 'Gestion des Emplois du Temps',
    },
    description: {
      en: 'Dynamic scheduling with conflict detection and resource allocation optimization.',
      fr: 'Planification dynamique avec détection des conflits et optimisation de l\'allocation des ressources.',
    },
    icon: 'Calendar',
  },
  {
    id: 'resources',
    title: {
      en: 'Learning Resources',
      fr: 'Ressources d\'Apprentissage',
    },
    description: {
      en: 'Centralized repository for teaching materials, assignments, and supplementary resources.',
      fr: 'Référentiel centralisé pour le matériel pédagogique, les devoirs et les ressources supplémentaires.',
    },
    icon: 'BookOpen',
  },
  {
    id: 'reports',
    title: {
      en: 'Analytics & Reporting',
      fr: 'Analytique et Rapports',
    },
    description: {
      en: 'Insightful data visualization and custom reports to track school, class, and student performance.',
      fr: 'Visualisation des données perspicace et rapports personnalisés pour suivre les performances de l\'école, des classes et des élèves.',
    },
    icon: 'LineChart',
  },
];

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: {
      en: 'School Principal',
      fr: 'Directrice d\'École',
    },
    content: {
      en: 'EduManage has transformed how we run our school. Administrative tasks that used to take hours now take minutes, and the improved communication with parents has been invaluable.',
      fr: 'EduManage a transformé la façon dont nous gérons notre école. Les tâches administratives qui prenaient des heures prennent maintenant quelques minutes, et l\'amélioration de la communication avec les parents est inestimable.',
    },
    avatar: 'https://images.pexels.com/photos/5212665/pexels-photo-5212665.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '2',
    name: 'Marc Dubois',
    role: {
      en: 'Math Teacher',
      fr: 'Professeur de Mathématiques',
    },
    content: {
      en: 'The grade management system is intuitive and saves me hours of work each week. I can focus more on teaching and less on paperwork.',
      fr: 'Le système de gestion des notes est intuitif et me fait gagner des heures de travail chaque semaine. Je peux me concentrer davantage sur l\'enseignement et moins sur la paperasse.',
    },
    avatar: 'https://images.pexels.com/photos/8617942/pexels-photo-8617942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
  {
    id: '3',
    name: 'Amanda Chen',
    role: {
      en: 'Parent',
      fr: 'Parent',
    },
    content: {
      en: 'As a busy parent, I appreciate being able to track my child\'s progress, communicate with teachers, and receive updates all in one place.',
      fr: 'En tant que parent occupé, j\'apprécie de pouvoir suivre les progrès de mon enfant, communiquer avec les enseignants et recevoir des mises à jour, tout cela au même endroit.',
    },
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  },
];

export const contactContent = {
  title: {
    en: 'Get In Touch',
    fr: 'Contactez-Nous',
  },
  subtitle: {
    en: 'Have questions or ready to transform your school? Reach out to our team today.',
    fr: 'Vous avez des questions ou êtes prêt à transformer votre école? Contactez notre équipe dès aujourd\'hui.',
  },
  form: {
    name: {
      label: {
        en: 'Name',
        fr: 'Nom',
      },
      placeholder: {
        en: 'Your name',
        fr: 'Votre nom',
      },
    },
    email: {
      label: {
        en: 'Email',
        fr: 'Courriel',
      },
      placeholder: {
        en: 'Your email address',
        fr: 'Votre adresse email',
      },
    },
    message: {
      label: {
        en: 'Message',
        fr: 'Message',
      },
      placeholder: {
        en: 'How can we help you?',
        fr: 'Comment pouvons-nous vous aider?',
      },
    },
    submit: {
      en: 'Send Message',
      fr: 'Envoyer le Message',
    },
  },
};

export const loginForm = {
  title: {
    en: 'Login',
    fr: 'Connexion',
  },
  description: {
    en: 'Access your management dashboard',
    fr: 'Accédez à votre espace de gestion',
  },
  email: {
    label: {
      en: 'Email',
      fr: 'Email',
    },
    placeholder: {
      en: 'Enter your email',
      fr: 'Entrez votre email',
    },
  },
  password: {
    label: {
      en: 'Password',
      fr: 'Mot de passe',
    },
    placeholder: {
      en: 'Enter your password',
      fr: 'Entrez votre mot de passe',
    },
  },
  submit: {
    en: 'Log In',
    fr: 'Se connecter',
  },
  forgotPassword: {
    en: 'Forgot password?',
    fr: 'Mot de passe oublié ?',
  },
  messages: {
    success: {
      en: 'Login successful! Redirecting...',
      fr: 'Connexion réussie ! Redirection...',
    },
    error: {
      en: 'Error during login.',
      fr: 'Erreur lors de la connexion.',
    },
  },
};

export const footerContent = {
  company: {
    en: 'EduManage',
    fr: 'EduManage',
  },
  copyright: {
    en: '© 2025 EduManage. All rights reserved.',
    fr: '© 2025 EduManage. Tous droits réservés.',
  },
  links: [
    {
      label: {
        en: 'Privacy Policy',
        fr: 'Politique de Confidentialité',
      },
      href: '#',
    },
    {
      label: {
        en: 'Terms of Service',
        fr: 'Conditions d\'Utilisation',
      },
      href: '#',
    },
    {
      label: {
        en: 'Support',
        fr: 'Support',
      },
      href: '#',
    },
  ],
};

export const registrationForm = {
  title: {
    en: "Register a New School",
    fr: "Inscription d'une nouvelle école",
  },
  description: {
    en: "Complete the 3-step form to register your school and create an admin account",
    fr: "Complétez le formulaire en 3 étapes pour inscrire votre école et créer un compte administrateur",
  },
  steps: {
    schoolInfo: {
      en: "School Information",
      fr: "Informations de l'école",
    },
    adminInfo: {
      en: "Admin Information",
      fr: "Informations de l'administrateur",
    },
    review: {
      en: "Review & Submit",
      fr: "Vérification et soumission",
    },
  },
  schoolInfo: {
    title: {
      en: "School Information",
      fr: "Informations de l'école",
    },
    name: {
      label: {
        en: "School Name",
        fr: "Nom de l'école",
      },
      placeholder: {
        en: "Enter the school name",
        fr: "Entrez le nom de l'école",
      },
      error: {
        en: "School name is required",
        fr: "Le nom de l'école est requis",
      },
    },
    address: {
      label: {
        en: "Address",
        fr: "Adresse",
      },
      placeholder: {
        en: "Full address",
        fr: "Adresse complète",
      },
      error: {
        en: "Address is required",
        fr: "L'adresse est requise",
      },
    },
    phone: {
      label: {
        en: "Phone",
        fr: "Téléphone",
      },
      placeholder: {
        en: "Phone number",
        fr: "Numéro de téléphone",
      },
      error: {
        required: {
          en: "Phone number is required",
          fr: "Le numéro de téléphone est requis",
        },
        invalid: {
          en: "Invalid phone number",
          fr: "Numéro de téléphone invalide",
        },
      },
    },
    email: {
      label: {
        en: "Email",
        fr: "Email",
      },
      placeholder: {
        en: "School email",
        fr: "Email de l'école",
      },
      error: {
        required: {
          en: "Email is required",
          fr: "L'email est requis",
        },
        invalid: {
          en: "Invalid email format",
          fr: "Format d'email invalide",
        },
      },
    },
    schoolType: {
      label: {
        en: "School Type",
        fr: "Type d'école",
      },
      placeholder: {
        en: "Select a type",
        fr: "Sélectionnez un type",
      },
      error: {
        en: "School type is required",
        fr: "Le type d'école est requis",
      },
      options: {
        secondary: {
          en: "Secondary",
          fr: "Secondaire",
        },
        high: {
          en: "High School",
          fr: "Lycée",
        },
        university: {
          en: "University",
          fr: "Université",
        },
        professional: {
          en: "Professional Training",
          fr: "Formation professionnelle",
        },
      },
    },
    status: {
      label: {
        en: "Status",
        fr: "Statut",
      },
      placeholder: {
        en: "Select a status",
        fr: "Sélectionnez un statut",
      },
      error: {
        en: "Status is required",
        fr: "Le statut est requis",
      },
      options: {
        public: {
          en: "Public",
          fr: "Public",
        },
        private: {
          en: "Private",
          fr: "Privé",
        },
        confessional: {
          en: "Confessional",
          fr: "Confessionnel",
        },
        other: {
          en: "Other",
          fr: "Autre",
        },
      },
    },
    postalBox: {
      label: {
        en: "Postal Box",
        fr: "Boîte postale",
      },
      placeholder: {
        en: "Postal box (optional)",
        fr: "Boîte postale (optionnel)",
      },
    },
    officialId: {
      label: {
        en: "Official ID",
        fr: "Identifiant officiel",
      },
      placeholder: {
        en: "Official identification number",
        fr: "Numéro d'identification officiel",
      },
      error: {
        en: "Official ID is required",
        fr: "L'identifiant officiel est requis",
      },
    },
    languages: {
      label: {
        en: "Teaching Languages",
        fr: "Langues d'enseignement",
      },
      error: {
        en: "Select at least one language",
        fr: "Sélectionnez au moins une langue",
      },
      options: {
        french: {
          en: "French",
          fr: "Français",
        },
        english: {
          en: "English",
          fr: "Anglais",
        },
        arabic: {
          en: "Arabic",
          fr: "Arabe",
        },
        spanish: {
          en: "Spanish",
          fr: "Espagnol",
        },
      },
    },
    website: {
      label: {
        en: "Website",
        fr: "Site web",
      },
      placeholder: {
        en: "Website (optional)",
        fr: "Site web (optionnel)",
      },
      error: {
        en: "Invalid website format",
        fr: "Format de site web invalide",
      },
    },
    next: {
      en: "Next",
      fr: "Suivant",
    },
  },
  adminInfo: {
    title: {
      en: "Admin Information",
      fr: "Informations de l'administrateur",
    },
    fullName: {
      label: {
        en: "Full Name",
        fr: "Nom complet",
      },
      placeholder: {
        en: "First and last name",
        fr: "Nom et prénom",
      },
      error: {
        en: "Full name is required",
        fr: "Le nom complet est requis",
      },
    },
    email: {
      label: {
        en: "Email",
        fr: "Email",
      },
      placeholder: {
        en: "Admin email",
        fr: "Email de l'administrateur",
      },
      error: {
        required: {
          en: "Email is required",
          fr: "L'email est requis",
        },
        invalid: {
          en: "Invalid email format",
          fr: "Format d'email invalide",
        },
      },
    },
    dateOfBirth: {
      label: {
        en: "Date of Birth",
        fr: "Date de naissance",
      },
      error: {
        required: {
          en: "Date of birth is required",
          fr: "La date de naissance est requise",
        },
        age: {
          en: "Admin must be at least 18 years old",
          fr: "L'administrateur doit avoir au moins 18 ans",
        },
      },
    },
    gender: {
      label: {
        en: "Gender",
        fr: "Genre",
      },
      placeholder: {
        en: "Select a gender",
        fr: "Sélectionnez un genre",
      },
      error: {
        en: "Gender is required",
        fr: "Le genre est requis",
      },
      options: {
        male: {
          en: "Male",
          fr: "Homme",
        },
        female: {
          en: "Female",
          fr: "Femme",
        },
        other: {
          en: "Other",
          fr: "Autre",
        },
      },
    },
    phone: {
      label: {
        en: "Phone",
        fr: "Téléphone",
      },
      placeholder: {
        en: "Phone number",
        fr: "Numéro de téléphone",
      },
      error: {
        required: {
          en: "Phone number is required",
          fr: "Le numéro de téléphone est requis",
        },
        invalid: {
          en: "Invalid phone number",
          fr: "Numéro de téléphone invalide",
        },
      },
    },
    address: {
      label: {
        en: "Address",
        fr: "Adresse",
      },
      placeholder: {
        en: "Admin address",
        fr: "Adresse de l'administrateur",
      },
      error: {
        en: "Address is required",
        fr: "L'adresse est requise",
      },
    },
    password: {
      label: {
        en: "Password",
        fr: "Mot de passe",
      },
      placeholder: {
        en: "Create a password",
        fr: "Créez un mot de passe",
      },
      error: {
        required: {
          en: "Password is required",
          fr: "Le mot de passe est requis",
        },
        length: {
          en: "Password must be at least 8 characters",
          fr: "Le mot de passe doit contenir au moins 8 caractères",
        },
      },
    },
    confirmPassword: {
      label: {
        en: "Confirm Password",
        fr: "Confirmer le mot de passe",
      },
      placeholder: {
        en: "Confirm your password",
        fr: "Confirmez votre mot de passe",
      },
      error: {
        en: "Passwords do not match",
        fr: "Les mots de passe ne correspondent pas",
      },
    },
    profilePhoto: {
      label: {
        en: "Profile Photo",
        fr: "Photo de profil",
      },
      note: {
        en: "Recommended format: JPG, PNG. Max size: 2MB",
        fr: "Format recommandé : JPG, PNG. Taille max : 2MB",
      },
      error: {
        format: {
          en: "Unsupported file format",
          fr: "Format de fichier non supporté",
        },
        size: {
          en: "Maximum size of 2MB exceeded",
          fr: "Taille maximale de 2MB dépassée",
        },
      },
    },
    previous: {
      en: "Previous",
      fr: "Précédent",
    },
    next: {
      en: "Next",
      fr: "Suivant",
    },
  },
  review: {
    title: {
      en: "Review Your Information",
      fr: "Vérification des informations",
    },
    description: {
      en: "Please review the information below before submitting your registration request.",
      fr: "Veuillez vérifier les informations ci-dessous avant de soumettre votre demande d'inscription.",
    },
    schoolSection: {
      en: "School Information",
      fr: "Informations de l'école",
    },
    adminSection: {
      en: "Admin Information",
      fr: "Informations de l'administrateur",
    },
    note: {
      en: "Note: After submission, your request will be reviewed by our team. You will receive a confirmation email once your account is validated.",
      fr: "Note : Après soumission, votre demande sera examinée par notre équipe. Vous recevrez un email de confirmation une fois votre compte validé.",
    },
    previous: {
      en: "Previous",
      fr: "Précédent",
    },
    submit: {
      en: "Submit Request",
      fr: "Soumettre la demande",
    },
    submitting: {
      en: "Submitting...",
      fr: "Soumission...",
    },
  },
};