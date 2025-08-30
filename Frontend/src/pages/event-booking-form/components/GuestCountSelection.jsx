import React from 'react';
import Icon from 'components/AppIcon';

const GuestCountSelection = ({ formData, updateFormData, errors }) => {
  const guestRanges = [
    { min: 1, max: 25, label: '1-25 guests', icon: 'Users', description: 'Intimate gathering' },
    { min: 26, max: 50, label: '26-50 guests', icon: 'Users', description: 'Small celebration' },
    { min: 51, max: 100, label: '51-100 guests', icon: 'Users', description: 'Medium event' },
    { min: 101, max: 200, label: '101-200 guests', icon: 'Users', description: 'Large gathering' },
    { min: 201, max: 500, label: '201-500 guests', icon: 'Users', description: 'Grand celebration' },
    { min: 501, max: 1000, label: '500+ guests', icon: 'Users', description: 'Major event' }
  ];

  const handleSliderChange = (value) => {
    updateFormData('guestCount', parseInt(value));
  };

  const handleRangeSelect = (range) => {
    const midPoint = Math.floor((range.min + range.max) / 2);
    updateFormData('guestCount', midPoint);
  };

  const getSelectedRange = () => {
    return guestRanges.find(range => 
      formData.guestCount >= range.min && formData.guestCount <= range.max
    );
  };

  const getCostEstimate = () => {
    const basePrice = 20; 
    let multiplier = 1;
    
    if (formData.guestCount <= 25) multiplier = 1.2;
    else if (formData.guestCount <= 50) multiplier = 1.1;
    else if (formData.guestCount <= 100) multiplier = 1.0;
    else if (formData.guestCount <= 200) multiplier = 0.95;
    else multiplier = 0.9;
    
    return Math.round(basePrice * multiplier * formData.guestCount);
  };

  const getVenueRecommendations = () => {
    if (formData.guestCount <= 25) {
      return ['Private dining rooms', 'Home venues', 'Small banquet halls'];
    } else if (formData.guestCount <= 50) {
      return ['Restaurant private rooms', 'Community centers', 'Small event halls'];
    } else if (formData.guestCount <= 100) {
      return ['Hotel conference rooms', 'Event centers', 'Pavilions'];
    } else if (formData.guestCount <= 200) {
      return ['Hotel ballrooms', 'Convention centers', 'Large event halls'];
    } else {
      return ['Grand ballrooms', 'Convention centers', 'Outdoor venues'];
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="font-heading text-2xl font-semibold text-text-primary mb-2">
          How many guests will attend?
        </h3>
        <p className="text-text-secondary">
          This helps us recommend the right venue size and catering options
        </p>
      </div>

      <div className="space-y-4">
        <h4 className="font-heading text-lg font-semibold text-text-primary">
          Quick Selection
        </h4>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guestRanges.map((range, index) => (
            <button
              key={index}
              onClick={() => handleRangeSelect(range)}
              className={`p-4 rounded-xl border-2 text-left transition-all duration-200 hover:shadow-lg ${
                getSelectedRange() === range
                  ? 'border-primary bg-primary-50 shadow-primary'
                  : 'border-border bg-surface hover:border-primary-300'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  getSelectedRange() === range ? 'bg-primary text-white' : 'bg-primary-100 text-primary'
                }`}>
                  <Icon name={range.icon} size={20} strokeWidth={2} />
                </div>
                <div>
                  <p className="font-medium text-text-primary">{range.label}</p>
                  <p className="text-sm text-text-secondary">{range.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <h4 className="font-heading text-lg font-semibold text-text-primary">
          Exact Guest Count
        </h4>
        
        <div className="bg-surface border border-border rounded-xl p-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-text-primary">
                  Number of Guests
                </label>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => formData.guestCount > 1 && handleSliderChange(formData.guestCount - 1)}
                    className="w-8 h-8 rounded-full bg-primary-100 text-primary flex items-center justify-center hover:bg-primary-200 transition-colors duration-200"
                  >
                    <Icon name="Minus" size={16} strokeWidth={2} />
                  </button>
                  
                  <div className="w-16 text-center">
                    <span className="text-2xl font-bold text-primary">{formData.guestCount}</span>
                  </div>
                  
                  <button
                    onClick={() => formData.guestCount < 1000 && handleSliderChange(formData.guestCount + 1)}
                    className="w-8 h-8 rounded-full bg-primary-100 text-primary flex items-center justify-center hover:bg-primary-200 transition-colors duration-200"
                  >
                    <Icon name="Plus" size={16} strokeWidth={2} />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <input
                  type="range"
                  min="1"
                  max="1000"
                  value={formData.guestCount}
                  onChange={(e) => handleSliderChange(e.target.value)}
                  className="w-full h-2 bg-primary-100 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${(formData.guestCount / 1000) * 100}%, var(--color-primary-100) ${(formData.guestCount / 1000) * 100}%, var(--color-primary-100) 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-text-secondary mt-2">
                  <span>1</span>
                  <span>250</span>
                  <span>500</span>
                  <span>750</span>
                  <span>1000+</span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-text-primary whitespace-nowrap">
                Or enter exact number:
              </label>
              <input
                type="number"
                min="1"
                max="1000"
                value={formData.guestCount}
                onChange={(e) => handleSliderChange(e.target.value)}
                className="input-field w-24 text-center"
              />
              <span className="text-sm text-text-secondary">guests</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-primary-50 p-6 rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-heading text-lg font-semibold text-primary">
            Estimated Cost
          </h4>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">
              Rs {getCostEstimate().toLocaleString('en-LK')}
            </p>
            <p className="text-sm text-text-secondary">
              Rs 24 per guest
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <Icon name="Utensils" size={20} className="text-primary mx-auto mb-2" strokeWidth={2} />
            <p className="font-medium text-text-primary">Catering</p>
            <p className="text-text-secondary">Rs {Math.round(getCostEstimate() * 0.6).toLocaleString('en-LK')}</p>
          </div>
          <div className="text-center">
            <Icon name="MapPin" size={20} className="text-primary mx-auto mb-2" strokeWidth={2} />
            <p className="font-medium text-text-primary">Venue</p>
            <p className="text-text-secondary">Rs {Math.round(getCostEstimate() * 0.3).toLocaleString('en-LK')}</p>
          </div>
          <div className="text-center">
            <Icon name="Sparkles" size={20} className="text-primary mx-auto mb-2" strokeWidth={2} />
            <p className="font-medium text-text-primary">Extras</p>
            <p className="text-text-secondary">Rs {Math.round(getCostEstimate() * 0.1).toLocaleString('en-LK')}</p>
          </div>
        </div>
      </div>

      <div className="bg-accent-50 p-6 rounded-xl">
        <div className="flex items-start space-x-3">
          <Icon name="MapPin" size={20} className="text-accent-600 mt-1" strokeWidth={2} />
          <div>
            <h4 className="font-medium text-accent-800 mb-2">
              Recommended Venue Types for {formData.guestCount} guests
            </h4>
            <div className="flex flex-wrap gap-2">
              {getVenueRecommendations().map((venue, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-sm"
                >
                  {venue}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-6">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-primary mt-1" strokeWidth={2} />
          <div>
            <h4 className="font-medium text-text-primary mb-2">Guest Count Tips</h4>
            <ul className="text-sm text-text-secondary space-y-1">
              <li>• Include children in your count if they'll be eating</li>
              <li>• Add 5-10% buffer for last-minute additions</li>
              <li>• Consider dietary restrictions and special needs</li>
              <li>• Venue capacity should exceed guest count by 20%</li>
              <li>• Final count can be adjusted up to 48 hours before event</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestCountSelection;