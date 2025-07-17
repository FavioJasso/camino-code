"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

function Model({ url }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef();

  // Clone the scene to avoid modifying the original
  const clonedScene = scene.clone();
  
  // Scale and position the model
  clonedScene.scale.setScalar(2);
  clonedScene.position.set(0, 0, 0);

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={meshRef}>
        <primitive object={clonedScene} />
      </group>
    </Float>
  );
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="h-16 w-16 rounded-full border-4 border-amber-400 border-t-transparent"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default function ModelViewer({ url }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%'
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#f59e0b" />

        <Suspense fallback={null}>
          <Model url={url} />
          <Environment preset="city" />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={2}
        />
      </Canvas>

      <Suspense fallback={<LoadingSpinner />}>
        {/* This ensures loading state is shown */}
      </Suspense>
    </div>
  );
}
