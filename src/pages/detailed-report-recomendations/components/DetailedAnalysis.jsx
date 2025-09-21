import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const DetailedAnalysis = ({ analysisData }) => {
  const [expandedSection, setExpandedSection] = useState('rainfall');

  const analysisSection = [
    {
      id: 'rainfall',
      title: 'Rainfall Capture Potential',
      icon: 'CloudRain',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      data: {
        annualRainfall: '42.5 inches',
        captureEfficiency: '85%',
        roofArea: '2,400 sq ft',
        potentialCapture: '54,000 gallons/year',
        seasonalBreakdown: [
          { season: 'Spring', rainfall: '12.8"', capture: '16,320 gal' },
          { season: 'Summer', rainfall: '8.2"', capture: '10,455 gal' },
          { season: 'Fall', rainfall: '11.5"', capture: '14,670 gal' },
          { season: 'Winter', rainfall: '10.0"', capture: '12,750 gal' }
        ]
      }
    },
    {
      id: 'soil',
      title: 'Soil Infiltration Analysis',
      icon: 'Mountain',
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      data: {
        soilType: 'Sandy Loam',
        infiltrationRate: '2.5 inches/hour',
        permeability: 'High',
        seasonalVariation: 'Moderate',
        recommendations: [
          'Excellent natural drainage capacity',
          'Minimal soil amendments required',
          'Consider bioswales for enhanced infiltration',
          'Monitor during wet seasons for saturation'
        ]
      }
    },
    {
      id: 'regulatory',
      title: 'Regulatory Compliance',
      icon: 'FileCheck',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      data: {
        permits: 'Building permit required',
        incentives: '$2,500 rebate available',
        restrictions: 'None identified',
        timeline: '4-6 weeks processing',
        requirements: [
          'Professional installation certification',
          'Backflow prevention device',
          'Annual system inspection',
          'Water quality testing (if potable use)'
        ]
      }
    },
    {
      id: 'optimization',
      title: 'Seasonal Optimization',
      icon: 'Calendar',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      data: {
        bestInstallTime: 'Late Spring (April-May)',
        maintenanceSchedule: 'Quarterly inspections',
        winterPrep: 'Drain system below 32°F',
        peakEfficiency: 'Fall and Spring seasons',
        strategies: [
          'Install before rainy season for maximum benefit',
          'Schedule maintenance during dry periods',
          'Adjust collection based on seasonal patterns',
          'Implement smart controls for automation'
        ]
      }
    }
  ];

  const toggleSection = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="bg-white rounded-2xl shadow-elevation border border-border p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Detailed Analysis</h2>
          <p className="text-text-secondary">Comprehensive assessment of your property conditions</p>
        </div>
        <button className="flex items-center space-x-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
          <Icon name="Download" size={16} />
          <span className="text-sm font-medium">Export Analysis</span>
        </button>
      </div>
      <div className="space-y-4">
        {analysisSection?.map((section) => (
          <div key={section?.id} className="border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => toggleSection(section?.id)}
              className="w-full px-6 py-4 bg-gradient-to-r from-gray-50 to-white hover:from-gray-100 hover:to-gray-50 transition-all duration-200 flex items-center justify-between"
            >
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 ${section?.bgColor} rounded-lg flex items-center justify-center`}>
                  <Icon name={section?.icon} size={24} className={section?.color} />
                </div>
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-text-primary">{section?.title}</h3>
                  <p className="text-sm text-text-secondary">Click to expand detailed analysis</p>
                </div>
              </div>
              <Icon 
                name={expandedSection === section?.id ? "ChevronUp" : "ChevronDown"} 
                size={20} 
                className="text-text-secondary transition-transform duration-200" 
              />
            </button>

            {expandedSection === section?.id && (
              <div className="px-6 py-6 bg-white border-t border-border">
                {section?.id === 'rainfall' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{section?.data?.annualRainfall}</div>
                        <div className="text-sm text-text-secondary">Annual Rainfall</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{section?.data?.captureEfficiency}</div>
                        <div className="text-sm text-text-secondary">Efficiency</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{section?.data?.roofArea}</div>
                        <div className="text-sm text-text-secondary">Roof Area</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600">{section?.data?.potentialCapture}</div>
                        <div className="text-sm text-text-secondary">Potential Capture</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-3">Seasonal Breakdown</h4>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        {section?.data?.seasonalBreakdown?.map((season, index) => (
                          <div key={index} className="p-3 border border-border rounded-lg">
                            <div className="font-medium text-text-primary">{season?.season}</div>
                            <div className="text-sm text-text-secondary">{season?.rainfall} • {season?.capture}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {section?.id === 'soil' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <div className="font-semibold text-amber-600">Soil Type</div>
                        <div className="text-text-primary">{section?.data?.soilType}</div>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <div className="font-semibold text-amber-600">Infiltration Rate</div>
                        <div className="text-text-primary">{section?.data?.infiltrationRate}</div>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <div className="font-semibold text-amber-600">Permeability</div>
                        <div className="text-text-primary">{section?.data?.permeability}</div>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <div className="font-semibold text-amber-600">Seasonal Variation</div>
                        <div className="text-text-primary">{section?.data?.seasonalVariation}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-3">Recommendations</h4>
                      <ul className="space-y-2">
                        {section?.data?.recommendations?.map((rec, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Icon name="CheckCircle" size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                            <span className="text-text-secondary">{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {section?.id === 'regulatory' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="font-semibold text-green-600 mb-2">Permits Required</div>
                        <div className="text-text-primary">{section?.data?.permits}</div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="font-semibold text-green-600 mb-2">Available Incentives</div>
                        <div className="text-text-primary">{section?.data?.incentives}</div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="font-semibold text-green-600 mb-2">Restrictions</div>
                        <div className="text-text-primary">{section?.data?.restrictions}</div>
                      </div>
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="font-semibold text-green-600 mb-2">Processing Timeline</div>
                        <div className="text-text-primary">{section?.data?.timeline}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-3">Compliance Requirements</h4>
                      <ul className="space-y-2">
                        {section?.data?.requirements?.map((req, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Icon name="AlertCircle" size={16} className="text-amber-600 mt-0.5 flex-shrink-0" />
                            <span className="text-text-secondary">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                {section?.id === 'optimization' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="font-semibold text-purple-600 mb-2">Best Install Time</div>
                        <div className="text-text-primary">{section?.data?.bestInstallTime}</div>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="font-semibold text-purple-600 mb-2">Maintenance Schedule</div>
                        <div className="text-text-primary">{section?.data?.maintenanceSchedule}</div>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="font-semibold text-purple-600 mb-2">Winter Preparation</div>
                        <div className="text-text-primary">{section?.data?.winterPrep}</div>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="font-semibold text-purple-600 mb-2">Peak Efficiency</div>
                        <div className="text-text-primary">{section?.data?.peakEfficiency}</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-primary mb-3">Optimization Strategies</h4>
                      <ul className="space-y-2">
                        {section?.data?.strategies?.map((strategy, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <Icon name="Lightbulb" size={16} className="text-purple-600 mt-0.5 flex-shrink-0" />
                            <span className="text-text-secondary">{strategy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedAnalysis;