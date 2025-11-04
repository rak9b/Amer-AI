import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ForumHeader = ({ onCreatePost, onSearch, onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const categoryOptions = [
    { value: "", label: "All Categories" },
    { value: "rice", label: "Rice Cultivation" },
    { value: "vegetables", label: "Vegetable Farming" },
    { value: "fruits", label: "Fruit Orchards" },
    { value: "livestock", label: "Livestock & Poultry" },
    { value: "pest-control", label: "Pest & Disease Control" },
    { value: "soil-health", label: "Soil Management" },
    { value: "weather", label: "Weather & Climate" },
    { value: "market", label: "Market & Pricing" },
    { value: "technology", label: "Farm Technology" },
    { value: "general", label: "General Discussion" }
  ];

  const handleSearch = (e) => {
    const value = e?.target?.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    onFilterChange({ category: value });
  };

  return (
    <div className="bg-card border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header Title */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
          <div className="heritage-pattern mb-4 lg:mb-0">
            <h1 className="text-3xl font-poppins font-bold text-primary mb-2">
              Community Forums
            </h1>
            <p className="text-muted-foreground">
              Connect with fellow farmers, share knowledge, and grow together
            </p>
          </div>
          
          <Button
            variant="default"
            onClick={onCreatePost}
            iconName="Plus"
            iconPosition="left"
            className="hover-magnetic ai-pulse"
          >
            Create New Post
          </Button>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search discussions, questions, or topics..."
              value={searchQuery}
              onChange={handleSearch}
              className="w-full"
            />
          </div>
          
          <div className="w-full md:w-64">
            <Select
              placeholder="Filter by category"
              options={categoryOptions}
              value={selectedCategory}
              onChange={handleCategoryChange}
              searchable
            />
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-muted rounded-organic p-4 text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full mx-auto mb-2">
              <Icon name="Users" size={20} className="text-primary" />
            </div>
            <p className="text-2xl font-poppins font-bold text-primary">12.5K</p>
            <p className="text-sm text-muted-foreground">Active Members</p>
          </div>
          
          <div className="bg-muted rounded-organic p-4 text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-full mx-auto mb-2">
              <Icon name="MessageSquare" size={20} className="text-accent" />
            </div>
            <p className="text-2xl font-poppins font-bold text-accent">3.2K</p>
            <p className="text-sm text-muted-foreground">Discussions</p>
          </div>
          
          <div className="bg-muted rounded-organic p-4 text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-full mx-auto mb-2">
              <Icon name="CheckCircle" size={20} className="text-success" />
            </div>
            <p className="text-2xl font-poppins font-bold text-success">8.7K</p>
            <p className="text-sm text-muted-foreground">Solved Problems</p>
          </div>
          
          <div className="bg-muted rounded-organic p-4 text-center">
            <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-full mx-auto mb-2">
              <Icon name="Award" size={20} className="text-secondary" />
            </div>
            <p className="text-2xl font-poppins font-bold text-secondary">450</p>
            <p className="text-sm text-muted-foreground">Expert Answers</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumHeader;