import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = () => {
  const achievements = [
    {
      id: 1,
      title: "Early Adopter",
      description: "First to try AI disease detection",
      icon: "Zap",
      earned: true,
      progress: 100,
      color: "bg-warning text-warning-foreground"
    },
    {
      id: 2,
      title: "Community Helper",
      description: "Answered 10 farmer questions",
      icon: "Heart",
      earned: true,
      progress: 100,
      color: "bg-error text-error-foreground"
    },
    {
      id: 3,
      title: "Harvest Master",
      description: "Achieved 95% crop success rate",
      icon: "Award",
      earned: false,
      progress: 85,
      color: "bg-success text-success-foreground"
    },
    {
      id: 4,
      title: "Knowledge Seeker",
      description: "Completed 5 learning modules",
      icon: "BookOpen",
      earned: false,
      progress: 60,
      color: "bg-primary text-primary-foreground"
    }
  ];

  return (
    <div className="bg-card rounded-organic p-6 shadow-natural">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-poppins font-semibold text-lg text-foreground">Achievements</h3>
        <Icon name="Star" size={20} className="text-warning" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        {achievements?.map((achievement) => (
          <div
            key={achievement?.id}
            className={`relative p-4 rounded-organic border transition-natural hover-magnetic ${
              achievement?.earned 
                ? 'border-primary/20 bg-primary/5' :'border-border bg-muted/30'
            }`}
          >
            {achievement?.earned && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} className="text-white" />
              </div>
            )}
            
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-3 rounded-organic flex items-center justify-center ${
                achievement?.earned ? achievement?.color : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={achievement?.icon} size={20} />
              </div>
              
              <h4 className={`font-poppins font-medium text-sm mb-1 ${
                achievement?.earned ? 'text-foreground' : 'text-muted-foreground'
              }`}>
                {achievement?.title}
              </h4>
              
              <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                {achievement?.description}
              </p>
              
              {!achievement?.earned && (
                <div className="space-y-1">
                  <div className="w-full bg-muted rounded-full h-1.5">
                    <div
                      className="bg-primary h-1.5 rounded-full transition-natural"
                      style={{ width: `${achievement?.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-muted-foreground">{achievement?.progress}%</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border text-center">
        <p className="text-sm text-muted-foreground mb-2">
          {achievements?.filter(a => a?.earned)?.length} of {achievements?.length} badges earned
        </p>
        <button className="text-sm text-primary hover:text-primary/80 transition-natural font-medium">
          View All Badges
        </button>
      </div>
    </div>
  );
};

export default AchievementBadges;