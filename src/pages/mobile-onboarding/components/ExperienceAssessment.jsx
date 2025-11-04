import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExperienceAssessmentScreen = ({ onNext, onBack }) => {
  const [selectedLevel, setSelectedLevel] = useState('');
  const [farmingYears, setFarmingYears] = useState('');
  const [landSize, setLandSize] = useState('');
  const [challenges, setChallenges] = useState([]);

  const experienceLevels = [
    {
      id: 'beginner',
      title: 'নতুন কৃষক',
      subtitle: '০-২ বছরের অভিজ্ঞতা',
      description: 'কৃষিকাজে নতুন বা খুব কম অভিজ্ঞতা আছে',
      icon: 'Seedling',
      color: 'bg-success/10 border-success text-success',
      benefits: ['মৌলিক কৃষি গাইড', 'ধাপে ধাপে নির্দেশনা', 'সহজ ভাষায় পরামর্শ']
    },
    {
      id: 'intermediate',
      title: 'অভিজ্ঞ কৃষক',
      subtitle: '৩-১০ বছরের অভিজ্ঞতা',
      description: 'মাঝারি অভিজ্ঞতা আছে, আরও শিখতে চান',
      icon: 'Sprout',
      color: 'bg-warning/10 border-warning text-warning',
      benefits: ['উন্নত কৃষি কৌশল', 'রোগ-পোকা নিয়ন্ত্রণ', 'ফলন বৃদ্ধির উপায়']
    },
    {
      id: 'expert',
      title: 'দক্ষ কৃষক',
      subtitle: '১০+ বছরের অভিজ্ঞতা',
      description: 'অনেক অভিজ্ঞতা আছে, অন্যদের সাহায্য করতে পারেন',
      icon: 'TreePine',
      color: 'bg-primary/10 border-primary text-primary',
      benefits: ['বিশেষজ্ঞ পরামর্শ', 'কমিউনিটি লিডারশিপ', 'আধুনিক প্রযুক্তি']
    }
  ];

  const commonChallenges = [
    { id: 'weather', name: 'আবহাওয়া সমস্যা', icon: 'Cloud' },
    { id: 'pests', name: 'পোকামাকড়', icon: 'Bug' },
    { id: 'diseases', name: 'ফসলের রোগ', icon: 'AlertTriangle' },
    { id: 'market', name: 'বাজার দর', icon: 'TrendingDown' },
    { id: 'water', name: 'সেচের সমস্যা', icon: 'Droplets' },
    { id: 'fertilizer', name: 'সার ও বীজ', icon: 'Package' },
    { id: 'technology', name: 'প্রযুক্তি ব্যবহার', icon: 'Smartphone' },
    { id: 'finance', name: 'অর্থায়ন', icon: 'DollarSign' }
  ];

  const handleChallengeToggle = (challengeId) => {
    setChallenges(prev => 
      prev?.includes(challengeId)
        ? prev?.filter(id => id !== challengeId)
        : [...prev, challengeId]
    );
  };

  const handleNext = () => {
    if (selectedLevel) {
      onNext({
        experienceLevel: selectedLevel,
        farmingYears,
        landSize,
        challenges
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            iconName="ArrowLeft"
            iconSize={20}
          />
          <div>
            <h1 className="text-xl font-poppins font-bold text-foreground">
              অভিজ্ঞতার মাত্রা
            </h1>
            <p className="text-sm text-muted-foreground">
              আপনার কৃষি অভিজ্ঞতা সম্পর্কে বলুন
            </p>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Experience Level Selection */}
        <div>
          <h2 className="text-lg font-poppins font-semibold text-foreground mb-4">
            আপনার অভিজ্ঞতার স্তর
          </h2>
          <div className="space-y-3">
            {experienceLevels?.map((level) => (
              <div
                key={level?.id}
                onClick={() => setSelectedLevel(level?.id)}
                className={`p-4 rounded-organic border-2 cursor-pointer transition-all duration-200 hover-magnetic ${
                  selectedLevel === level?.id
                    ? level?.color
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    selectedLevel === level?.id ? 'bg-current/20' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={level?.icon} 
                      size={20} 
                      className={selectedLevel === level?.id ? 'text-current' : 'text-muted-foreground'} 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-poppins font-semibold text-foreground">
                        {level?.title}
                      </h3>
                      {selectedLevel === level?.id && (
                        <Icon name="CheckCircle" size={20} className="text-current" />
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {level?.subtitle}
                    </p>
                    
                    <p className="text-sm text-foreground mb-3">
                      {level?.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {level?.benefits?.map((benefit, index) => (
                        <span 
                          key={index}
                          className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Information */}
        {selectedLevel && (
          <div className="space-y-4">
            <h2 className="text-lg font-poppins font-semibold text-foreground">
              অতিরিক্ত তথ্য (ঐচ্ছিক)
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  কত বছর ধরে চাষ করছেন?
                </label>
                <select
                  value={farmingYears}
                  onChange={(e) => setFarmingYears(e?.target?.value)}
                  className="w-full p-3 border border-border rounded-organic bg-background text-foreground"
                >
                  <option value="">নির্বাচন করুন</option>
                  <option value="0-1">০-১ বছর</option>
                  <option value="2-5">২-৫ বছর</option>
                  <option value="6-10">৬-১০ বছর</option>
                  <option value="11-20">১১-২০ বছর</option>
                  <option value="20+">২০+ বছর</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  জমির পরিমাণ
                </label>
                <select
                  value={landSize}
                  onChange={(e) => setLandSize(e?.target?.value)}
                  className="w-full p-3 border border-border rounded-organic bg-background text-foreground"
                >
                  <option value="">নির্বাচন করুন</option>
                  <option value="0-1">০-১ বিঘা</option>
                  <option value="1-5">১-৫ বিঘা</option>
                  <option value="5-10">৫-১০ বিঘা</option>
                  <option value="10+">১০+ বিঘা</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Challenges */}
        {selectedLevel && (
          <div>
            <h2 className="text-lg font-poppins font-semibold text-foreground mb-4">
              আপনার প্রধান চ্যালেঞ্জগুলো কী? (ঐচ্ছিক)
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {commonChallenges?.map((challenge) => (
                <div
                  key={challenge?.id}
                  onClick={() => handleChallengeToggle(challenge?.id)}
                  className={`p-3 rounded-organic border cursor-pointer transition-all duration-200 hover-magnetic ${
                    challenges?.includes(challenge?.id)
                      ? 'border-primary bg-primary/5 text-primary' :'border-border bg-card hover:border-primary/30'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={challenge?.icon} 
                      size={16} 
                      className={challenges?.includes(challenge?.id) ? 'text-primary' : 'text-muted-foreground'} 
                    />
                    <span className="text-sm font-medium">
                      {challenge?.name}
                    </span>
                    {challenges?.includes(challenge?.id) && (
                      <Icon name="Check" size={14} className="text-primary ml-auto" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* Actions */}
      <div className="p-6 border-t border-border">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={handleNext}
          disabled={!selectedLevel}
          className="shadow-natural-lg hover-magnetic"
        >
          পরবর্তী
        </Button>
      </div>
    </div>
  );
};

export default ExperienceAssessmentScreen;