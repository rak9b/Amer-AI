import React from 'react';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';


const FilterPanel = ({ isOpen, onClose, filters, onFilterChange }) => {
  const filterCategories = [
    {
      id: 'contentType',
      label: 'Content Type',
      options: [
        { value: 'guide', label: 'Farming Guides' },
        { value: 'article', label: 'Expert Articles' },
        { value: 'video', label: 'Video Tutorials' },
        { value: 'calculator', label: 'Calculators & Tools' },
        { value: 'calendar', label: 'Seasonal Calendars' }
      ]
    },
    {
      id: 'cropType',
      label: 'Crop Category',
      options: [
        { value: 'rice', label: 'Rice Cultivation' },
        { value: 'vegetables', label: 'Vegetables' },
        { value: 'fruits', label: 'Fruits & Orchards' },
        { value: 'spices', label: 'Spices & Herbs' },
        { value: 'cash-crops', label: 'Cash Crops' }
      ]
    },
    {
      id: 'difficulty',
      label: 'Experience Level',
      options: [
        { value: 'beginner', label: 'Beginner Friendly' },
        { value: 'intermediate', label: 'Intermediate' },
        { value: 'advanced', label: 'Advanced Techniques' }
      ]
    },
    {
      id: 'region',
      label: 'Regional Focus',
      options: [
        { value: 'dhaka', label: 'Dhaka Division' },
        { value: 'chittagong', label: 'Chittagong Division' },
        { value: 'sylhet', label: 'Sylhet Division' },
        { value: 'rajshahi', label: 'Rajshahi Division' },
        { value: 'khulna', label: 'Khulna Division' }
      ]
    }
  ];

  const handleFilterChange = (categoryId, optionValue, checked) => {
    onFilterChange(categoryId, optionValue, checked);
  };

  const clearAllFilters = () => {
    filterCategories?.forEach(category => {
      category?.options?.forEach(option => {
        onFilterChange(category?.id, option?.value, false);
      });
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:relative lg:inset-auto">
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black/50" onClick={onClose} />
      {/* Filter Panel */}
      <div className="fixed right-0 top-0 bottom-0 w-80 bg-background border-l border-border shadow-natural-lg lg:relative lg:w-full lg:shadow-none lg:border lg:rounded-organic overflow-y-auto">
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between">
            <h3 className="font-poppins font-semibold text-lg">Filters</h3>
            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-muted-foreground"
              >
                Clear All
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                iconName="X"
                iconSize={16}
                className="lg:hidden"
              />
            </div>
          </div>
        </div>

        <div className="p-4 space-y-6">
          {filterCategories?.map((category) => (
            <div key={category?.id}>
              <h4 className="font-poppins font-medium text-sm text-foreground mb-3">
                {category?.label}
              </h4>
              <div className="space-y-2">
                {category?.options?.map((option) => (
                  <Checkbox
                    key={option?.value}
                    label={option?.label}
                    checked={filters?.[category?.id]?.includes(option?.value) || false}
                    onChange={(e) => handleFilterChange(category?.id, option?.value, e?.target?.checked)}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;