import React from 'react';
import Icon from 'components/AppIcon';

const BookingSummary = ({ formData, estimatedCost }) => {
  const getSummaryItems = () => {
    const items = [];
    
    if (formData.eventType) {
      items.push({
        icon: 'Calendar',
        label: 'Event Type',
        value: formData.eventType.charAt(0).toUpperCase() + formData.eventType.slice(1),
        subValue: formData.eventSubType
      });
    }
    
    if (formData.eventDate) {
      items.push({
        icon: 'Clock',
        label: 'Date & Time',
        value: new Date(formData.eventDate).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric'
        }),
        subValue: formData.eventTime ? new Date(`2000-01-01T${formData.eventTime}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        }) : null
      });
    }
    
    if (formData.location) {
      items.push({
        icon: 'MapPin',
        label: 'Location',
        value: formData.location.length > 30 ? formData.location.substring(0, 30) + '...' : formData.location
      });
    }
    
    if (formData.guestCount) {
      items.push({
        icon: 'Users',
        label: 'Guests',
        value: `${formData.guestCount} people`
      });
    }
    
    if (formData.budget) {
      items.push({
        icon: 'DollarSign',
        label: 'Budget',
        value: `$${formData.budget.toLocaleString()}`
      });
    }
    
    return items;
  };

  const getCompletionPercentage = () => {
    const requiredFields = ['eventType', 'eventDate', 'location', 'guestCount', 'budget'];
    const completedFields = requiredFields.filter(field => formData[field]).length;
    return Math.round((completedFields / requiredFields.length) * 100);
  };

  const summaryItems = getSummaryItems();
  const completionPercentage = getCompletionPercentage();

  if (summaryItems.length === 0) {
    return (
      <div className="mt-8 p-6 bg-primary-50 rounded-xl">
        <div className="text-center">
          <Icon name="Clipboard" size={32} className="text-primary mx-auto mb-3" strokeWidth={1.5} />
          <h4 className="font-heading text-lg font-semibold text-primary mb-2">
            Booking Summary
          </h4>
          <p className="text-sm text-text-secondary">
            Your selections will appear here as you complete the form
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 space-y-4">
      {/* Progress Indicator */}
      <div className="p-4 bg-primary-50 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-primary">Form Progress</span>
          <span className="text-sm font-bold text-primary">{completionPercentage}%</span>
        </div>
        <div className="w-full bg-primary-200 rounded-full h-2">
          <div
            className="bg-primary h-2 rounded-full transition-all duration-300"
            style={{ width: `${completionPercentage}%` }}
          />
        </div>
      </div>

      {/* Booking Summary */}
      <div className="p-6 bg-surface border border-border rounded-xl">
        <h4 className="font-heading text-lg font-semibold text-text-primary mb-4 flex items-center">
          <Icon name="FileText" size={20} className="mr-2" strokeWidth={2} />
          Booking Summary
        </h4>
        
        <div className="space-y-4">
          {summaryItems.map((item, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                <Icon name={item.icon} size={16} className="text-primary" strokeWidth={2} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-secondary">{item.label}</p>
                <p className="text-sm text-text-primary font-medium truncate">{item.value}</p>
                {item.subValue && (
                  <p className="text-xs text-text-secondary">{item.subValue}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Estimated Cost */}
        {estimatedCost > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Icon name="Calculator" size={16} className="text-accent-600" strokeWidth={2} />
                <span className="text-sm font-medium text-text-secondary">Estimated Total</span>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-accent-600">
                  ${estimatedCost.toLocaleString()}
                </p>
                {formData.guestCount && (
                  <p className="text-xs text-text-secondary">
                    ${Math.round(estimatedCost / formData.guestCount)} per guest
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Next Steps */}
        <div className="mt-6 pt-4 border-t border-border">
          <div className="flex items-start space-x-2">
            <Icon name="Info" size={16} className="text-primary mt-0.5" strokeWidth={2} />
            <div>
              <p className="text-xs font-medium text-primary mb-1">Next Steps:</p>
              <ul className="text-xs text-text-secondary space-y-1">
                <li>• Complete all form sections</li>
                <li>• Review your selections</li>
                <li>• Submit for package recommendations</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4 bg-accent-50 rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Zap" size={16} className="text-accent-600" strokeWidth={2} />
            <span className="text-sm font-medium text-accent-800">Quick Actions</span>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="text-xs bg-accent-100 text-accent-800 px-3 py-1 rounded-full hover:bg-accent-200 transition-colors duration-200">
            Save Draft
          </button>
          <button className="text-xs bg-primary-100 text-primary px-3 py-1 rounded-full hover:bg-primary-200 transition-colors duration-200">
            Get Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;