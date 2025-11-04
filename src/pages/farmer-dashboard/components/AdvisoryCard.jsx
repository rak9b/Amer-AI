import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AdvisoryCard = ({ advisory, onAction }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-error bg-error/10 border-error/20';
      case 'medium': return 'text-warning bg-warning/10 border-warning/20';
      case 'low': return 'text-success bg-success/10 border-success/20';
      default: return 'text-primary bg-primary/10 border-primary/20';
    }
  };

  const getIconForType = (type) => {
    switch (type) {
      case 'weather': return 'CloudRain';
      case 'pest': return 'Bug';
      case 'fertilizer': return 'Sprout';
      case 'harvest': return 'Wheat';
      case 'irrigation': return 'Droplets';
      default: return 'Info';
    }
  };

  return (
    <div className="bg-card border border-border rounded-organic p-4 shadow-natural hover-magnetic">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-organic flex items-center justify-center">
            <Icon name={getIconForType(advisory?.type)} size={20} className="text-primary" />
          </div>
          <div>
            <h4 className="font-poppins font-semibold text-foreground">{advisory?.title}</h4>
            <p className="text-xs text-muted-foreground">{advisory?.category}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-organic-sm text-xs font-medium border ${getPriorityColor(advisory?.priority)}`}>
          {advisory?.priority?.toUpperCase()}
        </span>
      </div>
      <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
        {advisory?.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 text-xs text-muted-foreground">
          <span className="flex items-center">
            <Icon name="Clock" size={12} className="mr-1" />
            {advisory?.timeAgo}
          </span>
          <span className="flex items-center">
            <Icon name="Target" size={12} className="mr-1" />
            {advisory?.crop}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onAction(advisory)}
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={14}
        >
          View Details
        </Button>
      </div>
    </div>
  );
};

export default AdvisoryCard;