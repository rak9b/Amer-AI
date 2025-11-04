import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyAlerts = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: "weather",
      severity: "high",
      title: "Severe Weather Warning",
      message: "Heavy rainfall and strong winds expected in the next 6 hours. Secure your crops and equipment immediately.",
      timestamp: "5 minutes ago",
      dismissed: false,
      actionRequired: true
    },
    {
      id: 2,
      type: "pest",
      severity: "medium",
      title: "Pest Outbreak Alert",
      message: "Brown planthopper detected in nearby rice fields. Inspect your crops and apply preventive measures.",
      timestamp: "2 hours ago",
      dismissed: false,
      actionRequired: true
    },
    {
      id: 3,
      type: "market",
      severity: "low",
      title: "Price Drop Notice",
      message: "Potato prices have dropped by 15% in local markets. Consider holding harvest if possible.",
      timestamp: "1 day ago",
      dismissed: false,
      actionRequired: false
    }
  ]);

  const dismissAlert = (alertId) => {
    setAlerts(alerts?.map(alert => 
      alert?.id === alertId ? { ...alert, dismissed: true } : alert
    ));
  };

  const getSeverityConfig = (severity) => {
    switch (severity) {
      case 'high':
        return {
          color: 'border-error bg-error/10 text-error',
          icon: 'AlertTriangle',
          bgClass: 'bg-error/5'
        };
      case 'medium':
        return {
          color: 'border-warning bg-warning/10 text-warning',
          icon: 'AlertCircle',
          bgClass: 'bg-warning/5'
        };
      case 'low':
        return {
          color: 'border-primary bg-primary/10 text-primary',
          icon: 'Info',
          bgClass: 'bg-primary/5'
        };
      default:
        return {
          color: 'border-muted bg-muted/10 text-muted-foreground',
          icon: 'Bell',
          bgClass: 'bg-muted/5'
        };
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'weather': return 'CloudRain';
      case 'pest': return 'Bug';
      case 'market': return 'TrendingDown';
      case 'disease': return 'Microscope';
      default: return 'Bell';
    }
  };

  const activeAlerts = alerts?.filter(alert => !alert?.dismissed);

  if (activeAlerts?.length === 0) {
    return (
      <div className="bg-card rounded-organic p-6 shadow-natural">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-poppins font-semibold text-lg text-foreground">Emergency Alerts</h3>
          <Icon name="Shield" size={20} className="text-success" />
        </div>
        <div className="text-center py-8">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-3" />
          <p className="text-muted-foreground">No active alerts. Your farm is secure!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card rounded-organic p-6 shadow-natural">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-poppins font-semibold text-lg text-foreground">Emergency Alerts</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-error font-medium">{activeAlerts?.length} Active</span>
          <Icon name="AlertTriangle" size={20} className="text-error" />
        </div>
      </div>
      <div className="space-y-4">
        {activeAlerts?.map((alert) => {
          const severityConfig = getSeverityConfig(alert?.severity);
          
          return (
            <div
              key={alert?.id}
              className={`border rounded-organic p-4 ${severityConfig?.color} ${severityConfig?.bgClass}`}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <Icon name={getTypeIcon(alert?.type)} size={20} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-poppins font-semibold text-sm">
                      {alert?.title}
                    </h4>
                    <button
                      onClick={() => dismissAlert(alert?.id)}
                      className="text-current hover:opacity-70 transition-natural"
                    >
                      <Icon name="X" size={16} />
                    </button>
                  </div>
                  
                  <p className="text-sm mb-3 opacity-90">
                    {alert?.message}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-75 flex items-center">
                      <Icon name="Clock" size={10} className="mr-1" />
                      {alert?.timestamp}
                    </span>
                    
                    {alert?.actionRequired && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-current text-current hover:bg-current/10"
                      >
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className="w-full"
          iconName="Settings"
          iconPosition="left"
          iconSize={14}
        >
          Alert Preferences
        </Button>
      </div>
    </div>
  );
};

export default EmergencyAlerts;