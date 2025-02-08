import { useNavigate } from 'react-router-dom';
import "./Hero.css"

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="hero-container">
      <section className="hero">
        <h1 className="main-title">TerraQuest</h1>
        <h2 className="title">Make sustainability decisions that shape the future!</h2>
        <p className="subtitle">
          Embark on an AI-powered adventure where your choices impact the environment, 
          economy, and society. Will you lead with sustainability, profit, or community in mind?
        </p>
        <button 
          className="cta"
          onClick={() => navigate('/roles')}
        >
          Start Your Journey
        </button>
      </section>

      <section className="features">
        <h3 className="features-title">Why Play TerraQuest?</h3>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-emoji">🤖</span>
            <h4>AI-Powered Storylines</h4>
            <p>Experience unique scenarios that adapt to your decisions</p>
          </div>
          <div className="feature-card">
            <span className="feature-emoji">🌍</span>
            <h4>Real-World Impact</h4>
            <p>Learn how sustainability decisions affect our planet</p>
          </div>
          <div className="feature-card">
            <span className="feature-emoji">🎮</span>
            <h4>Interactive Learning</h4>
            <p>Engage with complex environmental challenges</p>
          </div>
        </div>
      </section>

      <section className="scenarios">
        <h3 className="scenarios-title">Choose Your Path</h3>
        <div className="scenarios-preview">
          <div className="scenario">
            <div className="scenario-icon">🌎</div>
            <h4>Mining & Sustainability</h4>
            <p>Balance resource extraction with environmental protection</p>
          </div>
          <div className="scenario">
            <div className="scenario-icon">🌊</div>
            <h4>Ocean Conservation</h4>
            <p>Protect marine ecosystems while supporting local economies</p>
          </div>
          <div className="scenario">
            <div className="scenario-icon">🚀</div>
            <h4>Space Colonization</h4>
            <p>Build a sustainable future beyond Earth</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Hero

