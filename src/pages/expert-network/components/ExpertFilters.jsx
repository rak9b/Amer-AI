import React from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ExpertFilters = ({ 
  filters, 
  onFiltersChange, 
  onClearFilters, 
  searchQuery, 
  onSearchChange 
}) => {
  const specializationOptions = [
    { value: 'all', label: 'All Specializations' },
    { value: 'crop-diseases', label: 'Crop Diseases' },
    { value: 'soil-management', label: 'Soil Management' },
    { value: 'pest-control', label: 'Pest Control' },
    { value: 'irrigation', label: 'Irrigation Systems' },
    { value: 'organic-farming', label: 'Organic Farming' },
    { value: 'livestock', label: 'Livestock Management' },
    { value: 'agribusiness', label: 'Agribusiness' },
    { value: 'climate-adaptation', label: 'Climate Adaptation' }
  ];

  const locationOptions = [
    { value: 'all', label: 'All Locations' },
    { value: 'dhaka', label: 'Dhaka Division' },
    { value: 'chittagong', label: 'Chittagong Division' },
    { value: 'rajshahi', label: 'Rajshahi Division' },
    { value: 'khulna', label: 'Khulna Division' },
    { value: 'barisal', label: 'Barisal Division' },
    { value: 'sylhet', label: 'Sylhet Division' },
    { value: 'rangpur', label: 'Rangpur Division' },
    { value: 'mymensingh', label: 'Mymensingh Division' }
  ];

  const experienceOptions = [
    { value: 'all', label: 'Any Experience' },
    { value: '1-5', label: '1-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10-15', label: '10-15 years' },
    { value: '15+', label: '15+ years' }
  ];

  const priceRangeOptions = [
    { value: 'all', label: 'Any Price' },
    { value: '0-500', label: '৳0 - ৳500' },
    { value: '500-1000', label: '৳500 - ৳1,000' },
    { value: '1000-2000', label: '৳1,000 - ৳2,000' },
    { value: '2000+', label: '৳2,000+' }
  ];

  const availabilityOptions = [
    { value: 'all', label: 'Any Time' },
    { value: 'today', label: 'Available Today' },
    { value: 'this-week', label: 'This Week' },
    { value: 'next-week', label: 'Next Week' }
  ];

  return (
    <div className="bg-card border border-border rounded-organic p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-poppins font-semibold text-lg text-foreground">Filter Experts</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          iconName="X"
          iconPosition="left"
          iconSize={14}
        >
          Clear All
        </Button>
      </div>
      <div className="space-y-4">
        <Input
          type="search"
          placeholder="Search experts by name or expertise..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e?.target?.value)}
          className="w-full"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Select
            label="Specialization"
            options={specializationOptions}
            value={filters?.specialization}
            onChange={(value) => onFiltersChange({ ...filters, specialization: value })}
          />

          <Select
            label="Location"
            options={locationOptions}
            value={filters?.location}
            onChange={(value) => onFiltersChange({ ...filters, location: value })}
          />

          <Select
            label="Experience"
            options={experienceOptions}
            value={filters?.experience}
            onChange={(value) => onFiltersChange({ ...filters, experience: value })}
          />

          <Select
            label="Price Range"
            options={priceRangeOptions}
            value={filters?.priceRange}
            onChange={(value) => onFiltersChange({ ...filters, priceRange: value })}
          />

          <Select
            label="Availability"
            options={availabilityOptions}
            value={filters?.availability}
            onChange={(value) => onFiltersChange({ ...filters, availability: value })}
          />

          <div className="flex items-end">
            <Button
              variant="outline"
              className="w-full"
              iconName="Filter"
              iconPosition="left"
              iconSize={16}
            >
              Advanced Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertFilters;