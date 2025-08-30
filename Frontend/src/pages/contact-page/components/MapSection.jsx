import React from 'react';
import Icon from 'components/AppIcon';

const MapSection = () => {
  const officeLocation = {};
  const nearbyLandmarks = [];
  const parkingInfo = [];

  return (
    <section className="py-16 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Visit Our Office
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-2xl shadow-primary overflow-hidden">
              <div className="aspect-w-16 aspect-h-12 lg:aspect-h-10">
              </div>
              <div className="p-6 border-t border-border">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={24} className="text-primary" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-2">Office Name</h3>
                    <p className="text-text-secondary mb-3">Office address</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-2">
                        <Icon name="Phone" size={16} className="text-text-secondary" strokeWidth={2} />
                        <span className="text-sm text-text-secondary">Phone</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} className="text-text-secondary" strokeWidth={2} />
                        <span className="text-sm text-text-secondary">Hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-surface rounded-2xl shadow-primary p-6">
              <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
                Nearby Landmarks
              </h3>
              <div className="space-y-3">
                {nearbyLandmarks.length === 0 ? (
                  <div className="text-gray-400">No landmarks available.</div>
                ) : nearbyLandmarks.map((landmark, index) => (
                  <div key={index} />
                ))}
              </div>
            </div>
            <div className="bg-surface rounded-2xl shadow-primary p-6">
              <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
                Parking & Transit
              </h3>
              <div className="space-y-4">
                {parkingInfo.length === 0 ? (
                  <div className="text-gray-400">No parking info available.</div>
                ) : parkingInfo.map((parking, index) => (
                  <div key={index} />
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary to-accent rounded-2xl p-6 text-white">
              <h3 className="font-heading text-xl font-bold mb-3">
                Schedule a Visit
              </h3>
              <p className="text-white/90 mb-4">
                Book a free consultation at our office to discuss your event in person and see our portfolio.
              </p>
              <button className="w-full bg-white text-primary px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2">
                <Icon name="Calendar" size={20} strokeWidth={2} />
                <span>Book Consultation</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MapSection;