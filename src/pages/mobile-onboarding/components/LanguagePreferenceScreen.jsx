import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguagePreferenceScreen = ({ onNext, onBack }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('bn');
  const [audioSupport, setAudioSupport] = useState(true);

  const languages = [
    {
      code: 'bn',
      name: 'বাংলা',
      englishName: 'Bengali',
      flag: '🇧🇩',
      description: 'আপনার মাতৃভাষায় সব তথ্য পাবেন',
      sampleText: 'কৃষি পরামর্শ ও সহায়তা'
    },
    {
      code: 'en',
      name: 'English',
      englishName: 'English',
      flag: '🇺🇸',
      description: 'Get all information in English',
      sampleText: 'Agricultural advice & support'
    }
  ];

  const audioFeatures = [
    {
      id: 'voice-guidance',
      title: 'ভয়েস গাইডেন্স',
      description: 'গুরুত্বপূর্ণ তথ্য শুনে নিন',
      icon: 'Volume2'
    },
    {
      id: 'audio-notifications',
      title: 'অডিও বিজ্ঞপ্তি',
      description: 'আবহাওয়া ও কৃষি সতর্কতা শুনুন',
      icon: 'Bell'
    },
    {
      id: 'text-to-speech',
      title: 'টেক্সট রিডিং',
      description: 'যেকোনো লেখা শুনে নিন',
      icon: 'Headphones'
    }
  ];

  const handleNext = () => {
    // Save language preference to localStorage
    localStorage.setItem('preferredLanguage', selectedLanguage);
    localStorage.setItem('audioSupport', audioSupport?.toString());
    
    onNext({
      language: selectedLanguage,
      audioSupport
    });
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
              ভাষা নির্বাচন
            </h1>
            <p className="text-sm text-muted-foreground">
              আপনার পছন্দের ভাষা বেছে নিন
            </p>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Language Selection */}
        <div>
          <h2 className="text-lg font-poppins font-semibold text-foreground mb-4">
            প্রধান ভাষা
          </h2>
          <div className="space-y-3">
            {languages?.map((language) => (
              <div
                key={language?.code}
                onClick={() => setSelectedLanguage(language?.code)}
                className={`p-4 rounded-organic border-2 cursor-pointer transition-all duration-200 hover-magnetic ${
                  selectedLanguage === language?.code
                    ? 'border-primary bg-primary/5 shadow-natural'
                    : 'border-border bg-card hover:border-primary/30'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{language?.flag}</div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-poppins font-semibold text-foreground text-lg">
                        {language?.name}
                      </h3>
                      {selectedLanguage === language?.code && (
                        <Icon name="CheckCircle" size={20} className="text-primary" />
                      )}
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {language?.description}
                    </p>
                    
                    <p className="text-sm font-medium text-foreground">
                      {language?.sampleText}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Audio Support */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-poppins font-semibold text-foreground">
              অডিও সহায়তা
            </h2>
            <button
              onClick={() => setAudioSupport(!audioSupport)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                audioSupport ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                audioSupport ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {audioSupport && (
            <div className="space-y-3">
              {audioFeatures?.map((feature) => (
                <div
                  key={feature?.id}
                  className="flex items-start space-x-4 p-4 bg-card rounded-organic shadow-natural"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name={feature?.icon} size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-foreground">
                      {feature?.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature?.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!audioSupport && (
            <div className="p-4 bg-muted/50 rounded-organic">
              <p className="text-sm text-muted-foreground text-center">
                অডিও সহায়তা বন্ধ আছে। আপনি যেকোনো সময় সেটিংস থেকে চালু করতে পারবেন।
              </p>
            </div>
          )}
        </div>

        {/* Benefits */}
        <div className="bg-primary/5 p-4 rounded-organic">
          <h3 className="font-poppins font-semibold text-foreground mb-3 flex items-center">
            <Icon name="Star" size={16} className="text-primary mr-2" />
            ভাষা সহায়তার সুবিধা
          </h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start space-x-2">
              <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
              <span>সহজ ও বোধগম্য ভাষায় পরামর্শ</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
              <span>স্থানীয় কৃষি পরিভাষা ব্যবহার</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
              <span>অডিও সহায়তায় নিরক্ষর কৃষকদের সুবিধা</span>
            </li>
            <li className="flex items-start space-x-2">
              <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
              <span>যেকোনো সময় ভাষা পরিবর্তন করা যাবে</span>
            </li>
          </ul>
        </div>

        {/* Language Switch Demo */}
        <div className="bg-card p-4 rounded-organic shadow-natural">
          <h3 className="font-poppins font-semibold text-foreground mb-3">
            {selectedLanguage === 'bn' ? 'ভাষা পরিবর্তনের উদাহরণ:' : 'Language Switch Example:'}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-muted rounded-organic-sm">
              <span className="text-muted-foreground">
                {selectedLanguage === 'bn' ? 'আবহাওয়া:' : 'Weather:'}
              </span>
              <span className="font-medium text-foreground">
                {selectedLanguage === 'bn' ? '২৮°C, রৌদ্রোজ্জ্বল' : '28°C, Sunny'}
              </span>
            </div>
            <div className="flex justify-between items-center p-2 bg-muted rounded-organic-sm">
              <span className="text-muted-foreground">
                {selectedLanguage === 'bn' ? 'পরামর্শ:' : 'Advice:'}
              </span>
              <span className="font-medium text-foreground">
                {selectedLanguage === 'bn' ? 'সেচ দিন' : 'Water crops'}
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Actions */}
      <div className="p-6 border-t border-border">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={handleNext}
          className="shadow-natural-lg hover-magnetic"
        >
          {selectedLanguage === 'bn' ? 'পরবর্তী' : 'Continue'}
        </Button>
      </div>
    </div>
  );
};

export default LanguagePreferenceScreen;