import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const RecentActivity = () => {
  const [showAll, setShowAll] = useState(false);

  const mockActivities = [
    {
      id: 1,
      type: "booking_confirmed",
      title: "Booking Confirmed",
      description: "Your wedding booking has been confirmed by Emma Wilson",
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: "CheckCircle",
      iconColor: "text-success",
      iconBg: "bg-success-50",
      relatedEvent: "Sarah & Michael\'s Wedding",
      actionBy: {
        name: "Emma Wilson",
        role: "Event Planner",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
      }
    },
    {
      id: 2,
      type: "payment_received",
      title: "Payment Received",
      description: "Second payment of $4,500 has been processed successfully",
      timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
      icon: "CreditCard",
      iconColor: "text-primary",
      iconBg: "bg-primary-50",
      relatedEvent: "Sarah & Michael\'s Wedding",
      amount: 4500
    },
    {
      id: 3,
      type: "document_uploaded",
      title: "Document Uploaded",
      description: "Guest list has been uploaded and reviewed",
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
      icon: "Upload",
      iconColor: "text-accent",
      iconBg: "bg-accent-50",
      relatedEvent: "Emma\'s 25th Birthday",
      documentName: "Guest List.pdf"
    },
    {
      id: 4,
      type: "message_received",
      title: "New Message",
      description: "You have a new message from your event planner",
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      icon: "MessageCircle",
      iconColor: "text-warning",
      iconBg: "bg-warning-50",
      relatedEvent: "Corporate Annual Gala",
      actionBy: {
        name: "David Chen",
        role: "Event Coordinator",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
      },
      messagePreview: "Hi Sarah, I wanted to discuss the catering options for your corporate event..."
    },
    {
      id: 5,
      type: "booking_created",
      title: "New Booking Created",
      description: "Birthday celebration package booking has been created",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      icon: "Plus",
      iconColor: "text-primary",
      iconBg: "bg-primary-50",
      relatedEvent: "Emma\'s 25th Birthday",
      packageName: "Birthday Celebration Package"
    },
    {
      id: 6,
      type: "reminder",
      title: "Payment Reminder",
      description: "Final payment for your birthday event is due in 5 days",
      timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
      icon: "AlertCircle",
      iconColor: "text-error",
      iconBg: "bg-error-50",
      relatedEvent: "Emma\'s 25th Birthday",
      dueDate: "2024-04-20",
      amount: 2500
    },
    {
      id: 7,
      type: "venue_confirmed",
      title: "Venue Confirmed",
      description: "Grand Ballroom Hotel has been confirmed for your wedding",
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      icon: "MapPin",
      iconColor: "text-success",
      iconBg: "bg-success-50",
      relatedEvent: "Sarah & Michael\'s Wedding",
      venueName: "Grand Ballroom Hotel"
    },
    {
      id: 8,
      type: "contract_signed",
      title: "Contract Signed",
      description: "Event contract has been digitally signed and processed",
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
      icon: "FileText",
      iconColor: "text-primary",
      iconBg: "bg-primary-50",
      relatedEvent: "Corporate Annual Gala",
      contractType: "Corporate Event Agreement"
    }
  ];

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return timestamp.toLocaleDateString();
  };

  const displayActivities = showAll ? mockActivities : mockActivities.slice(0, 5);

  const renderActivityContent = (activity) => {
    switch (activity.type) {
      case 'booking_confirmed': case'message_received':
        return (
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 ${activity.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
              <Icon name={activity.icon} size={20} className={activity.iconColor} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{activity.title}</p>
                  <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
                  {activity.messagePreview && (
                    <p className="text-sm text-text-secondary mt-2 p-2 bg-surface-secondary rounded-lg italic">
                      "{activity.messagePreview.substring(0, 80)}..."
                    </p>
                  )}
                  <p className="text-xs text-text-tertiary mt-2">{activity.relatedEvent}</p>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  {activity.actionBy && (
                    <div className="flex items-center space-x-2">
                      <Image
                        src={activity.actionBy.avatar}
                        alt={activity.actionBy.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                      <div className="text-right">
                        <p className="text-xs font-medium text-text-primary">{activity.actionBy.name}</p>
                        <p className="text-xs text-text-secondary">{activity.actionBy.role}</p>
                      </div>
                    </div>
                  )}
                  <span className="text-xs text-text-tertiary whitespace-nowrap">
                    {getTimeAgo(activity.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'payment_received':
        return (
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 ${activity.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
              <Icon name={activity.icon} size={20} className={activity.iconColor} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{activity.title}</p>
                  <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
                  <p className="text-xs text-text-tertiary mt-2">{activity.relatedEvent}</p>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-success">${activity.amount?.toLocaleString()}</p>
                  <span className="text-xs text-text-tertiary whitespace-nowrap">
                    {getTimeAgo(activity.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'reminder':
        return (
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 ${activity.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
              <Icon name={activity.icon} size={20} className={activity.iconColor} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{activity.title}</p>
                  <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
                  <div className="flex items-center space-x-4 mt-2">
                    <p className="text-xs text-text-tertiary">{activity.relatedEvent}</p>
                    <p className="text-xs text-error">Due: {new Date(activity.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-bold text-error">${activity.amount?.toLocaleString()}</p>
                  <span className="text-xs text-text-tertiary whitespace-nowrap">
                    {getTimeAgo(activity.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-start space-x-3">
            <div className={`w-10 h-10 ${activity.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
              <Icon name={activity.icon} size={20} className={activity.iconColor} strokeWidth={2} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{activity.title}</p>
                  <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
                  <p className="text-xs text-text-tertiary mt-2">{activity.relatedEvent}</p>
                </div>
                <span className="text-xs text-text-tertiary whitespace-nowrap ml-4">
                  {getTimeAgo(activity.timestamp)}
                </span>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading text-xl font-semibold text-text-primary">
            Recent Activity
          </h3>
          <p className="text-text-secondary text-sm mt-1">
            Stay updated with your event planning progress
          </p>
        </div>
        <button
          onClick={() => setShowAll(!showAll)}
          className="text-primary hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
        >
          <span>{showAll ? 'Show Less' : 'View All'}</span>
          <Icon 
            name={showAll ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            strokeWidth={2} 
          />
        </button>
      </div>

      <div className="space-y-6">
        {displayActivities.map((activity, index) => (
          <div key={activity.id}>
            {renderActivityContent(activity)}
            {index < displayActivities.length - 1 && (
              <div className="ml-5 mt-4 border-l border-border h-4"></div>
            )}
          </div>
        ))}
      </div>

      {mockActivities.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Activity" size={64} className="text-text-tertiary mx-auto mb-4" />
          <h4 className="font-heading text-lg font-semibold text-text-primary mb-2">
            No Recent Activity
          </h4>
          <p className="text-text-secondary">
            Your event planning activities will appear here
          </p>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-8 pt-6 border-t border-border">
        <h4 className="font-semibold text-text-primary mb-4">Quick Actions</h4>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center space-x-2 p-3 text-left hover:bg-surface-secondary rounded-lg transition-colors duration-200">
            <Icon name="MessageCircle" size={18} className="text-primary" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">Send Message</span>
          </button>
          <button className="flex items-center space-x-2 p-3 text-left hover:bg-surface-secondary rounded-lg transition-colors duration-200">
            <Icon name="Upload" size={18} className="text-primary" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">Upload Document</span>
          </button>
          <button className="flex items-center space-x-2 p-3 text-left hover:bg-surface-secondary rounded-lg transition-colors duration-200">
            <Icon name="CreditCard" size={18} className="text-primary" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">Make Payment</span>
          </button>
          <button className="flex items-center space-x-2 p-3 text-left hover:bg-surface-secondary rounded-lg transition-colors duration-200">
            <Icon name="Calendar" size={18} className="text-primary" strokeWidth={2} />
            <span className="text-sm font-medium text-text-primary">Schedule Meeting</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;