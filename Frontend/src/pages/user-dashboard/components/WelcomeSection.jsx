import React from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const WelcomeSection = ({ user, stats }) => {
  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <div className="relative">
            <Image
              src={user?.avatar}
              alt={user?.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-surface flex items-center justify-center">
              <Icon name="Check" size={12} color="white" strokeWidth={3} />
            </div>
          </div>
          <div>
            <h2 className="font-heading text-2xl font-bold text-text-primary">
              {user?.name}
            </h2>
            <p className="text-text-secondary">{user?.email}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Icon name="Crown" size={16} className="text-accent" strokeWidth={2} />
              <span className="text-sm font-medium text-accent">
                {user?.membershipTier} Member
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Calendar" size={16} strokeWidth={2} />
          <span>Member since {new Date(user?.joinDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long' 
          })}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.id}
            className="flex items-center space-x-3 p-4 bg-surface-secondary rounded-lg border border-border hover:shadow-secondary transition-all duration-200"
          >
            <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <Icon name={stat.icon} size={24} className={stat.color} strokeWidth={2} />
            </div>
            <div>
              <p className="text-2xl font-bold text-text-primary">{stat.value}</p>
              <p className="text-sm text-text-secondary">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeSection;