import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
// ...removed Clerk import...
import { fetchUserEvents } from 'api/dashboard';

const CalendarWidget = ({ user }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      fetchUserEvents(user.id)
        .then((data) => setEvents(data))
        .catch(() => setEvents([]))
        .finally(() => setLoading(false));
    } else {
      setEvents([]);
      setLoading(true);
    }
  }, [user]);

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
    return events.filter(event => event.date === dateString);
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
      const eventsForDay = getEventsForDate(date);
      const hasEvents = eventsForDay.length > 0;

      days.push(
        <button
          key={day}
          className={`h-10 w-10 flex items-center justify-center rounded-full transition-colors duration-200 ${
            isToday(date)
              ? 'bg-primary text-white'
              : isSelected(date)
              ? 'bg-primary-100 text-primary'
              : 'hover:bg-primary-50'
          } ${hasEvents ? 'border-2 border-accent' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          {day}
        </button>
      );
    }

    return days;
  };

  if (loading) {
    return <div className="text-center py-12">Loading calendar...</div>;
  }

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-text-primary">
          Calendar
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => navigateMonth(-1)}
            className="p-1 rounded-full hover:bg-primary-50"
          >
            <Icon name="ChevronLeft" size={20} strokeWidth={2} />
          </button>
          <span className="font-medium text-text-secondary">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button
            onClick={() => navigateMonth(1)}
            className="p-1 rounded-full hover:bg-primary-50"
          >
            <Icon name="ChevronRight" size={20} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-xs text-text-tertiary text-center py-1">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>

      {/* Events for selected date */}
      {selectedDate && (
        <div className="mt-4">
          <h4 className="font-semibold text-text-primary mb-2">
            Events on {selectedDate.toLocaleDateString()}
          </h4>
          {getEventsForDate(selectedDate).length === 0 ? (
            <div className="text-text-secondary text-sm">No events for this day.</div>
          ) : (
            <ul className="space-y-2">
              {getEventsForDate(selectedDate).map((event) => (
                <li key={event._id} className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${event.color || 'bg-primary'}`}></span>
                  <span className="text-sm text-text-primary">{event.title}</span>
                  <span className="text-xs text-text-secondary">{event.time}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default CalendarWidget;