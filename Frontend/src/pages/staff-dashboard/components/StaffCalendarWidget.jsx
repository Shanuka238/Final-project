import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const StaffCalendarWidget = ({ events = [] }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();
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
  const isSelected = (date) => selectedDate && date.toDateString() === selectedDate.toDateString();

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 flex items-center justify-center"></div>);
    }
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
      const eventsForDay = getEventsForDate(date);
      const hasEvents = eventsForDay.length > 0;
      days.push(
        <button
          key={day}
          className={`h-10 w-10 flex items-center justify-center rounded-full transition-colors duration-200 ${
            isToday(date)
              ? 'bg-purple-600 text-white'
              : isSelected(date)
              ? 'bg-purple-100 text-purple-800'
              : 'hover:bg-purple-50'
          } ${hasEvents ? 'border-2 border-purple-400' : ''}`}
          onClick={() => setSelectedDate(date)}
        >
          {day}
        </button>
      );
    }
    return days;
  };

  return (
    <div className="">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-lg font-semibold text-purple-800">Calendar</h3>
        <div className="flex items-center space-x-2">
          <button onClick={() => navigateMonth(-1)} className="p-1 rounded-full hover:bg-purple-50">
            <Icon name="ChevronLeft" size={20} strokeWidth={2} />
          </button>
          <span className="font-medium text-gray-700">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </span>
          <button onClick={() => navigateMonth(1)} className="p-1 rounded-full hover:bg-purple-50">
            <Icon name="ChevronRight" size={20} strokeWidth={2} />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-xs text-gray-400 text-center py-1">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {renderCalendarDays()}
      </div>
      {selectedDate && (
        <div className="mt-4">
          <h4 className="font-semibold text-purple-800 mb-2">
            Events on {selectedDate.toLocaleDateString()}
          </h4>
          {getEventsForDate(selectedDate).length === 0 ? (
            <div className="text-gray-500 text-sm">No events for this day.</div>
          ) : (
            <ul className="space-y-2">
              {getEventsForDate(selectedDate).map((event) => (
                <li key={event.id} className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                  <span className="text-sm text-purple-900">{event.client}</span>
                  <span className="text-xs text-gray-500">{event.location}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default StaffCalendarWidget;
