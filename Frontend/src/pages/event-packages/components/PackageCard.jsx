import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PackageCard = ({ 
  package: pkg, 
  isSelected, 
  onSelect, 
  onFavoriteToggle, 
  canSelect 
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const getAvailabilityColor = (availability) => {
    switch (availability) {
      case 'available':
        return 'text-success bg-success-50';
      case 'limited':
        return 'text-warning-600 bg-warning-50';
      case 'unavailable':
        return 'text-error bg-error-50';
      default:
        return 'text-text-secondary bg-gray-50';
    }
  };

  const getAvailabilityText = (availability) => {
    switch (availability) {
      case 'available':
        return 'Available';
      case 'limited':
        return 'Limited Slots';
      case 'unavailable':
        return 'Fully Booked';
      default:
        return 'Check Availability';
    }
  };

  return (
    <>
      <div className="card group hover:shadow-accent transition-all duration-300 relative overflow-hidden">
        {/* Popular Badge */}
        {pkg.isPopular && (
          <div className="absolute top-4 left-4 z-10 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
        )}

        {/* Favorite Button */}
        <button
          onClick={onFavoriteToggle}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-200 shadow-secondary"
        >
          <Icon 
            name={pkg.isFavorite ? "Heart" : "Heart"} 
            size={20} 
            className={pkg.isFavorite ? "text-error fill-current" : "text-text-secondary"} 
            strokeWidth={2} 
          />
        </button>

        {/* Package Image */}
        <div className="relative h-48 overflow-hidden rounded-lg mb-4">
          <Image
            src={pkg.image}
            alt={pkg.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Package Content */}
        <div className="space-y-4">
          {/* Title and Rating */}
          <div>
            <h3 className="font-heading text-xl font-semibold text-text-primary mb-2 group-hover:text-primary transition-colors duration-200">
              {pkg.title}
            </h3>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} className="text-accent fill-current" strokeWidth={2} />
                <span className="text-sm font-medium text-text-primary">{pkg.rating}</span>
                <span className="text-sm text-text-secondary">({pkg.reviewCount} reviews)</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(pkg.availability)}`}>
                {getAvailabilityText(pkg.availability)}
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-primary">{pkg.priceRange}</span>
              <p className="text-sm text-text-secondary">{pkg.timeline}</p>
            </div>
          </div>

          {/* Key Features */}
          <div>
            <h4 className="text-sm font-semibold text-text-primary mb-2">Key Features:</h4>
            <div className="grid grid-cols-2 gap-1">
              {pkg.features.slice(0, 4).map((feature, index) => (
                <div key={index} className="flex items-center space-x-1">
                  <Icon name="Check" size={14} className="text-success flex-shrink-0" strokeWidth={2} />
                  <span className="text-sm text-text-secondary truncate">{feature}</span>
                </div>
              ))}
            </div>
            {pkg.features.length > 4 && (
              <button
                onClick={() => setShowDetails(true)}
                className="text-sm text-primary hover:text-primary-700 font-medium mt-2"
              >
                +{pkg.features.length - 4} more features
              </button>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3 pt-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <Link
                to="/event-booking-form"
                state={{ selectedPackage: pkg }}
                className="btn-primary flex-1 text-center"
              >
                Select Package
              </Link>
              <button
                onClick={() => setShowDetails(true)}
                className="btn-secondary px-4 py-3"
              >
                <Icon name="Eye" size={18} strokeWidth={2} />
              </button>
            </div>
            
            {/* Comparison Checkbox */}
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={onSelect}
                disabled={!canSelect}
                className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
              />
              <span className="text-sm text-text-secondary">
                Compare {!canSelect && !isSelected ? '(Max 3)' : ''}
              </span>
            </label>
          </div>
        </div>
      </div>

      {/* Package Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowDetails(false)} />
          <div className="relative bg-surface rounded-xl shadow-accent max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-surface border-b border-border p-6 flex items-center justify-between">
              <h2 className="font-heading text-2xl font-semibold text-text-primary">{pkg.title}</h2>
              <button
                onClick={() => setShowDetails(false)}
                className="p-2 hover:bg-primary-50 rounded-lg transition-colors duration-200"
              >
                <Icon name="X" size={24} strokeWidth={2} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Package Image */}
              <div className="h-64 overflow-hidden rounded-lg">
                <Image
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Package Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-text-primary mb-3">Package Details</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Price Range:</span>
                      <span className="font-semibold text-primary">{pkg.priceRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Planning Period:</span>
                      <span className="text-text-primary">{pkg.timeline}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={16} className="text-accent fill-current" strokeWidth={2} />
                        <span className="text-text-primary">{pkg.rating} ({pkg.reviewCount} reviews)</span>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-secondary">Availability:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(pkg.availability)}`}>
                        {getAvailabilityText(pkg.availability)}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-text-primary mb-3">All Features</h3>
                  <div className="space-y-2">
                    {pkg.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success flex-shrink-0" strokeWidth={2} />
                        <span className="text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h3 className="font-semibold text-text-primary mb-3">Description</h3>
                <p className="text-text-secondary leading-relaxed">{pkg.description}</p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-border">
                <Link
                  to="/event-booking-form"
                  state={{ selectedPackage: pkg }}
                  className="btn-primary flex-1 text-center"
                >
                  Book This Package
                </Link>
                <Link
                  to="/contact-page"
                  state={{ inquiryType: 'package', packageId: pkg.id }}
                  className="btn-secondary flex-1 text-center"
                >
                  Get Custom Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PackageCard;