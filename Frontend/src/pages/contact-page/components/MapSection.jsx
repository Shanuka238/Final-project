import React from 'react';
import Icon from 'components/AppIcon';

const MapSection = () => {
  const officeLocation = {
    name: 'Party Nest Events Office',
    address: '123 Event Plaza, Suite 456, Downtown District, New York, NY 10001',
    lat: 40.7589,
    lng: -73.9851,
    phone: '+1 (555) PARTY-01',
    hours: 'Mon-Fri: 9AM-8PM, Sat: 10AM-6PM, Sun: 12PM-5PM'
  };

  const nearbyLandmarks = [
    {
      name: 'Central Park',
      distance: '0.5 miles',
      icon: 'Trees'
    },
    {
      name: 'Times Square',
      distance: '0.8 miles',
      icon: 'MapPin'
    },
    {
      name: 'Grand Central Station',
      distance: '1.2 miles',
      icon: 'Train'
    }
  ];

  const parkingInfo = [
    {
      type: 'Street Parking',
      availability: 'Limited',
      cost: '$3-5/hour',
      icon: 'Car'
    },
    {
      type: 'Event Plaza Garage',
      availability: 'Available',
      cost: '$15/day',
      icon: 'Building'
    },
    {
      type: 'Public Transit',
      availability: 'Recommended',
      cost: '$2.75',
      icon: 'Bus'
    }
  ];

  return (
    <section className="py-16 bg-surface-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Visit Our Office
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Located in the heart of downtown, our office is easily accessible and perfect for 
            in-person consultations. Schedule a visit to discuss your event in detail.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="bg-surface rounded-2xl shadow-primary overflow-hidden">
              <div className="aspect-w-16 aspect-h-12 lg:aspect-h-10">
                <iframe
                  width="100%"
                  height="400"
                  loading="lazy"
                  title={officeLocation.name}
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://www.google.com/maps?q=${officeLocation.lat},${officeLocation.lng}&z=15&output=embed`}
                  className="w-full h-full"
                />
              </div>
              
              {/* Map Overlay Info */}
              <div className="p-6 border-t border-border">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" size={24} className="text-primary" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-2">{officeLocation.name}</h3>
                    <p className="text-text-secondary mb-3">{officeLocation.address}</p>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-6 space-y-2 sm:space-y-0">
                      <div className="flex items-center space-x-2">
                        <Icon name="Phone" size={16} className="text-text-secondary" strokeWidth={2} />
                        <span className="text-sm text-text-secondary">{officeLocation.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Icon name="Clock" size={16} className="text-text-secondary" strokeWidth={2} />
                        <span className="text-sm text-text-secondary">{officeLocation.hours}</span>
                      </div>
                    </div>
                  </div>
                  <a
                    href={`https://maps.google.com/?q=${officeLocation.lat},${officeLocation.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center space-x-2"
                  >
                    <Icon name="Navigation" size={18} strokeWidth={2} />
                    <span>Directions</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Location Details */}
          <div className="space-y-6">
            {/* Nearby Landmarks */}
            <div className="bg-surface rounded-2xl shadow-primary p-6">
              <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
                Nearby Landmarks
              </h3>
              <div className="space-y-3">
                {nearbyLandmarks.map((landmark, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Icon name={landmark.icon} size={16} className="text-primary" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">{landmark.name}</p>
                      <p className="text-sm text-text-secondary">{landmark.distance} away</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Parking Information */}
            <div className="bg-surface rounded-2xl shadow-primary p-6">
              <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
                Parking & Transit
              </h3>
              <div className="space-y-4">
                {parkingInfo.map((parking, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-accent-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Icon name={parking.icon} size={16} className="text-accent-600" strokeWidth={2} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-text-primary">{parking.type}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          parking.availability === 'Available' ?'bg-success-100 text-success-700'
                            : parking.availability === 'Recommended' ?'bg-primary-100 text-primary-700' :'bg-warning-100 text-warning-700'
                        }`}>
                          {parking.availability}
                        </span>
                        <span className="text-sm text-text-secondary">{parking.cost}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule Visit */}
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