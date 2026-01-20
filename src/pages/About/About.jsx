import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const AboutPage = () => {
  const [formData, setFormData] = useState({
    businessName: '',
    location: '',
    description: '',
    applicantEmail: '',
    applicantPhone: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission - matches your API endpoint
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // This is where you'll connect to your actual API
      // For now, we'll simulate API call with mock data
      
      // API Endpoint: POST /api/applications
      const applicationData = {
        businessName: formData.businessName,
        location: formData.location,
        description: formData.description,
        applicantEmail: formData.applicantEmail || undefined,
        applicantPhone: formData.applicantPhone || undefined
      };

      // Simulate API call
      console.log('Submitting to /api/applications:', applicationData);
      
      // Mock API response matching your API documentation
      const mockResponse = {
        success: true,
        data: {
          id: `APP_${Date.now()}`,
          businessName: formData.businessName,
          location: formData.location,
          status: 'pending',
          createdAt: new Date().toISOString()
        },
        message: 'Application submitted successfully. We\'ll review it soon!',
        timestamp: new Date().toISOString()
      };

      // Success message
      setSubmitMessage(mockResponse.message);
      
      // Reset form after successful submission
      setFormData({
        businessName: '',
        location: '',
        description: '',
        applicantEmail: '',
        applicantPhone: ''
      });

      // Clear message after 5 seconds
      setTimeout(() => setSubmitMessage(''), 5000);

    } catch (error) {
      // Error handling matching your API error format
      const mockError = {
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Please fill in all required fields',
          details: [
            {
              field: 'businessName',
              message: 'Business name is required'
            }
          ]
        },
        timestamp: new Date().toISOString()
      };
      setSubmitMessage(mockError.error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-section">
        <div className="about-text">
          <h1>ABOUT <span className="script-font text-green">Gebeta</span><br />REVIEW</h1>

          <p>
            <span className="script-font text-green">Gebeta</span> is a student-powered food discovery and review
            platform built to help university students find the best meals on and around campus.
          </p>
          <p>
            We make it easy to explore cafeterias, nearby restaurants, and student-run delivery services — all
            in one organized hub.
          </p>
        </div>

        <div className="about-gallery">
          <div 
            className="gallery-item large"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=600')" }}
          >
            <span className="gallery-label">OFF-CAMPUS</span>
          </div>
          <div 
            className="gallery-item"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=300')" }}
          >
            <span className="gallery-label">ON-CAMPUS</span>
          </div>
          <div 
            className="gallery-item wide"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1695654390723-479197a8c4a3?q=80&w=1434&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
          >
            <span className="gallery-label">DELIVERY</span>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Business Application Form - Connected to API */}
      <section className="form-section" id="business-sec">
        <h2 className="section-title text-center">LIST YOUR BUSINESS</h2>

        {submitMessage && (
          <div className={`submit-message ${submitMessage.includes('success') ? 'success' : 'error'}`}>
            {submitMessage}
          </div>
        )}

        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="businessName">BUSINESS NAME *</label>
              <input 
                type="text" 
                id="businessName"
                name="businessName"
                placeholder="Enter your business name"
                value={formData.businessName}
                onChange={handleChange}
                required 
                minLength="3"
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">LOCATION *</label>
              <input 
                type="text" 
                id="location"
                name="location"
                placeholder="e.g., Near 5k Campus Gate"
                value={formData.location}
                onChange={handleChange}
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">DESCRIPTION</label>
              <textarea 
                id="description"
                name="description"
                rows="5"
                placeholder="Describe your business (max 500 characters)"
                value={formData.description}
                onChange={handleChange}
                maxLength="500"
              ></textarea>
              <div className="char-count">
                {formData.description.length}/500 characters
              </div>
            </div>
         
            <button 
              type="submit" 
              className="btn btn-primary submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
        
          </form>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;