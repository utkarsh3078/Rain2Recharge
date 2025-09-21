import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressOverview = ({ progressData }) => {
  const ProgressBar = ({ label, percentage, color, icon }) => (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Icon name={icon} size={16} color={color} />
          <span className="text-sm font-medium text-text-primary">{label}</span>
        </div>
        <span className="text-sm font-bold text-text-primary">{percentage}%</span>
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className="h-2 rounded-full transition-all duration-500"
          style={{ 
            width: `${percentage}%`,
            backgroundColor: color
          }}
        />
      </div>
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-md border border-border p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="TrendingUp" size={24} color="var(--color-primary)" />
        <h2 className="text-xl font-bold text-text-primary">Progress Overview</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Progress Bars */}
        <div className="space-y-4">
          {progressData?.categories?.map((category, index) => (
            <ProgressBar
              key={index}
              label={category?.label}
              percentage={category?.percentage}
              color={category?.color}
              icon={category?.icon}
            />
          ))}
        </div>

        {/* Overall Score */}
        <div className="flex flex-col items-center justify-center p-6 bg-gradient-primary rounded-xl text-white">
          <div className="text-4xl font-bold mb-2">{progressData?.overallScore}</div>
          <div className="text-lg font-medium mb-1">Overall Progress</div>
          <div className="text-sm opacity-90">Sustainability Score</div>
          
          <div className="flex items-center gap-2 mt-4 bg-white/20 rounded-full px-3 py-1">
            <Icon name="Award" size={16} color="white" />
            <span className="text-sm font-medium">{progressData?.level}</span>
          </div>
        </div>
      </div>
      {/* Next Milestones */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <h3 className="font-semibold text-text-primary mb-3 flex items-center gap-2">
          <Icon name="Target" size={18} color="var(--color-primary)" />
          Next Milestones
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {progressData?.nextMilestones?.map((milestone, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${milestone?.bgColor}`}>
                <Icon name={milestone?.icon} size={16} color={milestone?.iconColor} />
              </div>
              <div>
                <div className="text-sm font-medium text-text-primary">{milestone?.title}</div>
                <div className="text-xs text-text-secondary">{milestone?.progress}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;