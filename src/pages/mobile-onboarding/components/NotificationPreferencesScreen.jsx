import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPreferencesScreen = ({ onNext, onBack }) => {
  const [preferences, setPreferences] = useState({
    weather: true,
    disease: true,
    community: true,
    market: false,
    expert: true,
    reminders: true
  });

  const [deliveryMethods, setDeliveryMethods] = useState({
    push: true,
    sms: false,
    call: false
  });

  const [quietHours, setQuietHours] = useState({
    enabled: true,
    start: '22:00',
    end: '06:00'
  });

  const notificationTypes = [
    {
      id: 'weather',
      title: 'আবহাওয়া সতর্কতা',
      description: 'বৃষ্টি, ঝড়, খরা ও অন্যান্য আবহাওয়া সংক্রান্ত সতর্কতা',
      icon: 'Cloud',
      color: 'text-sky-blue',
      priority: 'উচ্চ'
    },
    {
      id: 'disease',
      title: 'রোগ-পোকা সতর্কতা',
      description: 'ফসলের রোগ ও পোকামাকড়ের আক্রমণ সম্পর্কে সতর্কতা',
      icon: 'Bug',
      color: 'text-error',
      priority: 'উচ্চ'
    },
    {
      id: 'community',
      title: 'কমিউনিটি আপডেট',
      description: 'নতুন প্রশ্ন, উত্তর ও আলোচনার বিজ্ঞপ্তি',
      icon: 'Users',
      color: 'text-harvest-gold',
      priority: 'মধ্যম'
    },
    {
      id: 'market',
      title: 'বাজার দর',
      description: 'ফসলের দাম ও বাজার সংক্রান্ত তথ্য',
      icon: 'TrendingUp',
      color: 'text-success',
      priority: 'মধ্যম'
    },
    {
      id: 'expert',
      title: 'বিশেষজ্ঞ পরামর্শ',
      description: 'কৃষি বিশেষজ্ঞদের পরামর্শ ও উত্তর',
      icon: 'GraduationCap',
      color: 'text-primary',
      priority: 'উচ্চ'
    },
    {
      id: 'reminders',
      title: 'কৃষি কাজের রিমাইন্ডার',
      description: 'বীজ বপন, সার প্রয়োগ, সেচ ইত্যাদির সময়সূচী',
      icon: 'Clock',
      color: 'text-accent',
      priority: 'উচ্চ'
    }
  ];

  const deliveryOptions = [
    {
      id: 'push',
      title: 'অ্যাপ নোটিফিকেশন',
      description: 'মোবাইল অ্যাপে তাৎক্ষণিক বিজ্ঞপ্তি',
      icon: 'Smartphone',
      recommended: true
    },
    {
      id: 'sms',
      title: 'SMS বার্তা',
      description: 'গুরুত্বপূর্ণ সতর্কতা SMS এ পাবেন',
      icon: 'MessageSquare',
      recommended: false
    },
    {
      id: 'call',
      title: 'ভয়েস কল',
      description: 'জরুরি সতর্কতা ফোন কলে পাবেন',
      icon: 'Phone',
      recommended: false
    }
  ];

  const handlePreferenceToggle = (type) => {
    setPreferences(prev => ({
      ...prev,
      [type]: !prev?.[type]
    }));
  };

  const handleDeliveryToggle = (method) => {
    setDeliveryMethods(prev => ({
      ...prev,
      [method]: !prev?.[method]
    }));
  };

  const handleQuietHoursToggle = () => {
    setQuietHours(prev => ({
      ...prev,
      enabled: !prev?.enabled
    }));
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'উচ্চ': return 'text-error bg-error/10';
      case 'মধ্যম': return 'text-warning bg-warning/10';
      case 'নিম্ন': return 'text-success bg-success/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const handleNext = () => {
    onNext({
      preferences,
      deliveryMethods,
      quietHours
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
              বিজ্ঞপ্তি সেটিংস
            </h1>
            <p className="text-sm text-muted-foreground">
              আপনার পছন্দ অনুযায়ী বিজ্ঞপ্তি কাস্টমাইজ করুন
            </p>
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {/* Notification Types */}
        <div>
          <h2 className="text-lg font-poppins font-semibold text-foreground mb-4">
            বিজ্ঞপ্তির ধরন
          </h2>
          <div className="space-y-3">
            {notificationTypes?.map((type) => (
              <div
                key={type?.id}
                className="p-4 bg-card rounded-organic shadow-natural border border-border"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-current/10 ${type?.color}`}>
                    <Icon name={type?.icon} size={20} className="text-current" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-poppins font-semibold text-foreground">
                        {type?.title}
                      </h3>
                      <button
                        onClick={() => handlePreferenceToggle(type?.id)}
                        className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                          preferences?.[type?.id] ? 'bg-primary' : 'bg-muted'
                        }`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                          preferences?.[type?.id] ? 'translate-x-5' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-2">
                      {type?.description}
                    </p>
                    
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(type?.priority)}`}>
                      {type?.priority} অগ্রাধিকার
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delivery Methods */}
        <div>
          <h2 className="text-lg font-poppins font-semibold text-foreground mb-4">
            বিজ্ঞপ্তি পাওয়ার মাধ্যম
          </h2>
          <div className="space-y-3">
            {deliveryOptions?.map((option) => (
              <div
                key={option?.id}
                onClick={() => handleDeliveryToggle(option?.id)}
                className={`p-4 rounded-organic border-2 cursor-pointer transition-all duration-200 hover-magnetic ${
                  deliveryMethods?.[option?.id]
                    ? 'border-primary bg-primary/5' :'border-border bg-card hover:border-primary/30'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    deliveryMethods?.[option?.id] ? 'bg-primary/20' : 'bg-muted'
                  }`}>
                    <Icon 
                      name={option?.icon} 
                      size={20} 
                      className={deliveryMethods?.[option?.id] ? 'text-primary' : 'text-muted-foreground'} 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-poppins font-semibold text-foreground">
                        {option?.title}
                      </h3>
                      {option?.recommended && (
                        <span className="text-xs px-2 py-1 bg-success/10 text-success rounded-full font-medium">
                          সুপারিশকৃত
                        </span>
                      )}
                      {deliveryMethods?.[option?.id] && (
                        <Icon name="Check" size={16} className="text-primary" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {option?.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quiet Hours */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-poppins font-semibold text-foreground">
              নিরব সময়
            </h2>
            <button
              onClick={handleQuietHoursToggle}
              className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                quietHours?.enabled ? 'bg-primary' : 'bg-muted'
              }`}
            >
              <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-200 ${
                quietHours?.enabled ? 'translate-x-6' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          {quietHours?.enabled && (
            <div className="p-4 bg-card rounded-organic shadow-natural">
              <div className="flex items-center space-x-4 mb-3">
                <Icon name="Moon" size={20} className="text-primary" />
                <p className="text-sm text-muted-foreground">
                  এই সময়ে শুধু জরুরি বিজ্ঞপ্তি পাবেন
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    শুরু
                  </label>
                  <input
                    type="time"
                    value={quietHours?.start}
                    onChange={(e) => setQuietHours(prev => ({ ...prev, start: e?.target?.value }))}
                    className="w-full p-2 border border-border rounded-organic bg-background text-foreground"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    শেষ
                  </label>
                  <input
                    type="time"
                    value={quietHours?.end}
                    onChange={(e) => setQuietHours(prev => ({ ...prev, end: e?.target?.value }))}
                    className="w-full p-2 border border-border rounded-organic bg-background text-foreground"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div className="bg-primary/5 p-4 rounded-organic">
          <h3 className="font-poppins font-semibold text-foreground mb-3 flex items-center">
            <Icon name="Info" size={16} className="text-primary mr-2" />
            বিজ্ঞপ্তি সারসংক্ষেপ
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">সক্রিয় বিজ্ঞপ্তি:</span>
              <span className="font-medium text-foreground">
                {Object.values(preferences)?.filter(Boolean)?.length}/{Object.keys(preferences)?.length}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">ডেলিভারি মাধ্যম:</span>
              <span className="font-medium text-foreground">
                {Object.values(deliveryMethods)?.filter(Boolean)?.length} টি সক্রিয়
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">নিরব সময়:</span>
              <span className="font-medium text-foreground">
                {quietHours?.enabled ? `${quietHours?.start} - ${quietHours?.end}` : 'বন্ধ'}
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
          পরবর্তী
        </Button>
      </div>
    </div>
  );
};

export default NotificationPreferencesScreen;