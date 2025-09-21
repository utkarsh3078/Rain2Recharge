import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VendorCard = ({ vendor, onViewProfile, onRequestQuote }) => {
  const [isBookmarked, setIsBookmarked] = useState(vendor?.isBookmarked || false);

  const handleBookmark = (e) => {
    e?.stopPropagation();
    setIsBookmarked(!isBookmarked);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        color={index < Math.floor(rating) ? "#F59E0B" : "#E5E7EB"}
        className={index < Math.floor(rating) ? "fill-current" : ""}
      />
    ));
  };

  const getAvailabilityColor = (status) => {
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
    <div className="bg-card rounded-xl border border-border p-6 hover:shadow-brand transition-all duration-300 group">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Image
              src={vendor?.logo}
              alt={vendor?.name}
              className="w-16 h-16 rounded-xl object-cover border border-border"
            />
            {vendor?.verified && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} color="white" strokeWidth={3} />
              </div>
            )}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-1">{vendor?.name}</h3>
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex items-center space-x-1">
                {renderStars(vendor?.rating)}
                <span className="text-sm font-medium text-text-primary ml-1">
                  {vendor?.rating}
                </span>
              </div>
              <span className="text-sm text-text-secondary">
                ({vendor?.reviewCount} reviews)
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={14} color="var(--color-text-secondary)" />
              <span className="text-sm text-text-secondary">{vendor?.location}</span>
            </div>
          </div>
        </div>
        <button
          onClick={handleBookmark}
          className="p-2 rounded-lg hover:bg-hover transition-colors duration-200"
        >
          <Icon
            name={isBookmarked ? "Bookmark" : "Bookmark"}
            size={20}
            color={isBookmarked ? "var(--color-primary)" : "var(--color-text-secondary)"}
            className={isBookmarked ? "fill-current" : ""}
          />
        </button>
      </div>
      {/* Specializations */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {vendor?.specializations?.map((spec, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
            >
              {spec}
            </span>
          ))}
        </div>
      </div>
      {/* Key Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4 p-4 bg-muted rounded-lg">
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">{vendor?.projectsCompleted}</div>
          <div className="text-xs text-text-secondary">Projects</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">{vendor?.yearsExperience}</div>
          <div className="text-xs text-text-secondary">Years</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-text-primary">{vendor?.responseTime}</div>
          <div className="text-xs text-text-secondary">Response</div>
        </div>
      </div>
      {/* Availability */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={16} color="var(--color-text-secondary)" />
          <span className="text-sm text-text-secondary">Availability:</span>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(vendor?.availability)}`}>
          {vendor?.availability}
        </span>
      </div>
      {/* Price Range */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Icon name="DollarSign" size={16} color="var(--color-text-secondary)" />
          <span className="text-sm text-text-secondary">Starting from:</span>
        </div>
        <span className="text-lg font-semibold text-text-primary">{vendor?.priceRange}</span>
      </div>
      {/* Certifications */}
      {vendor?.certifications?.length > 0 && (
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Award" size={16} color="var(--color-text-secondary)" />
            <span className="text-sm font-medium text-text-secondary">Certifications</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {vendor?.certifications?.slice(0, 3)?.map((cert, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-secondary/10 text-secondary text-xs font-medium rounded"
              >
                {cert}
              </span>
            ))}
            {vendor?.certifications?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-text-secondary text-xs font-medium rounded">
                +{vendor?.certifications?.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewProfile(vendor)}
          className="flex-1"
          iconName="Eye"
          iconPosition="left"
        >
          View Profile
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onRequestQuote(vendor)}
          className="flex-1 gradient-primary"
          iconName="MessageSquare"
          iconPosition="left"
        >
          Get Quote
        </Button>
      </div>
    </div>
  );
};

export default VendorCard;