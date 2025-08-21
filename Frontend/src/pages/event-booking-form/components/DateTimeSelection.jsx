import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const DateTimeSelection = ({ formData, updateFormData, errors, bookedSlots = [] }) => {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const unavailableDates = bookedSlots
    .filter(slot => slot.date)
    .map(slot => {
      const d = new Date(slot.date);
      return d.getDate();
    });

  const unavailableTimes = bookedSlots
    .filter(slot => slot.date === formData.eventDate)
    .map(slot => slot.time);

  const timeSlots = [
    { value: '00:00', label: '12:00 AM', available: true },
    { value: '01:00', label: '1:00 AM', available: true },
    { value: '02:00', label: '2:00 AM', available: true },
    { value: '03:00', label: '3:00 AM', available: true },
    { value: '04:00', label: '4:00 AM', available: true },
    { value: '05:00', label: '5:00 AM', available: true },
    { value: '06:00', label: '6:00 AM', available: true },
    { value: '07:00', label: '7:00 AM', available: true },
    { value: '08:00', label: '8:00 AM', available: true },
    { value: '09:00', label: '9:00 AM', available: true },
    { value: '10:00', label: '10:00 AM', available: true },
    { value: '11:00', label: '11:00 AM', available: true },
    { value: '12:00', label: '12:00 PM', available: true },
    { value: '13:00', label: '1:00 PM', available: true },
    { value: '14:00', label: '2:00 PM', available: true },
    { value: '15:00', label: '3:00 PM', available: true },
    { value: '16:00', label: '4:00 PM', available: true },
    { value: '17:00', label: '5:00 PM', available: true },
    { value: '18:00', label: '6:00 PM', available: true },
    { value: '19:00', label: '7:00 PM', available: true },
    { value: '20:00', label: '8:00 PM', available: true },
    { value: '21:00', label: '9:00 PM', available: true },
    { value: '22:00', label: '10:00 PM', available: true },
    { value: '23:00', label: '11:00 PM', available: true }
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
    if (selectedDate < today.setHours(0, 0, 0, 0)) {
      return false;
    }
    return !unavailableDates.includes(date);
  };

  const handleDateSelect = (date) => {
    // Format as YYYY-MM-DD in local time
    const mm = String(selectedMonth + 1).padStart(2, '0');
    const dd = String(date).padStart(2, '0');
    const formattedDate = `${selectedYear}-${mm}-${dd}`;
    updateFormData('eventDate', formattedDate);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10"></div>);
    }

    for (let date = 1; date <= daysInMonth; date++) {
      const isAvailable = isDateAvailable(date);
      const mm = String(selectedMonth + 1).padStart(2, '0');
      const dd = String(date).padStart(2, '0');
      const localDateStr = `${selectedYear}-${mm}-${dd}`;
      const isSelected = formData.eventDate === localDateStr;
      
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
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-text-secondary">
                  {day}
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-7 gap-1">
              {renderCalendar()}
            </div>
          </div>

          {errors.eventDate && (
            <p className="text-error text-sm">{errors.eventDate}</p>
          )}
        </div>

        <div className="space-y-4">
          <h4 className="font-heading text-lg font-semibold text-text-primary">
            Select Time
          </h4>
          
          <div className="bg-surface border border-border rounded-xl p-4">
            <div className="grid grid-cols-2 gap-3">
              {timeSlots.map((slot) => {
                const isUnavailable = unavailableTimes.includes(slot.value);
                return (
                  <button
                    key={slot.value}
                    onClick={() => !isUnavailable && updateFormData('eventTime', slot.value)}
                    disabled={isUnavailable}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      formData.eventTime === slot.value
                        ? 'bg-primary text-white shadow-primary'
                        : !isUnavailable
                        ? 'bg-surface hover:bg-primary-50 text-text-primary border border-border hover:border-primary-300'
                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {slot.label}
                    {isUnavailable && (
                      <div className="text-xs text-gray-400 mt-1">Booked</div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

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