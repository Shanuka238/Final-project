import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from 'components/AppIcon';
import EventTypeSelection from './components/EventTypeSelection';
import DateTimeSelection from './components/DateTimeSelection';
import LocationInput from './components/LocationInput';
import GuestCountSelection from './components/GuestCountSelection';
import BudgetEstimation from './components/BudgetEstimation';
import BookingSummary from './components/BookingSummary';

const EventBookingForm = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: '',
    eventSubType: '',
    eventDate: '',
    eventTime: '',
    location: '',
    guestCount: 50,
    budget: 5000,
    specialRequirements: '',
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    }
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const steps = [
    { id: 1, title: 'Event Type', icon: 'Calendar', description: 'Choose your event type' },
    { id: 2, title: 'Date & Time', icon: 'Clock', description: 'Select date and time' },
    { id: 3, title: 'Location', icon: 'MapPin', description: 'Event location details' },
    { id: 4, title: 'Guest Count', icon: 'Users', description: 'Number of attendees' },
    { id: 5, title: 'Budget', icon: 'DollarSign', description: 'Budget estimation' },
    { id: 6, title: 'Contact Info', icon: 'User', description: 'Your contact details' }
  ];

  useEffect(() => {
    // Load saved form data from localStorage
    const savedData = localStorage.getItem('eventBookingForm');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    // Save form data to localStorage
    localStorage.setItem('eventBookingForm', JSON.stringify(formData));
    validateForm();
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (currentStep >= 1 && !formData.eventType) {
      newErrors.eventType = 'Please select an event type';
    }
    
    if (currentStep >= 2 && !formData.eventDate) {
      newErrors.eventDate = 'Please select an event date';
    }
    
    if (currentStep >= 3 && !formData.location) {
      newErrors.location = 'Please enter event location';
    }
    
    if (currentStep >= 5 && formData.budget < 1000) {
      newErrors.budget = 'Minimum budget should be $1,000';
    }
    
    if (currentStep >= 6) {
      if (!formData.contactInfo.name) {
        newErrors.contactName = 'Please enter your name';
      }
      if (!formData.contactInfo.email) {
        newErrors.contactEmail = 'Please enter your email';
      }
      if (!formData.contactInfo.phone) {
        newErrors.contactPhone = 'Please enter your phone number';
      }
    }
    
    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const updateFormData = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (isFormValid) {
      // Save booking data
      const bookingData = {
        ...formData,
        id: Date.now(),
        status: 'pending',
        createdAt: new Date().toISOString(),
        estimatedCost: calculateEstimatedCost()
      };
      
      // Save to localStorage (mock database)
      const existingBookings = JSON.parse(localStorage.getItem('userBookings') || '[]');
      existingBookings.push(bookingData);
      localStorage.setItem('userBookings', JSON.stringify(existingBookings));
      
      // Clear form data
      localStorage.removeItem('eventBookingForm');
      
      // Navigate to packages page
      navigate('/event-packages', { state: { bookingData } });
    }
  };

  const calculateEstimatedCost = () => {
    let baseCost = formData.budget;
    const guestMultiplier = formData.guestCount / 50;
    return Math.round(baseCost * guestMultiplier);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <EventTypeSelection
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <DateTimeSelection
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <LocationInput
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <GuestCountSelection
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 5:
        return (
          <BudgetEstimation
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 6:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="font-heading text-2xl font-semibold text-text-primary mb-2">
                Contact Information
              </h3>
              <p className="text-text-secondary">
                Please provide your contact details to complete the booking
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.contactInfo.name}
                  onChange={(e) => updateFormData('contactInfo.name', e.target.value)}
                  className={`input-field ${errors.contactName ? 'border-error' : ''}`}
                  placeholder="Enter your full name"
                />
                {errors.contactName && (
                  <p className="text-error text-sm mt-1">{errors.contactName}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.contactInfo.email}
                  onChange={(e) => updateFormData('contactInfo.email', e.target.value)}
                  className={`input-field ${errors.contactEmail ? 'border-error' : ''}`}
                  placeholder="Enter your email address"
                />
                {errors.contactEmail && (
                  <p className="text-error text-sm mt-1">{errors.contactEmail}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.contactInfo.phone}
                  onChange={(e) => updateFormData('contactInfo.phone', e.target.value)}
                  className={`input-field ${errors.contactPhone ? 'border-error' : ''}`}
                  placeholder="Enter your phone number"
                />
                {errors.contactPhone && (
                  <p className="text-error text-sm mt-1">{errors.contactPhone}</p>
                )}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Special Requirements (Optional)
                </label>
                <textarea
                  value={formData.specialRequirements}
                  onChange={(e) => updateFormData('specialRequirements', e.target.value)}
                  className="input-field h-24 resize-none"
                  placeholder="Any special requirements or notes for your event..."
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4">
              Plan Your Perfect Event
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Tell us about your dream event and we'll help bring it to life with our expert planning services
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Steps - Desktop Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h3 className="font-heading text-xl font-semibold text-text-primary mb-6">
                Booking Progress
              </h3>
              
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                      currentStep === step.id
                        ? 'bg-primary-50 border border-primary-200'
                        : currentStep > step.id
                        ? 'bg-success-50 border border-success-200' :'bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentStep === step.id
                          ? 'bg-primary text-white'
                          : currentStep > step.id
                          ? 'bg-success text-white' :'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <Icon name="Check" size={20} strokeWidth={2} />
                      ) : (
                        <Icon name={step.icon} size={20} strokeWidth={2} />
                      )}
                    </div>
                    <div className="flex-1">
                      <p
                        className={`font-medium ${
                          currentStep === step.id
                            ? 'text-primary'
                            : currentStep > step.id
                            ? 'text-success' :'text-text-secondary'
                        }`}
                      >
                        {step.title}
                      </p>
                      <p className="text-sm text-text-secondary">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Booking Summary */}
              <BookingSummary formData={formData} estimatedCost={calculateEstimatedCost()} />
            </div>
          </div>

          {/* Main Form Content */}
          <div className="lg:col-span-2">
            {/* Mobile Progress Bar */}
            <div className="lg:hidden mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-text-secondary">
                  Step {currentStep} of {steps.length}
                </span>
                <span className="text-sm font-medium text-primary">
                  {Math.round((currentStep / steps.length) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="card">
              {renderStepContent()}

              {/* Navigation Buttons */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-medium transition-all duration-200 ${
                    currentStep === 1
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed' :'bg-secondary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  <Icon name="ChevronLeft" size={20} strokeWidth={2} />
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => {
                      localStorage.setItem('eventBookingForm', JSON.stringify(formData));
                      alert('Draft saved successfully!');
                    }}
                    className="px-4 py-2 text-text-secondary hover:text-primary transition-colors duration-200"
                  >
                    Save Draft
                  </button>

                  {currentStep === steps.length ? (
                    <button
                      onClick={handleSubmit}
                      disabled={!isFormValid}
                      className={`flex items-center space-x-2 px-8 py-3 rounded-lg font-medium transition-all duration-200 ${
                        isFormValid
                          ? 'btn-primary' :'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      <Icon name="Send" size={20} strokeWidth={2} />
                      <span>Submit Booking</span>
                    </button>
                  ) : (
                    <button
                      onClick={nextStep}
                      className="flex items-center space-x-2 btn-primary"
                    >
                      <span>Continue</span>
                      <Icon name="ChevronRight" size={20} strokeWidth={2} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBookingForm;