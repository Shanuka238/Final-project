import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      title: "Wedding Planning Meeting",
      date: "2024-04-15",
      time: "2:00 PM",
      type: "meeting",
      color: "bg-primary"
    },
    {
      id: 2,
      title: "Venue Visit",
      date: "2024-04-18",
      time: "10:00 AM",
      type: "visit",
      color: "bg-accent"
    },
    {
      id: 3,
      title: "Final Payment Due",
      date: "2024-04-22",
      time: "11:59 PM",
      type: "payment",
      color: "bg-error"
    },
    {
      id: 4,
      title: "Emma\'s Birthday Party",
      date: "2024-04-28",
      time: "6:00 PM",
      type: "event",
      color: "bg-success"
    }
  ];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const getEventsForDate = (date) => {
    const dateString = date.toISOString().split('T')[0];
    return mockEvents.filter(event => event.date === dateString);
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    return selectedDate && date.toDateString() === selectedDate.toDateString();
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-10 flex items-center justify-center">
        </div>
      );
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const events = getEventsForDate(date);
      const hasEvents = events.length > 0;

      days.push(
        <button
          key={day}
          onClick={() => setSelectedDate(date)}
          className={`h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-all duration-200 relative ${
            isToday(date)
              ? 'bg-primary text-white'
              : isSelected(date)
              ? 'bg-primary-100 text-primary' :'text-text-primary hover:bg-surface-secondary'
          }`}
        >
          {day}
          {hasEvents && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-1">
              {events.slice(0, 3).map((event, index) => (
                <div
                  key={index}
                  className={`w-1 h-1 rounded-full ${event.color}`}
                ></div>
              ))}
            </div>
          )}
        </button>
      );
    }

    return days;
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    return mockEvents
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);
  };

  const getEventTypeIcon = (type) => {
    switch (type) {
      case 'meeting':
        return 'Users';
      case 'visit':
        return 'MapPin';
      case 'payment':
        return 'CreditCard';
      case 'event':
        return 'Calendar';
      default:
        return 'Circle';
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-text-primary">
          Calendar
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1 rounded-lg hover:bg-surface-secondary transition-colors duration-200"
          >
            <Icon name="ChevronLeft" size={18} strokeWidth={2} />
          </button>
          <button
            onClick={() => navigateMonth(1)}
            className="p-1 rounded-lg hover:bg-surface-secondary transition-colors duration-200"
          >
            <Icon name="ChevronRight" size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Month/Year Header */}
      <div className="text-center mb-4">
        <h4 className="font-semibold text-text-primary">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h4>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-text-secondary">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1 mb-6">
        {renderCalendarDays()}
      </div>

      {/* Upcoming Events */}
      <div>
        <h4 className="font-semibold text-text-primary mb-3 flex items-center space-x-2">
          <Icon name="Clock" size={16} strokeWidth={2} />
          <span>Upcoming</span>
        </h4>
        
        <div className="space-y-2">
          {getUpcomingEvents().map((event) => (
            <div
              key={event.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-surface-secondary transition-colors duration-200"
            >
              <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {event.title}
                </p>
                <p className="text-xs text-text-secondary">
                  {new Date(event.date).toLocaleDateString()} at {event.time}
                </p>
              </div>
              <Icon name={getEventTypeIcon(event.type)} size={16} className="text-text-secondary" strokeWidth={2} />
            </div>
          ))}
        </div>

        {getUpcomingEvents().length === 0 && (
          <div className="text-center py-4">
            <Icon name="Calendar" size={32} className="text-text-tertiary mx-auto mb-2" />
            <p className="text-sm text-text-secondary">No upcoming events</p>
          </div>
        )}
      </div>

      {/* Selected Date Events */}
      {selectedDate && (
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="font-semibold text-text-primary mb-3">
            {selectedDate.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </h4>
          
          {getEventsForDate(selectedDate).length > 0 ? (
            <div className="space-y-2">
              {getEventsForDate(selectedDate).map((event) => (
                <div
                  key={event.id}
                  className="flex items-center space-x-3 p-2 rounded-lg bg-surface-secondary"
                >
                  <div className={`w-3 h-3 rounded-full ${event.color}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-text-primary">
                      {event.title}
                    </p>
                    <p className="text-xs text-text-secondary">{event.time}</p>
                  </div>
                  <Icon name={getEventTypeIcon(event.type)} size={16} className="text-text-secondary" strokeWidth={2} />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-text-secondary">No events on this date</p>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarWidget;