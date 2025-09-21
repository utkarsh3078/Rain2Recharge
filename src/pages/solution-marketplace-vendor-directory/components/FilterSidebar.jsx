import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFiltersChange, onClearFilters, isOpen, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const systemTypeOptions = [
    { value: 'rainwater-harvesting', label: 'Rainwater Harvesting' },
    { value: 'groundwater-recharge', label: 'Groundwater Recharge' },
    { value: 'greywater-recycling', label: 'Greywater Recycling' },
    { value: 'stormwater-management', label: 'Stormwater Management' },
    { value: 'water-storage', label: 'Water Storage Systems' }
  ];

  const serviceOptions = [
    { value: 'design', label: 'System Design' },
    { value: 'installation', label: 'Installation' },
    { value: 'maintenance', label: 'Maintenance' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'permits', label: 'Permit Assistance' }
  ];

  const certificationOptions = [
    { value: 'licensed-contractor', label: 'Licensed Contractor' },
    { value: 'water-efficiency', label: 'Water Efficiency Certified' },
    { value: 'green-building', label: 'Green Building Certified' },
    { value: 'manufacturer-certified', label: 'Manufacturer Certified' }
  ];

  const handleFilterChange = (key, value) => {
    const updatedFilters = { ...localFilters, [key]: value };
    setLocalFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const handleArrayFilterChange = (key, value, checked) => {
    const currentArray = localFilters?.[key] || [];
    let updatedArray;
    
    if (checked) {
      updatedArray = [...currentArray, value];
    } else {
      updatedArray = currentArray?.filter(item => item !== value);
    }
    
    handleFilterChange(key, updatedArray);
  };

  const handleClearAll = () => {
    const clearedFilters = {
      location: '',
      systemTypes: [],
      services: [],
      budgetMin: '',
      budgetMax: '',
      rating: '',
      availability: '',
      certifications: []
    };
    setLocalFilters(clearedFilters);
    onClearFilters();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-0
        w-80 bg-white border-r border-border
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-text-primary">Filters</h2>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearAll}
                className="text-text-secondary hover:text-text-primary"
              >
                Clear All
              </Button>
              <button
                onClick={onClose}
                className="lg:hidden p-2 rounded-lg hover:bg-hover transition-colors duration-200"
              >
                <Icon name="X" size={20} />
              </button>
            </div>
          </div>

          {/* Location */}
          <div className="mb-6">
            <Input
              label="Location"
              type="text"
              placeholder="Enter city or zip code"
              value={localFilters?.location}
              onChange={(e) => handleFilterChange('location', e?.target?.value)}
              className="mb-4"
            />
          </div>

          {/* System Types */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">System Types</h3>
            <div className="space-y-3">
              {systemTypeOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={localFilters?.systemTypes?.includes(option?.value) || false}
                  onChange={(e) => handleArrayFilterChange('systemTypes', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">Services Offered</h3>
            <div className="space-y-3">
              {serviceOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={localFilters?.services?.includes(option?.value) || false}
                  onChange={(e) => handleArrayFilterChange('services', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Budget Range */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">Budget Range</h3>
            <div className="grid grid-cols-2 gap-3">
              <Input
                type="number"
                placeholder="Min ($)"
                value={localFilters?.budgetMin}
                onChange={(e) => handleFilterChange('budgetMin', e?.target?.value)}
              />
              <Input
                type="number"
                placeholder="Max ($)"
                value={localFilters?.budgetMax}
                onChange={(e) => handleFilterChange('budgetMax', e?.target?.value)}
              />
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <Select
              label="Minimum Rating"
              options={[
                { value: '', label: 'Any Rating' },
                { value: '4.5', label: '4.5+ Stars' },
                { value: '4.0', label: '4.0+ Stars' },
                { value: '3.5', label: '3.5+ Stars' },
                { value: '3.0', label: '3.0+ Stars' }
              ]}
              value={localFilters?.rating}
              onChange={(value) => handleFilterChange('rating', value)}
            />
          </div>

          {/* Availability */}
          <div className="mb-6">
            <Select
              label="Availability"
              options={[
                { value: '', label: 'Any Availability' },
                { value: 'Available', label: 'Available Now' },
                { value: 'Busy', label: 'Busy (2-4 weeks)' },
                { value: 'Booked', label: 'Booked (1+ months)' }
              ]}
              value={localFilters?.availability}
              onChange={(value) => handleFilterChange('availability', value)}
            />
          </div>

          {/* Certifications */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-text-primary mb-3">Certifications</h3>
            <div className="space-y-3">
              {certificationOptions?.map((option) => (
                <Checkbox
                  key={option?.value}
                  label={option?.label}
                  checked={localFilters?.certifications?.includes(option?.value) || false}
                  onChange={(e) => handleArrayFilterChange('certifications', option?.value, e?.target?.checked)}
                />
              ))}
            </div>
          </div>

          {/* Apply Button (Mobile) */}
          <div className="lg:hidden">
            <Button
              variant="default"
              fullWidth
              onClick={onClose}
              className="gradient-primary"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;