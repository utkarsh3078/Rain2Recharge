import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const InteractiveInfographics = () => {
  const [activeTab, setActiveTab] = useState('rainwater');

  const tabs = [
    {
      id: 'rainwater',
      label: 'Rainwater Harvesting',
      icon: 'CloudRain'
    },
    {
      id: 'groundwater',
      label: 'Groundwater Recharge',
      icon: 'ArrowDown'
    },
    {
      id: 'conservation',
      label: 'Water Conservation',
      icon: 'Droplets'
    }
  ];

  const rainwaterSteps = [
    {
      step: 1,
      title: "Collection",
      description: "Rainwater is collected from rooftops and surfaces",
      icon: "Home",
      color: "bg-blue-500"
    },
    {
      step: 2,
      title: "Filtration",
      description: "First flush diverters and filters remove debris",
      icon: "Filter",
      color: "bg-teal-500"
    },
    {
      step: 3,
      title: "Storage",
      description: "Clean water is stored in tanks for later use",
      icon: "Database",
      color: "bg-green-500"
    },
    {
      step: 4,
      title: "Distribution",
      description: "Water is distributed for irrigation and non-potable uses",
      icon: "Zap",
      color: "bg-purple-500"
    }
  ];

  const groundwaterSteps = [
    {
      step: 1,
      title: "Surface Preparation",
      description: "Permeable surfaces allow water infiltration",
      icon: "Layers",
      color: "bg-blue-500"
    },
    {
      step: 2,
      title: "Infiltration",
      description: "Water slowly penetrates through soil layers",
      icon: "ArrowDown",
      color: "bg-teal-500"
    },
    {
      step: 3,
      title: "Filtration",
      description: "Natural soil filtration purifies the water",
      icon: "Filter",
      color: "bg-green-500"
    },
    {
      step: 4,
      title: "Aquifer Recharge",
      description: "Clean water replenishes underground aquifers",
      icon: "Waves",
      color: "bg-purple-500"
    }
  ];

  const conservationSteps = [
    {
      step: 1,
      title: "Smart Monitoring",
      description: "IoT sensors track water usage patterns",
      icon: "Activity",
      color: "bg-blue-500"
    },
    {
      step: 2,
      title: "Leak Detection",
      description: "AI algorithms identify and alert about leaks",
      icon: "AlertTriangle",
      color: "bg-teal-500"
    },
    {
      step: 3,
      title: "Usage Optimization",
      description: "Automated systems optimize water distribution",
      icon: "Settings",
      color: "bg-green-500"
    },
    {
      step: 4,
      title: "Impact Tracking",
      description: "Real-time monitoring of conservation results",
      icon: "BarChart3",
      color: "bg-purple-500"
    }
  ];

  const getStepsForTab = (tabId) => {
    switch (tabId) {
      case 'rainwater':
        return rainwaterSteps;
      case 'groundwater':
        return groundwaterSteps;
      case 'conservation':
        return conservationSteps;
      default:
        return rainwaterSteps;
    }
  };

  const currentSteps = getStepsForTab(activeTab);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            How Smart Water Systems Work
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Explore interactive diagrams showing how rainwater harvesting, groundwater recharge, 
            and conservation technologies create sustainable water solutions.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-3 px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab?.id
                  ? 'bg-white text-slate-900 shadow-brand'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Icon name={tab?.icon} size={20} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Interactive Diagram */}
        <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Visual Representation */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-400/20 to-teal-400/20 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Animated Water Flow */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 bg-white/20 rounded-full flex items-center justify-center animate-pulse-gentle">
                      <Icon name={tabs?.find(t => t?.id === activeTab)?.icon} size={48} color="white" />
                    </div>
                  </div>

                  {/* Floating Elements */}
                  {currentSteps?.map((step, index) => {
                    const positions = [
                      'top-4 left-4',
                      'top-4 right-4',
                      'bottom-4 right-4',
                      'bottom-4 left-4'
                    ];
                    
                    return (
                      <div
                        key={step?.step}
                        className={`absolute ${positions?.[index]} w-12 h-12 ${step?.color} rounded-full flex items-center justify-center animate-pulse-gentle`}
                        style={{ animationDelay: `${index * 0.5}s` }}
                      >
                        <Icon name={step?.icon} size={20} color="white" />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Process Steps */}
            <div className="space-y-6">
              {currentSteps?.map((step, index) => (
                <div
                  key={step?.step}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className={`flex-shrink-0 w-12 h-12 ${step?.color} rounded-xl flex items-center justify-center`}>
                    <Icon name={step?.icon} size={20} color="white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-blue-200">Step {step?.step}</span>
                      <div className="h-px bg-blue-300/30 flex-1"></div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1">{step?.title}</h3>
                    <p className="text-blue-100">{step?.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits Summary */}
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/5 rounded-xl">
              <Icon name="TrendingUp" size={32} color="var(--color-success)" className="mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">Efficiency Increase</h4>
              <p className="text-blue-100">Up to 60% reduction in water consumption</p>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl">
              <Icon name="DollarSign" size={32} color="var(--color-warning)" className="mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">Cost Savings</h4>
              <p className="text-blue-100">Average $2,000+ annual savings</p>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl">
              <Icon name="Leaf" size={32} color="var(--color-secondary)" className="mx-auto mb-3" />
              <h4 className="text-lg font-semibold text-white mb-2">Environmental Impact</h4>
              <p className="text-blue-100">Significant CO₂ reduction and conservation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveInfographics;