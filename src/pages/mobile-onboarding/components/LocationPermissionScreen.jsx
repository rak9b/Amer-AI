import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationPermissionScreen = ({ onNext, onSkip }) => {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleLocationRequest = async () => {
    setIsRequesting(true);
    
    try {
      if (navigator.geolocation) {
        navigator.geolocation?.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position?.coords;
            console.log('Location obtained:', { latitude, longitude });
            setIsRequesting(false);
            onNext({ latitude, longitude });
          },
          (error) => {
            console.error('Location error:', error);
            setIsRequesting(false);
            // Still proceed to next step even if location fails
            onNext(null);
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 300000
          }
        );
      } else {
        setIsRequesting(false);
        onNext(null);
      }
    } catch (error) {
      console.error('Location request failed:', error);
      setIsRequesting(false);
      onNext(null);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="p-6 text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="MapPin" size={40} className="text-primary" />
        </div>
        
        <h1 className="text-2xl font-poppins font-bold text-foreground mb-3">
          আপনার অবস্থান শেয়ার করুন
        </h1>
        
        <p className="text-base text-muted-foreground leading-relaxed">
          স্থানীয় আবহাওয়া, মাটির তথ্য এবং এলাকা-ভিত্তিক কৃষি পরামর্শ পেতে আপনার অবস্থান প্রয়োজন।
        </p>
      </div>

      {/* Benefits */}
      <div className="flex-1 px-6">
        <div className="space-y-4 mb-8">
          <h2 className="text-lg font-poppins font-semibold text-foreground mb-4">
            আপনি যা পাবেন:
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-card rounded-organic shadow-natural">
              <div className="w-10 h-10 bg-sky-blue/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Cloud" size={20} className="text-sky-blue" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-foreground">স্থানীয় আবহাওয়া</h3>
                <p className="text-sm text-muted-foreground">
                  আপনার এলাকার সঠিক আবহাওয়ার পূর্ভাবাস ও সতর্কতা
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-card rounded-organic shadow-natural">
              <div className="w-10 h-10 bg-fertile-soil/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Layers" size={20} className="text-fertile-soil" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-foreground">মাটির তথ্য</h3>
                <p className="text-sm text-muted-foreground">
                  আপনার এলাকার মাটির ধরন ও উপযুক্ত ফসলের পরামর্শ
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-card rounded-organic shadow-natural">
              <div className="w-10 h-10 bg-rice-green/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Sprout" size={20} className="text-rice-green" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-foreground">ফসলের পরামর্শ</h3>
                <p className="text-sm text-muted-foreground">
                  এলাকা-ভিত্তিক সেরা ফসল ও চাষাবাদের পদ্ধতি
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-card rounded-organic shadow-natural">
              <div className="w-10 h-10 bg-harvest-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="Users" size={20} className="text-harvest-gold" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-foreground">স্থানীয় কৃষক</h3>
                <p className="text-sm text-muted-foreground">
                  আশেপাশের কৃষকদের সাথে যোগাযোগ ও অভিজ্ঞতা ভাগাভাগি
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="bg-muted/50 p-4 rounded-organic mb-6">
          <div className="flex items-start space-x-3">
            <Icon name="Shield" size={20} className="text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-poppins font-semibold text-foreground text-sm">গোপনীয়তা সুরক্ষিত</h4>
              <p className="text-xs text-muted-foreground">
                আপনার অবস্থানের তথ্য সম্পূর্ণ নিরাপদ এবং শুধুমাত্র কৃষি সেবা প্রদানের জন্য ব্যবহৃত হবে।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="p-6 space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={isRequesting}
          onClick={handleLocationRequest}
          iconName="MapPin"
          iconPosition="left"
          className="shadow-natural-lg hover-magnetic"
        >
          {isRequesting ? 'অবস্থান খুঁজছি...' : 'অবস্থান শেয়ার করুন'}
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          fullWidth
          onClick={onSkip}
          className="text-muted-foreground"
        >
          পরে করব
        </Button>
      </div>
    </div>
  );
};

export default LocationPermissionScreen;