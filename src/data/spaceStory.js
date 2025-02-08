export const spaceStory = {
  start: {
    text: "Welcome to Mars Colony Alpha. As the newly appointed colony leader, your first challenge awaits. The colony's oxygen recycling system is showing signs of strain...",
    choices: [
      {
        text: "Divert power from non-essential systems to boost oxygen recycling",
        nextScene: "power_diversion",
        impact: { environment: 2, economy: -1, social: -1 }
      },
      {
        text: "Order an immediate evacuation of non-essential personnel",
        nextScene: "evacuation",
        impact: { environment: 0, economy: -3, social: -2 }
      },
      {
        text: "Initialize the backup experimental algae-based oxygen system",
        nextScene: "algae_system",
        impact: { environment: 3, economy: -2, social: 1 }
      }
    ]
  },
  power_diversion: {
    text: "The oxygen levels stabilize, but the colony's research facilities and entertainment systems are now running at minimal capacity. The colonists are getting restless...",
    choices: [
      {
        text: "Implement a rotating schedule to share limited power resources",
        nextScene: "resource_management",
        impact: { environment: 1, economy: 0, social: 2 }
      },
      {
        text: "Focus power on essential research, maintain minimal life support elsewhere",
        nextScene: "research_focus",
        impact: { environment: 0, economy: 2, social: -2 }
      }
    ]
  },
  resource_management: {
    text: "The rotation system is working, but efficiency is low. What's your next step?",
    choices: [
      {
        text: "Invest in power storage technology",
        nextScene: "ending_technical",
        impact: { environment: 1, economy: -1, social: 1 }
      },
      {
        text: "Develop community-led conservation programs",
        nextScene: "ending_protective",
        impact: { environment: 2, economy: 0, social: 2 }
      }
    ]
  },
  research_focus: {
    text: "Research productivity has increased, but morale is declining. How do you address this?",
    choices: [
      {
        text: "Implement automated entertainment systems",
        nextScene: "ending_technical",
        impact: { environment: 0, economy: 1, social: 1 }
      },
      {
        text: "Prioritize social spaces in the power rotation",
        nextScene: "ending_practical",
        impact: { environment: -1, economy: 0, social: 2 }
      }
    ]
  },
  evacuation: {
    text: "With fewer people, resources are stabilizing. How do you reorganize the remaining workforce?",
    choices: [
      {
        text: "Cross-train personnel for multiple roles",
        nextScene: "cross_training",
        impact: { environment: 1, economy: 1, social: 1 }
      },
      {
        text: "Focus on automating non-critical tasks",
        nextScene: "automation",
        impact: { environment: 2, economy: -1, social: -1 }
      }
    ]
  },
  cross_training: {
    text: "The versatile workforce is adapting well. What's your long-term strategy?",
    choices: [
      {
        text: "Develop a comprehensive skills database",
        nextScene: "ending_practical",
        impact: { environment: 0, economy: 2, social: 1 }
      },
      {
        text: "Create mentorship programs",
        nextScene: "ending_protective",
        impact: { environment: 1, economy: 0, social: 2 }
      }
    ]
  },
  automation: {
    text: "Automation is reducing workload. How do you want to utilize the freed-up personnel?",
    choices: [
      {
        text: "Expand research and development",
        nextScene: "ending_innovative",
        impact: { environment: 2, economy: 1, social: 0 }
      },
      {
        text: "Focus on community building",
        nextScene: "ending_protective",
        impact: { environment: 1, economy: 0, social: 2 }
      }
    ]
  },
  algae_system: {
    text: "The algae system is promising but requires careful monitoring. What's your focus?",
    choices: [
      {
        text: "Expand the system throughout the colony",
        nextScene: "expansion",
        impact: { environment: 2, economy: -1, social: 0 }
      },
      {
        text: "Research optimization and efficiency",
        nextScene: "optimization",
        impact: { environment: 1, economy: 1, social: 0 }
      }
    ]
  },
  expansion: {
    text: "The expanded system is working well. How do you want to develop it further?",
    choices: [
      {
        text: "Integrate with food production",
        nextScene: "ending_innovative",
        impact: { environment: 2, economy: 1, social: 1 }
      },
      {
        text: "Focus on system stability",
        nextScene: "ending_cautious",
        impact: { environment: 1, economy: 1, social: 1 }
      }
    ]
  },
  optimization: {
    text: "Research has identified several potential improvements. Which do you prioritize?",
    choices: [
      {
        text: "Implement automated monitoring systems",
        nextScene: "ending_technical",
        impact: { environment: 1, economy: 2, social: 0 }
      },
      {
        text: "Develop fail-safe mechanisms",
        nextScene: "ending_cautious",
        impact: { environment: 2, economy: 0, social: 1 }
      }
    ]
  },
  ending_sustainable: {
    text: "Through careful planning and sustainable practices, you've created a thriving Mars colony that balances human needs with environmental responsibility.",
    isEnding: true
  },
  ending_protective: {
    text: "Your focus on protecting your people has created a resilient community, though at some cost to efficiency and environmental goals.",
    isEnding: true
  },
  ending_practical: {
    text: "Your practical approach to crisis management has ensured the colony's survival, setting a foundation for future growth.",
    isEnding: true
  },
  ending_technical: {
    text: "Your investment in automation has modernized the colony, creating a highly efficient but somewhat impersonal environment.",
    isEnding: true
  },
  ending_innovative: {
    text: "Your bold embrace of experimental technology has transformed the colony into a model of sustainable space habitation.",
    isEnding: true
  },
  ending_cautious: {
    text: "Your measured approach to innovation has created a stable and reliable colony environment.",
    isEnding: true
  }
};

export const getPersonalityAssessment = (scores) => {
  const { environment, economy, social } = scores;
  const total = environment + economy + social;
  
  if (environment > economy && environment > social) {
    return {
      type: "Environmental Pioneer",
      description: "You prioritize sustainable practices and environmental protection. Your leadership style would be well-suited for roles in environmental policy, sustainable technology development, or conservation projects.",
      careers: ["Environmental Policy Advisor", "Sustainable Technology Researcher", "Conservation Project Manager"]
    };
  } else if (economy > environment && economy > social) {
    return {
      type: "Economic Strategist",
      description: "You excel at resource management and economic growth. Your skills would be valuable in business development, resource management, or financial planning roles.",
      careers: ["Resource Manager", "Business Strategist", "Economic Development Advisor"]
    };
  } else {
    return {
      type: "Community Leader",
      description: "You prioritize social welfare and community building. Your leadership style is ideal for roles in community development, public policy, or social program management.",
      careers: ["Community Development Director", "Public Policy Advisor", "Social Program Coordinator"]
    };
  }
}; 