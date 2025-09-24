import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const AssessmentLauncher = () => {
  const [formData, setFormData] = useState({
    location: '',
    propertyType: '',
    sustainabilityGoal: ''
  });

  const propertyTypes = [
    { value: 'residential-single', label: 'Single Family Home' },
    { value: 'residential-multi', label: 'Multi-Family Home' },
    { value: 'commercial-small', label: 'Small Commercial' },
    { value: 'commercial-large', label: 'Large Commercial' },
    { value: 'industrial', label: 'Industrial Facility' },
    { value: 'agricultural', label: 'Agricultural Property' }
  ];

  const sustainabilityGoals = [
    { value: 'water-conservation', label: 'Water Conservation' },
    { value: 'cost-reduction', label: 'Cost Reduction' },
    { value: 'environmental-impact', label: 'Environmental Impact' },
    { value: 'regulatory-compliance', label: 'Regulatory Compliance' },
    { value: 'community-leadership', label: 'Community Leadership' },
    { value: 'all-above', label: 'All of the Above' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const isFormValid = formData?.location && formData?.propertyType && formData?.sustainabilityGoal;

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Start Your Water Sustainability Journey
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Get personalized recommendations for your property in just 3 simple steps. 
            Our AI-powered assessment analyzes your location, property type, and goals.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-elevation p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Form Section */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">1</span>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">Property Location</h3>
                  </div>
                  
                  <Input
                    label="Enter your address or zip code"
                    type="text"
                    placeholder="Sector 16 C, Dwarka, New Delhi, Delhi 110078"
                    value={formData?.location}
                    onChange={(e) => handleInputChange('location', e?.target?.value)}
                    className="w-full"
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">2</span>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">Property Type</h3>
                  </div>
                  
                  <Select
                    label="Select your property type"
                    placeholder="Choose property type"
                    options={propertyTypes}
                    value={formData?.propertyType}
                    onChange={(value) => handleInputChange('propertyType', value)}
                  />
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">3</span>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">Sustainability Goal</h3>
                  </div>
                  
                  <Select
                    label="What's your primary goal?"
                    placeholder="Choose your main objective"
                    options={sustainabilityGoals}
                    value={formData?.sustainabilityGoal}
                    onChange={(value) => handleInputChange('sustainabilityGoal', value)}
                  />
                </div>

                <div className="pt-6">
                  <Link to="/assessment-dashboard-location-analysis">
                    <Button
                      variant="default"
                      size="lg"
                      fullWidth
                      disabled={!isFormValid}
                      className="gradient-primary shadow-brand hover:shadow-brand-lg transform hover:scale-105 transition-all duration-300"
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Begin Assessment
                    </Button>
                  </Link>
                  
                  <p className="text-sm text-text-secondary text-center mt-4">
                    Free assessment • No credit card required • 5 minutes to complete
                  </p>
                </div>
              </div>

              {/* Visual Section */}
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-teal-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="relative">
                      <div className="w-24 h-24 bg-white rounded-full shadow-brand flex items-center justify-center mx-auto">
                        <Icon name="MapPin" size={40} color="var(--color-primary)" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                        <Icon name="Zap" size={16} color="white" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-xl font-semibold text-text-primary">
                        AI-Powered Analysis
                      </h4>
                      <p className="text-text-secondary">
                        Our advanced algorithms analyze rainfall patterns, soil composition, 
                        and local regulations to provide personalized recommendations.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center animate-pulse-gentle">
                  <Icon name="Cloud" size={20} color="var(--color-accent)" />
                </div>
                <div className="absolute bottom-4 left-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center animate-pulse-gentle" style={{ animationDelay: '1s' }}>
                  <Icon name="Droplets" size={16} color="var(--color-primary)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssessmentLauncher;