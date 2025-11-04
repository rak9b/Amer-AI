import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExpertCategories = ({ categories, onCategorySelect, selectedCategory }) => {
  return (
    <div className="bg-card border border-border rounded-organic p-6">
      <div className="mb-6">
        <h3 className="font-poppins font-semibold text-xl text-foreground mb-2">Expert Categories</h3>
        <p className="text-sm text-muted-foreground">Find specialists by their area of expertise</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategorySelect(category?.id)}
            className={`p-4 rounded-organic border transition-natural hover-magnetic text-left ${
              selectedCategory === category?.id
                ? 'border-primary bg-primary/5 shadow-natural'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <div className="flex flex-col items-center text-center space-y-3">
              <div className={`w-12 h-12 rounded-organic flex items-center justify-center ${
                selectedCategory === category?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={category?.icon} size={24} />
              </div>
              
              <div>
                <h4 className="font-poppins font-medium text-sm text-foreground">{category?.name}</h4>
                <p className="text-xs text-muted-foreground mt-1">{category?.expertCount} experts</p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button
          variant="outline"
          onClick={() => onCategorySelect('all')}
          iconName="Grid3X3"
          iconPosition="left"
          iconSize={16}
        >
          View All Categories
        </Button>
      </div>
    </div>
  );
};

export default ExpertCategories;