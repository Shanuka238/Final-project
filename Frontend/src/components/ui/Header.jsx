import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    const userData = localStorage.getItem('userData');
    
    if (authStatus === 'true' && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    }
  }, []);

  const navigationItems = [
    { label: 'Home', path: '/landing-page', icon: 'Home' },
    { label: 'Book Event', path: '/event-booking-form', icon: 'Calendar' },
    { label: 'Event Packages', path: '/event-packages', icon: 'Package' },
    { label: 'Contact', path: '/contact-page', icon: 'MessageCircle' }
  ];

  const authenticatedItems = [
    { label: 'My Events', path: '/user-dashboard', icon: 'User' }
  ];

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    setIsAuthenticated(false);
    setUser(null);
    setIsMenuOpen(false);
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
          EventLux
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

            {/* Desktop Navigation */}
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
              
              {isAuthenticated && authenticatedItems.map((item) => (
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

            {/* Desktop Authentication */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-2 px-3 py-2 bg-primary-50 rounded-lg">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <Icon name="User" size={16} color="white" strokeWidth={2} />
                    </div>
                    <span className="text-sm font-medium text-primary">
                      {user?.name || 'User'}
                    </span>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 text-text-secondary hover:text-error transition-colors duration-200"
                  >
                    <Icon name="LogOut" size={18} strokeWidth={2} />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="nav-link px-4 py-2 rounded-lg hover:bg-primary-50 transition-all duration-200"
                  >
                    Login
                  </Link>
                  <Link
                    to="/event-booking-form"
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Icon name="Calendar" size={18} strokeWidth={2} />
                    <span>Book Now</span>
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
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

      {/* Mobile Menu Overlay */}
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
              
              {isAuthenticated && authenticatedItems.map((item) => (
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
                {isAuthenticated ? (
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-primary-50 rounded-lg">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                        <Icon name="User" size={20} color="white" strokeWidth={2} />
                      </div>
                      <div>
                        <p className="font-medium text-primary">{user?.name || 'User'}</p>
                        <p className="text-sm text-text-secondary">{user?.email || 'user@example.com'}</p>
                      </div>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-3 w-full p-3 text-error hover:bg-error-50 rounded-lg transition-all duration-200"
                    >
                      <Icon name="LogOut" size={20} strokeWidth={2} />
                      <span className="font-medium">Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <Link
                      to="/login"
                      onClick={handleMenuToggle}
                      className="flex items-center space-x-3 w-full p-3 text-text-secondary hover:bg-primary-50 hover:text-primary rounded-lg transition-all duration-200"
                    >
                      <Icon name="LogIn" size={20} strokeWidth={2} />
                      <span className="font-medium">Login</span>
                    </Link>
                    <Link
                      to="/event-booking-form"
                      onClick={handleMenuToggle}
                      className="btn-primary w-full flex items-center justify-center space-x-2"
                    >
                      <Icon name="Calendar" size={20} strokeWidth={2} />
                      <span>Book Event Now</span>
                    </Link>
                  </div>
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