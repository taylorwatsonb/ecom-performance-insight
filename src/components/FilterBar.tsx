
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Calendar, ChevronDown, Filter, RefreshCw } from 'lucide-react';
import { filterOptions } from '@/lib/data';

interface FilterBarProps {
  className?: string;
  onFilterChange?: (filters: {
    dateRange: string;
    device: string;
    page: string;
  }) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ className, onFilterChange }) => {
  const [dateRange, setDateRange] = useState('30d');
  const [device, setDevice] = useState('all');
  const [page, setPage] = useState('all');
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (filter: string, value: string) => {
    switch (filter) {
      case 'dateRange':
        setDateRange(value);
        break;
      case 'device':
        setDevice(value);
        break;
      case 'page':
        setPage(value);
        break;
    }
    
    if (onFilterChange) {
      onFilterChange({
        dateRange: filter === 'dateRange' ? value : dateRange,
        device: filter === 'device' ? value : device,
        page: filter === 'page' ? value : page,
      });
    }
  };

  return (
    <div className={cn('w-full', className)}>
      {/* Mobile filter button */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 border rounded-lg bg-card text-card-foreground shadow-sm"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </button>
        
        {isOpen && (
          <div className="mt-2 p-4 border rounded-lg bg-card shadow-md space-y-4 animate-fade-in-up">
            {/* Date range */}
            <div>
              <label className="block text-sm font-medium mb-1">Date range</label>
              <select
                value={dateRange}
                onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                {filterOptions.dateRanges.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Device */}
            <div>
              <label className="block text-sm font-medium mb-1">Device</label>
              <select
                value={device}
                onChange={(e) => handleFilterChange('device', e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                {filterOptions.devices.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Page */}
            <div>
              <label className="block text-sm font-medium mb-1">Page</label>
              <select
                value={page}
                onChange={(e) => handleFilterChange('page', e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                {filterOptions.pages.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>
      
      {/* Desktop filters */}
      <div className="hidden md:flex items-center justify-between">
        <div className="flex items-center gap-4">
          {/* Date range filter */}
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <select
              value={dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm"
            >
              {filterOptions.dateRanges.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Device filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={device}
              onChange={(e) => handleFilterChange('device', e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm"
            >
              {filterOptions.devices.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Page filter */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Page:</span>
            <select
              value={page}
              onChange={(e) => handleFilterChange('page', e.target.value)}
              className="bg-transparent border-none focus:outline-none text-sm"
            >
              {filterOptions.pages.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <button className="flex items-center gap-1 text-sm text-primary hover:underline">
          <RefreshCw className="h-3 w-3" />
          <span>Refresh data</span>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
