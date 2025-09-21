import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ achievements }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Badges', icon: 'Award' },
    { id: 'water-savings', name: 'Water Savings', icon: 'Droplets' },
    { id: 'implementation', name: 'Implementation', icon: 'Wrench' },
    { id: 'community', name: 'Community', icon: 'Users' },
    { id: 'environmental', name: 'Environmental', icon: 'Leaf' }
  ];

  const filteredAchievements = selectedCategory === 'all' 
    ? achievements 
    : achievements?.filter(achievement => achievement?.category === selectedCategory);

  const getBadgeStyle = (tier) => {
    switch (tier) {
      case 'platinum':
        return 'bg-gradient-to-br from-gray-300 to-gray-500 text-white';
      case 'gold':
        return 'bg-gradient-to-br from-yellow-300 to-yellow-600 text-white';
      case 'silver':
        return 'bg-gradient-to-br from-gray-200 to-gray-400 text-gray-800';
      case 'bronze':
        return 'bg-gradient-to-br from-amber-600 to-amber-800 text-white';
      default:
        return 'bg-gradient-primary text-white';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md border border-border p-6 mb-6">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Award" size={24} color="var(--color-primary)" />
        <h2 className="text-xl font-bold text-text-primary">Achievements & Badges</h2>
      </div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => setSelectedCategory(category?.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
              selectedCategory === category?.id
                ? 'bg-primary text-primary-foreground shadow-brand'
                : 'bg-muted text-text-secondary hover:bg-hover hover:text-text-primary'
            }`}
          >
            <Icon name={category?.icon} size={16} />
            {category?.name}
          </button>
        ))}
      </div>
      {/* Achievement Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAchievements?.map((achievement, index) => (
          <div
            key={index}
            className={`relative p-4 rounded-xl text-center transition-all duration-300 hover:scale-105 cursor-pointer ${
              achievement?.earned 
                ? getBadgeStyle(achievement?.tier)
                : 'bg-muted text-text-secondary opacity-60'
            }`}
            title={achievement?.description}
          >
            {/* Badge Icon */}
            <div className={`w-16 h-16 mx-auto mb-3 rounded-full flex items-center justify-center ${
              achievement?.earned ? 'bg-white/20' : 'bg-white/10'
            }`}>
              <Icon 
                name={achievement?.icon} 
                size={32} 
                color={achievement?.earned ? 'currentColor' : 'var(--color-text-secondary)'} 
              />
            </div>

            {/* Badge Info */}
            <h3 className="font-bold text-sm mb-1">{achievement?.title}</h3>
            <p className="text-xs opacity-90 mb-2">{achievement?.shortDesc}</p>
            
            {/* Progress or Date */}
            {achievement?.earned ? (
              <div className="text-xs opacity-75">
                Earned {achievement?.earnedDate}
              </div>
            ) : (
              <div className="text-xs">
                {achievement?.progress}/{achievement?.target} {achievement?.unit}
              </div>
            )}

            {/* Tier Badge */}
            {achievement?.earned && achievement?.tier && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                <Icon 
                  name={achievement?.tier === 'platinum' ? 'Crown' : 'Star'} 
                  size={12} 
                  color="var(--color-warning)" 
                />
              </div>
            )}

            {/* New Badge Indicator */}
            {achievement?.isNew && (
              <div className="absolute -top-1 -left-1 w-3 h-3 bg-error rounded-full animate-pulse" />
            )}
          </div>
        ))}
      </div>
      {/* Achievement Summary */}
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-text-primary">
              {achievements?.filter(a => a?.earned)?.length}
            </div>
            <div className="text-xs text-text-secondary">Badges Earned</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">
              {achievements?.filter(a => a?.tier === 'gold' && a?.earned)?.length}
            </div>
            <div className="text-xs text-text-secondary">Gold Badges</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">
              {achievements?.filter(a => a?.category === 'water-savings' && a?.earned)?.length}
            </div>
            <div className="text-xs text-text-secondary">Water Saver</div>
          </div>
          <div>
            <div className="text-lg font-bold text-text-primary">
              {Math.round((achievements?.filter(a => a?.earned)?.length / achievements?.length) * 100)}%
            </div>
            <div className="text-xs text-text-secondary">Completion</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AchievementBadges;