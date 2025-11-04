import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';
import Select from '../../../components/ui/Select';

const DetectionHistory = ({ onViewResult, onDeleteHistory }) => {
  const [filterCrop, setFilterCrop] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');
  const [sortBy, setSortBy] = useState('date');

  // Mock history data
  const historyData = [
  {
    id: 1,
    date: new Date('2025-11-01'),
    cropType: 'rice',
    cropName: 'Rice (ধান)',
    diseaseName: 'Brown Spot',
    severity: 'medium',
    confidence: 87,
    imageUrl: "https://images.unsplash.com/photo-1552530693-3714da94a961",
    imageAlt: 'Close-up of rice plant leaves showing brown spot disease symptoms with dark circular lesions',
    status: 'treated',
    outcome: 'Improved after treatment'
  },
  {
    id: 2,
    date: new Date('2025-10-28'),
    cropType: 'tomato',
    cropName: 'Tomato (টমেটো)',
    diseaseName: 'Late Blight',
    severity: 'high',
    confidence: 92,
    imageUrl: "https://images.unsplash.com/photo-1675406265301-35ca608ad2be",
    imageAlt: 'Tomato plant with late blight disease showing dark water-soaked lesions on leaves and stems',
    status: 'monitoring',
    outcome: 'Treatment in progress'
  },
  {
    id: 3,
    date: new Date('2025-10-25'),
    cropType: 'wheat',
    cropName: 'Wheat (গম)',
    diseaseName: 'Rust Disease',
    severity: 'low',
    confidence: 78,
    imageUrl: "https://images.unsplash.com/photo-1604231038499-d390df5e96f3",
    imageAlt: 'Wheat field showing early signs of rust disease with orange-brown pustules on leaf surfaces',
    status: 'resolved',
    outcome: 'Successfully treated'
  },
  {
    id: 4,
    date: new Date('2025-10-20'),
    cropType: 'potato',
    cropName: 'Potato (আলু)',
    diseaseName: 'Early Blight',
    severity: 'medium',
    confidence: 85,
    imageUrl: "https://images.unsplash.com/photo-1719047655569-53f798730d9a",
    imageAlt: 'Potato plant leaves displaying early blight symptoms with concentric ring patterns and yellowing',
    status: 'treated',
    outcome: 'Yield protected'
  },
  {
    id: 5,
    date: new Date('2025-10-15'),
    cropType: 'corn',
    cropName: 'Corn (ভুট্টা)',
    diseaseName: 'Leaf Spot',
    severity: 'low',
    confidence: 73,
    imageUrl: "https://images.unsplash.com/photo-1698494497591-17c382f91e90",
    imageAlt: 'Corn plant with leaf spot disease showing small circular brown spots scattered across green leaves',
    status: 'resolved',
    outcome: 'Natural recovery'
  }];


  const cropOptions = [
  { value: '', label: 'All Crops' },
  { value: 'rice', label: 'Rice (ধান)' },
  { value: 'wheat', label: 'Wheat (গম)' },
  { value: 'tomato', label: 'Tomato (টমেটো)' },
  { value: 'potato', label: 'Potato (আলু)' },
  { value: 'corn', label: 'Corn (ভুট্টা)' }];


  const severityOptions = [
  { value: '', label: 'All Severities' },
  { value: 'low', label: 'Low Risk' },
  { value: 'medium', label: 'Medium Risk' },
  { value: 'high', label: 'High Risk' }];


  const sortOptions = [
  { value: 'date', label: 'Most Recent' },
  { value: 'confidence', label: 'Highest Confidence' },
  { value: 'severity', label: 'Severity Level' }];


  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low':return 'text-success bg-success/10 border-success/20';
      case 'medium':return 'text-warning bg-warning/10 border-warning/20';
      case 'high':return 'text-error bg-error/10 border-error/20';
      default:return 'text-muted-foreground bg-muted/10 border-border';
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':return 'text-success bg-success/10';
      case 'treated':return 'text-primary bg-primary/10';
      case 'monitoring':return 'text-warning bg-warning/10';
      default:return 'text-muted-foreground bg-muted/10';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'resolved':return 'CheckCircle';
      case 'treated':return 'Pill';
      case 'monitoring':return 'Eye';
      default:return 'Clock';
    }
  };

  // Filter and sort data
  const filteredData = historyData?.filter((item) => {
    if (filterCrop && item?.cropType !== filterCrop) return false;
    if (filterSeverity && item?.severity !== filterSeverity) return false;
    return true;
  })?.sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return b?.date - a?.date;
      case 'confidence':
        return b?.confidence - a?.confidence;
      case 'severity':
        const severityOrder = { high: 3, medium: 2, low: 1 };
        return severityOrder?.[b?.severity] - severityOrder?.[a?.severity];
      default:
        return 0;
    }
  });

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-organic shadow-natural border border-border overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-border bg-gradient-to-r from-secondary/5 to-primary/5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-secondary rounded-organic flex items-center justify-center">
              <Icon name="History" size={20} className="text-white" />
            </div>
            <div>
              <h2 className="text-xl font-poppins font-semibold text-foreground">Detection History</h2>
              <p className="text-sm text-muted-foreground">Your past disease analyses</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="px-3 py-1 bg-primary/10 rounded-full">
              <span className="text-xs font-inter font-medium text-primary">
                {filteredData?.length} Records
              </span>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Select
            placeholder="Filter by crop"
            options={cropOptions}
            value={filterCrop}
            onChange={setFilterCrop} />

          
          <Select
            placeholder="Filter by severity"
            options={severityOptions}
            value={filterSeverity}
            onChange={setFilterSeverity} />

          
          <Select
            placeholder="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={setSortBy} />

        </div>
      </div>
      {/* History List */}
      <div className="p-6">
        {filteredData?.length === 0 ?
        <div className="text-center py-12">
            <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="History" size={32} className="text-muted-foreground" />
            </div>
            <h3 className="font-poppins font-medium text-foreground mb-2">No Records Found</h3>
            <p className="text-muted-foreground mb-6">
              {filterCrop || filterSeverity ? 'Try adjusting your filters' : 'Start analyzing crops to build your history'}
            </p>
            {(filterCrop || filterSeverity) &&
          <Button
            variant="outline"
            onClick={() => {
              setFilterCrop('');
              setFilterSeverity('');
            }}
            iconName="X"
            iconPosition="left">

                Clear Filters
              </Button>
          }
          </div> :

        <div className="space-y-4">
            {filteredData?.map((record) =>
          <div key={record?.id} className="border border-border rounded-organic p-4 hover-magnetic transition-natural">
                <div className="flex items-start space-x-4">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <Image
                  src={record?.imageUrl}
                  alt={record?.imageAlt}
                  className="w-16 h-16 object-cover rounded-organic" />

                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-poppins font-medium text-foreground">{record?.diseaseName}</h3>
                        <p className="text-sm text-muted-foreground">{record?.cropName}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className={`px-2 py-1 rounded-full border text-xs font-medium ${getSeverityColor(record?.severity)}`}>
                          {record?.severity} risk
                        </div>
                        <span className="text-sm font-medium text-foreground">{record?.confidence}%</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={14} className="text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">{formatDate(record?.date)}</span>
                        </div>
                        
                        <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${getStatusColor(record?.status)}`}>
                          <Icon name={getStatusIcon(record?.status)} size={12} />
                          <span className="text-xs font-medium capitalize">{record?.status}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewResult(record)}
                      iconName="Eye"
                      iconSize={14}>

                          View
                        </Button>
                        
                        <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDeleteHistory(record?.id)}
                      iconName="Trash2"
                      iconSize={14}
                      className="text-error hover:text-error">

                          Delete
                        </Button>
                      </div>
                    </div>

                    {record?.outcome &&
                <div className="mt-2 p-2 bg-muted/30 rounded-organic-sm">
                        <p className="text-xs text-muted-foreground">
                          <strong>Outcome:</strong> {record?.outcome}
                        </p>
                      </div>
                }
                  </div>
                </div>
              </div>
          )}
          </div>
        }
      </div>
      {/* Summary Stats */}
      {filteredData?.length > 0 &&
      <div className="p-6 border-t border-border bg-muted/30">
          <h3 className="font-poppins font-medium text-foreground mb-4">Summary Statistics</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-poppins font-bold text-primary">
                {filteredData?.filter((r) => r?.status === 'resolved')?.length}
              </div>
              <p className="text-sm text-muted-foreground">Resolved</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-poppins font-bold text-warning">
                {filteredData?.filter((r) => r?.status === 'monitoring')?.length}
              </div>
              <p className="text-sm text-muted-foreground">Monitoring</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-poppins font-bold text-success">
                {Math.round(filteredData?.reduce((acc, r) => acc + r?.confidence, 0) / filteredData?.length)}%
              </div>
              <p className="text-sm text-muted-foreground">Avg Confidence</p>
            </div>
            
            <div className="text-center">
              <div className="text-2xl font-poppins font-bold text-secondary">
                {filteredData?.filter((r) => r?.severity === 'high')?.length}
              </div>
              <p className="text-sm text-muted-foreground">High Risk</p>
            </div>
          </div>
        </div>
      }
    </div>);

};

export default DetectionHistory;