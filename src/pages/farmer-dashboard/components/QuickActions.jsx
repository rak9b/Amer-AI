import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const actions = [
    {
      title: "Disease Detection",
      description: "Scan crop photos",
      icon: "Camera",
      path: "/disease-detection-lab",
      color: "bg-error/10 text-error border-error/20"
    },
    {
      title: "Ask Community",
      description: "Get farmer advice",
      icon: "MessageCircle",
      path: "/community-forums",
      color: "bg-primary/10 text-primary border-primary/20"
    },
    {
      title: "Expert Help",
      description: "Professional guidance",
      icon: "GraduationCap",
      path: "/expert-network",
      color: "bg-accent/10 text-accent border-accent/20"
    },
    {
      title: "Knowledge Base",
      description: "Learning resources",
      icon: "BookOpen",
      path: "/knowledge-repository",
      color: "bg-success/10 text-success border-success/20"
    }
  ];

  return (
    <div className="bg-card rounded-organic p-6 shadow-natural">
      <h3 className="font-poppins font-semibold text-lg text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-4">
        {actions?.map((action, index) => (
          <Link
            key={index}
            to={action?.path}
            className={`p-4 rounded-organic border transition-natural hover-magnetic ${action?.color}`}
          >
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="w-12 h-12 rounded-organic flex items-center justify-center bg-current/10">
                <Icon name={action?.icon} size={24} className="text-current" />
              </div>
              <div>
                <h4 className="font-poppins font-medium text-sm">{action?.title}</h4>
                <p className="text-xs opacity-75">{action?.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;