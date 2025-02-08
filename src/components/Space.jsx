import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import StoryOverlay from "./StoryOverlay";
import { spaceStory, getPersonalityAssessment } from "../data/spaceStory";

const Space = () => {
  const mountRef = useRef(null);
  const [currentScene, setCurrentScene] = useState(spaceStory.start);
  const [scores, setScores] = useState({
    environment: 0,
    economy: 0,
    social: 0
  });
  const [gameEnded, setGameEnded] = useState(false);
  const [assessment, setAssessment] = useState(null);

  const handleChoiceSelected = (nextSceneId, impact) => {
    // Get next scene first
    const nextScene = spaceStory[nextSceneId];
    
    // Update scores with current choice impact
    const newScores = {
      environment: scores.environment + (impact?.environment || 0),
      economy: scores.economy + (impact?.economy || 0),
      social: scores.social + (impact?.social || 0)
    };
    
    setScores(newScores);
    setCurrentScene(nextScene);

    // If this is an ending scene
    if (nextScene.isEnding) {
      const finalAssessment = getPersonalityAssessment(newScores);
      setAssessment(finalAssessment);
      setGameEnded(true);
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
      <StoryOverlay 
        currentScene={currentScene}
        onChoiceSelected={handleChoiceSelected}
        scores={scores}
        gameEnded={gameEnded}
        assessment={assessment}
      />
    </>
  );
};

export default Space;
