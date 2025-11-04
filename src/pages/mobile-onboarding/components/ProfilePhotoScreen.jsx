import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ProfilePhotoScreen = ({ onNext, onBack }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleImageSelect = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      if (file?.size > 5 * 1024 * 1024) { // 5MB limit
        alert('ছবির সাইজ ৫ MB এর কম হতে হবে');
        return;
      }
      
      setSelectedImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e?.target?.result);
      };
      reader?.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    if (fileInputRef?.current) {
      fileInputRef?.current?.setAttribute('capture', 'camera');
      fileInputRef?.current?.click();
    }
  };

  const handleGallerySelect = () => {
    if (fileInputRef?.current) {
      fileInputRef?.current?.removeAttribute('capture');
      fileInputRef?.current?.click();
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef?.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleNext = async () => {
    if (selectedImage) {
      setIsUploading(true);
      // Simulate upload delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsUploading(false);
    }
    onNext(selectedImage);
  };

  const handleSkip = () => {
    onNext(null);
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
              প্রোফাইল ছবি
            </h1>
            <p className="text-sm text-muted-foreground">
              আপনার ছবি যোগ করুন (ঐচ্ছিক)
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center p-6">
        <div className="text-center space-y-6">
          {/* Profile Photo Preview */}
          <div className="relative mx-auto">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-border bg-muted flex items-center justify-center">
              {imagePreview ? (
                <Image
                  src={imagePreview}
                  alt="Profile photo preview showing user's selected image"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon name="User" size={48} className="text-muted-foreground" />
              )}
            </div>
            
            {selectedImage && (
              <button
                onClick={handleRemoveImage}
                className="absolute -top-2 -right-2 w-8 h-8 bg-error text-error-foreground rounded-full flex items-center justify-center shadow-natural hover-magnetic"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>

          {/* Upload Options */}
          <div className="space-y-4">
            <h2 className="text-lg font-poppins font-semibold text-foreground">
              ছবি যোগ করার উপায়
            </h2>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={handleCameraCapture}
                className="p-6 border-2 border-dashed border-border rounded-organic hover:border-primary/50 transition-all duration-200 hover-magnetic"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="Camera" size={24} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-foreground">ক্যামেরা</h3>
                    <p className="text-sm text-muted-foreground">নতুন ছবি তুলুন</p>
                  </div>
                </div>
              </button>

              <button
                onClick={handleGallerySelect}
                className="p-6 border-2 border-dashed border-border rounded-organic hover:border-primary/50 transition-all duration-200 hover-magnetic"
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-harvest-gold/10 rounded-full flex items-center justify-center mx-auto">
                    <Icon name="Image" size={24} className="text-harvest-gold" />
                  </div>
                  <div>
                    <h3 className="font-poppins font-semibold text-foreground">গ্যালারি</h3>
                    <p className="text-sm text-muted-foreground">সংরক্ষিত ছবি</p>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-muted/50 p-4 rounded-organic text-left">
            <h3 className="font-poppins font-semibold text-foreground mb-3 flex items-center">
              <Icon name="Info" size={16} className="text-primary mr-2" />
              প্রোফাইল ছবির সুবিধা
            </h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>কমিউনিটিতে পরিচিতি বৃদ্ধি</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>বিশ্বস্ততা ও নির্ভরযোগ্যতা</span>
              </li>
              <li className="flex items-start space-x-2">
                <Icon name="Check" size={14} className="text-success mt-0.5 flex-shrink-0" />
                <span>ব্যক্তিগত প্রোফাইল সাজানো</span>
              </li>
            </ul>
          </div>

          {/* Privacy Note */}
          <div className="bg-primary/5 p-4 rounded-organic">
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div className="text-left">
                <h4 className="font-poppins font-semibold text-foreground text-sm">গোপনীয়তা সুরক্ষিত</h4>
                <p className="text-xs text-muted-foreground">
                  আপনার ছবি সম্পূর্ণ নিরাপদ এবং শুধুমাত্র প্রোফাইলে দেখানো হবে।
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />
      </div>

      {/* Actions */}
      <div className="p-6 border-t border-border space-y-3">
        <Button
          variant="default"
          size="lg"
          fullWidth
          loading={isUploading}
          onClick={handleNext}
          disabled={!selectedImage && isUploading}
          className="shadow-natural-lg hover-magnetic"
        >
          {isUploading ? 'আপলোড হচ্ছে...' : selectedImage ? 'ছবি সংরক্ষণ করুন' : 'পরবর্তী'}
        </Button>
        
        {!selectedImage && (
          <Button
            variant="ghost"
            size="lg"
            fullWidth
            onClick={handleSkip}
            className="text-muted-foreground"
          >
            এখন নয়, পরে করব
          </Button>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoScreen;