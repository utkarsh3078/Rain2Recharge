import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ExpertEscalation = ({ isOpen, onClose, onSubmit, conversationContext }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    urgency: 'medium',
    category: '',
    description: '',
    preferredContact: 'email',
    availableTime: ''
  });

  const urgencyOptions = [
    { value: 'low', label: 'Low - General inquiry' },
    { value: 'medium', label: 'Medium - Need guidance soon' },
    { value: 'high', label: 'High - Urgent technical issue' },
    { value: 'critical', label: 'Critical - System failure' }
  ];

  const categoryOptions = [
    { value: 'technical', label: 'Technical Installation' },
    { value: 'maintenance', label: 'System Maintenance' },
    { value: 'troubleshooting', label: 'Problem Diagnosis' },
    { value: 'regulatory', label: 'Permits & Regulations' },
    { value: 'financial', label: 'Cost & Financing' },
    { value: 'design', label: 'System Design' }
  ];

  const contactOptions = [
    { value: 'email', label: 'Email' },
    { value: 'phone', label: 'Phone Call' },
    { value: 'video', label: 'Video Call' },
    { value: 'onsite', label: 'On-site Visit' }
  ];

  const experts = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "Water Systems Engineer",
      specialties: ["Technical Installation", "System Design"],
      rating: 4.9,
      responseTime: "2-4 hours",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 2,
      name: "Mike Rodriguez",
      title: "Installation Specialist",
      specialties: ["Maintenance", "Troubleshooting"],
      rating: 4.8,
      responseTime: "1-2 hours",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    {
      id: 3,
      name: "Jennifer Park",
      title: "Regulatory Consultant",
      specialties: ["Permits & Regulations", "Financial Planning"],
      rating: 4.9,
      responseTime: "4-6 hours",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onSubmit({
      ...formData,
      conversationContext,
      timestamp: new Date()?.toISOString()
    });
    onClose();
  };

  const getUrgencyColor = (urgency) => {
    const colors = {
      low: 'text-green-600 bg-green-50',
      medium: 'text-yellow-600 bg-yellow-50',
      high: 'text-orange-600 bg-orange-50',
      critical: 'text-red-600 bg-red-50'
    };
    return colors?.[urgency] || colors?.medium;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-elevation max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-text-primary">Connect with an Expert</h2>
              <p className="text-text-secondary mt-1">Get personalized help from our water sustainability specialists</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-hover rounded-lg transition-colors duration-200"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>

        {/* Available Experts */}
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-text-primary mb-4">Available Experts</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {experts?.map((expert) => (
              <div key={expert?.id} className="p-4 border border-border rounded-xl hover:border-primary/30 transition-colors duration-200">
                <div className="flex items-center space-x-3 mb-3">
                  <img
                    src={expert?.avatar}
                    alt={expert?.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-medium text-text-primary text-sm">{expert?.name}</h4>
                    <p className="text-xs text-text-secondary">{expert?.title}</p>
                  </div>
                </div>
                
                <div className="space-y-2 text-xs">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={12} color="var(--color-warning)" />
                    <span className="text-text-secondary">{expert?.rating} rating</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} color="var(--color-text-secondary)" />
                    <span className="text-text-secondary">{expert?.responseTime}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {expert?.specialties?.map((specialty, index) => (
                      <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              type="text"
              required
              value={formData?.name}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              placeholder="Enter your name"
            />
            
            <Input
              label="Email Address"
              type="email"
              required
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              placeholder="your@email.com"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              type="tel"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              placeholder="(555) 123-4567"
            />
            
            <Select
              label="Preferred Contact Method"
              options={contactOptions}
              value={formData?.preferredContact}
              onChange={(value) => handleInputChange('preferredContact', value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Urgency Level"
              options={urgencyOptions}
              value={formData?.urgency}
              onChange={(value) => handleInputChange('urgency', value)}
            />
            
            <Select
              label="Category"
              options={categoryOptions}
              value={formData?.category}
              onChange={(value) => handleInputChange('category', value)}
              required
            />
          </div>

          <Input
            label="Available Time"
            type="text"
            value={formData?.availableTime}
            onChange={(e) => handleInputChange('availableTime', e?.target?.value)}
            placeholder="e.g., Weekdays 9-5 PM EST"
            description="When are you typically available for contact?"
          />

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Describe Your Question or Issue
            </label>
            <textarea
              value={formData?.description}
              onChange={(e) => handleInputChange('description', e?.target?.value)}
              placeholder="Please provide details about what you need help with..."
              className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200 text-text-primary placeholder-text-secondary resize-none"
              rows={4}
              required
            />
          </div>

          {/* Conversation Context */}
          {conversationContext && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium text-text-primary mb-2 flex items-center space-x-2">
                <Icon name="MessageCircle" size={16} />
                <span>Conversation Context</span>
              </h4>
              <p className="text-sm text-text-secondary">
                Your recent conversation with WaterBuddy will be shared with the expert to provide better assistance.
              </p>
            </div>
          )}

          {/* Urgency Indicator */}
          <div className={`p-3 rounded-lg ${getUrgencyColor(formData?.urgency)}`}>
            <div className="flex items-center space-x-2">
              <Icon name="AlertCircle" size={16} />
              <span className="text-sm font-medium">
                {urgencyOptions?.find(opt => opt?.value === formData?.urgency)?.label}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              className="flex-1 gradient-primary"
            >
              Connect with Expert
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExpertEscalation;