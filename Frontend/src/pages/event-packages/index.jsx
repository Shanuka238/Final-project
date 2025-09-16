import React, { useState, useEffect } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import { motion } from 'framer-motion';
import PackageCard from './components/PackageCard';
import PackageBookingPopup from './components/PackageBookingPopup';
import FilterPanel from './components/FilterPanel';
import NotLoggedIn from './components/NotLoggedIn';

import { bookUserPackage } from 'api/dashboard';
import CenterPopup from 'components/CenterPopup';

const EventPackages = () => {
  const { user } = useAuth();
  if (!user) {
    return <NotLoggedIn />;
  }

  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [bookingPopupPkg, setBookingPopupPkg] = useState(null);
  const [sortBy, setSortBy] = useState('popularity');
  const [filters, setFilters] = useState({
    budgetRange: 'all',
    eventType: 'all',
    features: []
  });
  const [loading, setLoading] = useState(true);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_API_URL}/api/packages`)
      .then(res => res.json())
      .then(data => {
        setPackages(data);
        setFilteredPackages(data);
        setLoading(false);
      })
      .catch(() => {
        setPackages([]);
        setFilteredPackages([]);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = [...packages];

    if (filters.eventType !== 'all') {
      filtered = filtered.filter(pkg => pkg.type === filters.eventType);
    }

    if (filters.budgetRange !== 'all') {
      const budgetRanges = {
        'under-1000': [0, 1000],
        '1000-3000': [1000, 3000],
        '3000-5000': [3000, 5000],
        'over-5000': [5000, Infinity]
      };
      const [min, max] = budgetRanges[filters.budgetRange];
      filtered = filtered.filter(pkg => pkg.price >= min && pkg.price <= max);
    }

    if (filters.features.length > 0) {
      filtered = filtered.filter(pkg => 
        filters.features.some(feature => pkg.features.includes(feature))
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'popularity':
      default:
        filtered.sort((a, b) => {
          if (a.isPopular && !b.isPopular) return -1;
          if (!a.isPopular && b.isPopular) return 1;
          return b.reviewCount - a.reviewCount;
        });
        break;
    }

    setFilteredPackages(filtered);
  }, [packages, filters, sortBy]);

  const handlePackageSelect = (packageId) => {
    setSelectedPackages(prev => {
      if (prev.includes(packageId)) {
        return prev.filter(id => id !== packageId);
      } else if (prev.length < 3) {
        return [...prev, packageId];
      }
      return prev;
    });
  };

  const handleFavoriteToggle = (packageId) => {
    setPackages(prev => prev.map(pkg => 
      (pkg._id === packageId || pkg.id === packageId) ? { ...pkg, isFavorite: true } : pkg
    ));
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      budgetRange: 'all',
      eventType: 'all',
      features: []
    });
  };

  const breadcrumbItems = [
    { label: 'Home', path: '/landing-page' },
    { label: 'Booking', path: '/event-booking-form' },
    { label: 'Packages', path: '/event-packages', current: true }
  ];

  const handleBookPackage = (pkg) => {
    setBookingPopupPkg(pkg);
  };

  const handleBookSubmit = async (bookingData) => {
    if (!user || !user.id) {
      setBookingPopupPkg(null);
      return;
    }

    const packagePayload = {
      ...bookingData,
      price: bookingData.budget, 
      packageId: bookingPopupPkg._id || bookingPopupPkg.id,
      packageTitle: bookingPopupPkg.title,
    };
    try {
      await bookUserPackage(user.id, packagePayload);
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
      }, 1800);
    } catch (e) {
    }
    setBookingPopupPkg(null);
  };

  return (
    <>
      <CenterPopup
        message={showSuccessPopup ? 'Event package booked successfully!' : ''}
        onClose={() => setShowSuccessPopup(false)}
      />
      <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="min-h-screen bg-background"
    >
      <div className="bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            {breadcrumbItems.map((item, index) => (
              <React.Fragment key={item.path}>
                {index > 0 && (
                  <Icon name="ChevronRight" size={16} className="text-text-tertiary" strokeWidth={2} />
                )}
                {item.current ? (
                  <span className="text-primary font-medium">{item.label}</span>
                ) : (
                  <Link 
                    to={item.path} 
                    className="text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                )}
              </React.Fragment>
            ))}
          </nav>
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary-50 to-accent-50 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
              Event Packages
            </h1>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
              Choose from our carefully curated event packages designed to make your special occasions unforgettable
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="Shield" size={20} className="text-success" strokeWidth={2} />
                <span>100% Satisfaction Guaranteed</span>
              </div>
              <div className="flex items-center space-x-2 text-text-secondary">
                <Icon name="Clock" size={20} className="text-accent" strokeWidth={2} />
                <span>24/7 Support Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-40 bg-surface/95 backdrop-blur-sm border-b border-border shadow-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="lg:hidden">
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                <button
                  onClick={() => setShowFilters(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-white rounded-full whitespace-nowrap"
                >
                  <Icon name="Filter" size={16} strokeWidth={2} />
                  <span>All Filters</span>
                </button>
                {filters.eventType !== 'all' && (
                  <span className="px-3 py-1 bg-primary-100 text-primary rounded-full text-sm whitespace-nowrap">
                    {filters.eventType}
                  </span>
                )}
                {filters.budgetRange !== 'all' && (
                  <span className="px-3 py-1 bg-accent-100 text-accent-700 rounded-full text-sm whitespace-nowrap">
                    Budget: {filters.budgetRange}
                  </span>
                )}
              </div>
            </div>

            <div className="hidden lg:flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={20} className="text-text-secondary" strokeWidth={2} />
                <span className="text-text-secondary font-medium">Filters:</span>
              </div>
              
              <select
                value={filters.eventType}
                onChange={(e) => handleFilterChange({ ...filters, eventType: e.target.value })}
                className="input-field py-2 px-3 text-sm min-w-[140px]"
              >
                <option value="all">All Events</option>
                <option value="wedding">Wedding</option>
                <option value="birthday">Birthday</option>
                <option value="corporate">Corporate</option>
                <option value="anniversary">Anniversary</option>
                <option value="custom">Custom</option>
              </select>

              <select
                value={filters.budgetRange}
                onChange={(e) => handleFilterChange({ ...filters, budgetRange: e.target.value })}
                className="input-field py-2 px-3 text-sm min-w-[140px]"
              >
                <option value="all">All Budgets</option>
                <option value="under-1000">Under $1,000</option>
                <option value="1000-3000">$1,000 - $3,000</option>
                <option value="3000-5000">$3,000 - $5,000</option>
                <option value="over-5000">Over $5,000</option>
              </select>

              {(filters.eventType !== 'all' || filters.budgetRange !== 'all' || filters.features.length > 0) && (
                <button
                  onClick={clearFilters}
                  className="text-text-secondary hover:text-primary transition-colors duration-200 text-sm"
                >
                  Clear All
                </button>
              )}
            </div>

            <div className="flex items-center justify-between lg:justify-end space-x-4">
              <span className="text-text-secondary text-sm">
                {filteredPackages.length} packages found
              </span>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="input-field py-2 px-3 text-sm min-w-[120px]"
              >
                <option value="popularity">Most Popular</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {selectedPackages.length > 0 && (
        <div className="sticky top-32 z-30 bg-primary text-white py-3 shadow-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="GitCompare" size={20} strokeWidth={2} />
                <span className="font-medium">
                  {selectedPackages.length} package{selectedPackages.length > 1 ? 's' : ''} selected
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setSelectedPackages([])}
                  className="p-2 hover:bg-primary-700 rounded-lg transition-colors duration-200"
                >
                  <Icon name="X" size={20} strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-16 text-xl text-text-secondary">Loading event packages...</div>
        ) : filteredPackages.length === 0 ? (
          <div className="text-center py-16 text-xl text-text-secondary">No event packages found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard
                key={pkg._id || pkg.id}
                package={pkg}
                isSelected={selectedPackages.includes(pkg._id || pkg.id)}
                onSelect={() => handlePackageSelect(pkg._id || pkg.id)}
                onFavoriteToggle={handleFavoriteToggle}
                canSelect={selectedPackages.length < 3 || selectedPackages.includes(pkg._id || pkg.id)}
                onBook={() => handleBookPackage(pkg)}
              />
            ))}
          </div>
        )}
      </div>

      {showFilters && (
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onClose={() => setShowFilters(false)}
          packages={packages}
        />
      )}
      {bookingPopupPkg && (
        <PackageBookingPopup
          pkg={bookingPopupPkg}
          onClose={() => setBookingPopupPkg(null)}
          onBook={handleBookSubmit}
        />
      )}
      </motion.div>
    </>
  );
};

export default EventPackages;