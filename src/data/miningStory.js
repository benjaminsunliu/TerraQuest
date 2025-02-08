export const miningStory = {
  start: {
    text: "As the new CEO of EarthCore Mining Corporation, you face a critical decision. Geological surveys have discovered a massive rare earth deposit in an environmentally sensitive area...",
    choices: [
      {
        text: "Pursue traditional mining methods with environmental safeguards",
        nextScene: "traditional_mining",
        impact: { environment: -1, economy: 2, social: 0 }
      },
      {
        text: "Invest in experimental eco-friendly extraction technology",
        nextScene: "eco_extraction",
        impact: { environment: 2, economy: -1, social: 0 }
      },
      {
        text: "Engage with local communities to develop a collaborative approach",
        nextScene: "community_engagement",
        impact: { environment: 0, economy: 0, social: 2 }
      }
    ]
  },
  traditional_mining: {
    text: "Mining operations have begun, but local environmental groups are protesting. How do you address their concerns?",
    choices: [
      {
        text: "Implement additional environmental monitoring systems",
        nextScene: "monitoring_systems",
        impact: { environment: 1, economy: -1, social: 1 }
      },
      {
        text: "Create a community oversight committee",
        nextScene: "oversight_committee",
        impact: { environment: 0, economy: -1, social: 2 }
      }
    ]
  },
  monitoring_systems: {
    text: "The monitoring systems reveal some concerning data. What's your response?",
    choices: [
      {
        text: "Temporarily halt operations to implement improvements",
        nextScene: "ending_responsible",
        impact: { environment: 2, economy: -2, social: 1 }
      },
      {
        text: "Develop real-time mitigation strategies while continuing operations",
        nextScene: "ending_pragmatic",
        impact: { environment: 1, economy: 1, social: 0 }
      }
    ]
  },
  oversight_committee: {
    text: "The committee proposes significant changes to operations. How do you proceed?",
    choices: [
      {
        text: "Fully implement their recommendations",
        nextScene: "ending_community",
        impact: { environment: 1, economy: -1, social: 3 }
      },
      {
        text: "Negotiate a balanced approach",
        nextScene: "ending_balanced",
        impact: { environment: 1, economy: 1, social: 1 }
      }
    ]
  },
  eco_extraction: {
    text: "The new technology shows promise but requires more development time. Investors are getting nervous...",
    choices: [
      {
        text: "Double down on R&D investment",
        nextScene: "increased_research",
        impact: { environment: 2, economy: -2, social: 0 }
      },
      {
        text: "Implement a hybrid approach using some traditional methods",
        nextScene: "hybrid_approach",
        impact: { environment: 1, economy: 1, social: 0 }
      }
    ]
  },
  increased_research: {
    text: "A breakthrough in the technology has been achieved. How do you want to proceed?",
    choices: [
      {
        text: "Patent and commercialize the technology",
        nextScene: "ending_innovative",
        impact: { environment: 1, economy: 3, social: 0 }
      },
      {
        text: "Share the technology with the industry",
        nextScene: "ending_visionary",
        impact: { environment: 3, economy: 0, social: 1 }
      }
    ]
  },
  hybrid_approach: {
    text: "The hybrid approach is showing results. What's your next focus?",
    choices: [
      {
        text: "Scale up the eco-friendly components",
        nextScene: "ending_progressive",
        impact: { environment: 2, economy: 0, social: 1 }
      },
      {
        text: "Optimize for operational efficiency",
        nextScene: "ending_pragmatic",
        impact: { environment: 0, economy: 2, social: 0 }
      }
    ]
  },
  community_engagement: {
    text: "The community has proposed a partnership model. How do you structure it?",
    choices: [
      {
        text: "Create a profit-sharing agreement",
        nextScene: "profit_sharing",
        impact: { environment: 0, economy: 1, social: 2 }
      },
      {
        text: "Establish a community-led oversight board",
        nextScene: "community_board",
        impact: { environment: 1, economy: 0, social: 2 }
      }
    ]
  },
  profit_sharing: {
    text: "The profit-sharing model is successful. How do you want to expand it?",
    choices: [
      {
        text: "Invest in community development projects",
        nextScene: "ending_community",
        impact: { environment: 1, economy: 0, social: 2 }
      },
      {
        text: "Create a sustainable business development fund",
        nextScene: "ending_balanced",
        impact: { environment: 1, economy: 2, social: 1 }
      }
    ]
  },
  community_board: {
    text: "The board suggests integrating traditional land management practices. How do you respond?",
    choices: [
      {
        text: "Fully embrace traditional methods",
        nextScene: "ending_visionary",
        impact: { environment: 2, economy: -1, social: 2 }
      },
      {
        text: "Create a hybrid modern-traditional approach",
        nextScene: "ending_progressive",
        impact: { environment: 1, economy: 1, social: 1 }
      }
    ]
  },
  ending_responsible: {
    text: "Your commitment to responsible mining practices has set new industry standards for environmental protection.",
    isEnding: true
  },
  ending_pragmatic: {
    text: "Your balanced approach to mining operations has achieved sustainable growth while maintaining environmental standards.",
    isEnding: true
  },
  ending_community: {
    text: "Your strong partnership with local communities has created a new model for sustainable resource extraction.",
    isEnding: true
  },
  ending_balanced: {
    text: "Your ability to balance multiple stakeholder interests has created a sustainable and profitable operation.",
    isEnding: true
  },
  ending_innovative: {
    text: "Your investment in innovation has revolutionized the mining industry's approach to environmental protection.",
    isEnding: true
  },
  ending_visionary: {
    text: "Your visionary leadership has transformed how the mining industry approaches sustainability and community engagement.",
    isEnding: true
  },
  ending_progressive: {
    text: "Your progressive approach has demonstrated that environmental protection and profitable mining can coexist.",
    isEnding: true
  }
};

export const getPersonalityAssessment = (scores) => {
  const { environment, economy, social } = scores;
  
  if (environment > economy && environment > social) {
    return {
      type: "Environmental Innovator",
      description: "You prioritize environmental protection while pushing technological boundaries. Your leadership style focuses on finding new solutions to sustainability challenges.",
      careers: [
        "Sustainable Mining Technology Developer",
        "Environmental Impact Assessment Specialist",
        "Green Mining Consultant"
      ]
    };
  } else if (economy > environment && economy > social) {
    return {
      type: "Resource Optimization Specialist",
      description: "You excel at finding efficient ways to extract resources while maintaining environmental standards. Your approach balances profitability with sustainability.",
      careers: [
        "Mining Operations Director",
        "Resource Management Consultant",
        "Sustainable Business Strategist"
      ]
    };
  } else {
    return {
      type: "Stakeholder Relations Expert",
      description: "You understand that successful mining operations require strong community support and engagement. Your approach emphasizes collaboration and shared benefits.",
      careers: [
        "Community Relations Director",
        "Indigenous Engagement Specialist",
        "Social Impact Assessment Manager"
      ]
    };
  }
}; 