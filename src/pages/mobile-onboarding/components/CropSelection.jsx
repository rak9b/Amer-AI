import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CropSelectionScreen = ({ onNext, onBack }) => {
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const cropCategories = [
    {
      name: 'প্রধান ফসল',
      crops: [
        { id: 'rice', name: 'ধান', icon: '🌾', season: 'আমন/বোরো', difficulty: 'সহজ' },
        { id: 'wheat', name: 'গম', icon: '🌾', season: 'রবি', difficulty: 'সহজ' },
        { id: 'jute', name: 'পাট', icon: '🌿', season: 'খরিফ', difficulty: 'মধ্যম' },
        { id: 'sugarcane', name: 'আখ', icon: '🎋', season: 'সারাবছর', difficulty: 'কঠিন' }
      ]
    },
    {
      name: 'সবজি',
      crops: [
        { id: 'potato', name: 'আলু', icon: '🥔', season: 'রবি', difficulty: 'সহজ' },
        { id: 'tomato', name: 'টমেটো', icon: '🍅', season: 'রবি/খরিফ', difficulty: 'মধ্যম' },
        { id: 'onion', name: 'পেঁয়াজ', icon: '🧅', season: 'রবি', difficulty: 'মধ্যম' },
        { id: 'cabbage', name: 'বাঁধাকপি', icon: '🥬', season: 'রবি', difficulty: 'সহজ' },
        { id: 'eggplant', name: 'বেগুন', icon: '🍆', season: 'সারাবছর', difficulty: 'সহজ' },
        { id: 'okra', name: 'ঢেঁড়স', icon: '🌶️', season: 'খরিফ', difficulty: 'সহজ' }
      ]
    },
    {
      name: 'ফল',
      crops: [
        { id: 'mango', name: 'আম', icon: '🥭', season: 'গ্রীষ্ম', difficulty: 'কঠিন' },
        { id: 'banana', name: 'কলা', icon: '🍌', season: 'সারাবছর', difficulty: 'মধ্যম' },
        { id: 'jackfruit', name: 'কাঁঠাল', icon: '🍈', season: 'গ্রীষ্ম', difficulty: 'কঠিন' },
        { id: 'guava', name: 'পেয়ারা', icon: '🍐', season: 'সারাবছর', difficulty: 'সহজ' }
      ]
    },
    {
      name: 'ডাল ও তেল',
      crops: [
        { id: 'lentil', name: 'মসুর', icon: '🫘', season: 'রবি', difficulty: 'সহজ' },
        { id: 'mustard', name: 'সরিষা', icon: '🌻', season: 'রবি', difficulty: 'সহজ' },
        { id: 'sesame', name: 'তিল', icon: '🌰', season: 'খরিফ', difficulty: 'মধ্যম' }
      ]
    }
  ];

  const allCrops = cropCategories?.flatMap(category => category?.crops);
  
  const filteredCrops = searchQuery 
    ? allCrops?.filter(crop => crop?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()))
    : allCrops;

  const handleCropToggle = (cropId) => {
    setSelectedCrops(prev => 
      prev?.includes(cropId) 
        ? prev?.filter(id => id !== cropId)
        : [...prev, cropId]
    );
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'সহজ': return 'text-success bg-success/10';
      case 'মধ্যম': return 'text-warning bg-warning/10';
      case 'কঠিন': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const handleNext = () => {
    if (selectedCrops?.length > 0) {
      onNext(selectedCrops);
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
              ফসল নির্বাচন
            </h1>
            <p className="text-sm text-muted-foreground">
              আপনি যে ফসল চাষ করেন বা করতে চান
            </p>
          </div>
        </div>

        {/* Search */}
        <Input
          type="search"
          placeholder="ফসল খুঁজুন..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="mb-4"
        />

        {/* Selected Count */}
        {selectedCrops?.length > 0 && (
          <div className="flex items-center space-x-2 p-3 bg-primary/10 rounded-organic">
            <Icon name="Check" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">
              {selectedCrops?.length}টি ফসল নির্বাচিত
            </span>
          </div>
        )}
      </div>
      {/* Crop Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        {searchQuery ? (
          <div className="grid grid-cols-2 gap-3">
            {filteredCrops?.map((crop) => (
              <CropCard
                key={crop?.id}
                crop={crop}
                isSelected={selectedCrops?.includes(crop?.id)}
                onToggle={() => handleCropToggle(crop?.id)}
                getDifficultyColor={getDifficultyColor}
              />
            ))}
          </div>
        ) : (
          <div className="space-y-6">
            {cropCategories?.map((category) => (
              <div key={category?.name}>
                <h2 className="text-lg font-poppins font-semibold text-foreground mb-3">
                  {category?.name}
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {category?.crops?.map((crop) => (
                    <CropCard
                      key={crop?.id}
                      crop={crop}
                      isSelected={selectedCrops?.includes(crop?.id)}
                      onToggle={() => handleCropToggle(crop?.id)}
                      getDifficultyColor={getDifficultyColor}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredCrops?.length === 0 && searchQuery && (
          <div className="text-center py-12">
            <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">কোনো ফসল পাওয়া যায়নি</p>
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
          disabled={selectedCrops?.length === 0}
          className="shadow-natural-lg hover-magnetic"
        >
          পরবর্তী ({selectedCrops?.length})
        </Button>
      </div>
    </div>
  );
};

const CropCard = ({ crop, isSelected, onToggle, getDifficultyColor }) => {
  return (
    <div
      onClick={onToggle}
      className={`relative p-4 rounded-organic border-2 transition-all duration-200 cursor-pointer hover-magnetic ${
        isSelected 
          ? 'border-primary bg-primary/5 shadow-natural' 
          : 'border-border bg-card hover:border-primary/30'
      }`}
    >
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute top-2 right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Check" size={14} className="text-primary-foreground" />
        </div>
      )}
      {/* Crop Icon */}
      <div className="text-3xl mb-2">{crop?.icon}</div>
      {/* Crop Info */}
      <div className="space-y-2">
        <h3 className="font-poppins font-semibold text-foreground text-sm">
          {crop?.name}
        </h3>
        
        <div className="space-y-1">
          <div className="flex items-center space-x-1">
            <Icon name="Calendar" size={12} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{crop?.season}</span>
          </div>
          
          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(crop?.difficulty)}`}>
            {crop?.difficulty}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropSelectionScreen;