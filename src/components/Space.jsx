import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import StoryOverlay from "./StoryOverlay";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define available themes
const STORY_THEMES = [
  {
    id: 'space_exploration',
    name: 'Space Exploration and Sustainable Colonization',
    description: 'Lead humanity\'s expansion into space while maintaining sustainable practices'
  },
  {
    id: 'infrastructure',
    name: 'Creation of Self-Sustaining Infrastructure in Space',
    description: 'Design and manage critical systems for long-term space habitation'
  },
  {
    id: 'weather_monitoring',
    name: 'Weather Monitoring and Natural Disaster Management',
    description: 'Utilize space technology to protect Earth from natural disasters'
  },
  {
    id: 'air_traffic',
    name: 'Air Traffic Optimization and Management',
    description: 'Revolutionize air transportation through advanced space-based systems'
  }
];

const Space = () => {
  const mountRef = useRef(null);
  const [currentScene, setCurrentScene] = useState(null);
  const [scores, setScores] = useState({
    environment: 0,
    economy: 0,
    social: 0
  });
  const [gameEnded, setGameEnded] = useState(false);
  const [assessment, setAssessment] = useState(null);
  const [playerChoices, setPlayerChoices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previousScenes, setPreviousScenes] = useState([]);
  const [totalScenes, setTotalScenes] = useState(0);
  const [currentTheme, setCurrentTheme] = useState(null);
  const navigate = useNavigate();

  // Select random theme and generate initial scene
  useEffect(() => {
    const fetchInitialScene = async () => {
      setIsLoading(true);
      try {
        const randomTheme = STORY_THEMES[Math.floor(Math.random() * STORY_THEMES.length)];
        setCurrentTheme(randomTheme);

        const response = await axios.post('http://localhost:3001/api/generate-initial-scene', {
          scenario: randomTheme.name
        });
        setCurrentScene(response.data);
        setTotalScenes(1);
      } catch (error) {
        console.error('Error fetching initial scene:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialScene();
  }, []);

  const handleChoiceSelected = async (choice, impact) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/generate-next-scene', {
        scenario: currentTheme.name,
        previousScenes: [...previousScenes, currentScene],
        currentChoice: { ...choice, impact },
        totalScenes: totalScenes
      });

      setPreviousScenes([...previousScenes, currentScene]);
      setCurrentScene(response.data);
      setTotalScenes(totalScenes + 1);

      const newScores = {
        environment: scores.environment + (impact?.environment || 0),
        economy: scores.economy + (impact?.economy || 0),
        social: scores.social + (impact?.social || 0)
      };
      setScores(newScores);

      if (response.data.isEnding) {
        await generateAssessment(newScores);
      }
    } catch (error) {
      console.error('Error generating next scene:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAssessment = async (finalScores) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/generate-assessment', {
        scores: finalScores,
        scenario: currentTheme.name,
        playerChoices
      });

      setAssessment(response.data);
      setGameEnded(true);
    } catch (error) {
      console.error('Error generating assessment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let scene, camera, renderer, planet, stars, light, animationFrameId;

    const init = () => {
      // Scene, Camera, Renderer
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        75, 
        window.innerWidth / window.innerHeight, 
        0.1, 
        1000
      );
      camera.position.set(0, 0, 15); // Center the camera
      camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      mountRef.current.appendChild(renderer.domElement);

      // Ensure the canvas is centered properly
      renderer.domElement.style.position = "absolute";
      renderer.domElement.style.top = "50%";
      renderer.domElement.style.left = "50%";
      renderer.domElement.style.transform = "translate(-50%, -50%)";

      // Background - Stars
      const starGeometry = new THREE.BufferGeometry();
      const starVertices = [];
      for (let i = 0; i < 6000; i++) {
        starVertices.push((Math.random() - 0.5) * 2000);
        starVertices.push((Math.random() - 0.5) * 2000);
        starVertices.push((Math.random() - 0.5) * 2000);
      }
      starGeometry.setAttribute("position", new THREE.Float32BufferAttribute(starVertices, 3));
      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
      stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);

      // Planet - Sphere with Texture
      const textureLoader = new THREE.TextureLoader();
      const planetTexture = textureLoader.load(
        "https://upload.wikimedia.org/wikipedia/commons/8/86/Earth_from_Space.jpg"
      );
      planet = new THREE.Mesh(
        new THREE.SphereGeometry(5, 64, 64),
        new THREE.MeshStandardMaterial({ map: planetTexture })
      );
      planet.position.set(0, 0, 0);
      scene.add(planet);

      // Lighting
      light = new THREE.PointLight(0xffffff, 1.5, 100);
      light.position.set(10, 10, 10);
      scene.add(light);
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (planet) planet.rotation.y += 0.002;
      if (stars) stars.rotation.y += 0.0005;
      renderer?.render(scene, camera);
    };

    const handleResize = () => {
      if (camera && renderer) {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      }
    };

    init();
    animate();

    window.addEventListener("resize", handleResize);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (renderer) {
        renderer.dispose();
        mountRef.current?.removeChild(renderer.domElement);
      }
      if (scene) {
        scene.traverse((object) => {
          if (object.geometry) {
            object.geometry.dispose();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach(material => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        });
      }
    };
  }, []);

  return (
    <>
      <div
        ref={mountRef}
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: "0",
          left: "0",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      />
      <div 
        onClick={() => navigate('/')}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          cursor: 'pointer',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.2)',
          padding: '10px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="white"
        >
          <path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>
        </svg>
      </div>
      {(currentScene || isLoading) && (
        <StoryOverlay 
          currentScene={currentScene || null}
          onChoiceSelected={handleChoiceSelected}
          scores={scores}
          gameEnded={gameEnded}
          assessment={assessment}
          isLoading={isLoading}
          theme={currentTheme}
        />
      )}
    </>
  );
};

// Local fallback assessment in case API fails
const getLocalAssessment = (scores) => {
  const { environment, economy, social } = scores;
  
  if (environment > economy && environment > social) {
    return {
      type: "Environmental Systems Engineer",
      description: "You prioritize sustainable practices and environmental protection in space exploration.",
      careers: ["Space Habitat Designer", "Environmental Systems Engineer", "Sustainability Coordinator"]
    };
  } else if (economy > environment && economy > social) {
    return {
      type: "Space Resource Manager",
      description: "You excel at optimizing resources and maintaining economic viability in space operations.",
      careers: ["Resource Management Specialist", "Space Economy Analyst", "Operations Director"]
    };
  } else {
    return {
      type: "Space Community Director",
      description: "You understand the importance of human factors and community wellbeing in space colonization.",
      careers: ["Colony Social Director", "Space Psychology Specialist", "Community Systems Manager"]
    };
  }
};

export default Space;
