import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const PackageComparison = ({ packages, onClose }) => {
  const allFeatures = [...new Set(packages.flatMap(pkg => pkg.features))].sort();

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
        return 'Limited';
      case 'unavailable':
        return 'Booked';
      default:
        return 'Check';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-surface rounded-xl shadow-accent max-w-6xl w-full max-h-[90vh] overflow-hidden">
        <div className="sticky top-0 bg-surface border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="font-heading text-2xl font-semibold text-text-primary">Package Comparison</h2>
            <p className="text-text-secondary">Compare features and pricing side by side</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-50 rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={24} strokeWidth={2} />
          </button>
        </div>

        <div className="overflow-auto max-h-[calc(90vh-120px)]">
          <div className="p-6">
            <div className="grid gap-6 mb-8" style={{ gridTemplateColumns: `300px repeat(${packages.length}, 1fr)` }}>
              <div></div>
              {packages.map((pkg) => (
                <div key={pkg.id} className="text-center">
                  <div className="h-32 overflow-hidden rounded-lg mb-4">
                    <Image
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-text-primary mb-2">
                    {pkg.title}
                  </h3>
                  <div className="text-xl font-bold text-primary mb-2">{pkg.price ? `Rs ${pkg.price.toLocaleString()}` : 'N/A'}</div>
                  <div className="flex items-center justify-center space-x-1 mb-2">
                    <Icon name="Star" size={16} className="text-accent fill-current" strokeWidth={2} />
                    <span className="text-sm font-medium">{pkg.rating}</span>
                    <span className="text-sm text-text-secondary">({pkg.reviewCount})</span>
                  </div>
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(pkg.availability)}`}>
                    {getAvailabilityText(pkg.availability)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-text-primary mb-4 text-lg">Basic Information</h4>
                <div className="space-y-3">
                  <div className="grid gap-6" style={{ gridTemplateColumns: `300px repeat(${packages.length}, 1fr)` }}>
                    <div className="font-medium text-text-secondary">Price</div>
                    {packages.map((pkg) => (
                      <div key={pkg.id} className="text-center font-semibold text-primary">
                        {pkg.price ? `Rs ${pkg.price.toLocaleString()}` : 'N/A'}
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-6" style={{ gridTemplateColumns: `300px repeat(${packages.length}, 1fr)` }}>
                    <div className="font-medium text-text-secondary">Planning Period</div>
                    {packages.map((pkg) => (
                      <div key={pkg.id} className="text-center text-text-primary">
                        {pkg.timeline}
                      </div>
                    ))}
                  </div>

                  <div className="grid gap-6" style={{ gridTemplateColumns: `300px repeat(${packages.length}, 1fr)` }}>
                    <div className="font-medium text-text-secondary">Event Type</div>
                    {packages.map((pkg) => (
                      <div key={pkg.id} className="text-center">
                        <span className="inline-block px-3 py-1 bg-primary-100 text-primary rounded-full text-sm font-medium capitalize">
                          {pkg.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-text-primary mb-4 text-lg">Features Included</h4>
                <div className="space-y-2">
                  {allFeatures.map((feature) => (
                    <div key={feature} className="grid gap-6 py-2 border-b border-border last:border-b-0" style={{ gridTemplateColumns: `300px repeat(${packages.length}, 1fr)` }}>
                      <div className="font-medium text-text-secondary">{feature}</div>
                      {packages.map((pkg) => (
                        <div key={pkg.id} className="text-center">
                          {pkg.features.includes(feature) ? (
                            <Icon name="Check" size={20} className="text-success mx-auto" strokeWidth={2} />
                          ) : (
                            <Icon name="X" size={20} className="text-text-tertiary mx-auto" strokeWidth={2} />
                          )}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 pt-6 border-t border-border" style={{ gridTemplateColumns: `300px repeat(${packages.length}, 1fr)` }}>
                <div className="font-medium text-text-secondary">Select Package</div>
                {packages.map((pkg) => (
                  <div key={pkg.id} className="space-y-2">
                    <Link
                      to="/event-booking-form"
                      state={{ selectedPackage: pkg }}
                      className="btn-primary w-full text-center block"
                    >
                      Book Now
                    </Link>
                    <Link
                      to="/contact-page"
                      state={{ inquiryType: 'package', packageId: pkg.id }}
                      className="btn-secondary w-full text-center block text-sm py-2"
                    >
                      Get Quote
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageComparison;