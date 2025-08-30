import React from 'react';
import { Link } from 'react-router-dom';
import Icon from 'components/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: "About Us", href: "/about" },
      { label: "Our Team", href: "/team" }
    ],
    services: [
      { label: "Wedding Planning", href: "/event-packages" },
      { label: "Corporate Events", href: "/event-packages" },
      { label: "Birthday Parties", href: "/event-packages" },
      { label: "Custom Events", href: "/event-packages" }
    ],
    support: [
      { label: "Help Center", href: "/help" },
      { label: "Contact Us", href: "/contact-page" },
      { label: "Event Booking", href: "/event-booking-form" },
      { label: "My Dashboard", href: "/user-dashboard" }
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: "Facebook", href: "https://facebook.com/partynest" },
    { name: "Instagram", icon: "Instagram", href: "https://instagram.com/partynest" },
    { name: "Twitter", icon: "Twitter", href: "https://twitter.com/partynest" },
    { name: "LinkedIn", icon: "Linkedin", href: "https://linkedin.com/company/partynest" },
    { name: "YouTube", icon: "Youtube", href: "https://youtube.com/partynest" }
  ];

  const contactInfo = [
    {
      icon: "Phone",
      label: "Call Us",
      value: "Main: +94 11 2345678 | Emergency: +94 77 1234567 | Hotline: 1919",
      href: "tel:+94112345678"
    },
    {
      icon: "Mail",
      label: "Email Us",
      value: "General: hello@partynest.lk | Bookings: events@partynest.lk | Support: support@partynest.lk",
      href: "mailto:hello@partynest.lk"
    },
    {
      icon: "MapPin",
      label: "Visit Us",
      value: "No. 45, Lotus Road, Colombo 01, Sri Lanka",
      href: "https://maps.google.com/?q=No.+45+Lotus+Road+Colombo+Sri+Lanka"
    }
  ];

  const Logo = () => (
    <div className="flex items-center space-x-2">
      <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-primary">
        <Icon name="Sparkles" size={24} color="white" strokeWidth={2} />
      </div>
      <div className="flex flex-col">
        <span className="font-heading font-bold text-xl text-text-primary">
          Party Nest
        </span>
        <span className="font-body text-xs text-text-secondary -mt-1">
          Premium Events
        </span>
      </div>
    </div>
  );

  return (
    <footer className="bg-text-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <div className="text-white">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shadow-primary">
                  <Icon name="Sparkles" size={24} color="white" strokeWidth={2} />
                </div>
                <div className="flex flex-col">
                  <span className="font-heading font-bold text-xl text-white">
                    Party Nest
                  </span>
                  <span className="font-body text-xs text-gray-300 -mt-1">
                    Premium Events
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed">
              Creating unforgettable moments through exceptional event planning. From intimate 
              gatherings to grand celebrations, we bring your vision to life with precision and style.
            </p>

            <div className="space-y-3">
              {contactInfo.map((contact, index) => (
                <a
                  key={index}
                  href={contact.href}
                  className="flex items-start space-x-3 text-gray-300 hover:text-white transition-colors duration-200 group"
                >
                  <Icon 
                    name={contact.icon} 
                    size={18} 
                    className="text-primary group-hover:text-accent transition-colors duration-200 mt-0.5" 
                    strokeWidth={2} 
                  />
                  <div>
                    <div className="text-sm font-medium text-white">{contact.label}</div>
                    <div className="text-sm">{contact.value}</div>
                  </div>
                </a>
              ))}
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200 group"
                  aria-label={social.name}
                >
                  <Icon 
                    name={social.icon} 
                    size={20} 
                    className="text-gray-400 group-hover:text-white transition-colors duration-200" 
                    strokeWidth={2} 
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-heading font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-white mb-4">Services</h3>
              <ul className="space-y-3">
                {footerLinks.services.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-white mb-4">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} Party Nest. All rights reserved. Made with ❤️ for creating memorable moments.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <span className="flex items-center space-x-2">
                <Icon name="Shield" size={16} strokeWidth={2} />
                <span>Secure & Trusted</span>
              </span>
              <span className="flex items-center space-x-2">
                <Icon name="Award" size={16} strokeWidth={2} />
                <span>Award Winning</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;