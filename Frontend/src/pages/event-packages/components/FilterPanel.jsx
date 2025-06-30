import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FilterPanel = ({ filters, onFilterChange, onClose, packages }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  // Get unique features from all packages
  const allFeatures = [...new Set(packages.flatMap(pkg => pkg.features))].sort();

  const eventTypes = [
    { value: 'all', label: 'All Events', count: packages.length },
    { value: 'wedding', label: 'Wedding', count: packages.filter(p => p.type === 'wedding').length },
    { value: 'birthday', label: 'Birthday', count: packages.filter(p => p.type === 'birthday').length },
    { value: 'corporate', label: 'Corporate', count: packages.filter(p => p.type === 'corporate').length },
    { value: 'anniversary', label: 'Anniversary', count: packages.filter(p => p.type === 'anniversary').length },
    { value: 'custom', label: 'Custom', count: packages.filter(p => p.type === 'custom').length }
  ];

  const budgetRanges = [
    { value: 'all', label: 'All Budgets', count: packages.length },
    { value: 'under-1000', label: 'Under $1,000', count: packages.filter(p => p.price < 1000).length },
    { value: '1000-3000', label: '$1,000 - $3,000', count: packages.filter(p => p.price >= 1000 && p.price <= 3000).length },
    { value: '3000-5000', label: '$3,000 - $5,000', count: packages.filter(p => p.price >= 3000 && p.price <= 5000).length },
    { value: 'over-5000', label: 'Over $5,000', count: packages.filter(p => p.price > 5000).length }
  ];

  const handleFeatureToggle = (feature) => {
    const newFeatures = localFilters.features.includes(feature)
      ? localFilters.features.filter(f => f !== feature)
      : [...localFilters.features, feature];
    
    setLocalFilters({ ...localFilters, features: newFeatures });
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
    onClose();
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      budgetRange: 'all',
      eventType: 'all',
      features: []
    };
    setLocalFilters(clearedFilters);
    onFilterChange(clearedFilters);
    onClose();
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.eventType !== 'all') count++;
    if (localFilters.budgetRange !== 'all') count++;
    if (localFilters.features.length > 0) count++;
    return count;
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed bottom-0 left-0 right-0 bg-surface rounded-t-xl shadow-accent max-h-[80vh] overflow-hidden animate-slide-in">
        {/* Header */}
        <div className="sticky top-0 bg-surface border-b border-border p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="font-heading text-xl font-semibold text-text-primary">Filters</h2>
            {getActiveFilterCount() > 0 && (
              <span className="w-6 h-6 bg-primary text-white rounded-full flex items-center justify-center text-sm font-medium">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-primary-50 rounded-lg transition-colors duration-200"
          >
            <Icon name="X" size={24} strokeWidth={2} />
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(80vh-140px)] p-4 space-y-6">
          {/* Event Type Filter */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Event Type</h3>
            <div className="space-y-2">
              {eventTypes.map((type) => (
                <label key={type.value} className="flex items-center justify-between p-3 rounded-lg hover:bg-primary-50 cursor-pointer transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="eventType"
                      value={type.value}
                      checked={localFilters.eventType === type.value}
                      onChange={(e) => setLocalFilters({ ...localFilters, eventType: e.target.value })}
                      className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                    />
                    <span className="text-text-primary">{type.label}</span>
                  </div>
                  <span className="text-sm text-text-secondary bg-gray-100 px-2 py-1 rounded-full">
                    {type.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Budget Range Filter */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Budget Range</h3>
            <div className="space-y-2">
              {budgetRanges.map((range) => (
                <label key={range.value} className="flex items-center justify-between p-3 rounded-lg hover:bg-primary-50 cursor-pointer transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="budgetRange"
                      value={range.value}
                      checked={localFilters.budgetRange === range.value}
                      onChange={(e) => setLocalFilters({ ...localFilters, budgetRange: e.target.value })}
                      className="w-4 h-4 text-primary border-border focus:ring-primary-500"
                    />
                    <span className="text-text-primary">{range.label}</span>
                  </div>
                  <span className="text-sm text-text-secondary bg-gray-100 px-2 py-1 rounded-full">
                    {range.count}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Features Filter */}
          <div>
            <h3 className="font-semibold text-text-primary mb-3">Features</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {allFeatures.map((feature) => {
                const featureCount = packages.filter(pkg => pkg.features.includes(feature)).length;
                return (
                  <label key={feature} className="flex items-center justify-between p-3 rounded-lg hover:bg-primary-50 cursor-pointer transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={localFilters.features.includes(feature)}
                        onChange={() => handleFeatureToggle(feature)}
                        className="w-4 h-4 text-primary border-border rounded focus:ring-primary-500"
                      />
                      <span className="text-text-primary text-sm">{feature}</span>
                    </div>
                    <span className="text-sm text-text-secondary bg-gray-100 px-2 py-1 rounded-full">
                      {featureCount}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-surface border-t border-border p-4 flex space-x-3">
          <button
            onClick={handleClearFilters}
            className="flex-1 py-3 px-4 border border-border rounded-lg text-text-secondary hover:bg-gray-50 transition-colors duration-200 font-medium"
          >
            Clear All
          </button>
          <button
            onClick={handleApplyFilters}
            className="flex-1 btn-primary"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterPanel;