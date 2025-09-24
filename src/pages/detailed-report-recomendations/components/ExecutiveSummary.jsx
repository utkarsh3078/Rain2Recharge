import React from 'react';
import Icon from '../../../components/AppIcon';

const ExecutiveSummary = ({ reportData }) => {
  const metrics = [
    {
      title: "Feasibility Score",
      value: reportData?.feasibilityScore,
      unit: "/100",
      icon: "Target",
      color: reportData?.feasibilityScore >= 80 ? "text-success" : reportData?.feasibilityScore >= 60 ? "text-warning" : "text-error",
      bgColor: reportData?.feasibilityScore >= 80 ? "bg-success/10" : reportData?.feasibilityScore >= 60 ? "bg-warning/10" : "bg-error/10"
    },
    {
      title: "Annual Water Savings",
      value: reportData?.waterSavings?.toLocaleString(),
      unit: "gallons",
      icon: "Droplets",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Investment Range",
      value: `₹${reportData?.costRange?.min?.toLocaleString()} - ₹${reportData?.costRange?.max?.toLocaleString()}`,
      unit: "",
      icon: "IndianRupee",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      title: "CO₂ Reduction",
      value: reportData?.co2Reduction,
      unit: "lbs/year",
      icon: "Leaf",
      color: "text-accent",
      bgColor: "bg-accent/10"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-elevation border border-border p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Executive Summary</h2>
          <p className="text-text-secondary">Key insights from your property assessment</p>
        </div>
        <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-lg">
          <Icon name="Calendar" size={16} className="text-primary" />
          <span className="text-sm font-medium text-primary">Generated: {new Date()?.toLocaleDateString()}</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {metrics?.map((metric, index) => (
          <div key={index} className="relative overflow-hidden">
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-border hover:shadow-soft transition-all duration-300">
              <div className={`w-12 h-12 ${metric?.bgColor} rounded-lg flex items-center justify-center mb-4`}>
                <Icon name={metric?.icon} size={24} className={metric?.color} />
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-text-secondary">{metric?.title}</p>
                <div className="flex items-baseline space-x-1">
                  <span className="text-2xl font-bold text-text-primary">{metric?.value}</span>
                  {metric?.unit && <span className="text-sm text-text-secondary">{metric?.unit}</span>}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl p-6 border border-primary/20">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="TrendingUp" size={24} color="white" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text-primary mb-2">Assessment Outcome</h3>
            <p className="text-text-secondary leading-relaxed">
              {reportData?.feasibilityScore >= 80 
                ? `Excellent potential for rainwater harvesting! Your property shows strong feasibility with optimal conditions for water collection and groundwater recharge. Expected ROI within ${reportData?.roiTimeline} years.`
                : reportData?.feasibilityScore >= 60
                ? `Good potential with some considerations. Your property has favorable conditions for rainwater harvesting with moderate implementation requirements. Expected ROI within ${reportData?.roiTimeline} years.`
                : `Limited potential identified. While rainwater harvesting is possible, your property may require additional modifications or alternative approaches for optimal results.`
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummary;