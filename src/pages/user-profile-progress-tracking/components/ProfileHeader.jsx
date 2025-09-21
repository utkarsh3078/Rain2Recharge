import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfileHeader = ({ user, stats }) => {
  return (
    <div className="bg-white rounded-xl shadow-md border border-border p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Profile Info */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-20 h-20 rounded-full object-cover border-4 border-primary/20"
            />
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-success rounded-full flex items-center justify-center border-4 border-white">
              <Icon name="Check" size={16} color="white" />
            </div>
          </div>
          
          <div>
            <h1 className="text-2xl font-bold text-text-primary">{user?.name}</h1>
            <p className="text-text-secondary">{user?.email}</p>
            <div className="flex items-center gap-2 mt-1">
              <Icon name="MapPin" size={16} color="var(--color-text-secondary)" />
              <span className="text-sm text-text-secondary">{user?.location}</span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Icon name="Calendar" size={16} color="var(--color-text-secondary)" />
              <span className="text-sm text-text-secondary">Member since {user?.joinDate}</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center p-3 bg-muted rounded-lg">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-2 ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={20} color={stat?.iconColor} />
              </div>
              <div className="text-lg font-bold text-text-primary">{stat?.value}</div>
              <div className="text-xs text-text-secondary">{stat?.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;