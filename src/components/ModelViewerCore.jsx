"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Float } from "@react-three/drei";
import { Suspense, useRef, useEffect } from "react";
import { Box3, Vector3 } from "three";

function Model({ path, position = [1, 1, 1], autoRotate = true }) {
  const { scene } = useGLTF(path);
  const modelRef = useRef();

  useEffect(() => {
    if (scene) {
      try {
        const box = new Box3().setFromObject(scene);
        const size = new Vector3();
        const center = new Vector3();
        box.getSize(size);
        box.getCenter(center);
        scene.position.sub(center); // recenters model
      } catch (error) {
        console.warn("Error positioning model:", error);
      }
    }
  }, [scene]);

  useFrame((state) => {
    if (modelRef.current && autoRotate) {
      modelRef.current.rotation.y += 0.01;
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });

  return (
    <Float speed={0.1} rotationIntensity={0.5} floatIntensity={0.5}>
      <primitive ref={modelRef} object={scene} scale={1} position={position} />
    </Float>
  );
}

export default function ModelViewer({
  modelPath,
  height = "100vh",
  fogColor = "#000",
  containerClassName = "",
}) {
  return (
    <div className={containerClassName}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ 
          antialias: true, 
          alpha: true,
          failOnWebGL1: false,
          powerPreference: 'high-performance'
        }}
        style={{ width: "100%", height }}
        onError={(error) => console.warn('Canvas error:', error)}
      >
        <Suspense fallback={null}>
          <fog attach="fog" args={[fogColor, 5, 15]} />
          <ambientLight intensity={0.4} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={1}
            color="#f59e0b"
          />
          <directionalLight
            position={[-5, -5, -5]}
            intensity={0.5}
            color="#ef4444"
          />
          <pointLight position={[0, 10, 0]} intensity={0.5} color="#ffffff" />
          <Model path={modelPath} autoRotate={true} />
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
  );
}
