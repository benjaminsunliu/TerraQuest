import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import StoryOverlay from "./StoryOverlay";
import { oceanStory, getPersonalityAssessment } from "../data/oceanStory";

const Ocean = () => {
  const mountRef = useRef(null);
  const [currentScene, setCurrentScene] = useState(oceanStory.start);
  const [scores, setScores] = useState({
    environment: 0,
    economy: 0,
    social: 0
  });
  const [gameEnded, setGameEnded] = useState(false);
  const [assessment, setAssessment] = useState(null);

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

  const handleChoiceSelected = (nextSceneId, impact) => {
    const nextScene = oceanStory[nextSceneId];
    
    const newScores = {
      environment: scores.environment + (impact?.environment || 0),
      economy: scores.economy + (impact?.economy || 0),
      social: scores.social + (impact?.social || 0)
    };
    
    setScores(newScores);
    setCurrentScene(nextScene);

    if (nextScene.isEnding) {
      const finalAssessment = getPersonalityAssessment(newScores);
      setAssessment(finalAssessment);
      setGameEnded(true);
    }
  };

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

export default Ocean; 