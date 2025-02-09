import React, { useState } from 'react';
import './Community.css';

function Community() {
  const [activeTab, setActiveTab] = useState('stories');

  const [stories] = useState([
    {
      id: 1,
      author: "EcoExplorer",
      title: "My Journey to Sustainable Mining",
      content: "When I first started playing TerraQuest, I struggled with balancing economic needs and environmental protection...",
      likes: 24,
      comments: 8
    },
    {
      id: 2,
      author: "OceanGuardian",
      title: "Innovative Solutions in Ocean Conservation",
      content: "Through multiple playthroughs of the ocean scenarios, I discovered some interesting strategies...",
      likes: 32,
      comments: 12
    }
  ]);

  const [discussions] = useState([
    {
      id: 1,
      title: "Sustainable Energy Solutions",
      author: "GreenTech",
      replies: 45,
      lastActive: "2 hours ago"
    },
    {
      id: 2,
      title: "Balancing Economic Growth with Environmental Protection",
      author: "EcoBalance",
      replies: 67,
      lastActive: "5 hours ago"
    }
  ]);

  const [initiatives] = useState([
    {
      id: 1,
      title: "Community Beach Cleanup",
      participants: 156,
      status: "Active",
      description: "Join our monthly beach cleanup initiative to protect marine life."
    },
    {
      id: 2,
      title: "Urban Garden Project",
      participants: 89,
      status: "Planning",
      description: "Help create sustainable urban gardens in your community."
    }
  ]);

  return (
    <div className="community-container">
      <h1>TerraQuest Community Hub</h1>
      
      <div className="community-tabs">
        <button 
          className={`tab-button ${activeTab === 'stories' ? 'active' : ''}`}
          onClick={() => setActiveTab('stories')}
        >
          User Stories
        </button>
        <button 
          className={`tab-button ${activeTab === 'discussions' ? 'active' : ''}`}
          onClick={() => setActiveTab('discussions')}
        >
          Discussions
        </button>
        <button 
          className={`tab-button ${activeTab === 'suggestions' ? 'active' : ''}`}
          onClick={() => setActiveTab('suggestions')}
        >
          Scenario Suggestions
        </button>
        <button 
          className={`tab-button ${activeTab === 'initiatives' ? 'active' : ''}`}
          onClick={() => setActiveTab('initiatives')}
        >
          Initiatives
        </button>
      </div>

      <div className="community-content">
        {activeTab === 'stories' && (
          <div className="stories-section">
            <h2>User Stories & Experiences</h2>
            <div className="stories-grid">
              {stories.map(story => (
                <div key={story.id} className="story-card">
                  <h3>{story.title}</h3>
                  <p className="story-author">By {story.author}</p>
                  <p className="story-content">{story.content}</p>
                  <div className="story-stats">
                    <span>❤️ {story.likes}</span>
                    <span>💬 {story.comments}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'discussions' && (
          <div className="discussions-section">
            <h2>Discussion Forums</h2>
            <div className="discussions-list">
              {discussions.map(discussion => (
                <div key={discussion.id} className="discussion-card">
                  <h3>{discussion.title}</h3>
                  <p className="discussion-meta">
                    Started by {discussion.author} • {discussion.replies} replies • Last active {discussion.lastActive}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'suggestions' && (
          <div className="suggestions-section">
            <h2>Submit Your Scenario Ideas</h2>
            <div className="suggestion-form">
              <input type="text" placeholder="Scenario Title" className="suggestion-input" />
              <textarea placeholder="Describe your scenario idea..." className="suggestion-textarea"></textarea>
              <button className="submit-button">Submit Suggestion</button>
            </div>
          </div>
        )}

        {activeTab === 'initiatives' && (
          <div className="initiatives-section">
            <h2>Environmental Action Initiatives</h2>
            <div className="initiatives-grid">
              {initiatives.map(initiative => (
                <div key={initiative.id} className="initiative-card">
                  <h3>{initiative.title}</h3>
                  <span className={`status-badge ${initiative.status.toLowerCase()}`}>
                    {initiative.status}
                  </span>
                  <p>{initiative.description}</p>
                  <div className="initiative-stats">
                    <span>👥 {initiative.participants} participants</span>
                  </div>
                  <button className="join-button">Join Initiative</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Community; 