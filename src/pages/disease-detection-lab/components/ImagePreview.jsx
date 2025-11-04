import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const ImagePreview = ({ 
  imageFile, 
  cropType, 
  onRetake, 
  onAnalyze,
  isAnalyzing,
  analysisProgress
}) => {
  const imageUrl = imageFile ? URL.createObjectURL(imageFile) : '';

  return (
    <div className="bg-card rounded-organic shadow-natural border border-border overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary rounded-organic flex items-center justify-center">
            <Icon name="Camera" size={20} className="text-primary-foreground" />
          </div>
          <div>
            <h2 className="text-xl font-poppins font-semibold text-foreground">Image Preview</h2>
            <p className="text-sm text-muted-foreground">Review your captured image before analysis</p>
          </div>
        </div>
      </div>

      {/* Image Preview */}
      <div className="p-6">
        <div className="relative mb-6">
          <Image
            src={imageUrl}
            alt={`Preview of ${cropType} crop image`}
            className="w-full h-64 object-contain rounded-organic border border-border"
          />
          <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-organic-sm text-xs">
            {cropType} Crop
          </div>
        </div>

        {/* Crop Info */}
        <div className="bg-muted/50 rounded-organic p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-poppins font-medium text-foreground">Selected Crop</h3>
              <p className="text-sm text-muted-foreground capitalize">{cropType}</p>
            </div>
            <Icon name="Sprout" size={24} className="text-primary" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            variant="outline"
            onClick={onRetake}
            iconName="RefreshCw"
            iconPosition="left"
            className="flex-1"
          >
            Retake Photo
          </Button>
          
          <Button
            onClick={onAnalyze}
            disabled={isAnalyzing}
            iconName={isAnalyzing ? "Loader2" : "Zap"}
            iconPosition="left"
            iconProps={isAnalyzing ? { className: "animate-spin" } : {}}
            className="flex-1"
          >
            {isAnalyzing ? `Analyzing... ${Math.round(analysisProgress)}%` : 'Start Analysis'}
          </Button>
        </div>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <div className="mt-4">
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-primary transition-all duration-300"
                style={{ width: `${analysisProgress}%` }}
              ></div>
            </div>
            <p className="text-center text-sm text-muted-foreground mt-2">
              Processing image with AI algorithms...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImagePreview;
