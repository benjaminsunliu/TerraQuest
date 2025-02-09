export const spaceStory = {
  start: {
    text: "As the newly appointed Director of Mars Base Alpha, you face your first major challenge. The base's atmospheric processors are showing signs of strain, and the backup systems are reporting anomalies. Your decisions in the next few hours could determine the future of humanity's first permanent Mars settlement...",
    choices: [
      {
        text: "Implement an immediate emergency shutdown and switch to backup life support systems",
        nextScene: "emergency_shutdown",
        impact: { environment: 1, economy: -2, social: -1 }
      },
      {
        text: "Initiate a gradual power reduction while engineers diagnose the issue",
        nextScene: "gradual_reduction",
        impact: { environment: 0, economy: -1, social: 1 }
      },
      {
        text: "Deploy experimental AI-driven optimization protocols",
        nextScene: "ai_optimization",
        impact: { environment: 2, economy: -1, social: 0 }
      }
    ]
  },

  emergency_shutdown: {
    text: "The backup systems are stable, but the sudden shutdown has caused unrest among the colonists. Engineers report that the main system requires significant repairs. How do you proceed?",
    choices: [
      {
        text: "Focus resources on rapid repairs to restore full functionality",
        nextScene: "rapid_repair",
        impact: { environment: -1, economy: -2, social: 1 }
      },
      {
        text: "Implement a new distributed life support architecture",
        nextScene: "ending_innovator",
        impact: { environment: 2, economy: -1, social: 1 }
      }
    ]
  },

  gradual_reduction: {
    text: "The engineering team has identified multiple efficiency issues. They present two possible solutions...",
    choices: [
      {
        text: "Upgrade to new eco-friendly components",
        nextScene: "ending_sustainable",
        impact: { environment: 2, economy: -1, social: 1 }
      },
      {
        text: "Optimize existing systems with minimal disruption",
        nextScene: "ending_pragmatic",
        impact: { environment: 0, economy: 2, social: 1 }
      }
    ]
  },

  ai_optimization: {
    text: "The AI system has identified several critical improvements, but implementing them requires significant changes to established protocols...",
    choices: [
      {
        text: "Fully commit to AI-driven systems management",
        nextScene: "ending_technical",
        impact: { environment: 2, economy: 2, social: -1 }
      },
      {
        text: "Implement a hybrid human-AI management approach",
        nextScene: "ending_balanced",
        impact: { environment: 1, economy: 1, social: 2 }
      }
    ]
  },

  ending_innovator: {
    text: "Your bold approach to infrastructure has revolutionized life support systems for future Mars colonies. The distributed architecture becomes a standard for off-world settlements.",
    isEnding: true
  },

  ending_sustainable: {
    text: "Your commitment to environmental sustainability has created a model for future space colonies, proving that human expansion and environmental responsibility can coexist.",
    isEnding: true
  },

  ending_pragmatic: {
    text: "Your practical approach to crisis management has ensured the colony's stability while maintaining operational efficiency.",
    isEnding: true
  },

  ending_technical: {
    text: "Your embrace of AI technology has created a highly efficient, automated colony management system that becomes a blueprint for future settlements.",
    isEnding: true
  },

  ending_balanced: {
    text: "Your balanced approach to technology and human factors has created a resilient and adaptable colony management model.",
    isEnding: true
  }
};

// This function is now just a fallback in case the API fails
export const getPersonalityAssessment = (scores) => {
  const { environment, economy, social } = scores;
  
  if (environment > economy && environment > social) {
    return {
      type: "Space Sustainability Specialist",
      description: "You excel at finding innovative solutions to environmental challenges in space colonization. Your leadership style prioritizes long-term sustainability over short-term gains.",
      careers: [
        "Environmental Systems Engineer",
        "Habitat Sustainability Coordinator",
        "Space Agriculture Specialist"
      ]
    };
  } else if (economy > environment && economy > social) {
    return {
      type: "Space Operations Strategist",
      description: "You have a talent for optimizing resources and maintaining operational efficiency. Your approach balances innovation with practical constraints.",
      careers: [
        "Colony Resource Manager",
        "Space Infrastructure Director",
        "Logistics Optimization Specialist"
      ]
    };
  } else {
    return {
      type: "Space Community Developer",
      description: "You understand that successful space colonization requires strong community bonds and effective human systems. Your leadership style emphasizes social cohesion and collaborative problem-solving.",
      careers: [
        "Colony Social Systems Director",
        "Space Psychology Coordinator",
        "Community Integration Specialist"
      ]
    };
  }
}; 