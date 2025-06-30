import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const UpcomingEvents = ({ showAll = false, setActiveTab }) => {
  const mockEvents = [
  {
    id: 1,
    title: "Sarah & Michael\'s Wedding",
    type: "Wedding",
    date: "2024-06-15",
    time: "4:00 PM",
    location: "Grand Ballroom, Luxury Hotel",
    package: "Premium Wedding Package",
    status: "confirmed",
    guests: 150,
    planner: "Emma Wilson",
    plannerAvatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=400&h=250&fit=crop",
    progress: 85,
    nextAction: "Final menu confirmation",
    daysUntil: 45
  },
  {
    id: 2,
    title: "Corporate Annual Gala",
    type: "Corporate",
    date: "2024-05-20",
    time: "7:00 PM",
    location: "Convention Center",
    package: "Corporate Elite Package",
    status: "pending",
    guests: 300,
    planner: "David Chen",
    plannerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=250&fit=crop",
    progress: 60,
    nextAction: "Approve catering menu",
    daysUntil: 20
  },
  {
    id: 3,
    title: "Emma\'s 25th Birthday",
    type: "Birthday",
    date: "2024-04-28",
    time: "6:00 PM",
    location: "Rooftop Garden Venue",
    package: "Birthday Celebration Package",
    status: "requires_action",
    guests: 50,
    planner: "Lisa Rodriguez",
    plannerAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=250&fit=crop",
    progress: 40,
    nextAction: "Upload guest list",
    daysUntil: 8
  }];


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

  const displayEvents = showAll ? mockEvents : mockEvents.slice(0, 2);

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
        {!showAll &&
        <Link
          to="/user-dashboard"
          onClick={() => setActiveTab('events')}
          className="text-primary hover:text-primary-700 font-medium text-sm flex items-center space-x-1">

            <span>View All</span>
            <Icon name="ArrowRight" size={16} strokeWidth={2} />
          </Link>
        }
      </div>

      <div className="space-y-6">
        {displayEvents.map((event) =>
        <div
          key={event.id}
          className="border border-border rounded-xl p-6 hover:shadow-secondary transition-all duration-200">

            <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
              {/* Event Image */}
              <div className="w-full lg:w-48 h-32 rounded-lg overflow-hidden mb-4 lg:mb-0 flex-shrink-0">
                <Image
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover" />

              </div>

              {/* Event Details */}
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
                      {event.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <span className="text-xs text-text-secondary bg-surface-secondary px-2 py-1 rounded-full">
                      {event.daysUntil} days
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-text-primary">
                      Planning Progress
                    </span>
                    <span className="text-sm text-text-secondary">
                      {event.progress}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-secondary rounded-full h-2">
                    <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${event.progress}%` }}>
                  </div>
                  </div>
                </div>

                {/* Event Info & Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 border-t border-border">
                  <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                    <div className="flex items-center space-x-2">
                      <Image
                      src={event.plannerAvatar}
                      alt={event.planner}
                      className="w-8 h-8 rounded-full object-cover" />

                      <div>
                        <p className="text-sm font-medium text-text-primary">{event.planner}</p>
                        <p className="text-xs text-text-secondary">Event Planner</p>
                      </div>
                    </div>
                    <div className="text-sm text-text-secondary">
                      <Icon name="Users" size={16} className="inline mr-1" strokeWidth={2} />
                      {event.guests} guests
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

                {/* Next Action */}
                {event.nextAction &&
              <div className="bg-accent-50 border border-accent-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertCircle" size={16} className="text-accent" strokeWidth={2} />
                      <span className="text-sm font-medium text-accent">Next Action Required:</span>
                    </div>
                    <p className="text-sm text-text-primary mt-1">{event.nextAction}</p>
                  </div>
              }
              </div>
            </div>
          </div>
        )}
      </div>

      {displayEvents.length === 0 &&
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
      }
    </div>);

};

export default UpcomingEvents;