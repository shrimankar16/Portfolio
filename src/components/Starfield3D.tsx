"use client";

import { useMemo, useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Sparkles } from "@react-three/drei";
import * as THREE from "three";

// Parallax camera that slowly drifts and reacts to the pointer.
function ParallaxCamera() {
  const { camera, pointer } = useThree();
  const target = useRef({ x: 0, y: 0 });
  useFrame((_, delta) => {
    target.current.x += (pointer.x * 1.4 - target.current.x) * Math.min(delta * 1.2, 1);
    target.current.y += (pointer.y * 0.9 - target.current.y) * Math.min(delta * 1.2, 1);
    camera.position.x += (target.current.x - camera.position.x) * 0.03;
    camera.position.y += (target.current.y - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

function Nebula() {
  const { size } = useThree();
  const scale = Math.max(size.width / 1100, 1.4);
  const blobs = useMemo(
    () => [
      { pos: [-34, 18, -60], color: "#8b5cf6", r: 16, o: 0.16 },
      { pos: [30, -14, -70], color: "#06b6d4", r: 20, o: 0.13 },
      { pos: [8, 30, -80], color: "#ec4899", r: 13, o: 0.12 },
      { pos: [-18, -26, -50], color: "#3b82f6", r: 14, o: 0.15 },
      { pos: [44, 26, -90], color: "#a855f7", r: 18, o: 0.1 },
    ] as { pos: [number, number, number]; color: string; r: number; o: number }[],
    []
  );
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.01;
  });
  return (
    <group ref={ref} scale={scale}>
      {blobs.map((b, i) => (
        <mesh key={i} position={b.pos}>
          <sphereGeometry args={[b.r, 24, 24]} />
          <meshBasicMaterial
            color={b.color}
            transparent
            opacity={b.o}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  );
}

function Scene() {
  return (
    <>
      <ParallaxCamera />
      <Stars
        radius={120}
        depth={60}
        count={4500}
        factor={4}
        saturation={0}
        fade
        speed={0.6}
      />
      <Sparkles
        count={220}
        scale={[40, 22, 30]}
        size={2.2}
        speed={0.25}
        opacity={0.6}
        color="#bfdbfe"
      />
      <Nebula />
    </>
  );
}

export default function Starfield3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 6], fov: 60 }}
      gl={{ 
        antialias: false, 
        alpha: true, 
        powerPreference: "low-power",
        stencil: false,
        depth: false,
      }}
      style={{ position: "absolute", inset: 0 }}
      aria-hidden
      frameloop="demand" // Only render when needed
      performance={{ min: 0.5 }} // Adjust performance dynamically
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
