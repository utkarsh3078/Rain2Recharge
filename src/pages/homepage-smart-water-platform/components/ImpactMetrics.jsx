import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const ImpactMetrics = () => {
  const [counters, setCounters] = useState({
    gallonsSaved: 0,
    co2Reduced: 0,
    activeUsers: 0,
    projectsCompleted: 0
  });

  const targetValues = {
    gallonsSaved: 2847392,
    co2Reduced: 1456,
    activeUsers: 12847,
    projectsCompleted: 3294
  };

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const intervals = Object.keys(targetValues)?.map(key => {
      const target = targetValues?.[key];
      const increment = target / steps;
      let current = 0;
      let step = 0;

      return setInterval(() => {
        if (step < steps) {
          current += increment;
          setCounters(prev => ({
            ...prev,
            [key]: Math.floor(current)
          }));
          step++;
        }
      }, stepDuration);
    });

    return () => intervals?.forEach(clearInterval);
  }, []);

  const metrics = [
    {
      icon: 'Droplets',
      value: counters?.gallonsSaved?.toLocaleString(),
      label: 'Gallons Saved',
      suffix: '+',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      icon: 'Leaf',
      value: counters?.co2Reduced?.toLocaleString(),
      label: 'Tons CO₂ Reduced',
      suffix: '+',
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      icon: 'Users',
      value: counters?.activeUsers?.toLocaleString(),
      label: 'Active Users',
      suffix: '+',
      color: 'text-teal-600',
      bgColor: 'bg-teal-100'
    },
    {
      icon: 'CheckCircle',
      value: counters?.projectsCompleted?.toLocaleString(),
      label: 'Projects Completed',
      suffix: '+',
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            Real-Time Community Impact
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Join thousands of water-conscious individuals making a measurable difference 
            in environmental sustainability and water conservation.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics?.map((metric, index) => (
            <div
              key={metric?.label}
              className="relative bg-white rounded-2xl p-8 shadow-elevation hover:shadow-brand transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${metric?.bgColor} rounded-2xl mb-6`}>
                  <Icon name={metric?.icon} size={32} color={metric?.color?.replace('text-', 'var(--color-')} />
                </div>
                
                <div className="space-y-2">
                  <div className="text-3xl sm:text-4xl font-bold text-text-primary">
                    {metric?.value}
                    <span className={`text-2xl ${metric?.color}`}>{metric?.suffix}</span>
                  </div>
                  <p className="text-text-secondary font-medium">{metric?.label}</p>
                </div>
              </div>

              {/* Animated Border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 via-teal-400 to-green-400 opacity-0 hover:opacity-20 transition-opacity duration-300 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Live Update Indicator */}
        <div className="flex items-center justify-center mt-8 space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-text-secondary">Live updates every 5 minutes</span>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;