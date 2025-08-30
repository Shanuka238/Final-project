import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import { fetchUserUpcomingEvents } from 'api/dashboard';

const UpcomingEvents = ({ showAll = false, setActiveTab, user }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      fetchUserUpcomingEvents(user.id)
        .then((data) => setEvents(data))
        .catch(() => setEvents([]))
        .finally(() => setLoading(false));
    } else {
      setEvents([]);
      setLoading(false);
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

  const today = new Date();
  const computedEvents = events.map(event => {
    const eventDate = new Date(event.date);
    const daysUntil = Math.ceil((eventDate - today) / (1000 * 60 * 60 * 24));
    let status = event.status;
    if (daysUntil < 0) {
      status = 'completed';
    }
    return {
      ...event,
      daysUntil: daysUntil < 0 ? 0 : daysUntil,
      status,
    };
  });
  const displayEvents = showAll ? computedEvents : computedEvents.slice(0, 2);

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
                <Image src={"/assets/images/Upcoming.png"} alt="Upcoming Event" className="w-full h-full object-cover" />
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
                    {Array.isArray(event.features) && event.features.length > 0 && (
                      <div className="mt-2">
                        <h5 className="text-xs font-semibold text-text-primary mb-1">Key Features:</h5>
                        <div className="flex flex-wrap gap-2">
                          {event.features.map((feature, idx) => (
                            <span key={idx} className="inline-flex items-center px-2 py-1 bg-primary-50 text-primary rounded-full text-xs font-medium">
                              <Icon name="Check" size={12} className="mr-1 text-success" strokeWidth={2} />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

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

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <div className="text-sm text-text-secondary">
                      <Icon name="Users" size={16} className="inline mr-1" strokeWidth={2} />
                      {event.guests || 0} guests
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="flex items-center space-x-1 px-3 py-2 text-sm text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                      onClick={() => setActiveTab && setActiveTab('bookings')}
                    >
                      <Icon name="Eye" size={16} strokeWidth={2} />
                      <span>View Details</span>
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
}

export default UpcomingEvents;