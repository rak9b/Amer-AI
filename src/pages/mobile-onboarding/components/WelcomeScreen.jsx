import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const WelcomeScreen = ({ onNext }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-harvest-gold/5 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-center pt-12 pb-8">
        <div className="relative">
          <div className="w-20 h-20 bg-earth-to-sky rounded-2xl flex items-center justify-center shadow-natural-lg">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="text-white">
              <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="currentColor"/>
              <path d="M19 15L19.5 17.5L22 18L19.5 18.5L19 21L18.5 18.5L16 18L18.5 17.5L19 15Z" fill="currentColor"/>
              <path d="M5 6L5.5 8L8 8.5L5.5 9L5 11L4.5 9L2 8.5L4.5 8L5 6Z" fill="currentColor"/>
            </svg>
          </div>
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-harvest-gold rounded-full flex items-center justify-center shadow-natural">
            <Icon name="Sprout" size={16} className="text-white" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 px-6 flex flex-col justify-center">
        <div className="text-center space-y-6">
          <div className="space-y-3">
            <h1 className="text-4xl font-poppins font-bold text-primary">
              AgriSmart
            </h1>
            <p className="text-lg font-poppins font-semibold text-harvest-gold">
              Bangladesh
            </p>
            <div className="w-16 h-1 bg-harvest-gradient mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4 max-w-sm mx-auto">
            <h2 className="text-2xl font-poppins font-semibold text-foreground">
              স্বাগতম কৃষক ভাই!
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed">
              আপনার কৃষি জ্ঞান + AI বুদ্ধিমত্তা = আরও ভাল ফসল। 
              বাংলাদেশের প্রথম সম্পূর্ণ ডিজিটাল কৃষি প্ল্যাটফর্মে যোগ দিন।
            </p>
          </div>

          {/* Value Propositions */}
          <div className="space-y-4 max-w-md mx-auto">
            <div className="flex items-center space-x-4 p-4 bg-card rounded-organic shadow-natural">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Icon name="Brain" size={20} className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-poppins font-semibold text-foreground">AI পরামর্শ</h3>
                <p className="text-sm text-muted-foreground">দৈনিক ব্যক্তিগত কৃষি গাইড</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-card rounded-organic shadow-natural">
              <div className="w-12 h-12 bg-harvest-gold/10 rounded-full flex items-center justify-center">
                <Icon name="Users" size={20} className="text-harvest-gold" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-poppins font-semibold text-foreground">কৃষক সম্প্রদায়</h3>
                <p className="text-sm text-muted-foreground">অভিজ্ঞতা ভাগাভাগি ও সহায়তা</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 p-4 bg-card rounded-organic shadow-natural">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <Icon name="ShoppingCart" size={20} className="text-accent" />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-poppins font-semibold text-foreground">বাজার সংযোগ</h3>
                <p className="text-sm text-muted-foreground">সরাসরি ক্রেতা-বিক্রেতা যোগাযোগ</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="p-6 space-y-4">
        <Button
          variant="default"
          size="lg"
          fullWidth
          onClick={onNext}
          className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-natural-lg hover-magnetic"
        >
          শুরু করুন
        </Button>
        
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            একাউন্ট তৈরি করে আপনি আমাদের{' '}
            <span className="text-primary font-medium">শর্তাবলী</span> ও{' '}
            <span className="text-primary font-medium">গোপনীয়তা নীতি</span> মেনে নিচ্ছেন
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;