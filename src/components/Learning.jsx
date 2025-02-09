import React from 'react';
import './Learning.css';

function Learning() {
  return (
    <div className="learning-container">
      <h1>Sustainability Learning Hub</h1>
      
      <section className="learning-section">
        <h2>Educational Resources</h2>
        <div className="resource-grid">
          <div className="resource-card">
            <h3>Sustainability Basics</h3>
            <p>Learn the fundamental concepts of environmental sustainability and conservation.</p>
          </div>
          <div className="resource-card">
            <h3>Advanced Topics</h3>
            <p>Dive deep into climate science, renewable energy, and ecosystem management.</p>
          </div>
        </div>
      </section>

      <section className="learning-section">
        <h2>Case Studies</h2>
        <div className="case-studies">
          <div className="case-study-card">
            <h3>Real-World Examples</h3>
            <p>Explore successful sustainability initiatives from around the globe.</p>
          </div>
          <div className="case-study-card">
            <h3>Game Scenarios</h3>
            <p>See how TerraQuest scenarios relate to real environmental challenges.</p>
          </div>
        </div>
      </section>

      <section className="learning-section">
        <h2>Environmental Impact Guides</h2>
        <div className="guides-list">
          <div className="guide-item">
            <h3>Carbon Footprint</h3>
            <p>Calculate and reduce your personal environmental impact.</p>
          </div>
          <div className="guide-item">
            <h3>Sustainable Living</h3>
            <p>Practical tips for environmentally conscious lifestyle choices.</p>
          </div>
        </div>
      </section>

      <section className="learning-section">
        <h2>Career Opportunities</h2>
        <div className="careers-grid">
          <div className="career-card">
            <h3>Environmental Science</h3>
            <p>Discover careers in research and conservation.</p>
          </div>
          <div className="career-card">
            <h3>Sustainable Business</h3>
            <p>Explore opportunities in green business and consulting.</p>
          </div>
        </div>
      </section>

      <section className="learning-section">
        <h2>Interactive Tutorials</h2>
        <div className="tutorials-container">
          <div className="tutorial-card">
            <h3>Decision-Making Scenarios</h3>
            <p>Practice making sustainable choices in interactive simulations.</p>
          </div>
          <div className="tutorial-card">
            <h3>Impact Assessment</h3>
            <p>Learn to evaluate environmental consequences of different actions.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Learning; 