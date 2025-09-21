import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import LocationInput from './components/LocationInput';
import PropertyDetails from './components/PropertyDetails';
import ProgressIndicator from './components/ProgressIndicator';
import ClimateVisualization from './components/ClimateVisualization';
import FeasibilityCalculator from './components/FeasibilityCalculator';
import WaterBuddyAssistant from './components/WaterBuddyAssistant';
import NavigationControls from './components/NavigationControls';
import Icon from '../../components/AppIcon';

const AssessmentDashboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [assessmentData, setAssessmentData] = useState({
    location: null,
    property: null,
    climate: null,
    feasibility: null
  });
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = 5;

  // Load saved progress from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('rain2recharge_assessment');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        setAssessmentData(parsed);
        // Determine current step based on completed data
        if (parsed?.feasibility) setCurrentStep(5);
        else if (parsed?.climate) setCurrentStep(4);
        else if (parsed?.property) setCurrentStep(3);
        else if (parsed?.location) setCurrentStep(2);
      } catch (error) {
        console.error('Error loading saved assessment:', error);
      }
    }
  }, []);

  // Save progress to localStorage
  const saveProgress = () => {
    localStorage.setItem('rain2recharge_assessment', JSON.stringify(assessmentData));
  };

  const handleLocationSelect = (location) => {
    setAssessmentData(prev => ({
      ...prev,
      location
    }));
    saveProgress();
  };

  const handlePropertyUpdate = (property) => {
    setAssessmentData(prev => ({
      ...prev,
      property
    }));
    saveProgress();
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
      
      // Auto-advance through climate and feasibility steps
      if (currentStep === 2) {
        // Simulate climate data loading
        setTimeout(() => {
          setAssessmentData(prev => ({
            ...prev,
            climate: { loaded: true, timestamp: new Date() }
          }));
          setCurrentStep(4);
        }, 1500);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return assessmentData?.location !== null;
      case 2:
        return assessmentData?.property !== null;
      case 3:
        return assessmentData?.climate !== null;
      case 4:
        return true; // Feasibility calculation runs automatically
      case 5:
        return true;
      default:
        return false;
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <LocationInput
            onLocationSelect={handleLocationSelect}
            selectedLocation={assessmentData?.location}
          />
        );
      case 2:
        return (
          <PropertyDetails
            propertyData={assessmentData?.property}
            onPropertyUpdate={handlePropertyUpdate}
          />
        );
      case 3:
        return (
          <ClimateVisualization
            locationData={assessmentData?.location}
          />
        );
      case 4:
      case 5:
        return (
          <FeasibilityCalculator
            locationData={assessmentData?.location}
            propertyData={assessmentData?.property}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Helmet>
        <title>Assessment Dashboard - Location & Analysis | Rain2Recharge</title>
        <meta name="description" content="Complete your comprehensive water sustainability assessment with intelligent location analysis, property evaluation, and feasibility calculations for rainwater harvesting and groundwater recharge solutions." />
        <meta name="keywords" content="water assessment, rainwater harvesting, groundwater recharge, property analysis, climate data, feasibility calculator" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header />
        
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Page Header */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-brand">
                  <Icon name="BarChart3" size={24} color="white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-text-primary">
                  Water Assessment Dashboard
                </h1>
              </div>
              <p className="text-lg text-text-secondary max-w-3xl mx-auto">
                Complete your comprehensive property analysis to discover your rainwater harvesting 
                and groundwater recharge potential with personalized recommendations.
              </p>
            </div>

            {/* Progress Indicator */}
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={totalSteps}
              stepLabels={[
                'Location',
                'Property Details', 
                'Climate Analysis',
                'Feasibility Calculation',
                'Results'
              ]}
            />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Assessment Area */}
              <div className="lg:col-span-2 space-y-6">
                {renderCurrentStep()}
                
                {/* Navigation Controls */}
                <NavigationControls
                  currentStep={currentStep}
                  totalSteps={totalSteps}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  canProceed={canProceed()}
                  assessmentData={assessmentData}
                  onSaveProgress={saveProgress}
                />
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Assessment Summary */}
                <div className="bg-white rounded-xl shadow-soft border border-border p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="FileText" size={16} color="var(--color-primary)" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">Assessment Summary</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                      assessmentData?.location ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                    }`}>
                      <Icon 
                        name={assessmentData?.location ? "CheckCircle" : "Circle"} 
                        size={16} 
                        color={assessmentData?.location ? "var(--color-success)" : "var(--color-text-secondary)"} 
                      />
                      <div>
                        <p className="text-sm font-medium text-text-primary">Location</p>
                        <p className="text-xs text-text-secondary">
                          {assessmentData?.location ? assessmentData?.location?.address : 'Not selected'}
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                      assessmentData?.property ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                    }`}>
                      <Icon 
                        name={assessmentData?.property ? "CheckCircle" : "Circle"} 
                        size={16} 
                        color={assessmentData?.property ? "var(--color-success)" : "var(--color-text-secondary)"} 
                      />
                      <div>
                        <p className="text-sm font-medium text-text-primary">Property Details</p>
                        <p className="text-xs text-text-secondary">
                          {assessmentData?.property 
                            ? `${assessmentData?.property?.roofSize?.toLocaleString()} sq ft roof` 
                            : 'Not provided'
                          }
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                      currentStep >= 3 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                    }`}>
                      <Icon 
                        name={currentStep >= 3 ? "CheckCircle" : "Circle"} 
                        size={16} 
                        color={currentStep >= 3 ? "var(--color-success)" : "var(--color-text-secondary)"} 
                      />
                      <div>
                        <p className="text-sm font-medium text-text-primary">Climate Analysis</p>
                        <p className="text-xs text-text-secondary">
                          {currentStep >= 3 ? 'Analysis complete' : 'Pending'}
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-center space-x-3 p-3 rounded-lg ${
                      currentStep >= 4 ? 'bg-green-50 border border-green-200' : 'bg-gray-50 border border-gray-200'
                    }`}>
                      <Icon 
                        name={currentStep >= 4 ? "CheckCircle" : "Circle"} 
                        size={16} 
                        color={currentStep >= 4 ? "var(--color-success)" : "var(--color-text-secondary)"} 
                      />
                      <div>
                        <p className="text-sm font-medium text-text-primary">Feasibility Results</p>
                        <p className="text-xs text-text-secondary">
                          {currentStep >= 4 ? 'Calculations complete' : 'Pending'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Tips */}
                <div className="bg-white rounded-xl shadow-soft border border-border p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Icon name="Lightbulb" size={16} color="var(--color-warning)" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">Quick Tips</h3>
                  </div>
                  
                  <div className="space-y-3 text-sm text-text-secondary">
                    {currentStep === 1 && (
                      <>
                        <p>• Use your exact address for the most accurate results</p>
                        <p>• GPS location provides precise coordinates</p>
                        <p>• Your data is encrypted and never shared</p>
                      </>
                    )}
                    {currentStep === 2 && (
                      <>
                        <p>• Roof size affects collection potential significantly</p>
                        <p>• Larger lots offer more recharge opportunities</p>
                        <p>• Property type influences system recommendations</p>
                      </>
                    )}
                    {currentStep >= 3 && (
                      <>
                        <p>• Higher rainfall = better collection potential</p>
                        <p>• Seasonal patterns affect storage needs</p>
                        <p>• Climate data spans 10+ years for accuracy</p>
                      </>
                    )}
                  </div>
                </div>

                {/* Contact Support */}
                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 border border-primary/20 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name="HelpCircle" size={16} color="var(--color-primary)" />
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary">Need Help?</h3>
                  </div>
                  <p className="text-sm text-text-secondary mb-4">
                    Our water experts are here to assist you through the assessment process.
                  </p>
                  <div className="space-y-2">
                    <button className="w-full text-left p-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors duration-200">
                      📞 Call: (555) 123-WATER
                    </button>
                    <button className="w-full text-left p-2 text-sm text-primary hover:bg-primary/5 rounded-lg transition-colors duration-200">
                      ✉️ Email: support@rain2recharge.com
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* WaterBuddy Assistant */}
        <WaterBuddyAssistant
          currentStep={currentStep}
          locationData={assessmentData?.location}
          propertyData={assessmentData?.property}
        />
      </div>
    </>
  );
};

export default AssessmentDashboard;