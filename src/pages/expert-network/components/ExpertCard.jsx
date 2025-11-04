import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExpertCard = ({ expert, onViewProfile, onBookConsultation }) => {
  return (
    <div className="bg-card border border-border rounded-organic p-6 hover-magnetic shadow-natural">
      <div className="flex items-start space-x-4">
        <div className="relative">
          <Image
            src={expert?.avatar}
            alt={expert?.avatarAlt}
            className="w-16 h-16 rounded-full object-cover"
          />
          {expert?.isVerified && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-background">
              <Icon name="CheckCircle" size={14} className="text-white" />
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-poppins font-semibold text-lg text-foreground">{expert?.name}</h3>
              <p className="text-sm text-muted-foreground">{expert?.title}</p>
              <p className="text-xs text-primary font-medium">{expert?.specialization}</p>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={16} className="text-warning fill-current" />
              <span className="text-sm font-medium">{expert?.rating}</span>
              <span className="text-xs text-muted-foreground">({expert?.reviewCount})</span>
            </div>
          </div>
          
          <div className="mt-3 flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="MapPin" size={14} />
              <span>{expert?.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{expert?.farmersHelped} farmers helped</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{expert?.experience} years</span>
            </div>
          </div>
          
          <div className="mt-3 flex flex-wrap gap-2">
            {expert?.expertise?.slice(0, 3)?.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-muted text-xs font-medium rounded-organic-sm"
              >
                {skill}
              </span>
            ))}
            {expert?.expertise?.length > 3 && (
              <span className="px-2 py-1 text-xs text-muted-foreground">
                +{expert?.expertise?.length - 3} more
              </span>
            )}
          </div>
          
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm">
              <span className="text-muted-foreground">From </span>
              <span className="font-semibold text-primary">৳{expert?.consultationFee}</span>
              <span className="text-muted-foreground">/session</span>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewProfile(expert)}
                iconName="Eye"
                iconPosition="left"
                iconSize={14}
              >
                View Profile
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => onBookConsultation(expert)}
                iconName="Calendar"
                iconPosition="left"
                iconSize={14}
              >
                Book Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertCard;