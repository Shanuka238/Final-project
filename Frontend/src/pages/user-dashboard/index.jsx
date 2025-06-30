import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

import WelcomeSection from './components/WelcomeSection';
import UpcomingEvents from './components/UpcomingEvents';
import BookingManagement from './components/BookingManagement';
import FavoritesSection from './components/FavoritesSection';
import CalendarWidget from './components/CalendarWidget';
import RecentActivity from './components/RecentActivity';

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock user data
  const mockUser = {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    joinDate: "2024-01-15",
    totalBookings: 8,
    upcomingEvents: 3,
    savedPackages: 12,
    membershipTier: "Premium"
  };

  // Mock dashboard stats
  const dashboardStats = [
    {
      id: 1,
      label: "Upcoming Events",
      value: 3,
      icon: "Calendar",
      color: "text-primary",
      bgColor: "bg-primary-50"
    },
    {
      id: 2,
      label: "Total Bookings",
      value: 8,
      icon: "CheckCircle",
      color: "text-success",
      bgColor: "bg-success-50"
    },
    {
      id: 3,
      label: "Saved Packages",
      value: 12,
      icon: "Heart",
      color: "text-accent",
      bgColor: "bg-accent-50"
    },
    {
      id: 4,
      label: "Messages",
      value: 5,
      icon: "MessageCircle",
      color: "text-warning",
      bgColor: "bg-warning-50"
    }
  ];

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'events', label: 'My Events', icon: 'Calendar' },
    { id: 'bookings', label: 'Bookings', icon: 'FileText' },
    { id: 'favorites', label: 'Favorites', icon: 'Heart' },
    { id: 'messages', label: 'Messages', icon: 'MessageCircle' }
  ];

  useEffect(() => {
    // Simulate loading user data
    const timer = setTimeout(() => {
      setUser(mockUser);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-text-secondary">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            <WelcomeSection user={user} stats={dashboardStats} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <UpcomingEvents />
                <RecentActivity />
              </div>
              <div className="space-y-8">
                <CalendarWidget />
                <FavoritesSection />
              </div>
            </div>
          </div>
        );
      case 'events':
        return <UpcomingEvents showAll={true} />;
      case 'bookings':
        return <BookingManagement />;
      case 'favorites':
        return <FavoritesSection showAll={true} />;
      case 'messages':
        return (
          <div className="card">
            <div className="text-center py-12">
              <Icon name="MessageCircle" size={64} className="text-text-tertiary mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold text-text-primary mb-2">
                Messages Coming Soon
              </h3>
              <p className="text-text-secondary mb-6">
                Direct messaging with event planners will be available soon.
              </p>
              <Link to="/contact-page" className="btn-primary">
                Contact Support
              </Link>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="font-heading text-3xl font-bold text-text-primary">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-text-secondary mt-1">
                Manage your events and bookings from your personal dashboard
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                to="/event-booking-form"
                className="btn-primary flex items-center space-x-2"
              >
                <Icon name="Plus" size={20} strokeWidth={2} />
                <span>New Event</span>
              </Link>
              <Link
                to="/event-packages"
                className="btn-secondary flex items-center space-x-2"
              >
                <Icon name="Package" size={20} strokeWidth={2} />
                <span>Browse Packages</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="border-b border-border">
            <nav className="flex space-x-8 overflow-x-auto">
              {navigationTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors duration-200 ${
                    activeTab === tab.id
                      ? 'border-primary text-primary' :'border-transparent text-text-secondary hover:text-text-primary hover:border-border-secondary'
                  }`}
                >
                  <Icon name={tab.icon} size={18} strokeWidth={2} />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;