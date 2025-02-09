import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import StoryOverlay from "./StoryOverlay";
import axios from 'axios';

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
    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75, 
      window.innerWidth / window.innerHeight, 
      0.1, 
      1000
    );
    camera.position.set(0, 0, 15); // Center the camera
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
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
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Planet - Sphere with Texture
    const textureLoader = new THREE.TextureLoader();
    const planetTexture = textureLoader.load(
      "https://upload.wikimedia.org/wikipedia/commons/8/86/Earth_from_Space.jpg"
    );
    const planet = new THREE.Mesh(
      new THREE.SphereGeometry(5, 64, 64),
      new THREE.MeshStandardMaterial({ map: planetTexture })
    );
    planet.position.set(0, 0, 0);
    scene.add(planet);

    // Lighting
    const light = new THREE.PointLight(0xffffff, 1.5, 100);
    light.position.set(10, 10, 10);
    scene.add(light);

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      planet.rotation.y += 0.002;
      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };
    animate();

    // Handle Window Resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      mountRef.current.removeChild(renderer.domElement);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
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
