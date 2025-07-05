import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import { useUser } from '@clerk/clerk-react';
import { fetchUserFavorites, removeFavorite } from 'api/dashboard';

const FavoritesSection = ({ showAll = false }) => {
  const [activeCategory, setActiveCategory] = useState('packages');
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserFavorites(user.id)
        .then((data) => setFavorites(data))
        .catch(() => setFavorites([]))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const favoritePackages = favorites.filter(f => f.type === 'package');
  const favoriteVenues = favorites.filter(f => f.type === 'venue');

  const categories = [
    { id: 'packages', label: 'Packages', count: favoritePackages.length },
    { id: 'venues', label: 'Venues', count: favoriteVenues.length }
  ];

  const handleRemoveFavorite = async (id) => {
    await removeFavorite(id);
    setFavorites(prev => prev.filter(f => f._id !== id));
  };

  const renderPackageCard = (fav) => {
    const pkg = fav.data;
    return (
      <div key={fav._id} className="border border-border rounded-xl overflow-hidden hover:shadow-secondary transition-all duration-200">
        <div className="relative">
          {/* Remove Favorite Button */}
          <button
            onClick={() => handleRemoveFavorite(fav._id)}
            className="absolute top-2 right-2 z-10 flex items-center gap-1 bg-white/90 px-3 py-1 rounded-full text-error border border-error hover:bg-error hover:text-white transition-all"
            title="Remove from favorites"
          >
            <Icon name="Trash" size={16} />
            <span className="text-xs font-semibold">Remove</span>
          </button>
          <Image src={pkg.image} alt={pkg.name} className="w-full h-48 object-cover" />
          {pkg.isPopular && (
            <div className="absolute top-3 left-3 bg-accent text-white px-2 py-1 rounded-full text-xs font-medium">Popular</div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="font-semibold text-text-primary">{pkg.name}</h4>
              <p className="text-sm text-text-secondary">{pkg.type} Event</p>
            </div>
            <div className="text-right">
              <p className="font-bold text-primary">${pkg.price?.toLocaleString() || 0}</p>
              {pkg.originalPrice > pkg.price && (
                <p className="text-xs text-text-secondary line-through">
                  ${pkg.originalPrice?.toLocaleString()}
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
            {pkg.features?.slice(0, 3).map((feature, index) => (
              <span key={index} className="text-xs bg-surface-secondary text-text-secondary px-2 py-1 rounded-full">
                {feature}
              </span>
            ))}
            {pkg.features?.length > 3 && (
              <span className="text-xs text-primary">+{pkg.features.length - 3} more</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">
              Saved {fav.savedDate ? new Date(fav.savedDate).toLocaleDateString() : ''}
            </span>
            <Link to="/event-booking-form" className="btn-primary text-sm px-4 py-2">Book Now</Link>
          </div>
        </div>
      </div>
    );
  };

  const renderVenueCard = (fav) => {
    const venue = fav.data;
    return (
      <div key={fav._id} className="border border-border rounded-xl overflow-hidden hover:shadow-secondary transition-all duration-200">
        <div className="relative">
          <Image src={venue.image} alt={venue.name} className="w-full h-48 object-cover" />
          <button
            onClick={() => handleRemoveFavorite(fav._id, 'venue')}
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
              <p className="font-bold text-primary">${venue.price?.toLocaleString() || 0}</p>
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
            {venue.amenities?.slice(0, 3).map((amenity, index) => (
              <span key={index} className="text-xs bg-surface-secondary text-text-secondary px-2 py-1 rounded-full">
                {amenity}
              </span>
            ))}
            {venue.amenities?.length > 3 && (
              <span className="text-xs text-primary">+{venue.amenities.length - 3} more</span>
            )}
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-secondary">
              Saved {fav.savedDate ? new Date(fav.savedDate).toLocaleDateString() : ''}
            </span>
            <Link to="/event-booking-form" className="btn-primary text-sm px-4 py-2">Book Now</Link>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center py-12">Loading favorites...</div>;
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading text-xl font-semibold text-text-primary">My Favorites</h3>
          <p className="text-text-secondary text-sm mt-1">Your saved packages and venues</p>
        </div>
        {!showAll && (
          <Link to="/user-dashboard" className="text-primary hover:text-primary-700 font-medium text-sm flex items-center space-x-1">
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
        {activeCategory === 'packages' && favoritePackages.map(renderPackageCard)}
        {activeCategory === 'venues' && favoriteVenues.map(renderVenueCard)}
      </div>
      {/* Empty State */}
      {((activeCategory === 'packages' && favoritePackages.length === 0) ||
        (activeCategory === 'venues' && favoriteVenues.length === 0)) && (
        <div className="text-center py-12">
          <Icon name="Heart" size={64} className="text-text-tertiary mx-auto mb-4" />
          <h4 className="font-heading text-lg font-semibold text-text-primary mb-2">No Favorites Yet</h4>
          <p className="text-text-secondary mb-6">Start exploring and save your favorite {activeCategory} for quick access!</p>
          <Link to="/event-packages" className="btn-primary">Browse {activeCategory === 'packages' ? 'Packages' : 'Venues'}</Link>
        </div>
      )}
    </div>
  );
};

export default FavoritesSection;