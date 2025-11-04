import React from 'react';
import Icon from '../../../components/AppIcon';

const ExpertBadge = ({ expert, size = 'default' }) => {
  const sizeClasses = {
    small: {
      container: 'p-3',
      avatar: 'w-10 h-10',
      badge: 'w-5 h-5',
      badgeIcon: 12,
      name: 'text-sm',
      title: 'text-xs',
      stats: 'text-xs'
    },
    default: {
      container: 'p-4',
      avatar: 'w-12 h-12',
      badge: 'w-6 h-6',
      badgeIcon: 14,
      name: 'text-base',
      title: 'text-sm',
      stats: 'text-sm'
    },
    large: {
      container: 'p-6',
      avatar: 'w-16 h-16',
      badge: 'w-8 h-8',
      badgeIcon: 16,
      name: 'text-lg',
      title: 'text-base',
      stats: 'text-base'
    }
  };

  const classes = sizeClasses?.[size];

  const getExpertiseColor = (expertise) => {
    const colors = {
      'Crop Specialist': 'bg-green-100 text-green-800',
      'Soil Expert': 'bg-yellow-100 text-yellow-800',
      'Pest Control': 'bg-red-100 text-red-800',
      'Agricultural Engineer': 'bg-blue-100 text-blue-800',
      'Extension Officer': 'bg-purple-100 text-purple-800',
      'Veterinarian': 'bg-orange-100 text-orange-800'
    };
    return colors?.[expertise] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className={`bg-card border border-border rounded-organic shadow-natural hover:shadow-natural-lg transition-natural ${classes?.container}`}>
      <div className="flex items-start space-x-3">
        {/* Avatar with Badge */}
        <div className="relative flex-shrink-0">
          <img
            src={expert?.avatar}
            alt={expert?.avatarAlt}
            className={`${classes?.avatar} rounded-full object-cover`}
          />
          <div className={`absolute -bottom-1 -right-1 ${classes?.badge} bg-accent rounded-full flex items-center justify-center border-2 border-background`}>
            <Icon name="Award" size={classes?.badgeIcon} className="text-white" />
          </div>
        </div>

        {/* Expert Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className={`font-poppins font-semibold text-foreground ${classes?.name} truncate`}>
              {expert?.name}
            </h4>
            <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full flex-shrink-0">
              Expert
            </span>
          </div>

          <p className={`text-muted-foreground ${classes?.title} mb-2`}>
            {expert?.title}
          </p>

          {/* Expertise Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {expert?.expertise?.map((skill, index) => (
              <span
                key={index}
                className={`text-xs px-2 py-1 rounded-full ${getExpertiseColor(skill)}`}
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className={`grid grid-cols-3 gap-4 ${classes?.stats} text-muted-foreground`}>
            <div className="text-center">
              <div className="font-semibold text-foreground">{expert?.answersGiven}</div>
              <div>Answers</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">{expert?.helpfulVotes}</div>
              <div>Helpful</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-foreground">{expert?.reputation}</div>
              <div>Reputation</div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border">
            <Icon name="ShieldCheck" size={14} className="text-success" />
            <span className="text-xs text-success font-medium">
              Verified by AgriSmart Bangladesh
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertBadge;