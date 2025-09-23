import { useEffect } from 'react';
import './terms.css';

const Terms = () => {
  const lastUpdated = "January 15, 2025";

   useEffect(() => {
    // Если пришли на страницу без внутреннего якоря — прокрутить вверх
    if (!window.location.hash || window.location.hash === '#/terms') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, []);

const getTopBarHeight = () => {
  const all = Array.from(document.body.querySelectorAll('*'));
  const candidates = all.filter(el => {
    const cs = getComputedStyle(el);
    const top = parseInt(cs.top || '0', 10);
    return (cs.position === 'fixed' || cs.position === 'sticky') && top === 0 && el.offsetHeight > 0;
  });
  return candidates.length ? Math.max(...candidates.map(el => el.offsetHeight)) : 0;
};

const scrollTo = (id) => (e) => {
  e.preventDefault();
  const el = document.getElementById(id);
  if (!el) return;
  const headerOffset = getTopBarHeight() || 96; // запас по умолчанию
  const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;
  window.scrollTo({ top: y, behavior: 'smooth' });
};


  return (
    <div className="terms-page">
      {/* Header Section */}
      <section className="terms-hero">
        <div className="container">
          <h1>Terms of Service</h1>
          <p>Please read these terms carefully before using AI-Consultant Widget services.</p>
          <div className="last-updated">
            <span>Last updated: {lastUpdated}</span>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="terms-nav">
        <div className="container">
          <div className="terms-nav-content">
            <h3>Quick Navigation</h3>
            <div className="nav-links">
  <a href="#acceptance" onClick={scrollTo('acceptance')}>Acceptance</a>
  <a href="#description" onClick={scrollTo('description')}>Service Description</a>
  <a href="#accounts" onClick={scrollTo('accounts')}>User Accounts</a>
  <a href="#usage" onClick={scrollTo('usage')}>Acceptable Use</a>
  <a href="#payment" onClick={scrollTo('payment')}>Payment Terms</a>
  <a href="#privacy" onClick={scrollTo('privacy')}>Privacy & Data</a>
  <a href="#intellectual" onClick={scrollTo('intellectual')}>Intellectual Property</a>
  <a href="#limitation" onClick={scrollTo('limitation')}>Limitation of Liability</a>
  <a href="#termination" onClick={scrollTo('termination')}>Termination</a>
  <a href="#contact" onClick={scrollTo('contact')}>Contact</a>
            </div>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="terms-content">
        <div className="container">
          <div className="terms-layout">
            
            {/* Main Content */}
            <div className="terms-main">
              
              <div className="terms-section" id="acceptance">
                <h2>1. Acceptance of Terms</h2>
                <p>
                  By accessing or using AI-Consultant Widget ("Service"), you agree to be bound by these Terms of Service ("Terms"). 
                  If you disagree with any part of these terms, you may not access the Service.
                </p>
                <p>
                  These Terms apply to all visitors, users, and others who access or use the Service. We reserve the right to update 
                  and change these Terms at any time without notice.
                </p>
              </div>

              <div className="terms-section" id="description">
                <h2>2. Description of Service</h2>
                <p>
                  AI-Consultant Widget is a Software as a Service (SaaS) platform that provides AI-powered chat widgets for websites. 
                  Our service includes:
                </p>
                <ul>
                  <li>Embeddable AI chat widgets</li>
                  <li>Document and knowledge base integration</li>
                  <li>Lead capture and CRM integrations</li>
                  <li>Analytics and reporting tools</li>
                  <li>Customization and branding options</li>
                </ul>
                <p>
                  We strive to maintain the Service, but we cannot guarantee that it will be available at all times or that it will 
                  function without interruptions or errors.
                </p>
              </div>

              <div className="terms-section" id="accounts">
                <h2>3. User Accounts and Registration</h2>
                
                <h3>Account Creation</h3>
                <p>
                  To access certain features of the Service, you must register for an account. You agree to provide accurate, 
                  current, and complete information during the registration process.
                </p>

                <h3>Account Security</h3>
                <p>You are responsible for:</p>
                <ul>
                  <li>Maintaining the confidentiality of your account credentials</li>
                  <li>All activities that occur under your account</li>
                  <li>Notifying us immediately of any unauthorized use</li>
                  <li>Ensuring your contact information remains current</li>
                </ul>

                <h3>Account Types</h3>
                <div className="info-box">
                  <strong>Starter:</strong> Basic features for small websites<br/>
                  <strong>Growth:</strong> Advanced features for growing businesses<br/>
                  <strong>Enterprise:</strong> Custom solutions for large organizations
                </div>
              </div>

              <div className="terms-section" id="usage">
                <h2>4. Acceptable Use Policy</h2>
                
                <h3>Permitted Uses</h3>
                <p>You may use our Service to:</p>
                <ul>
                  <li>Create and deploy AI chat widgets on your websites</li>
                  <li>Integrate with your existing business systems</li>
                  <li>Collect and manage customer inquiries</li>
                  <li>Generate leads and support sales processes</li>
                </ul>

                <h3>Prohibited Activities</h3>
                <p>You agree NOT to use the Service for:</p>
                <ul className="prohibited-list">
                  <li>Illegal activities or content that violates laws</li>
                  <li>Harassment, abuse, or harmful content</li>
                  <li>Spamming or unsolicited communications</li>
                  <li>Reverse engineering or unauthorized access attempts</li>
                  <li>Distributing malware or harmful code</li>
                  <li>Violating intellectual property rights</li>
                  <li>Impersonating others or providing false information</li>
                </ul>

                <div className="warning-box">
                  <strong>⚠️ Important:</strong> Violation of this policy may result in immediate account suspension or termination.
                </div>
              </div>

              <div className="terms-section" id="payment">
                <h2>5. Payment Terms and Billing</h2>
                
                <h3>Subscription Plans</h3>
                <p>
                  Our Service is offered through various subscription plans. All fees are exclusive of taxes, and you are 
                  responsible for paying all applicable taxes.
                </p>

                <h3>Billing Cycle</h3>
                <ul>
                  <li>Monthly plans are billed in advance every month</li>
                  <li>Annual plans are billed in advance every year</li>
                  <li>Usage overages are billed in arrears</li>
                </ul>

                <h3>Refund Policy</h3>
                <div className="refund-policy">
                  <p><strong>30-Day Money-Back Guarantee:</strong></p>
                  <p>
                    We offer a 30-day money-back guarantee for new subscribers. If you're not satisfied with our Service 
                    within the first 30 days, contact us for a full refund.
                  </p>
                  <p>
                    Refunds are not available for renewals, downgrades, or accounts terminated for policy violations.
                  </p>
                </div>

                <h3>Payment Methods</h3>
                <p>We accept major credit cards and ACH transfers for Enterprise accounts.</p>
              </div>

              <div className="terms-section" id="privacy">
                <h2>6. Privacy and Data Protection</h2>
                
                <h3>Data Collection</h3>
                <p>
                  We collect and process data as described in our Privacy Policy. By using our Service, you consent to 
                  such collection and processing.
                </p>

                <h3>Your Data Rights</h3>
                <ul>
                  <li>Access to your personal data</li>
                  <li>Correction of inaccurate data</li>
                  <li>Deletion of your data (subject to legal requirements)</li>
                  <li>Data portability where technically feasible</li>
                </ul>

                <h3>Data Security</h3>
                <p>
                  We implement appropriate security measures to protect your data, including encryption, access controls, 
                  and regular security audits.
                </p>

                <div className="compliance-badges">
                  <span className="compliance-badge">GDPR Compliant</span>
                  <span className="compliance-badge">SOC2 Type II</span>
                  <span className="compliance-badge">ISO 27001</span>
                </div>
              </div>

              <div className="terms-section" id="intellectual">
                <h2>7. Intellectual Property Rights</h2>
                
                <h3>Our Rights</h3>
                <p>
                  The Service and its original content, features, and functionality are owned by AI-Consultant Widget and are 
                  protected by copyright, trademark, and other laws.
                </p>

                <h3>Your Rights</h3>
                <p>
                  You retain ownership of any content you upload or create using our Service. You grant us a license to use 
                  this content to provide the Service to you.
                </p>

                <h3>Trademark Policy</h3>
                <p>
                  Our trademarks and trade names may not be used without our prior written consent. We respect the intellectual 
                  property rights of others and expect users to do the same.
                </p>
              </div>

              <div className="terms-section" id="limitation">
                <h2>8. Limitation of Liability</h2>
                
                <h3>Service Availability</h3>
                <p>
                  While we strive for 99.9% uptime, we cannot guarantee uninterrupted service. We are not liable for any 
                  damages resulting from service interruptions.
                </p>

                <h3>Disclaimer of Warranties</h3>
                <div className="disclaimer-box">
                  <p>
                    THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND. WE DISCLAIM ALL WARRANTIES, 
                    EXPRESS OR IMPLIED, INCLUDING MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
                  </p>
                </div>

                <h3>Limitation of Damages</h3>
                <p>
                  Our total liability to you for any claims related to the Service shall not exceed the amount you paid us 
                  in the twelve (12) months preceding the claim.
                </p>

                <h3>Indemnification</h3>
                <p>
                  You agree to indemnify and hold us harmless from any claims arising from your use of the Service or 
                  violation of these Terms.
                </p>
              </div>

              <div className="terms-section" id="termination">
                <h2>9. Account Termination</h2>
                
                <h3>Termination by You</h3>
                <p>
                  You may terminate your account at any time by contacting our support team or through your account settings. 
                  Termination will be effective at the end of your current billing period.
                </p>

                <h3>Termination by Us</h3>
                <p>We may terminate your account if:</p>
                <ul>
                  <li>You violate these Terms of Service</li>
                  <li>Your account remains inactive for over 12 months</li>
                  <li>We discontinue the Service (with 90 days notice)</li>
                  <li>Legal requirements necessitate termination</li>
                </ul>

                <h3>Effect of Termination</h3>
                <p>
                  Upon termination, your right to use the Service ceases immediately. We will provide you with the ability 
                  to export your data for 30 days after termination.
                </p>
              </div>

              <div className="terms-section" id="contact">
                <h2>10. Contact Information</h2>
                <p>
                  If you have any questions about these Terms, please contact us:
                </p>
                
                <div className="contact-info">
                  <div className="contact-method">
                    <strong>Email:</strong>
                    <span>legal@ai-consultant-widget.com</span>
                  </div>
                  <div className="contact-method">
                    <strong>Address:</strong>
                    <span>
                      AI-Consultant Widget Inc.<br/>
                      123 Innovation Street<br/>
                      San Francisco, CA 94105<br/>
                      United States
                    </span>
                  </div>
                  <div className="contact-method">
                    <strong>Phone:</strong>
                    <span>+1 (555) 123-4567</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="terms-sidebar">
              <div className="sidebar-sticky">
                <div className="help-card">
                  <h3>Need Help?</h3>
                  <p>Our legal team is here to help clarify any questions about our terms.</p>
                  <a href="/contacts" className="btn btn-outline">Contact Legal Team</a>
                </div>

                <div className="related-links">
                  <h3>Related Documents</h3>
                  <ul>
                    <li><a href="/privacy">Privacy Policy</a></li>
                    <li><a href="/cookie-policy">Cookie Policy</a></li>
                    <li><a href="/data-processing">Data Processing Agreement</a></li>
                    <li><a href="/sla">Service Level Agreement</a></li>
                  </ul>
                </div>

                <div className="version-info">
                  <h3>Document History</h3>
                  <div className="version-item">
                    <strong>v2.1</strong> - {lastUpdated}
                    <span>Updated payment terms</span>
                  </div>
                  <div className="version-item">
                    <strong>v2.0</strong> - December 1, 2024
                    <span>Major revision</span>
                  </div>
                  <div className="version-item">
                    <strong>v1.0</strong> - June 1, 2024
                    <span>Initial version</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="terms-cta">
        <div className="container">
          <h2>Questions About Our Terms?</h2>
          <p>Our team is happy to clarify any part of our Terms of Service.</p>
          <div className="cta-buttons">
            <a href="#" className="btn btn-primary">Contact Us</a>
            <a href="#" className="btn btn-secondary">Back to Home</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Terms;