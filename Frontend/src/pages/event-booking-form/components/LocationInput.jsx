import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const LocationInput = ({ formData, updateFormData, errors }) => {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchQuery, setSearchQuery] = useState(formData.location || '');

  const popularVenues = [
    {
      id: 1,
      name: "Shangri-La Hotel Colombo",
      address: "1 Galle Face, Colombo 2",
      type: "Hotel",
      capacity: "200-1000 guests",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400"
    },
    {
      id: 2,
      name: "Cinnamon Grand Colombo",
      address: "77 Galle Road, Colombo 3",
      type: "Hotel",
      capacity: "100-800 guests",
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400"
    },
    {
      id: 3,
      name: "Nelum Pokuna Mahinda Rajapaksa Theatre",
      address: "Ananda Coomaraswamy Mawatha, Colombo 7",
      type: "Theatre",
      capacity: "500-1200 guests",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=400"
    },
    {
      id: 4,
      name: "Galle Face Green",
      address: "Galle Road, Colombo 3",
      type: "Outdoor",
      capacity: "100-2000 guests",
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400"
    }
  ];

  const locationSuggestions = [
    "Shangri-La Hotel Colombo, 1 Galle Face, Colombo 2",
    "Cinnamon Grand Colombo, 77 Galle Road, Colombo 3",
    "Nelum Pokuna Mahinda Rajapaksa Theatre, Ananda Coomaraswamy Mawatha, Colombo 7",
    "Galle Face Green, Galle Road, Colombo 3",
    "BMICH, Bauddhaloka Mawatha, Colombo 7",
    "Taj Samudra Colombo, 25 Galle Face Center Rd, Colombo 3",
    "Jetwing Blue, Negombo",
    "Amaya Lake, Dambulla",
    "Kandy City Centre, Kandy",
    "Araliya Green City, Nuwara Eliya"
  ];

  const filteredSuggestions = locationSuggestions.filter(suggestion =>
    suggestion.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLocationChange = (value) => {
    setSearchQuery(value);
    updateFormData('location', value);
    setShowSuggestions(value.length > 0);
  };

  const handleSuggestionSelect = (suggestion) => {
    setSearchQuery(suggestion);
    updateFormData('location', suggestion);
    setShowSuggestions(false);
  };

  const handleVenueSelect = (venue) => {
    const venueLocation = `${venue.name}, ${venue.address}`;
    setSearchQuery(venueLocation);
    updateFormData('location', venueLocation);
    setShowSuggestions(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="font-heading text-2xl font-semibold text-text-primary mb-2">
          Where will your event take place?
        </h3>
        <p className="text-text-secondary">
          Enter a venue name, address, or choose from our popular locations
        </p>
      </div>

      <div className="space-y-4">
        <div className="relative">
          <label className="block text-sm font-medium text-text-primary mb-2">
            Event Location *
          </label>
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleLocationChange(e.target.value)}
              onFocus={() => setShowSuggestions(searchQuery.length > 0)}
              className={`input-field pl-12 ${errors.location ? 'border-error' : ''}`}
              placeholder="Enter venue name or address..."
            />
            <Icon 
              name="MapPin" 
              size={20} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              strokeWidth={2} 
            />
          </div>
          
          {errors.location && (
            <p className="text-error text-sm mt-1">{errors.location}</p>
          )}

          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-surface border border-border rounded-lg shadow-lg max-h-48 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionSelect(suggestion)}
                  className="w-full text-left px-4 py-3 hover:bg-primary-50 transition-colors duration-200 flex items-center space-x-3"
                >
                  <Icon name="MapPin" size={16} className="text-text-secondary" strokeWidth={2} />
                  <span className="text-text-primary">{suggestion}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const location = `Current Location (${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)})`;
                  handleLocationChange(location);
                },
                () => {
                  alert('Unable to get your location. Please enter manually.');
                }
              );
            }}
            className="flex items-center space-x-2 px-4 py-2 bg-primary-50 text-primary rounded-lg hover:bg-primary-100 transition-colors duration-200"
          >
            <Icon name="Navigation" size={16} strokeWidth={2} />
            <span className="text-sm font-medium">Use Current Location</span>
          </button>
          
          <button
            onClick={() => handleLocationChange('Home Address')}
            className="flex items-center space-x-2 px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-primary-50 transition-colors duration-200"
          >
            <Icon name="Home" size={16} strokeWidth={2} />
            <span className="text-sm font-medium">Home Address</span>
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h4 className="font-heading text-lg font-semibold text-text-primary">
          Popular Venues
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {popularVenues.map((venue) => (
            <div
              key={venue.id}
              onClick={() => handleVenueSelect(venue)}
              className="bg-surface border border-border rounded-xl p-4 cursor-pointer hover:shadow-lg hover:border-primary-300 transition-all duration-200"
            >
              <div className="flex space-x-4">
                <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = '';
                    }}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-text-primary mb-1 truncate">
                    {venue.name}
                  </h5>
                  <p className="text-sm text-text-secondary mb-2 truncate">
                    {venue.address}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs bg-primary-100 text-primary px-2 py-1 rounded">
                        {venue.type}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Icon name="Star" size={12} className="text-yellow-500" strokeWidth={2} />
                        <span className="text-xs text-text-secondary">{venue.rating}</span>
                      </div>
                    </div>
                  </div>
                  
                  <p className="text-xs text-text-secondary mt-1">
                    <Icon name="Users" size={12} className="inline mr-1" strokeWidth={2} />
                    {venue.capacity}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {formData.location && (
        <div className="space-y-4">
          <h4 className="font-heading text-lg font-semibold text-text-primary">
            Location Preview
          </h4>
          <div className="bg-surface border border-border rounded-xl overflow-hidden">
            <div className="h-64 bg-gray-100 flex items-center justify-center">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Event Location"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(formData.location)}&z=15&output=embed`}
                className="border-0"
              />
            </div>
            <div className="p-4">
              <div className="flex items-start space-x-3">
                <Icon name="MapPin" size={20} className="text-primary mt-1" strokeWidth={2} />
                <div>
                  <p className="font-medium text-text-primary">{formData.location}</p>
                  <p className="text-sm text-text-secondary mt-1">
                    The map above shows your selected location. You can zoom or pan for details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-accent-50 p-6 rounded-xl">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent-600 mt-1" strokeWidth={2} />
          <div>
            <h4 className="font-medium text-accent-800 mb-2">Location Tips</h4>
            <ul className="text-sm text-accent-700 space-y-1">
              <li>• Provide the complete address including city and zip code</li>
              <li>• Consider accessibility for all guests</li>
              <li>• Check parking availability at the venue</li>
              <li>• Verify venue capacity matches your guest count</li>
              <li>• Our team can help with venue recommendations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationInput;