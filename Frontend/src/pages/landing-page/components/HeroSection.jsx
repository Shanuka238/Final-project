import React, { useEffect, useState } from 'react';
import { useAuth } from 'contexts/AuthContext';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import { fetchAllReviews } from 'api/reviews';

const HeroSection = () => {
  const { user } = useAuth();
  const isLoggedIn = !!user;
  const [averageRating, setAverageRating] = useState(null);
  useEffect(() => {
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
  const heroStats = [
    { number: "10K+", label: "Events Planned" },
    { number: "5K+", label: "Happy Clients" },
    { number: "50+", label: "Expert Planners" },
    { number: "99%", label: "Success Rate" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-50 via-surface to-accent-50">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-200 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Icon name="Sparkles" size={16} strokeWidth={2} />
              <span>Premium Event Planning Services</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
            >
              Create Unforgettable
              <span className="text-gradient block">Moments</span>
              with Party Nest
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-lg md:text-xl text-text-secondary mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              From intimate gatherings to grand celebrations, we transform your vision into reality. 
              Professional event planning made simple, elegant, and stress-free.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-12"
            >
              <Link
                to="/event-booking-form"
                className="btn-primary flex items-center justify-center space-x-2 text-lg px-8 py-4 shadow-accent hover:shadow-primary transition-all duration-300"
              >
                <Icon name="Calendar" size={24} strokeWidth={2} />
                <span>Start Planning</span>
              </Link>
              <Link
                to="/event-packages"
                className="btn-secondary flex items-center justify-center space-x-2 text-lg px-8 py-4"
              >
                <Icon name="Play" size={20} strokeWidth={2} />
                <span>View Our Work</span>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {heroStats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="font-heading text-2xl md:text-3xl font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-text-secondary font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative z-10">
              <div className="relative overflow-hidden rounded-2xl shadow-accent">
                <Image
                  src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Elegant wedding celebration with beautiful decorations"
                  className="w-full h-96 md:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>

              <motion.div
                initial={{ opacity: 1, scale: 1, y: 0 }}
                animate={isLoggedIn ? { y: [0, -12, 0] } : { y: 0 }}
                transition={isLoggedIn ? { duration: 1.6, delay: 1.2, repeat: Infinity, repeatType: "loop" } : { duration: 0.6, delay: 1.2 }}
                className="absolute -top-6 -left-6 bg-surface rounded-xl shadow-lg shadow-primary/40 p-4 border border-border"
                style={{ zIndex: 20 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success-100 rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle" size={20} className="text-success" strokeWidth={2} />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary text-sm">Customize/Create</div>
                    <div className="text-xs text-text-secondary">Your events</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 1, scale: 1, y: 0 }}
                animate={isLoggedIn ? { y: [0, -12, 0] } : { y: 0 }}
                transition={isLoggedIn ? { duration: 1.6, delay: 1.4, repeat: Infinity, repeatType: "loop" } : { duration: 0.6, delay: 1.4 }}
                className="absolute -bottom-6 -right-6 bg-surface rounded-xl shadow-lg shadow-accent/40 p-4 border border-border"
                style={{ zIndex: 20 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent-100 rounded-full flex items-center justify-center">
                    <Icon name="Star" size={20} className="text-accent" strokeWidth={2} />
                  </div>
                  <div>
                    <div className="font-semibold text-text-primary text-sm">{averageRating ? `${averageRating} Rating` : 'No Rating'}</div>
                    <div className="text-xs text-text-secondary">Average Rating</div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-200 rounded-full blur-2xl opacity-60"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-accent-200 rounded-full blur-2xl opacity-60"></div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-text-secondary font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary rounded-full flex justify-center"
          >
            <div className="w-1 h-3 bg-primary rounded-full mt-2"></div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;