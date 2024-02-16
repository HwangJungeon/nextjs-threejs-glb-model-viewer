"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useRef } from "react";
import { OrbitControls, Environment, Clone } from "@react-three/drei";
import { useGLTF } from "@react-three/drei";

const Models = [
  { name: "Model_Name", url: "/models/pico-sonic-assemble-guide.glb" },
];

const Model = ({ url }) => {
  const { scene } = useGLTF(url);
  return <Clone object={scene} position={[0, -0.01, 0]} />;
};

export default function Page() {
  const controls = useRef();
  return (
    <div className="w-full h-screen">
      <Canvas camera={{ position: [0.1, 0.1, 0.1], near: 0.025 }}>
        <Environment preset="forest" />
        <Suspense>
          <Model url={Models[0].url} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
        </Suspense>
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
