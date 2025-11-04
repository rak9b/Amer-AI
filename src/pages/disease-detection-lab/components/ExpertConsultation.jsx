import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Image from '../../../components/AppImage';

const ExpertConsultation = ({ analysisData, onSubmitConsultation, onClose }) => {
  const [selectedExperts, setSelectedExperts] = useState([]);
  const [urgencyLevel, setUrgencyLevel] = useState('medium');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [shareLocation, setShareLocation] = useState(false);
  const [shareContact, setShareContact] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock expert data
  const availableExperts = [
  {
    id: 1,
    name: 'Dr. Rahman Ahmed',
    title: 'Plant Pathologist',
    specialization: 'Rice & Wheat Diseases',
    experience: '15 years',
    rating: 4.9,
    responseTime: '2-4 hours',
    consultationFee: 500,
    avatar: "https://images.unsplash.com/photo-1729162128021-f37dca3ff30d",
    avatarAlt: 'Professional headshot of Dr. Rahman Ahmed, middle-aged Bangladeshi man with glasses and white coat',
    languages: ['Bangla', 'English'],
    availability: 'online',
    expertise: ['Disease Diagnosis', 'Treatment Planning', 'Prevention Strategies']
  },
  {
    id: 2,
    name: 'Prof. Fatima Khatun',
    title: 'Agricultural Extension Officer',
    specialization: 'Vegetable Crops',
    experience: '12 years',
    rating: 4.8,
    responseTime: '1-3 hours',
    consultationFee: 400,
    avatar: "https://images.unsplash.com/photo-1680796043268-562f50a7c391",
    avatarAlt: 'Professional photo of Prof. Fatima Khatun, experienced female agricultural expert in traditional dress',
    languages: ['Bangla', 'English'],
    availability: 'online',
    expertise: ['Organic Farming', 'Pest Management', 'Soil Health']
  },
  {
    id: 3,
    name: 'Md. Karim Uddin',
    title: 'Senior Agronomist',
    specialization: 'Crop Protection',
    experience: '20 years',
    rating: 4.7,
    responseTime: '4-6 hours',
    consultationFee: 600,
    avatar: "https://images.unsplash.com/photo-1627475320102-d73fcb4eb427",
    avatarAlt: 'Portrait of Md. Karim Uddin, senior agronomist with traditional cap and farming background',
    languages: ['Bangla'],
    availability: 'busy',
    expertise: ['Disease Control', 'Chemical Applications', 'Field Management']
  }];


  const urgencyOptions = [
  { value: 'low', label: 'Low - General Advice', description: 'Response within 24 hours' },
  { value: 'medium', label: 'Medium - Timely Consultation', description: 'Response within 6 hours' },
  { value: 'high', label: 'High - Urgent Help Needed', description: 'Response within 2 hours' }];


  const getUrgencyColor = (level) => {
    switch (level) {
      case 'low':return 'text-success bg-success/10 border-success/20';
      case 'medium':return 'text-warning bg-warning/10 border-warning/20';
      case 'high':return 'text-error bg-error/10 border-error/20';
      default:return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getAvailabilityColor = (status) => {
    switch (status) {
      case 'online':return 'text-success bg-success';
      case 'busy':return 'text-warning bg-warning';
      case 'offline':return 'text-error bg-error';
      default:return 'text-muted-foreground bg-muted-foreground';
    }
  };

  const handleExpertSelection = (expertId) => {
    setSelectedExperts((prev) =>
    prev?.includes(expertId) ?
    prev?.filter((id) => id !== expertId) :
    [...prev, expertId]
    );
  };

  const handleSubmit = async () => {
    if (selectedExperts?.length === 0) return;

    setIsSubmitting(true);

    const consultationData = {
      analysisData,
      selectedExperts,
      urgencyLevel,
      additionalNotes,
      shareLocation,
      shareContact,
      timestamp: new Date()?.toISOString()
    };

    try {
      await onSubmitConsultation(consultationData);
    } catch (error) {
      console.error('Error submitting consultation:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalFee = selectedExperts?.reduce((total, expertId) => {
    const expert = availableExperts?.find((e) => e?.id === expertId);
    return total + (expert?.consultationFee || 0);
  }, 0);

  return (
    <div className="bg-card rounded-organic shadow-natural border border-border overflow-hidden max-w-4xl mx-auto">
      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-accent/5 to-primary/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent rounded-organic flex items-center justify-center">
              <Icon name="Users" size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-poppins font-semibold text-foreground">Expert Consultation</h2>
              <p className="text-sm text-muted-foreground">Get professional advice from agricultural experts</p>
            </div>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20} />

        </div>

        {/* Analysis Summary */}
        {analysisData &&
        <div className="bg-white/50 rounded-organic p-4">
            <h3 className="font-inter font-medium text-foreground mb-2">Sharing Analysis Results:</h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Disease: <strong>{analysisData?.diseaseName}</strong></span>
              <span className="text-sm text-muted-foreground">Crop: <strong>{analysisData?.cropType}</strong></span>
              <span className="text-sm text-muted-foreground">Confidence: <strong>{analysisData?.confidence}%</strong></span>
            </div>
          </div>
        }
      </div>
      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Urgency Level */}
        <div>
          <h3 className="font-poppins font-medium text-foreground mb-4">Consultation Urgency</h3>
          <Select
            options={urgencyOptions}
            value={urgencyLevel}
            onChange={setUrgencyLevel}
            placeholder="Select urgency level" />

          
          <div className={`mt-2 p-3 rounded-organic border ${getUrgencyColor(urgencyLevel)}`}>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} />
              <span className="text-sm font-medium">
                {urgencyOptions?.find((opt) => opt?.value === urgencyLevel)?.description}
              </span>
            </div>
          </div>
        </div>

        {/* Expert Selection */}
        <div>
          <h3 className="font-poppins font-medium text-foreground mb-4">Select Experts</h3>
          <div className="space-y-4">
            {availableExperts?.map((expert) =>
            <div
              key={expert?.id}
              className={`border rounded-organic p-4 cursor-pointer transition-natural hover-magnetic ${
              selectedExperts?.includes(expert?.id) ?
              'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`
              }
              onClick={() => handleExpertSelection(expert?.id)}>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <Image
                      src={expert?.avatar}
                      alt={expert?.avatarAlt}
                      className="w-16 h-16 object-cover rounded-full" />

                      <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getAvailabilityColor(expert?.availability)}`}></div>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-poppins font-medium text-foreground">{expert?.name}</h4>
                        <p className="text-sm text-muted-foreground">{expert?.title}</p>
                        <p className="text-sm text-primary">{expert?.specialization}</p>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center space-x-1 mb-1">
                          <Icon name="Star" size={14} className="text-warning fill-current" />
                          <span className="text-sm font-medium text-foreground">{expert?.rating}</span>
                        </div>
                        <p className="text-sm font-bold text-primary">৳{expert?.consultationFee}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <span className="text-xs text-muted-foreground">Experience:</span>
                        <p className="text-sm text-foreground">{expert?.experience}</p>
                      </div>
                      <div>
                        <span className="text-xs text-muted-foreground">Response Time:</span>
                        <p className="text-sm text-foreground">{expert?.responseTime}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-1">
                        {expert?.expertise?.slice(0, 2)?.map((skill, index) =>
                      <span key={index} className="px-2 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground">
                            {skill}
                          </span>
                      )}
                        {expert?.expertise?.length > 2 &&
                      <span className="px-2 py-1 bg-muted/50 rounded-full text-xs text-muted-foreground">
                            +{expert?.expertise?.length - 2} more
                          </span>
                      }
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {expert?.languages?.map((lang, index) =>
                      <span key={index} className="text-xs text-muted-foreground">{lang}</span>
                      )}
                      </div>
                    </div>
                  </div>

                  <div className="flex-shrink-0">
                    <Checkbox
                    checked={selectedExperts?.includes(expert?.id)}
                    onChange={() => handleExpertSelection(expert?.id)} />

                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div>
          <h3 className="font-poppins font-medium text-foreground mb-4">Additional Information</h3>
          <Input
            label="Additional Notes (Optional)"
            type="text"
            placeholder="Describe your specific concerns or questions..."
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e?.target?.value)}
            description="Provide any additional context that might help the experts" />

        </div>

        {/* Privacy Options */}
        <div>
          <h3 className="font-poppins font-medium text-foreground mb-4">Privacy & Sharing</h3>
          <div className="space-y-3">
            <Checkbox
              label="Share my location with experts"
              description="Helps experts provide region-specific advice"
              checked={shareLocation}
              onChange={(e) => setShareLocation(e?.target?.checked)} />

            
            <Checkbox
              label="Share my contact information"
              description="Allows experts to follow up directly if needed"
              checked={shareContact}
              onChange={(e) => setShareContact(e?.target?.checked)} />

          </div>
        </div>

        {/* Cost Summary */}
        {selectedExperts?.length > 0 &&
        <div className="bg-muted/50 rounded-organic p-4">
            <h3 className="font-poppins font-medium text-foreground mb-3">Consultation Summary</h3>
            <div className="space-y-2">
              {selectedExperts?.map((expertId) => {
              const expert = availableExperts?.find((e) => e?.id === expertId);
              return (
                <div key={expertId} className="flex items-center justify-between">
                    <span className="text-sm text-foreground">{expert?.name}</span>
                    <span className="text-sm font-medium text-foreground">৳{expert?.consultationFee}</span>
                  </div>);

            })}
              <div className="border-t border-border pt-2 mt-2">
                <div className="flex items-center justify-between">
                  <span className="font-inter font-medium text-foreground">Total Cost:</span>
                  <span className="text-lg font-poppins font-bold text-primary">৳{totalFee}</span>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
      {/* Footer */}
      <div className="p-6 border-t border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {selectedExperts?.length === 0 ?
            'Select at least one expert to proceed' :

            `${selectedExperts?.length} expert${selectedExperts?.length > 1 ? 's' : ''} selected`
            }
          </div>
          
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              onClick={onClose}>

              Cancel
            </Button>
            
            <Button
              onClick={handleSubmit}
              disabled={selectedExperts?.length === 0 || isSubmitting}
              loading={isSubmitting}
              iconName="Send"
              iconPosition="left"
              className="ai-pulse">

              Submit Consultation
            </Button>
          </div>
        </div>
      </div>
    </div>);

};

export default ExpertConsultation;