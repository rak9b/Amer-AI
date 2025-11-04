import React from 'react';
import Button from '../../../components/ui/Button';


const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    {
      id: 'all',
      label: 'All Content',
      icon: 'Grid3X3',
      count: 1247
    },
    {
      id: 'guides',
      label: 'Farming Guides',
      icon: 'BookOpen',
      count: 342
    },
    {
      id: 'articles',
      label: 'Expert Articles',
      icon: 'FileText',
      count: 189
    },
    {
      id: 'videos',
      label: 'Video Tutorials',
      icon: 'Play',
      count: 156
    },
    {
      id: 'tools',
      label: 'Calculators & Tools',
      icon: 'Calculator',
      count: 45
    },
    {
      id: 'calendars',
      label: 'Seasonal Calendars',
      icon: 'Calendar',
      count: 28
    }
  ];

  return (
    <div className="bg-card border border-border rounded-organic p-4 shadow-natural">
      <div className="flex flex-wrap gap-2">
        {categories?.map((category) => (
          <Button
            key={category?.id}
            variant={activeCategory === category?.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category?.id)}
            iconName={category?.icon}
            iconPosition="left"
            iconSize={16}
            className="flex-shrink-0"
          >
            <span className="hidden sm:inline">{category?.label}</span>
            <span className="sm:hidden">{category?.label?.split(' ')?.[0]}</span>
            <span className="ml-1 text-xs opacity-75">({category?.count})</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryTabs;