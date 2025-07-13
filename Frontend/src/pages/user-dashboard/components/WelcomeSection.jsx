import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

import ProfileEditModal from './ProfileEditModal';

const WelcomeSection = ({ user, setUser, stats }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleProfileClick = () => setModalOpen(true);
  const handleModalClose = () => setModalOpen(false);
  const handleProfileSave = (form) => {
    // TODO: Call API to update user profile
    if (setUser) setUser((prev) => ({ ...prev, ...form, avatar: form.avatar || prev.avatar }));
    setModalOpen(false);
  };

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <div className="flex items-center space-x-4 mb-4 md:mb-0">
          <button onClick={handleProfileClick} className="relative w-16 h-16 focus:outline-none">
            {user?.avatar && !user.avatar.includes('no_image') ? (
              <Image
                src={user.avatar}
                alt={user?.name || 'User'}
                className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
              />
            ) : (
              <div className="w-16 h-16 rounded-full border-2 border-primary-200 bg-primary-100 flex items-center justify-center text-3xl font-bold text-primary">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-surface flex items-center justify-center">
              <Icon name="Check" size={12} color="white" strokeWidth={3} />
            </div>
          </button>
          <div>
            <h2 className="font-heading text-2xl font-bold text-text-primary">
              {user?.name || 'User'}
            </h2>
            <p className="text-text-secondary">{user?.email || ''}</p>
            <div className="flex items-center space-x-2 mt-1">
              <Icon name="Crown" size={16} className="text-accent" strokeWidth={2} />
              <span className="text-sm font-medium text-accent">
                {user?.membershipTier || 'Member'}
              </span>
            </div>
          </div>
        </div>
        <ProfileEditModal
          user={user}
          open={modalOpen}
          onClose={handleModalClose}
          onSave={handleProfileSave}
        />
        
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <Icon name="Calendar" size={16} strokeWidth={2} />
          <span>Member since {user?.joinDate ? new Date(user.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long' }) : 'Unknown'}</span>
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