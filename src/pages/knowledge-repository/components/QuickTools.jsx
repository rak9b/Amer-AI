import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const QuickTools = ({ onToolSelect }) => {
  const tools = [
    {
      id: 'fertilizer-calculator',
      name: 'Fertilizer Calculator',
      description: 'Calculate optimal fertilizer amounts for your crops',
      icon: 'Calculator',
      color: 'bg-success',
      usage: '2.3k uses this month'
    },
    {
      id: 'planting-calendar',
      name: 'Planting Calendar',
      description: 'Find the best planting times for your region',
      icon: 'Calendar',
      color: 'bg-warning',
      usage: '1.8k uses this month'
    },
    {
      id: 'disease-identifier',
      name: 'Disease Identifier',
      description: 'Identify crop diseases using AI image analysis',
      icon: 'Microscope',
      color: 'bg-error',
      usage: '3.1k uses this month'
    },
    {
      id: 'yield-estimator',
      name: 'Yield Estimator',
      description: 'Estimate crop yields based on field conditions',
      icon: 'TrendingUp',
      color: 'bg-primary',
      usage: '1.2k uses this month'
    },
    {
      id: 'weather-advisor',
      name: 'Weather Advisor',
      description: 'Get farming advice based on weather forecasts',
      icon: 'CloudRain',
      color: 'bg-sky-blue',
      usage: '4.5k uses this month'
    },
    {
      id: 'cost-calculator',
      name: 'Cost Calculator',
      description: 'Calculate farming costs and profit margins',
      icon: 'DollarSign',
      color: 'bg-harvest-gold',
      usage: '987 uses this month'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-organic p-6 shadow-natural">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-poppins font-bold text-xl text-foreground">Quick Tools</h2>
          <p className="text-muted-foreground text-sm">Interactive farming calculators and utilities</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          onClick={() => onToolSelect('all')}
        >
          View All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools?.map((tool) => (
          <div
            key={tool?.id}
            className="group bg-muted/50 hover:bg-muted border border-border rounded-organic p-4 cursor-pointer transition-natural hover-magnetic"
            onClick={() => onToolSelect(tool?.id)}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 ${tool?.color} rounded-organic flex items-center justify-center flex-shrink-0`}>
                <Icon name={tool?.icon} size={20} className="text-white" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-poppins font-semibold text-sm mb-1 group-hover:text-primary transition-natural">
                  {tool?.name}
                </h3>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {tool?.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{tool?.usage}</span>
                  <Icon name="ArrowRight" size={12} className="text-muted-foreground group-hover:text-primary transition-natural" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickTools;