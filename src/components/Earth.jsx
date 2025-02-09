import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import StoryOverlay from "./StoryOverlay";
import axios from 'axios';

// Define available themes
const MINING_THEMES = [
  {
    id: 'sustainable_mining',
    name: 'Sustainable Mining Practices',
    description: 'Balance resource extraction with environmental protection'
  },
  {
    id: 'community_impact',
    name: 'Mining and Community Relations',
    description: 'Manage relationships between mining operations and local communities'
  },
  {
    id: 'innovation',
    name: 'Mining Technology Innovation',
    description: 'Implement cutting-edge technologies for safer and cleaner mining'
  },
  {
    id: 'rehabilitation',
    name: 'Land Rehabilitation and Conservation',
    description: 'Restore and protect ecosystems affected by mining operations'
  }
];

const Earth = () => {
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
        const randomTheme = MINING_THEMES[Math.floor(Math.random() * MINING_THEMES.length)];
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
    let scene, camera, renderer, earth, cloud, stars, clock;

    const init = () => {
      scene = new THREE.Scene();
      
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.set(0, 0, 3);
      
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);
      
      createEarth();
      createStars();
      
      clock = new THREE.Clock();
    };

    const createEarth = () => {
      const geometry = new THREE.SphereGeometry(1, 64, 64);
      
      const textureLoader = new THREE.TextureLoader();
      const earthMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg'),
        bumpMap: textureLoader.load('https://threejs.org/examples/textures/planets/earth_bump_2048.jpg'),
        bumpScale: 0.05,
        specularMap: textureLoader.load('https://threejs.org/examples/textures/planets/earth_specular_2048.jpg'),
      });

      earth = new THREE.Mesh(geometry, earthMaterial);
      scene.add(earth);
      
      const cloudMaterial = new THREE.MeshStandardMaterial({
        map: textureLoader.load('https://threejs.org/examples/textures/planets/earth_clouds_1024.png'),
        transparent: true,
        opacity: 0.4,
      });

      cloud = new THREE.Mesh(geometry.clone(), cloudMaterial);
      cloud.scale.set(1.02, 1.02, 1.02);
      scene.add(cloud);
      
      const light = new THREE.DirectionalLight(0xffffff, 1);
      light.position.set(5, 3, 5);
      scene.add(light);
      
      scene.add(new THREE.AmbientLight(0x404040, 0.5));
    };

    const createStars = () => {
      const starGeometry = new THREE.BufferGeometry();
      const starVertices = [];

      for (let i = 0; i < 5000; i++) {
        starVertices.push((Math.random() - 0.5) * 2000);
        starVertices.push((Math.random() - 0.5) * 2000);
        starVertices.push((Math.random() - 0.5) * 2000);
      }

      starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3));

      const starMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 0.1 });
      stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
    };

    const animate = () => {
      requestAnimationFrame(animate);
      
      earth.rotation.y += 0.002;
      cloud.rotation.y += 0.001;

      renderer.render(scene, camera);
    };

    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
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

export default Earth; 