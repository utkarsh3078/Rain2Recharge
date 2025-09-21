import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationControls = ({ 
  currentStep, 
  totalSteps, 
  onNext, 
  onPrevious, 
  canProceed, 
  assessmentData,
  onSaveProgress 
}) => {
  const navigate = useNavigate();

  const handleSaveAndExit = () => {
    onSaveProgress();
    navigate('/homepage-smart-water-platform');
  };

  const handleViewResults = () => {
    navigate('/detailed-report-recommendations');
  };

  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  return (
    <div className="bg-white rounded-xl shadow-soft border border-border p-6">
      <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
        {/* Left Side - Previous Button */}
        <div className="flex items-center space-x-3">
          {!isFirstStep && (
            <Button
              variant="outline"
              onClick={onPrevious}
              iconName="ChevronLeft"
              iconPosition="left"
            >
              Previous
            </Button>
          )}
          
          <Button
            variant="ghost"
            onClick={handleSaveAndExit}
            iconName="Save"
            iconPosition="left"
            className="text-text-secondary hover:text-text-primary"
          >
            Save & Exit
          </Button>
        </div>

        {/* Center - Step Information */}
        <div className="text-center">
          <p className="text-sm text-text-secondary">
            Step {currentStep} of {totalSteps}
          </p>
          <div className="flex items-center space-x-2 mt-1">
            <div className="flex space-x-1">
              {[...Array(totalSteps)]?.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index < currentStep
                      ? 'bg-success'
                      : index === currentStep - 1
                      ? 'bg-primary' :'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right Side - Next/Complete Button */}
        <div className="flex items-center space-x-3">
          {isLastStep ? (
            <Button
              variant="default"
              onClick={handleViewResults}
              disabled={!canProceed}
              iconName="FileText"
              iconPosition="right"
              className="gradient-primary"
            >
              View Detailed Report
            </Button>
          ) : (
            <Button
              variant="default"
              onClick={onNext}
              disabled={!canProceed}
              iconName="ChevronRight"
              iconPosition="right"
              className="gradient-primary"
            >
              {currentStep === 1 && 'Start Analysis'}
              {currentStep === 2 && 'Analyze Climate'}
              {currentStep === 3 && 'Calculate Feasibility'}
              {currentStep === 4 && 'Complete Assessment'}
            </Button>
          )}
        </div>
      </div>
      {/* Progress Indicators */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-2 text-text-secondary">
            <Icon name="Clock" size={16} />
            <span>Est. {Math.max(1, (totalSteps - currentStep + 1) * 2)} min remaining</span>
          </div>
          
          <div className="flex items-center space-x-4">
            {assessmentData?.location && (
              <div className="flex items-center space-x-1 text-green-600">
                <Icon name="MapPin" size={14} />
                <span className="text-xs">Location Set</span>
              </div>
            )}
            
            {assessmentData?.property && (
              <div className="flex items-center space-x-1 text-green-600">
                <Icon name="Home" size={14} />
                <span className="text-xs">Property Details</span>
              </div>
            )}
            
            {currentStep >= 4 && (
              <div className="flex items-center space-x-1 text-green-600">
                <Icon name="CheckCircle" size={14} />
                <span className="text-xs">Analysis Complete</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Help Text */}
      {!canProceed && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-start space-x-2">
            <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
            <div className="text-sm">
              <p className="font-medium text-yellow-800">Complete this step to continue</p>
              <p className="text-yellow-700">
                {currentStep === 1 && "Please select a location to proceed with the assessment."}
                {currentStep === 2 && "Property details are required to calculate your water potential."}
                {currentStep === 3 && "Climate analysis is processing - this will complete automatically."}
                {currentStep === 4 && "Feasibility calculation is in progress - please wait."}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavigationControls;