import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

import PackageCard from './components/PackageCard';
import PackageComparison from './components/PackageComparison';
import FilterPanel from './components/FilterPanel';

const EventPackages = () => {
  const [packages, setPackages] = useState([]);
  const [filteredPackages, setFilteredPackages] = useState([]);
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [showComparison, setShowComparison] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('popularity');
  const [filters, setFilters] = useState({
    budgetRange: 'all',
    eventType: 'all',
    features: []
  });

  // Mock data for packages
  const mockPackages = [
    {
      id: 1,
      title: "Premium Wedding Package",
      type: "wedding",
      priceRange: "$5,000 - $8,000",
      price: 6500,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 127,
      availability: "available",
      features: ["Full Event Planning", "Venue Decoration", "Photography", "Catering Coordination", "Bridal Suite", "Wedding Cake"],
      description: `Our Premium Wedding Package offers comprehensive planning services for your dream wedding. From venue selection to the final dance, we handle every detail with precision and care.

Includes full-day coordination, premium decorations, professional photography coverage, and personalized wedding planning consultation.`,
      timeline: "6-12 months planning period",
      isPopular: true,
      isFavorite: false
    },
    {
      id: 2,
      title: "Birthday Celebration Deluxe",
      type: "birthday",
      priceRange: "$800 - $1,500",
      price: 1200,
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=300&fit=crop",
      rating: 4.7,
      reviewCount: 89,
      availability: "limited",
      features: ["Theme Decoration", "Entertainment", "Custom Cake", "Party Favors", "Photography", "Music System"],
      description: `Make birthdays unforgettable with our Deluxe Birthday Package. Perfect for milestone celebrations and special occasions.

Features themed decorations, professional entertainment, custom birthday cake design, and complete party coordination.`,
      timeline: "2-4 weeks planning period",
      isPopular: false,
      isFavorite: false
    },
    {
      id: 3,
      title: "Corporate Event Excellence",
      type: "corporate",
      priceRange: "$3,000 - $6,000",
      price: 4500,
      image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?w=400&h=300&fit=crop",
      rating: 4.8,
      reviewCount: 156,
      availability: "available",
      features: ["Professional Setup", "AV Equipment", "Catering", "Registration Management", "Networking Areas", "Branded Materials"],
      description: `Elevate your corporate events with our Excellence Package. Designed for conferences, seminars, product launches, and corporate celebrations.

Includes professional staging, complete AV setup, catering coordination, and dedicated event management team.`,
      timeline: "4-8 weeks planning period",
      isPopular: true,
      isFavorite: false
    },
    {
      id: 4,
      title: "Intimate Garden Party",
      type: "custom",
      priceRange: "$1,200 - $2,500",
      price: 1800,
      image: "https://images.pixabay.com/photo/2017/07/21/23/57/concert-2526990_1280.jpg?w=400&h=300&fit=crop",
      rating: 4.6,
      reviewCount: 73,
      availability: "available",
      features: ["Outdoor Setup", "Garden Decoration", "Ambient Lighting", "Refreshments", "Live Music", "Weather Backup"],
      description: `Create magical outdoor experiences with our Garden Party Package. Perfect for intimate gatherings, anniversary celebrations, and special occasions.

Features beautiful garden decorations, ambient lighting setup, live acoustic music, and complete weather contingency planning.`,
      timeline: "3-6 weeks planning period",
      isPopular: false,
      isFavorite: false
    },
    {
      id: 5,
      title: "Luxury Anniversary Celebration",
      type: "anniversary",
      priceRange: "$2,000 - $4,000",
      price: 3000,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop",
      rating: 4.9,
      reviewCount: 94,
      availability: "available",
      features: ["Romantic Setup", "Fine Dining", "Live Entertainment", "Personalized Decor", "Photography", "Memory Book"],
      description: `Celebrate love milestones with our Luxury Anniversary Package. Designed to create unforgettable romantic experiences for couples.

Includes elegant romantic setup, fine dining experience, live entertainment, and personalized memory creation services.`,
      timeline: "4-6 weeks planning period",
      isPopular: false,
      isFavorite: false
    },
    {
      id: 6,
      title: "Kids Party Extravaganza",
      type: "birthday",
      priceRange: "$500 - $1,000",
      price: 750,
      image: "https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?w=400&h=300&fit=crop",
      rating: 4.5,
      reviewCount: 112,
      availability: "available",
      features: ["Character Entertainment", "Games & Activities", "Themed Decorations", "Kid-Friendly Menu", "Party Bags", "Face Painting"],
      description: `Make your child's birthday magical with our Kids Party Extravaganza. Featuring beloved characters, exciting games, and age-appropriate entertainment.

Includes professional character entertainment, interactive games, themed decorations, and complete party coordination.`,
      timeline: "2-3 weeks planning period",
      isPopular: true,
      isFavorite: false
    }
  ];

  useEffect(() => {
    setPackages(mockPackages);
    setFilteredPackages(mockPackages);
  }, []);

  useEffect(() => {
    let filtered = [...packages];

    // Apply filters
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

    // Apply sorting
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
      pkg.id === packageId ? { ...pkg, isFavorite: !pkg.isFavorite } : pkg
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

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb */}
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

      {/* Header Section */}
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

      {/* Filter and Sort Controls */}
      <div className="sticky top-16 z-40 bg-surface/95 backdrop-blur-sm border-b border-border shadow-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Mobile Filter Chips */}
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

            {/* Desktop Filters */}
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

            {/* Sort and Results */}
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

      {/* Comparison Bar */}
      {selectedPackages.length > 0 && (
        <div className="sticky top-32 z-30 bg-primary text-white py-3 shadow-accent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Icon name="GitCompare" size={20} strokeWidth={2} />
                <span className="font-medium">
                  {selectedPackages.length} package{selectedPackages.length > 1 ? 's' : ''} selected for comparison
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setShowComparison(true)}
                  className="px-4 py-2 bg-white text-primary rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200"
                >
                  Compare Now
                </button>
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

      {/* Packages Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredPackages.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Icon name="Package" size={48} className="text-primary" strokeWidth={1.5} />
            </div>
            <h3 className="font-heading text-2xl font-semibold text-text-primary mb-4">
              No packages found
            </h3>
            <p className="text-text-secondary mb-6 max-w-md mx-auto">
              Try adjusting your filters or browse all available packages
            </p>
            <button
              onClick={clearFilters}
              className="btn-primary"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                package={pkg}
                isSelected={selectedPackages.includes(pkg.id)}
                onSelect={() => handlePackageSelect(pkg.id)}
                onFavoriteToggle={() => handleFavoriteToggle(pkg.id)}
                canSelect={selectedPackages.length < 3 || selectedPackages.includes(pkg.id)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Mobile Filter Panel */}
      {showFilters && (
        <FilterPanel
          filters={filters}
          onFilterChange={handleFilterChange}
          onClose={() => setShowFilters(false)}
          packages={packages}
        />
      )}

      {/* Package Comparison Modal */}
      {showComparison && selectedPackages.length > 0 && (
        <PackageComparison
          packages={packages.filter(pkg => selectedPackages.includes(pkg.id))}
          onClose={() => setShowComparison(false)}
        />
      )}
    </div>
  );
};

export default EventPackages;