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
        camera={{ position: [0, 0, 4], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          clearColor: 'transparent',
        }}
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%'
        }}
        dpr={[1, 2]}
        resize={{ scroll: false, debounce: { scroll: 50, resize: 0 } }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <pointLight position={[-10, -10, -5]} intensity={0.7} color="#f59e0b" />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.7}
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
          autoRotateSpeed={1.5}
        />
      </Canvas>

      <Suspense fallback={<LoadingSpinner />}>
        {/* This ensures loading state is shown */}
      </Suspense>
    </div>
  );
}
