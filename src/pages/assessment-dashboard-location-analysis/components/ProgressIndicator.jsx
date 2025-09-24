import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, stepLabels }) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  const steps = [
    { id: 1, label: 'Location', icon: 'MapPin' },
    { id: 2, label: 'Property', icon: 'Home' },
    { id: 3, label: 'Climate', icon: 'Cloud' },
    { id: 4, label: 'Analysis', icon: 'BarChart3' },
    { id: 5, label: 'Results', icon: 'CheckCircle' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-soft border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text-primary">Assessment Progress</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            {[...Array(totalSteps)]?.map((_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
          <span className="text-sm font-medium text-primary">{Math.round(progressPercentage)}% Complete</span>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out relative"
            style={{ width: `${progressPercentage}%` }}
          >
            {/* Water droplet animation */}
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-1">
              <div className="w-4 h-4 bg-primary rounded-full animate-pulse shadow-lg">
                <Icon name="Droplets" size={12} color="white" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Step Indicators */}
      <div className="flex justify-between items-center">
        {steps?.map((step, index) => {
          const isCompleted = currentStep > step?.id;
          const isCurrent = currentStep === step?.id;
          const isUpcoming = currentStep < step?.id;

          return (
            <div key={step?.id} className="flex flex-col items-center space-y-2">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isCompleted
                    ? 'bg-success text-white shadow-lg'
                    : isCurrent
                    ? 'bg-primary text-white shadow-lg animate-pulse-gentle'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {isCompleted ? (
                  <Icon name="Check" size={18} />
                ) : (
                  <Icon name={step?.icon} size={18} />
                )}
              </div>
              <span
                className={`text-xs font-medium transition-colors duration-300 ${
                  isCompleted || isCurrent
                    ? 'text-text-primary' :'text-text-secondary'
                }`}
              >
                {step?.label}
              </span>
              {/* Connection Line */}
              {index < steps?.length - 1 && (
                <div className="absolute top-5 left-1/2 transform -translate-y-1/2 hidden sm:block">
                  <div
                    className={`h-0.5 transition-colors duration-300 ${
                      currentStep > step?.id ? 'bg-success' : 'bg-gray-200'
                    }`}
                    style={{ width: 'calc(100vw / 5 - 2.5rem)' }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
      {/* Current Step Description */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <Icon name="Info" size={16} color="var(--color-primary)" />
          <span className="text-sm font-medium text-blue-800">
            {currentStep === 1 && "Enter your property location to begin the assessment"}
            {currentStep === 2 && "Provide details about your property characteristics"}
            {currentStep === 3 && "Review local climate and rainfall data"}
            {currentStep === 4 && "Analyzing feasibility for water solutions"}
            {currentStep === 5 && "Assessment complete! Review your results"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;

