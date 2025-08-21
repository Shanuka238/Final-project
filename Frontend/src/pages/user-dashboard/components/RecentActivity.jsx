import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import { fetchUserActivities } from 'api/dashboard';

const RecentActivity = ({ user }) => {
  const [showAll, setShowAll] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      fetchUserActivities(user.id)
        .then((data) => setActivities(data))
        .catch(() => setActivities([]))
        .finally(() => setLoading(false));
    } else {
      setActivities([]);
      setLoading(true);
    }
  }, [user]);

  if (loading) {
    return <div className="text-center py-12">Loading recent activity...</div>;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayActivities = activities.filter(activity => {
    if (!activity.timestamp) return false;
    const activityDate = new Date(activity.timestamp);
    activityDate.setHours(0, 0, 0, 0);
    return activityDate.getTime() === today.getTime();
  });
  const displayActivities = showAll ? todayActivities : todayActivities.slice(0, 5);

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-heading text-xl font-semibold text-text-primary">Recent Activity</h3>
          <p className="text-text-secondary text-sm mt-1">Your latest actions and updates</p>
        </div>
        {activities.length > 5 && (
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-primary hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
          >
            <span>{showAll ? 'Show Less' : 'Show All'}</span>
            <Icon name={showAll ? 'ChevronUp' : 'ChevronDown'} size={16} strokeWidth={2} />
          </button>
        )}
      </div>
      <div className="divide-y divide-border">
        {displayActivities.map((activity) => (
          <div key={activity._id} className="flex items-start space-x-4 py-4">
            <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${activity.iconBg || 'bg-surface-secondary'}`}>
              <Icon name={activity.icon || 'Activity'} size={24} className={activity.iconColor || 'text-primary'} strokeWidth={2} />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-text-primary text-base">{activity.title}</h4>
                {activity.relatedEvent && (
                  <span className="text-xs bg-surface-secondary text-text-secondary px-2 py-1 rounded-full">{activity.relatedEvent}</span>
                )}
              </div>
              <p className="text-sm text-text-secondary mt-1">{activity.description}</p>
              {activity.actionBy && (
                <div className="flex items-center space-x-2 mt-2">
                  <span className="text-xs text-text-secondary">{activity.actionBy.name} ({activity.actionBy.role})</span>
                </div>
              )}
              {activity.amount && (
                <div className="text-xs text-success mt-1">+${activity.amount.toLocaleString()}</div>
              )}
              <div className="text-xs text-text-tertiary mt-1">
                {activity.timestamp ? new Date(activity.timestamp).toLocaleString() : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
      {activities.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Activity" size={64} className="text-text-tertiary mx-auto mb-4" />
          <h4 className="font-heading text-lg font-semibold text-text-primary mb-2">No Recent Activity</h4>
          <p className="text-text-secondary mb-6">You have no recent actions or updates yet.</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;