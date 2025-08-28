import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import { useAuth } from 'contexts/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;

  const baseNavigation = [
    { label: 'Home', path: '/landing-page', icon: 'Home' },
    { label: 'Book Event', path: '/event-booking-form', icon: 'Calendar' },
    { label: 'Event Packages', path: '/event-packages', icon: 'Package' },
    { label: 'Contact', path: '/contact-page', icon: 'MessageCircle' },
    { label: 'About', path: '/about', icon: 'Info' }
  ];

  let navigationItems = [...baseNavigation];
  if (isLoggedIn) {
    if (user.role === 'admin') {
      navigationItems = [
        { label: 'Admin Dashboard', path: '/admin-dashboard', icon: 'Shield' }
      ];
    } else if (user.role === 'staff') {
      navigationItems = [
        { label: 'Staff Dashboard', path: '/staff-dashboard', icon: 'Briefcase' }
      ];
    } else {
      navigationItems = [
        { label: 'My Events', path: '/user-dashboard', icon: 'User' },
        ...baseNavigation
      ];
    }
  }

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const Logo = () => (
    <Link to="/landing-page" className="flex items-center space-x-2 group">
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-primary transition-transform duration-200 group-hover:scale-105">
        <Icon name="Sparkles" size={26} color="white" strokeWidth={2} />
      </div>
      <div className="flex flex-col">
        <span className="font-heading font-bold text-xl text-primary group-hover:text-primary-700 transition-colors duration-200">
          Party Nest
        </span>
        <span className="font-body text-xs text-text-secondary -mt-1">
          Premium Events
        </span>
      </div>
    </Link>
  );

  return (
    <>
      <header className="sticky top-0 z-50 bg-surface/95 backdrop-blur-sm border-b border-border shadow-secondary">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Logo />

            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-link flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-primary-50 ${
                    isActivePath(item.path) ? 'nav-link-active bg-primary-50' : ''
                  }`}
                >
                  <Icon name={item.icon} size={18} strokeWidth={2} />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {!isLoggedIn && (
                <>
                  <Link to="/login" className="btn-primary px-4 py-2 rounded-lg font-medium">Login</Link>
                  <Link to="/register" className="btn-secondary px-4 py-2 rounded-lg font-medium">Register</Link>
                </>
              )}
              {isLoggedIn && (
                <button onClick={logout} className="btn-secondary px-4 py-2 rounded-lg font-medium">Logout</button>
              )}
            </div>

            <button
              onClick={handleMenuToggle}
              className="md:hidden p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
              aria-label="Toggle menu"
            >
              <Icon 
                name={isMenuOpen ? "X" : "Menu"} 
                size={24} 
                strokeWidth={2}
                className="text-text-primary"
              />
            </button>
          </div>
        </nav>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleMenuToggle} />
          <div className="fixed top-0 right-0 w-80 h-full bg-surface shadow-accent animate-slide-in">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <Logo />
              <button
                onClick={handleMenuToggle}
                className="p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
              >
                <Icon name="X" size={24} strokeWidth={2} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={handleMenuToggle}
                  className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 hover:bg-primary-50 ${
                    isActivePath(item.path) ? 'bg-primary-50 text-primary font-semibold' : 'text-text-secondary'
                  }`}
                >
                  <Icon name={item.icon} size={20} strokeWidth={2} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}

              <div className="pt-4 border-t border-border">
                {!isLoggedIn && (
                  <>
                    <Link to="/login" className="btn-primary w-full block text-center my-2">Login</Link>
                    <Link to="/register" className="btn-secondary w-full block text-center my-2">Register</Link>
                  </>
                )}
                {isLoggedIn && (
                  <button onClick={logout} className="btn-secondary w-full block text-center my-2">Logout</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;