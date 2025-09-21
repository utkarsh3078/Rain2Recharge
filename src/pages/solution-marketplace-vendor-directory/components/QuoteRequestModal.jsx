import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const QuoteRequestModal = ({ vendor, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: '',
    projectType: '',
    budget: '',
    timeline: '',
    description: '',
    includeAssessment: false,
    contactPreference: 'email'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !vendor) return null;

  const propertyTypeOptions = [
    { value: 'residential-single', label: 'Single Family Home' },
    { value: 'residential-multi', label: 'Multi-Family Home' },
    { value: 'commercial-small', label: 'Small Commercial' },
    { value: 'commercial-large', label: 'Large Commercial' },
    { value: 'industrial', label: 'Industrial' }
  ];

  const projectTypeOptions = [
    { value: 'rainwater-harvesting', label: 'Rainwater Harvesting System' },
    { value: 'groundwater-recharge', label: 'Groundwater Recharge System' },
    { value: 'greywater-recycling', label: 'Greywater Recycling System' },
    { value: 'stormwater-management', label: 'Stormwater Management' },
    { value: 'water-storage', label: 'Water Storage System' },
    { value: 'consultation', label: 'Consultation Only' }
  ];

  const budgetOptions = [
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-30k', label: '$15,000 - $30,000' },
    { value: '30k-50k', label: '$30,000 - $50,000' },
    { value: 'over-50k', label: 'Over $50,000' },
    { value: 'flexible', label: 'Flexible/Discuss' }
  ];

  const timelineOptions = [
    { value: 'asap', label: 'As Soon As Possible' },
    { value: '1-3-months', label: '1-3 Months' },
    { value: '3-6-months', label: '3-6 Months' },
    { value: '6-12-months', label: '6-12 Months' },
    { value: 'planning', label: 'Still Planning' }
  ];

  const contactPreferenceOptions = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'text', label: 'Text Message' },
    { value: 'any', label: 'Any Method' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    onSubmit({
      vendor: vendor,
      requestData: formData,
      timestamp: new Date()?.toISOString()
    });

    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-text-primary">Request Quote</h2>
            <p className="text-sm text-text-secondary mt-1">
              Get a personalized quote from {vendor?.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-hover transition-colors duration-200"
          >
            <Icon name="X" size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-96">
          <div className="space-y-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData?.name}
                  onChange={(e) => handleInputChange('name', e?.target?.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  placeholder="Enter your email"
                  value={formData?.email}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                  required
                />
              </div>
              <div className="mt-4">
                <Input
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={formData?.phone}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                  required
                />
              </div>
            </div>

            {/* Project Details */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Project Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select
                  label="Property Type"
                  options={propertyTypeOptions}
                  value={formData?.propertyType}
                  onChange={(value) => handleInputChange('propertyType', value)}
                  placeholder="Select property type"
                  required
                />
                <Select
                  label="Project Type"
                  options={projectTypeOptions}
                  value={formData?.projectType}
                  onChange={(value) => handleInputChange('projectType', value)}
                  placeholder="Select project type"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Select
                  label="Budget Range"
                  options={budgetOptions}
                  value={formData?.budget}
                  onChange={(value) => handleInputChange('budget', value)}
                  placeholder="Select budget range"
                  required
                />
                <Select
                  label="Timeline"
                  options={timelineOptions}
                  value={formData?.timeline}
                  onChange={(value) => handleInputChange('timeline', value)}
                  placeholder="Select timeline"
                  required
                />
              </div>
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Project Description
              </label>
              <textarea
                className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                rows={4}
                placeholder="Describe your project requirements, property details, and any specific needs..."
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
              />
            </div>

            {/* Additional Options */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Additional Options</h3>
              <div className="space-y-4">
                <Checkbox
                  label="Include site assessment in quote"
                  description="Professional evaluation of your property for optimal system design"
                  checked={formData?.includeAssessment}
                  onChange={(e) => handleInputChange('includeAssessment', e?.target?.checked)}
                />
                <div>
                  <Select
                    label="Preferred Contact Method"
                    options={contactPreferenceOptions}
                    value={formData?.contactPreference}
                    onChange={(value) => handleInputChange('contactPreference', value)}
                    placeholder="Select contact preference"
                  />
                </div>
              </div>
            </div>

            {/* Vendor Info */}
            <div className="bg-muted rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Icon name="Info" size={20} color="var(--color-primary)" />
                <h4 className="font-medium text-text-primary">What happens next?</h4>
              </div>
              <ul className="text-sm text-text-secondary space-y-1">
                <li>• {vendor?.name} will review your request within {vendor?.responseTime}</li>
                <li>• You'll receive a detailed quote via your preferred contact method</li>
                <li>• Free consultation call to discuss your project requirements</li>
                <li>• No obligation - compare quotes from multiple vendors</li>
              </ul>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border bg-muted/30">
          <div className="text-sm text-text-secondary">
            Response time: <span className="font-medium text-text-primary">{vendor?.responseTime}</span>
          </div>
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              loading={isSubmitting}
              className="gradient-primary"
              iconName="Send"
              iconPosition="left"
            >
              Send Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteRequestModal;