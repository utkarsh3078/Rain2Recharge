import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ComparisonTool = ({ vendors, isOpen, onClose, onRequestQuote }) => {
  const [selectedVendors, setSelectedVendors] = useState(vendors?.slice(0, 3));

  if (!isOpen) return null;

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        color={index < Math.floor(rating) ? "#F59E0B" : "#E5E7EB"}
        className={index < Math.floor(rating) ? "fill-current" : ""}
      />
    ));
  };

  const comparisonCategories = [
    {
      title: 'Basic Information',
      items: [
        { key: 'rating', label: 'Rating', type: 'rating' },
        { key: 'reviewCount', label: 'Reviews', type: 'text' },
        { key: 'yearsExperience', label: 'Experience', type: 'text', suffix: ' years' },
        { key: 'projectsCompleted', label: 'Projects', type: 'text' },
        { key: 'responseTime', label: 'Response Time', type: 'text' }
      ]
    },
    {
      title: 'Services & Specializations',
      items: [
        { key: 'specializations', label: 'Specializations', type: 'array' },
        { key: 'services', label: 'Services', type: 'array' },
        { key: 'certifications', label: 'Certifications', type: 'array' }
      ]
    },
    {
      title: 'Pricing & Availability',
      items: [
        { key: 'priceRange', label: 'Starting Price', type: 'text' },
        { key: 'availability', label: 'Availability', type: 'status' },
        { key: 'serviceArea', label: 'Service Area', type: 'text' }
      ]
    }
  ];

  const renderCellContent = (vendor, item) => {
    const value = vendor?.[item?.key];

    switch (item?.type) {
      case 'rating':
        return (
          <div className="flex items-center space-x-1">
            {renderStars(value)}
            <span className="text-sm font-medium ml-1">{value}</span>
          </div>
        );
      
      case 'array':
        if (!value || value?.length === 0) return <span className="text-text-secondary">-</span>;
        return (
          <div className="space-y-1">
            {value?.slice(0, 3)?.map((item, index) => (
              <span
                key={index}
                className="inline-block px-2 py-1 bg-primary/10 text-primary text-xs rounded mr-1 mb-1"
              >
                {item}
              </span>
            ))}
            {value?.length > 3 && (
              <span className="text-xs text-text-secondary">+{value?.length - 3} more</span>
            )}
          </div>
        );
      
      case 'status':
        const getStatusColor = (status) => {
          switch (status) {
            case 'Available':
              return 'text-success bg-success/10';
            case 'Busy':
              return 'text-warning bg-warning/10';
            case 'Booked':
              return 'text-error bg-error/10';
            default:
              return 'text-text-secondary bg-muted';
          }
        };
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
            {value}
          </span>
        );
      
      default:
        return (
          <span className="text-sm text-text-primary">
            {value}{item?.suffix || ''}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Compare Vendors</h2>
            <p className="text-sm text-text-secondary mt-1">
              Side-by-side comparison of selected vendors
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-hover transition-colors duration-200"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <div className="min-w-full">
            {/* Vendor Headers */}
            <div className="flex border-b border-border bg-muted/30">
              <div className="w-48 p-4 font-medium text-text-primary">
                Compare Features
              </div>
              {selectedVendors?.map((vendor, index) => (
                <div key={index} className="flex-1 min-w-64 p-4 border-l border-border">
                  <div className="flex items-center space-x-3 mb-3">
                    <Image
                      src={vendor?.logo}
                      alt={vendor?.name}
                      className="w-12 h-12 rounded-lg object-cover border border-border"
                    />
                    <div>
                      <h3 className="font-semibold text-text-primary">{vendor?.name}</h3>
                      <p className="text-xs text-text-secondary">{vendor?.location}</p>
                    </div>
                  </div>
                  <Button
                    variant="default"
                    size="sm"
                    fullWidth
                    onClick={() => onRequestQuote(vendor)}
                    className="gradient-primary"
                    iconName="MessageSquare"
                    iconPosition="left"
                  >
                    Get Quote
                  </Button>
                </div>
              ))}
            </div>

            {/* Comparison Rows */}
            <div className="max-h-96 overflow-y-auto">
              {comparisonCategories?.map((category, categoryIndex) => (
                <div key={categoryIndex}>
                  {/* Category Header */}
                  <div className="flex bg-muted/50 border-b border-border">
                    <div className="w-48 p-3 font-medium text-text-primary text-sm">
                      {category?.title}
                    </div>
                    {selectedVendors?.map((_, index) => (
                      <div key={index} className="flex-1 min-w-64 border-l border-border"></div>
                    ))}
                  </div>

                  {/* Category Items */}
                  {category?.items?.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex border-b border-border hover:bg-hover/50">
                      <div className="w-48 p-4 text-sm text-text-secondary font-medium">
                        {item?.label}
                      </div>
                      {selectedVendors?.map((vendor, vendorIndex) => (
                        <div key={vendorIndex} className="flex-1 min-w-64 p-4 border-l border-border">
                          {renderCellContent(vendor, item)}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-text-secondary">
            Comparing {selectedVendors?.length} vendors
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close Comparison
            </Button>
            <Button
              variant="default"
              className="gradient-primary"
              iconName="Download"
              iconPosition="left"
            >
              Export Comparison
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonTool;