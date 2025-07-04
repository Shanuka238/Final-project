import React from 'react';
import Icon from 'components/AppIcon';

const BusinessInfo = () => {
  const contactInfo = [
    {
      icon: 'MapPin',
      title: 'Office Address',
      details: [
        '123 Event Plaza, Suite 456',
        'Downtown District',
        'New York, NY 10001'
      ],
      action: {
        label: 'Get Directions',
        href: 'https://maps.google.com/?q=123+Event+Plaza+New+York+NY'
      }
    },
    {
      icon: 'Phone',
      title: 'Phone Numbers',
      details: [
        'Main: +1 (555) PARTY-01',
        'Emergency: +1 (555) PARTY-02',
        'Toll-Free: 1-800-PARTYNEST'
      ],
      action: {
        label: 'Call Now',
        href: 'tel:+1-555-PARTY-01'
      }
    },
    {
      icon: 'Mail',
      title: 'Email Addresses',
      details: [
        'General: hello@partynest.com',
        'Bookings: events@partynest.com',
        'Support: support@partynest.com'
      ],
      action: {
        label: 'Send Email',
        href: 'mailto:hello@partynest.com'
      }
    },
    {
      icon: 'Clock',
      title: 'Business Hours',
      details: [
        'Monday - Friday: 9:00 AM - 8:00 PM',
        'Saturday: 10:00 AM - 6:00 PM',
        'Sunday: 12:00 PM - 5:00 PM'
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
          {contactInfo.map((info, index) => (
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
          ))}
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
          {socialMedia.map((social, index) => (
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
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8">
        <h3 className="font-heading text-xl font-bold text-text-primary mb-4">
          Quick Actions
        </h3>
        <div className="space-y-3">
          <a
            href="tel:+1-555-PARTY-01"
            className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-10 h-10 bg-success-100 rounded-lg flex items-center justify-center">
              <Icon name="Phone" size={20} className="text-success-600" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-text-primary">Call for Immediate Assistance</p>
              <p className="text-sm text-text-secondary">Available during business hours</p>
            </div>
            <Icon name="ArrowRight" size={20} className="text-text-secondary group-hover:text-primary transition-colors duration-200" strokeWidth={2} />
          </a>
          
          <a
            href="mailto:events@partynest.com"
            className="flex items-center space-x-3 p-3 bg-white rounded-lg hover:shadow-md transition-all duration-200 group"
          >
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <Icon name="Mail" size={20} className="text-primary" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-text-primary">Email for Detailed Inquiries</p>
              <p className="text-sm text-text-secondary">We respond within 24 hours</p>
            </div>
            <Icon name="ArrowRight" size={20} className="text-text-secondary group-hover:text-primary transition-colors duration-200" strokeWidth={2} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default BusinessInfo;