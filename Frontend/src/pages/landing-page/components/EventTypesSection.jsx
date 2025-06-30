import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';

const EventTypesSection = () => {
  const eventTypes = [
    {
      id: 1,
      title: "Weddings",
      description: "Create your perfect wedding day with our comprehensive planning services and attention to every detail.",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: "Heart",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50",
      textColor: "text-pink-600",
      features: ["Venue Selection", "Catering", "Photography", "Decoration"]
    },
    {
      id: 2,
      title: "Birthday Parties",
      description: "Celebrate life's special moments with themed parties that create lasting memories for all ages.",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: "Gift",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      features: ["Theme Design", "Entertainment", "Cake & Treats", "Party Favors"]
    },
    {
      id: 3,
      title: "Corporate Events",
      description: "Professional corporate gatherings that strengthen relationships and celebrate achievements.",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: "Building",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
      features: ["Conference Setup", "Team Building", "Networking", "Presentations"]
    },
    {
      id: 4,
      title: "Custom Events",
      description: "Unique celebrations tailored to your specific vision and requirements for any special occasion.",
      image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: "Sparkles",
      color: "from-purple-500 to-indigo-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      features: ["Custom Themes", "Unique Venues", "Personalized Service", "Creative Solutions"]
    }
  ];

  return (
    <section id="event-types" className="py-20 bg-surface" data-animate>
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
            <Icon name="Calendar" size={16} strokeWidth={2} />
            <span>Event Categories</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Every Occasion Deserves
            <span className="text-gradient block">Perfect Planning</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            From intimate gatherings to grand celebrations, we specialize in creating memorable experiences 
            tailored to your unique vision and style.
          </p>
        </motion.div>

        {/* Event Types Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {eventTypes.map((eventType, index) => (
            <motion.div
              key={eventType.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card hover:shadow-accent transition-all duration-300 transform hover:-translate-y-2 h-full">
                {/* Image */}
                <div className="relative overflow-hidden rounded-lg mb-6">
                  <Image
                    src={eventType.image}
                    alt={eventType.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Icon Overlay */}
                  <div className={`absolute top-4 right-4 w-12 h-12 ${eventType.bgColor} rounded-full flex items-center justify-center shadow-lg`}>
                    <Icon name={eventType.icon} size={24} className={eventType.textColor} strokeWidth={2} />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="font-heading text-xl font-bold text-text-primary group-hover:text-primary transition-colors duration-200">
                    {eventType.title}
                  </h3>
                  
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {eventType.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2">
                    {eventType.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-2">
                        <Icon name="Check" size={16} className="text-success" strokeWidth={2} />
                        <span className="text-sm text-text-secondary">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link
                    to="/event-booking-form"
                    className="inline-flex items-center space-x-2 text-primary hover:text-primary-700 font-medium text-sm group-hover:translate-x-1 transition-all duration-200"
                  >
                    <span>Plan This Event</span>
                    <Icon name="ArrowRight" size={16} strokeWidth={2} />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-text-secondary mb-6">
            Don't see your event type? We create custom experiences for any occasion.
          </p>
          <Link
            to="/contact-page"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <Icon name="MessageCircle" size={20} strokeWidth={2} />
            <span>Discuss Custom Event</span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default EventTypesSection;