import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const AnalysisResults = ({ 
  results, 
  imageUrl, 
  cropType, 
  onNewAnalysis, 
  onShareWithExperts,
  onSaveToHistory 
}) => {
  const [activeTab, setActiveTab] = useState('diagnosis');
  const [showFullDescription, setShowFullDescription] = useState(false);

  if (!results) return null;

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low': return 'text-success bg-success/10 border-success/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'high': return 'text-error bg-error/10 border-error/20';
      default: return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-warning';
    return 'text-error';
  };

  const tabs = [
    { id: 'diagnosis', label: 'Diagnosis', icon: 'Stethoscope' },
    { id: 'treatment', label: 'Treatment', icon: 'Pill' },
    { id: 'prevention', label: 'Prevention', icon: 'Shield' }
  ];

  return (
    <div className="bg-card rounded-organic shadow-natural border border-border overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-accent/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-organic flex items-center justify-center">
              <Icon name="Brain" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-poppins font-semibold text-foreground">AI Analysis Results</h2>
              <p className="text-sm text-muted-foreground">Disease detection complete</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full border ${getSeverityColor(results?.severity)}`}>
              <span className="text-xs font-inter font-medium">
                {results?.severity} Risk
              </span>
            </div>
          </div>
        </div>

        {/* Confidence Score */}
        <div className="bg-white/50 rounded-organic p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-inter font-medium text-foreground">Confidence Score</span>
            <span className={`text-lg font-poppins font-bold ${getConfidenceColor(results?.confidence)}`}>
              {results?.confidence}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-500 ${
                results?.confidence >= 80 ? 'bg-success' : 
                results?.confidence >= 60 ? 'bg-warning' : 'bg-error'
              }`}
              style={{ width: `${results?.confidence}%` }}
            ></div>
          </div>
        </div>
      </div>
      {/* Image and Primary Diagnosis */}
      <div className="p-6 border-b border-border">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="relative">
            <Image
              src={imageUrl}
              alt={`Analysis result showing ${results?.diseaseName} detected in ${cropType} crop with ${results?.confidence}% confidence`}
              className="w-full h-48 object-cover rounded-organic"
            />
            <div className="absolute top-3 left-3 bg-black/70 text-white px-2 py-1 rounded-organic-sm text-xs">
              Analyzed Image
            </div>
          </div>

          {/* Primary Diagnosis */}
          <div className="space-y-4">
            <div>
              <h3 className="font-poppins font-semibold text-lg text-foreground mb-2">
                {results?.diseaseName}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {showFullDescription ? results?.description : `${results?.description?.substring(0, 120)}...`}
              </p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowFullDescription(!showFullDescription)}
                iconName={showFullDescription ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
              >
                {showFullDescription ? 'Show Less' : 'Read More'}
              </Button>
            </div>

            {/* Key Indicators */}
            <div className="space-y-3">
              <h4 className="font-inter font-medium text-foreground">Key Indicators Detected:</h4>
              <div className="space-y-2">
                {results?.indicators?.map((indicator, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="CheckCircle" size={14} className="text-success" />
                    <span className="text-sm text-muted-foreground">{indicator}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <div className="flex">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-inter font-medium transition-natural ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>
      </div>
      {/* Tab Content */}
      <div className="p-6">
        {activeTab === 'diagnosis' && (
          <div className="space-y-6">
            {/* Detailed Analysis */}
            <div>
              <h4 className="font-poppins font-medium text-foreground mb-3">Detailed Analysis</h4>
              <div className="bg-muted/50 rounded-organic p-4 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm font-inter font-medium text-foreground">Disease Type:</span>
                    <p className="text-sm text-muted-foreground">{results?.diseaseType}</p>
                  </div>
                  <div>
                    <span className="text-sm font-inter font-medium text-foreground">Affected Area:</span>
                    <p className="text-sm text-muted-foreground">{results?.affectedArea}</p>
                  </div>
                  <div>
                    <span className="text-sm font-inter font-medium text-foreground">Spread Rate:</span>
                    <p className="text-sm text-muted-foreground">{results?.spreadRate}</p>
                  </div>
                  <div>
                    <span className="text-sm font-inter font-medium text-foreground">Stage:</span>
                    <p className="text-sm text-muted-foreground">{results?.stage}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Cases */}
            <div>
              <h4 className="font-poppins font-medium text-foreground mb-3">Similar Cases in Your Area</h4>
              <div className="space-y-3">
                {results?.similarCases?.map((case_, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-organic">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="MapPin" size={14} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-inter font-medium text-foreground">{case_?.location}</p>
                      <p className="text-xs text-muted-foreground">{case_?.description}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{case_?.timeAgo}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'treatment' && (
          <div className="space-y-6">
            {/* Immediate Actions */}
            <div>
              <h4 className="font-poppins font-medium text-foreground mb-3 flex items-center">
                <Icon name="Clock" size={18} className="mr-2 text-error" />
                Immediate Actions Required
              </h4>
              <div className="space-y-3">
                {results?.immediateActions?.map((action, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-error/5 border border-error/20 rounded-organic">
                    <div className="w-6 h-6 bg-error/10 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-xs font-bold text-error">{index + 1}</span>
                    </div>
                    <p className="text-sm text-foreground">{action}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommended Products */}
            <div>
              <h4 className="font-poppins font-medium text-foreground mb-3">Recommended Products</h4>
              <div className="grid md:grid-cols-2 gap-4">
                {results?.recommendedProducts?.map((product, index) => (
                  <div key={index} className="border border-border rounded-organic p-4 hover-magnetic">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h5 className="font-inter font-medium text-foreground">{product?.name}</h5>
                        <p className="text-sm text-muted-foreground">{product?.type}</p>
                      </div>
                      <span className="text-sm font-bold text-primary">৳{product?.price}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{product?.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-success">Available locally</span>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'prevention' && (
          <div className="space-y-6">
            {/* Prevention Tips */}
            <div>
              <h4 className="font-poppins font-medium text-foreground mb-3">Prevention Guidelines</h4>
              <div className="space-y-3">
                {results?.preventionTips?.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-success/5 border border-success/20 rounded-organic">
                    <Icon name="Shield" size={16} className="text-success mt-0.5" />
                    <p className="text-sm text-foreground">{tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Seasonal Calendar */}
            <div>
              <h4 className="font-poppins font-medium text-foreground mb-3">Seasonal Prevention Calendar</h4>
              <div className="bg-muted/50 rounded-organic p-4">
                <div className="grid grid-cols-3 gap-4">
                  {results?.seasonalTips?.map((season, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Icon name={season?.icon} size={20} className="text-primary" />
                      </div>
                      <h5 className="font-inter font-medium text-sm text-foreground mb-1">{season?.season}</h5>
                      <p className="text-xs text-muted-foreground">{season?.tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Action Buttons */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={onNewAnalysis}
            iconName="Camera"
            iconPosition="left"
          >
            New Analysis
          </Button>
          
          <Button
            variant="outline"
            onClick={onSaveToHistory}
            iconName="Save"
            iconPosition="left"
          >
            Save to History
          </Button>
          
          <Button
            onClick={onShareWithExperts}
            iconName="Users"
            iconPosition="left"
            className="ai-pulse"
          >
            Share with Experts
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnalysisResults;