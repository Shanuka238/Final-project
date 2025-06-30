import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Bride",
      event: "Wedding Celebration",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: `Party Nest made our dream wedding come true! From the initial consultation to the last dance, every detail was perfectly executed. The team's attention to detail and professionalism exceeded our expectations. Our guests are still talking about how magical the evening was.`,
      location: "Beverly Hills, CA"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Corporate Manager",
      event: "Annual Company Gala",
      rating: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: `Outstanding service for our corporate event! The team handled everything seamlessly, from venue coordination to catering. The event was a huge success and really strengthened our team relationships. Highly recommend Party Nest for any corporate function.`,
      location: "San Francisco, CA"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Mother",
      event: "Sweet 16 Birthday Party",
      rating: 5,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: `My daughter's Sweet 16 was absolutely perfect! The themed decorations, entertainment, and overall coordination were flawless. Party Nest turned our vision into reality and created memories that will last a lifetime. Thank you for making her day so special!`,
      location: "Miami, FL"
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Groom",
      event: "Destination Wedding",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: `Planning a destination wedding seemed overwhelming until we found Party Nest. They coordinated everything remotely and on-site flawlessly. The vendors they recommended were exceptional, and the timeline management was perfect. Couldn't have asked for better service.`,
      location: "Napa Valley, CA"
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Event Coordinator",
      event: "Charity Fundraiser",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
      content: `Working with Party Nest for our charity fundraiser was incredible. They understood our mission and created an event that not only raised significant funds but also created meaningful connections. Their professionalism and creativity made all the difference.`,
      location: "New York, NY"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={20}
        className={index < rating ? "text-accent fill-current" : "text-gray-300"}
        strokeWidth={1}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-surface" data-animate>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="MessageSquare" size={16} strokeWidth={2} />
            <span>Client Stories</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            What Our Clients
            <span className="text-gradient block">Say About Us</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about 
            their experience with Party Nest.
          </p>
        </motion.div>

        {/* Main Testimonial Display */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="card text-center p-8 md:p-12"
            >
              {/* Quote Icon */}
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Icon name="Quote" size={32} className="text-primary" strokeWidth={2} />
              </div>

              {/* Rating */}
              <div className="flex justify-center space-x-1 mb-6">
                {renderStars(testimonials[currentTestimonial].rating)}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-lg md:text-xl text-text-primary leading-relaxed mb-8 font-medium">
                "{testimonials[currentTestimonial].content}"
              </blockquote>

              {/* Client Info */}
              <div className="flex items-center justify-center space-x-4">
                <div className="relative">
                  <Image
                    src={testimonials[currentTestimonial].image}
                    alt={testimonials[currentTestimonial].name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-primary-100"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-2 border-surface flex items-center justify-center">
                    <Icon name="Check" size={12} color="white" strokeWidth={3} />
                  </div>
                </div>
                <div className="text-left">
                  <div className="font-heading font-bold text-text-primary">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-sm text-text-secondary">
                    {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].event}
                  </div>
                  <div className="text-xs text-text-tertiary flex items-center space-x-1">
                    <Icon name="MapPin" size={12} strokeWidth={2} />
                    <span>{testimonials[currentTestimonial].location}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-secondary"
          >
            <Icon name="ChevronLeft" size={20} strokeWidth={2} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-surface border border-border rounded-full flex items-center justify-center hover:bg-primary hover:text-white hover:border-primary transition-all duration-200 shadow-secondary"
          >
            <Icon name="ChevronRight" size={20} strokeWidth={2} />
          </button>
        </div>

        {/* Testimonial Indicators */}
        <div className="flex justify-center space-x-2 mb-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentTestimonial(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentTestimonial 
                  ? 'bg-primary w-8' :'bg-border hover:bg-primary-300'
              }`}
            />
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <div className="space-y-2">
            <div className="font-heading text-3xl md:text-4xl font-bold text-primary">98%</div>
            <div className="text-sm text-text-secondary font-medium">Client Satisfaction</div>
          </div>
          <div className="space-y-2">
            <div className="font-heading text-3xl md:text-4xl font-bold text-primary">2,500+</div>
            <div className="text-sm text-text-secondary font-medium">Events Completed</div>
          </div>
          <div className="space-y-2">
            <div className="font-heading text-3xl md:text-4xl font-bold text-primary">4.9</div>
            <div className="text-sm text-text-secondary font-medium">Average Rating</div>
          </div>
          <div className="space-y-2">
            <div className="font-heading text-3xl md:text-4xl font-bold text-primary">24/7</div>
            <div className="text-sm text-text-secondary font-medium">Support Available</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;