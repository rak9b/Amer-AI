import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import WelcomeScreen from './components/WelcomeScreen';
import ProgressIndicator from './components/ProgressIndicator';
import LocationPermissionScreen from './components/LocationPermissionScreen';
import CropSelectionScreen from './components/CropSelectionScreen';
import ExperienceAssessmentScreen from './components/ExperienceAssessmentScreen';
import ProfilePhotoScreen from './components/ProfilePhotoScreen';
import PhoneVerificationScreen from './components/PhoneVerificationScreen';
import LanguagePreferenceScreen from './components/LanguagePreferenceScreen';
import NotificationPreferencesScreen from './components/NotificationPreferencesScreen';
import CompletionScreen from './components/CompletionScreen';

const MobileOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [onboardingData, setOnboardingData] = useState({});
  const [currentLanguage, setCurrentLanguage] = useState('bn');
  const navigate = useNavigate();

  const steps = [
    { id: 'welcome', title: 'স্বাগতম', component: WelcomeScreen },
    { id: 'location', title: 'অবস্থান', component: LocationPermissionScreen },
    { id: 'crops', title: 'ফসল', component: CropSelectionScreen },
    { id: 'experience', title: 'অভিজ্ঞতা', component: ExperienceAssessmentScreen },
    { id: 'photo', title: 'ছবি', component: ProfilePhotoScreen },
    { id: 'phone', title: 'ফোন', component: PhoneVerificationScreen },
    { id: 'language', title: 'ভাষা', component: LanguagePreferenceScreen },
    { id: 'notifications', title: 'বিজ্ঞপ্তি', component: NotificationPreferencesScreen },
    { id: 'completion', title: 'সম্পন্ন', component: CompletionScreen }
  ];

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }

    // Check if user has already completed onboarding
    const onboardingCompleted = localStorage.getItem('onboardingCompleted');
    if (onboardingCompleted === 'true') {
      navigate('/farmer-dashboard');
    }
  }, [navigate]);

  const handleNext = (stepData) => {
    // Save step data
    const stepKey = steps?.[currentStep]?.id;
    const updatedData = {
      ...onboardingData,
      [stepKey]: stepData
    };
    setOnboardingData(updatedData);

    // Handle language change
    if (stepKey === 'language' && stepData?.language) {
      setCurrentLanguage(stepData?.language);
    }

    // Move to next step or complete onboarding
    if (currentStep < steps?.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Mark onboarding as completed
      localStorage.setItem('onboardingCompleted', 'true');
      localStorage.setItem('onboardingData', JSON.stringify(updatedData));
      navigate('/farmer-dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = (stepData = null) => {
    handleNext(stepData);
  };

  const CurrentStepComponent = steps?.[currentStep]?.component;
  const isWelcomeScreen = currentStep === 0;
  const isCompletionScreen = currentStep === steps?.length - 1;

  return (
    <div className="min-h-screen bg-background">
      {/* Progress Indicator - Hidden on Welcome and Completion screens */}
      {!isWelcomeScreen && !isCompletionScreen && (
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={steps?.length - 2} // Exclude welcome and completion
          steps={steps?.slice(1, -1)} // Exclude welcome and completion from progress
        />
      )}
      {/* Current Step Component */}
      <CurrentStepComponent
        onNext={handleNext}
        onBack={handleBack}
        onSkip={handleSkip}
        onboardingData={onboardingData}
        currentLanguage={currentLanguage}
      />
      {/* Debug Info - Remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-card p-3 rounded-organic shadow-natural border border-border text-xs">
          <p>Step: {currentStep + 1}/{steps?.length}</p>
          <p>Current: {steps?.[currentStep]?.id}</p>
          <p>Language: {currentLanguage}</p>
        </div>
      )}
    </div>
  );
};

export default MobileOnboarding;