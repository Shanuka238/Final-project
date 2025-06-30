import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Icon name="AlertTriangle" size={48} className="text-primary" strokeWidth={1.5} />
          </div>
          <h1 className="font-heading text-6xl font-bold text-primary mb-4">404</h1>
          <h2 className="font-heading text-2xl font-semibold text-text-primary mb-4">
            Page Not Found
          </h2>
          <p className="text-text-secondary mb-8">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            to="/landing-page"
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <Icon name="Home" size={20} strokeWidth={2} />
            <span>Back to Home</span>
          </Link>
          
          <Link
            to="/event-booking-form"
            className="btn-secondary w-full flex items-center justify-center space-x-2"
          >
            <Icon name="Calendar" size={20} strokeWidth={2} />
            <span>Book an Event</span>
          </Link>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border">
          <p className="text-sm text-text-secondary">
            Need help? <Link to="/contact-page" className="text-primary hover:text-primary-700 font-medium">Contact us</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;