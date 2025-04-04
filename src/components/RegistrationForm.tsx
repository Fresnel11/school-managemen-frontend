import { useState } from "react";
import { SchoolInfoForm } from "./registration/SchoolInfoForm";
import { AdminInfoForm } from "./registration/AdminInfoForm";
import { ReviewForm } from "./registration/ReviewForm";
import { ProgressSteps } from "./registration/ProgressSteps";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

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

export const RegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>({
    name: "",
    address: "",
    phone: "",
    email: "",
    schoolType: "",
    status: "",
    postalBox: "",
    officialId: "",
    languages: [],
    website: "",
  });

  const [adminInfo, setAdminInfo] = useState<AdminInfo>({
    fullName: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
    profilePhoto: null,
  });

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSchoolInfoChange = (info: Partial<SchoolInfo>) => {
    setSchoolInfo((prev) => ({ ...prev, ...info }));
  };

  const handleAdminInfoChange = (info: Partial<AdminInfo>) => {
    setAdminInfo((prev) => ({ ...prev, ...info }));
  };

  const handleSubmit = async () => {
    // Here you would typically send the data to your backend
    console.log("School Info:", schoolInfo);
    console.log("Admin Info:", adminInfo);
    
    // Example of how you might structure the data for your API
    const formData = new FormData();
    
    // Add school info
    Object.entries(schoolInfo).forEach(([key, value]) => {
      if (key === 'languages' && Array.isArray(value)) {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, value.toString());
      }
    });
    
    // Add admin info
    Object.entries(adminInfo).forEach(([key, value]) => {
      if (key === 'profilePhoto' && value instanceof File) {
        formData.append(key, value);
      } else if (value !== null) {
        formData.append(key, value.toString());
      }
    });
    
    // Example API call (commented out)
    /*
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        // Handle success - redirect or show success message
      } else {
        // Handle error
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
    */
    
    // For now, just show a success message
    alert("Inscription réussie! En attente de validation.");
  };

  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-4xl mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Inscription d'une nouvelle école</CardTitle>
          <CardDescription>
            Complétez le formulaire en 3 étapes pour inscrire votre école et créer un compte administrateur
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ProgressSteps currentStep={currentStep} />
          
          <div className="mt-8">
            {currentStep === 1 && (
              <SchoolInfoForm 
                schoolInfo={schoolInfo} 
                onChange={handleSchoolInfoChange} 
                onNext={nextStep} 
              />
            )}
            
            {currentStep === 2 && (
              <AdminInfoForm 
                adminInfo={adminInfo} 
                onChange={handleAdminInfoChange} 
                onNext={nextStep} 
                onPrev={prevStep} 
              />
            )}
            
            {currentStep === 3 && (
              <ReviewForm 
                schoolInfo={schoolInfo} 
                adminInfo={adminInfo} 
                onPrev={prevStep} 
                onSubmit={handleSubmit} 
              />
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};