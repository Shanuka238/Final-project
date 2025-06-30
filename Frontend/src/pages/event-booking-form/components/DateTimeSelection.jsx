import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const DateTimeSelection = ({ formData, updateFormData, errors }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const timeSlots = [
    { value: '09:00', label: '9:00 AM', available: true },
    { value: '10:00', label: '10:00 AM', available: true },
    { value: '11:00', label: '11:00 AM', available: false },
    { value: '12:00', label: '12:00 PM', available: true },
    { value: '13:00', label: '1:00 PM', available: true },
    { value: '14:00', label: '2:00 PM', available: true },
    { value: '15:00', label: '3:00 PM', available: false },
    { value: '16:00', label: '4:00 PM', available: true },
    { value: '17:00', label: '5:00 PM', available: true },
    { value: '18:00', label: '6:00 PM', available: true },
    { value: '19:00', label: '7:00 PM', available: true },
    { value: '20:00', label: '8:00 PM', available: false }
  ];

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const isDateAvailable = (date) => {
    const today = new Date();
    const selectedDate = new Date(selectedYear, selectedMonth, date);
    
    // Disable past dates
    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      return false;
    }
    
    // Mock unavailable dates (e.g., already booked)
    const unavailableDates = [15, 22, 29];
    return !unavailableDates.includes(date);
  };

  const handleDateSelect = (date) => {
    const selectedDate = new Date(selectedYear, selectedMonth, date);
    const formattedDate = selectedDate.toISOString().split('T')[0];
    updateFormData('eventDate', formattedDate);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    // Days of the month
    for (let date = 1; date <= daysInMonth; date++) {
      const isAvailable = isDateAvailable(date);
      const isSelected = formData.eventDate === new Date(selectedYear, selectedMonth, date).toISOString().split('T')[0];
      
      days.push(
        <button
          key={date}
          onClick={() => isAvailable && handleDateSelect(date)}
          disabled={!isAvailable}
          className={`h-10 w-10 rounded-lg text-sm font-medium transition-all duration-200 ${
            isSelected
              ? 'bg-primary text-white shadow-primary'
              : isAvailable
              ? 'bg-surface hover:bg-primary-50 text-text-primary border border-border hover:border-primary-300' :'bg-gray-100 text-gray-400 cursor-not-allowed'
          }`}
        >
          {date}
        </button>
      );
    }

    return days;
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h3 className="font-heading text-2xl font-semibold text-text-primary mb-2">
          When is your event?
        </h3>
        <p className="text-text-secondary">
          Select your preferred date and time
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-heading text-lg font-semibold text-text-primary">
              Select Date
            </h4>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  if (selectedMonth === 0) {
                    setSelectedMonth(11);
                    setSelectedYear(selectedYear - 1);
                  } else {
                    setSelectedMonth(selectedMonth - 1);
                  }
                }}
                className="p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
              >
                <Icon name="ChevronLeft" size={20} strokeWidth={2} />
              </button>
              
              <div className="text-center min-w-[140px]">
                <p className="font-medium text-text-primary">
                  {months[selectedMonth]} {selectedYear}
                </p>
              </div>
              
              <button
                onClick={() => {
                  if (selectedMonth === 11) {
                    setSelectedMonth(0);
                    setSelectedYear(selectedYear + 1);
                  } else {
                    setSelectedMonth(selectedMonth + 1);
                  }
                }}
                className="p-2 rounded-lg hover:bg-primary-50 transition-colors duration-200"
              >
                <Icon name="ChevronRight" size={20} strokeWidth={2} />
              </button>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-xl p-4">
            {/* Calendar Header */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-text-secondary">
                  {day}
                </div>
              ))}
            </div>
            
            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>
          </div>

          {errors.eventDate && (
            <p className="text-error text-sm">{errors.eventDate}</p>
          )}

          {/* Legend */}
          <div className="flex items-center justify-center space-x-6 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-primary rounded"></div>
              <span className="text-text-secondary">Selected</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-surface border border-border rounded"></div>
              <span className="text-text-secondary">Available</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-gray-100 rounded"></div>
              <span className="text-text-secondary">Unavailable</span>
            </div>
          </div>
        </div>

        {/* Time Selection */}
        <div className="space-y-4">
          <h4 className="font-heading text-lg font-semibold text-text-primary">
            Select Time
          </h4>
          
          <div className="bg-surface border border-border rounded-xl p-4">
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot) => (
                <button
                  key={slot.value}
                  onClick={() => slot.available && updateFormData('eventTime', slot.value)}
                  disabled={!slot.available}
                  className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    formData.eventTime === slot.value
                      ? 'bg-primary text-white shadow-primary'
                      : slot.available
                      ? 'bg-surface hover:bg-primary-50 text-text-primary border border-border hover:border-primary-300' :'bg-gray-100 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {slot.label}
                  {!slot.available && (
                    <div className="text-xs text-gray-400 mt-1">Booked</div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Date & Time Summary */}
          {formData.eventDate && (
            <div className="bg-primary-50 p-4 rounded-xl">
              <h5 className="font-medium text-primary mb-2">Selected Date & Time:</h5>
              <div className="space-y-1">
                <p className="text-text-primary">
                  <Icon name="Calendar" size={16} className="inline mr-2" strokeWidth={2} />
                  {new Date(formData.eventDate).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                {formData.eventTime && (
                  <p className="text-text-primary">
                    <Icon name="Clock" size={16} className="inline mr-2" strokeWidth={2} />
                    {timeSlots.find(slot => slot.value === formData.eventTime)?.label}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-accent-50 p-6 rounded-xl">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-accent-600 mt-1" strokeWidth={2} />
          <div>
            <h4 className="font-medium text-accent-800 mb-2">Booking Information</h4>
            <ul className="text-sm text-accent-700 space-y-1">
              <li>• Events must be booked at least 7 days in advance</li>
              <li>• Weekend dates may have limited availability</li>
              <li>• Time slots shown are based on current availability</li>
              <li>• Final confirmation will be sent within 24 hours</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DateTimeSelection;