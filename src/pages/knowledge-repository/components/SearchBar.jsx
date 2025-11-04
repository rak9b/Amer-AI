import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const SearchBar = ({ onSearch, onFilterToggle, activeFilters = 0 }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e?.preventDefault();
    onSearch(searchQuery);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e?.target?.value);
    if (e?.target?.value === '') {
      onSearch('');
    }
  };

  return (
    <div className="bg-card border border-border rounded-organic p-4 shadow-natural">
      <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search farming guides, articles, tutorials..."
            value={searchQuery}
            onChange={handleInputChange}
            className="w-full"
          />
        </div>
        
        <div className="flex gap-2">
          <Button
            type="submit"
            variant="default"
            iconName="Search"
            iconPosition="left"
            className="px-6"
          >
            Search
          </Button>
          
          <Button
            type="button"
            variant="outline"
            iconName="Filter"
            iconPosition="left"
            onClick={onFilterToggle}
            className="relative"
          >
            Filters
            {activeFilters > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-accent text-accent-foreground text-xs rounded-full flex items-center justify-center">
                {activeFilters}
              </span>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;