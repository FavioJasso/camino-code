"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Float, Environment } from "@react-three/drei";
import { Suspense, useRef } from "react";
import { motion } from "framer-motion";
import * as THREE from "three";

function Model({ url }) {
  const { scene } = useGLTF(url);
  const meshRef = useRef();

  return (
    <Float
      speed={2}
      rotationIntensity={1}
      floatIntensity={2}
      floatingRange={[-0.1, 0.1]}
    >
      <group ref={meshRef}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <motion.div
        className="w-16 h-16 border-4 border-amber-400 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}

export default function ModelViewer({ url }) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#f59e0b" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.5}
          castShadow
        />
        
        <Suspense fallback={null}>
          <Model url={url} />
          <Environment preset="sunset" />
        </Suspense>
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minPolarAngle={Math.PI / 2.5}
          maxPolarAngle={Math.PI / 1.5}
          autoRotate
          autoRotateSpeed={2}
        />
        
        {/* Animated background particles */}
        <mesh>
          <sphereGeometry args={[50, 32, 32]} />
          <meshBasicMaterial
            color="#f59e0b"
            side={THREE.BackSide}
            transparent
            opacity={0.1}
          />
        </mesh>
      </Canvas>
      
      <Suspense fallback={<LoadingSpinner />}>
        {/* This ensures loading state is shown */}
      </Suspense>
    </div>
  );
}
