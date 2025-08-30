import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

import HeroSection from './components/HeroSection';
import EventTypesSection from './components/EventTypesSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import Footer from './components/Footer';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const sections = document.querySelectorAll('[data-animate]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <HeroSection />
      
      <EventTypesSection />
      
      <FeaturesSection />
      
      <TestimonialsSection />
      
      <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Ready to Create Your Perfect Event?
            </h2>
            <p className="text-lg text-text-secondary mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Party Nest for their special occasions. 
              Start planning your dream event today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/event-booking-form"
                className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <Icon name="Calendar" size={24} strokeWidth={2} />
                <span>Start Planning Now</span>
              </Link>
              <Link
                to="/event-packages"
                className="btn-secondary flex items-center space-x-2 text-lg px-8 py-4"
              >
                <Icon name="Package" size={24} strokeWidth={2} />
                <span>View Packages</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default LandingPage;