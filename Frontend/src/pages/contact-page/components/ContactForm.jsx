import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const ContactForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    contactMethod: 'email',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const eventTypes = [
    { value: '', label: 'Select Event Type' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'birthday', label: 'Birthday Party' },
    { value: 'corporate', label: 'Corporate Event' },
    { value: 'anniversary', label: 'Anniversary' },
    { value: 'graduation', label: 'Graduation' },
    { value: 'baby-shower', label: 'Baby Shower' },
    { value: 'other', label: 'Other' }
  ];

  const contactMethods = [
    { value: 'email', label: 'Email', icon: 'Mail' },
    { value: 'phone', label: 'Phone Call', icon: 'Phone' },
    { value: 'consultation', label: 'In-Person Consultation', icon: 'Users' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(formData.phone.replace(/[\s\-\(\)]/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.eventType) {
      newErrors.eventType = 'Please select an event type';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters long';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log('Form submitted:', formData);
    onSubmit();
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      eventType: '',
      contactMethod: 'email',
      message: ''
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="bg-surface rounded-2xl shadow-primary p-8">
      <div className="mb-8">
        <h2 className="font-heading text-3xl font-bold text-text-primary mb-4">
          Send Us a Message
        </h2>
        <p className="text-text-secondary">
          Fill out the form below and we'll get back to you within 24 hours. We're excited to help plan your special event!
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-semibold text-text-primary mb-2">
            Full Name *
          </label>
          <div className="relative">
            <Icon 
              name="User" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              strokeWidth={2}
            />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`input-field pl-12 ${errors.name ? 'border-error focus:ring-error' : ''}`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} strokeWidth={2} />
              <span>{errors.name}</span>
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-text-primary mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Icon 
              name="Mail" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              strokeWidth={2}
            />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`input-field pl-12 ${errors.email ? 'border-error focus:ring-error' : ''}`}
              placeholder="Enter your email address"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} strokeWidth={2} />
              <span>{errors.email}</span>
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label htmlFor="phone" className="block text-sm font-semibold text-text-primary mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Icon 
              name="Phone" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              strokeWidth={2}
            />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className={`input-field pl-12 ${errors.phone ? 'border-error focus:ring-error' : ''}`}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} strokeWidth={2} />
              <span>{errors.phone}</span>
            </p>
          )}
        </div>

        {/* Event Type Field */}
        <div>
          <label htmlFor="eventType" className="block text-sm font-semibold text-text-primary mb-2">
            Event Type *
          </label>
          <div className="relative">
            <Icon 
              name="Calendar" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary" 
              strokeWidth={2}
            />
            <select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleInputChange}
              className={`input-field pl-12 ${errors.eventType ? 'border-error focus:ring-error' : ''}`}
            >
              {eventTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          {errors.eventType && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} strokeWidth={2} />
              <span>{errors.eventType}</span>
            </p>
          )}
        </div>

        {/* Preferred Contact Method */}
        <div>
          <label className="block text-sm font-semibold text-text-primary mb-3">
            Preferred Contact Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {contactMethods.map((method) => (
              <label
                key={method.value}
                className={`flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-all duration-200 ${
                  formData.contactMethod === method.value
                    ? 'border-primary bg-primary-50 text-primary' :'border-border hover:border-primary-300 hover:bg-primary-50/50'
                }`}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={method.value}
                  checked={formData.contactMethod === method.value}
                  onChange={handleInputChange}
                  className="sr-only"
                />
                <Icon name={method.icon} size={20} strokeWidth={2} />
                <span className="text-sm font-medium">{method.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-semibold text-text-primary mb-2">
            Message *
          </label>
          <div className="relative">
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={5}
              className={`input-field resize-none ${errors.message ? 'border-error focus:ring-error' : ''}`}
              placeholder="Tell us about your event, preferred dates, guest count, budget, and any special requirements..."
            />
          </div>
          {errors.message && (
            <p className="mt-1 text-sm text-error flex items-center space-x-1">
              <Icon name="AlertCircle" size={16} strokeWidth={2} />
              <span>{errors.message}</span>
            </p>
          )}
          <p className="mt-1 text-xs text-text-secondary">
            {formData.message.length}/500 characters
          </p>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full btn-primary flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Sending Message...</span>
            </>
          ) : (
            <>
              <Icon name="Send" size={20} strokeWidth={2} />
              <span>Send Message</span>
            </>
          )}
        </button>

        {/* Response Time Info */}
        <div className="bg-primary-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Clock" size={20} className="text-primary mt-0.5" strokeWidth={2} />
            <div>
              <h4 className="font-semibold text-primary mb-1">Response Time</h4>
              <p className="text-sm text-text-secondary">
                We typically respond to inquiries within 24 hours during business days. 
                For urgent matters, please call us directly at{' '}
                <a href="tel:+1-555-PARTY-01" className="text-primary font-medium hover:underline">
                  +1 (555) PARTY-01
                </a>
              </p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;