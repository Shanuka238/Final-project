import React from 'react';
import Icon from 'components/AppIcon';

const EventTypeSelection = ({ formData, updateFormData, errors }) => {
  const eventTypes = [
    {
      id: 'wedding',
      name: 'Wedding',
      icon: 'Heart',
      description: 'Celebrate your special day with elegance',
      subTypes: ['Traditional Wedding', 'Destination Wedding', 'Intimate Ceremony', 'Reception Only'],
      color: 'from-pink-500 to-rose-500'
    },
    {
      id: 'birthday',
      name: 'Birthday Party',
      icon: 'Gift',
      description: 'Make birthdays memorable and fun',
      subTypes: ['Kids Birthday', 'Adult Birthday', 'Milestone Birthday', 'Surprise Party'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'corporate',
      name: 'Corporate Event',
      icon: 'Building',
      description: 'Professional events that impress',
      subTypes: ['Conference', 'Team Building', 'Product Launch', 'Annual Meeting'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'anniversary',
      name: 'Anniversary',
      icon: 'Calendar',
      description: 'Celebrate milestones together',
      subTypes: ['Wedding Anniversary', 'Company Anniversary', 'Personal Milestone'],
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: 'graduation',
      name: 'Graduation',
      icon: 'GraduationCap',
      description: 'Honor academic achievements',
      subTypes: ['High School Graduation', 'College Graduation', 'Professional Certification'],
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'custom',
      name: 'Custom Event',
      icon: 'Sparkles',
      description: 'Unique events tailored to you',
      subTypes: ['Social Gathering', 'Charity Event', 'Festival', 'Other'],
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const handleEventTypeSelect = (eventType) => {
    updateFormData('eventType', eventType.id);
    updateFormData('eventSubType', ''); // Reset sub-type when main type changes
  };

  const selectedEventType = eventTypes.find(type => type.id === formData.eventType);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="font-heading text-2xl font-semibold text-text-primary mb-2">
          What type of event are you planning?
        </h3>
        <p className="text-text-secondary">
          Choose the category that best describes your event
        </p>
      </div>

      {/* Event Type Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {eventTypes.map((eventType) => (
          <div
            key={eventType.id}
            onClick={() => handleEventTypeSelect(eventType)}
            className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              formData.eventType === eventType.id
                ? 'border-primary bg-primary-50 shadow-primary'
                : 'border-border bg-surface hover:border-primary-300'
            }`}
          >
            <div className="text-center">
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${eventType.color} flex items-center justify-center`}>
                <Icon name={eventType.icon} size={32} color="white" strokeWidth={2} />
              </div>
              <h4 className="font-heading text-lg font-semibold text-text-primary mb-2">
                {eventType.name}
              </h4>
              <p className="text-sm text-text-secondary">
                {eventType.description}
              </p>
            </div>
            
            {formData.eventType === eventType.id && (
              <div className="absolute top-3 right-3">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={16} color="white" strokeWidth={2} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {errors.eventType && (
        <p className="text-error text-sm text-center">{errors.eventType}</p>
      )}

      {/* Sub-type Selection */}
      {selectedEventType && (
        <div className="mt-8 p-6 bg-primary-50 rounded-xl">
          <h4 className="font-heading text-lg font-semibold text-text-primary mb-4">
            Choose a specific type for your {selectedEventType.name.toLowerCase()}:
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selectedEventType.subTypes.map((subType) => (
              <label
                key={subType}
                className="flex items-center space-x-3 p-3 bg-surface rounded-lg border border-border cursor-pointer hover:bg-primary-50 transition-colors duration-200"
              >
                <input
                  type="radio"
                  name="eventSubType"
                  value={subType}
                  checked={formData.eventSubType === subType}
                  onChange={(e) => updateFormData('eventSubType', e.target.value)}
                  className="w-4 h-4 text-primary focus:ring-primary-500"
                />
                <span className="text-text-primary font-medium">{subType}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Additional Information */}
      <div className="bg-accent-50 p-6 rounded-xl">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent-600 mt-1" strokeWidth={2} />
          <div>
            <h4 className="font-medium text-accent-800 mb-2">Need help choosing?</h4>
            <p className="text-sm text-accent-700">
              Our event specialists can help you determine the best event type and package for your needs. 
              You can always modify your selection later in the planning process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventTypeSelection;