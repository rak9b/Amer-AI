import React, { useState, useRef, useCallback } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const CameraInterface = ({ onImageCapture, isAnalyzing }) => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [captureMode, setCaptureMode] = useState('camera'); // camera or upload
  const [showGuidance, setShowGuidance] = useState(true);
  const fileInputRef = useRef(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const cropOptions = [
    { value: 'rice', label: 'Rice (ধান)', description: 'Paddy crops and rice plants' },
    { value: 'wheat', label: 'Wheat (গম)', description: 'Wheat crops and grains' },
    { value: 'jute', label: 'Jute (পাট)', description: 'Jute fiber crops' },
    { value: 'potato', label: 'Potato (আলু)', description: 'Potato and tuber crops' },
    { value: 'tomato', label: 'Tomato (টমেটো)', description: 'Tomato and vegetable crops' },
    { value: 'corn', label: 'Corn (ভুট্টা)', description: 'Maize and corn crops' },
    { value: 'sugarcane', label: 'Sugarcane (আখ)', description: 'Sugar cane crops' },
    { value: 'cotton', label: 'Cotton (তুলা)', description: 'Cotton fiber crops' }
  ];

  const guidanceSteps = [
    {
      icon: 'Camera',
      title: 'Good Lighting',
      description: 'Ensure adequate natural light or use flash'
    },
    {
      icon: 'Focus',
      title: 'Clear Focus',
      description: 'Keep the diseased area in sharp focus'
    },
    {
      icon: 'Maximize2',
      title: 'Close-up Shot',
      description: 'Fill the frame with the affected plant part'
    },
    {
      icon: 'RotateCcw',
      title: 'Multiple Angles',
      description: 'Take 2-3 photos from different angles'
    }
  ];

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices?.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      if (videoRef?.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsCameraActive(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      setCaptureMode('upload');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream?.getTracks()?.forEach(track => track?.stop());
      setStream(null);
      setIsCameraActive(false);
    }
  }, [stream]);

  const capturePhoto = useCallback(() => {
    if (!videoRef?.current || !canvasRef?.current || !selectedCrop) return;

    const video = videoRef?.current;
    const canvas = canvasRef?.current;
    const context = canvas?.getContext('2d');

    canvas.width = video?.videoWidth;
    canvas.height = video?.videoHeight;
    context?.drawImage(video, 0, 0);

    canvas?.toBlob((blob) => {
      const file = new File([blob], `crop-disease-${Date.now()}.jpg`, {
        type: 'image/jpeg'
      });
      
      onImageCapture(file, selectedCrop);
      stopCamera();
    }, 'image/jpeg', 0.8);
  }, [selectedCrop, onImageCapture, stopCamera]);

  const handleFileUpload = (event) => {
    const file = event?.target?.files?.[0];
    if (file && selectedCrop) {
      onImageCapture(file, selectedCrop);
    }
  };

  const handleModeChange = (mode) => {
    setCaptureMode(mode);
    if (mode === 'camera') {
      startCamera();
    } else {
      stopCamera();
    }
  };

  return (
    <div className="bg-card rounded-organic shadow-natural border border-border overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-primary/5 to-secondary/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-organic flex items-center justify-center">
              <Icon name="Camera" size={20} className="text-primary-foreground" />
            </div>
            <div>
              <h2 className="text-xl font-poppins font-semibold text-foreground">Disease Detection Camera</h2>
              <p className="text-sm text-muted-foreground">AI-powered crop analysis</p>
            </div>
          </div>
          
          {showGuidance && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowGuidance(false)}
              iconName="X"
              iconSize={16}
            >
              Hide Tips
            </Button>
          )}
        </div>

        {/* Crop Selection */}
        <div className="mb-4">
          <Select
            label="Select Crop Type"
            placeholder="Choose the crop you want to analyze"
            options={cropOptions}
            value={selectedCrop}
            onChange={setSelectedCrop}
            required
            searchable
            className="mb-4"
          />
        </div>

        {/* Capture Mode Toggle */}
        <div className="flex items-center space-x-2 bg-muted rounded-organic p-1">
          <Button
            variant={captureMode === 'camera' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleModeChange('camera')}
            iconName="Camera"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            Camera
          </Button>
          <Button
            variant={captureMode === 'upload' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => handleModeChange('upload')}
            iconName="Upload"
            iconPosition="left"
            iconSize={16}
            className="flex-1"
          >
            Upload
          </Button>
        </div>
      </div>
      {/* Guidance Section */}
      {showGuidance && (
        <div className="p-6 bg-muted/50 border-b border-border">
          <h3 className="font-poppins font-medium text-foreground mb-4 flex items-center">
            <Icon name="Lightbulb" size={18} className="mr-2 text-warning" />
            Photography Tips for Better Results
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {guidanceSteps?.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-organic flex items-center justify-center mx-auto mb-2">
                  <Icon name={step?.icon} size={20} className="text-primary" />
                </div>
                <h4 className="font-inter font-medium text-sm text-foreground mb-1">{step?.title}</h4>
                <p className="text-xs text-muted-foreground">{step?.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Camera/Upload Interface */}
      <div className="p-6">
        {captureMode === 'camera' ? (
          <div className="space-y-4">
            {!isCameraActive ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Camera" size={32} className="text-primary" />
                </div>
                <h3 className="font-poppins font-medium text-foreground mb-2">Start Camera</h3>
                <p className="text-muted-foreground mb-6">Allow camera access to begin disease detection</p>
                <Button
                  onClick={startCamera}
                  disabled={!selectedCrop || isAnalyzing}
                  iconName="Camera"
                  iconPosition="left"
                >
                  {!selectedCrop ? 'Select Crop First' : 'Start Camera'}
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative bg-black rounded-organic overflow-hidden">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-80 object-cover"
                  />
                  <canvas ref={canvasRef} className="hidden" />
                  
                  {/* Camera Overlay */}
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-4 border-2 border-white/50 rounded-organic"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 border-2 border-white rounded-full"></div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    onClick={stopCamera}
                    iconName="X"
                    iconSize={18}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={capturePhoto}
                    disabled={!selectedCrop || isAnalyzing}
                    loading={isAnalyzing}
                    iconName="Camera"
                    iconPosition="left"
                    size="lg"
                    className="ai-pulse"
                  >
                    Capture Photo
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Upload" size={32} className="text-secondary" />
            </div>
            <h3 className="font-poppins font-medium text-foreground mb-2">Upload Photo</h3>
            <p className="text-muted-foreground mb-6">Select a clear photo of the diseased crop</p>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
            
            <Button
              onClick={() => fileInputRef?.current?.click()}
              disabled={!selectedCrop || isAnalyzing}
              loading={isAnalyzing}
              iconName="Upload"
              iconPosition="left"
            >
              {!selectedCrop ? 'Select Crop First' : 'Choose Photo'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraInterface;