import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const VendorModal = ({ vendor, isOpen, onClose, onRequestQuote }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImages, setSelectedImages] = useState(0);

  if (!isOpen || !vendor) return null;

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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'portfolio', label: 'Portfolio', icon: 'Image' },
    { id: 'reviews', label: 'Reviews', icon: 'MessageSquare' },
    { id: 'contact', label: 'Contact', icon: 'Phone' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">About</h3>
              <p className="text-text-secondary leading-relaxed">{vendor?.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">Services</h3>
              <div className="grid grid-cols-2 gap-3">
                {vendor?.services?.map((service, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Icon name="Check" size={16} color="var(--color-success)" />
                    <span className="text-sm text-text-secondary">{service}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-3">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {vendor?.certifications?.map((cert, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-secondary/10 text-secondary text-sm font-medium rounded-full"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>
        );

      case 'portfolio':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {vendor?.portfolio?.map((project, index) => (
                <div
                  key={index}
                  className="relative group cursor-pointer"
                  onClick={() => setSelectedImages(index)}
                >
                  <Image
                    src={project?.image}
                    alt={project?.title}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                    <Icon name="Eye" size={24} color="white" />
                  </div>
                </div>
              ))}
            </div>
            {vendor?.portfolio && vendor?.portfolio?.[selectedImages] && (
              <div className="bg-muted rounded-lg p-4">
                <h4 className="font-semibold text-text-primary mb-2">
                  {vendor?.portfolio?.[selectedImages]?.title}
                </h4>
                <p className="text-sm text-text-secondary mb-3">
                  {vendor?.portfolio?.[selectedImages]?.description}
                </p>
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  <span>Cost: {vendor?.portfolio?.[selectedImages]?.cost}</span>
                  <span>Duration: {vendor?.portfolio?.[selectedImages]?.duration}</span>
                </div>
              </div>
            )}
          </div>
        );

      case 'reviews':
        return (
          <div className="space-y-4">
            {vendor?.reviews?.map((review, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={review?.avatar}
                      alt={review?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-text-primary">{review?.name}</h4>
                      <div className="flex items-center space-x-1">
                        {renderStars(review?.rating)}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-text-secondary">{review?.date}</span>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{review?.comment}</p>
                {review?.projectType && (
                  <div className="mt-2">
                    <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded">
                      {review?.projectType}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Icon name="Phone" size={18} color="var(--color-text-secondary)" />
                    <span className="text-text-secondary">{vendor?.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Mail" size={18} color="var(--color-text-secondary)" />
                    <span className="text-text-secondary">{vendor?.email}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="MapPin" size={18} color="var(--color-text-secondary)" />
                    <span className="text-text-secondary">{vendor?.address}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Icon name="Globe" size={18} color="var(--color-text-secondary)" />
                    <span className="text-text-secondary">{vendor?.website}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-text-primary mb-4">Business Hours</h3>
                <div className="space-y-2">
                  {vendor?.businessHours?.map((hours, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-text-secondary">{hours?.day}</span>
                      <span className="text-text-primary font-medium">{hours?.hours}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-muted rounded-lg p-4">
              <h4 className="font-semibold text-text-primary mb-2">Service Area</h4>
              <p className="text-sm text-text-secondary">{vendor?.serviceArea}</p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <Image
              src={vendor?.logo}
              alt={vendor?.name}
              className="w-16 h-16 rounded-xl object-cover border border-border"
            />
            <div>
              <h2 className="text-xl font-semibold text-text-primary">{vendor?.name}</h2>
              <div className="flex items-center space-x-2 mt-1">
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
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-hover transition-colors duration-200"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium transition-colors duration-200 ${
                activeTab === tab?.id
                  ? 'text-primary border-b-2 border-primary bg-primary/5' :'text-text-secondary hover:text-text-primary'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {renderTabContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-text-secondary">
            Starting from <span className="text-lg font-semibold text-text-primary">{vendor?.priceRange}</span>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              variant="default"
              onClick={() => onRequestQuote(vendor)}
              className="gradient-primary"
              iconName="MessageSquare"
              iconPosition="left"
            >
              Request Quote
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorModal;