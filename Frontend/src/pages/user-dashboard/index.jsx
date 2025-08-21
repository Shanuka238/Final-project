
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from 'contexts/AuthContext';

import Icon from 'components/AppIcon';
import { fetchUserBookings, fetchUserUpcomingEvents, fetchUserFavorites } from 'api/dashboard';
import { fetchUserPackages } from 'api/dashboard';
import { fetchUserProfile } from 'api/profile';
import { getToken } from 'utils/auth';

import WelcomeSection from './components/WelcomeSection';
import UpcomingEvents from './components/UpcomingEvents';
import BookingManagement from './components/BookingManagement';
import FavoritesSection from './components/FavoritesSection';
import MyPackagesSection from './components/MyPackagesSection';
import CalendarWidget from './components/CalendarWidget';
import RecentActivity from './components/RecentActivity';


const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const isLoaded = !!user;
  const [stats, setStats] = useState({ events: 0, bookings: 0, favorites: 0, packages: 0 });
  const [dashboardUser, setDashboardUser] = useState(null);

  useEffect(() => {
    if (isLoaded && user && user.id) {
      Promise.all([
        fetchUserUpcomingEvents(user.id),
        fetchUserBookings(user.id),
        fetchUserFavorites(user.id),
        fetchUserPackages(user.id)
      ]).then(([events, bookings, favorites, userPackages]) => {
        setStats({
          events: events.length,
          bookings: bookings.length,
          favorites: favorites.length,
          packages: userPackages.length
        });
        setIsLoading(false);
      }).catch(() => {
        setStats({ events: 0, bookings: 0, favorites: 0, packages: 0 });
        setIsLoading(false);
      });
    }
  }, [isLoaded, user]);

  const dashboardStats = [
    {
      id: 1,
      label: "Upcoming Events",
      value: stats.events,
      icon: "Calendar",
      color: "text-primary",
      bgColor: "bg-primary-50"
    },
    {
      id: 2,
      label: "Total Bookings",
      value: stats.bookings,
      icon: "CheckCircle",
      color: "text-success",
      bgColor: "bg-success-50"
    },
    {
      id: 3,
      label: "Saved Packages",
      value: stats.favorites,
      icon: "Heart",
      color: "text-accent",
      bgColor: "bg-accent-50"
    },
    {
      id: 4,
      label: "Selected packages",
      value: stats.packages, 
      icon: "Package",
      color: "text-accent",
      bgColor: "bg-accent-50"
    }
  ];

  const navigationTabs = [
    { id: 'overview', label: 'Overview', icon: 'LayoutDashboard' },
    { id: 'events', label: 'My Events', icon: 'Calendar' },
    { id: 'bookings', label: 'Bookings', icon: 'FileText' },
    { id: 'favorites', label: 'Favorites', icon: 'Heart' },
    { id: 'my-packages', label: 'My Packages', icon: 'Package' }
  ];

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();
        const profile = await fetchUserProfile(token);
        setDashboardUser(prev => ({
          id: profile._id || profile.id,
          name: profile.username || profile.name || 'User',
          email: profile.email || '',
          joinDate: prev?.joinDate || (profile.createdAt ? new Date(profile.createdAt).toISOString().split('T')[0] : ''),
          totalBookings: 0,
          upcomingEvents: 0,
          savedPackages: 0,
          membershipTier: profile.role ? profile.role.charAt(0).toUpperCase() + profile.role.slice(1) : 'Member',
        }));
      } catch {
        setDashboardUser(null);
      }
    };
    if (user) fetchProfile();
  }, [user]);

  useEffect(() => {
    if (isLoaded) setIsLoading(false);
  }, [isLoaded]);

  const [selectedServices, setSelectedServices] = useState([]);
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
            <WelcomeSection user={dashboardUser} setUser={setDashboardUser} stats={dashboardStats} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <UpcomingEvents user={dashboardUser} setActiveTab={setActiveTab} />
                <RecentActivity user={dashboardUser} />
              </div>
              <div className="space-y-8">
                <CalendarWidget user={dashboardUser} />
                <FavoritesSection user={dashboardUser} />
              </div>
            </div>
          </div>
        );
      case 'events':
        return <UpcomingEvents showAll={true} user={dashboardUser} setActiveTab={setActiveTab} />;
      case 'bookings':
        return <BookingManagement user={dashboardUser} />;
      case 'favorites':
        return <FavoritesSection showAll={true} user={dashboardUser} />;
      case 'my-packages':
        return <MyPackagesSection user={dashboardUser} />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="min-h-screen bg-background"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="mb-4 sm:mb-0">
              <h1 className="font-heading text-3xl font-bold text-text-primary">
                Welcome back, {dashboardUser?.name}!
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

        <div className="animate-fade-in">
          {renderTabContent()}
        </div>
      </div>
    </motion.div>
  );
};

export default UserDashboard;