"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return (
    <Center>
      <primitive object={scene} />
    </Center>
  );
}


const ModelViewer = ({ url, autoRotate = true }) => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }} style={{ width: "100%", height: "100%" }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <Model url={url} />
        </Suspense>
        <OrbitControls enableZoom={false} autoRotate={autoRotate} autoRotateSpeed={5} />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
