import { useState } from "react";
import { FaGamepad, FaRobot, FaChartBar } from 'react-icons/fa';
import { GiMining, GiWaterRecycling, GiSpaceShuttle } from 'react-icons/gi';
import styles from "./About.module.css";

const About = () => {
  const [faqOpen, setFaqOpen] = useState(null);

  const toggleFAQ = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  const features = [
    {
      icon: <FaGamepad />,
      title: "Interactive Learning",
      description: "Experience real-world sustainability challenges through dynamic, AI-powered scenarios."
    },
    {
      icon: <FaRobot />,
      title: "AI-Powered Decisions",
      description: "Our GPT-4 powered system creates unique scenarios and adapts to your choices in real-time."
    },
    {
      icon: <FaChartBar />,
      title: "Impact Tracking",
      description: "See how your decisions affect environmental, economic, and social factors in real-time."
    }
  ];

  const scenarios = [
    {
      icon: <GiMining />,
      title: "Mining & Underground",
      description: "Balance resource extraction with environmental protection as a mining company CEO.",
      impact: ["Resource Management", "Worker Safety", "Environmental Protection"]
    },
    {
      icon: <GiWaterRecycling />,
      title: "Ocean Conservation",
      description: "Protect marine ecosystems while supporting local fishing communities.",
      impact: ["Marine Protection", "Local Economy", "Sustainable Fishing"]
    },
    {
      icon: <GiSpaceShuttle />,
      title: "Space Colonization",
      description: "Build and manage a sustainable Mars colony while facing unique challenges.",
      impact: ["Resource Efficiency", "Colony Growth", "Scientific Progress"]
    }
  ];

  const faqs = [
    {
      question: "What makes TerraQuest unique?",
      answer: "TerraQuest combines AI-powered storytelling with real sustainability data to create a unique learning experience. Every decision you make has realistic consequences based on actual environmental science."
    },
    {
      question: "Who is TerraQuest for?",
      answer: "TerraQuest is designed for students, professionals, and anyone interested in sustainability. Whether you're studying environmental science, working in policy, or just passionate about making a difference, you'll find valuable insights."
    },
    {
      question: "How does the scoring system work?",
      answer: "Your decisions impact three key areas: Environmental Protection, Economic Growth, and Social Well-being. The game tracks these scores and provides a final assessment of your leadership style and suggested career paths."
    },
    {
      question: "Is the game based on real data?",
      answer: "Yes! We use real-world environmental data and research to create our scenarios and calculate the impact of your decisions. This ensures the learning experience is both engaging and scientifically accurate."
    }
  ];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1>About TerraQuest</h1>
        <p className={styles.subtitle}>
          An AI-powered sustainability adventure where your choices shape the future of our planet
          through realistic scenarios and meaningful consequences.
        </p>
      </section>

      {/* Problem Statement */}
      <section className={styles.problem}>
        <h2>Why TerraQuest?</h2>
        <div className={styles.statGrid}>
          <div className={styles.stat}>
            <h3>80%</h3>
            <p>of students say interactive learning is more engaging</p>
          </div>
          <div className={styles.stat}>
            <h3>60%</h3>
            <p>improvement in critical thinking with decision-based learning</p>
          </div>
          <div className={styles.stat}>
            <h3>100%</h3>
            <p>AI-powered dynamic scenarios</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className={styles.features}>
        <h2>Key Features</h2>
        <div className={styles.featureGrid}>
          {features.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <span className={styles.icon}>{feature.icon}</span>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Scenarios */}
      <section className={styles.scenarios}>
        <h2>Available Scenarios</h2>
        <div className={styles.scenarioGrid}>
          {scenarios.map((scenario, index) => (
            <div key={index} className={styles.scenarioCard}>
              <span className={styles.icon}>{scenario.icon}</span>
              <h3>{scenario.title}</h3>
              <p>{scenario.description}</p>
              <div className={styles.impactList}>
                {scenario.impact.map((item, i) => (
                  <span key={i} className={styles.impactTag}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className={styles.faq}>
        <h2>Frequently Asked Questions</h2>
        <div className={styles.faqList}>
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`${styles.faqItem} ${faqOpen === index ? styles.open : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className={styles.faqQuestion}>
                <h3>{faq.question}</h3>
                <span className={styles.faqIcon}>{faqOpen === index ? '−' : '+'}</span>
              </div>
              {faqOpen === index && (
                <div className={styles.faqAnswer}>
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
