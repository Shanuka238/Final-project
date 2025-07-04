import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      question: "How far in advance should I book my event?",
      answer: `We recommend booking your event at least 3-6 months in advance, especially for popular dates like weekends and holidays. However, we understand that sometimes events come up quickly, and we'll do our best to accommodate last-minute requests based on availability.

For weddings and large corporate events, we suggest booking 6-12 months ahead to ensure you get your preferred date and have ample time for detailed planning.`
    },
    {
      question: "What\'s included in your event planning packages?",
      answer: `Our packages vary depending on the type and scale of your event, but typically include:

• Initial consultation and event design
• Vendor coordination and management  
• Timeline creation and day-of coordination
• Setup and breakdown supervision
• Emergency support during the event

We offer three main tiers: Essential (basic coordination), Premium (full planning), and Luxury (white-glove service with premium vendors). Each package can be customized to fit your specific needs and budget.`
    },
    {
      question: "Do you provide vendors or do I need to find my own?",
      answer: `We have an extensive network of trusted, vetted vendors including caterers, photographers, florists, musicians, and decorators. We can handle all vendor coordination as part of our service.

However, if you have preferred vendors you'd like to work with, we're happy to coordinate with them as well. Our goal is to make your event perfect, whether that's with our recommended partners or your chosen providers.`
    },
    {
      question: "What are your payment terms and cancellation policy?",
      answer: `We typically require a 25% deposit to secure your date, with the remaining balance due 30 days before your event. We accept various payment methods including credit cards, bank transfers, and payment plans for larger events.

Our cancellation policy varies by package and timing:
• 90+ days before event: 50% refund of deposit
• 30-89 days: 25% refund of deposit  
• Less than 30 days: No refund, but we can reschedule based on availability

We also offer event insurance options to protect your investment.`
    },
    {
      question: "Can you work within my budget?",
      answer: `Absolutely! We work with budgets ranging from intimate gatherings to luxury celebrations. During our initial consultation, we'll discuss your budget openly and create a plan that maximizes value within your range.We're transparent about costs and will never surprise you with hidden fees. If your dream event exceeds your budget, we'll suggest creative alternatives and prioritize elements that matter most to you.`
    },
    {
      question: "Do you handle destination events or only local ones?",
      answer: `While we're based in New York, we absolutely handle destination events! We've planned beautiful weddings in the Hamptons, corporate retreats in the Catskills, and celebrations across the tri-state area.

For events outside our immediate area, we may include travel costs in the planning fee, but we have partnerships with local vendors in popular destinations to ensure seamless execution wherever your event takes place.`
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? -1 : index);
  };

  return (
    <section className="py-16 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-text-secondary">
            Get quick answers to common questions about our event planning services.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-surface rounded-2xl shadow-primary overflow-hidden transition-all duration-300 hover:shadow-accent"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-primary-50/50 transition-colors duration-200"
              >
                <h3 className="font-semibold text-text-primary pr-4">
                  {faq.question}
                </h3>
                <div className={`transform transition-transform duration-300 ${
                  openFAQ === index ? 'rotate-180' : ''
                }`}>
                  <Icon 
                    name="ChevronDown" 
                    size={24} 
                    className="text-primary" 
                    strokeWidth={2}
                  />
                </div>
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${
                openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6 border-t border-border">
                  <div className="pt-4">
                    <p className="text-text-secondary leading-relaxed whitespace-pre-line">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-br from-primary-50 to-accent-50 rounded-2xl p-8">
            <Icon name="HelpCircle" size={48} className="text-primary mx-auto mb-4" strokeWidth={1.5} />
            <h3 className="font-heading text-2xl font-bold text-text-primary mb-4">
              Still Have Questions?
            </h3>
            <p className="text-text-secondary mb-6 max-w-2xl mx-auto">
              Can't find the answer you're looking for? Our friendly team is here to help. 
              Reach out to us directly and we'll get back to you as soon as possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+1-555-PARTY-01"
                className="btn-primary flex items-center justify-center space-x-2"
              >
                <Icon name="Phone" size={20} strokeWidth={2} />
                <span>Call Us Now</span>
              </a>
              <a
                href="mailto:hello@partynest.com"
                className="btn-secondary flex items-center justify-center space-x-2"
              >
                <Icon name="Mail" size={20} strokeWidth={2} />
                <span>Send Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;