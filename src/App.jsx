import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import './App.css'

// Hero Component
const Hero = () => {
  return (
    <section className="hero">
      <div className="container">
        <h1>Your Website, Now With an AI Sales Consultant</h1>
        <p>Let visitors ask questions and instantly get answers, quotes, and product picks — right on your site.</p>
        
        <div className="cta-buttons">
          <a href="#demo" className="btn btn-primary">Try Live Demo</a>
          <a href="#" className="btn btn-secondary">Get Started Free</a>
        </div>
        
        <div className="trust-badges">
          <div className="trust-badge">1-line install</div>
          <div className="trust-badge">Citations to your docs</div>
          <div className="trust-badge">GDPR-aware</div>
          <div className="trust-badge">Works with CRM</div>
        </div>
      </div>
    </section>
  );
};

// AI Widget Component
const AIWidget = () => {
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "Hi! I'm your AI sales assistant. I can help you with pricing, product bundles, and booking demos. What would you like to know?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const generateResponse = (question) => {
    const responses = {
      'price for 10 users': 'For 10 users, our Growth plan at $299/month would be perfect. It includes 5k monthly resolves, CRM integration, and analytics. <strong>Source: Pricing page</strong><br><br>Would you like me to calculate a custom quote or book a demo?',
      'product bundle': 'Our Growth bundle includes the AI widget, CRM integrations (HubSpot, Salesforce), analytics dashboard, and custom branding. Perfect for growing teams. <strong>Source: Features documentation</strong><br><br>Interested in seeing it in action?',
      'book a demo': 'I can schedule a personalized demo for you! Please provide your email and preferred time, and I\'ll send you a calendar link. <strong>Source: Demo booking system</strong><br><br>Email: <input type="email" placeholder="your@email.com" style="padding: 4px 8px; border: 1px solid #ccc; border-radius: 4px; margin-left: 8px;" />'
    };

    const lowerQuestion = question.toLowerCase();
    
    if (responses[lowerQuestion]) {
      return responses[lowerQuestion];
    }
    
    if (lowerQuestion.includes('pricing') || lowerQuestion.includes('cost')) {
      return 'We offer three tiers: Starter ($99/month), Growth ($299/month), and Enterprise (custom). Each includes different resolve limits and features. <strong>Source: Pricing documentation</strong><br><br>What size team are you planning for?';
    }
    
    if (lowerQuestion.includes('install') || lowerQuestion.includes('setup')) {
      return 'Installation is just one line of code! Add our script tag and call AIW.init() with your configuration. Takes less than 5 minutes. <strong>Source: Installation guide</strong><br><br>Need help with the technical setup?';
    }
    
    return 'I can help you with pricing, product information, demos, and technical questions about the AI-Consultant Widget. <strong>Source: General knowledge base</strong><br><br>What specific aspect interests you most?';
  };

  const sendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: inputValue }]);
    
    const currentInput = inputValue;
    setInputValue('');

    // Add bot response after delay
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        type: 'bot', 
        text: generateResponse(currentInput),
        isHtml: true
      }]);
    }, 1000);
  };

  const askQuestion = (question) => {
    setInputValue(question);
    // Trigger send after setting input
    setTimeout(() => {
      if (!inputValue.trim()) return;

      // Add user message
      setMessages(prev => [...prev, { type: 'user', text: question }]);

      // Add bot response after delay
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          type: 'bot', 
          text: generateResponse(question),
          isHtml: true
        }]);
      }, 1000);
    }, 100);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="ai-widget">
      <div className="widget-header">
        <div className="widget-title">AI Sales Assistant</div>
      </div>
      
      <div className="widget-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            {message.isHtml ? (
              <div dangerouslySetInnerHTML={{ __html: message.text }} />
            ) : (
              message.text
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="starter-prompts">
        <button className="prompt-btn" onClick={() => askQuestion('Price for 10 users')}>
          Price for 10 users
        </button>
        <button className="prompt-btn" onClick={() => askQuestion('Product bundle')}>
          Product bundle
        </button>
        <button className="prompt-btn" onClick={() => askQuestion('Book a demo')}>
          Book a demo
        </button>
      </div>
      
      <div className="widget-input">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask me anything..." 
          onKeyPress={handleKeyPress}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

// Demo Section Component
const DemoSection = () => {
  return (
    <section id="demo" className="section demo-section">
      <div className="container">
        <div className="demo-container">
          <div className="demo-content">
            <h2>Play With the Widget</h2>
            <p>Ask about pricing, bundles, FAQs — the AI answers from your content and can collect a lead.</p>
            
            <ul className="demo-features">
              <li>Answers from your docs (RAG)</li>
              <li>Actions: calculate, quote, book demo</li>
              <li>No pretending to be human</li>
            </ul>
          </div>
          
          <div className="demo-widget">
            <AIWidget />
          </div>
        </div>
        
        <div className="code-snippet">
{`<script defer src="/aiw.js"></script>
<script>
window.AIW.init({ 
    apiBase: "/api", 
    brand: { name: "AI-Consultant Widget", color: "#7A68FF" }, 
    starterPrompts: ["Price for 10 users", "Product bundle", "Book a demo"] 
});
</script>`}
        </div>
        
        <div className="demo-note">
          Want this on your site? Install in 1 line.
        </div>
      </div>
    </section>
  );
};

// Card Component
const Card = ({ title, children, className = "" }) => (
  <div className={`card ${className}`}>
    <h3>{title}</h3>
    {children}
  </div>
);

// Feature Tile Component
const FeatureTile = ({ title, description }) => (
  <div className="feature-tile">
    <h4>{title}</h4>
    <p>{description}</p>
  </div>
);

// Pricing Card Component
const PricingCard = ({ title, price, period, description, isPopular, buttonText, buttonClass }) => (
  <div className={`pricing-card ${isPopular ? 'popular' : ''}`}>
    <h3>{title}</h3>
    <div className="price">{price}</div>
    <div className="price-period">{period}</div>
    <p>{description}</p>
    <a href="#" className={`btn ${buttonClass}`} style={{ marginTop: '24px' }}>
      {buttonText}
    </a>
  </div>
);

function App() {
  useEffect(() => {
    // Smooth scrolling for demo link
    const demoLink = document.querySelector('a[href="#demo"]');
    if (demoLink) {
      demoLink.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('demo').scrollIntoView({
          behavior: 'smooth'
        });
      });
    }
  }, []);

  return (
    <div className="App">
      {/* Hero Section */}
      <Hero />

      {/* Live Demo Section */}
      <DemoSection />

      {/* How It Works Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="cards-grid">
            <Card title="Ask">
              <p>Visitors ask natural questions about your products, pricing, or services directly on your site.</p>
            </Card>
            <Card title="Answer (with citations)">
              <p>AI responds instantly with accurate information sourced from your documentation and knowledge base.</p>
            </Card>
            <Card title="Convert">
              <p>Smart actions like price calculations and lead capture turn conversations into qualified prospects.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Features</h2>
          <div className="features-grid">
            <FeatureTile 
              title="RAG over your docs/FAQ"
              description="Automatically answers from your existing content with perfect accuracy."
            />
            <FeatureTile 
              title="Function-calling actions"
              description="Calculate pricing, generate quotes, and book meetings automatically."
            />
            <FeatureTile 
              title="CRM & Calendar integrations"
              description="Sync leads and appointments directly to your existing tools."
            />
            <FeatureTile 
              title="Anti-hallucination mode"
              description="Always cites sources. Never makes up information about your business."
            />
            <FeatureTile 
              title="Analytics dashboard"
              description="Track questions, content coverage, and conversion metrics."
            />
            <FeatureTile 
              title="Theming & brand controls"
              description="Match your brand colors, fonts, and messaging perfectly."
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Ship Answers. Capture Leads.</h2>
          <ul className="benefits-list">
            <li className="benefit-item">+20–40% lead capture</li>
            <li className="benefit-item">&lt;2s median response</li>
            <li className="benefit-item">1-line install</li>
            <li className="benefit-item">SOC2-friendly architecture</li>
          </ul>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Pricing</h2>
          <div className="pricing-grid">
            <PricingCard 
              title="Starter"
              price="$99"
              period="per month"
              description="1k resolves, basic branding"
              buttonText="Get Started"
              buttonClass="btn-secondary"
            />
            <PricingCard 
              title="Growth"
              price="$299"
              period="per month"
              description="5k resolves, CRM + analytics"
              isPopular={true}
              buttonText="Get Started"
              buttonClass="btn-primary"
            />
            <PricingCard 
              title="Enterprise"
              price="Talk to us"
              period="custom pricing"
              description="SSO, SLA, custom actions"
              buttonText="Contact Sales"
              buttonClass="btn-secondary"
            />
          </div>
          <p style={{ textAlign: 'center', color: '#4A5568', marginTop: '32px' }}>
            Resolve = an answered conversation. Overages auto-scale.
          </p>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Integrations</h2>
          <div className="integrations-grid">
            {['HubSpot', 'Salesforce', 'Google Calendar', 'Zendesk', 'Shopify', 'Webflow'].map((integration, index) => (
              <div key={index} className="integration-item">{integration}</div>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="section" style={{ background: 'white' }}>
        <div className="container">
          <h2 className="section-title">Security & Privacy</h2>
          <div className="security-grid">
            <Card title="Data stays within your project">
              <p>Your content and customer data never leaves your designated environment.</p>
            </Card>
            <Card title="No training on your content by default">
              <p>We don't use your proprietary information to improve our models.</p>
            </Card>
            <Card title="PII minimization">
              <p>Smart filtering to avoid collecting unnecessary personal information.</p>
            </Card>
            <Card title="Role-based access">
              <p>Control who can modify settings and access analytics data.</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Use Cases</h2>
          <div className="cards-grid">
            <Card title="SaaS Pricing Assistant">
              <p>Instantly calculates custom pricing based on user requirements. Converts 35% more visitors to qualified leads.</p>
              <a href="#demo">See demo →</a>
            </Card>
            <Card title="E-commerce Product Matcher">
              <p>Helps customers find the perfect product through conversational discovery. Reduces support tickets by 60%.</p>
              <a href="#demo">See demo →</a>
            </Card>
            <Card title="Services Quote Bot">
              <p>Generates accurate service quotes and books consultations automatically. Saves 20 hours/week of manual work.</p>
              <a href="#demo">See demo →</a>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="final-cta">
        <div className="container">
          <h2>Ready to add an AI Sales Consultant to your site?</h2>
          <div className="cta-buttons">
            <a href="#" className="btn btn-primary">Get Started Free</a>
            <a href="#" className="btn btn-secondary">Book a Demo</a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <a href="#">Docs</a>
            <a href="#">Privacy</a>
            <Link to="/terms">Terms</Link> 
            <Link to="/contacts">Contact</Link> 
          </div>
          <p>&copy; 2025 AI-Consultant Widget</p>
        </div>
      </footer>
    </div>
  );
}

export default App;