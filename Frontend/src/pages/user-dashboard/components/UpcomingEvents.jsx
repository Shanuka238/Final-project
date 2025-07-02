import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import { useUser } from '@clerk/clerk-react';
import { fetchUserEvents } from 'api/dashboard';

const UpcomingEvents = ({ showAll = false, setActiveTab }) => {
  const { user } = useUser();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserEvents(user.id)
        .then((data) => setEvents(data))
        .catch(() => setEvents([]))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'text-success bg-success-50 border-success-200';
      case 'pending':
        return 'text-warning bg-warning-50 border-warning-200';
      case 'requires_action':
        return 'text-error bg-error-50 border-error-200';
      default:
        return 'text-text-secondary bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'requires_action':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  if (loading) {
    return <div className="text-center py-12">Loading events...</div>;
  }

  const displayEvents = showAll ? events : events.slice(0, 2);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading text-xl font-semibold text-text-primary">
            Upcoming Events
          </h3>
          <p className="text-text-secondary text-sm mt-1">
            Track your event planning progress
          </p>
        </div>
        {!showAll && setActiveTab && (
          <Link
            to="/user-dashboard"
            onClick={() => setActiveTab('events')}
            className="text-primary hover:text-primary-700 font-medium text-sm flex items-center space-x-1">
            <span>View All</span>
            <Icon name="ArrowRight" size={16} strokeWidth={2} />
          </Link>
        )}
      </div>
      <div className="space-y-6">
        {displayEvents.map((event) => (
          <div
            key={event._id}
            className="border border-border rounded-xl p-6 hover:shadow-secondary transition-all duration-200">
            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
              <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden mb-4 lg:mb-0 flex-shrink-0">
                <Image src={event.image} alt={event.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="font-heading text-lg font-semibold text-text-primary mb-1">
                      {event.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <Icon name="Calendar" size={16} strokeWidth={2} />
                        <span>{new Date(event.date).toLocaleDateString()} at {event.time}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Icon name="MapPin" size={16} strokeWidth={2} />
                        <span>{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(event.status)}`}>
                      <Icon name={getStatusIcon(event.status)} size={12} className="inline mr-1" strokeWidth={2} />
                      {event.status?.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-xs text-text-secondary bg-surface-secondary px-2 py-1 rounded-full">
                      {event.daysUntil || 0} days
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">Planning Progress</span>
                    <span className="text-sm text-text-secondary">{event.progress || 0}%</span>
                  </div>
                  <div className="w-full bg-surface-secondary rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full transition-all duration-300" style={{ width: `${event.progress || 0}%` }}></div>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <div className="flex items-center space-x-2">
                      <Image src={event.plannerAvatar} alt={event.planner} className="w-8 h-8 rounded-full object-cover" />
                      <div>
                        <p className="text-sm font-medium text-text-primary">{event.planner}</p>
                        <p className="text-xs text-text-secondary">Event Planner</p>
                      </div>
                    </div>
                    <div className="text-sm text-text-secondary">
                      <Icon name="Users" size={16} className="inline mr-1" strokeWidth={2} />
                      {event.guests || 0} guests
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="flex items-center space-x-1 px-3 py-2 text-sm text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200">
                      <Icon name="Eye" size={16} strokeWidth={2} />
                      <span>View Details</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-2 text-sm text-text-secondary hover:bg-surface-secondary rounded-lg transition-colors duration-200">
                      <Icon name="Edit" size={16} strokeWidth={2} />
                      <span>Modify</span>
                    </button>
                    <button className="flex items-center space-x-1 px-3 py-2 text-sm text-text-secondary hover:bg-surface-secondary rounded-lg transition-colors duration-200">
                      <Icon name="MessageCircle" size={16} strokeWidth={2} />
                      <span>Contact</span>
                    </button>
                  </div>
                </div>
                {event.nextAction && (
                  <div className="bg-accent-50 border border-accent-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={16} className="text-accent" strokeWidth={2} />
                      <span className="text-sm font-medium text-accent">Next Action Required:</span>
                    </div>
                    <p className="text-sm text-text-primary mt-1">{event.nextAction}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {displayEvents.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Calendar" size={64} className="text-text-tertiary mx-auto mb-4" />
          <h4 className="font-heading text-lg font-semibold text-text-primary mb-2">
            No Upcoming Events
          </h4>
          <p className="text-text-secondary mb-6">
            Start planning your next memorable event today!
          </p>
          <Link to="/event-booking-form" className="btn-primary">
            Book Your First Event
          </Link>
        </div>
      )}
    </div>
  );
};

export default UpcomingEvents;