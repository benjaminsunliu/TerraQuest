export const oceanStory = {
  start: {
    text: "Welcome to the Pacific Ocean Research Station. As the newly appointed Marine Conservation Director, you face your first challenge. Recent data shows declining fish populations in protected areas...",
    choices: [
      {
        text: "Implement stricter fishing quotas in the affected areas",
        nextScene: "strict_quotas",
        impact: { environment: 2, economy: -1, social: -1 }
      },
      {
        text: "Invest in advanced monitoring technology",
        nextScene: "monitoring_tech",
        impact: { environment: 1, economy: -2, social: 0 }
      },
      {
        text: "Launch a community-based conservation program",
        nextScene: "community_program",
        impact: { environment: 1, economy: 0, social: 2 }
      }
    ]
  },
  strict_quotas: {
    text: "The new quotas have reduced overfishing, but local fishing communities are struggling to adapt. You need to address their concerns...",
    choices: [
      {
        text: "Provide subsidies for sustainable fishing equipment",
        nextScene: "sustainable_equipment",
        impact: { environment: 1, economy: -1, social: 2 }
      },
      {
        text: "Develop alternative employment programs",
        nextScene: "alternative_employment",
        impact: { environment: 2, economy: 1, social: 1 }
      }
    ]
  },
  sustainable_equipment: {
    text: "The subsidies program shows promise. What's your next step to ensure long-term success?",
    choices: [
      {
        text: "Expand the program to neighboring communities",
        nextScene: "ending_community",
        impact: { environment: 1, economy: 1, social: 2 }
      },
      {
        text: "Focus on training and certification programs",
        nextScene: "ending_innovator",
        impact: { environment: 2, economy: 1, social: 1 }
      }
    ]
  },
  alternative_employment: {
    text: "The job transition program is underway. How do you want to develop it further?",
    choices: [
      {
        text: "Focus on eco-tourism and marine education",
        nextScene: "ending_conservationist",
        impact: { environment: 2, economy: 1, social: 1 }
      },
      {
        text: "Develop sustainable aquaculture initiatives",
        nextScene: "ending_innovator",
        impact: { environment: 1, economy: 2, social: 1 }
      }
    ]
  },
  monitoring_tech: {
    text: "The new monitoring systems reveal complex migration patterns and previously unknown breeding grounds. How will you use this data?",
    choices: [
      {
        text: "Establish new marine protected areas",
        nextScene: "new_protected_areas",
        impact: { environment: 3, economy: -2, social: 0 }
      },
      {
        text: "Share data with fishing fleets to optimize sustainable catches",
        nextScene: "data_sharing",
        impact: { environment: 1, economy: 2, social: 1 }
      }
    ]
  },
  new_protected_areas: {
    text: "The protected areas are established. What's your strategy for enforcement?",
    choices: [
      {
        text: "Deploy autonomous monitoring drones",
        nextScene: "ending_innovator",
        impact: { environment: 2, economy: -1, social: 0 }
      },
      {
        text: "Partner with local communities for surveillance",
        nextScene: "ending_community",
        impact: { environment: 1, economy: 0, social: 2 }
      }
    ]
  },
  data_sharing: {
    text: "The fishing industry is eager to collaborate. How do you want to proceed?",
    choices: [
      {
        text: "Develop a real-time fishing advisory system",
        nextScene: "ending_innovator",
        impact: { environment: 1, economy: 2, social: 1 }
      },
      {
        text: "Create a certification program for sustainable practices",
        nextScene: "ending_conservationist",
        impact: { environment: 2, economy: 1, social: 1 }
      }
    ]
  },
  community_program: {
    text: "Local communities are enthusiastic about conservation but need resources and training...",
    choices: [
      {
        text: "Focus on traditional ecological knowledge integration",
        nextScene: "traditional_knowledge",
        impact: { environment: 2, economy: 0, social: 2 }
      },
      {
        text: "Develop eco-tourism opportunities",
        nextScene: "eco_tourism",
        impact: { environment: 1, economy: 2, social: 1 }
      }
    ]
  },
  traditional_knowledge: {
    text: "The traditional knowledge program is showing great results. How do you want to expand it?",
    choices: [
      {
        text: "Create an intergenerational mentorship program",
        nextScene: "ending_community",
        impact: { environment: 1, economy: 0, social: 3 }
      },
      {
        text: "Document and integrate practices into policy",
        nextScene: "ending_conservationist",
        impact: { environment: 2, economy: 1, social: 1 }
      }
    ]
  },
  eco_tourism: {
    text: "The eco-tourism initiative is growing. What's your next focus?",
    choices: [
      {
        text: "Expand marine wildlife watching programs",
        nextScene: "ending_conservationist",
        impact: { environment: 2, economy: 1, social: 1 }
      },
      {
        text: "Develop sustainable coastal infrastructure",
        nextScene: "ending_innovator",
        impact: { environment: 1, economy: 2, social: 1 }
      }
    ]
  },
  ending_conservationist: {
    text: "Your strong focus on environmental protection has created a model for sustainable ocean management.",
    isEnding: true
  },
  ending_innovator: {
    text: "Your technological approach to conservation has revolutionized marine resource management.",
    isEnding: true
  },
  ending_community: {
    text: "Your community-first approach has created a sustainable balance between conservation and local needs.",
    isEnding: true
  }
};

export const getPersonalityAssessment = (scores) => {
  const { environment, economy, social } = scores;
  
  if (environment > economy && environment > social) {
    return {
      type: "Marine Conservation Specialist",
      description: "You prioritize ocean ecosystem health and biodiversity protection. Your approach focuses on scientific solutions to environmental challenges.",
      careers: [
        "Marine Protected Area Manager",
        "Conservation Policy Advisor",
        "Marine Ecosystem Researcher"
      ]
    };
  } else if (economy > environment && economy > social) {
    return {
      type: "Sustainable Maritime Developer",
      description: "You excel at finding economic opportunities while maintaining environmental standards. Your approach balances conservation with sustainable resource use.",
      careers: [
        "Sustainable Fisheries Manager",
        "Blue Economy Consultant",
        "Marine Resource Coordinator"
      ]
    };
  } else {
    return {
      type: "Community Conservation Leader",
      description: "You understand that successful conservation requires community support and engagement. Your approach emphasizes local involvement and traditional knowledge.",
      careers: [
        "Community Outreach Coordinator",
        "Indigenous Knowledge Specialist",
        "Marine Education Director"
      ]
    };
  }
}; 