import React from 'react';
import Icon from '../../../components/AppIcon';

const ExpertCategories = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="bg-card rounded-organic p-6 shadow-natural">
      <h3 className="font-poppins font-semibold text-lg text-foreground mb-4">Expert Categories</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onSelectCategory(category?.id)}
            className={`flex flex-col items-center p-4 rounded-organic border transition-natural hover-magnetic ${
              selectedCategory === category?.id
                ? 'border-primary bg-primary/5 text-primary'
                : 'border-border bg-muted/30 text-muted-foreground hover:bg-muted/50'
            }`}
          >
            <div className="w-10 h-10 mb-2 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon name={category?.icon} size={20} className={selectedCategory === category?.id ? 'text-primary' : 'text-muted-foreground'} />
            </div>
            <h4 className="font-inter font-medium text-sm text-center mb-1">{category?.name}</h4>
            <p className="text-xs text-muted-foreground">{category?.expertCount} experts</p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExpertCategories;