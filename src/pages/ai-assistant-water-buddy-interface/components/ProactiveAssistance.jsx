import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProactiveAssistance = ({ userLocation, systemType, onDismiss, onAccept }) => {
  const [currentSuggestion, setCurrentSuggestion] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const suggestions = [
    {
      id: 1,
      type: 'maintenance',
      title: 'Winter Maintenance Reminder',
      message: `It's getting cold in ${userLocation}! Time to winterize your ${systemType} system to prevent freeze damage.`,
      icon: 'Snowflake',priority: 'high',
      actions: [
        { label: 'Show Checklist', type: 'primary' },
        { label: 'Schedule Service', type: 'secondary' }
      ],
      season: 'winter'
    },
    {
      id: 2,
      type: 'optimization',title: 'Seasonal Optimization Tip',
      message: `Spring is here! Your ${systemType} system can be optimized for the upcoming rainy season.`,
      icon: 'Droplets',priority: 'medium',
      actions: [
        { label: 'Optimize Now', type: 'primary' },
        { label: 'Learn More', type: 'secondary' }
      ],
      season: 'spring'
    },
    {
      id: 3,
      type: 'regulatory',title: 'New Regulations Update',
      message: `New water conservation incentives are available in ${userLocation}. You might qualify for rebates!`,
      icon: 'FileText',priority: 'medium',
      actions: [
        { label: 'Check Eligibility', type: 'primary' },
        { label: 'Remind Later', type: 'secondary' }
      ],
      season: 'all'
    },
    {
      id: 4,
      type: 'efficiency',title: 'Performance Alert',message: `Your system efficiency has improved by 15% this month! Here's how to maintain this performance.`,
      icon: 'TrendingUp',
      priority: 'low',
      actions: [
        { label: 'View Report', type: 'primary' },
        { label: 'Share Success', type: 'secondary' }
      ],
      season: 'all'
    }
  ];

  useEffect(() => {
    // Simulate proactive suggestions based on time and context
    const showSuggestion = () => {
      const availableSuggestions = suggestions?.filter(s => 
        s?.season === 'all' || getCurrentSeason() === s?.season
      );
      
      if (availableSuggestions?.length > 0) {
        const randomSuggestion = availableSuggestions?.[Math.floor(Math.random() * availableSuggestions?.length)];
        setCurrentSuggestion(randomSuggestion);
        setIsVisible(true);
      }
    };

    const timer = setTimeout(showSuggestion, 3000);
    return () => clearTimeout(timer);
  }, [userLocation, systemType]);

  const getCurrentSeason = () => {
    const month = new Date()?.getMonth();
    if (month >= 2 && month <= 4) return 'spring';
    if (month >= 5 && month <= 7) return 'summer';
    if (month >= 8 && month <= 10) return 'fall';
    return 'winter';
  };

  const getPriorityColor = (priority) => {
    const colors = {
      high: 'from-red-500 to-red-600',
      medium: 'from-yellow-500 to-orange-500',
      low: 'from-green-500 to-green-600'
    };
    return colors?.[priority] || 'from-blue-500 to-blue-600';
  };

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) {
      onDismiss(currentSuggestion?.id);
    }
  };

  const handleAccept = (action) => {
    setIsVisible(false);
    if (onAccept) {
      onAccept(currentSuggestion?.id, action);
    }
  };

  if (!isVisible || !currentSuggestion) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-white rounded-2xl shadow-elevation border border-border overflow-hidden">
        {/* Header */}
        <div className={`p-4 bg-gradient-to-r ${getPriorityColor(currentSuggestion?.priority)} text-white`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                <Icon name={currentSuggestion?.icon} size={18} color="white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{currentSuggestion?.title}</h4>
                <span className="text-xs opacity-90 capitalize">{currentSuggestion?.type}</span>
              </div>
            </div>
            <button
              onClick={handleDismiss}
              className="p-1 hover:bg-white/20 rounded-lg transition-colors duration-200"
            >
              <Icon name="X" size={16} color="white" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-sm text-text-primary leading-relaxed mb-4">
            {currentSuggestion?.message}
          </p>

          {/* Actions */}
          <div className="flex space-x-2">
            {currentSuggestion?.actions?.map((action, index) => (
              <Button
                key={index}
                variant={action?.type === 'primary' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleAccept(action)}
                className={action?.type === 'primary' ? 'gradient-primary' : ''}
              >
                {action?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-muted border-t border-border">
          <div className="flex items-center justify-between text-xs text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Bot" size={12} />
              <span>WaterBuddy Assistant</span>
            </div>
            <span>{new Date()?.toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit',
              hour12: true 
            })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProactiveAssistance;