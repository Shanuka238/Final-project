import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';
import ContactForm from './components/ContactForm';
import BusinessInfo from './components/BusinessInfo';
import MapSection from './components/MapSection';
import FAQSection from './components/FAQSection';

const ContactPage = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-100 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-heading text-4xl lg:text-6xl font-bold text-primary mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-8">
              Ready to plan your perfect event? We're here to help bring your vision to life. 
              Contact us today and let's start creating unforgettable memories together.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/event-booking-form"
                className="btn-primary flex items-center space-x-2"
              >
                <Icon name="Calendar" size={20} strokeWidth={2} />
                <span>Book Event Now</span>
              </Link>
              <Link
                to="/event-packages"
                className="btn-secondary flex items-center space-x-2"
              >
                <Icon name="Package" size={20} strokeWidth={2} />
                <span>View Packages</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Success Message */}
      {formSubmitted && (
        <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-success-50 border border-success-200 rounded-lg p-4 shadow-lg">
            <div className="flex items-center space-x-3">
              <Icon name="CheckCircle" size={24} className="text-success-600" strokeWidth={2} />
              <div>
                <p className="font-semibold text-success-700">Message Sent Successfully!</p>
                <p className="text-sm text-success-600">We'll get back to you within 24 hours.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Form */}
            <div className="order-2 lg:order-1">
              <ContactForm onSubmit={handleFormSubmit} />
            </div>

            {/* Business Information */}
            <div className="order-1 lg:order-2">
              <BusinessInfo />
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <MapSection />

      {/* FAQ Section */}
      <FAQSection />

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary to-accent py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Planning?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Don't wait – your perfect event is just one conversation away. Let's discuss your vision and make it a reality.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/event-booking-form"
              className="bg-white text-primary px-8 py-4 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Icon name="Sparkles" size={20} strokeWidth={2} />
              <span>Start Planning Today</span>
            </Link>
            <a
              href="tel:+1-555-PARTY-01"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <Icon name="Phone" size={20} strokeWidth={2} />
              <span>Call Now</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;