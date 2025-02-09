import React, { useState } from 'react';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-container">
      <h1>Get in Touch</h1>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-section">
            <h2>Connect With Us</h2>
            <p>Have questions about TerraQuest? Want to share your feedback or report an issue? We'd love to hear from you!</p>
          </div>

          <div className="contact-methods">
            <div className="method-card">
              <span className="method-icon">📧</span>
              <h3>Email Support</h3>
              <p>support@terraquest.com</p>
              <p>Response within 24 hours</p>
            </div>

            <div className="method-card">
              <span className="method-icon">💬</span>
              <h3>Community Discord</h3>
              <p>Join our Discord community</p>
              <p>Real-time chat with other players</p>
            </div>

            <div className="method-card">
              <span className="method-icon">📱</span>
              <h3>Social Media</h3>
              <p>Follow us for updates</p>
              <div className="social-links">
                <a href="#twitter">Twitter</a>
                <a href="#linkedin">LinkedIn</a>
                <a href="#instagram">Instagram</a>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form-container">
          <h2>Send Us a Message</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="What's this about?"
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message here..."
                rows="5"
              />
            </div>

            <button type="submit" className="submit-button">
              Send Message
            </button>
          </form>
        </div>
      </div>

      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-card">
            <h3>How do I start playing?</h3>
            <p>Simply create an account and choose your first scenario from the home page. Our tutorial will guide you through the rest!</p>
          </div>
          <div className="faq-card">
            <h3>Is TerraQuest free to play?</h3>
            <p>Yes! TerraQuest is completely free to play. We believe in making sustainability education accessible to everyone.</p>
          </div>
          <div className="faq-card">
            <h3>Can I suggest new scenarios?</h3>
            <p>Absolutely! Visit our Community page and use the Scenario Suggestions tab to submit your ideas.</p>
          </div>
          <div className="faq-card">
            <h3>How can I report a bug?</h3>
            <p>Use the contact form above or join our Discord community to report any issues you encounter.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact; 