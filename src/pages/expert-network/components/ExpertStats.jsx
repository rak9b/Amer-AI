import React from 'react';
import Icon from '../../../components/AppIcon';

const ExpertStats = ({ stats }) => {
  const statItems = [
    {
      icon: 'Users',
      label: 'Total Experts',
      value: stats?.totalExperts,
      change: '+12%',
      changeType: 'positive'
    },
    {
      icon: 'CheckCircle',
      label: 'Verified Experts',
      value: stats?.verifiedExperts,
      change: '+8%',
      changeType: 'positive'
    },
    {
      icon: 'Calendar',
      label: 'Consultations Today',
      value: stats?.consultationsToday,
      change: '+25%',
      changeType: 'positive'
    },
    {
      icon: 'Star',
      label: 'Avg Rating',
      value: stats?.averageRating,
      change: '+0.2',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statItems?.map((item, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-organic p-6 hover-magnetic shadow-natural"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-primary/10 rounded-organic flex items-center justify-center">
                <Icon name={item?.icon} size={24} className="text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item?.label}</p>
                <p className="text-2xl font-poppins font-bold text-foreground">{item?.value}</p>
              </div>
            </div>
            <div className={`flex items-center space-x-1 text-sm ${
              item?.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={item?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={16} 
              />
              <span>{item?.change}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpertStats;