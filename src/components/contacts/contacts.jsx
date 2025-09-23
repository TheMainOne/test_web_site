import { useState } from 'react';
import './contacts.css';

const Contacts = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    inquiryType: 'general'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        message: '',
        inquiryType: 'general'
      });
    }, 3000);
  };

  return (
    <div className="contacts-page">
      {/* Header Section */}
      <section className="contacts-hero">
        <div className="container">
          <h1>Get in Touch</h1>
          <p>Ready to transform your website with AI? Let's talk about how our widget can boost your conversions.</p>
        </div>
      </section>

      {/* Main Contact Section */}
      <section className="contacts-main">
        <div className="container">
          <div className="contacts-grid">
            
            {/* Contact Form */}
            <div className="contact-form-section">
              <h2>Send us a message</h2>
              <p className="form-description">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              {isSubmitted ? (
                <div className="success-message">
                  <div className="success-icon">✓</div>
                  <h3>Message Sent!</h3>
                  <p>Thank you for reaching out. We'll get back to you shortly.</p>
                </div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Smith"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@company.com"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="company">Company</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Your Company Inc."
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="inquiryType">Inquiry Type</label>
                    <select
                      id="inquiryType"
                      name="inquiryType"
                      value={formData.inquiryType}
                      onChange={handleInputChange}
                    >
                      <option value="general">General Inquiry</option>
                      <option value="demo">Request Demo</option>
                      <option value="pricing">Pricing Question</option>
                      <option value="technical">Technical Support</option>
                      <option value="partnership">Partnership</option>
                      <option value="enterprise">Enterprise Sales</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message *</label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows="5"
                      placeholder="Tell us about your project and how we can help..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-primary btn-large">
                    Send Message
                  </button>
                </form>
              )}
            </div>

            {/* Contact Information */}
            <div className="contact-info-section">
              <h2>Other ways to reach us</h2>
              
              <div className="contact-methods">
                <div className="contact-method">
                  <div className="contact-icon">📧</div>
                  <div className="contact-details">
                    <h3>Email</h3>
                    <p>hello@ai-consultant-widget.com</p>
                    <span>We typically respond within 24 hours</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">💬</div>
                  <div className="contact-details">
                    <h3>Live Chat</h3>
                    <p>Available on our website</p>
                    <span>Monday - Friday, 9 AM - 6 PM EST</span>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">📅</div>
                  <div className="contact-details">
                    <h3>Schedule a Demo</h3>
                    <p>Book a personalized walkthrough</p>
                    <a href="#" className="contact-link">Schedule now →</a>
                  </div>
                </div>

                <div className="contact-method">
                  <div className="contact-icon">📚</div>
                  <div className="contact-details">
                    <h3>Documentation</h3>
                    <p>Self-service resources</p>
                    <a href="#" className="contact-link">View docs →</a>
                  </div>
                </div>
              </div>

              {/* FAQ Section */}
              <div className="faq-section">
                <h3>Frequently Asked Questions</h3>
                <div className="faq-list">
                  <div className="faq-item">
                    <strong>How quickly can I get started?</strong>
                    <p>Most customers are up and running within 30 minutes of signing up.</p>
                  </div>
                  <div className="faq-item">
                    <strong>Do you offer custom integrations?</strong>
                    <p>Yes! Enterprise plans include custom integrations and dedicated support.</p>
                  </div>
                  <div className="faq-item">
                    <strong>What's your refund policy?</strong>
                    <p>We offer a 30-day money-back guarantee on all paid plans.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="office-locations">
        <div className="container">
          <h2 className="section-title">Our Offices</h2>
          <div className="offices-grid">
            <div className="office-card">
              <h3>San Francisco HQ</h3>
              <p>123 Innovation Street<br/>San Francisco, CA 94105<br/>United States</p>
              <span className="office-note">Main headquarters</span>
            </div>
            <div className="office-card">
              <h3>New York</h3>
              <p>456 Broadway Avenue<br/>New York, NY 10013<br/>United States</p>
              <span className="office-note">East coast operations</span>
            </div>
            <div className="office-card">
              <h3>London</h3>
              <p>789 Tech Lane<br/>London, EC2M 4YE<br/>United Kingdom</p>
              <span className="office-note">European operations</span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="support-hours">
        <div className="container">
          <div className="support-info">
            <h2>Support Hours</h2>
            <div className="hours-grid">
              <div className="hours-item">
                <strong>Live Chat & Email</strong>
                <p>Monday - Friday: 9 AM - 6 PM EST<br/>
                   Saturday: 10 AM - 2 PM EST<br/>
                   Sunday: Closed</p>
              </div>
              <div className="hours-item">
                <strong>Emergency Support</strong>
                <p>24/7 for Enterprise customers<br/>
                   Critical issues only<br/>
                   Response within 4 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta">
        <div className="container">
          <h2>Ready to get started?</h2>
          <p>Join thousands of companies using AI-Consultant Widget to boost their conversions.</p>
          <div className="cta-buttons">
            <a href="#" className="btn btn-primary">Start Free Trial</a>
            <a href="#" className="btn btn-secondary">View Pricing</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contacts;