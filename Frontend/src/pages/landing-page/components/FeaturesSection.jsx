import React from 'react';
import { motion } from 'framer-motion';
import Icon from 'components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: "Calendar",
      title: "Easy Booking",
      description: "Simple and intuitive booking process that gets your event planned in minutes, not hours.",
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      id: 2,
      icon: "Users",
      title: "Vendor Integration",
      description: "Access to our network of trusted vendors including caterers, photographers, and decorators.",
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    },
    {
      id: 3,
      icon: "DollarSign",
      title: "Budget Tracker",
      description: "Keep track of your expenses with our built-in budget management and cost estimation tools.",
      color: "bg-amber-500",
      bgColor: "bg-amber-50",
      textColor: "text-amber-600"
    },
    {
      id: 4,
      icon: "Clock",
      title: "Timeline Management",
      description: "Comprehensive timeline planning to ensure every detail is executed perfectly on schedule.",
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      id: 5,
      icon: "Shield",
      title: "Quality Assurance",
      description: "Every event is backed by our quality guarantee and 24/7 support throughout the planning process.",
      color: "bg-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-600"
    },
    {
      id: 6,
      icon: "Smartphone",
      title: "Mobile App",
      description: "Manage your event on-the-go with our mobile app featuring real-time updates and notifications.",
      color: "bg-indigo-500",
      bgColor: "bg-indigo-50",
      textColor: "text-indigo-600"
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Tell Us Your Vision",
      description: "Share your event details, preferences, and budget with our planning team."
    },
    {
      step: "02",
      title: "Get Custom Proposal",
      description: "Receive a detailed proposal with timeline, vendors, and cost breakdown."
    },
    {
      step: "03",
      title: "Plan & Coordinate",
      description: "Work with our experts to refine details and coordinate all aspects."
    },
    {
      step: "04",
      title: "Enjoy Your Event",
      description: "Relax and enjoy your perfectly executed event while we handle everything."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-primary-50 to-accent-50" data-animate>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Icon name="Zap" size={16} strokeWidth={2} />
            <span>Platform Features</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
            Everything You Need for
            <span className="text-gradient block">Perfect Events</span>
          </h2>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and services you need to plan, 
            manage, and execute flawless events from start to finish.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="card hover:shadow-accent transition-all duration-300 transform hover:-translate-y-1 text-center h-full">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={feature.icon} size={32} className={feature.textColor} strokeWidth={2} />
                </div>
                
                <h3 className="font-heading text-xl font-bold text-text-primary mb-4 group-hover:text-primary transition-colors duration-200">
                  {feature.title}
                </h3>
                
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-text-primary mb-4">
            How It Works
          </h3>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Our streamlined process makes event planning simple and stress-free
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 font-heading font-bold text-lg shadow-primary">
                  {step.step}
                </div>
                
                <h4 className="font-heading text-lg font-bold text-text-primary mb-3">
                  {step.title}
                </h4>
                
                <p className="text-text-secondary text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < processSteps.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary to-primary-300 transform translate-x-4"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;