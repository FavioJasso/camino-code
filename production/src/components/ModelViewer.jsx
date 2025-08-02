"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center, Float, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

function Model({ url }) {
  const { scene } = useGLTF(url);
  const modelRef = useRef();
  
  // Add futuristic glow effect
  useFrame((state) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.005;
      // Subtle floating animation
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  // Apply emissive material for glow effect
  React.useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color("#ffffff"),
          emissive: new THREE.Color("#00ffff"),
          emissiveIntensity: 0.2,
          metalness: 0.8,
          roughness: 0.2,
        });
      }
    });
  }, [scene]);

  return (
    <Center>
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <primitive ref={modelRef} object={scene} scale={1.2} />
      </Float>
    </Center>
  );
}

const ModelViewer = ({ url, autoRotate = true }) => {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        style={{ width: "100%", height: "100%" }}
        gl={{ antialias: true, alpha: true }}
      >
        {/* Enhanced Lighting */}
        <ambientLight intensity={0.3} color="#ffffff" />
        <directionalLight position={[10, 10, 5]} intensity={0.5} color="#00ffff" />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} color="#ff00ff" />
        <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />
        
        {/* Environment for reflections */}
        <Environment preset="city" />
        
        {/* Fog for depth */}
        <fog attach="fog" args={["#000000", 5, 15]} />
        
        <Suspense fallback={null}>
          <Model url={url} />
          {/* Contact shadows for grounding */}
          <ContactShadows
            opacity={0.4}
            scale={10}
            blur={2}
            far={4}
            position={[0, -2, 0]}
            color="#00ffff"
          />
        </Suspense>
        
        <OrbitControls
          enableZoom={false}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default ModelViewer;