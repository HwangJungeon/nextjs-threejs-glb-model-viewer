"use client";

import { useState, useEffect, useRef } from 'react';
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment, Clone } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

const Models = [
  { name: "Model_Name", url: "/models/pico-sonic-assemble-guide.glb" },
];

const Model = ({ url, onLoaded }) => {
  const { scene } = useGLTF(url, undefined, undefined, (e) => {
    onLoaded();
  });
  return <Clone object={scene} position={[0, -0.01, 0]} />;
};

export default function Page() {
  const [isLoading, setIsLoading] = useState(true);
  const controls = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust this value to simulate the time it takes to load your model

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="w-full h-screen">
      {isLoading && <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">모델 로드 중..</div>}
      <Canvas camera={{ position: [0.1, 0.1, 0.1], near: 0.025 }}>
        <Environment preset="forest" />
        <Model url={Models[0].url} onLoaded={() => setIsLoading(false)} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <OrbitControls
          ref={controls}
          minPolarAngle={0}
          maxPolarAngle={0.8}
          maxDistance={0.2}
          minDistance={0.1}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}