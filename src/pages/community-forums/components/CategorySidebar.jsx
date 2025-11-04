import React from 'react';
import Icon from '../../../components/AppIcon';

const CategorySidebar = ({ selectedCategory, onCategorySelect }) => {
  const categories = [
    {
      id: "all",
      name: "All Discussions",
      icon: "MessageSquare",
      count: 3247,
      color: "text-primary"
    },
    {
      id: "rice",
      name: "Rice Cultivation",
      icon: "Wheat",
      count: 892,
      color: "text-emerald-600"
    },
    {
      id: "vegetables",
      name: "Vegetable Farming",
      icon: "Carrot",
      count: 654,
      color: "text-orange-600"
    },
    {
      id: "fruits",
      name: "Fruit Orchards",
      icon: "Apple",
      count: 423,
      color: "text-red-600"
    },
    {
      id: "livestock",
      name: "Livestock & Poultry",
      icon: "Cow",
      count: 387,
      color: "text-amber-600"
    },
    {
      id: "pest-control",
      name: "Pest & Disease Control",
      icon: "Bug",
      count: 567,
      color: "text-red-500"
    },
    {
      id: "soil-health",
      name: "Soil Management",
      icon: "Mountain",
      count: 298,
      color: "text-yellow-700"
    },
    {
      id: "weather",
      name: "Weather & Climate",
      icon: "Cloud",
      count: 234,
      color: "text-blue-600"
    },
    {
      id: "market",
      name: "Market & Pricing",
      icon: "TrendingUp",
      count: 445,
      color: "text-green-600"
    },
    {
      id: "technology",
      name: "Farm Technology",
      icon: "Cpu",
      count: 189,
      color: "text-purple-600"
    },
    {
      id: "general",
      name: "General Discussion",
      icon: "MessageCircle",
      count: 678,
      color: "text-gray-600"
    }
  ];

  const regionalCategories = [
    {
      id: "dhaka",
      name: "Dhaka Division",
      icon: "MapPin",
      count: 1234,
      color: "text-blue-600"
    },
    {
      id: "chittagong",
      name: "Chittagong Division",
      icon: "MapPin",
      count: 987,
      color: "text-green-600"
    },
    {
      id: "rajshahi",
      name: "Rajshahi Division",
      icon: "MapPin",
      count: 756,
      color: "text-orange-600"
    },
    {
      id: "khulna",
      name: "Khulna Division",
      icon: "MapPin",
      count: 543,
      color: "text-purple-600"
    },
    {
      id: "sylhet",
      name: "Sylhet Division",
      icon: "MapPin",
      count: 432,
      color: "text-red-600"
    }
  ];

  return (
    <div className="bg-card border-r border-border h-full">
      <div className="p-6">
        {/* Crop Categories */}
        <div className="mb-8">
          <h3 className="font-poppins font-semibold text-primary mb-4 flex items-center">
            <Icon name="Sprout" size={18} className="mr-2" />
            Crop Categories
          </h3>
          <div className="space-y-1">
            {categories?.map((category) => (
              <button
                key={category?.id}
                onClick={() => onCategorySelect(category?.id)}
                className={`w-full flex items-center justify-between p-3 rounded-organic transition-natural hover-magnetic ${
                  selectedCategory === category?.id
                    ? 'bg-primary text-primary-foreground shadow-natural'
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center">
                  <Icon 
                    name={category?.icon} 
                    size={16} 
                    className={selectedCategory === category?.id ? 'text-primary-foreground' : category?.color}
                  />
                  <span className="ml-3 font-inter text-sm">{category?.name}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === category?.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {category?.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Regional Categories */}
        <div>
          <h3 className="font-poppins font-semibold text-primary mb-4 flex items-center">
            <Icon name="Map" size={18} className="mr-2" />
            Regional Forums
          </h3>
          <div className="space-y-1">
            {regionalCategories?.map((region) => (
              <button
                key={region?.id}
                onClick={() => onCategorySelect(region?.id)}
                className={`w-full flex items-center justify-between p-3 rounded-organic transition-natural hover-magnetic ${
                  selectedCategory === region?.id
                    ? 'bg-primary text-primary-foreground shadow-natural'
                    : 'hover:bg-muted'
                }`}
              >
                <div className="flex items-center">
                  <Icon 
                    name={region?.icon} 
                    size={16} 
                    className={selectedCategory === region?.id ? 'text-primary-foreground' : region?.color}
                  />
                  <span className="ml-3 font-inter text-sm">{region?.name}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  selectedCategory === region?.id
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {region?.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="mt-8 p-4 bg-muted rounded-organic">
          <h4 className="font-poppins font-medium text-primary mb-2 flex items-center">
            <Icon name="Shield" size={16} className="mr-2" />
            Community Guidelines
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Be respectful and helpful</li>
            <li>• Share accurate information</li>
            <li>• Use appropriate categories</li>
            <li>• No spam or self-promotion</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategorySidebar;
