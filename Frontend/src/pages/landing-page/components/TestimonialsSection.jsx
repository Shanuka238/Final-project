import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import { fetchAllReviews } from 'api/reviews';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(null);

  const testimonials = reviews.map((r, idx) => ({
    id: r._id || `review-${idx}`,
    name: r.userName || (r.userId ? `User ${r.userId.slice(-4)}` : 'Anonymous'),
    role: r.userRole || 'Client',
    event: r.eventTitle || r.package || 'Event',
    rating: r.rating,
    image: r.userImage,
    content: r.review,
    location: r.date ? new Date(r.date).toLocaleDateString() : ''
  }));

  useEffect(() => {
    fetchAllReviews().then(setReviews).catch(() => setReviews([]));
    fetchAllReviews().then((reviews) => {
      if (reviews && reviews.length > 0) {
        const avg = (
          reviews.reduce((sum, r) => sum + (parseFloat(r.rating) || 0), 0) / reviews.length
        ).toFixed(1);
        setAverageRating(avg);
      } else {
        setAverageRating(null);
      }
    }).catch(() => setAverageRating(null));
  }, []);

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

        <div className="relative max-w-4xl mx-auto mb-12">
          {testimonials.length === 0 ? (
            <div className="text-center text-text-secondary py-12">No testimonials yet.</div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="card text-center p-8 md:p-12"
              >
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Icon name="Quote" size={32} className="text-primary" strokeWidth={2} />
                </div>

                <div className="flex justify-center space-x-1 mb-6">
                  {renderStars(testimonials[currentTestimonial].rating)}
                </div>

                <blockquote className="text-lg md:text-xl text-text-primary leading-relaxed mb-8 font-medium">
                  {testimonials[currentTestimonial].content && testimonials[currentTestimonial].content.trim() !== ''
                    ? `"${testimonials[currentTestimonial].content}"`
                    : <span className="italic text-text-tertiary">No review message provided.</span>}
                </blockquote>

                <div className="flex items-center justify-center space-x-4">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center text-3xl font-bold text-primary border-4 border-primary-100">
                      {(testimonials[currentTestimonial].name || 'U').charAt(0).toUpperCase()}
                    </div>
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
          )}

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
            <div className="font-heading text-3xl md:text-4xl font-bold text-primary">{averageRating ? averageRating : 'N/A'}</div>
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