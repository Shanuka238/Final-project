import React from 'react';
import Icon from 'components/AppIcon';

const BusinessInfo = () => {
  // Restored mock data
  const contactInfo = [
    {
      icon: 'MapPin',
      title: 'Office Address',
      details: [
        'No. 45, Lotus Road',
        'Colombo 01',
        'Sri Lanka'
      ],
      action: {
        label: 'Get Directions',
        href: 'https://maps.google.com/?q=No.+45+Lotus+Road+Colombo+Sri+Lanka'
      }
    },
    {
      icon: 'Phone',
      title: 'Phone Numbers',
      details: [
        'Main: +94 11 2345678',
        'Emergency: +94 77 1234567',
        'Hotline: 1919'
      ],
      action: {
        label: 'Call Now',
        href: 'tel:+94112345678'
      }
    },
    {
      icon: 'Mail',
      title: 'Email Addresses',
      details: [
        'General: hello@partynest.lk',
        'Bookings: events@partynest.lk',
        'Support: support@partynest.lk'
      ],
      action: {
        label: 'Send Email',
        href: 'mailto:hello@partynest.lk'
      }
    },
    {
      icon: 'Clock',
      title: 'Business Hours',
      details: [
        'Monday - Friday: 8:30 AM - 6:00 PM',
        'Saturday: 9:00 AM - 4:00 PM',
        'Sunday: Closed'
      ],
      note: 'Extended hours available for events'
    }
  ];

  const socialMedia = [
    {
      platform: 'Instagram',
      icon: 'Instagram',
      handle: '@partynest_events',
      followers: '25.4K',
      url: 'https://instagram.com/partynest_events',
      color: 'text-pink-600'
    },
    {
      platform: 'Facebook',
      icon: 'Facebook',
      handle: 'Party Nest Events',
      followers: '18.2K',
      url: 'https://facebook.com/partynestevents',
      color: 'text-blue-600'
    },
    {
      platform: 'Twitter',
      icon: 'Twitter',
      handle: '@partynest',
      followers: '12.8K',
      url: 'https://twitter.com/partynest',
      color: 'text-blue-400'
    },
    {
      platform: 'Pinterest',
      icon: 'Image',
      handle: 'Party Nest Ideas',
      followers: '31.5K',
      url: 'https://pinterest.com/partynestideas',
      color: 'text-red-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Contact Information */}
      <div className="bg-surface rounded-2xl shadow-primary p-8">
        <h2 className="font-heading text-3xl font-bold text-text-primary mb-6">
          Contact Information
        </h2>
        <div className="space-y-6">
          {contactInfo.length === 0 ? (
            <div className="text-gray-400">No contact info available.</div>
          ) : (
            contactInfo.map((info, index) => (
              <div key={index} className="border-b border-border last:border-b-0 pb-6 last:pb-0">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Icon name={info.icon} size={24} className="text-primary" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-text-primary mb-2">{info.title}</h3>
                    <div className="space-y-1">
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-text-secondary">
                          {detail}
                        </p>
                      ))}
                    </div>
                    {info.note && (
                      <p className="text-sm text-accent-600 font-medium mt-2">
                        {info.note}
                      </p>
                    )}
                    {info.action && (
                      <a
                        href={info.action.href}
                        target={info.action.href.startsWith('http') ? '_blank' : undefined}
                        rel={info.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="inline-flex items-center space-x-2 text-primary hover:text-primary-700 font-medium mt-3 transition-colors duration-200"
                      >
                        <span>{info.action.label}</span>
                        <Icon name="ExternalLink" size={16} strokeWidth={2} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Social Media */}
      <div className="bg-surface rounded-2xl shadow-primary p-8">
        <h2 className="font-heading text-2xl font-bold text-text-primary mb-6">
          Follow Us
        </h2>
        <p className="text-text-secondary mb-6">
          Stay connected for event inspiration, behind-the-scenes content, and exclusive offers!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socialMedia.length === 0 ? (
            <div className="text-gray-400">No social media links available.</div>
          ) : (
            socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-4 p-4 border border-border rounded-lg hover:border-primary-300 hover:bg-primary-50/50 transition-all duration-200 group"
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${social.color} bg-gray-100 group-hover:bg-white`}>
                  <Icon name={social.icon} size={20} strokeWidth={2} />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-text-primary">{social.platform}</p>
                  <p className="text-sm text-text-secondary">{social.handle}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-text-primary">{social.followers}</p>
                  <p className="text-xs text-text-secondary">followers</p>
                </div>
              </a>
            ))
          )}
        </div>
      </div>
    
    </div>
  );
};

export default BusinessInfo;