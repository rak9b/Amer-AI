import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CompletionScreen = ({ onboardingData }) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAnimating(true);
    setTimeout(() => setShowConfetti(true), 500);
  }, []);

  const nextSteps = [
    {
      id: 'dashboard',
      title: 'ড্যাশবোর্ড দেখুন',
      description: 'আপনার ব্যক্তিগত কৃষি ড্যাশবোর্ড এক্সপ্লোর করুন',
      icon: 'LayoutDashboard',
      action: () => navigate('/farmer-dashboard'),
      color: 'bg-primary/10 text-primary'
    },
    {
      id: 'disease-lab',
      title: 'রোগ শনাক্তকরণ',
      description: 'AI দিয়ে ফসলের রোগ শনাক্ত করুন',
      icon: 'Microscope',
      action: () => navigate('/disease-detection-lab'),
      color: 'bg-accent/10 text-accent'
    },
    {
      id: 'community',
      title: 'কমিউনিটি যোগদান',
      description: 'অন্যান্য কৃষকদের সাথে যোগাযোগ করুন',
      icon: 'Users',
      action: () => navigate('/community-forums'),
      color: 'bg-harvest-gold/10 text-harvest-gold'
    }
  ];

  const achievements = [
    { icon: 'CheckCircle', text: 'প্রোফাইল সম্পূর্ণ' },
    { icon: 'MapPin', text: 'অবস্থান সেট করা হয়েছে' },
    { icon: 'Sprout', text: 'ফসল নির্বাচিত' },
    { icon: 'Shield', text: 'নিরাপত্তা যাচাই সম্পন্ন' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-harvest-gold/5 flex flex-col relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)]?.map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            >
              <div className="w-2 h-2 bg-primary rounded-full opacity-60" />
            </div>
          ))}
        </div>
      )}
      {/* Header */}
      <div className="text-center pt-12 pb-8">
        <div className={`transition-all duration-1000 ${isAnimating ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
          <div className="relative mx-auto mb-6">
            <div className="w-24 h-24 bg-earth-to-sky rounded-2xl flex items-center justify-center shadow-natural-lg">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" className="text-white">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
                <path d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z" fill="currentColor"/>
                <path d="M5 6L5.5 8L8 8.5L5.5 9L5 11L4.5 9L2 8.5L4.5 8L5 6Z" fill="currentColor"/>
              </svg>
            </div>
            <div className="absolute -bottom-3 -right-3 w-10 h-10 bg-success rounded-full flex items-center justify-center shadow-natural ai-pulse">
              <Icon name="Check" size={20} className="text-white" />
            </div>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 px-6">
        <div className={`text-center space-y-6 transition-all duration-1000 delay-300 ${isAnimating ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          {/* Success Message */}
          <div className="space-y-4">
            <h1 className="text-3xl font-poppins font-bold text-foreground">
              🎉 অভিনন্দন!
            </h1>
            <h2 className="text-xl font-poppins font-semibold text-primary">
              AgriSmart এ স্বাগতম
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed max-w-sm mx-auto">
              আপনার প্রোফাইল সফলভাবে তৈরি হয়েছে। এখন আপনি AI-চালিত কৃষি পরামর্শ ও কমিউনিটি সেবা উপভোগ করতে পারবেন।
            </p>
          </div>

          {/* Achievements */}
          <div className="bg-card p-6 rounded-organic shadow-natural">
            <h3 className="font-poppins font-semibold text-foreground mb-4">
              সম্পন্ন কাজসমূহ
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {achievements?.map((achievement, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-3 bg-success/10 rounded-organic transition-all duration-500 delay-${index * 100}`}
                >
                  <Icon name={achievement?.icon} size={16} className="text-success" />
                  <span className="text-sm font-medium text-foreground">
                    {achievement?.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Profile Summary */}
          {onboardingData && (
            <div className="bg-primary/5 p-4 rounded-organic">
              <h3 className="font-poppins font-semibold text-foreground mb-3">
                আপনার প্রোফাইল সারসংক্ষেপ
              </h3>
              <div className="space-y-2 text-sm">
                {onboardingData?.selectedCrops && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">নির্বাচিত ফসল:</span>
                    <span className="font-medium text-foreground">
                      {onboardingData?.selectedCrops?.length} টি
                    </span>
                  </div>
                )}
                {onboardingData?.experienceData && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">অভিজ্ঞতার স্তর:</span>
                    <span className="font-medium text-foreground">
                      {onboardingData?.experienceData?.experienceLevel === 'beginner' ? 'নতুন কৃষক' :
                       onboardingData?.experienceData?.experienceLevel === 'intermediate' ? 'অভিজ্ঞ কৃষক' : 'দক্ষ কৃষক'}
                    </span>
                  </div>
                )}
                {onboardingData?.languageData && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">ভাষা:</span>
                    <span className="font-medium text-foreground">
                      {onboardingData?.languageData?.language === 'bn' ? 'বাংলা' : 'English'}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div>
            <h3 className="text-lg font-poppins font-semibold text-foreground mb-4">
              পরবর্তী পদক্ষেপ
            </h3>
            <div className="space-y-3">
              {nextSteps?.map((step, index) => (
                <button
                  key={step?.id}
                  onClick={step?.action}
                  className={`w-full p-4 rounded-organic border border-border bg-card hover:bg-muted transition-all duration-200 hover-magnetic delay-${index * 100}`}
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step?.color}`}>
                      <Icon name={step?.icon} size={20} />
                    </div>
                    <div className="flex-1 text-left">
                      <h4 className="font-poppins font-semibold text-foreground">
                        {step?.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {step?.description}
                      </p>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Welcome Bonus */}
          <div className="bg-harvest-gradient p-4 rounded-organic text-white">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name="Gift" size={20} className="text-white" />
              <h3 className="font-poppins font-semibold">স্বাগত বোনাস!</h3>
            </div>
            <p className="text-sm opacity-90">
              প্রথম ৭ দিন বিনামূল্যে প্রিমিয়াম AI পরামর্শ পাবেন
            </p>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="p-6 space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={() => navigate('/farmer-dashboard')}
          iconName="ArrowRight"
          iconPosition="right"
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-natural-lg hover-magnetic"
        >
          ড্যাশবোর্ডে যান
        </Button>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            AgriSmart Bangladesh - আপনার কৃষি সাফল্যের সঙ্গী
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompletionScreen;