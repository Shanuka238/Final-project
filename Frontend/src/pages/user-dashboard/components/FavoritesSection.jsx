import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const FavoritesSection = ({ showAll = false }) => {
  const [activeCategory, setActiveCategory] = useState('packages');

  const mockFavoritePackages = [
    {
      id: 1,
      name: "Luxury Wedding Package",
      type: "Wedding",
      price: 15000,
      originalPrice: 18000,
      image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=250&fit=crop",
      rating: 4.9,
      reviews: 127,
      features: ["Full Planning", "Decoration", "Catering", "Photography"],
      savedDate: "2024-03-15",
      isPopular: true
    },
    {
      id: 2,
      name: "Corporate Elite Package",
      type: "Corporate",
      price: 25000,
      originalPrice: 28000,
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=250&fit=crop",
      rating: 4.8,
      reviews: 89,
      features: ["Event Management", "AV Equipment", "Catering", "Networking"],
      savedDate: "2024-03-10",
      isPopular: false
    },
    {
      id: 3,
      name: "Birthday Celebration Package",
      type: "Birthday",
      price: 3500,
      originalPrice: 4000,
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=250&fit=crop",
      rating: 4.7,
      reviews: 156,
      features: ["Decoration", "Entertainment", "Cake", "Photography"],
      savedDate: "2024-03-08",
      isPopular: true
    }
  ];

  const mockFavoriteVenues = [
    {
      id: 1,
      name: "Grand Ballroom Hotel",
      location: "Downtown District",
      capacity: "200-500 guests",
      price: 5000,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400&h=250&fit=crop",
      rating: 4.9,
      reviews: 234,
      amenities: ["Parking", "Catering Kitchen", "AV Equipment", "Bridal Suite"],
      savedDate: "2024-03-12"
    },
    {
      id: 2,
      name: "Rooftop Garden Venue",
      location: "City Center",
      capacity: "50-150 guests",
      price: 3000,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=250&fit=crop",
      rating: 4.8,
      reviews: 178,
      amenities: ["Outdoor Space", "City Views", "Bar Area", "Dance Floor"],
      savedDate: "2024-03-05"
    }
  ];

  const categories = [
    { id: 'packages', label: 'Packages', count: mockFavoritePackages.length },
    { id: 'venues', label: 'Venues', count: mockFavoriteVenues.length }
  ];

  const handleRemoveFavorite = (id, type) => {
    // In a real app, this would update the state/database
    console.log(`Removing ${type} with id ${id} from favorites`);
  };

  const renderPackageCard = (pkg) => (
    <div key={pkg.id} className="border border-border rounded-xl overflow-hidden hover:shadow-secondary transition-all duration-200">
      <div className="relative">
        <Image
          src={pkg.image}
          alt={pkg.name}
          className="w-full h-48 object-cover"
        />
        {pkg.isPopular && (
          <div className="absolute top-3 left-3 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">
            Popular
          </div>
        )}
        <button
          onClick={() => handleRemoveFavorite(pkg.id, 'package')}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <Icon name="Heart" size={16} className="text-error fill-current" strokeWidth={2} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h4 className="font-semibold text-text-primary">{pkg.name}</h4>
            <p className="text-sm text-text-secondary">{pkg.type} Event</p>
          </div>
          <div className="text-right">
            <p className="font-bold text-primary">${pkg.price.toLocaleString()}</p>
            {pkg.originalPrice > pkg.price && (
              <p className="text-xs text-text-secondary line-through">
                ${pkg.originalPrice.toLocaleString()}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-accent fill-current" strokeWidth={0} />
            <span className="text-sm font-medium text-text-primary">{pkg.rating}</span>
          </div>
          <span className="text-sm text-text-secondary">({pkg.reviews} reviews)</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {pkg.features.slice(0, 3).map((feature, index) => (
            <span key={index} className="text-xs bg-surface-secondary text-text-secondary px-2 py-1 rounded-full">
              {feature}
            </span>
          ))}
          {pkg.features.length > 3 && (
            <span className="text-xs text-primary">+{pkg.features.length - 3} more</span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">
            Saved {new Date(pkg.savedDate).toLocaleDateString()}
          </span>
          <Link
            to="/event-booking-form"
            className="btn-primary text-sm px-4 py-2"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );

  const renderVenueCard = (venue) => (
    <div key={venue.id} className="border border-border rounded-xl overflow-hidden hover:shadow-secondary transition-all duration-200">
      <div className="relative">
        <Image
          src={venue.image}
          alt={venue.name}
          className="w-full h-48 object-cover"
        />
        <button
          onClick={() => handleRemoveFavorite(venue.id, 'venue')}
          className="absolute top-3 right-3 w-8 h-8 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors duration-200"
        >
          <Icon name="Heart" size={16} className="text-error fill-current" strokeWidth={2} />
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h4 className="font-semibold text-text-primary">{venue.name}</h4>
            <p className="text-sm text-text-secondary flex items-center space-x-1">
              <Icon name="MapPin" size={14} strokeWidth={2} />
              <span>{venue.location}</span>
            </p>
          </div>
          <div className="text-right">
            <p className="font-bold text-primary">${venue.price.toLocaleString()}</p>
            <p className="text-xs text-text-secondary">per day</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Icon name="Star" size={14} className="text-accent fill-current" strokeWidth={0} />
            <span className="text-sm font-medium text-text-primary">{venue.rating}</span>
          </div>
          <span className="text-sm text-text-secondary">({venue.reviews} reviews)</span>
          <span className="text-sm text-text-secondary">• {venue.capacity}</span>
        </div>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {venue.amenities.slice(0, 3).map((amenity, index) => (
            <span key={index} className="text-xs bg-surface-secondary text-text-secondary px-2 py-1 rounded-full">
              {amenity}
            </span>
          ))}
          {venue.amenities.length > 3 && (
            <span className="text-xs text-primary">+{venue.amenities.length - 3} more</span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xs text-text-secondary">
            Saved {new Date(venue.savedDate).toLocaleDateString()}
          </span>
          <Link
            to="/event-booking-form"
            className="btn-primary text-sm px-4 py-2"
          >
            Book Now
          </Link>
        </div>
      </div>
    </div>
  );

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading text-xl font-semibold text-text-primary">
            My Favorites
          </h3>
          <p className="text-text-secondary text-sm mt-1">
            Your saved packages and venues
          </p>
        </div>
        {!showAll && (
          <Link
            to="/user-dashboard"
            className="text-primary hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
          >
            <span>View All</span>
            <Icon name="ArrowRight" size={16} strokeWidth={2} />
          </Link>
        )}
      </div>

      {/* Category Tabs */}
      <div className="flex space-x-1 mb-6 bg-surface-secondary rounded-lg p-1">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md font-medium text-sm transition-all duration-200 flex-1 justify-center ${
              activeCategory === category.id
                ? 'bg-surface text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            <span>{category.label}</span>
            <span className={`px-2 py-1 rounded-full text-xs ${
              activeCategory === category.id
                ? 'bg-primary-50 text-primary' :'bg-text-tertiary/20 text-text-secondary'
            }`}>
              {category.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeCategory === 'packages' && mockFavoritePackages.map(renderPackageCard)}
        {activeCategory === 'venues' && mockFavoriteVenues.map(renderVenueCard)}
      </div>

      {/* Empty State */}
      {((activeCategory === 'packages' && mockFavoritePackages.length === 0) ||
        (activeCategory === 'venues' && mockFavoriteVenues.length === 0)) && (
        <div className="text-center py-12">
          <Icon name="Heart" size={64} className="text-text-tertiary mx-auto mb-4" />
          <h4 className="font-heading text-lg font-semibold text-text-primary mb-2">
            No Favorites Yet
          </h4>
          <p className="text-text-secondary mb-6">
            Start exploring and save your favorite {activeCategory} for quick access!
          </p>
          <Link
            to="/event-packages"
            className="btn-primary"
          >
            Browse {activeCategory === 'packages' ? 'Packages' : 'Venues'}
          </Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesSection;