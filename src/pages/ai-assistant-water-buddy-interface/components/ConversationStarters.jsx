import React from 'react';
import Icon from '../../../components/AppIcon';

const ConversationStarters = ({ onStarterClick, isVisible }) => {
  const starters = [
    {
      id: 1,
      text: "Help me choose a system",
      icon: "Settings",
      description: "Get personalized recommendations based on your property",
      category: "guidance"
    },
    {
      id: 2,
      text: "What\'s my ROI timeline?",
      icon: "TrendingUp",
      description: "Calculate return on investment for different systems",
      category: "financial"
    },
    {
      id: 3,
      text: "Find local installers",
      icon: "MapPin",
      description: "Connect with certified professionals in your area",
      category: "services"
    },
    {
      id: 4,
      text: "Seasonal maintenance tips",
      icon: "Calendar",
      description: "Learn how to maintain your system year-round",
      category: "maintenance"
    },
    {
      id: 5,
      text: "Check local regulations",
      icon: "FileText",
      description: "Understand permits and requirements in your area",
      category: "legal"
    },
    {
      id: 6,
      text: "System troubleshooting",
      icon: "AlertCircle",
      description: "Diagnose and fix common system issues",
      category: "support"
    }
  ];

  const getCategoryColor = (category) => {
    const colors = {
      guidance: "from-blue-500 to-blue-600",
      financial: "from-green-500 to-green-600",
      services: "from-purple-500 to-purple-600",
      maintenance: "from-orange-500 to-orange-600",
      legal: "from-red-500 to-red-600",
      support: "from-teal-500 to-teal-600"
    };
    return colors?.[category] || "from-gray-500 to-gray-600";
  };

  if (!isVisible) return null;

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 via-white to-teal-50 rounded-2xl border border-blue-100">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="Bot" size={32} color="white" />
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">
          Hi! I'm WaterBuddy 💧
        </h3>
        <p className="text-text-secondary">
          Your AI assistant for smart water sustainability decisions. How can I help you today?
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {starters?.map((starter) => (
          <button
            key={starter?.id}
            onClick={() => onStarterClick(starter?.text)}
            className="group p-4 bg-white rounded-xl border border-border hover:border-primary/30 hover:shadow-brand transition-all duration-300 text-left"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 bg-gradient-to-r ${getCategoryColor(starter?.category)} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                <Icon name={starter?.icon} size={20} color="white" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-text-primary group-hover:text-primary transition-colors duration-200">
                  {starter?.text}
                </div>
                <div className="text-sm text-text-secondary mt-1 line-clamp-2">
                  {starter?.description}
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 p-4 bg-gradient-to-r from-primary/5 to-accent/5 rounded-xl border border-primary/10">
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Shield" size={16} color="var(--color-primary)" />
          <span>Your conversations are private and secure</span>
        </div>
      </div>
    </div>
  );
};

export default ConversationStarters;