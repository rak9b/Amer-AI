import React from 'react';
import Icon from '../../../components/AppIcon';

const CropStatusCard = () => {
  const crops = [
  {
    name: "Rice (Boro)",
    stage: "Flowering",
    health: 85,
    daysToHarvest: 45,
    area: "2.5 acres",
    status: "healthy",
    image: "https://images.unsplash.com/photo-1719284651584-6feb949b897a",
    imageAlt: "Green rice plants in flooded paddy field during flowering stage"
  },
  {
    name: "Potato",
    stage: "Tuber Formation",
    health: 92,
    daysToHarvest: 30,
    area: "1.2 acres",
    status: "excellent",
    image: "https://images.unsplash.com/photo-1688476410408-053196a05881",
    imageAlt: "Fresh potato plants with green leaves growing in dark soil"
  },
  {
    name: "Tomato",
    stage: "Fruit Development",
    health: 78,
    daysToHarvest: 20,
    area: "0.8 acres",
    status: "warning",
    image: "https://images.unsplash.com/photo-1622676539719-280635549b9f",
    imageAlt: "Red and green tomatoes growing on vine plants in greenhouse"
  }];


  const getHealthColor = (health) => {
    if (health >= 90) return 'text-success bg-success/10';
    if (health >= 75) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':return 'CheckCircle2';
      case 'healthy':return 'Circle';
      case 'warning':return 'AlertTriangle';
      default:return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-organic p-6 shadow-natural">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-poppins font-semibold text-lg text-foreground">Crop Status</h3>
        <Icon name="Leaf" size={20} className="text-primary" />
      </div>
      <div className="space-y-4">
        {crops?.map((crop, index) =>
        <div key={index} className="border border-border rounded-organic p-4 hover-magnetic">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 rounded-organic overflow-hidden">
                <img
                src={crop?.image}
                alt={crop?.imageAlt}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = '/assets/images/no_image.png';
                }} />

              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-poppins font-medium text-foreground">{crop?.name}</h4>
                  <Icon name={getStatusIcon(crop?.status)} size={16} className={getHealthColor(crop?.health)?.split(' ')?.[0]} />
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <span>Stage: {crop?.stage}</span>
                  <span>Area: {crop?.area}</span>
                  <span>Health: {crop?.health}%</span>
                  <span>Harvest: {crop?.daysToHarvest} days</span>
                </div>
                
                <div className="mt-2">
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                    className={`h-2 rounded-full ${getHealthColor(crop?.health)?.split(' ')?.[1]}`}
                    style={{ width: `${crop?.health}%` }} />

                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>);

};

export default CropStatusCard;