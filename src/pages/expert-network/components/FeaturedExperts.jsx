import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FeaturedExperts = ({ experts, onViewProfile, onBookConsultation }) => {
  return (
    <div className="bg-card border border-border rounded-organic p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-poppins font-semibold text-xl text-foreground">Featured Experts</h3>
          <p className="text-sm text-muted-foreground">Top-rated agricultural specialists</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="ArrowRight"
          iconPosition="right"
          iconSize={14}
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experts?.map((expert) => (
          <div
            key={expert?.id}
            className="bg-background border border-border rounded-organic p-4 hover-magnetic shadow-natural-lg"
          >
            <div className="text-center">
              <div className="relative inline-block mb-4">
                <Image
                  src={expert?.avatar}
                  alt={expert?.avatarAlt}
                  className="w-20 h-20 rounded-full object-cover mx-auto"
                />
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center border-2 border-background">
                  <Icon name="CheckCircle" size={14} className="text-white" />
                </div>
              </div>
              
              <h4 className="font-poppins font-semibold text-lg text-foreground">{expert?.name}</h4>
              <p className="text-sm text-muted-foreground mb-1">{expert?.title}</p>
              <p className="text-xs text-primary font-medium mb-3">{expert?.specialization}</p>
              
              <div className="flex items-center justify-center space-x-1 mb-3">
                <Icon name="Star" size={16} className="text-warning fill-current" />
                <span className="text-sm font-medium">{expert?.rating}</span>
                <span className="text-xs text-muted-foreground">({expert?.reviewCount})</span>
              </div>
              
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground mb-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Users" size={12} />
                  <span>{expert?.farmersHelped}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} />
                  <span>{expert?.experience}y</span>
                </div>
              </div>
              
              <div className="text-center mb-4">
                <span className="text-sm text-muted-foreground">From </span>
                <span className="font-semibold text-primary">৳{expert?.consultationFee}</span>
                <span className="text-sm text-muted-foreground">/session</span>
              </div>
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => onViewProfile(expert)}
                  iconName="Eye"
                  iconPosition="left"
                  iconSize={14}
                >
                  Profile
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="flex-1"
                  onClick={() => onBookConsultation(expert)}
                  iconName="Calendar"
                  iconPosition="left"
                  iconSize={14}
                >
                  Book
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedExperts;