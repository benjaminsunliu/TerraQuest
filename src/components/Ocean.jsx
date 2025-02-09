import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import StoryOverlay from "./StoryOverlay";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Define available themes
const OCEAN_THEMES = [
  {
    id: 'conservation',
    name: 'Marine Conservation and Protection',
    description: 'Protect marine ecosystems and endangered species'
  },
  {
    id: 'sustainable_fishing',
    name: 'Sustainable Fishing Practices',
    description: 'Balance fishing industry needs with ocean ecosystem health'
  },
  {
    id: 'pollution',
    name: 'Ocean Pollution Management',
    description: 'Combat various forms of marine pollution and waste'
  },
  {
    id: 'coastal',
    name: 'Coastal Community Development',
    description: 'Support coastal communities while protecting marine resources'
  }
];

const Ocean = () => {
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
        const randomTheme = OCEAN_THEMES[Math.floor(Math.random() * OCEAN_THEMES.length)];
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
        await generateAssessment(newScores, choice);
      }
    } catch (error) {
      console.error('Error generating next scene:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateAssessment = async (finalScores, finalChoice) => {
    setIsLoading(true);
    try {
      const response = await axios.post('http://localhost:3001/api/generate-assessment', {
        scores: finalScores,
        scenario: currentTheme.name,
        playerChoices: [...playerChoices, { 
          scene: currentScene.text,
          choice: finalChoice
        }]
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
    let scene, camera, renderer, clock, ocean;

    const init = () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x87CEEB);

      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
      camera.position.set(0, 2, 5);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      clock = new THREE.Clock();

      // Create Ocean Plane
      const oceanGeometry = new THREE.PlaneGeometry(10, 10, 100, 100);
      const oceanMaterial = new THREE.ShaderMaterial({
        vertexShader: `
          uniform float time;
          varying vec2 vUv;
          varying float wave;

          void main() {
            vUv = uv;
            vec3 pos = position;
            wave = sin(pos.x * 2.0 + time * 2.0) * 0.2;
            wave += sin(pos.y * 3.0 + time * 2.5) * 0.15;
            pos.z = wave;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
          }
        `,
        fragmentShader: `
          varying vec2 vUv;
          varying float wave;
          void main() {
            vec3 deepWater = vec3(0.0, 0.1, 0.3);
            vec3 shallowWater = vec3(0.0, 0.5, 0.8);
            float mixFactor = (wave + 0.2) / 0.4;
            vec3 color = mix(deepWater, shallowWater, mixFactor);
            gl_FragColor = vec4(color, 1.0);
          }
        `,
        uniforms: {
          time: { value: 0 }
        },
        wireframe: false
      });

      ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
      ocean.rotation.x = -Math.PI / 2;
      scene.add(ocean);

      // Lighting
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(5, 10, 5).normalize();
      scene.add(light);

      const ambientLight = new THREE.AmbientLight(0x404040, 1.5);
      scene.add(ambientLight);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();
      ocean.material.uniforms.time.value = elapsedTime;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    init();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
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
          overflow: "hidden"
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

export default Ocean; 