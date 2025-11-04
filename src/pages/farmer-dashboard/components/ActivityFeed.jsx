import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: "achievement",
      title: "Harvest Goal Achieved!",
      description: "You\'ve successfully harvested 2.5 tons of rice this season",
      timestamp: "2 hours ago",
      icon: "Trophy",
      color: "text-warning bg-warning/10"
    },
    {
      id: 2,
      type: "community",
      title: "New Answer Received",
      description: "Expert Rahman answered your question about pest control",
      timestamp: "4 hours ago",
      icon: "MessageSquare",
      color: "text-primary bg-primary/10"
    },
    {
      id: 3,
      type: "weather",
      title: "Weather Alert",
      description: "Heavy rainfall expected tomorrow. Protect your crops",
      timestamp: "6 hours ago",
      icon: "CloudRain",
      color: "text-error bg-error/10"
    },
    {
      id: 4,
      type: "task",
      title: "Task Completed",
      description: "Fertilizer application for potato field marked as done",
      timestamp: "1 day ago",
      icon: "CheckCircle",
      color: "text-success bg-success/10"
    },
    {
      id: 5,
      type: "market",
      title: "Price Update",
      description: "Rice prices increased by 5% in your local market",
      timestamp: "1 day ago",
      icon: "TrendingUp",
      color: "text-accent bg-accent/10"
    }
  ];

  return (
    <div className="bg-card rounded-organic p-6 shadow-natural">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-poppins font-semibold text-lg text-foreground">Recent Activity</h3>
        <Icon name="Activity" size={20} className="text-primary" />
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3 p-3 rounded-organic hover:bg-muted/50 transition-natural">
            <div className={`w-10 h-10 rounded-organic flex items-center justify-center ${activity?.color}`}>
              <Icon name={activity?.icon} size={16} />
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-poppins font-medium text-sm text-foreground mb-1">
                {activity?.title}
              </h4>
              <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
                {activity?.description}
              </p>
              <span className="text-xs text-muted-foreground flex items-center">
                <Icon name="Clock" size={10} className="mr-1" />
                {activity?.timestamp}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-center text-sm text-primary hover:text-primary/80 transition-natural font-medium">
          View All Activities
        </button>
      </div>
    </div>
  );
};

export default ActivityFeed;