import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from './StoryOverlay.module.css';

const LoadingScreen = ({ message = "Generating next scene..." }) => (
  <div className={styles.loading}>
    <div className={styles.loadingContent}>
      <div className={styles.loadingSpinner}></div>
      <p>{message}</p>
    </div>
  </div>
);

const StoryOverlay = ({ currentScene, onChoiceSelected, scores, gameEnded, assessment, isLoading, theme }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let index = 0;
    let text = '';
    setIsTyping(true);
    
    const intervalId = setInterval(() => {
      if (index < currentScene.text.length) {
        text += currentScene.text.charAt(index);
        setDisplayedText(text);
        index++;
      } else {
        setIsTyping(false);
        clearInterval(intervalId);
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [currentScene]);

  // Don't show ending screen until assessment is ready
  if (gameEnded && !assessment) {
    return null;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.storyBox}>
        {isLoading ? (
          <LoadingScreen message={currentScene ? "Generating next scene..." : "Generating story..."} />
        ) : !gameEnded ? (
          <>
            {theme && (
              <div className={styles.theme}>
                <h2>{theme.name}</h2>
                <p>{theme.description}</p>
              </div>
            )}
            <div className={styles.scores}>
              <span>🌱 Environment: {scores.environment}</span>
              <span>💰 Economy: {scores.economy}</span>
              <span>👥 Social: {scores.social}</span>
            </div>
            <div className={styles.text}>{displayedText}</div>
            {!isTyping && currentScene.choices && (
              <div className={styles.choices}>
                {currentScene.choices.map((choice, index) => (
                  <button
                    key={index}
                    className={styles.choiceButton}
                    onClick={() => onChoiceSelected(choice.nextScene, choice.impact)}
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <div className={styles.ending}>
            <div className={styles.text}>{currentScene.text}</div>
            <div className={styles.finalScores}>
              <h2>Final Assessment</h2>
              <div className={styles.scoreGrid}>
                <div>🌱 Environmental Impact: {scores.environment}</div>
                <div>💰 Economic Growth: {scores.economy}</div>
                <div>👥 Social Well-being: {scores.social}</div>
              </div>
              {assessment && (
                <div className={styles.assessment}>
                  <h3>You are: {assessment.type}</h3>
                  <p>{assessment.description}</p>
                  <div className={styles.careers}>
                    <h4>Suggested Career Paths:</h4>
                    <ul>
                      {assessment.careers.map((career, index) => (
                        <li key={index}>{career}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

StoryOverlay.propTypes = {
  currentScene: PropTypes.shape({
    text: PropTypes.string.isRequired,
    choices: PropTypes.arrayOf(PropTypes.shape({
      text: PropTypes.string.isRequired,
      nextScene: PropTypes.string.isRequired,
      impact: PropTypes.shape({
        environment: PropTypes.number,
        economy: PropTypes.number,
        social: PropTypes.number
      })
    }))
  }).isRequired,
  onChoiceSelected: PropTypes.func.isRequired,
  scores: PropTypes.shape({
    environment: PropTypes.number.isRequired,
    economy: PropTypes.number.isRequired,
    social: PropTypes.number.isRequired
  }).isRequired,
  gameEnded: PropTypes.bool.isRequired,
  assessment: PropTypes.shape({
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    careers: PropTypes.arrayOf(PropTypes.string).isRequired
  }),
  isLoading: PropTypes.bool.isRequired,
  theme: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  })
};

export default StoryOverlay; 