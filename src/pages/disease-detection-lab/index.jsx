import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import CameraInterface from './components/CameraInterface';
import ImagePreview from './components/ImagePreview';
import AnalysisResults from './components/AnalysisResults';
import DetectionHistory from './components/DetectionHistory';
import ExpertConsultation from './components/ExpertConsultation';

const DiseaseDetectionLab = () => {
  const [currentStep, setCurrentStep] = useState('camera'); // camera, preview, analysis, results
  const [capturedImage, setCapturedImage] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [showExpertConsultation, setShowExpertConsultation] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  // Mock analysis results
  const mockAnalysisResults = {
    diseaseName: 'Brown Spot Disease',
    diseaseType: 'Fungal Infection',
    description: `Brown spot is a fungal disease that affects rice plants, particularly during the reproductive stage. It is caused by Bipolaris oryzae and can significantly reduce grain quality and yield if left untreated.\n\nThe disease typically appears as small, circular to oval brown spots on leaves, which can merge to form larger lesions. In severe cases, it can affect the panicles and grains, leading to poor grain filling and reduced quality.`,
    confidence: 87,
    severity: 'medium',
    affectedArea: 'Leaf blades and sheaths',
    spreadRate: 'Moderate (2-3 weeks)',
    stage: 'Early to moderate infection',
    indicators: [
      'Circular brown spots on leaves',
      'Yellow halos around lesions',
      'Lesion size 2-10mm diameter',
      'Spots concentrated on older leaves'
    ],
    immediateActions: [
      'Remove and destroy affected plant debris immediately',
      'Improve field drainage to reduce humidity',
      'Apply recommended fungicide spray within 24-48 hours',
      'Increase spacing between plants for better air circulation'
    ],
    recommendedProducts: [
      {
        name: 'Propiconazole 25% EC',
        type: 'Systemic Fungicide',
        price: '450',
        description: 'Effective against brown spot and other fungal diseases'
      },
      {
        name: 'Mancozeb 75% WP',
        type: 'Contact Fungicide',
        price: '320',
        description: 'Preventive fungicide for early-stage infections'
      }
    ],
    preventionTips: [
      'Use disease-resistant rice varieties when available',
      'Maintain proper field sanitation and remove crop residues',
      'Ensure balanced nutrition, especially potassium and silicon',
      'Avoid excessive nitrogen fertilization which increases susceptibility',
      'Practice crop rotation with non-host crops',
      'Monitor weather conditions and apply preventive sprays during humid periods'
    ],
    seasonalTips: [
      {
        season: 'Monsoon',
        icon: 'CloudRain',
        tip: 'Increase monitoring frequency'
      },
      {
        season: 'Post-Harvest',
        icon: 'Scissors',
        tip: 'Remove all crop residues'
      },
      {
        season: 'Pre-Planting',
        icon: 'Sprout',
        tip: 'Select resistant varieties'
      }
    ],
    similarCases: [
      {
        location: 'Rangpur District',
        description: 'Similar brown spot outbreak in Boro rice',
        timeAgo: '2 weeks ago'
      },
      {
        location: 'Mymensingh Region',
        description: 'Successful treatment with propiconazole',
        timeAgo: '1 month ago'
      }
    ]
  };

  // Simulate AI analysis process
  const simulateAnalysis = async () => {
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    
    // Simulate progress
    const progressInterval = setInterval(() => {
      setAnalysisProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    // Simulate analysis time
    setTimeout(() => {
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      setAnalysisResults(mockAnalysisResults);
      setIsAnalyzing(false);
      setCurrentStep('results');
    }, 3000);
  };

  const handleImageCapture = (file, cropType) => {
    setCapturedImage(file);
    setSelectedCrop(cropType);
    setImageUrl(URL.createObjectURL(file));
    setCurrentStep('preview');
  };

  const handleRetakePhoto = () => {
    setCapturedImage(null);
    setImageUrl('');
    setCurrentStep('camera');
  };

  const handleStartAnalysis = () => {
    setCurrentStep('analysis');
    simulateAnalysis();
  };

  const handleNewAnalysis = () => {
    setCapturedImage(null);
    setImageUrl('');
    setAnalysisResults(null);
    setCurrentStep('camera');
  };

  const handleShareWithExperts = () => {
    setShowExpertConsultation(true);
  };

  const handleSaveToHistory = () => {
    // Mock save to history
    console.log('Saving to history:', analysisResults);
    // Show success message or redirect
  };

  const handleViewHistoryResult = (record) => {
    // Mock loading historical result
    setAnalysisResults(record);
    setCurrentStep('results');
    setShowHistory(false);
  };

  const handleDeleteHistory = (recordId) => {
    // Mock delete from history
    console.log('Deleting record:', recordId);
  };

  const handleSubmitConsultation = async (consultationData) => {
    // Mock consultation submission
    console.log('Submitting consultation:', consultationData);
    setShowExpertConsultation(false);
    // Show success message
  };

  // Quick stats data
  const quickStats = [
    {
      label: 'Analyses Today',
      value: '12',
      icon: 'Brain',
      color: 'text-primary bg-primary/10'
    },
    {
      label: 'Diseases Detected',
      value: '8',
      icon: 'AlertTriangle',
      color: 'text-warning bg-warning/10'
    },
    {
      label: 'Success Rate',
      value: '94%',
      icon: 'CheckCircle',
      color: 'text-success bg-success/10'
    },
    {
      label: 'Expert Consultations',
      value: '3',
      icon: 'Users',
      color: 'text-accent bg-accent/10'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 heritage-pattern">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-organic flex items-center justify-center mr-4">
                  <Icon name="Microscope" size={32} className="text-primary-foreground" />
                </div>
                <div className="text-left">
                  <h1 className="text-3xl lg:text-4xl font-poppins font-bold text-foreground">
                    Disease Detection Lab
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    AI-powered crop disease analysis and treatment recommendations
                  </p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {quickStats?.map((stat, index) => (
                  <div key={index} className="bg-card rounded-organic p-4 shadow-natural hover-magnetic">
                    <div className={`w-10 h-10 rounded-organic flex items-center justify-center mx-auto mb-2 ${stat?.color}`}>
                      <Icon name={stat?.icon} size={20} />
                    </div>
                    <div className="text-2xl font-poppins font-bold text-foreground">{stat?.value}</div>
                    <p className="text-sm text-muted-foreground">{stat?.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center justify-center space-x-4 mb-8">
              <Button
                variant={!showHistory ? "default" : "outline"}
                onClick={() => setShowHistory(false)}
                iconName="Camera"
                iconPosition="left"
              >
                New Analysis
              </Button>
              
              <Button
                variant={showHistory ? "default" : "outline"}
                onClick={() => setShowHistory(true)}
                iconName="History"
                iconPosition="left"
              >
                History
              </Button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {showHistory ? (
            <DetectionHistory
              onViewResult={handleViewHistoryResult}
              onDeleteHistory={handleDeleteHistory}
            />
          ) : (
            <div className="space-y-8">
              {/* Analysis Flow */}
              {currentStep === 'camera' && (
                <CameraInterface
                  onImageCapture={handleImageCapture}
                  isAnalyzing={isAnalyzing}
                />
              )}

              {currentStep === 'preview' && capturedImage && (
                <ImagePreview
                  imageFile={capturedImage}
                  cropType={selectedCrop}
                  onRetake={handleRetakePhoto}
                  onAnalyze={handleStartAnalysis}
                  isAnalyzing={isAnalyzing}
                  analysisProgress={analysisProgress}
                />
              )}

              {(currentStep === 'analysis' || currentStep === 'results') && analysisResults && (
                <AnalysisResults
                  results={analysisResults}
                  imageUrl={imageUrl}
                  cropType={selectedCrop}
                  onNewAnalysis={handleNewAnalysis}
                  onShareWithExperts={handleShareWithExperts}
                  onSaveToHistory={handleSaveToHistory}
                />
              )}

              {/* Features Overview */}
              {currentStep === 'camera' && (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
                  <div className="bg-card rounded-organic p-6 shadow-natural hover-magnetic">
                    <div className="w-12 h-12 bg-success/10 rounded-organic flex items-center justify-center mb-4">
                      <Icon name="Brain" size={24} className="text-success" />
                    </div>
                    <h3 className="font-poppins font-semibold text-foreground mb-2">AI-Powered Analysis</h3>
                    <p className="text-muted-foreground text-sm">
                      Advanced machine learning models trained on thousands of crop disease images for accurate diagnosis.
                    </p>
                  </div>

                  <div className="bg-card rounded-organic p-6 shadow-natural hover-magnetic">
                    <div className="w-12 h-12 bg-primary/10 rounded-organic flex items-center justify-center mb-4">
                      <Icon name="Zap" size={24} className="text-primary" />
                    </div>
                    <h3 className="font-poppins font-semibold text-foreground mb-2">Instant Results</h3>
                    <p className="text-muted-foreground text-sm">
                      Get disease identification and treatment recommendations within seconds of image capture.
                    </p>
                  </div>

                  <div className="bg-card rounded-organic p-6 shadow-natural hover-magnetic">
                    <div className="w-12 h-12 bg-accent/10 rounded-organic flex items-center justify-center mb-4">
                      <Icon name="Users" size={24} className="text-accent" />
                    </div>
                    <h3 className="font-poppins font-semibold text-foreground mb-2">Expert Network</h3>
                    <p className="text-muted-foreground text-sm">
                      Connect with agricultural experts for personalized advice and follow-up consultations.
                    </p>
                  </div>

                  <div className="bg-card rounded-organic p-6 shadow-natural hover-magnetic">
                    <div className="w-12 h-12 bg-warning/10 rounded-organic flex items-center justify-center mb-4">
                      <Icon name="Shield" size={24} className="text-warning" />
                    </div>
                    <h3 className="font-poppins font-semibold text-foreground mb-2">Prevention Tips</h3>
                    <p className="text-muted-foreground text-sm">
                      Receive customized prevention strategies to protect your crops from future diseases.
                    </p>
                  </div>

                  <div className="bg-card rounded-organic p-6 shadow-natural hover-magnetic">
                    <div className="w-12 h-12 bg-secondary/10 rounded-organic flex items-center justify-center mb-4">
                      <Icon name="History" size={24} className="text-secondary" />
                    </div>
                    <h3 className="font-poppins font-semibold text-foreground mb-2">Analysis History</h3>
                    <p className="text-muted-foreground text-sm">
                      Track your crop health over time with detailed analysis history and outcomes.
                    </p>
                  </div>

                  <div className="bg-card rounded-organic p-6 shadow-natural hover-magnetic">
                    <div className="w-12 h-12 bg-success/10 rounded-organic flex items-center justify-center mb-4">
                      <Icon name="Smartphone" size={24} className="text-success" />
                    </div>
                    <h3 className="font-poppins font-semibold text-foreground mb-2">Offline Capable</h3>
                    <p className="text-muted-foreground text-sm">
                      Works without internet connection, syncing results when connectivity is restored.
                    </p>
                  </div>
                </div>
              )}

              {/* Quick Links */}
              {currentStep === 'camera' && (
                <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-organic p-6 mt-8">
                  <h3 className="font-poppins font-semibold text-foreground mb-4 text-center">
                    Explore More AgriSmart Features
                  </h3>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <Link
                      to="/farmer-dashboard"
                      className="flex items-center space-x-2 p-3 bg-card rounded-organic hover-magnetic transition-natural"
                    >
                      <Icon name="LayoutDashboard" size={18} className="text-primary" />
                      <span className="text-sm font-inter font-medium text-foreground">Dashboard</span>
                    </Link>
                    
                    <Link
                      to="/community-forums"
                      className="flex items-center space-x-2 p-3 bg-card rounded-organic hover-magnetic transition-natural"
                    >
                      <Icon name="Users" size={18} className="text-primary" />
                      <span className="text-sm font-inter font-medium text-foreground">Community</span>
                    </Link>
                    
                    <Link
                      to="/expert-network"
                      className="flex items-center space-x-2 p-3 bg-card rounded-organic hover-magnetic transition-natural"
                    >
                      <Icon name="GraduationCap" size={18} className="text-primary" />
                      <span className="text-sm font-inter font-medium text-foreground">Experts</span>
                    </Link>
                    
                    <Link
                      to="/knowledge-repository"
                      className="flex items-center space-x-2 p-3 bg-card rounded-organic hover-magnetic transition-natural"
                    >
                      <Icon name="BookOpen" size={18} className="text-primary" />
                      <span className="text-sm font-inter font-medium text-foreground">Knowledge</span>
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Expert Consultation Modal */}
        {showExpertConsultation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <ExpertConsultation
              analysisData={analysisResults}
              onSubmitConsultation={handleSubmitConsultation}
              onClose={() => setShowExpertConsultation(false)}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default DiseaseDetectionLab;
