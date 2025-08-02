"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Float, MeshDistortMaterial } from "@react-three/drei";
import { Suspense, useRef } from "react";
import * as THREE from "three";

function Model({ path, position = [0, 0, 0], autoRotate = true }) {
  const { scene } = useGLTF(path);
  const modelRef = useRef();

  useFrame((state) => {
    if (modelRef.current && autoRotate) {
      modelRef.current.rotation.y += 0.01;
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive ref={modelRef} object={scene} scale={1} position={position} />
    </Float>
  );
}

const models = [
  { name: "Blob 1", path: "/blob-1.glb" },
  { name: "Blob 2", path: "/blob-2.glb" },
  { name: "Cone 1", path: "/cone-1.glb" },
  { name: "Cone 2", path: "/cone-2.glb" },
  { name: "Ring 1", path: "/ring-1.glb" },
  { name: "Ring 2", path: "/ring-2.glb" },
  { name: "Triangle 1", path: "/triangle-1.glb" },
  { name: "Triangle 2", path: "/triangle-2.glb" },
  { name: "Latest", path: "/latest.glb" },
];

export default function AllModels() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-8">
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-red-600 text-center mb-12">
        3D Model Showcase
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {models.map((model, index) => (
          <div 
            key={index} 
            className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/20"
          >
            <h2 className="text-xl font-semibold text-white text-center mb-4 tracking-wider">{model.name}</h2>
            <div className="h-80 w-full rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
              <Canvas 
                camera={{ position: [0, 0, 5], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
              >
                <Suspense fallback={null}>
                  <fog attach="fog" args={['#000', 5, 15]} />
                  <ambientLight intensity={0.4} />
                  <directionalLight position={[5, 5, 5]} intensity={1} color="#f59e0b" />
                  <directionalLight position={[-5, -5, -5]} intensity={0.5} color="#ef4444" />
                  <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />
                  <Model path={model.path} autoRotate={true} />
                  <OrbitControls 
                    enableZoom={false} 
                    enablePan={false}
                    autoRotate={true}
                    autoRotateSpeed={2}
                    maxPolarAngle={Math.PI / 2}
                    minPolarAngle={Math.PI / 3}
                  />
                  <Environment preset="sunset" background={false} blur={0.8} />
                </Suspense>
              </Canvas>
            </div>
            <div className="mt-4 flex justify-center gap-2">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse delay-75"></div>
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}