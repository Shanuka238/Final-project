import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import EventTypeSelection from './components/EventTypeSelection';
import DateTimeSelection from './components/DateTimeSelection';
import { ServiceTypeSelector, ServiceOptions } from './components/ServiceSelector';
import LocationInput from './components/LocationInput';
import GuestCountSelection from './components/GuestCountSelection';
import BudgetEstimation from './components/BudgetEstimation';
import BookingSummary from './components/BookingSummary';
import NotLoggedIn from './components/NotLoggedIn';
import { useAuth } from 'contexts/AuthContext';
import { bookEvent as apiBookEvent } from 'api/dashboard';
import CenterPopup from 'components/CenterPopup';

const EventBookingForm = () => {
  const { user } = useAuth();
  if (!user) {
    return <NotLoggedIn />;
  }
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    eventType: '',
    eventSubType: '',
    services: [],
    eventDate: '',
    eventTime: '',
    location: '',
    guestCount: 0,
    budget: 0,
    specialRequirements: '',
    contactInfo: {
      name: '',
      email: '',
      phone: ''
    }
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [progress, setProgress] = useState(0);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState([]);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      services: selectedServiceIds
    }));
  }, [selectedServiceIds]);

  const steps = [
    { id: 1, title: 'Event Type', icon: 'Calendar', description: 'Choose your event type' },
    { id: 2, title: 'Services', icon: 'Briefcase', description: 'Select services for your event' },
    { id: 3, title: 'Date & Time', icon: 'Clock', description: 'Select date and time' },
    { id: 4, title: 'Location', icon: 'MapPin', description: 'Event location details' },
    { id: 5, title: 'Guest Count', icon: 'Users', description: 'Number of attendees' },
    { id: 6, title: 'Budget', icon: 'DollarSign', description: 'Budget estimation' },
    { id: 7, title: 'Contact Info', icon: 'User', description: 'Your contact details' }
  ];

  useEffect(() => {
    const savedData = localStorage.getItem('eventBookingForm');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('eventBookingForm', JSON.stringify(formData));
    validateForm();
    calculateProgress();
  }, [formData, currentStep]);

  useEffect(() => {
    fetch('http://localhost:5000/api/events/booked-slots/all')
      .then(res => res.json())
      .then(data => setBookedSlots(data))
      .catch(() => setBookedSlots([]));
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (currentStep >= 1 && !formData.eventType) {
      newErrors.eventType = 'Please select an event type';
    }
    if (currentStep >= 1 && !formData.eventSubType) {
      newErrors.eventSubType = 'Please select an event sub-type';
    }
    if (currentStep >= 2 && (!formData.services || formData.services.length === 0)) {
      newErrors.services = 'Please select at least one service';
    }
    if (currentStep >= 3 && !formData.eventDate) {
      newErrors.eventDate = 'Please select an event date';
    }
    if (currentStep >= 3 && !formData.eventTime) {
      newErrors.eventTime = 'Please select an event time';
    }
    if (currentStep >= 4 && !formData.location) {
      newErrors.location = 'Please enter event location';
    }
    if (currentStep >= 4 && (!formData.guestCount || formData.guestCount <= 0)) {
      newErrors.guestCount = 'Please enter the number of guests';
    }
    if (currentStep >= 5 && (!formData.budget || formData.budget < 1000)) {
      newErrors.budget = 'Minimum budget should be Rs 1,000';
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

  const calculateProgress = () => {
    let total = 11;
    let filled = 0;
    if (formData.eventType) filled++;
    if (formData.eventSubType) filled++;
    if (formData.services && formData.services.length > 0) filled++;
    if (formData.eventDate) filled++;
    if (formData.eventTime) filled++;
    if (formData.location) filled++;
    if (formData.guestCount > 0) filled++;
    if (formData.budget > 0) filled++;
    if (formData.contactInfo.name) filled++;
    if (formData.contactInfo.email) filled++;
    if (formData.contactInfo.phone) filled++;
    setProgress(Math.round((filled / total) * 100));
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

  const goToStep = (step) => {
    setCurrentStep(step);
    if (step === 5) {
      setFormData(prev => ({
        ...prev,
        perGuestCost: 0,
        extraBudget: 0,
        totalAmount: 0
      }));
    }
  };

  const nextStep = () => {
    validateForm();
    const stepFields = [
      ['eventType', 'eventSubType'],
      ['services'],
      ['eventDate', 'eventTime'],
      ['location'],
      ['guestCount'],
      ['budget'],
      ['contactName', 'contactEmail', 'contactPhone']
    ];
    const currentFields = stepFields[currentStep - 1];
    const hasError = currentFields.some(field => errors[field]);
    if (!hasError && currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!isFormValid) return;
    const userId = 'test-user';
    const eventData = {
      title: formData.eventType + (formData.eventSubType ? ` - ${formData.eventSubType}` : ''),
      type: formData.eventType,
      date: formData.eventDate ? new Date(formData.eventDate).toISOString().split('T')[0] : '', 
      time: formData.eventTime,
      location: formData.location,
      status: 'pending',
      guests: formData.guestCount,
      image: '', 
      progress: 0,
      nextAction: '',
      daysUntil: 0
    };
    const estimatedTotal = calculateEstimatedCost();
    const bookingData = {
      eventTitle: eventData.title,
      package: '', 
      guestCount: formData.guestCount,
      totalAmount: estimatedTotal,
      paidAmount: 0,
      dueAmount: estimatedTotal,
      status: 'active',
      bookingDate: new Date().toISOString(),
      eventDate: eventData.date, 
      eventTime: formData.eventTime, 
      paymentSchedule: [],
      documents: [],
      services: formData.services 
    };
    try {
      if (!user || !user.id) {
        alert('You must be logged in to book an event.');
        return;
      }
      const data = await apiBookEvent(user.id, eventData, bookingData);
      localStorage.removeItem('eventBookingForm');
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate('/user-dashboard');
      }, 1800);
    } catch (err) {
      console.error('Booking error:', err);
      alert('Failed to book event. Please try again. ' + (err.message || ''));
    }
  };

  const getPerGuestCost = () => {
    const basePrice = 20;
    let multiplier = 1;
    if (formData.guestCount <= 25) multiplier = 1.2;
    else if (formData.guestCount <= 50) multiplier = 1.1;
    else if (formData.guestCount <= 100) multiplier = 1.0;
    else if (formData.guestCount <= 200) multiplier = 0.95;
    else multiplier = 0.9;
    return Math.round(basePrice * multiplier);
  };

  const calculateEstimatedCost = () => {
    const perGuest = getPerGuestCost();
    return (perGuest * (formData.guestCount || 0)) + (formData.budget || 0);
  };

  const formatCurrency = (amount) => `Rs ${amount.toLocaleString('en-LK')}`;

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
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="font-heading text-2xl font-semibold text-text-primary mb-2">
                Services
              </h3>
              <p className="text-text-secondary">
                Select the services you want for your event (e.g., Catering, Decoration, Photography, Music, etc.)
              </p>
            </div>
            <ServiceTypeSelector
              selectedTypes={selectedTypes}
              setSelectedTypes={setSelectedTypes}
              onTypeSelect={() => {}}
            />
            {selectedTypes.map(type => (
              <div key={type}>
                <div className="font-semibold text-primary mb-2">{type} Options</div>
                <ServiceOptions
                  type={type}
                  selected={selectedServiceIds}
                  setSelected={setSelectedServiceIds}
                />
              </div>
            ))}
            {errors.services && (
              <p className="text-error text-sm mt-2">{errors.services}</p>
            )}
          </div>
        );
      case 3:
        return (
          <DateTimeSelection
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
            bookedSlots={bookedSlots}
          />
        );
      case 4:
        return (
          <LocationInput
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 5:
        return (
          <GuestCountSelection
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 6:
        return (
          <BudgetEstimation
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 7:
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
    <>
      <CenterPopup
        message={showSuccessPopup ? 'Event booked successfully!' : ''}
        onClose={() => setShowSuccessPopup(false)}
      />
      <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="min-h-screen bg-background"
    >
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

              <BookingSummary formData={formData} estimatedCost={calculateEstimatedCost()} formatCurrency={formatCurrency} />
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="lg:hidden mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium text-text-secondary">
                  Step {currentStep} of {steps.length}
                </span>
                <span className="text-sm font-medium text-primary">
                  {progress}% Complete
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="card">
              {renderStepContent()}

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
                      disabled={(() => {
                        const stepFields = [
                          ['eventType', 'eventSubType'], 
                          ['services'],                  
                          ['eventDate', 'eventTime'],    
                          ['location'],                  
                          ['guestCount'],                
                          ['budget'],                    
                          ['contactName', 'contactEmail', 'contactPhone'] 
                        ];
                        const currentFields = stepFields[currentStep - 1];
                        return currentFields.some(field => errors[field]);
                      })()}
                      className={`flex items-center space-x-2 btn-primary ${(() => {
                        const stepFields = [
                          ['eventType', 'eventSubType'], 
                          ['services'],                  
                          ['eventDate', 'eventTime'],    
                          ['location'],                  
                          ['guestCount'],               
                          ['budget'],                    
                          ['contactName', 'contactEmail', 'contactPhone'] 
                        ];
                        const currentFields = stepFields[currentStep - 1];
                        return currentFields.some(field => errors[field]) ? 'opacity-50 cursor-not-allowed' : '';
                      })()}`}
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
      </motion.div>
    </>
  );
};

export default EventBookingForm;