import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import { fetchUserFavorites, removeFavorite } from 'api/dashboard';

const FavoritesSection = ({ showAll = false, user }) => {
  const [activeCategory, setActiveCategory] = useState('packages');
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      fetchUserFavorites(user.id)
        .then((data) => setFavorites(data))
        .catch(() => setFavorites([]))
        .finally(() => setLoading(false));
    } else {
      setFavorites([]);
      setLoading(true);
    }
  }, [user]);

  const favoriteItems = favorites;

  const handleRemoveFavorite = async (id) => {
    await removeFavorite(id);
    setFavorites(prev => prev.filter(f => f._id !== id));
  };

  const renderPackageCard = (fav) => {
    const pkg = fav.data;
    return (
      <div key={fav._id} className="border border-border rounded-xl overflow-hidden hover:shadow-secondary transition-all duration-200 bg-white w-full max-w-xs mx-auto" style={{ minWidth: '260px' }}>
        <div className="relative">
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
            <div className="min-w-0">
              <h4 className="font-semibold text-text-primary truncate" title={pkg.name}>{pkg.name}</h4>
              <p className="text-sm text-text-secondary truncate">{pkg.type} Event</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-bold text-primary">Rs{pkg.price?.toLocaleString() || 0}</p>
              {pkg.originalPrice > pkg.price && (
                <p className="text-xs text-text-secondary line-through">
                  Rs{pkg.originalPrice?.toLocaleString()}
                </p>
              )}
            </div>
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
            <Link to="/event-packages" className="btn-primary text-sm px-4 py-2">Book Now</Link>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center py-12">Loading favorites...</div>;
  }

  return (
    <div className="card" style={{ maxWidth: 350, minWidth: 260 }}>
      <h3 className="font-heading text-xl font-semibold text-text-primary mb-6">My Favorites</h3>
      <div className="flex flex-col gap-4">
        {favoriteItems.length === 0 && (
          <div className="text-center py-12">
            <Icon name="Heart" size={64} className="text-text-tertiary mx-auto mb-4" />
            <h4 className="font-heading text-lg font-semibold text-text-primary mb-2">No Favorites Yet</h4>
            <p className="text-text-secondary mb-6">Start exploring and save your favorite items for quick access!</p>
            <Link to="/event-packages" className="btn-primary">Browse Packages</Link>
          </div>
        )}
        {favoriteItems.map(renderPackageCard)}
      </div>
    </div>
  );
};

export default FavoritesSection;