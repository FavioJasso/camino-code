"use client";

import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { Suspense } from "react";

function Model() {
  const { scene } = useGLTF("/blob-1.glb");
  return <primitive object={scene} scale={2} />;
}

export default function Test3D() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <div className="h-screen w-full">
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Model />
            <OrbitControls enableZoom={true} />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
