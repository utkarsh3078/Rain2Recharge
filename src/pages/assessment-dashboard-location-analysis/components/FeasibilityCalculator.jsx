import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const FeasibilityCalculator = ({ locationData, propertyData }) => {
  const [calculationResults, setCalculationResults] = useState(null);
  const [isCalculating, setIsCalculating] = useState(false);

  useEffect(() => {
    if (locationData && propertyData) {
      calculateFeasibility();
    }
  }, [locationData, propertyData]);

  const calculateFeasibility = () => {
    setIsCalculating(true);
    
    // Mock calculation with realistic delay
    setTimeout(() => {
      const results = {
        rainwaterHarvesting: {
          score: 85,
          level: 'Excellent',
          color: 'green',
          factors: [
            { name: 'Roof Area', score: 90, impact: 'High' },
            { name: 'Annual Rainfall', score: 88, impact: 'High' },
            { name: 'Property Slope', score: 75, impact: 'Medium' },
            { name: 'Local Regulations', score: 95, impact: 'Low' }
          ],
          potential: {
            annualCollection: 24000,
            costSavings: 1200,
            paybackPeriod: 3.2,
            co2Reduction: 850
          }
        },
        groundwaterRecharge: {
          score: 72,
          level: 'Good',
          color: 'yellow',
          factors: [
            { name: 'Soil Permeability', score: 78, impact: 'High' },
            { name: 'Groundwater Depth', score: 65, impact: 'High' },
            { name: 'Lot Size', score: 80, impact: 'Medium' },
            { name: 'Contamination Risk', score: 85, impact: 'Medium' }
          ],
          potential: {
            rechargeCapacity: 18000,
            aquiferBenefit: 'Medium',
            installationCost: 8500,
            maintenanceLevel: 'Low'
          }
        }
      };
      
      setCalculationResults(results);
      setIsCalculating(false);
    }, 2000);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLevel = (score) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Challenging';
  };

  if (isCalculating) {
    return (
      <div className="bg-white rounded-xl shadow-soft border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Calculator" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Feasibility Analysis</h3>
            <p className="text-sm text-text-secondary">Calculating your water solution potential</p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-12">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon name="Droplets" size={24} color="var(--color-primary)" />
            </div>
          </div>
          <p className="mt-4 text-lg font-medium text-text-primary">Analyzing Your Property</p>
          <p className="text-sm text-text-secondary">Processing climate data, soil conditions, and regulations...</p>
        </div>
      </div>
    );
  }

  if (!calculationResults) {
    return (
      <div className="bg-white rounded-xl shadow-soft border border-border p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
            <Icon name="Calculator" size={20} color="var(--color-text-secondary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary">Feasibility Analysis</h3>
            <p className="text-sm text-text-secondary">Complete location and property details to see results</p>
          </div>
        </div>
        
        <div className="text-center py-8">
          <Icon name="MapPin" size={48} color="var(--color-text-secondary)" className="mx-auto mb-4" />
          <p className="text-text-secondary">Waiting for assessment data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
          <Icon name="Calculator" size={20} color="var(--color-primary)" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-text-primary">Feasibility Results</h3>
          <p className="text-sm text-text-secondary">Real-time analysis of your water solutions</p>
        </div>
      </div>
      <div className="space-y-6">
        {/* Rainwater Harvesting */}
        <div className="border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="CloudRain" size={24} color="var(--color-primary)" />
              <div>
                <h4 className="text-lg font-semibold text-text-primary">Rainwater Harvesting</h4>
                <p className="text-sm text-text-secondary">Collect and store rainwater from your roof</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(calculationResults?.rainwaterHarvesting?.score)}`}>
                {calculationResults?.rainwaterHarvesting?.score}/100
              </div>
              <p className="text-sm text-text-secondary mt-1">{calculationResults?.rainwaterHarvesting?.level}</p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="space-y-3 mb-4">
            {calculationResults?.rainwaterHarvesting?.factors?.map((factor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-primary">{factor?.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    factor?.impact === 'High' ? 'bg-red-100 text-red-600' :
                    factor?.impact === 'Medium'? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {factor?.impact}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-primary rounded-full transition-all duration-500"
                      style={{ width: `${factor?.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-text-primary w-8">{factor?.score}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Potential Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-lg font-bold text-blue-900">{calculationResults?.rainwaterHarvesting?.potential?.annualCollection?.toLocaleString()}</p>
              <p className="text-xs text-blue-600">Gallons/Year</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-lg font-bold text-green-900">${calculationResults?.rainwaterHarvesting?.potential?.costSavings}</p>
              <p className="text-xs text-green-600">Annual Savings</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <p className="text-lg font-bold text-purple-900">{calculationResults?.rainwaterHarvesting?.potential?.paybackPeriod}</p>
              <p className="text-xs text-purple-600">Years Payback</p>
            </div>
            <div className="text-center p-3 bg-teal-50 rounded-lg">
              <p className="text-lg font-bold text-teal-900">{calculationResults?.rainwaterHarvesting?.potential?.co2Reduction}</p>
              <p className="text-xs text-teal-600">lbs CO₂ Saved</p>
            </div>
          </div>
        </div>

        {/* Groundwater Recharge */}
        <div className="border border-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Icon name="Waves" size={24} color="var(--color-secondary)" />
              <div>
                <h4 className="text-lg font-semibold text-text-primary">Groundwater Recharge</h4>
                <p className="text-sm text-text-secondary">Replenish underground water sources</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(calculationResults?.groundwaterRecharge?.score)}`}>
                {calculationResults?.groundwaterRecharge?.score}/100
              </div>
              <p className="text-sm text-text-secondary mt-1">{calculationResults?.groundwaterRecharge?.level}</p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="space-y-3 mb-4">
            {calculationResults?.groundwaterRecharge?.factors?.map((factor, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-primary">{factor?.name}</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    factor?.impact === 'High' ? 'bg-red-100 text-red-600' :
                    factor?.impact === 'Medium'? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {factor?.impact}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-20 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-full bg-secondary rounded-full transition-all duration-500"
                      style={{ width: `${factor?.score}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-text-primary w-8">{factor?.score}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Potential Benefits */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <p className="text-lg font-bold text-blue-900">{calculationResults?.groundwaterRecharge?.potential?.rechargeCapacity?.toLocaleString()}</p>
              <p className="text-xs text-blue-600">Gallons Capacity</p>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <p className="text-lg font-bold text-green-900">{calculationResults?.groundwaterRecharge?.potential?.aquiferBenefit}</p>
              <p className="text-xs text-green-600">Aquifer Impact</p>
            </div>
            <div className="text-center p-3 bg-orange-50 rounded-lg">
              <p className="text-lg font-bold text-orange-900">${calculationResults?.groundwaterRecharge?.potential?.installationCost?.toLocaleString()}</p>
              <p className="text-xs text-orange-600">Install Cost</p>
            </div>
            <div className="text-center p-3 bg-teal-50 rounded-lg">
              <p className="text-lg font-bold text-teal-900">{calculationResults?.groundwaterRecharge?.potential?.maintenanceLevel}</p>
              <p className="text-xs text-teal-600">Maintenance</p>
            </div>
          </div>
        </div>
      </div>
      {/* Overall Recommendation */}
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-secondary/5 border border-primary/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} color="var(--color-primary)" className="mt-0.5" />
          <div>
            <h5 className="font-semibold text-text-primary mb-2">Recommendation</h5>
            <p className="text-sm text-text-secondary mb-2">
              Based on your property analysis, rainwater harvesting shows excellent potential with a strong ROI. 
              Groundwater recharge is also viable and would complement your water sustainability goals.
            </p>
            <p className="text-sm font-medium text-primary">
              Next Step: Get detailed implementation recommendations and connect with certified installers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeasibilityCalculator;